const cartPlaceholder = document.getElementById('empty-cart');
const cart = document.getElementById('full-cart');

const cartItems = [1];
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    if (cartItems.length < 1) {
        cart.style.display = 'none';
    } else {
        cartPlaceholder.style.display = 'none';
    }
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}