async function checkuserconnexion (){
    const token=localStorage.getItem('token');
    //console.log(token)  
     
const userconnected= token != null && token != undefined && token !='';
if(userconnected){
    const login=document.querySelector('.login');
    const edition=document.querySelector('.edition');
    edition.style.display="unset";
    login.innerHTML='';
    const logout=document.querySelector('.logout')
    logout.innerHTML='logout';
    //disparaitre les bouttons
    const btnfilterCategorie=document.querySelector('.menucategory ');
    btnfilterCategorie.style.display="none"
    //faire apparaitre icone de la modale
    const btnopenModel=document.querySelector('.btnopenmodal');
    btnopenModel.style.display="unset";
    //faire apparaitre la barre noire
    
}

 }
checkuserconnexion()
 function userlogout (){
    const logout=document.querySelector('.logout');
  
    logout.addEventListener("click",()=>{
        localStorage.clear();
        logout.innerHTML="";
         

        //apparaitre les boutons  filtres
        btnfilterCategorie.style.display="unset";
        //cacher l'icone de la modale
        btnopenModel.style.display='none';
       
    })

 }
userlogout();