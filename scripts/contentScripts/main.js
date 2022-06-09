let oldTabUrl = location.href;
let features = {
    Highlight: false,
    HermitcraftHighlight: false,
    PlaylistAutoplayDisabled: false,
    PlaylistRemovePopup: false,
    PlaylistTotalWatchtimeCounter: false
}

const main = () => {
    console.log("YTQoL loading");
    setUrlChangeListener();
    getAllActiveFeatures();
    setTimeout(() => {
        injectFeatures();
    }, 2000);
}

const setUrlChangeListener = () => {

    setInterval(() => {
        if (location.href != oldTabUrl) {
            oldTabUrl = location.href;
            console.log("url changed!")
            injectFeatures();
        }
    }, 1000);
}

const getAllActiveFeatures = () => {
    chrome.storage.sync.get(["HermitcraftHighlightToggle"], result => {
        if (result.HermitcraftHighlightToggle) {
            features.HermitcraftHighlight = true;
        }
    });

    chrome.storage.sync.get(["HighlightToggle"], result => {
        if (result.HighlightToggle) {
            features.Highlight = true;
        }
    });

    chrome.storage.sync.get(["PlaylistAutoplayDisabledToggle"], result => {
        if (result.PlaylistAutoplayDisabledToggle) {
            features.PlaylistAutoplayDisabled = true;
        }
    });

    chrome.storage.sync.get(["PlaylistRemovePopupToggle"], result => {
        if (result.PlaylistRemovePopupToggle) {
            features.PlaylistRemovePopup = true;
        }
    });

    chrome.storage.sync.get(["PlaylistTotalWatchtimeCounterToggle"], result => {
        if (result.PlaylistTotalWatchtimeCounterToggle) {
            features.PlaylistTotalWatchtimeCounter = true;
        }
    });
}

const injectFeatures = () => {
    console.log(features)
    console.log(oldTabUrl) 
    if(features.Highlight && oldTabUrl === "https://www.youtube.com/feed/subscriptions") {
        highlightSetup("Highlight");
    }

    if(features.HermitcraftHighlight && oldTabUrl === "https://www.youtube.com/feed/subscriptions") {
        highlightSetup("HermitcraftHighlight");
    }

    //TODO implement other features
}

window.addEventListener("load", main);