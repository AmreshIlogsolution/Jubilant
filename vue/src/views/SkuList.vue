<template>
     <div>
        <div class="flex justify-between py-1 bg-blue-800 ">
            <h3 class="text-sm text-white pl-3">Pick List</h3>
            <label for="default-toggle" class="inline-flex relative items-center cursor-pointer ml-10">
                <input type="checkbox" value="" v-model="hht" id="default-toggle" class="sr-only peer" checked> 
                <div class=" w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600 mr-3">                   
                </div>
                <span class="pr-3 text-sm font-medium text-white ">Use HHT Device</span>
            </label>
        </div> 
        <div class="bg-white p-2 rounded mt-1  h-30 ">    
            <div > 
                <div class="container mx-auto rounded overflow-hidden shadow-xl divide-y divide-blue-200"
                 >              
                    <h5 class="p-1 bg-slate-200 text-left"> Pick List
                        <!-- <span class="float-right">
                            <router-link   :to='"/pick-list/"'> Back </router-link> </span> -->
                    </h5> 
                    
                    <div class="grid grid-cols-2 gap-1 p-1">
                        <div class="text-sm text-blue-400 text-left">DN No: </div>
                        <div class="text-sm text-left"> {{ this.$route.query.dnno}}</div> 
                    </div>
                    <div class="grid grid-cols-2 gap-1 p-1">
                        <div class="text-sm text-blue-400 text-left">Invoice No: </div>
                        <div class="text-sm text-left"> {{ this.$route.query.inv}}  </div> 
                    </div>
                        <div class="grid grid-cols-2 gap-1 p-1" >
                            <div class="text-sm text-blue-400 text-left">Zone : </div>
                            <div class="text-sm text-left"> {{ this.$route.query.zone}}  </div> 
                        </div>
                     <div class="grid grid-cols-2 gap-1 p-1" >
                            <div class="text-sm text-blue-400 text-left">Aisle : </div>
                            <div class="text-sm text-left"> {{ this.$route.query.aisle}}  </div> 
                        </div>

                        <div class="grid grid-cols-2 gap-1 p-1" >
                            <div class="text-sm text-blue-400 text-left">Location : </div>
                            <div class="text-sm text-left"> {{ this.$route.query.rackLoc}}  </div> 
                        </div>
                  
                  
                   <div class="grid grid-cols-4 gap-6 p-2">
                        <div class="text-sm text-blue-400 text-left">Total Qty : </div>
                        <div class="text-sm text-left">   {{ this.$route.query.tq}} </div> 
                    
                        <div class="text-sm text-blue-400 text-left">Total Scan : </div>
                        <div class="text-sm text-left"> {{ this.$route.query.ts}} </div> 
                    </div>
                    
                </div>               
            </div>  
        </div>
           <div class="p-2 h-auto sm:rounded-md">  
            <div class="flex items-center py-2 px-3 rounded-lg bg-cyan-400"> 
                <input type="text" v-model="sku" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2" placeholder="Search SKU" @keyup.enter="findSkuHHT()" ref="skuVal" > 
                <button v-if="!hht" type="submit" class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mr-3">
                Search </button> 
            </div> 
        </div>  
        <div class="px-3" > 
            <div class="container mx-auto rounded overflow-hidden   divide-y mb-2 border border-gray-300 divide-blue-200" v-for="sku in skuList" :key="sku.sku">              
                <div class="grid grid-cols-2 gap-1 p-1">
                    <div class="text-sm text-blue-400 text-left">SKU: </div>
                    <div class="text-sm text-left"  @click="isOpenk(sku.sku,sku.skudesc,sku.batchno)"> {{ sku.sku}} </div> 
                </div> 
                <div class="grid grid-cols-2 gap-1 p-1">
                    <div class="text-sm text-blue-400 text-left">Description: </div>
                    <div class="text-sm text-left"> {{ sku.skudesc}} </div> 
                </div>  
                <div class="grid grid-cols-2 gap-1 p-1">
                    <div class="text-sm text-blue-400 text-left">Batch: </div>
                    <div class="text-sm text-left"> {{ sku.batchno}} </div> 
                </div>
                 <div class="grid grid-cols-4 gap-6 p-2 bg-gray-200 ">
                            <div class="text-sm text-blue-400 text-left">Total Qty: </div>
                            <div class="text-sm text-left">  {{ sku.InvQty}} </div> 
                        
                            <div class="text-sm text-blue-400 text-left">Total Picked: </div>
                            <div class="text-sm text-left">    {{ sku.PickQTy}}</div> 
                        </div>
                  
            </div>               
        </div>    
 <div class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200" v-if="paginationdiv">

  
<div class="flex flex-col items-center" v-if="paginationdiv">
  <!-- Help text -->
  <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.from}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.to}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.total}}</span> Entries
  </span>
  <!-- Buttons -->
  <div class="inline-flex mt-2 xs:mb-3 mb-4">
     

     <button class="px-4 py-1 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="pageChange(currentPage - 1)"  :disabled='btnDisabled' >
          Prev
      </button>
      <button class="px-4 py-1 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="pageChange(currentPage + 1) ">
          Next
      </button>
  
   
  </div>
</div>
        </div> 
        <div class="flex space-x-2 justify-center">
             <div class="absolute left-0  ">
                
                <button type="button" class="inline-block px-4 py-2 ml-3 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out font-bold float-left" @click="backToAiels()"> Back to Aisle</button> 
                </div>
                 <div class="absolute right-3 ">
                <button type="button" class="mb-3 inline-block px-4 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out font-bold float-right"  @click="backToRack()" > Back to Rack</button> 
            </div>
        </div>

  

        <div 
        v-show="isOpen"
        class="
          absolute
          inset-0 
          items-center
          justify-center
          bg-gray-700 bg-opacity-50 
          mt-20
        "
      >
        <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Manual Update Qty</h3>
            <svg
              @click="isOpen = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-4">
            <div class="p-2 bg-slate-200"> 
                <p class="text-sm text-left p-2"> SKU :  {{ skuMNoMOd }}  </p>
                <p class="text-sm text-left p-2"> Description :  {{ skuDescMod }} </p>
                <p class="text-sm text-left p-2"> Batch : {{ batchnoMod }} </p>
            </div>
            <div  class="p-2 bg-slate-400">
            
            <p class="mb-2"> <input type="text" v-model="skuQtyVal" ref="skuQtyValll" @keypress="onlyNumber"  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md "  placeholder="Update Quantiy"> </p>
            </div>
 
            <div class="grid grid-cols-2 gap-2 mt-3 border border-slate-300 p-3">
                <div><input type="radio" name="skuRadioButton" value="1"  v-model="skuRadioButton"> Add</div>
                <!-- ... -->
                <div><input type="radio"  name="skuRadioButton" value="0" v-model="skuRadioButton" > Remove</div>
            </div>
           
            <div  class="mt-5"> 
             
            <button class="px-6 py-2  text-blue-100 bg-blue-600 rounded" @click.prevent="updateSkuQtyValue(e)">
              Update
            </button>
             <button
              @click="isOpen = false"
              class="px-6 py-2 ml-2 text-blue-800 border border-blue-600 rounded"
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
    </div>
     </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios"; 
import { useRouter } from "vue-router";
import { ref } from 'vue'
import "@ocrv/vue-tailwind-pagination/styles";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
export default {
    setup() {
    let isOpen = ref(false);
    return { isOpen };
  },
  components: {
    VueTailwindPagination,
  },

    data(){
        return{
            currentPage: 1,
           
            perPage: "",
            total: "",
            paginationdiv:false,
            hht:true,
            skuVal:'',
            sku:'',
            skuList:[],
            skuQtyVal:'',
            skuRadioButton:'',
            skuModal:'',
            skuDescModal:'',
            skuBatchModal:'',
            skuMNoMOd:'',
            skuDescMod:'',
            batchnoMod:'',
            dataKey:0,
            pagination: {
            data: { to: 1, from: 1 }
            
            },

        }
    },
    methods:{
        isOpenk(skuModelNo,skudesc,batchno){ 
           this.skuMNoMOd = skuModelNo;
           this.skuDescMod =skudesc;
           this.batchnoMod =batchno;
           this.isOpen=true;
        },
        backToRack(){            
           
            var dnno = this.$route.query.dnno;   
            var inv = this.$route.query.inv;
            var tq = this.$route.query.tq
            var ts = this.$route.query.ts
            var zone =this.$route.query.zone;
            var aisle = this.$route.query.aisle;
            var rackLoc = this.$route.query.rackLoc;
             
            this.$router.push({ name: "rack-list", params: {id:"123"}, query: {dnno:dnno,inv:inv,tq:tq,ts:ts,zone:zone,aisle:aisle,rackLoc:rackLoc} }) 
        },
        backToAiels(){
            
            var dnno = this.$route.query.dnno;   
            var inv = this.$route.query.inv;
            var tq = this.$route.query.tq
            var ts = this.$route.query.ts
            var zone =this.$route.query.zone; 
            this.$router.push({ name: "aisle-list", params: {id:"123"}, query: {dnno:dnno,inv:inv,tq:tq,ts:ts,zone:zone} }) 

        },
         async findSku(){
            
            var params = {
                warehouseId: sessionStorage.getItem("WarehouseId"),
                clientId :sessionStorage.getItem("clientId"), 
                dnno: this.$route.query.dnno , 
                inv: this.$route.query.inv , 
                location: this.$route.query.rackLoc,
                page:this.currentPage
            } 
          
            await axiosClient.get('/get-rack-location',{ params: params})
            .then((response) => {    
                this.skuList = response.data.data;
                this.perPage = response.data.per_page;
                this.total = response.data.total;
                this.pagination = response
                this.paginationdiv=true;
                if(this.currentPage ===1){
                    this.btnDisabled=true;
                }else{
                    this.btnDisabled=false;
                }
                this.skuModal = this.skuvalues;
                this.skuDescModal = response.data[0].skudesc;
                this.skuBatchModal = response.data[0].batchno;  
            })
            .catch((err) => { 
              
            }); 
        },

        
         async updateSkuQtyValue(e){  
           if(this.skuQtyVal === '' ){
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong enter SKU Quantity!', 
                });
            return false;
            } 
            if(this.skuRadioButton == '' ){
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Select Sku Add or Remove!', 
                });
                return false;
            }
                 
             var params = {
                warehouseId: sessionStorage.getItem("WarehouseId"),
                clientId :sessionStorage.getItem("clientId"),  
                userid :sessionStorage.getItem("UserType"),                 
                dnno:this.$route.query.dnno,
                REF_NO:this.$route.query.inv, 
                sku: this.skuMNoMOd,
                batchNo:this.batchnoMod,
                wlocation:this.$route.query.rackLoc, 
                qty:this.skuQtyVal,
                skuRadioButton:this.skuRadioButton, 
                page:this.currentPage
            } 
          
            await axiosClient.get('/update-sku-qty-value',{ params: params})
            .then((response) => {   
                //console.log(response.data.error); 
                if(response.data.error == 'err'){
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Pick qty can't be greater than order qty! ", 
                    });
                    
                
                }else{
                    this.isOpen=false; 
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: 'SKU quantity update successfuly!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.skuQtyVal='';
                } 

            })
            .catch((err) => { 
              
            }); 
        },
        // Sku scan using HHT Device Function
        async findSkuHHT(){ 
        var key=this.dataKey;
        //console.log(this.skuList[key].batchno); 
        
        if(this.sku != this.skuList[key].sku ){
            this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'wrong SKU', 
            });
            return false;     
        }

           var params = {
                warehouseId: sessionStorage.getItem("WarehouseId"),
                clientId :sessionStorage.getItem("clientId"),  
                userid :sessionStorage.getItem("UserType"),                 
                dnno:this.$route.query.dnno,
                 REF_NO:this.$route.query.inv, 
                sku:this.skuList[key].sku,
              // batchNo not found//
                batchNo:this.skuList[key].batchno,
                wlocation:this.$route.query.rackLoc, 
                qty:1,
                
  
                
            } 
            
            
           await axiosClient.get('/update-sku-qty-value-hht',{ params: params})
            .then((response) => {   
                
                if(response.data.error == 'err'){
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Picking Data Retail Record could not be updated due to negative quantity Or quantity is greater!', 
                    });
                
                }else{
                    this.isOpen=false; 
                    this.findSku();
                    this.$swal({
                        position: 'top-end',
                        icon: 'success',
                        title: 'SKU quantity update successfuly!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.sku='';
                } 

            })
            .catch((err) => { 
              
            }); 
        },
        // SKU Scan using HHT Device Funtion End
         onlyNumber ($event) {
            //console.log($event.keyCode); //keyCodes value
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if (keyCode < 48 || keyCode > 57)  {  
                $event.preventDefault();
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: ' SKU value should be numeric!', 
                });
            }
        },
        pageChange(pageNumber) {
        this.currentPage = pageNumber;
        this.findSku();
        this.$refs.skuVal.focus();
        if(this.currentPage == 1){
            this.dataKey =0;
        }else{
            this.dataKey =this.dataKey+1;
        }
    },

    },
    mounted(){
       
        this.findSku()
        this.$refs.skuVal.focus();

    }
     
}
</script>