function removeCartItem(id, sum) {
    const sStr = localStorage.getItem('cart-items');
    const tStr = localStorage.getItem('cart-sum');
    let basket = JSON.parse(sStr);
    let total = JSON.parse(tStr);
    const newArr = basket.filter((obj) => obj.itemId !== id);
    //   total -= sum;
    //  console.log(`Minus: ${total -= sum}`);
    console.log(`total: ${total}`);
    console.log(`sum: ${sum}`);
    //  localStorage.setItem('cart-sum', JSON.stringify(total))
    localStorage.setItem('cart-items', JSON.stringify(newArr));
    console.log('Clicked=====$');
    setTimeout(() => {
        window.location.reload();
    }, 6000)
}