//function custumer singup 
function customerSignup() {
    var firstName = document.getElementById('fName').value;
    var lastName = document.getElementById('lName').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;
    var confirmPwd = document.getElementById('confirmPwd').value;
    var telNumber = document.getElementById('tel').value;
    var userId = JSON.parse(localStorage.getItem('userIdKey') || '1');
    var user = {
        id: userId,
        first_Name: firstName,
        last_Name: lastName,
        email: email,
        pwd: pwd,
        confirmPwd: confirmPwd,
        tel: telNumber,
        role: 'user'
    }
    var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    usersTab.push(user);
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('userIdKey', userId + 1);
}
//function custumer login 
function login() {
    var email = document.getElementById('loginEmail').value;
    var pwd = document.getElementById('loginPwd').value;
    var findedUser = searchUser(email, pwd);
    if (findedUser) {
        if (findedUser.role == 'admin') {
            //save user email into LS
            localStorage.setItem('connectedUserId', findedUser.id);
            // Go To facture.html
            location.replace('index.html');

        } else {
            //save user email into LS
            localStorage.setItem('connectedUserId', findedUser.id);
            // Go To facture.html
            location.replace('shop.html');

        }
    } else {
        document.getElementById('loginMsgError').innerHTML = 'Please check Email/pwd';
        document.getElementById('loginMsgError').style.color = 'red';
    }
}
//function verif email and pwd exist
function searchUser(emailParam, pwdParam) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == emailParam && users[i].pwd == pwdParam) {
            findedUser = users[i];
            break;
        }
    }
    return findedUser;
}
//function admin signUp
function adminSignup() {
    var firstName = document.getElementById('adminFirstName').value;
    var lastName = document.getElementById('adminlastName').value;
    var email = document.getElementById('adminemail').value;
    var pwd = document.getElementById('adminpwd').value;
    var confirmPwd = document.getElementById('adminconfirmPwd').value;
    var telNumber = document.getElementById('adminTel').value;
    var fax = document.getElementById('fax').value;
    var adminAdress = document.getElementById('adminAdress').value;
    var companyId = document.getElementById('companyId').value;
    var companyName = document.getElementById('companyName').value;

    var userId = JSON.parse(localStorage.getItem('userIdKey') || '1');
    var user = {
        id: userId,
        first_Name: firstName,
        last_Name: lastName,
        email: email,
        pwd: pwd,
        confirmPwd: confirmPwd,
        tel: telNumber,
        fax: fax,
        adminAdress: adminAdress,
        companyId: companyId,
        companyName: companyName,

        role: 'admin'
    }
    var usersTab = JSON.parse(localStorage.getItem('users') || '[]');
    usersTab.push(user);
    localStorage.setItem('users', JSON.stringify(usersTab));
    localStorage.setItem('userIdKey', userId + 1);
}
//function add product
function addProduct() {
    var nameProduct = document.getElementById('nameProductId').value;
    var priceProduct = document.getElementById('priceProductId').value;
    var stock = document.getElementById('stockId').value;
    var isNameProductValid = verifnameProduct(nameProduct, 3);
    var isPriceProductValid = verifpriceProduct(priceProduct, 0);
    var isStockvalid = verifpriceProduct(stock, 10);
    //njib iduser
    var idUser = JSON.parse(localStorage.getItem('connectedUserId'));
    var productId = JSON.parse(localStorage.getItem('productIdKey') || '1');
    var category = document.getElementById('productCategory').value;


    if (isNameProductValid && isPriceProductValid && isStockvalid) {
        var product = {
            name: nameProduct,
            price: priceProduct,
            stock: stock,
            idUser: idUser,
            id: productId,
            category: category,
            isConfirmedd:false
        };
        var productTab = JSON.parse(localStorage.getItem('products') || '[]');
        productTab.push(product);
        localStorage.setItem('products', JSON.stringify(productTab));
        localStorage.setItem('productIdKey', productId + 1);
    } else {
        alert('error');
    }
}
//function verif nameProduct.length
function verifnameProduct(ch, nbr) {
    return (ch.length > nbr)
}
//function verif price and stock
function verifpriceProduct(a, b) {
    return (a > b)
}
//function add category
function addCategory() {
    var nameCategory = document.getElementById('nameCategoryId').value;
    var idUser = JSON.parse(localStorage.getItem('connectedUserId'));
    var categoryId = JSON.parse(localStorage.getItem('categoryIdKey') || '1');
    var category = {
        name: nameCategory,
        Id: categoryId,
        idUser: idUser
    };
    var categories = JSON.parse(localStorage.getItem('categories') || '[]');
    categories.push(category);
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('categoryIdKey', categoryId + 1);
}
//function option des categories into add product
function generateOption() {
    var categories = JSON.parse(localStorage.getItem('categories') || '[]');
    var connectedUserId = localStorage.getItem('connectedUserId');
    var categoriesSelect = '';
    //verifier!!!!!
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].idUser == connectedUserId) {
            categoriesSelect = categoriesSelect + `
    <option value="${categories[i].name}">${categories[i].name}</option>`

        }
    }
    document.getElementById('productCategory').innerHTML = categoriesSelect;

}
function getObjectsFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function getConnectedUser() {
    return localStorage.getItem('connectedUserId');
}
function displayUserProducts() {
    var products = getObjectsFromLS('products');///////
    var connectedUserId = getConnectedUser();
    var myProducts = getUserProducts(connectedUserId, products);
    var productsDiv = ``;
    for (let i = 0; i < myProducts.length; i++) {
        productsDiv = productsDiv + `
        <div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p2.jpg" alt="">
							<div class="product-details">
								<h6>${myProducts[i].name} </h6>
								<div class="price">
									<h6>${myProducts[i].price}</h6>
									<h6 class="l-through">${myProducts[i].price}</h6>
								</div>
								<div class="prd-bottom">
									<div class="social-info">
										<span class="ti-bag"></span>
										<button class="hover-text" onclick="goToDisplay(${myProducts[i].id})">Display</button>
									</div>
                                    <div class="social-info">
										<span class="ti-bag"></span>
										<button class="hover-text" onclick="deleteObject(${getObjectPositionById(myProducts[i].id,products)},'products')">Delete</button>
									</div>
								</div>
							</div>
						</div>
					</div>`
    }
    document.getElementById('products').innerHTML = productsDiv;

}
function getUserProducts(userId, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (userId == productsTab[i].idUser) {
            myProducts.push(productsTab[i]);
        }
    }
    return myProducts;
}
//function display
function goToDisplay(idProduct) {
    localStorage.setItem('selectedProductId', idProduct);
    location.replace('single-product.html')
}
function searchProductById(id) {
    var products = getObjectsFromLS('products');
    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            findedProduct = products[i];
            break;
        }
    }
    return findedProduct;
}
//function editProduct (single-product)
function editProduct() {
    var idProduct=localStorage.getItem('selectedProductId');
    var findedProduct= searchProductById(idProduct);
    var editForm = `
    
			<div class="row">
				<div class="col-lg-4  col-md-6 col-sm-6">
                    <div >
                        <label>Price</label>
                        <input type="text" placeholder="Product Price" id="newPriceId" value=${findedProduct.price}>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="text" placeholder="Product Qty" id="newStockId" value=${findedProduct.stock}>
                    </div>
                    <div class="col-md-12 form-group">
						<button type="submit" value="submit" class="primary-btn" onclick="validateEdit()" >Validate Edit</button>
					</div>
                </div>		
			</div>`
    document.getElementById('editFormDiv').innerHTML=editForm;
}
// fonction validateEdit(button validate Edit=>editProduct)
function validateEdit() {
    var newPrice=document.getElementById('newPriceId').value;
    var newtStock=document.getElementById('newStockId').value;
    var selectedProductId=localStorage.getItem('selectedProductId');
    var products=getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id==selectedProductId) {
            products[i].price=newPrice;
            products[i].stock=newtStock;
            break;
        }
    }
    localStorage.setItem('products',JSON.stringify(products));
    location.replace('products.html');
}
//fonction delete products 
function deleteProduct(pos) {
    var products=getObjectsFromLS('products');
    products.splice(pos,1);
    localStorage.setItem('products',JSON.stringify(products));
    location.reload();
}
//generic function deleteObject
function deleteObject(pos,key) {
    var objects=getObjectsFromLS(key);
    objects.splice(pos,1);
    localStorage.setItem(key,JSON.stringify(objects));
    location.reload();
}
// function deleteOrderAndUpdateStock that allows to delete order by id and update product stock by ID
function deleteOrderAndUpdateStock(pos,key,idProduct,qty) {
    var objects=getObjectsFromLS(key);
    objects.splice(pos,1);
    localStorage.setItem(key,JSON.stringify(objects));
    var products=getObjectsFromLS('products');

    for (let i = 0; i < products.length; i++) {
        if (products[i].id==idProduct) {
            products[i].stock = products[i].stock+qty;
            break;  
        }
    }
    localStorage.setItem('products',JSON.stringify(products));
    location.reload();
}
//function generateProductsTable that display all products into table from LS : products
function generateProductsTable() {
    var products=getObjectsFromLS('products');
    var productTable=`
    <table class="table">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>category</th>
                <th>Actions</th>
            </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product=products[i];
         productTable+=`
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>

            </tr>`;
    }
    productTable+='</table>';
    document.getElementById('idAllProductsTable').innerHTML=productTable;  
}
function getUserProducts(userId, productsTab) {
    var myProducts = [];
    for (let i = 0; i < productsTab.length; i++) {
        if (userId == productsTab[i].idUser && productsTab[i].isConfirmedd==true ) {
            myProducts.push(productsTab[i]);
        }
    }
    return myProducts;
}
//function display
function goToDisplay(idProduct) {
    localStorage.setItem('selectedProductId', idProduct);
    location.replace('single-product.html')
}
//function  searchProductById
function searchProductById(id) {
    var products = getObjectsFromLS('products');
    var findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            findedProduct = products[i];
            break;
        }
    }
    return findedProduct;
}
//function editProduct (single-product)
function editProduct() {
    var idProduct=localStorage.getItem('selectedProductId');
    var findedProduct= searchProductById(idProduct);
    var editForm = `
    
			<div class="row">
				<div class="col-lg-4  col-md-6 col-sm-6">
                    <div >
                        <label>Price</label>
                        <input type="text" placeholder="Product Price" id="newPriceId" value=${findedProduct.price}>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="text" placeholder="Product Qty" id="newStockId" value=${findedProduct.stock}>
                    </div>
                    <div class="col-md-12 form-group">
						<button type="submit" value="submit" class="primary-btn" onclick="validateEdit()" >Validate Edit</button>
					</div>
                </div>		
			</div>`
    document.getElementById('editFormDiv').innerHTML=editForm;
}
// function validateEdit(button validate Edit=>editProduct)
function validateEdit() {
    var newPrice=document.getElementById('newPriceId').value;
    var newtStock=document.getElementById('newStockId').value;
    var selectedProductId=localStorage.getItem('selectedProductId');
    var products=getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id==selectedProductId) {
            products[i].price=newPrice;
            products[i].stock=newtStock;
            break;
        }
    }
    localStorage.setItem('products',JSON.stringify(products));
    location.replace('products.html');
}
//function delete
function deleteProduct(pos) {
    var products=getObjectsFromLS('products');
    products.splice(pos,1);
    localStorage.setItem('products',JSON.stringify(products));
    location.reload();

    
}
//function generateProductsTable
function generateProductsTable() {
    var products=getObjectsFromLS('products');
    var productTable=`
    <table class="table">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>category</th>
                <th>Actions</th>
            </tr>`;
    for (let i = 0; i < products.length; i++) {
        var product=products[i];
         productTable+=`
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-sucees" onclick="confirmProduct(${product.id})">Confirm</button>
                </td>

            </tr>`;
    }
    productTable+='</table>';
    document.getElementById('idAllProductsTable').innerHTML=productTable;  
}
//function generateUsersTable
function generateUsersTable() {
    var users=getObjectsFromLS('users');
    var userTable=`
    <table class="table">
            <tr>
                <th>first_Name</th>
                <th>last_Name</th>
                <th>email</th>
                <th>tel</th>
                <th>Actions</th>
            </tr>`;
    for (let i = 0; i < users.length; i++) {
        var user=users[i];
        userTable+=`
            <tr>
                <td>${user.first_Name}</td>
                <td>${user.last_Name}</td>
                <td>${user.email}</td>
                <td>${user.tel}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    <button class="btn btn-sucees" onclick="confirmProduct(${user.id})">Confirm</button>
                </td>

            </tr>`;
    }
    userTable+='</table>';
    document.getElementById('idAlluserTable').innerHTML=userTable;  
}
//function confirmProduct
function confirmProduct(id) {
    var products=getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id==id) {
            products[i].isConfirmedd=true;
            break;
        }  
    }
    localStorage.setItem('products', JSON.stringify(products));
    
}
//function shopProducts
function shopProducts() {
    var products=getObjectsFromLS('products');
    var confirmedProducts=[];
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmedd==true) {
            confirmedProducts.push(products[i]);
        }
    }
    var productsDiv=``;
    for (let i = 0; i < confirmedProducts.length; i++) {
        var product=confirmedProducts[i];
        productsDiv+= `
        <div class="col-lg-4 col-md-6">
							<div class="single-product">
								<img class="img-fluid" src="img/product/p1.jpg" alt="">
								<div class="product-details">
									<h6>${product.name}</h6>
									<div class="price">
										<h6>$${product.price}</h6>
                                        <h6 class="l-through">$${product.price}</h6><br>
                                        <h6>${product.category}</h6>
										
									</div>
									<div class="prd-bottom">

										<div href="" class="social-info">
											<span class="ti-bag"></span>
											<button class="btn hover-text" onclick="goToDisplay(${product.id})" style="background-color:#fff">Display</button>
										</div>
										<div href="" class="social-info">
											<span class="lnr lnr-heart"></span>
											<button class="btn hover-text" onclick="addToWishList(${product.id})" style="background-color:#fff">WishList</button>
										</div>
										
										<a href="" class="social-info">
											<span class="lnr lnr-move"></span>
											<p class="hover-text">view more</p>
										</a>
									</div>
								</div>
							</div>
						</div>
        `
        
    }
    document.getElementById('productsDiv').innerHTML=productsDiv;
}
//function addToWishList : create wishlist object and save it to LS key : wishlist
function addToWishList(id) {
    var connectedUserId=getConnectedUser();
    var wishListId= JSON.parse(localStorage.getItem('wishListIdKey')||'1');
    var wishListTab=getObjectsFromLS('wishList');
    var wishListObj={
        id:wishListId,
        productId:id,
        userId:connectedUserId
    }
    wishListTab.push(wishListObj);
    localStorage.setItem('wishList',JSON.stringify(wishListTab));
    localStorage.setItem('wishListIdKey',wishListId+1);  
    location.replace('wishlist.html');
}
//function searchUserById
function searchUserById(id) {
    var users = getObjectsFromLS('users');
    var findedUser;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            findedUser = users[i];
            break;
        }
    }
    return findedUser;
}
//function displayProductInfoByUserRole
function displayProductInfoByUserRole() {
    var connectedUserId=getConnectedUser();
    var productInfoBloc=``;
    if (connectedUserId) {
        var findedUser=searchUserById(connectedUserId);
        if (findedUser.role=="admin") {
            productInfoBloc=`<div class="s_product_text">
            <h3 id="prName"></h3>
            <h2 id="prPrice"></h2>
            <ul class="list">
                <li><a class="active" href="#"><span>Category</span> <span id="prCategory"></span></a></li>
                <li><a href="#"> <span id="prStock"></span></a></li>
            </ul>
            

            <div class="card_area d-flex align-items-center">
                <button class="primary-btn mb-3" onclick="editProduct()">Edit Product</button>
            </div>
            <div id="editFormDiv">
            </div>
        </div>`;
        } else {
            productInfoBloc=`
            <div class="s_product_text">
				   <h3 id="prName"></h3>
				   <h2 id="prPrice"></h2>
				   <ul class="list">
					   <li><a class="active" href="#"><span>Category</span> <span id="prCategory"></span></a></li>
					   <li><a href="#"> <span id="prStock"></span></a></li>
				   </ul>
				   <h4 id="prStock"></h4>
				   <input type="number" id='reservedQty'> 
				   <button class="btn btn-warning" onclick="reserve()">Reserve Product</button> 
				   <span id='qtyErrorMsg'></span>
            </div>`;
        }
    }else{
        productInfoBloc=`
        <div class="s_product_text">
            <h3 id="prName"></h3>
            <h2 id="prPrice"></h2>
            <ul class="list">
                <li><a class="active" href="#"><span>Category</span> <span id="prCategory"></span></a></li>
                <li><a href="#"> <span id="prStock"></span></a></li>
            </ul>
            <h4 id="prStock"></h4>
            <button class=" btn btn-warning" onclick="goToLogin()">Login</button> 
        </div>`;
    }
    document.getElementById('productInfo').innerHTML=productInfoBloc;
}
//function go to login 
function goToLogin(){
    location.replace('login.html');
}
// function reserve create order objects into LS and update product stock
function reserve() {
    var connectedUserId=getConnectedUser();
    var productId=localStorage.getItem('selectedProductId');
    var qty=document.getElementById('reservedQty').value;
    var product=searchProductById(productId);
    if (product.stock>= qty) {
        var orderId=JSON.parse(localStorage.getItem('orderIdKey')||'1');
        var orders=getObjectsFromLS('orders');
        //create order object
        var order={
            id:orderId,
            qty:qty,
            userId:connectedUserId,
            productId:productId,
            status:false
            
        }
        orders.push(order);
        localStorage.setItem('orders',JSON.stringify(orders));
        localStorage.setItem('orderIdKey', orderId+1);
        // update product stock
        updateProductStock(productId,qty);
        location.replace('bascket.html');
    } else {
        document.getElementById('qtyErrorMsg').innerHTML='Unvailable Qty';
        document.getElementById('qtyErrorMsg').style.color='red';
    }
}
// function updateProductStock that updates product stock by new qty
function updateProductStock(id,qty) {
    var products=getObjectsFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id==id) {
            //products[i].stock=products[i].stock-qty
            products[i].stock-=qty;
            break;
        } 
    }
    localStorage.setItem('products',JSON.stringify(products));
}
//function basket displays all user orders into basket page
function basket() {
    var orders=getObjectsFromLS('orders');
    var products=getObjectsFromLS('products');
    var connectedUserId=localStorage.getItem('connectedUserId');
    var myOrders=userOrders(orders,connectedUserId);
    var userBasket="";
    if (myOrders.length==0) {
        userBasket='No reserved Products'
    } else {
        var userBasket=`
    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>`;
    for (let i = 0; i < myOrders.length; i++) {
        var order=myOrders[i];
        userBasket+=`
        <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${searchProductById(order.productId).name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${searchProductById(order.productId).price}</h5>
                                </td>
                                <td>
                                    <h5>${order.qty}</h5>
                                </td>
                                
                                <td>
                                    <h5>${searchProductById(order.productId).price *(order.qty)}</h5>
                                </td>`;
                                if (!(order.status)) {
                                    userBasket+=`  <td>
                                    <button class="btn btn-danger" 
                                    onclick="deleteOrderAndUpdateStock(${getObjectPositionById(order.id, orders)}, 'orders', ${searchProductById(order.productId).id},${order.qty}) ">
                                    Delete</button>
                                    
                                </td>
                                </tr>`;
                                    
                                } else {
                                    userBasket+=`  <td>
                                    Your orders is confirmed by store
                                    
                                </td>
                                </tr>`;
                                }
                              
    }
    userBasket+=`
    <tr>
                                <td></td>
                                <td></td>
                                <td>Subtotal</td>
                                <td>2160.00</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Shipping</td>
                                <td>free
                                    
                                </td>
                            </tr>
                            <tr >
                                <td>
                                    <div class="">
                                        <button class="primary-btn text-center" >Proceed to checkout</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>`; 
    } 
    document.getElementById('ordersBlock').innerHTML=userBasket;
}
//function that returns position of oders bu ID
function getObjectPositionById (id,tab) {
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id==id) {
            pos=i;
            break;
        }  
    }  
    return pos;
}
//function userOrders return all user orders by id
function userOrders(orders,userIdParam) {
    var myOrders=[];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].userId==userIdParam) {
            myOrders.push(orders[i]);
        }
    }
    return myOrders;
}
// function shippingPrice return free if totalPrice>= 300
function shipping(price) {
    return(price>=300) ? 'free':'$7';
    
}
//function logout
function logout() {
    localStorage.removeItem('connectedUserId');
    location.replace('index.html');
}
//function UserInforamtions display user informations
function UserInforamtions() {
    var connectedUserId=localStorage.getItem('connectedUserId');
    var user=searchUserById(connectedUserId);
    var userInfos=`
    <div class="s_product_text">
			<h3>First Name :${user.first_Name} </h3>
            <h3>Last Name :${user.last_Name} </h3>
            <h3>Email :${user.email} </h3>
            <h3>Tel:${user.tel} </h3>
			<h2 id="prPrice"></h2>
			<button class="primary-btn mb-3" onclick="displayUserEditForm(${user.id})">Edit profile</button>
	</div>
			<div id="editUserForm"></div>`;
    document.getElementById('userInfo').innerHTML=userInfos; 
}
////function displayUserInforamtions display form to edit user email and tel

function displayUserEditForm(userId) {
    var user=searchUserById(userId);
    var editForm = `
    
			<div class="row">
				<div class="col-lg-4  col-md-6 col-sm-6">
                    <h3>Edit Profile </h3>
                    <div >
                        <label>Email</label>
                        <input type="text" id="newEmail" value=${user.email}>
                    </div>
                    <div>
                        <label>Tel</label>
                        <input type="text"  id="newTel" value=${user.tel}>
                    </div>
                    <div class="col-md-12 form-group">
						<button type="submit" value="submit" class="primary-btn" onclick="validateUserEdit()" >Validate Edit</button>
					</div>
                </div>		
			</div>`
    document.getElementById('editUserForm').innerHTML=editForm;
    
}
// function validateUserEdit that updates new email and tel into LS
function validateUserEdit() {
    var newEmail=document.getElementById('newEmail').value;
    var newtTel=document.getElementById('newTel').value;
    var connectedUserId=localStorage.getItem('connectedUserId');
    var users=getObjectsFromLS('users');
    for (let i = 0; i < users.length; i++) {
        if (users[i].id==connectedUserId) {
            users[i].email=newEmail;
            users[i].tel=newtTel;
            break;
        }
    }
    localStorage.setItem('users',JSON.stringify(users));
    location.reload();
    
    
}
// function setHeader
function setHeader() {
    var connectedUserId=getConnectedUser();
    var headerContent="";
    if (connectedUserId) {
        var connectedUser=searchUserById(connectedUserId);
        if (connectedUser.role=='admin'){
            headerContent=`
            <ul class="nav navbar-nav menu_nav ml-auto">
	            <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
	            <li class="nav-item submenu dropdown">
		            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
		            aria-expanded="false">Products</a>
		            <ul class="dopdown-menu"> 
			            <li class="nav-item"><a class="nav-link" href="products.html"> Products List</a></li>
			            <li class="nav-item"><a class="nav-link" href="add-product.html"> Add Product</a></li>
			            <li class="nav-item"><a class="nav-link" href="add-category.html"> Add Category</a></li>
		            </ul>
	            </li>
	            <li class="nav-item "><a class="nav-link" href="store-orders.html">Orders</a></li>
	            <li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.first_Name} ${connectedUser.last_Name}</a></li>
                <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>

	            <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
            </ul>`;
            document.getElementById('navbarSupportedContent').innerHTML=headerContent;
        } else {
            var orders=getObjectsFromLS('orders');
            var myOrders=userOrders(orders, connectedUserId);

            headerContent=`
            <ul class="nav navbar-nav menu_nav ml-auto">
	            <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
	            <li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
	            <li class="nav-item "><a class="nav-link" href="bascket.html">Basket(${myOrders.length})</a></li>
	            <li class="nav-item "><a class="nav-link" href="wishList.html">Wishlist</a></li>
	            <li class="nav-item"><a class="nav-link" href="profile.html">Welcome ${connectedUser.first_Name} ${connectedUser.last_Name}</a></li>
                <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
	            <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
            </ul>`;
            document.getElementById('navbarSupportedContent').innerHTML=headerContent;
        }
        
    } else {
        headerContent=`
        <ul class="nav navbar-nav menu_nav ml-auto">
							<li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
							<li class="nav-item "><a class="nav-link" href="shop.html">Shop</a></li>
							<li class="nav-item "><a class="nav-link" href="blog.html">Blog</a></li>
							<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                            <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
							<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
							<li class="nav-item submenu dropdown">
								<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
								 aria-expanded="false">Signup</a>
								 <ul class="dopdown-menu"> 
									<li class="nav-item"><a class="nav-link" href="customer-signup.html"> Simple User</a></li>
									<li class="nav-item"><a class="nav-link" href="store-signup.html"> Store User</a></li>
								 </ul>
							</li>
						</ul>`;
        document.getElementById('navbarSupportedContent').innerHTML=headerContent;
    }  
}
// function displayUserWishList
function displayUserWishList() {
    var connectedUserId=getConnectedUser();
    var wishListTab=getObjectsFromLS('wishList');
    var myWishList=[];
    var wishListTr='';
    for (let i = 0; i < wishListTab.length; i++) {
        if (wishListTab[i].userId==connectedUserId) {
            myWishList.push(wishListTab[i]);
        } 
    }
    if (myWishList.length==0) {
        wishListTr='No wishlist products';
        
    } else {
        wishListTr=`
    <table class="table">
            <tr>
                <th>Name</th>
                <th>Name</th>
                <th>Category</th>
                <th>Actions</th>
            </tr>`;
    for (let i = 0; i < myWishList.length; i++) {
        var wishList=myWishList[i];
        var product=searchProductById(wishList.productId);
        wishListTr+=`
        <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td><button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(wishList.id, wishListTab)},'wishList')">Delete</button></td>
            </tr>`;
        
    }
    wishListTr+=`</table>`;
        
    }
    document.getElementById('wishListTable').innerHTML=wishListTr;
}
// function to display admin orders
function displayAdminOrders() {
    var connectedUserId=getConnectedUser();
    var allProducts=getObjectsFromLS('products');
    var adminProducts=getUserProducts(connectedUserId,allProducts);
    var allOrders=getObjectsFromLS('orders');
    var adminOrders=getAdminOrders(adminProducts,allOrders);
    var ordersTable='';
    if (adminOrders.length == 0) {
        ordersTable=`
        <div class="text-center">
            <h2>No orders</h2>
        </div>`;
    } else{
        ordersTable=`
        <div class="text-center">
            <h2>All orders</h2>
        </div>
        <table class="table">
            <tr>
                <th>first_Name</th>
                <th>last_Name</th>
                <th>Tel</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Product Unit Price</th>
                <th>Total HT</th>
                <th>Total TTC</th>
                <th>Action</th>
            </tr>`;
    for (let i = 0; i < adminOrders.length; i++) {
        var order = adminOrders[i];
        var user = searchUserById(order.userId);
        var product=searchProductById(order.productId)
        ordersTable+= `
        <tr>
                <td>${user.first_Name}</td>
                <td>${user.last_Name}</td>
                <td>${user.tel}</td>
                <td>${product.name}</td>
                <td>${order.qty}</td>
                <td>${product.price}</td>
                <td>${order.qty * product.price }</td>
                <td>${order.qty * product.price * 1.19}</td>`;
                if (!(order.status)) {
                    ordersTable+=`
                    <td><button class="btn btn-danger" onclick="confirmOrder(${order.id})" >Cofirme</button></td>
                </tr>`;
                } else {
                    ordersTable+=`
                    <td>Order is validated !</td>
                </tr>`;
                }
    };
    ordersTable+=`</table>`;
    }  
    document.getElementById('adminOrders').innerHTML=ordersTable;

}
//function getAdminOrders that returns all admin orders
function getAdminOrders(myProducts,orders) {
    var adminOrders=[];
    for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < myProducts.length; j++) {
            if (orders[i].productId==myProducts[j].id) {
                adminOrders.push(orders[i]);
            }   
        }    
    }
    return adminOrders;
}
// function confirmOrder to update order status to true
function confirmOrder(id) {
    // update 
    var orders=getObjectsFromLS('orders');
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id==id) {
            orders[i].status=true;
            break;
        }  
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    location.reload();
}
//function searchProduct 
function searchProduct(){
    var products=getObjectsFromLS('products');
    var productName=document.getElementById('searchedValue').value;
    var productsDiv='';
    var s=0;
    for (let i = 0; i < products.length; i++) {
        if ((products[i].name).toLowerCase()==productName.toLowerCase() && products[i].isConfirmedd) {
            s+=1;
            productsDiv = productsDiv + `
        <div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p2.jpg" alt="">
							<div class="product-details">
								<h6>${products[i].name} </h6>
								<div class="price">
									<h6>${products[i].price}</h6>
									<h6 class="l-through">${products[i].price}</h6>
								</div>
								<div class="prd-bottom">
									<div class="social-info">
										<span class="ti-bag"></span>
										<button class="hover-text" onclick="goToDisplay(${products[i].id})">Display</button>
									</div>
                                    <div class="social-info">
										<span class="ti-bag"></span>
										<button class="hover-text" onclick="deleteObject(${getObjectPositionById(products[i].id,products)},'products')">Delete</button>
									</div>
								</div>
							</div>
						</div>
					</div>`
        }
    } 
    if (s==0) {
        document.getElementById('findedProductsDiv').innerHTML=`
        <div class='text-center'><h1>No founded Products</h1></div>`;
    } else {
        document.getElementById('findedProductsDiv').innerHTML=productsDiv;

    }
}
// test
function displayProducts() {
    var allProducts=getObjectsFromLS('products');
    var productsTable='';
    productsTable=`
        <div class="text-center">
            <h2>All orders</h2>
        </div>
        <table class="table">
            <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
            </tr>`;
    for (let i = 0; i < allProducts.length; i++) {
    
        productsTable+=`
        <tr>
                <td>${allProducts[i].name}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category}</td>
                <td>
                    <input type="checkbox" id="checkbox" onclick="checkbox(${i})" >
                </td>
        </tr>`; 
    }
    productsTable+=`</table>`;
    productsTable+=`<button class="btn btn-danger text-center" onclick="manageProduct()" >Delete</button>`;
    document.getElementById('displayAllProducts').innerHTML=productsTable; 
}
var detectPosProduct=[];
function checkbox(pos) {
        if (document.getElementById("checkbox").checked = true) {
            detectPosProduct.push(pos);  
        }
        //console.log('checkbox',detectPosProduct);
        return detectPosProduct;  
}
function manageProduct() {
    var products=getObjectsFromLS(products);
    console.log('element',manageProduct);
     for (let i = 0; i < detectPosProduct.length; i++) {
          products.splice(detectPosProduct[i],1);
        //   localStorage.setItem('products',JSON.stringify(products));
          
          location.reload();
          console.log('element',products);
    }
}











