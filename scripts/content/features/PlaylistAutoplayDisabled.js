let playlistAutoplayDisabledInitialized = false;
let alreadyPaused = false;
let state;

const PlaylistAutoplayDisabledSetup = () => {
    alreadyPaused = false;
    if (playlistAutoplayDisabledInitialized) return;
    playlistAutoplayDisabledInitialized = true;

    console.log("PlaylistAutoplayDisabled Enabled");
    addAutoplayForChannelHTML();
    let videoElement = getVideoElement();

    setInterval(() => {
        let totalTime = videoElement.duration;
        let currentTime = videoElement.currentTime;
        let timeLeft = totalTime - currentTime;

        // console.log(timeLeft);

        if (timeLeft <= 1 && !alreadyPaused && !state) {
            videoElement.pause();
            alreadyPaused = true;
        }
    }, 300);
}

const addAutoplayForChannelHTML = async () => {
    state = await getLocalStorage("PlaylistAutoplayDisabledWhitelistedChannels");

    const channelDetailsWrapperNode = document.querySelectorAll("#upload-info")[1];
    const labelNode = document.createElement("label")
    const checkboxNode = document.createElement("input");

    labelNode.innerHTML = "autoplay for channel"
    labelNode.setAttribute("id", "playlistAutoplayDisabledLabel");

    checkboxNode.setAttribute("type", "checkbox");
    checkboxNode.setAttribute("id", "playlistAutoplayDisabledCheckbox");
    checkboxNode.checked = state;

    labelNode.appendChild(checkboxNode);
    channelDetailsWrapperNode.appendChild(labelNode);

    checkboxNode.addEventListener("click", (event) => {
        state = event.target.checked;
        setLocalStorage("PlaylistAutoplayDisabledWhitelistedChannels", state);
    });
}