declare let chrome: any;
export const storeIsLocked = (status: any) => {
    chrome.storage.sync.set({"isLocked?": status}, function() {
        console.log("Locked Wallet");
    })
}