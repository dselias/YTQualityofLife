let alreadyPaused = false;
let state;

const PlaylistAutoplayDisabledSetup = () => {
    console.log("PlaylistAutoplayDisabled Enabled");
    alreadyPaused = false;
    const videoElements = document.querySelectorAll("video");

    //addAutoplayForChannelHTML(); TODO fix with new YouTube UI
    videoElements.forEach(videoElement => videoElement.ontimeupdate = () => checkTimeLeft(videoElement));
}

const checkTimeLeft = (videoElement) => {
    let totalTime = videoElement.duration;
    let currentTime = videoElement.currentTime;
    let timeLeft = totalTime - currentTime;

    if (timeLeft <= 1.5 && !alreadyPaused && !state) {
        videoElement.pause();
        alreadyPaused = true;
    }
};

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