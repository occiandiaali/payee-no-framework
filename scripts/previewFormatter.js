function previewFormatter(img, name, info, price) {
    const createDiv = document.createElement('section');
    const modalDiv = document.getElementById('preview-modal')

    const previewHtml = `
    <section style="height: 75%;">
    <img src=${img} alt="item image" style="width: 100%; height: 100px;">
    <h2>${name}</h2>
    <p>${info}</p>
    <div style="display: flex; flex-direction: row; justify-content: space-evenly">
    <p>${price}</p>
    <div id="increment-count">
     <!-- <input type="image" id="up-arrow" src="up_arrow.png" /> -->
     &#8593
    </div>
    <div id="total-count">
    </div>
    <div id="decrement-count">
     <!-- <input type="image" id="down-arrow" src="down_arrow.png" /> -->
     &#x2193
    </div>
</div>
    </section>
    `;
    createDiv.innerHTML = previewHtml;
    return createDiv;
}