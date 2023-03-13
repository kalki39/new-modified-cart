// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "<API_KEY>", // Enter the Key ID generated from the Dashboard
    amount: 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fbag-shop-vector-logo-template-260nw-1804755151.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fonline-fashion-store-logo&tbnid=WCNwZkQmIzxOXM&vet=12ahUKEwjSgfWov9n9AhWMl9gFHVEGAGMQMygCegUIARCRAQ..i&docid=Mtn9Lkj9udg_0M&w=260&h=280&q=meshop%20logo&ved=2ahUKEwjSgfWov9n9AhWMl9gFHVEGAGMQMygCegUIARCRAQ",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
};
