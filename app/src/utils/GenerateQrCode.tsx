const GOOGLE_API_QR = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl= ' // + 0x8CCF9C4a7674D5784831b5E1237d9eC9Dddf9d7F + &choe=UTF-8

export const generateQRCode = async (address: any) => {
    console.log("QR CODE G", address)
    const request = await fetch(GOOGLE_API_QR + address + '&choe=UTF-8')
    console.log("REQ", request)
    const data = await request.json();
    console.log("DATA", data)
    return data;
}