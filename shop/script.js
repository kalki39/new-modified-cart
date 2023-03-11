
let menContainer = document.getElementById('men')
let womenContainer = document.getElementById('women')
let jewContainer = document.getElementById('jewel')
let elecContainer = document.getElementById('electr')

let products = {}

fetch(`https://fakestoreapi.com/products/`).then(res => res.json()).then(data => {
  console.log(data);
  products.data = data;

  //storing product all in local storage

  if (localStorage.getItem('products') == null) {
    localStorage.setItem('products', JSON.stringify(data))
  }
  data.map((item) => {

    console.log(item.category);
    if (item.category == "women's clothing") {
      womenContainer.innerHTML += `
        <div class="womens item">
        <img src=${item.image} alt="Item" />
        <div class="info">
          <div class="productName">${item.title}</div>
          <div class="row">
            <div class="price">$${item.price}</div>
            <div class="sized">S,M,L</div>
          </div>
          <p class="card-rating">${item.rating.rate} &#9733;<span class="muted">(${item.rating.count})</span></p>   
        </div>
        <button class="addBtn" id=${item.id}>Add to Cart</button>
      </div>`
    }
    if (item.category == "men's clothing" && item.id != 1) {
      menContainer.innerHTML += `
        <div class="item mens">
        <img src=${item.image} alt="Item" />
        <div class="info">
        <div class="productName">${item.title}</div>
          <div class="row">
            <div class="price">$${item.price}</div>
            <div class="sized">S,M</div>
          </div>
          <p class="card-rating">${item.rating.rate} &#9733;</p> 
        </div>
        <button class="addBtn" id=${item.id}>Add to Cart</button>
      </div>`
    }
    if (item.category == "men's clothing" && item.id != 1) {
      menContainer.innerHTML += `
        <div class="item mens">
        <img src=${item.image} alt="Item" />
        <div class="info">
        <div class="productName">${item.title}</div>
          <div class="row">
            <div class="price">$${item.price}</div>
            <div class="sized">L,XL</div>
          </div>
          <p class="card-rating">${item.rating.rate} &#9733;</p> 
        </div>
        <button class="addBtn" id=${item.id}>Add to Cart</button>
      </div>`
    }
    if (item.category == "jewelery") {
      jewContainer.innerHTML += `
        <div class="item jewellery">
        <img src=${item.image} alt="Item" />
        <div class="info">
        <div class="productName">${item.title}</div>
          <div class="row">
            <div class="price">$${item.price}</div>
            <div class="sized">S,M,L</div>
          </div>
          <p class="card-rating">${item.rating.rate} &#9733;</p> 
        </div>
        <button class="addBtn" id=${item.id}>Add to Cart</button>
      </div>`
    }
    if (item.category == "electronics") {
      elecContainer.innerHTML += `
        <div class="item electronics">
        <img src=${item.image} alt="Item" />
        <div class="info">
        <div class="productName">${item.title}</div>
          <div class="row">
            <div class="price">$${item.price}</div>
            <div class="sized">S,M,L</div>
          </div>
          <p class="card-rating">${item.rating.rate} &#9733;</p> 
        </div>
        <button class="addBtn" id=${item.id}>Add to Cart</button>
      </div>`
    }
  })

}).catch((err) => console.log("Error in API is", err))

console.log(products);




function filterProduct(value) {
  console.log(value);
  value = value.toLowerCase();
  //Button class code
  let buttons = document.querySelectorAll(".filter");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  //select all cards
  let elements = document.querySelectorAll(".item");
  let allprices = document.querySelectorAll('.priceRance');
  const myRating = document.querySelector('#myRange');
  
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    // const zero = document.querySelector('#checkbox0');
    allprices.forEach(ele => {
      ele.checked = false;
      myRating.value=0;
    });


    if (value == "all") {
      // zero.checked = false;
      element.classList.remove("hide");
      element.parentElement.parentElement.classList.remove("hide")
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        // zero.checked = false;
        //display element based on category
        element.classList.remove("hide");
        element.parentElement.parentElement.classList.remove("hide")
        let cards = document.querySelectorAll(".item");
        // console.log(cards);
      } else {
        //hide other elements
        element.classList.add("hide");
        element.parentElement.parentElement.classList.add("hide")
      }
    }
  });
}

//FILTER PRODUCT by price RANGE

const zero = document.querySelector('#checkbox0');
const twentyfive = document.querySelector('#checkbox25');
const fifty = document.querySelector('#checkbox50');
const hundred = document.querySelector('#checkbox100');
const myRating = document.querySelector('#myRange');
let myValue = myRating.value;
zero.addEventListener('change', () => {
  if (zero.checked == false) {
    zero.checked = false;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let cardElem = parseInt(elem.querySelector('.price').innerText);
      elem.classList.remove('hide');
    })
  }
  else {
    zero.checked = true;
    twentyfive.checked = false;
    fifty.checked = false;
    hundred.checked = false;
    myRating.value=0;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let ruppee = elem.querySelector('.price').innerText
      let cardElem = parseInt(ruppee.replaceAll('$', ''));
      console.log(cardElem);
      elem.classList.add('hide');
      if (cardElem >= 0 && cardElem <= 25) {
        elem.classList.remove('hide');
      }
    })
  }

})
twentyfive.addEventListener('change', () => {
  if (twentyfive.checked == false) {
    twentyfive.checked = false;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let cardElem = parseInt(elem.querySelector('.price').innerText);
      elem.classList.remove('hide');
    })
  }
  else {
    twentyfive.checked = true;
    zero.checked = false;
    fifty.checked = false;
    hundred.checked = false;
    myRating.value=0;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let ruppee = elem.querySelector('.price').innerText
      let cardElem = parseInt(ruppee.replaceAll('$', ''));
      console.log(cardElem);
      elem.classList.add('hide');
      if (cardElem >= 26 && cardElem <= 50) {
        elem.classList.remove('hide');
      }
    })
  }

})
fifty.addEventListener('change', () => {
  if (fifty.checked == false) {
    fifty.checked = false;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let cardElem = parseInt(elem.querySelector('.price').innerText);
      elem.classList.remove('hide');
    })
  }
  else {
    fifty.checked = true;
    twentyfive.checked = false;
    zero.checked = false;
    hundred.checked = false;
    myRating.value=0;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let ruppee = elem.querySelector('.price').innerText
      let cardElem = parseInt(ruppee.replaceAll('$', ''));
      console.log(cardElem);
      elem.classList.add('hide');
      if (cardElem >= 51 && cardElem <= 100) {
        elem.classList.remove('hide');
      }
    })
  }

})
hundred.addEventListener('change', () => {
  if (hundred.checked == false) {
    hundred.checked = false;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let cardElem = parseInt(elem.querySelector('.price').innerText);
      elem.classList.remove('hide');
    })
  }
  else {
    hundred.checked = true;
    twentyfive.checked = false;
    fifty.checked = false;
    zero.checked = false;
    myRating.value=0;
    let userCard = "";
    document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
    userCard.forEach(function (elem) {
      let ruppee = elem.querySelector('.price').innerText
      let cardElem = parseInt(ruppee.replaceAll('$', ''));
      console.log(cardElem);
      elem.classList.add('hide');
      if (cardElem >= 100) {
        elem.classList.remove('hide');
      }
    })
  }

})


//Filter product by rating


myRating.oninput = function () {
  myValue = this.value;
  let userCard = "";
  document.querySelectorAll('.item') ? userCard = document.querySelectorAll('.item') : userCard = "";
  userCard.forEach(function (elem) {
      let cardElem = parseFloat(elem.querySelector('.card-rating').innerText);
      console.log(cardElem);
      elem.classList.add('hide');
      if (cardElem >= myValue) {
          elem.classList.remove('hide');
      }
      if (myValue == 0) {
          elem.classList.remove('hide');
      }
  })
}


//Search button click
function search() {
  //initializations
  console.log("ff");
  let searchInput = document.getElementById("search").value;
  let elements = document.querySelectorAll(".productName");
  let cards = document.querySelectorAll(".item");
  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
};

setTimeout(() => {

  //cart button modify when btn is clicked

  var addToCartButtons = document.querySelectorAll('.addBtn')
  console.log(addToCartButtons);
  let curr = JSON.parse(localStorage.getItem('currentUser'))
  let array = curr.addCart;
  array.forEach(element => {
    addToCartButtons.forEach(button => {
      if (button.id == element) {
        button.classList.add('added');
        button.innerHTML = "ADDED";
        button.style.backgroundColor = "#42ad51";
      }
    });
  });

  //set local storage when add to cart button is clicked

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!button.className.includes('added')) {
        button.classList.add('added');
        console.log(button.className);
        let curr = JSON.parse(localStorage.getItem('currentUser'))
        curr.addCart.push(Number(button.id));
        button.innerHTML = "ADDED";
        button.style.backgroundColor = "#42ad51";
        localStorage.setItem('currentUser', JSON.stringify(curr))
      }
    })
  });

}, 1000);