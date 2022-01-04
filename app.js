







class Cart{
    constructor(items = []){
        this.items = items;
    }

    addItem(item){
        this.items.push(item)            
    }
}



class Sneaker{
    constructor(images, name, brand, description, originalPrice, sale = 0, quantity = 0){
        this.images = images;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.originalPrice = originalPrice;
        this._sale = sale;
        this._quantity = quantity;
    }

    set sale(sale){
        this._sale = sale;
        const dollarsOff = this.originalPrice * (sale/100);
        const priceNum = this.originalPrice - dollarsOff;
        this.salePrice = priceNum.toFixed(2); 
        //this.totalPrice = this.salePrice * this.quantity;
    }

    get sale(){
        return this._sale;
    }

    set quantity(quantity){
        this._quantity = quantity;
        if (quantity <= 0){
            this.totalPrice = 0
        } else {
            this.totalPrice = this.salePrice * this.quantity;
        }
    }

    get quantity(){
        return this._quantity;
    }

    addOne() {
        console.log('+1')
        this.quantity += 1;
        displaySneaker();
    }
}

const productImgs = {
    jpgPath1: '/ecommerce-product-page-main/images/image-product-1.jpg',
    jpgPath2: '/ecommerce-product-page-main/images/image-product-2.jpg', 
    jpgPath3: '/ecommerce-product-page-main/images/image-product-3.jpg',
    jpgPath4: '/ecommerce-product-page-main/images/image-product-4.jpg' 
};

const thumbnails = {
    jpgPath1: '/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg',
    jpgPath2: '/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg',
    jpgPath3: '/ecommerce-product-page-main/images/image-product-3-thumbnail.jpg',
    jpgPath4: '/ecommerce-product-page-main/images/image-product-4-thumbnail.jpg' 
};


const fallLmtdEditSneaker = new Sneaker(
[productImgs, thumbnails],
'Fall Limited Edition Sneakers',
'SNEAKER COMPANY',
`These low-profile sneakers are your perfect casual wear companion. Featuring a durable
rubber outer sole, they'll withstand everything the weather can offer.`,
250)

function loadSales(){
    fallLmtdEditSneaker.sale = 50;
}

function displaySneaker(){
    const sneakerCont = document.querySelector('.sneaker-container');
    console.log(fallLmtdEditSneaker)
    sneakerCont.innerHTML = `
        <img src="${fallLmtdEditSneaker.images[0].jpgPath1}" alt="Image-product" class="displayed-image">
        <h3 class="sneaker-brand">${fallLmtdEditSneaker.brand}</h3>
        <h1 class="sneaker-name">${fallLmtdEditSneaker.name}</h1>
        <p class="sneaker-descrip">${fallLmtdEditSneaker.description}</p>
        <h1 class="price">$${fallLmtdEditSneaker.salePrice}</h1>
        <p class="sale">${fallLmtdEditSneaker.sale}%</p>
        <p class="original-price">${fallLmtdEditSneaker.originalPrice}</p>

        <div class="quantity-button">
            <img src="/ecommerce-product-page-main/images/icon-minus.svg" alt="Minus Icon" class="minus-icon">
            <p>${fallLmtdEditSneaker._quantity}</p>
            <img src="/ecommerce-product-page-main/images/icon-plus.svg" class="plus-icon" alt="Plus Icon">
        </div>

        <div class="add-to-cart">
            <img src="/ecommerce-product-page-main/images/icon-cart.svg" alt="Cart Icon">
            <p></p>
        </div>
    `;
}



loadSales();
displaySneaker();

const plusIcon = document.querySelector('.plus-icon')


plusIcon.addEventListener('click', e => {
    //if(e.target.className === "plus-icon"){
        fallLmtdEditSneaker.addOne();
    //}
})
