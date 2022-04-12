import { ethers } from 'ethers';

export const handleWalletConnection = async (key: any, provider: any) => {
    const wallet = new ethers.Wallet(key, provider)
    return wallet
}