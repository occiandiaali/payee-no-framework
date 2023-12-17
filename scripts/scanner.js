function domReady(fn) {
    if (
        document.readyState === 'complete' ||
        document.readyState === 'interactive'
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

domReady(function () {
    function onScanSuccess(decodeText, decodeResult) {
        //alert(`QR: ${decodeText}`)
        document.getElementById('id01').style.display = 'block';
        console.log(decodeResult)
    }

    let htmlScanner = new Html5QrcodeScanner(
        'app-qr-reader',
        { fps: 10, qrbos: 250 }
    );
    htmlScanner.render(onScanSuccess)
})