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

    qrScanner.stop()

    fetch("/qr-code", {
        method: "POST",
        body: JSON.stringify({ code: id }),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(async res => {
            if (res.status >= 400) {
                console.log(`Error ${res.status} -- '${await res.text()}'`)
                qrScanner.start()
                return
            }

            const body = await res.json()
            const params = new URLSearchParams()
            params.set("question", body.question)
            params.set("timetostart", body.timetostart)
            params.set("from", body.colour)
            location.href = `/questions.html?${params.toString()}`
        })
        .catch(e => {
            console.log(`Error while request for user ${id}`, e)
            qrScanner.start()
        })

}
