    //IMPORTING THE DATA
    import  data  from "./assets/data.js";
    // console.table(data)

    //defining the variables
    const productContainer = document.getElementById('product-render');

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
                        <p class="price">R ${((product.price) * 18.40).toFixed(2)}</p>
                        </div>  
                        `
                        handleClick(product); 
        }).join("")

        //checking if container exists

        if (productContainer) {

            productContainer.innerHTML = productItems;

        // ADDING AN EVENT LISTENER to the product card
                document.querySelectorAll('.addBtn').forEach((button) => {

                button.addEventListener('click', function(event) {

                event.stopPropagation() //stops from triggering parent div click

                const index = this.getAttribute('data-index');

                if(checkoutArray.includes(data[index])){

                    alert(`${data[index].name} already exists, please adjust the quantity!!!`)

                } else {

                    checkoutArray.push(data[index]);
                    
                    console.log(checkoutArray)
                }
                  
            })

        })
        



        }  else {
        console.error("Element with ID 'product-render' not found");
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