//afin d'appeler les fonctions
/*window.addEventListener("DOMContentLoaded", function(event) {
   displayWorks()
  });*/
 
 const galleryDiv = document.querySelector(".gallery");
const  menucategoryDiv = document.querySelector(".menucategory");
 /*const btnTous=document.createElement('button');
 menucategoryDiv.appendChild(btnTous);
 btnTous.id=0*/

async function getworks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json() 
}
getworks()

       export async function displayWorks(){ 
        const works = await getworks();
       
        works.forEach((work) => {
        createWorks(work);  }) 
        };
        displayWorks();
     
        /***creation de galerie */
        async function createWorks(work){ 
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        //mettre les elements dans le DOm
        galleryDiv.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    
};



/**create buttonTous */
/*const button = document.createElement("button");
button.textContent="Tous"
button.id=0*/

//categoryDiv .appendChild(button)

//cibler les categories
   async function getCategory() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categorys = await response.json(); 
        categorys.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        menucategoryDiv.appendChild(button);
        //console.log(  menucategoryDiv)
        button.id=category.id 
      
        const allBtn=document.querySelectorAll(".menucategory button")
    console.log(allBtn)
    allBtn.forEach (btn =>{ 
        btn.addEventListener("click", ()=>{
            document.querySelector(".clickBtn")?.classList.remove("clickBtn")
            btn.classList.add("clickBtn")
           // btn.classList.remove("clickBtn")
        })
        btn.classList.remove("clickBtn");
      }
    )
    })
   //ajouter une classe pour mettre en forme les bouttons
    
}
getCategory()

//ajout filter
async function filterCategorys(){
    const  works= await getworks();
   const buttons=document.querySelectorAll(".menucategory button")
  buttons.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
       const btnId= e.target.id;
       galleryDiv.innerHTML="";
   if(btnId!=0){
    
    const filterworks=works.filter((work)=>{
    return work.categoryId==btnId;
    console.log(filterworks)
     });
    filterworks.forEach((work)=>{
        createWorks(work);
})
}
else{
    console.log('tous')
    displayWorks()
    
    //document.getElementById('0').addEventListener("click",displayWorks())
}
    });
  });
}
filterCategorys()


