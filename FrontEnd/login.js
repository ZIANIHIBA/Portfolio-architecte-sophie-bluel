

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

        .then (response=> {
            if (!response.ok) {
                throw new error ("autentification echoué");
               
             }
           return response.json()
          
          
        })
        .then (data=> {
            let token = data.token
            localStorage.setItem  ("token", token)
            console.log(token)
             window.location="index.html";
           
        })
.catch(error => {
   
    //alert("mot de passe erooné")
    document.querySelector(".errorlogin").textContent="mot de passe ou email erroné";
    document.querySelector(".errorlogin").style.display="flex"
})
 })
