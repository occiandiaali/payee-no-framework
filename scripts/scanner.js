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
const cartList = document.querySelector('#cart-list');

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
    let selectEl = document.querySelector('#item-qty');
    globalQty = selectEl.options[selectEl.selectedIndex].value;
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

function createCartList(cItem) {
    let li = document.createElement('li');
    li.classList.add('w3-bar');

    //     const tile = `
    //     <div class="w3-border"
    //     style="display: flex; flex-direction: row; justify-content: space-around; padding: 6px; height: 76px; width: 100%;">
    //     <img src="./assets/images/lite-logo.jpg" alt="item thumbnail" class="w3-round w3-border w3-cell"
    //         style="width: 60px; height: 64px;">
    //     <div style="display: flex; flex-direction: column; padding: 4px;">
    //         <span id="item-name">${cItem.itemName}</span>
    //         <span id="item-price">${cItem.itemPrice}</span>
    //     </div>
    //     <div style="display: flex; flex-direction: column; padding: 4px;">
    //         <span style="font-weight: bold;">Total</span>
    //         <span style="font-weight: bold;" id="item-total">${cItem.itemSum}</span>
    //     </div>

    //     <button class="w3-button" id="delete-item">&#x1F5D1;</button>
    // </div>
    //     `;
    //  li.textContent = tile;

    li.textContent = `
     <span onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span>
     <img src="./assets/images/lite-logo.jpg" alt="item thumbnail" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">
     <div class="w3-bar-item">
       <span class="w3-large">${cItem.itemName}</span><br>
       <span>${cItem.itemPrice}</span>
     </div>
     <div class="w3-bar-item">
     <span>${cItem.itemSum}</span>
     </div>
     `;

    return li;
}

function addItemToCart() {
    const storedStr = localStorage.getItem('cart-items');
    if (storedStr === null) {
        const tempCart = [];
        const cartItem = {
            itemName: globalName.trim(),
            itemPrice: globalPrice.trim(),
            itemSum: +globalPrice * +globalQty
        };
        tempCart.unshift(cartItem);
        console.log(`cart from null: ${tempCart}`)
        localStorage.setItem('cart-items', JSON.stringify(tempCart));
        cancelPreview();
    } else {
        let parsedStr = JSON.parse(storedStr);
        const cartItem = {
            itemName: globalName.trim(),
            itemPrice: globalPrice.trim(),
            itemSum: +globalPrice * +globalQty
        };
        parsedStr.unshift(cartItem);

        console.log(`cart from store: ${parsedStr}`)
        localStorage.setItem('cart-items', JSON.stringify(parsedStr));
        cancelPreview();
    }
}

function addToCart() {
    let selectEl = document.querySelector('#item-qty');
    globalQty = selectEl.options[selectEl.selectedIndex].value;
    let itemsArr = [];
    itemsArrFromStorage = localStorage.getItem('cart-items');
    const cartItem = {
        itemName: globalName.trim(),
        itemPrice: globalPrice.trim(),
        // itemQty: qty,
        itemSum: (+globalPrice * +globalQty)
    };
    // cartList.appendChild(createCartList(cartItem));

    if (itemsArrFromStorage === null) {
        itemsArr.push(cartItem);
        localStorage.setItem('cart-items', JSON.stringify(itemsArr))
    } else {
        let retrievedArrString = localStorage.getItem('cart-items')
        let retrievedArr = JSON.parse(retrievedArrString);
        const mergedRes = [...retrievedArr, cartItem];
        itemsArr.push(mergedRes);
        localStorage.setItem('cart-items', JSON.stringify(itemsArr))
        itemsArr.forEach((tile) => {
            const liEl = document.createElement('li');
            liEl.textContent = tile.itemName;
            cartList.appendChild(liEl);
        })
    }
    cancelPreview();
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