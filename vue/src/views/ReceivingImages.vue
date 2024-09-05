<template>
	<div>
		<div class="col-xl-12 col-lg-12 col-md-12 ">
		    <div class="card shadow-sm ">
			    <div class="card-body p-0">
		            <div class="row">
		          	    <div class="col-lg-12 " >
		            	    <div class="login-form rounded" style="border-top:5px solid #4c60da">
		            	    	<div class="row">           	    	
			                		<div class="col-md-6">
			                    		<h6 class="h4 text-gray-900 mb-4">Add Product</h6>
			                    	</div>
			                    	<div class="col-md-6">
			                    		<router-link class="float-right stretched-link" to="/all-employees">All Product</router-link>
			                  	   	</div>
		                  	   	</div>
		                  		<form class="user" @submit.prevent="productInsert" enctype="multipart/form-data">
				                  	<div class="form-group">
				                  		<div class="form-row">
				                  			<div class="col-md-6">
				                  				<label> <b>Product Name</b></label>
				                  				<input type="text" class="form-control" id="product_name"   placeholder="Enter Product Name" v-model="form.product_name">
				                       			<small class="text-danger" v-if="errors.product_name">{{ errors.product_name[0] }}</small>
				                  			</div>
				                  			<div class="col-md-6">
				                  				<label> <b>Product Code</b></label>
				                  				<input type="txt" class="form-control" id="product_code" aria-describedby="emailHelp" placeholder="Enter Product Code" v-model="form.product_code">
				                       			<small class="text-danger" v-if="errors.product_code">{{ errors.product_code[0] }}</small>
				                  			</div>
				                  		</div>		                  		
				                  	</div>	                	 
				                  	<div class="form-group">
				                  		<div class="form-row">
				                  			<div class="col-md-6">
				                  				<label> <b>Product Root</b></label>
				                  				<input type="text" class="form-control" id="root" placeholder="Enter Product Root" v-model="form.root">
				                       			<small class="text-danger" v-if="errors.root">{{ errors.root[0] }}</small>
				                  			</div>
				                  			<div class="col-md-6">
				                  				<label> <b>Buying Price</b></label>
				                  				<input type="text" class="form-control" id="buying_price"   placeholder="Enter Buying Price" v-model="form.buying_price">
				                       			<small class="text-danger" v-if="errors.buying_price">{{ errors.buying_price[0] }}</small>
				                  			</div>
				                  			 
				                  		</div>
				                  	</div>
				                  		<div class="form-group">
				                  		<div class="form-row">
				                  			
				                  			<div class="col-md-6">
				                  				<label> <b>Selling Price</b></label>
				                  				 <input type="text" class="form-control" id="selling_price"   placeholder="Enter Selling price" v-model="form.selling_price">
				                       			<small class="text-danger" v-if="errors.selling_price">{{ errors.selling_price[0] }}</small>
				                  			</div>
				                  			<div class="col-md-6">
				                  				<label> <b>Buying Date</b></label>
				                  				 <input type="date" class="form-control" id="buying_date"   v-model="form.buying_date" placeholder="Select Buing Date">
				                       			<small class="text-danger" v-if="errors.buying_date">{{ errors.buying_date[0] }}</small>
				                  			</div>
				                  			 
				                  		</div>	
				                  		 </div>
				                  		 <div class="form-group">
				                  		<div class="form-row">
				                  			
				                  			<div class="col-md-6">
				                  				<label> <b>Product Quantity</b></label>
				                  				 <input type="text" class="form-control" id="product_quantity"   placeholder="Enter Product Quantity" v-model="form.product_quantity">
				                       			<small class="text-danger" v-if="errors.product_quantity">{{ errors.product_quantity[0] }}</small>
				                  			</div>
				                  			<div class="col-md-4">
				                  				<label> <b>Product Image</b></label>
				                  				<div class="custom-file">
				                  					
							                        <input type="file" class="custom-file-input" id="customFile" @change="onFileSelected"  >
							                        <small class="text-danger" v-if="errors.image">{{ errors.image[0] }}</small>
							                        <label class="custom-file-label" for="customFile">Choose file</label>

							                    </div>
				                  			</div>
				                  			<div class="col-md-2"><img :src="form.image" alt="" class="rounded" height="70px" width="70px"></div>
				                  			 
				                  		</div>	
				                  	</div>
				                  	<div class="form-group">
				                  		<div class="form-row">
				                  			
				                  			<div class="col-md-6">
				                  				<label> <b>Category</b></label>
				                  				 <select id="category_id" v-model="form.category_id" class="form-control" >
				                  				 	 
				                  				 	
				                  				 </select>
				                       			<small class="text-danger" v-if="errors.category_id">{{ errors.category_id[0] }}</small>
				                  			</div>
				                  			<div class="col-md-6">
				                  				<label> <b>Seller</b></label>
				                  				 <select id="supplier_id" v-model="form.supplier_id" class="form-control" >
				                  				 
				                  				 </select>
				                       			<small class="text-danger" v-if="errors.supplier_id">{{ errors.supplier_id[0] }}</small>
				                  			</div>
				                  			 
				                  		</div>	
				                  		</div>	
				                  		<div class="card-footer">
				                  			
				                  			<button type="submit" class="btn btn-primary btn-sm">Add Product</button>
				                    		<router-link to="/" class="btn btn-secondary btn-sm">Cancle</router-link>
				                  		</div>
				                  		</form>                  		
				                  	</div>		                     
				                    
		                       
		                   		 
			                </div>
		            	</div>
		            </div>
		        </div>
		    </div>
		</div>
	

</template>


<script type="text/javascript">
	 export default{
	 	created(){			 
			if(!User.loggedIn()){				 
				this.$router.push({ name: '/' })
			} 
		},
	 	data(){
	 		return{
	 			form:{
	 				product_name:null,
	 				product_code:null,
	 				root:null,
	 				buying_price:null,
	 				selling_price:null,
	 				supplier_id:null,
	 				buying_date:null,
	 				image:null,
	 				product_quantity:null,
	 				category_id:0,
	 				supplier_id:0,

	 			},
	 			errors:{},
	 			categories:{},
	 			suppliers:{},
	 		}
	 	},
	 	 methods:{
	    	onFileSelected(event){
	    		let file = event.target.files[0];	    		 
	    		if(file.size >1048770){
	    			Notification.image_validation();
	    		}else{
	    			let reader = new FileReader();
	    			reader.onload = event=>{
	    				this.form.image = event.target.result; 
	    				console.log(event.target.result);   				 
	    			};
	    			reader.readAsDataURL(file);
	    		}
	    	},
	    	productInsert(){
	    		  axios.post('/api/product',this.form)
	    		  .then(()=>{
	    		  	this.$router.push({ name: '/product'})
	    		  	Notification.success();
	    		  })
	    		  .catch(error =>this.errors = error.response.data.errors)
	    	},
	    },
	    created(){
	    	axios.get('/api/category/')
	    	.then(({data})=>(this.categories = data))
	    	axios.get('/api/supplier/')
	    	.then(({data})=>(this.suppliers = data))
	    }
	 }
</script>
<style>
	
</style>