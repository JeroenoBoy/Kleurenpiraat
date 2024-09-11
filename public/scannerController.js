window.onload = () => {
    const qrScanner = new QRScanner(document.getElementById("qr-view"), it => handleScanResult(it.data, qrScanner),
        {
            highlightScanRegion: true
        }
    );

    qrScanner.start()
}

function handleScanResult(result, qrScanner) {
    console.log("Scanned", result)
    if (typeof (result) != "string") return
    if (!/\/u\/\d+$/.test(result)) return

    const split = result.split("/")
    const id = parseInt(split[split.length - 1])

    console.log(id)

    qrScanner.stop()
}
