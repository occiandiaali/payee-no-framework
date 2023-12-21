let htmlScanner = new Html5QrcodeScanner(
    'app-qr-reader',
    { fps: 10, qrbox: 250 }
);

let globalName = ""
let globalPrice = ""
let globalQty = ""
// const nameItemEl = document.getElementById('item-name');
// const priceItemEl = document.getElementById('item-price');
// const itemTotalEl = document.getElementById('item-total');
//const cartList = document.querySelector('#cart-list');

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
    globalName = name;
    globalPrice = price;
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
<button class="w3-btn w3-round-xxlarge w3-teal" onclick="addItemToCart()">Add to cart</button>
<!-- </div> -->
</section>
    `;
    document.getElementById('preview').innerHTML += previewHtml;
}




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

function cancelPreview() {
    document.getElementById('id01').style.display = 'none';
    window.location.reload();
}

function addItemToCart() {
    const selectEl = document.getElementById('item-qty');
    globalQty = selectEl.options[selectEl.selectedIndex].value || "1";
    const storedStr = localStorage.getItem('cart-items');

    if (storedStr === null) {
        const tempCart = [];
        let tempCartSum = 0.0;
        const cartItem = {
            itemId: window.crypto.randomUUID(),
            itemName: globalName.trim(),
            itemPrice: globalPrice.trim(),
            itemSum: (+globalPrice * +globalQty)
        };
        tempCart.unshift(cartItem);

        tempCartSum += (+globalPrice * +globalQty);
        console.log(`cart from null: ${JSON.stringify(tempCart)}`)
        console.log(`cart sum from null: ${tempCartSum}`)
        localStorage.setItem('cart-items', JSON.stringify(tempCart));
        localStorage.setItem('cart-sum', JSON.stringify(tempCartSum));
        cancelPreview();
    } else {
        const storedCartSumStr = localStorage.getItem('cart-sum');
        let parsedStr = JSON.parse(storedStr);
        let parsedCartSum = JSON.parse(storedCartSumStr)
        const cartItem = {
            itemId: window.crypto.randomUUID(),
            itemName: globalName.trim(),
            itemPrice: globalPrice.trim(),
            itemSum: (+globalPrice * +globalQty)
        };
        parsedStr.unshift(cartItem);

        parsedCartSum += (+globalPrice * +globalQty);
        console.log(`cart from store: ${JSON.stringify(parsedStr)}`)
        console.log(`cart sum from store: ${parsedCartSum}`)
        localStorage.setItem('cart-items', JSON.stringify(parsedStr));
        localStorage.setItem('cart-sum', JSON.stringify(parsedCartSum));
        cancelPreview();
    }
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
    }

    // let htmlScanner = new Html5QrcodeScanner(
    //     'app-qr-reader',
    //     { fps: 10, qrbox: 250 }
    // );

    htmlScanner.render(onScanSuccess);
})