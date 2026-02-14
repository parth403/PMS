let allproducts=[];
class Product {
    constructor(id, name, price, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

// Function for auto increment id
function getId() {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    if (products.length == 0) {
        return 1;
    } else {
        return products[products.length - 1].id + 1;
    }
}

// Function to add Product
document.getElementById("submitbtn").addEventListener("click", saveProduct);
function addProduct() {
    let name = document.getElementById("exampleFormControlInput1").value;
    let price = document.getElementById("exampleFormControlInput2").value;
    let description = document.getElementById("exampleFormControlTextarea1").value;
    let image = document.getElementById("exampleFormControlFile1").files[0];


let read = new FileReader();
read.onload = function (e) {
    let imageBase64 = e.target.result;
    let id = getId();
    let newProduct = new Product(id, name, price, description, imageBase64);
    allproducts.push(newProduct);
    localStorage.setItem("products", JSON.stringify(allproducts));
    refreshCards(allproducts);
};
read.readAsDataURL(image);
}


//Function to save product after updating
function saveProduct()
{
    let editId=document.getElementById("editId").value;
    if(editId){
        updateProduct(editId);
    }else{
        addProduct();
    }
}

// Function to display all the products
function displayProduct(product){
    return`
    <div class="card" style="width:18rem; margin:10px;">
    <img class="card-img-top" style="width:100%; height:200px; object-fit:cover;" src="${product.image}">
    <div class="card-body">
        <h5 class="card-title">${product.name} (ID: ${product.id})</h5>
        <p class="card-text">Price: ${product.price}</p>
        <p class="card-text">${product.description}</p>
        <button class="btn btn-secondary" onclick="edit_product(${product.id})">Edit</button>
        <button class="btn btn-danger" onclick="delete_product(${product.id})">Delete</button>
    </div>
    `;
}

// Function to Sort the products by id ,name,price
document.getElementById("form-select").addEventListener("change",sortby);
function sortby(){
    let sortBy=document.getElementById("form-select").value;
    let products=[...allproducts];
    if(sortBy=="id"){
        products.sort((a,b)=>a.id - b.id);
    }else if (sortBy=="name") {
        products.sort((a,b)=> a.name.localeCompare(b.name));
    }else if (sortBy=="price") {
        products.sort((a,b)=>a.price - b.price);
    }
    localStorage.setItem("products",JSON.stringify(products));
    refreshCards(products);
}

function refreshCards(list){
    let refresh=document.getElementById("card-container");
    refresh.innerHTML="";
    list.forEach(product=>{
        refresh.innerHTML+=displayProduct(product);
    });
}

//Function to filter products by id (Ex - From:1 - To:3)
function filter(){
    let from=document.getElementById("exampleFormControlInput4").value;
    let to=document.getElementById("exampleFormControlInput5").value;

    from=parseInt(from);
    to=parseInt(to);
    let products=JSON.parse(localStorage.getItem("products")|| "[]");
    if(!from && !to){
        refreshCards(allproducts);
        return;
    }
    let filtered=products.filter(p=>{
        return p.id>=from && p.id<=to;
    });
    refreshCards(filtered);
    console.log("filter");
}

// Function to display(onload) all the products while window loads
window.onload=function(){
    allproducts=JSON.parse(localStorage.getItem("products") || "[]");
    refreshCards(allproducts);
};