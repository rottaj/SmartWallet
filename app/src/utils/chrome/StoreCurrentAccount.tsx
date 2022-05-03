declare let chrome: any;
export const storeCurrentAccount = (currentUser: any) => {
    chrome.storage.sync.set({"currentUser": currentUser}, function() {
        console.log("Initialized Wallet")
    })
}