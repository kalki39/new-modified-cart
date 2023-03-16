if (document.readyState == 'loading') {
    // document.addEventListener('DOMContentLoaded', ready)
} else {
    // ready()
}


// function ready(){
let items = document.querySelector('.items');
let cartItems = document.querySelector('.list');
const home = document.querySelector('.home');

home.addEventListener("click", () => {
    if (localStorage.getItem('currentUser')) {
        window.location.href = '../shop/index.html';
    }
    else {
        window.location.href = '../index.html';
    }
})


if (localStorage.getItem('currentUser')) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    let products = JSON.parse(localStorage.getItem('products'))
    console.log(products);
    let addedProduct = currentUser.addCart;
    // addedProduct.addEventListener('change',)

    addedProduct.map(item => {
        products.forEach(element => {
            if (element.id == item) {
                items.innerHTML += `
                          <div class="item ${item}" id=${item}>
                          <img src=${element.image} alt="element" />
                          <div class="info">
                          <div class="productName">${element.title}</div>
                            <div class="row">
                              <div class="price">$${element.price}</div>
                              <div class="sized">S,M,L</div>
                            </div>
                            
                            <p class="card-rating">${element.rating.rate} &#9733;<span class="muted">(${element.rating.count})</span><span class="off">71% off</span></p>
                          </div>
                          <button class="addBtn btn-danger" id=${element.id}>Remove from Cart</button>
                        </div>`

                // var cartRow = document.createElement('div')
                // cartRow.classList.add('cart-row')
                // cartRow.id=${item};

                cartItems.innerHTML += `
                        <div class="cart-row ${item}" id=${item}>
                        <div class="productName">${element.title}</div>
                        <div class="price">$${element.price}</div>
                        </div>`
                items.querySelectorAll('.btn-danger').forEach(element => {
                    element.addEventListener('click', removeCartItem)
                });
                updateCartTotal();
            }
        });
    })

    function removeCartItem(event) {
        var buttonClicked = event.target
        let idd = buttonClicked.id;
        let cartItems = document.querySelector('.list');
        let row = cartItems.querySelectorAll('.cart-row');
        row.forEach(element => {
            if (element.id == idd) {
                element.remove();
            }
        });
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        let addedProduct = currentUser.addCart;
        let removedProduct = addedProduct.filter(it => it != idd)
        currentUser.addCart = removedProduct;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log(removedProduct);
        buttonClicked.parentElement.remove();

        updateCartTotal()
    }

}

//updating total

function updateCartTotal() {
    console.log("ctotl");
    var cartItemContainer = document.getElementsByClassName('list')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        // var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        // var quantity = quantityElement.value
        total = total + (price)
    }
    // total = Math.round(total * 100) / 100
    total = total.toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}




document.getElementById("checkout").onclick = f;


async function f(e) {

    e.preventDefault();
    let tlPrice = document.getElementsByClassName('cart-total-price')[0].innerText;
    let price = tlPrice.replaceAll('$', '');
    let successUrl = window.location.href
    if (price > 0) {
        // localStorage.removeItem('myCart');
        var options = {
            key: "rzp_test_E0rlvaLxq8ysda",
            amount: price * 100 * 83,
            currency: "INR",
            name: "Me Shop",
            description: "This is your order",
            // callback_url: "https://meshop-ecommerce-website-kalki.netlify.app/shop/index.html",
            theme: {
                color: "#000",
            },
            image:
                "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
            handler: function (response){
                    var payment_id = response.razorpay_payment_id;
                    console.log(response);    
                    if(payment_id){
                            let currentUser = JSON.parse(localStorage.getItem('currentUser'))
                            let products = JSON.parse(localStorage.getItem('products'))
                            // console.log(products);
                            currentUser.addCart = [];
                            localStorage.setItem('currentUser', JSON.stringify(currentUser));
                            document.querySelectorAll('.item').forEach(element => {
                                element.remove();
                            });
                            document.querySelectorAll('.cart-row').forEach(element => {
                                element.remove();
                            });
                            updateCartTotal()
                            order()
                    }
             }  
        };
        var razorPayGateway = new Razorpay(options);

                        razorPayGateway.open();
                  
                    
    }
    else {
        alert('Add items in cart to proceed!!')
    }
}

function order() {
    let main = document.querySelector('.mn');
   
    // console.log(document.querySelector('.items'));
    // geting tomarow date
    const today = new Date();
    // initializing tomorrow with today's date
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 2)
    setTimeout(() => {
        main.style.display = 'none';
        document.querySelector('.orderMessage').style.display='block';
    document.querySelector('.orderMessage').innerHTML += `
    <div class="tick">
         <i class="checkmark">✓</i>
    </div>
    <h2 class="sus">Success</h2>
     Your order is placed!! product will be delivered on ${tomorrow.toDateString()} .`
    }, 1000);

    setTimeout(() => {
        main.style.display = 'block';
        document.querySelector('.orderMessage').innerHTML = "";
        document.querySelector('.orderMessage').style.display='none'
    }, 35000);
}

