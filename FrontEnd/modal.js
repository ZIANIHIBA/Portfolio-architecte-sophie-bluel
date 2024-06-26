//import function displayworks from index
import{displayWorks}from './index.js';


/***displaypremieremodal */
const openModal = document.querySelector(".btnopenmodal ")
const modal1 = document.getElementById('firstmodal')
const close = document.querySelector(".close")

openModal.addEventListener("click", function () {

    modal1.style.display = 'flex';

});
close.addEventListener("click", function () {
    modal1.style.display = 'none';
});
/****display 2 eme modal */
const btnaddphoto = document.querySelector(".addphoto");
const modal2 = document.getElementById("secondModal");
const span = document.querySelector("#secondModal .modal1 span");
const flechegauche = document.querySelector(".modal1 i")



btnaddphoto.addEventListener("click", () => {
    modal1.style.display = 'none';
    modal2.style.display = 'flex';
});
span.addEventListener("click", () => {
    modal2.style.display = 'none'
})
flechegauche.addEventListener("click", () => {
    modal2.style.display = 'none';
    modal1.style.display = 'flex';
})

/***mettre les photos de la premiere modale */
async function getworks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

//ajout l'evenment au click sur les bins
async function displayworksmodal() {
    const modalgalerie = document.querySelector(".Modalgalerie");
    modalgalerie.innerHTML = ''
    const works = await getworks();
    works.forEach(work => {
        const figure = document.createElement("figure")
        const image = document.createElement("img");
        const span = document.createElement("span");
        span.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        span.classList.add("bin");
        span.id = work.id;
        figure.setAttribute('id', work.id);
        image.src = work.imageUrl;
        image.alt=work.titleImg;
        image.setAttribute('category',work.categoryId);
        modalgalerie.appendChild(figure);
        figure.appendChild(image);
        figure.appendChild(span);

        //evenement supprimer au clic
        span.addEventListener("click", async (e) => {
            e.preventDefault();
            
            if  (confirm("Voulez-vous supprimer le projet ?")) {
                        const id = span.id
                        console.log(id)
                        const token = localStorage.getItem('token');
        
                        try {
                            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'accept': ' */*',
                                    'Authorization': `Bearer ${token}`,
                                }
                            });

                    if (response.ok) {
                        displayWorks()
                        displayworksmodal();
                    }
                    else {
                        alert("echec de la supression")
                    }

                } catch (error) {
                    console.log("une error est survenu,error");

                }
            } 

        })
    })

};
displayworksmodal()

//function ajouter les photos dns la gallerie


//envoie de nouveau projet au backend
//const du formfill
const modalform = document.querySelector(".modalform")
const Imgfile = document.querySelector(".contenairNew-img img");

const inputfile = document.getElementById("addPhoto")
const labelfile = document.querySelector(".modalform-textAddPhoto");
const iconfile = document.querySelector(".fa-image");
const textfile = document.querySelector(".modalform-desc")

//const
const titleImg = document.getElementById("title");
const categoryImg = document.getElementById("categoryInput");
const submitImg = document.querySelector(".modal2btn");
//event listener sur l'input file pour previsualiser
inputfile.addEventListener("change", () => {
    const file = inputfile.files[0]
    //console.log(file)
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            Imgfile.style.display = "flex"
            Imgfile.src = e.target.result
            Imgfile.style.width = "110px";
            Imgfile.style.height = "153px";

            labelfile.style.display = "none"
            iconfile.style.display = "none"
            textfile.style.display = "none"
        }
        reader.readAsDataURL(file);
    }
})
// Ajout des catégories au formulaire d'ajout de projet 
async function displaycategoriesmodal() {
    fetch('http://localhost:5678/api/categories')

        .then(response => response.json())
        .then(categories => {
            const select = document.getElementById("categoryInput");
            const optionselect = document.createElement("option");
            select.appendChild(optionselect);
            categories.forEach((category) => {
                const option = document.createElement("option");
                option.innerText = category.name
                option.value = category.id
                select.appendChild(option)
            }
            );
        })
} displaycategoriesmodal()

//message d'erreur
const errorform = document.getElementById("errorForm");


//passage du bouton valider au vert
inputfile.addEventListener("input", fillform);
titleImg.addEventListener("input", fillform);
categoryImg.addEventListener("input", fillform);

function fillform() {
    if (inputfile.value !== "" && titleImg.value !== "" && categoryImg.value !== "") {
        submitImg.className = "active";
        errorform.style.display = "none";
    }
    else {
        errorform.innerText = "Veuillez renseigner tous les champs";
    }
}

//fonction pour valider le formulaire
async function validationformulaire() {
    const imgfileUrl = document.getElementById("addPhoto").files[0];
    const titleImgvalue = document.getElementById("title").value;
    const categoryImg = document.getElementById("categoryInput").value;
   //const emplacement de la nouvelle photo
    const gallery = document.querySelector(".gallery");
    const modalgalerie = document.querySelector(".Modalgalerie")
    //const modalcontainer = document.getElementById("firstmodal")
    //console.log(imgfileUrl)
    //les information pour les envoyer
    let formData = new FormData();
    formData.append("image", imgfileUrl);
    formData.append("title", titleImgvalue);
    formData.append("category", categoryImg);
   //const data=new URLSearchParams(formData);
    const token = localStorage.getItem("token")
//console.log(token)
   await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            //"Content-Type":"multipart/form-data",
            'Authorization': ` Bearer ${token}`,
        },
        body: formData,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("erreur de transfert");
        })


       .then((data) => {
        console.log(data)
            gallery.innerHTML = ""
            modalgalerie.innerHTML = ""
            displayWorks();
            displayworksmodal();
        })
        .catch((error) => {
          console.log(error)
        })
}





modalform.addEventListener("submit", (event) => {
    event.preventDefault();
   validationformulaire();
})
