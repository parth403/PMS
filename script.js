class Product {
    constructor(id, name, price, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}
function getId() {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    if (products.length == 0) {
        return 1;
    } else {
        return products[products.length - 1].id + 1;
    }
}

document.querySelector(".btn-primary").addEventListener("click", addProduct);
function addProduct() {
    let name = document.getElementById("exampleFormControlInput1").value;
    let price = document.getElementById("exampleFormControlInput2").value;
    let description = document.getElementById("exampleFormControlTextarea1",).value;
    let image = document.getElementById("exampleFormControlFile1").files[0];


let read = new FileReader();
read.onload = function (e) {
    let imageBase64 = e.target.result;
    let id = getId();
    let newProduct = new Product(id, name, price, description, imageBase64);
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    displayProduct(newProduct);
};
read.readAsDataURL(image);
}

function displayProduct(product){
    let container=document.getElementById("card-container");

    let card=document.createElement("div");
    card.className="card";
    card.style="width: 18rem; margin: 10px;";

    card.innerHTML=`
    <img class="card-img-top" src="${product.image}">
    <div class="card-body">
        <h5 class="card-title">${product.name} (ID: ${product.id})</h5>
        <p class="card-text">Price: ${product.price}</p>
        <p class="card-text">${product.description}</p>
        <button class="btn btn-secondary">Edit</button>
        <button class="btn btn-danger">Delete</button>
    </div>
    `;
    container.appendChild(card);
}

document.querySelector("#form-select").addEventListener("change",sortby);
function sortby(product){
    let sortBy=document.getElementById("#form-select").value;
    let products=JSON.parse(localStorage.getItem("products") || "[]");
    if(sortBy=="id"){
        products.sort((a,b)=>a.id - b.id);
    }else if (sortBy=="name") {
        products.sort((a,b)=> a.name.localCompare(b.name));
    }else (sortBy=="price"); {
        products.sort((a,b)=>a.price - b.price);
    }
    localStorage.setItem("products",JSON.stringify(products));
    refreshCards(products);
}

function refreshCards(){
    let refresh=document.getElementById("card-container").value;
    refresh.innerHTML="";
    let products=JSON.parse(localStorage.getItem("products") || "[]");
    products.forEach(product => displayProduct(product));

}

document.querySelector("exampleFormControlInput4").addEventListener("click",filter);
function filter(){
    let filterby=document.getElementById("exampleFormControlInput4").value;
    
}

window.onload=function(){
    let products=JSON.parse(localStorage.getItem("products") || "[]");
    products.forEach(p => displayProduct(p));
};