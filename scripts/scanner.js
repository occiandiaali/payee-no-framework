let htmlScanner = new Html5QrcodeScanner(
    'app-qr-reader',
    { fps: 10, qrbox: 250 }
);


function decodeExtractor(input) {
    const n = input.indexOf("Name");
    const i = input.indexOf("Info");
    const p = input.indexOf("Price");

    const name = input.substring(n + 5, i - 1);
    const info = input.substring(i + 5, p - 1);
    const price = input.substring(p + 6);
    return { name, info, price }
}

function previewModal(name, info, price) {

    const previewHtml = `
    <section style="height: 480px; border-radius: 16px;">
    <img src=${'../assets/images/lite-logo.jpg'} alt="item image" style="width: 100%; height: 150px;">
    <h2>${name}</h2>
    <p>${info}</p>
    <div style="display: flex; flex-direction: row; justify-content: space-around;">
    <p>Unit price: ${price}</p>
    <select id="item-qty">
    <option value="">Quantity </option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    </select>
   
</div>
<!--<div class="w3-margin" style="display: flex; flex-direction: row; justify-content: space-between; padding: 6px;"> -->
<button class="w3-btn w3-round-xxlarge w3-yellow" onclick="cancelPreview()">Cancel</button>
<button class="w3-btn w3-round-xxlarge w3-teal">Add to cart</button>
<!-- </div> -->
</section>
    `;
    document.getElementById('preview').innerHTML += previewHtml;
    // return modalDiv;
}

/* 
<p>Qty</p>
    <div id="increment-count">
     <!-- <input type="image" id="up-arrow" src="up_arrow.png" /> -->
     <span style="font-size: 32px; font-weight: 900;">&#8593</span>
    </div>
    <div id="total-count">
    <span style="font-weight: 800;">${1}</span>
    </div>
    <div id="decrement-count">
     <!-- <input type="image" id="down-arrow" src="down_arrow.png" /> -->
     <span style="font-size: 32px; font-weight: 900;">&#x2193</span>
    </div>
*/

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


//let scanned = false;
function cancelPreview() {
    document.getElementById('id01').style.display = 'none';
    window.location.reload();
}
domReady(function () {
    function onScanSuccess(decodeText, decodeResult) {
        //alert(`QR: ${decodeText}`)
        const { name, info, price } = decodeExtractor(decodeText);
        document.getElementById('id01').style.display = 'block';
        previewModal(
            name,
            info,
            price
        );
        console.log(`
        =======Decoded: 
        ${name} 
        ${info}
        ${price}
        =============
        `)
        htmlScanner.clear();
        console.log(decodeResult)
        // scanned = true;
    }

    // let htmlScanner = new Html5QrcodeScanner(
    //     'app-qr-reader',
    //     { fps: 10, qrbox: 250 }
    // );

    htmlScanner.render(onScanSuccess);

    // if (scanned) {
    //     htmlScanner.clear();
    // }
})