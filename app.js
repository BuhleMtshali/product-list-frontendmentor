//IMPORTING THE DATA
import  data  from "./assets/data.js";
// console.table(data)

//defining the variables
const productContainer = document.getElementById('product-render');
const cheoutRender = document.getElementById('checkout-render')
const cartContainer = document.getElementById('cart-container')
const bottomContainer = document.getElementById('bottom-button-container')
const checkoutItemsLength = document.getElementById('items-cart');
let finalTotal = document.getElementById('total');


const checkoutArray = [];

//rendering them out
const productItems = data.map((product, index) => {
        return    `
                    <div class="product" id="${index}">
                    <img src="${product.image.desktop}" alt="brownie image" id="">
                    <button class="addBtn" data-index="${index}">
                        <i class="fa-solid fa-cart-plus"></i>
                        Add to Cart
                    </button>
                    <small class="catergory">${product.category}</small>
                    <p class="product-name">${product.name}</p>
                    <p class="price">$ ${product.price.toFixed(2)}</p>
                    </div>  
                    `
    }).join("")
    
    //checking if container exists

    if (productContainer) {

        productContainer.innerHTML = productItems;

                        

        // ADDING AN EVENT LISTENER to the product card
        document.querySelectorAll('.addBtn').forEach((button) => {

            button.addEventListener('click', function(event) { //EVERYTHING BELOW THIS LINE IS TRIGGERED BY THIS BUTTON

                    //increment & decrement buttons 
                    let incrementBtn = document.querySelectorAll('.increment');
                    let decrementBtn = document.querySelectorAll('.decrement');
                    
                    let cards = document.querySelectorAll('.product')
                
                    event.stopPropagation() //stops from triggering parent div click
                    
                    const index = this.getAttribute('data-index'); //retrieves the value of the data-index attribute from the element that was clicked

                     // Check if item is already in the cart
                    const existingItem = checkoutArray.includes((data[index]));


                    // checks if the array has the data value
                    if(!existingItem){

                         //if it doesn't exist push the to the checkout array
                     checkoutArray.push(data[index]);
                
                     if(checkoutArray.length > 0) {
                     // change the styling of the button if array.length is greater than 0
                     button.style.backgroundColor = "var(--active-btn-bg)";
                     button.style.padding = "8px 12px"
                     button.style.color = "var(--btn-bg)"
                     button.innerHTML = `
                                 <div class="active-icons">
                                 <i class="fa-solid fa-minus decrement"></i>
                                 <p class="current-quantity">1</p>
                                 <i class="fa-solid fa-plus increment"></i>
                                 </div>
                                `
                                 
             }
                     //if statement for changing the parent div and calls the function
                     cards.forEach((item) => {
                     if(item.id === index){
                         updateUi(item)


                }
                   
            
        
                   
                    
    })
        //function for displaying the checkout array
        updateCheckoutDisplay()

        // function to calculate the price
        calculatePrice()

        //update current quantity
        updateQuantity()
       
                }        
        })

    })

    }  else {
        console.error("Element with ID 'product-render' not found");
    }
        
    //updating the ui of the old array if an item is added to the cart
    function updateUi(product) {
            // console.log(product)
            product.style.border = "2px solid var(--active-btn-bg)"
        
        }

    //rendering the items in the cart and updating the UI
    function updateCheckoutDisplay(){
    
    bottomContainer.style.display = 'block' //if something is added to the array the checkout btn must appear

    checkoutItemsLength.textContent = checkoutArray.length //updating the length of the array

    console.log(checkoutArray)

    if(cheoutRender){

            cheoutRender.innerHTML = checkoutArray.map((item, index) => {

              return `
                <div class="checkoutcard">
                    <p class="product-name">${item.name}</p>
                    <div class="checkout-info">
                    <div class="left">
                    <p class="quantity"><span class="quantity-number">1</span>x
                    </p>
                    <p class="checkout-price">
                    <span class="price-each">@ $${item.price}</span>
                    <span class="total-each">$${item.price}</span>
                    </p>
                    </div>
                    <i class="fa-regular fa-circle-xmark"></i>
                    </div>
            </div> 
                   ` 
            }).join("")
        }

       
    }



    //function to calculate total price
    function calculatePrice(){

        const totalPrice = checkoutArray.reduce((total, item) => {
            return total + item.price;
        }, 0)

        console.log(totalPrice)
        finalTotal.textContent = `$${totalPrice}`
    }

    //funtion for updating quantity
    // function updateQuantity(){
    //     let currentQuantity = document.querySelectorAll('.current-quantity');
    //     const quantityNumber = document.querySelectorAll('.quantity-number');
    //     let totalQuantityPrice = document.querySelectorAll('.total-each');

    //     document.querySelectorAll('.decrement').forEach((quantity) => {
    //         quantity.addEventListener('click', () => {
    //             currentQuantity.forEach((item) => {
    //                 if(item.textContent < 1) {
    //                    ('There is currently 1 item in your cart')
    //                 }  else {
    //                     alert('1 item removed from your cart')
    //                     item.textContent = parseInt(item.textContent) - 1;

                        //updating the quantity number in the UI    
                        // quantityNumber.forEach((number) => {
                        //     number.textContent = item.textContent;
                        // })

                        //updating the price
        //                 totalQuantityPrice.forEach((price) => {
        //                     price.textContent = item.textContent;
        //                 })
        //             }
        //         })
        //     })
        // })


    //     document.querySelectorAll('.increment').forEach((btn) => {
    //             btn.addEventListener('click', () => {
    //                 currentQuantity.forEach((item) => {
    //                     console.log(item.textContent)
    //                     item.textContent = parseInt(item.textContent) + 1;

    //                     //updating the quantity number in the UI    
    //                     quantityNumber.forEach((number) => {
    //                         number.textContent = item.textContent;
    //                     })
    //                 })
    //             })
    //     })
    // }
    function updateQuantity() {  //function initializes event listeners for increment (+) and decrement (-) button
        document.querySelectorAll('.decrement').forEach((button) => { //Selects all elements with the class .decrement
            button.addEventListener('click', function () {
                const quantityElement = this.closest('.product')?.querySelector('.current-quantity'); //.closest('.product') or .closest('.checkoutcard') to ensure that only the correct elements get updated
                const checkoutQuantity = this.closest('.checkoutcard')?.querySelector('.quantity-number'); //this.closest('.checkoutcard') finds the corresponding checkout section (for updating UI)
                const priceElement = this.closest('.checkoutcard')?.querySelector('.total-each');
    
                if (quantityElement) {
                    let currentQuantity = parseInt(quantityElement.textContent, 10); //parseInt(quantityElement.textContent, 10) converts the quantity from a string to a number.
                    if (currentQuantity > 1) {
                        quantityElement.textContent = currentQuantity - 1;
                        if (checkoutQuantity) checkoutQuantity.textContent = currentQuantity - 1; //Updates both the product page and checkout page quantity displays.
    
                        // Updating total price per item
                        const itemIndex = checkoutArray.findIndex(item => item.name === this.dataset.name); //Finds the item in checkoutArray using findIndex(), matching it by this.dataset.name
                        if (itemIndex !== -1) {
                            let unitPrice = checkoutArray[itemIndex].price;
                            if (priceElement) {
                                priceElement.textContent = `$${(unitPrice * (currentQuantity - 1)).toFixed(2)}`; //Calculates the new total price: unitPrice * (currentQuantity - 1)
                            }
                        }
    
                        calculatePrice(); // Update total cart price
                    } else {
                        alert('Cannot remove item. Minimum quantity is 1.'); //If the quantity is already 1, display an alert message instead of decreasing further
                    }
                }
            });
        });
    
        document.querySelectorAll('.increment').forEach((button) => {
            button.addEventListener('click', function () {
                const quantityElement = this.closest('.product')?.querySelector('.current-quantity');
                const checkoutQuantity = this.closest('.checkoutcard')?.querySelector('.quantity-number');
                const priceElement = this.closest('.checkoutcard')?.querySelector('.total-each');
    
                if (quantityElement) {
                    let currentQuantity = parseInt(quantityElement.textContent, 10);
                    quantityElement.textContent = currentQuantity + 1;
                    if (checkoutQuantity) checkoutQuantity.textContent = currentQuantity + 1;
    
                    // Updating total price per item
                    const itemIndex = checkoutArray.findIndex(item => item.name === this.dataset.name);
                    if (itemIndex !== -1) {
                        let unitPrice = checkoutArray[itemIndex].price;
                        if (priceElement) {
                            priceElement.textContent = `$${(unitPrice * (currentQuantity + 1)).toFixed(2)}`;
                        }
                    }
    
                    calculatePrice(); // Update total cart price
                }
            });
        });
    }
    

     