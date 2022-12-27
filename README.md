# Features

On first use **all** features are disabled. Click the extension icon in the top right of your screen and select the features you want to enable.

## Highlight

![preview of Highlight feature](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/Highlight-preview.gif)

You can highlight videos on the subscriptions page by writing a keyword in the input field located in the left (unfolded) sidebar above Home, Explore, Shorts, Subscriptions, ... You can also automatically highlight keywords on page-load by clicking the button "show auto highlighted" and entering the desired keywords. To unhighlight a word, or remove it from the auto-highlight list: Click the keyword itself.

## PlaylistAutoplayDisabled

![preview of PlaylistAutoplayDisabled feature](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/PlaylistAutoplayDisabled-preview.gif)

You can disable autoplay when watching videos normally. But when a video ends inside a playlist it automatically starts the next one. This feature automatically stops the video a few seconds before the end so you can peacefully scroll through the comments without being brought to the next video.

## PlaylistRemovePopup

![preview of PlaylistRemovePopup feature](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/PlaylistRemovePopup-preview.gif)

When watching a video that is inside a playlist / Watch Later,
Youtube decided it was a great idea to remove the trashcan to a popup instead of directly next to the video preview. Once this feature is enabled the popup will be disabled and you will now be able to delete videos by clicking on the trashcan like before.

## PlaylistTotalWatchtimeCounter

![preview of PlaylistTotalWatchtimeCounter feature](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/PlaylistTotalWatchtimeCounter-preview.gif)

Displays the total watchtime of a playlist next to its title.

## VideoTimeLeft

![preview of VideoTimeLeft feature](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/VideoTimeLeft-preview.gif)

When hovering over a youtube video the progress bar appears. Next to the volume controls you will find the current and total time of the video. Clicking changes the current time to time left until the video ends.

# How to install

## Chrome

I can not upload to the Chrome Webstore because of a registration fee. You will have to install the extension by enabling developer options.

![preview of how to install](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/how-to-install.gif)

1. Download the latest files. You can find them on the [releases](https://github.com/dselias/YTQualityofLife/releases) page under "Assets".
1. Unzip and place all files in a folder you have created on a desired location.
1. Go inside the folder you have created, locate the [manifest](manifest/) folder and copy 'manifest-chrome.json' to the root directory.
1. Rename 'chrome-manifest.json' to 'manifest.json'.
1. Go to chrome://extensions.
1. Click "developer mode" in the top right corner. With developer mode enabled you can use extensions that are not packed.
1. Click "load unpacked" in the top left corner. Select the folder where you have downloaded all files in.

### Updating the extension

1. Delete all files out the root folder and redownload all files to the root folder.
1. Go inside the root folder, locate the [manifest](manifest/) folder and copy 'manifest-chrome.json' to the root directory.
1. Rename 'chrome-manifest.json' to 'manifest.json'.
1. In chrome://extensions: Click on the refresh button on the bottom right of the extension
1. If done correctly the version number next to the title of the extension should be changed.

![extension refresh button](https://raw.githubusercontent.com/dselias/ReadmeImages/main/YTQualityofLife/refresh-button.png)

## Firefox

You can download the extension from the [Firefox add-on](https://addons.mozilla.org/en-US/firefox/addon/youtube-qolt/) website.

# Reporting bugs

If you discover any bugs/issues feel free to open a ticket on the [issues](https://github.com/dselias/YTQualityofLife/issues) tab.
