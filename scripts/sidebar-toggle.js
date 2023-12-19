const cartPlaceholder = document.getElementById('empty-cart');
const cart = document.getElementById('full-cart');

let str = localStorage.getItem('cart-items');

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    if (str === null) {
        cart.style.display = 'none';
    } else {
        cartPlaceholder.style.display = 'none';
    }

}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}