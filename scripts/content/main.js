let oldTabUrl = location.href;
let features;

const main = async () => {
    console.log("YTQoL loading");
    features = await getAllLocalStorage();
    setUrlChangeListener();
    injectFeatures();

    // consoleLogAllStorage();
}

const setUrlChangeListener = () => {
    setInterval(() => {
        if (location.href != oldTabUrl) {
            oldTabUrl = location.href;
            //console.debug("url changed!")
            injectFeatures();
        }
    }, 1000);
}

const injectFeatures = () => {
    if (features.HighlightToggle && oldTabUrl === "https://www.youtube.com/feed/subscriptions") {
        highlightSetup();
    }

    if (features.PlaylistAutoplayDisabledToggle && /watch\?v=/.test(oldTabUrl)) {
        setTimeout(() => {
            PlaylistAutoplayDisabledSetup();
        }, 2000);
    }

    if (features.PlaylistRemovePopupToggle && /&list=/.test(oldTabUrl)) {
        PlaylistRemovePopupSetup();
    }

    if (features.PlaylistTotalWatchtimeCounterToggle && /&list=/.test(oldTabUrl)) {
        PlaylistTotalWatchtimeCounterSetup();
    }

    if (features.VideoTimeLeftToggle && /watch\?v=/.test(oldTabUrl)) {
        VideoTimeLeftSetup();
    }
}

main();