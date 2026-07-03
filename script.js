const nao=document.getElementById("nao");

nao.addEventListener("mouseover",()=>{

const largura=window.innerWidth-150;

const altura=window.innerHeight-100;

nao.style.left=Math.random()*largura+"px";

nao.style.top=Math.random()*altura+"px";

});

document.getElementById("sim").onclick=()=>{

window.location="escolha.html";

}