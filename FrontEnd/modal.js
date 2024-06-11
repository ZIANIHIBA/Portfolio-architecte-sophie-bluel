/***displaypremieremodal */
const openModal=document.querySelector(".open ")
const modal1=document.querySelector('.firstmodal')
const close=document.querySelector(".close")

openModal.addEventListener("click",function(){
    modal1.style.display='flex';
    
});
close.addEventListener("click",function (){
    modal1.style.display='none';
});
/****display 2 eme modal */
const btnaddphoto=document.querySelector(".addphoto");
const modal2=document.querySelector(".secondModal");
const span=document.querySelector(".secondModal .modal1 span");
const flechegauche=document.querySelector(".modal1 i")
console.log(flechegauche)


btnaddphoto.addEventListener("click",()=>{
    modal1.style.display='none';
    modal2.style.display='flex';
});
span.addEventListener("click",()=>{
    modal2.style.display='none'
})
flechegauche.addEventListener("click",()=>{
    modal2.style.display='none';
    modal1.style.display='flex';
})