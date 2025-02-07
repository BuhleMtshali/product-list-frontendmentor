//IMPORTING THE DATA
import  data  from "./assets/data.js";
// console.table(data)

//defining the variables
const productContainer = document.getElementById('product-render');

//rendering them out
const productItems = data.map((product, index) => 
            `
                <div class="product" id="${index}">
                    <img src="${product.image.desktop}" alt="brownie image" id="">
                    <button class="addBtn">
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                    </button>
                    <small class="catergory">${product.category}</small>
                    <p class="product-name">${product.name}</p>
                    <p class="price">$ ${product.price.toFixed(2)}</p>
                </div>  
                        `
).join("")

//check if product exists
if (productContainer) {
    productContainer.innerHTML = productItems;
} else {
    console.error("Element with ID 'product-render' not found");
}

//ADDING EVENT LISTNER
