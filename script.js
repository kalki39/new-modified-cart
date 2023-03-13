// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))
console.log("ram");


// signup
let submit=document.querySelector(".submit");
submit.addEventListener('click',signupUser)
function signupUser() {
    console.log("ram");
    var name = document.getElementById("name-input").value;
    var email = document.getElementById("email-input").value;
    var password = document.getElementById("pass-input").value;
    var confirmPassword = document.getElementById("confirmpass-input").value;
    

    if (name && email && password && confirmPassword && password === confirmPassword) {
        var user = {
            name: name,
            email: email,
            password: password,
        };
        const users = localStorage.getItem("users");
        console.log("USERS", users);
        var usersArr = [];
        if (users) {
            usersArr = JSON.parse(localStorage.getItem("users"));
            if (usersArr.filter((user) => user.email === email).length == 0) {
                usersArr.push(user);
            } else {
                document.getElementById("error-message").innerText =
                    "user with this email already exists";
            }
        } else {
            usersArr = [user];
        }

        localStorage.setItem("users", JSON.stringify(usersArr));
        window.location.href = "/login.html";
    }
    else{
        document.getElementById("error-message").innerText ="PLEASE FILL ALL DETAILS"
    }
}


// login






