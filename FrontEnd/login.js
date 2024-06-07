

//event listener


const form = document.getElementById("tow");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const data = {
        email: email,
        password: password
    };
    //creation de charge utile
    const chargeUtile = JSON.stringify(data)
    const url = "http://localhost:5678/api/users/login"
    //appel fech
    fetch(url, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: chargeUtile
    })
        .then(res => res.json())
        .then(function (response) {
            let token = response.token
            localStorage.setItem = ("token", token)
            window.location = "index.html"
        }).catch(error => {
            let messageError = "mot de passe erooné";
            alert(error.response.messageError)
        })
})

