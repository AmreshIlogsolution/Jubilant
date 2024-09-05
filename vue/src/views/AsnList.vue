<template>
    <div class="bg-blue w-full p-4 flex justify-center font-sans ">
        <div class="rounded bg-grey-light p-2 bg-blue-500 w-screen">
            <div class="flex justify-between py-1">
            	<h3 class="text-sm text-white">ASN List</h3>
                <router-link :to="{path:'asn-scan'}" 
                class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-blue-500 cursor-pointer">Back
               
                </router-link>
            </div> 
             
  	        <div class="bg-white p-2 rounded mt-1 border-b border-grey h-45"> 
                <div class="grid grid-flow-row-dense grid-cols-4 grid-rows-1 border border-slate-300 mb-2" v-for="asn in asnList" :key="asn.id">
                   <div class="col-span-4 border-b border-grey h-45 bg-slate-200 rounded ">
                      <h5 class="text-xl font-bold leading-none text-gray-900:text-slate float-left p-2 ">{{ asn.ASN_NO }}</h5>
                    </div>
                     <div class="col-span-4 float-left text-sm text-gray-900 dark:text-white">
                        <span class="float-left pl-2">custId :</span>  <span class="pl-5">{{asn.CustID}}</span> 
                          <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                      </div>
                     <div class="col-span-4 float-left text-sm text-gray-900 dark:text-white">
                        <span class="float-left pl-2">asnQty: {{asn.ASNQTY }}</span>    scanQty: {{ asn.ScanQty }}
                          <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                      </div>
                    <div class="col-span-4 float-left text-normal text-sm text-gray-900 dark:text-white">
                        <span class="float-left pl-2">InvoiceNo: {{ asn.InvoiceNO }}</span>    
                        {{ asn.PONO }}
                          <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                    </div>  
                </div>  
                <div>
                <VueTailwindPagination 
                    :current="currentPage"
                    :total="total"
                    :per-page="perPage" 
                    @page-changed="pageChange($event)" 
                    small
                />
                </div>
	        </div> 
            <p class="mt-3 text-white">
                <!-- <router-link :to="{name:'Inbound'}"> To Inbound...</router-link> -->
                  <router-link   :to='"/inbound"'> To Inbound... </router-link> 
            </p>
        </div>
    </div> 
</template> 

<script>
import axios from "axios";
import axiosClient from "../axios"; 
import { useRouter } from "vue-router";
import '@ocrv/vue-tailwind-pagination/styles'
import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
export default{
       name: 'Pagination Example',
    components: {
        VueTailwindPagination,
    },
    data(){
        return {  
            asnList: [],
            currentPage: 1,
            perPage: '',
            total: ''
        } 
    },
    methods:{

        allAsnList(){
            var params = {
                warehouseId: sessionStorage.getItem("WarehouseId"),
                clientId :sessionStorage.getItem("clientId"),
                UserType: sessionStorage.getItem("UserType"),
                UserId:sessionStorage.getItem("UserId"),
                page:this.currentPage,
              
            }
            
           axiosClient.get('/asn-list',{ params: params})
            .then((response) => {  
               // console.log(response.data); 
                this.asnList = response.data.data;
                this.errors=''
                this.perPage=response.data.per_page;
                this.total=response.data.total;
                //this.isLoading=false;
            })
            .catch((err) => { 
                this.asnList = '';
                this.errors = err.response.data.error;
            });
        },
        pageChange(pageNumber){
        
            this.currentPage = pageNumber;
                
             this.allAsnList();
        }
       
    },
    created(){
      if (!sessionStorage.getItem("TOKEN")) {
       router.push({ path: "/login" });
      }
      this.allAsnList();
    },
    mounted(){
       this.currentPage=1;
       this.allAsnList();
    }
} 
</script>