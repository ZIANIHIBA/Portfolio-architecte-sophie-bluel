
 galleryDiv = document.querySelector(".gallery");
 menucategoryDiv = document.querySelector(".menucategory");

async function getworks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json() 
}
getworks()

        async function displayWorks(){ 
        const works = await getworks();
        works.forEach((work) => {
        createWorks(work);  }) 
        };
        displayWorks()

        /***cretion de galerie */
        async function createWorks(work){ 
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work.imageUrl;
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        //mettere les elemnts dans le DOm
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
     
    })
   
   
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
   if(btnId!==0){
    
    const filterworks=works.filter((work)=>{
    return work.categoryId==btnId;
    console.log(filterworks)
     });
    filterworks.forEach((work)=>{
        createWorks(work);
})
}
else{
    displayWorks()
}
    });
  })
}
filterCategorys()



/******creatio de page delogin */
