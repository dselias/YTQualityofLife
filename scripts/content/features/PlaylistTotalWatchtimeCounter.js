let playlistTotalWatchtimeCounterInitialized = false;
let playlistTitleNode;
let playlistMenuNode;
let originalTitle;
let currentTitle;

const PlaylistTotalWatchtimeCounterSetup = () => {
    setTimeout(() => {
        console.log("PlaylistTotalWatchtimeCounter Updated");

        playlistMenuNode = document.querySelectorAll("#container.ytd-playlist-panel-renderer")[1];
        playlistTitleNode = playlistMenuNode.querySelectorAll("a.yt-simple-endpoint.style-scope.yt-formatted-string")[0] ?? playlistMenuNode.querySelectorAll("yt-formatted-string.ytd-playlist-panel-renderer")[0];
        setPlaylistTotalWatchtimeCounterObserver();
        updatePlaylistTitle();

        playlistTotalWatchtimeCounterInitialized = true;
    }, 5000);
}

const setPlaylistTotalWatchtimeCounterObserver = () => {
    if (playlistTotalWatchtimeCounterInitialized) return;

    const videoWrapperElement = playlistMenuNode.querySelector("#items");
    new MutationObserver(() => {
        updatePlaylistTitle();
    }).observe(videoWrapperElement, { childList: true });

    const playlistTitle = playlistTitleNode;
    new MutationObserver(() => {
        playlistTitleNode.innerHTML = currentTitle;
    }).observe(playlistTitle, { attributes: true });
}

const updatePlaylistTitle = () => {
    const totalSeconds = formatSecondsToHHMMSS(getTotalTimeStatusInSeconds() / getVideoElement().playbackRate);
    addToPage(totalSeconds);
}

const getTotalTimeStatusInSeconds = () => {
    const videos = playlistMenuNode.getElementsByTagName("ytd-playlist-panel-video-renderer");
    let totalSeconds = 0;

    for (let i = 0; i < videos.length; i++) {
        const currentVideoTimeStatus = videos[i].querySelector(`span[id^="text"]`);

        if (currentVideoTimeStatus == null) {
            console.error("Error loading Time status. Either the playlist is too large or your internet connection too slow.");
        } else {
            const splitTimeStatus = currentVideoTimeStatus.innerHTML.split(":").reverse();

            for (let j = 0; j < splitTimeStatus.length; j++) {
                if (j == 0) {
                    totalSeconds += parseInt(splitTimeStatus[j].trim());
                } else {
                    totalSeconds += parseInt(splitTimeStatus[j].trim()) * (60 * j);
                }
            }
        }
    }

    return totalSeconds;
}

const addToPage = (totalTime) => {
    if (!originalTitle) originalTitle = playlistTitleNode.innerHTML.trim();

    currentTitle = `${originalTitle} <span id="totalPlaylistWatchtime">(${totalTime})</span>`;
    playlistTitleNode.innerHTML = currentTitle;
}