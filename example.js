let p=document.getElementsByTagName("p");
localStorage.setItem("p",JSON.stringify(p));
let a= localStorage.getItem("p",JSON.stringify(p));
console.log(a);