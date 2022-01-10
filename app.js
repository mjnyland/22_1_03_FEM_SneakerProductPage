document.addEventListener('click', (e) => {
    console.log(e.target)
});

const sneakerCont = document.querySelector('.sneaker-container');
const cartCont = document.querySelector('.cart-container');
const cartOverlay = document.querySelector('.cart-overlay');
const navIconTotal = document.querySelector('.nav-cart-total');
const cartSneakerText = document.querySelector('.cart-sneaker-text');

class Controller{
    constructor(model){
        this.model = model;
    }

    //METHOD: Event Listener Interface

    handleLoad() {
        view.displaySneaker(this.model.sneaker)
    }



    handleQuant(target) {
        switch(target){
            case 'plus-icon':
                this.model.addOne();
                view.displaySneaker(model.sneaker);
                break;
            case 'minus-icon':
                this.model.minusOne();
                view.displaySneaker(model.sneaker);
        }
        
    }

    handleAddToCart() {
        this.model.addToCart();
        console.log('test');
        view.displayTotal();

        if(cartCont.style.display === 'flex'){
            view.displayCart(this.model.cart, this.model.sneaker);
        } else if (cartCont.style.display === ''){
            return;
        }
    }

    handleShowCart(){
        if(model.cart.items.length > 0 ){
            view.displayCart(this.model.cart, this.model.sneaker);
            cartOverlay.style.display = 'block';
        } else {
            return;
        }
    }

    handleRemove(){
        model.removeFromCart();
        view.displayCart(this.model.cart, this.model.sneaker)
    }

    handleArrow(target){
        if(target.className === 'next-arrow-container'){
            model.sneaker.countUpOne();
        } else if (target.className === 'prev-arrow-container'){
            model.sneaker.countDownOne();
        }

        view.displayNewSneakerImage(sneaker);
    }

    handleRemoveCart(){
        cartCont.style.display = 'none';
        cartOverlay.style.display = 'none';
    }

}



class View{
    constructor(controller){
        this.controller = controller;
    }

    displaySneaker(obj){
        sneakerCont.innerHTML = `
            <div class="sneaker-image-container">
                <div class="next-arrow-container" onclick="controller.handleArrow(this)">
                    <svg class="next-arrow" width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                </div>
                <img class="sneaker-image" src="${obj.images.productImgs[obj.count]}" alt="Image of sneaker">

                <div class="prev-arrow-container" onclick="controller.handleArrow(this)">
                    <svg class="prev-arrow" width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
                </div>
            </div>

            <div class="sneaker-text-container">
                <h3 class="sneaker-brand">${obj.brand}</h3>
                <h1 class="sneaker-name">${obj.name}</h1>
                <p class="sneaker-descrip">${obj.description}</p>

                <div class="sneaker-prices">
                    <h1 class="sneaker-sale-price">$${obj.salePrice}</h1>
                    <h3 class="sneaker-sale">${obj.sale}%</h3>
                    <h3 class="sneaker-original-price">$${obj.originalPrice.toFixed(2)}</h3>
                </div>

                <button class="quantity-container" onclick="">
                    <svg onclick="controller.handleQuant(this.classList[0])" class="minus-icon" width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a"/></svg>
                    <div class="quantity-number-container">
                    <h3>${obj.quantity}</h3>
                    </div>
                    <svg onclick="controller.handleQuant(this.classList[0])" class="plus-icon" width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b"/></svg>
                </button>

                <button class="addtocart-container" onclick="controller.handleAddToCart()">
                    <svg class="addtocart-cart" width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#FFF" fill-rule="nonzero"/></svg>
                    <p>Add to cart</p>
                </button>
            </div>
        `
    }

    displayNewSneakerImage(obj){
            const sneakerImageCont = document.querySelector('.sneaker-image-container');
            const sneakerImage = document.querySelector('.sneaker-image');
            sneakerImage.src = obj.images.productImgs[obj.count]
        
    }

    displayTotal(){
        navIconTotal.style.display = 'block';
        navIconTotal.textContent = '';
        navIconTotal.textContent = `${cart.total}`
    }

    displayCart(cart, sneaker){
        if(cart.items.length > 0) {
            this.displayTotal();
            console.log(sneaker)
            cartCont.style.display = 'block';
            cartCont.innerHTML = `
                <p class="cart-heading">Cart</p>
                <div class="cart-rule"></div>
                    <div class="cart-item-container">
                        <img class="cart-sneaker-thumbnail" src=${cart.items[0].images.thumbnails[0]}>
                        <div class = "cart-sneaker-text">
                            <p>${cart.items[0].name}</p>
                            <p>$${cart.items[0].salePrice} x ${cart.total} $${cart.total*sneaker.salePrice}</p>
                        </div>
                        <svg onclick="controller.handleRemove()" class="cart-delete-icon" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
                    </div>
                <button class="checkout-container">Checkout</button>
            `

            cartCont.style.display = 'flex';
        } else {
            this.displayTotal();
            navIconTotal.style.display = 'none';
            cartCont.style.display = 'flex';
            cartCont.innerHTML = `
                <p class="cart-heading">Cart</p>
                <div class="cart-rule"></div>
                    <p>Cart is empty.</p>
                <button class="checkout-container">Checkout</button>
            `
        }
    }
}



class Model{
    constructor(sneaker, cart){
        this.sneaker = sneaker;
        this.cart = cart;
    }

    addOne (){
        this.sneaker.quantity += 1;
    }

    minusOne() {
        const currQuant = sneaker.quantity;
        switch(currQuant){
            case 0:
                break;
            default:
                this.sneaker.quantity -=1;;
                break;       
        }
    }

    addToCart(){
        this.cart.addItem(this.sneaker);
        this.cart.total += this.sneaker.quantity;
    }

    removeFromCart(){
        this.cart.items.splice(0,1);
        this.cart.total = 0;
    }


}




class Sneaker{
    constructor(images, name, brand, description, originalPrice, sale = 0, quantity = 1, count = 0){
        this.images = images;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.originalPrice = originalPrice;
        this._sale = sale;
        this._quantity = quantity;
        this.count = count;
    }

    set sale(sale){
        this._sale = sale;
        const dollarsOff = this.originalPrice * (sale/100);
        const priceNum = this.originalPrice - dollarsOff;

        this.salePrice = priceNum.toFixed(2); 
    }

    get sale(){
        return this._sale;
    }

    set quantity(quantity){
        this._quantity = quantity;
        this.totalPrice = this.salePrice * quantity;
    }

    get quantity(){
        return this._quantity;
    }

    changeQuant(target) {
            const targetClass = target.classList[0];
            switch (targetClass) {
                case 'plus-icon':
                    this.quantity += 1;
                    controller.getSneakerDisplay;
                    break;
                case 'minus-icon':
                    switch(this.quantity) {
                        case 0:
                            break;
                        default:
                            this.quantity -= 1;
                            controller.getSneakerDisplay;
                            break;
                    }
            }
    }

    countDownOne(){
        if(this.count === 0){
            return;
        } else {
            this.count -= 1;
        }
    }

    countUpOne(){
        if(this.count === 3){
            return
        } else {
            this.count += 1;
        }
    }
}


class Cart {
    constructor(items = [], total = 0){
        this.items = items;
        this.total = total;
    }
 
    addItem(item){
        const length = this.items.length;
        const quant = item.quantity;

        if(this.items.length === 0){
            switch (quant) {
                case 0:
                    break;
                default:
                    this.items.push(item);
                    controller.cartDisplay;
                    break;       
            }
        } else{
            return;
        }
    }
}

const images = {
    productImgs: [
        '/ecommerce-product-page-main/images/image-product-1.jpg',
        '/ecommerce-product-page-main/images/image-product-2.jpg', 
        '/ecommerce-product-page-main/images/image-product-3.jpg',
        '/ecommerce-product-page-main/images/image-product-4.jpg' 
    ],
    thumbnails: [
        '/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg',
        '/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg',
        '/ecommerce-product-page-main/images/image-product-3-thumbnail.jpg',
        '/ecommerce-product-page-main/images/image-product-4-thumbnail.jpg' 
    ]
}

const sneaker = new Sneaker(
    images,
    'Fall Limited Edition Sneakers',
    'SNEAKER COMPANY',
    `These low-profile sneakers are your perfect casual wear companion. Featuring a durable
    rubber outer sole, they'll withstand everything the weather can offer.`,
    250);

const cart = new Cart();

var model = new Model(sneaker, cart);
var controller = new Controller(model);
var view = new View(controller);

sneaker.sale = 50;
window.onload = controller.handleLoad();

/*
class View{

    constructor(controller, container){
        this.controller = controller;
        this.container = container;
    }

    presentData(obj) {
        this.container.innerHTML = `
            <div class="sneaker-image-container">
                <img class="sneaker-image" src="${obj.images.productImgs.jpgPath1}" alt="Image of sneaker">
            </div>

            <div class="sneaker-text-container">
                <h3 class="sneaker-brand">${obj.brand}</h3>
                <h1 class="sneaker-name">${obj.name}</h1>
                <p class="sneaker-descrip">${obj.description}</p>

                <div class="sneaker-prices">
                    <h1 class="sneaker-sale-price">$${obj.salePrice}</h1>
                    <h3 class="sneaker-sale">${obj.sale}%</h3>
                    <h3 class="sneaker-original-price">$${obj.originalPrice.toFixed(2)}</h3>
                </div>

                <div class="quantity-container">
                    <svg onclick="sneaker.changeQuant(this)" class="minus-icon" width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a"/></svg>
                    <div class="quantity-number-container">
                    <h3>${obj.quantity}</h3>
                    </div>
                    <svg onclick="sneaker.changeQuant(this)" class="plus-icon" width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b"/></svg>
                </div>

                <div class="addtocart-container" onClick="cart.addItem(sneaker)">
                    <svg class="addtocart-cart" width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="#FFF" fill-rule="nonzero"/></svg>
                    <p>Add to cart</p>
                </div>
            </div>
        `
    }

    presentCartData(obj){
        cartCont.innerHTML = `
            <img class="sneaker-thumbnail" src="${obj.images.thumbnails.jpgPath1}" alt="Image of sneaker">
            <p>Cart</p>
            <p>${obj.totalPrice}</p>
        `
    }
}

class Controller{
    constructor(model){
        this.model = model;
    }

    //METHOD: Event Listener Interface
    get getSneakerDisplay() {
        view.presentData(model.sneakerData);
    }

    get cartDisplay(){
        view.presentCartData(model.items.cart.items[0])
    }
}

class Model{
    constructor(items){
        this.items = items;
    }

    get sneakerData(){
        return this.items.sneaker;
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
    }

    get sale(){
        return this._sale;
    }

    set quantity(quantity){
        this._quantity = quantity;
        this.totalPrice = this.salePrice * quantity;
    }

    get quantity(){
        return this._quantity;
    }

    changeQuant(target) {
            const targetClass = target.classList[0];
            switch (targetClass) {
                case 'plus-icon':
                    this.quantity += 1;
                    controller.getSneakerDisplay;
                    break;
                case 'minus-icon':
                    switch(this.quantity) {
                        case 0:
                            break;
                        default:
                            this.quantity -= 1;
                            controller.getSneakerDisplay;
                            break;
                    }
            }
    }
}


class Cart {
    constructor(items = []){
        this.items = items;
    }
 
    addItem(item){
        const quant = item.quantity;
        switch (quant) {
            case 0:
                break;
            default:
                this.items.push(item);
                console.log(this.items);
                controller.cartDisplay;
                break;       
        }
    }
}













const sneakerCont = document.querySelector('.sneaker-container');
const cartCont = document.querySelector('.cart-container');




const images = {
        productImgs: {
            jpgPath1: '/ecommerce-product-page-main/images/image-product-1.jpg',
            jpgPath2: '/ecommerce-product-page-main/images/image-product-2.jpg', 
            jpgPath3: '/ecommerce-product-page-main/images/image-product-3.jpg',
            jpgPath4: '/ecommerce-product-page-main/images/image-product-4.jpg' 
        },
        thumbnails: {
            jpgPath1: '/ecommerce-product-page-main/images/image-product-1-thumbnail.jpg',
            jpgPath2: '/ecommerce-product-page-main/images/image-product-2-thumbnail.jpg',
            jpgPath3: '/ecommerce-product-page-main/images/image-product-3-thumbnail.jpg',
            jpgPath4: '/ecommerce-product-page-main/images/image-product-4-thumbnail.jpg' 
        }
}
const sneaker = new Sneaker(
    images,
    'Fall Limited Edition Sneakers',
    'SNEAKER COMPANY',
    `These low-profile sneakers are your perfect casual wear companion. Featuring a durable
    rubber outer sole, they'll withstand everything the weather can offer.`,
    250);

const cart = new Cart();



var model = new Model({sneaker, cart});
var controller = new Controller(model);
var view = new View(controller, sneakerCont);

console.log(model)

sneaker.sale = 50;
controller.getSneakerDisplay;
*/