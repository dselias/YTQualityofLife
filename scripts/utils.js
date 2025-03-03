//
//chrome storage
//
const getLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get([key], (items) => {
                resolve(items[key]);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

const getAllLocalStorage = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(null, (items) => { //An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
                resolve(items);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

const setLocalStorage = (key, value) => {
    chrome.storage.local.set({ [key]: value });
}

const getSyncedStorage = async (key) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get([key], (items) => {
                resolve(items[key]);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

const getAllSyncedStorage = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(null, (items) => { //An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
                resolve(items);
            });
        } catch (ex) {
            reject(ex);
        }
    });
}

const setSyncedStorage = (key, value) => {
    chrome.storage.sync.set({ [key]: value });
}

const consoleLogAllStorage = async () => {
    console.debug("local storage")
    console.debug(await getAllLocalStorage());
    console.debug("synced storage")
    console.debug(await getAllSyncedStorage());
}


//
//functions used across features
//
const getVideoElement = () => {
    return document.getElementsByTagName("video")[document.getElementsByTagName("video").length - 1];
}

const formatSecondsToHHMMSS = (input) => {
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

//add multiple d strings by seperating them with semicolons
const createSVGElement = (color, dStrings) => {
    dStrings = dStrings.split(";");

    let SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    SVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    SVG.setAttribute("class", "icon");

    for (let i = 0; i < dStrings.length; i++) {
        let SVGPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        SVGPath.setAttributeNS(null, "d", dStrings[i].trim());
        SVGPath.setAttribute("fill", color);

        SVG.appendChild(SVGPath);
    }

    return SVG;
}

// Wait for an element to appear in a container (runs once).
const waitForElement = (container, selector, callback) => {
  const observer = new MutationObserver((mutations, obs) => {
    const element = container.querySelector(selector);
    if (element) {
      obs.disconnect();
      callback(element);
    }
  });
  observer.observe(container, { childList: true, subtree: true });
};

// Continuously observe a container for child elements matching the selector.
const observeForElements = (container, selector, callback) => {
  // Process any elements that already exist.
  container.querySelectorAll(selector).forEach(callback);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // If the node itself matches, update it.
          if (node.matches && node.matches(selector)) {
            callback(node);
          }
          // Also check its descendants.
          const matches = node.querySelectorAll ? node.querySelectorAll(selector) : [];
          matches.forEach(callback);
        }
      });
    });
  });
  observer.observe(container, { childList: true, subtree: true });
};
