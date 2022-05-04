declare let chrome: any;
export const storeCurrentAccount = (currentAccount: any) => {
    chrome.storage.sync.set({"currentAccount": currentAccount}, function() {
        console.log("Initialized Wallet")
    })
}