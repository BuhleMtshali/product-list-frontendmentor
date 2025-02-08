    //IMPORTING THE DATA
    import  data  from "./assets/data.js";
    // console.table(data)

    //defining the variables
    const productContainer = document.getElementById('product-render');
    const cheoutRender = document.getElementById('checkout-render')
    const cartContainer = document.getElementById('cart-container')
    const bottomContainer = document.getElementById('bottom-button-container')
    const checkoutItemsLength = document.getElementById('items-cart');
    let finalTotal = document.getElementById('total')

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
                        <p class="price">R ${product.price.toFixed(2)}</p>
                        </div>  
                        `
        }).join("")

        //checking if container exists

        if (productContainer) {

                            productContainer.innerHTML = productItems;

                            // ADDING AN EVENT LISTENER to the product card
                            document.querySelectorAll('.addBtn').forEach((button) => {

                            button.addEventListener('click', function(event) { //EVERYTHING BELOW THIS LINE IS TRIGGERED BY THIS BUTTON

                            event.stopPropagation() //stops from triggering parent div click

                            const index = this.getAttribute('data-index'); //retrieves the value of the data-index attribute from the element that was clicked
                            // checks if the array has the data value
                            if(checkoutArray.includes(data[index])){

                            alert(`${data[index].name} already exists, please adjust the quantity!!!`)

                            } else {

                            checkoutArray.push(data[index]);

                            //map over the items in the checkout array
                            
                            updateCheckoutDisplay()

                            // function to calculate the price
                            calculatePrice()
                    }        
            })

        })

        }  else {
        console.error("Element with ID 'product-render' not found");
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
                        <p class="quantity">1x</p>
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
            // console.log(checkoutArray);
            const totalPrice = checkoutArray.reduce((total, item) => {
                return total + item.
                price;
            }, 0)

            console.log(totalPrice)
            finalTotal.textContent = `$${totalPrice}`
        }

    // document.querySelectorAll('.addBtn').forEach((button, index) => {
    //     button.addEventListener('click', function() {
    //         button.dataset.id = index; //storing the index in a dataset
    //         this.style.backgroundColor = this.style.backgroundColor === "blue" ? "var(--btn-bg)" : "blue"; //toggling the style
    //         console.log(this)
    //     })
    // })

    // document.querySelectorAll('.product').forEach((card, index) => {
    //     card.addEventListener('click', function() {
    //         checkoutArray.push(this)
    //         console.log(checkoutArray)
    //     })
    // })