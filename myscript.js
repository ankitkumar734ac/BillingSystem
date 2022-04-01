const Products=[
{"code":"PEP221","prod":"Pepsi","price":12,"instock":"Yes","category":"Beverages"},
{"code":"COK113","prod":"Coca Cola","price":18,"instock":"Yes","category":"Beverages"},
{"code":"MIR646","prod":"Mirinda","price":15,"instock":"No","category":"Beverages"},
{"code":"SLI874","prod":"Slice","price":22,"instock":"Yes","category":"Beverages"},
{"code":"MIN654","prod":"Minute Maid","price":25,"instock":"Yes","category":"Beverages"},
{"code":"APP652","prod":"Appy","price":10,"instock":"No","category":"Beverages"},
{"code":"FRO085","prod":"Frooti","price":30,"instock":"Yes","category":"Beverages"},
{"code":"REA546","prod":"Real","price":24,"instock":"No","category":"Beverages"},
{"code":"DM5461","prod":"Dairy Milk","price":40,"instock":"Yes","category":"Chocolates"},
{"code":"KK6546","prod":"Kitkat","price":15,"instock":"Yes","category":"Chocolates"},
{"code":"PER5436","prod":"Perk","price":8,"instock":"No","category":"Chocolates"},
{"code":"FST241","prod":"5 Star","price":25,"instock":"Yes","category":"Chocolates"},
{"code":"NUT553","prod":"Nutties","price":18,"instock":"Yes","category":"Chocolates"},
{"code":"GEM006","prod":"Gems","price":8,"instock":"No","category":"Chocolates"},
{"code":"GD2991","prod":"Good Day","price":25,"instock":"Yes","category":"Biscuits"},
{"code":"PAG542","prod":"Parle G","price":5,"instock":"Yes","category":"Biscuits"},
{"code":"MON119","prod":"Monaco","price":7,"instock":"No","category":"Biscuits"},
{"code":"BOU291","prod":"Bourbon","price":22,"instock":"Yes","category":"Biscuits"},
{"code":"MAR951","prod":"MarieGold","price":15,"instock":"Yes","category":"Biscuits"},
{"code":"ORE188","prod":"Oreo","price":30,"instock":"No","category":"Biscuits"}
];


let BillDB=[];
let sortFlag=false;
let sortType='';

let copyDB=[...Products];
function doDataFilter(){
	let cat=document.getElementById('selectCategory').value;
	let sto=document.getElementById('selectStock').value;
	let ran=document.getElementById('selectRange').value;	
	
	if(cat=='0' && sto=='0' && ran=='0'){
		getTable();
		copyDB=[...Products];
	}else{
		let arr=doFilter(cat,sto,ran);
		if(sortType!='')sorting(sortType,arr);
		getTable(arr);
		copyDB=[...arr];
	}
}
function doFilter(cat,sto,ran){
	if(cat!='0' && sto=='0' && ran=='0'){
		let arr=doFilterCat(cat);
		return arr;
	}
	else if(cat=='0' && sto!='0' && ran=='0'){
		let arr=doFilterSto(sto);
		return arr;
	}
	else if(cat=='0' && sto=='0' && ran!='0'){
		let arr=doFilterRam(ran);
		return arr;
	}
	else if(cat!='0' && sto!='0' && ran=='0'){
		let arr=doFilterCat(cat);
		arr=doFilterSto(sto,arr);
		return arr;
	}
	else if(cat!='0' && sto=='0' && ran!='0'){
		let arr=doFilterCat(cat);
		arr=doFilterRam(ren,arr);
		return arr;
	}
	else if(cat=='0' && sto!='0' && ran!='0'){
		let arr=doFilterSto(sto);
		arr=doFilterRam(ran,arr);
		return arr;
	}
	else if(cat!='0' && sto!='0' && ran!='0'){
		let arr=doFilterCat(cat);
		arr=doFilterSto(sto,arr);
		arr=doFilterRam(ran,arr);
		return arr;
	}	
}
function doFilterCat(cat,db=Products){
	let arr=db.filter(pro=>{
		if(pro.category==cat)return true;
		return false;
	});
	return arr;
}
function doFilterSto(sto,db=Products){
	let arr=db.filter(pro=>{
		if(pro.instock==sto)return true;
		return false;
	});
	return arr;
}
function doFilterRam(ran,db=Products){
	let arr=[];
	 if(ran=='<10'){
		 arr=db.filter(pro=>{
			if(pro.price<10)return true;
			else return false;
		});
	}else if(ran=='>20'){
		 arr=db.filter(pro=>{
			if(pro.price>20)return true;
			else return false;
		});
	}else if(ran=='10-20'){
		 arr=db.filter(pro=>{
			if(pro.price>=10 && pro.price<=20)return true;
			else return false;
		});
	}
	return arr;
}


function doSort(type){
	sorting(type,copyDB);
	sortType=type;
	getTable(copyDB);
	//changeBtn();
}
function sorting(type,db){
	db.sort((p1,p2)=>{
		if(p1[type]<p2[type])return -1;
		else if(p1[type]>p2[type])return 1;
		else return 0;
	});
}


function showTable(){

	let txt='<h3 align="center">Product List</h3>';
	txt+='<form>';
	txt+='<div class="form-group row">';
	txt+='<div class="col-md-3">';
	txt+='<p ><b>Filter Product by : </b></p>';
	txt+='</div>';

	txt+='<div class="col-md-3">';
	txt+='<select class="form-control" id="selectCategory" onchange="doDataFilter()">';
	txt+='<option value="0">Select Category</option>';
	txt+='<option value="Beverages">Beverages</option>';
	txt+='<option value="Chocolates">Chocolates</option>';
	txt+='<option value="Biscuits">Biscuits</option>';
	txt+='</select>';
	txt+='</div>';

	txt+='<div class="col-md-3">';
	txt+='<select class="form-control" id="selectStock" onchange="doDataFilter()">';
	txt+='<option value="0">Select in Stock</option>';
	txt+='<option value="Yes">Yes</option>';
	txt+='<option value="No">No</option>';
	txt+='</select>';
	txt+='</div>';

	txt+='<div class="col-md-3">';
	txt+='<select class="form-control" id="selectRange" onchange="doDataFilter()">';
	txt+='<option value="0">Select Price Range</option>';
	txt+='<option value="<10"><10</option>';
	txt+='<option value="10-20">10-20</option>';
	txt+='<option value=">20">>20</option>';
	txt+='</select>';
	txt+='</div>';			
	txt+='</div>';
	txt+='</form>';
	document.getElementById('filter').innerHTML=txt;
	getTable(Products);
}
function getTable(db=Products,col=sortType) {
	const arr=db.map(pro=>{
		let {code,prod,price,instock,category}=pro;
		let txt='';
		txt+='<tbody>';
    	txt+='<tr>';
    	txt+=' <td>'+code+'</td>';
    	txt+='  <td>'+prod+'</td>';
    	txt+='  <td>'+category+'</td>';
    	txt+='  <td>'+price+'</td>';
    	txt+='  <td>'+instock+'</td>';
    	txt+='  <td id='+code+'><button class="btn btn-secondary btn-sm" onclick="addToBill(\''+code+'\')">Add to Bill</button></td>';	
    	txt+='</tr>';
    	return txt;
	});
	
	let id1=id2=id3=id4=id5='';
	if(col=='code')id1='(X)';
	if(col=='prod')id2='(X)';
	if(col=='category')id3='(X)';
	if(col=='price')id4='(X)';
	if(col=='instock')id5='(X)';

	let txt='<table class="table table-sm border">';
  	txt+='<thead class="bg-dark text-white">';
    txt+='<tr>';
    txt+='  <th scope="col" onclick="doSort(\'code\')">Code'+id1+'</th>';
    txt+='  <th scope="col" onclick="doSort(\'prod\')">Product'+id2+'</th>';
    txt+='  <th scope="col" onclick="doSort(\'category\')">Category'+id3+'</th>';
    txt+='  <th scope="col" onclick="doSort(\'price\')">Price'+id4+'</th>';
    txt+='  <th scope="col" onclick="doSort(\'instock\')">In Stock'+id5+'</th>';
    txt+='  <th scope="col"></th>';
    txt+='</tr>';
    txt+=arr.join('');
  	txt+='</thead>';
  	txt+='</tbody>';
	txt+='</table>';

	document.getElementById('table').innerHTML=txt;
}


function plus(id){
	let ind=BillDB.findIndex(pro=>pro.code==id);
	BillDB[ind].quantity+=1;
	BillDB[ind].value=BillDB[ind].quantity * BillDB[ind].price; 
	showAddBillForm();
}
function minus(id){
	let ind=BillDB.findIndex(pro=>pro.code==id);
	if(BillDB[ind].quantity==1){
		clos(id);
	}else{
		BillDB[ind].quantity-=1;
		BillDB[ind].value-= BillDB[ind].price; 
		showAddBillForm();
	}
}
function clos(id){
	let ind=BillDB.findIndex(pro=>pro.code==id);
	BillDB.splice(ind,1);
	showAddBillForm();
	document.getElementById(id).innerHTML='<button class="btn btn-secondary btn-sm" onclick="addToBill(\''+id+'\')">Add to Bill</button>';
}
function addBillTable(){
	if(BillDB.length==0)return '';
	let arr=BillDB.map(pro=>{
		let txt='<div class="card bg-light ">';
  		txt+='<div class="row m-2">';
  		txt+='<div class="col-md-6">'+pro.code+' '+pro.prod+' Price:'+pro.price+' Quantity:'+pro.quantity+' Value:'+pro.value+'</div>';
    	txt+='<div class="col-md-6">';
    	txt+='<button class="mr-2 btn btn-sm btn-success " onclick="plus(\''+pro.code+'\')">+</button>';
    	txt+='<button class="mr-2 btn btn-sm btn-warning" onclick="minus(\''+pro.code+'\')">-</button>';
    	txt+='<button class="btn btn-sm btn-danger" onclick="clos(\''+pro.code+'\')">X</button>';
    	txt+='</div>';
  		txt+='</div>';
		txt+='</div>';
		return txt;
	});

	return arr.join('');
}
function addToBill(id){
	let ind=BillDB.findIndex(pro=>pro.code==id);

	if(ind==-1){
		let pro=Products.find(pro=>pro.code==id);
		let {code,prod,price,instock,category}=pro;
		let json={"code":code,"prod":prod,"price":price,"quantity":1,"value":price};
		BillDB.push(json);
	}else{
		BillDB[ind].quantity=BillDB[ind].quantity+1;
		BillDB[ind].value= BillDB[ind].quantity * BillDB[ind].price;
	}
	showAddBillForm();
}
function closBill(){
	alert('Closing the current bill');
	BillDB=[];
	showAddBillForm();
	getTable();
	document.getElementById('selectRange').value="0";
	document.getElementById('selectStock').value="0";
	document.getElementById('selectCategory').value="0";
}
function getValue() {
	return BillDB.reduce((acc,curr)=>{
		acc+=curr.value;
		return acc;
	},0);
}
function getQUantity(){
	return BillDB.reduce((acc,curr)=>{
		acc+=curr.quantity;
		return acc;
	},0);
}
function showAddBillForm(){
	let str='<div class="card bg-light mb-3 border-0" >';
	str+='<div class="card-header border-0">';
	str+='<h5>Details of Current Bill</h5>';
	str+='<p>Items:'+BillDB.length+', Quantity:'+getQUantity()+', Amount:'+getValue()+'</p>';
	str+=addBillTable();
	str+='<button class="btn btn-primary btn-sm" onclick="closBill()">Close All</button>'
	str+='</div>';
	document.getElementById('details').innerHTML=str;
}


function showProduct(){
	showNav('jj');
	showAddBillForm();
	showTable();
}


function showNav(arg) {

	let ac1=(arg=='')?'':'active';

	let txt='<nav class="navbar navbar-expand-lg navbar-dark bg-dark">';
  	txt+='<a class="navbar-brand" href="#">BillingSystem</a>';
  	txt+='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">';
    txt+='<span class="navbar-toggler-icon"></span>';
  	txt+='</button>';
  	txt+='<div class="collapse navbar-collapse" id="navbarNavAltMarkup">';
    txt+='<div class="navbar-nav">';
    txt+='<a class="nav-item nav-link '+ac1+' " href="#" onclick="showProduct()">New Bill <span class="sr-only">(current)</span></a>';
    txt+='</div>';
	txt+=' </div>';
	txt+='</nav>';
	document.getElementById('nav1').innerHTML=txt;
}
showNav('');