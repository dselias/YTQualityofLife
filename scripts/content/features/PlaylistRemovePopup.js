const kebabVector = "M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z";
const trashcanVector = "M11 17H9V8h2v9zm4-9h-2v9h2V8zm4-4v1h-1v16H6V5H5V4h4V3h6v1h4zm-2 1H7v15h10V5z";

const PlaylistRemovePopupSetup = () => {
  waitForElement(document, "ytd-playlist-panel-video-renderer", (renderer) => {
    console.log("PlaylistRemovePopup Enabled");
    const videosWrapper = renderer.parentElement;

    observeForElements(videosWrapper, `path[d="${kebabVector}"]`, (element) => {
      element.setAttribute("d", trashcanVector);
    });

    videosWrapper.addEventListener('click', deleteVideo, false);
  });
};

const deleteVideo = (event) => {
  const button = event.target.getElementsByTagName("path")[0];
  if (button && button.getAttribute("d") === trashcanVector) {
    clickDeleteButton();
  }
};

const clickDeleteButton = () => {
  const popupItems = document.getElementsByTagName("ytd-menu-service-item-renderer");
  let i = 0, found = false;
  while (!found && i < popupItems.length) {
    const popupItemVector = popupItems[i].querySelector("path");
    if (popupItemVector && popupItemVector.getAttribute("d") === trashcanVector) {
      popupItems[i].click();
      found = true;
    }
    i++;
  }
  return found;
};
