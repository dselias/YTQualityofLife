let playlistTotalWatchtimeCounterInitialized = false;
let playlistMenuNode;

const PlaylistTotalWatchtimeCounterSetup = () => {
    setTimeout(() => {
        console.log("PlaylistTotalWatchtimeCounter Updated");

        playlistMenuNode = document.querySelectorAll("#container.ytd-playlist-panel-renderer")[1];
        setPlaylistTotalWatchtimeCounterObserver();
        updateSpan();

        playlistTotalWatchtimeCounterInitialized = true;
    }, 5000);
}

const setPlaylistTotalWatchtimeCounterObserver = () => {
    if (playlistTotalWatchtimeCounterInitialized) return;

    //detect when new videos are addded or removed from the playlist to update the totalWatchtime
    let videoWrapperElement = playlistMenuNode.querySelector("#items");
    new MutationObserver(() => {
        updateSpan();
    }).observe(videoWrapperElement, { childList: true });
}

const updateSpan = () => {
    let totalSeconds = format(getTotalTimeStatusInSeconds() / getPlaybackSpeed());
    addToPage(totalSeconds);
}

const getTotalTimeStatusInSeconds = () => {
    let videos = playlistMenuNode.getElementsByTagName("ytd-playlist-panel-video-renderer");
    let totalSeconds = 0;

    for (let i = 0; i < videos.length; i++) {
        let currentVideoTimeStatus = videos[i].querySelector(`span[id^="text"]`);

        if (currentVideoTimeStatus == null) {
            console.log("Error loading Time status. Either the playlist is too large or your internet connection too slow.");
        } else {
            let splitTimeStatus = currentVideoTimeStatus.innerHTML.split(":").reverse();

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

const getPlaybackSpeed = () => {
    return getVideoElement().playbackRate;
}

const getVideoElement = () => {
    return document.getElementsByTagName("video")[document.getElementsByTagName("video").length - 1];
}

const format = (input) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    hours = Math.floor(input / 3600);
    minutes = Math.floor(((input / 3600) - hours) * 60);
    seconds = Math.floor(((((input / 3600) - hours) * 60) - minutes) * 60);

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if (hours == 0) {
        return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}

const addToPage = (totalTime) => {
    let playlistTitleNode = playlistMenuNode.querySelectorAll("yt-formatted-string.ytd-playlist-panel-renderer")[0];

    //check if node already contains the title, or has an <a></a> node that contains the text
    if (playlistTitleNode.innerHTML.indexOf("<a") != -1) {
        playlistTitleNode = playlistTitleNode.children[0];
    }

    //check if title already contains a watchtime span and filter it out.
    let playlistTitleText = playlistTitleNode.innerHTML;
    let spanStartIndex = playlistTitleText.indexOf("<");
    if (spanStartIndex != -1) {
        playlistTitleText = playlistTitleText.substring(0, spanStartIndex).trim()
    }

    playlistTitleNode.innerHTML = `${playlistTitleText} <span id="totalPlaylistWatchtime">(${totalTime})</span>`;
}