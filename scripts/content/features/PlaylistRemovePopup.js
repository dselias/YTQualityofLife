const kebabVector = "M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z";
const trashcanVector = "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z";

const PlaylistRemovePopupSetup = () => {
    setTimeout(() => {
        console.log("PlaylistRemovePopup Enabled");

        const videosWrapper = document.querySelectorAll("#items.playlist-items")[1];
        changeDotsToTrashcan(videosWrapper);

        videosWrapper.addEventListener('click', deleteVideo, false);
    }, 3000);
}

const changeDotsToTrashcan = (videosWrapper) => {
    const vectors = videosWrapper.querySelectorAll(`path[d="${kebabVector}"]`);
    vectors.forEach(vector => vector.setAttribute("d", trashcanVector));
}

const deleteVideo = (event) => {
    const button = event.target.getElementsByTagName("path")[0];

    if (button != undefined && button.getAttribute("d") === trashcanVector) {
        const firstAttempt = clickDeleteButton();
        if (!firstAttempt) setTimeout(() => clickDeleteButton(), 500);
    }
}

const clickDeleteButton = () => {
    const popupItems = document.getElementsByTagName("ytd-menu-service-item-renderer");

    //searching the right button to click
    let i = 0;
    let found = false;
    while (!found && i < popupItems.length) {
        let popupItemVector = popupItems[i].querySelector("path");

        if (popupItemVector != undefined && popupItemVector.getAttribute("d") === "M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z") {
            popupItems[i].click()
            found = true;
        }
        i++;
    }

    return found;
}