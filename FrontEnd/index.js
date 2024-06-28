
 
const galleryDiv = document.querySelector(".gallery");
const  menucategoryDiv = document.querySelector(".menucategory");
 

async function getworks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json() 
}
getworks();
       /***la fonction qui affiche les gallerie */
      export async function displayWorks(){ 
        const works = await getworks();
       
        works.forEach((work) => {     
        createWorks(work);  }) 
        };
        displayWorks();
     
        /***creation des balises qui vont contenir les travaux  */
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

//creer les boutons pour les categories
   async function getCategory() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categorys = await response.json(); 
        categorys.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        menucategoryDiv.appendChild(button);
        button.id=category.id 
      //pour changer le style des boutons au click
        const allBtn=document.querySelectorAll(".menucategory button")
        console.log(allBtn)
        allBtn.forEach (btn =>{ 
        btn.addEventListener("click", ()=>{
            document.querySelector(".clickBtn")?.classList.remove("clickBtn")
            btn.classList.add("clickBtn")
           
        })
        btn.classList.remove("clickBtn");
      }
    )
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
    

}
    });
  });
}
filterCategorys()


