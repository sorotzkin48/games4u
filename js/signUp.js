//Open sign-up form
const toSignUp = document.getElementById("toSignUp");
toSignUp.addEventListener("click", openForm);

function openForm(e) {
    document.getElementById("signUpForm").style.display = "block";
    toSignUp.style.display = "none";
}

//Open log-in form
const toLogIn = document.getElementById("toLogIn");
toLogIn.addEventListener("click", openForm2);

function openForm2(e) {
    document.getElementById("logInForm").style.display = "block";
    toLogIn.style.visibility = "hidden";
}

//===================================

//Sign-up function
const btnSign = document.getElementById("sign");
btnSign.addEventListener("click", signUpFunc);

function signUpFunc(e) {
    let user = {
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        wins: 0
    }
    if (!(user.name && user.password)) {
        alert('enter user name and passwond');
    } else {
        let arrOfUsers = localStorage.getItem("arrayOfUsers");
        if (!arrOfUsers)
            arrOfUsers = [];
        else
            arrOfUsers = JSON.parse(localStorage.getItem("arrayOfUsers"));
        arrOfUsers.push(user);
        console.log(arrOfUsers);
        localStorage.setItem("arrayOfUsers", JSON.stringify(arrOfUsers));

        startGameFunc(user);
    }


}

//Log-in function
const btnlog = document.getElementById("log");
btnlog.addEventListener("click", logInFunc);

function logInFunc(e) {
    let user = {
        name: document.getElementById("logName").value,
        password: document.getElementById("logPassword").value
    }

    if (!(user.name && user.password)) {
        alert('enter user name and passwond');
    } else {
        let arrOfUsers = JSON.parse(localStorage.getItem("arrayOfUsers"));
        let check = arrOfUsers.findIndex(item => { return item.name == user.name && item.password == user.password });
        if (check >= 0)
            startGameFunc(arrOfUsers[check]);
        else
            alert("Can't find such a user")
    }
}


function startGameFunc(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "../html/4games.html";
}
