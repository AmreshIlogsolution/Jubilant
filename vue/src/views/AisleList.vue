
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
                          <button class="float-right inline-block px-1 py-1.5  bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" @click="backToPickList()">Back To Pick List</button> 
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
                     
                  
                   <div class="grid grid-cols-4 gap-6 p-2">
                        <div class="text-sm text-blue-400 text-left">Total Qty : </div>
                        <div class="text-sm text-left">   {{ this.$route.query.tq}} </div> 
                    
                        <div class="text-sm text-blue-400 text-left">Total Scan : </div>
                        <div class="text-sm text-left"> {{ this.$route.query.ts}} </div> 
                    </div>
                    
                </div>               
            </div>  
        </div>  
        <div class="p-2 h-auto sm:rounded-md ">   
            <div class="flex items-center py-2 px-3 rounded-lg bg-slate-700"> 
                <input type="text" v-model="aisle"  autocomplete="given-name" v-if="hht" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2" placeholder="Search Ailes *" @keyup.enter="findrack()" autofocus  ref="rackAiles"> 

              <input type="text" v-model="aisle"  autocomplete="given-name" v-else class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2" placeholder="Search Ailes *" @keyup="findrack()" autofocus  ref="rackAiles"> 


                <button v-if="hht" type="submit" @click="findrack()" class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mr-3">
                    Search </button> 
            </div>
            
        </div> 
        <div class="px-3" > 
                    <div class="container mx-auto rounded overflow-hidden shadow-xl divide-y mb-2 border border-blue-300 divide-blue-200"
                    v-for="ailes in ailesList" :key="ailes.ZONE">              
                        
                        <div class="grid grid-cols-2 gap-1 p-1">
                            <div class="text-sm text-blue-400 text-left">Aiels: </div>
                            <div class="text-sm text-left"> {{ ailes.Aisles}} </div> 
                        </div>
                        <div class="grid grid-cols-4 gap-6 p-2 ">
                            <div class="text-sm text-blue-400 text-left">Total Qty: </div>
                            <div class="text-sm text-left">  {{ ailes.TotalQty}} </div> 
                        
                            <div class="text-sm text-blue-400 text-left">Total Picked: </div>
                            <div class="text-sm text-left">    {{ ailes.TotalScanned}} </div> 
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

export default{
 data(){
    return{
    aisle:'',
    hht:true,
    ailesList:[]
    }
 },
 methods:{
     backToPickList(){ 
     this.$router.push({path: '/pick-list'});
 },
        async findailesz(){  
             
              var params = {
                warehouseId: sessionStorage.getItem("WarehouseId"),
                clientId :sessionStorage.getItem("clientId"), 
               // refNo: this.$route.query.dnno ,
                REF_NO: this.$route.query.inv , //inv=REF_NO
                zone:this.$route.query.zone ,
            }  
           
            await axiosClient.get('/get-ailes-new',{ params: params})
            .then((response) => {   
               
                // if(response.data.error == 'noReocrd'){
                //     this.$swal({
                //         icon: 'error',
                //         title: 'Oops...',
                //         text: 'Record Zone/Ailes Not Found!', 
                //     });
                //     return false;
                // }else{
                     
                     this.ailesList = response.data;
                
               
               

               // this.$router.replace({path: '/zone-list'},{ params: params});
            //    var rno = this.$route.params.refno;
            //    var inv = this.$route.params.inv
            //    var tq = this.$route.params.tq
            //    var ts = this.$route.params.ts
            //    var zone = this.zone;
            //    this.$router.replace({ name: "aisle-list", params: {id:"123"}, query: {rno:rno,tq:tq,ts:ts,zone:zone} })

            })
            .catch((err) => { 
              
            }); 
        },

      async  findrack(){
            
 var params = {
                warehouseId: sessionStorage.getItem("WarehouseId"),
                clientId :sessionStorage.getItem("clientId"), 
                refNo: this.$route.query.inv,
                zoneBarCode:this.$route.query.zone,
                aisle: this.aisle,
            } 
             
            await axiosClient.get('/get-rack',{ params: params})
            .then((response) => {   
                if(response.data.error =='noReocrd'){
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Not found!', 
                    });
                    return false;
                }else{
                var dnno = this.$route.query.dnno;  
               var inv = this.$route.query.inv;
               var tq = this.$route.query.tq
               var ts = this.$route.query.ts
               var zone =this.$route.query.zone;
               var aisle = this.aisle;
               this.$router.replace({ name: "rack-list", params: {id:"123"}, query: {dnno:dnno,inv:inv,tq:tq,ts:ts,zone:zone,aisle:aisle} });
                }
                 
            })
            .catch((err) => { 
              console.log('error')
            }); 
            
         

        }
 },
 mounted(){
   this.findailesz() 
   this.$refs.rackAiles.focus();
   this.hht = sessionStorage.getItem('HHT');
    
 },
 created(){
 this.hht = sessionStorage.getItem('HHT');
 
 }
}
</script>
