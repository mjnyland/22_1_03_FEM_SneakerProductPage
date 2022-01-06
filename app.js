class View{

    constructor(controller, container){
        this.controller = controller;
        this.container = container;
    }

    presentData(obj) {
        this.container.innerHTML = `
            <img class="sneaker-image" src="${obj.images.productImgs.jpgPath1}" alt="">
            <h3 class="sneaker-brand">${obj.brand}</h3>
            <h1 class="sneaker-name">${obj.name}</h1>
            <p class="sneaker-descrip">${obj.description}</p>
            <h1 class="sneaker-sale-price">$${obj.salePrice}</h1>
            <h3 class="sneaker-sale">${obj.sale}%</h3>
            <h3 class="sneaker-original-price">$${obj.originalPrice.toFixed(2)}</h3>
        `
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

class Controller{
    constructor(model){
        this.model = model;
    }

    //METHOD: Event Listener Interface

    get HTML() {
        view.presentData(model.sneakerData);
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

    addOne() {
        this.quantity += 1;
        displaySneaker();
    }
}

const sneakerCont = document.querySelector('.sneaker-container');
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



var model = new Model({sneaker});
var controller = new Controller(model);
var view = new View(controller, sneakerCont);

console.log(model)

sneaker.sale = 50;
controller.HTML;