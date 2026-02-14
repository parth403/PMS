// Function to update the product
function updateProduct(id){
    let products=JSON.parse(localStorage.getItem("products")||"[]");
    let index=products.findIndex(p=>p.id==id);
    if (index==-1){
        return;
    }
    products[index].name=document.getElementById("exampleFormControlInput1").value;
    products[index].price=document.getElementById("exampleFormControlInput2").value;
    products[index].description=document.getElementById("exampleFormControlTextarea1").value;
    localStorage.setItem("products",JSON.stringify(products));
    allproducts=products;
    alert("Product updated successfully");
    afterUpdate();

}

// Function after update
function afterUpdate(){
    document.getElementById("editId").value="";
    document.getElementById("submitbtn").innerText="Submit";
    refreshCards(allproducts);
}

//Function to edit product
function edit_product(id){
    let products=JSON.parse(localStorage.getItem("products")||"[]");
    let product = products.find(p=>p.id==id);
    if(!product) return;
    document.getElementById("exampleFormControlInput1").value=product.name;
    document.getElementById("exampleFormControlInput2").value=product.price;
    document.getElementById("exampleFormControlTextarea1").value=product.description;
    document.getElementById("editId").value=id;
    document.getElementById("submitbtn").innerText="Update";
}

// Function to delete product
function delete_product(id){
    let products=JSON.parse(localStorage.getItem("products")||"[]");
    id=Number(id);
    products=products.filter(p=>p.id!==id);
    localStorage.setItem("products",JSON.stringify(products));
    allproducts=products;
    refreshCards(allproducts);
}