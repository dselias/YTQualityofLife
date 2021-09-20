const setup = () => {
    chrome.storage.sync.get(["playlistRemovePopupToggle"], result => {
        if (result.playlistRemovePopupToggle) {
            console.log("PlaylistRemovePopup Enabled");

            setTimeout(() => {
                let videos = document.getElementsByTagName("ytd-playlist-panel-video-renderer")
                changeDotsToTrashcan(videos);
    
                for (let i = 0; i < videos.length; i++) {
                    videos[i].addEventListener('click', deleteVideo, false);
                }
            }, 2000)
        }
    });
}

const changeDotsToTrashcan = (videos) => {
    for (let i = 0; i < videos.length; i++) {
        let vector = videos[i].children[1].children[0].children[1].children[0].children[0].children[0].children[0].children[0];
        vector.setAttribute("d", "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z")
    }
}

const deleteVideo = (event) => {
    if (event.target.tagName === "YT-ICON" && event.target.className === "style-scope ytd-menu-renderer") {
        let popupItems = document.getElementsByTagName("ytd-menu-service-item-renderer");

        //searching the right button to click
        let i = 0;
        let found = false;
        while (!found && i < popupItems.length) {
            let popupItemVector = popupItems[i].children[0].children[0].children[0].children[0].children[0].getAttribute("d").trim()
            if (popupItemVector === "M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z") {
                popupItems[i].click()
                found = true;
            }
            i++;
        }
    }
}

window.addEventListener("load", setup);