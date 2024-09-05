<template>
  <div class="bg-blue w-full p-4 flex justify-center font-sans">
    <div class="rounded bg-grey-light p-2 bg-blue-500 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-white">Inventory</h3>
        <button @click="$router.go(-1)" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-blue-500 cursor-pointer">
          Back
        </button>
      </div>

      <div class="overflow-x-auto relative">
        <div class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200">

          <!-- <h5 class="p-1 bg-slate-200 text-left">Bin to Bin Transfer</h5> -->
          <!-- toogle button-->

          <div class="flex justify-between py-1 bg-blue-800">
            <h3 class="text-sm text-white pl-3">Bin to Location Transfer</h3>
            <label for="default-toggle" class="inline-flex relative items-center cursor-pointer ml-10">
              <input type="checkbox" value="" v-model="hht" id="default-toggle" class="sr-only peer" checked/>
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600"
              ></div>
              <span class="pr-3 text-sm font-medium text-white"
                >Use HHT Device</span
              >
            </label>
          </div>

          <div class="grid gap-1 grid-cols-2 grid-rows-3 bg-white">
            <!-- ... -->
            <div class="text-sm text-blue-400 text-left mx-2 my-2 ">
              Client Id:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400">
                {{ clientId }}
              </span>
            </div>

            <div class="text-sm text-blue-400 text-left mx-2 my-2 ">
              From Bin No:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400"
                >{{ fromBinNo }}
              </span>
            </div>
          
            <div class="text-sm text-blue-400 text-left mx-2 my-2 ">
              SKU:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400"
                >{{ skuName }}
              </span>
            </div>

            <div class="text-sm text-blue-400 text-left mx-2 my-2 ">
              To Bin:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400"
                >{{ toBinNo }}
              </span>
            </div>

            
          <div class="text-sm text-blue-400 text-left">
            <button v-if="getbin" @click="toGetBinSkuDetails()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 float-left mx-2 my-2 flex">Get Bin
            </button>
          </div>
        
          <!-- <div class="text-sm text-blue-400 text-left">
         <button @click="getBin()"  v-if="getbin" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-1 float-left ml-2 flex">Get Bin
            </button> 
          </div> -->

          </div>
        </div>
      </div>

      <div class="bg-white p-2 rounde2remd mt-1 border-b border-grey h-22">
        <div class="grid grid-flow-row-dense grid-cols-4 gap-1" v-if="searchDiv">
          
          
          <div class="col-span-2" v-if="!hht">
            <label for="search-whLocation" class="block text-sm font-medium text-red-700 float-left ml-2">From Bin Search *</label>
            <input type="text" name="search-whLocation" id="whLocation" v-model="whLocation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  @keyup.enter="frombinSearch()" ref="inputWhlocation"/>
          </div>

          <div class="col-span-2" v-else>
            <label for="search-whLocation" class="block text-sm font-medium text-red-700 float-left ml-2">From Bin Search *</label>
            <input type="text" name="search-whLocation" id="whLocation" v-model="whLocation" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"  @keyup="frombinSearch()" ref="inputWhlocation"/>
          </div>


          <div>
            <button  v-if="!hht" @click="frombinSearch()"
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                  </svg>
                  Search
            </button>
          </div>

          <div>
            <!-- <button @click="clearfields()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex">
              Clear
            </button> -->
          </div>

          <b>{{ shout }}</b>
        </div>

        <!-- ##### SCAN SKU SEARCH #### -->

        <div class="grid grid-flow-row-dense grid-cols-4 gap-3" v-if="scanDiv">
         
          <div class="col-span-2" v-if="!hht">
         
          <label for="scanBin" class="block text-sm font-medium text-red-700 float-left ml-2">
            Scan SKU*</label>
           
          <input  type="text"  name="scanSkuNo" id="scanSkuNo" v-model="scanSkuNo"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" @keyup.enter="scanBinSkuTransfer()" />
          </div>

          <div v-else>
          <label for="scanBin" class="block text-sm font-medium text-red-700 float-left ml-2">
            Scan SKU*</label>
           
          <input  type="text"  name="scanSkuNo" id="scanSkuNo" v-model="scanSkuNo"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" @keyup="scanBinSkuTransfer()"/>
          </div>


          <div>
            <button v-if="!hht"  @click="scanBinSkuTransfer()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>Scan
            </button>
          </div>

          <b>{{ shout }}</b>
        </div>

        <!-- ####GET BIN ACTIVE ## -->
        <div class="grid grid-flow-row-dense grid-cols-4 gap-3" v-if="getbin">
         
          <div class="col-span-2" v-if="!hht">
            <label for="scanBin" class="block text-sm font-medium text-red-700 float-left ml-2">
              To Bin*</label>
             
            <input
              type="text"
              name="toBin"
              id="toBin"
              v-model="toBin"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @keyup.enter="toBinSearch()" />
          </div>

          <div class="col-span-2" v-else>
            <label for="scanBin" class="block text-sm font-medium text-red-700 float-left ml-2">
              To Bin*</label>
             
            <input  type="text"  name="toBin" id="toBin" v-model="toBin" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" @keyup="toBinSearch()"/>
          </div>

          <div class="col-span-2">
            <button
              v-if="!hht"
              @click="toBinSearch()"
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                /></svg>To Bin
            </button>
          </div>
          <b>{{ shout }}</b>
        </div>

        <!-- #### SKU SAVE BIN  ######### -->
        <div class="grid grid-flow-row-dense grid-cols-4 gap-3" v-if="toSaveDiv">
         
          <div class="col-span-2" v-if="!hht">
            <label for="scanBin" class="block text-sm font-medium text-red-700 float-left ml-2">Qty*</label>
             <input type="number" name="toQty" id="toQty" v-model="toQty" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" @keyup.enter="toUpdateQtyInBin()"/>
          </div>
  
          <div class="col-span-2" v-else>
            <label for="scanBin" class="block text-sm font-medium text-red-700 float-left ml-2">Qty*</label>
             <input type="number" name="toQty" id="toQty" v-model="toQty" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" @keyup="toUpdateQtyInBin()"/>
          </div>

          <div class="col-span-2">
            <button v-if="!hht"  @click="toUpdateQtyInBin()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex">Save</button>
          </div>
          <b>{{ shout }}</b>
        </div>

        <div class="grid gap-1 grid-cols-3 bg-white"  v-if="toSaveDiv">
   
          <div class="text-sm text-blue-400 text-left">
            <button  @click="backToBinPage()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 float-left mx-2 my-2 flex">Back To Bin
            </button>
          </div>
          <div class="text-sm text-blue-400 text-left">
            <button  @click="backToSku()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 float-left mx-2 my-2 flex">Back To SKU
            </button>
          </div>
          <div class="text-sm text-blue-400 text-left">
            <button  @click="backtoToBinSearch()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 float-left mx-2 my-2 flex">Back To To-Bin
            </button>
          </div>

          </div>

        <!-- DIV BOX -->
      </div>

      <div
        class="bg-white p-2 rounded mt-1 border-b border-grey h-45 cursor-pointer grid gap-6"
        v-if="skuTable"
      >
        <div class="overflow-x-auto relative">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b"
            >
              <tr>
                <th scope="col" class="py-0 px-0">SLOC</th>
                <th scope="col" class="py-0 px-0">SKU</th>
                <th scope="col" class="py-0 px-0">Batch No.</th>
                <th scope="col" class="py-0 px-0">Available Qty</th>
                <th scope="col" class="py-0 px-0">BAL Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(asn, i) in searchSkuData"
                :key="`skuInput.${i}`"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="py-0 px-0">
                  <input
                    type="radio" name="skuBatch"  :value="i" v-model="skuBatch" @change="radiobuttonclick(asn.SLOC,asn.SKU,asn.BATCHNO,asn.AVAILABLEQTY,asn.QTY)"/>
                  {{ asn.SLOC }}
                </td>
                <th
                  scope="row"
                  class="py-0 px-0 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ asn.SKU }}
                </th>
                <td class="py-0 px-0">
                  {{ asn.BATCHNO }}
                </td>
                <td class="py-0 px-0">
                  {{ asn.AVAILABLEQTY }}
                </td>
                <td class="py-0 px-0">
                  {{ asn.QTY }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p class="mt-3 text-white">
        <router-link :to="{ path: 'inventory' }"> To Inventory...</router-link>
      </p>
    </div>



  <div v-if="rackLocationDiv"  v-show="isOpen" class=" absolute inset-0 items-center justify-center bg-gray-700 bg-opacity-50 mt-20">
        <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
         
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">SKU {{ skuName}} IN Other Bins</h3>
            <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div class="mt-4">

            <div class="overflow-x-auto relative">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b"
            >
              <tr>
                <th scope="col" class="py-0 px-0">WH Location</th>
                <th scope="col" class="py-0 px-0">Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(asn, i) in toBinSkuData"
                :key="`skuInput.${i}`" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              
              <th
                  scope="row"
                  class="py-0 px-0 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ asn.WHLOCATION }}
                </th>
               
               
                <td class="py-0 px-0">
                  {{ asn.BALQTY }}
                </td>
              
              </tr>
            </tbody>
          </table>
        </div>
   

<div class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200" v-if="paginationdiv" >
        
<div class="flex flex-col items-center" v-if="paginationdiv">
  <!-- Help text -->
  <span class="text-sm text-gray-700 dark:text-gray-400">
      Showing <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.from}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.to}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.total}}</span> Entries
  </span>
  <!-- Buttons -->
  <div class="inline-flex mt-2 xs:mt-0">
    

     <button class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="pageChange(currentPage - 1)"  :disabled='btnDisabled' >
          Prev
      </button>
      <button class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="pageChange(currentPage + 1)">
          Next
      </button>
  </div>
</div>
<!-- end here -->
        </div>
 
              
          </div>
           
           
        </div>
    </div>
    <!--- div main end here  -->
  </div>



</template>

<script>


import axios from "axios";
import axiosClient from "../../axios";
import { useRouter } from "vue-router";

import "@ocrv/vue-tailwind-pagination/styles";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

import { ref } from 'vue';


export default {
  name: "Receiving",
  components: {
    VueTailwindPagination,
  },
  setup() {
    let isOpen = ref(false);
    return { isOpen };
  },

  created() {
    if (!sessionStorage.getItem("TOKEN")) {
      router.push({ path: "/login" });
    }
  },

  data() {
    return {

      pagination: {
        meta: { to: 1, from: 1 }
      },
      whLocation: '',
      shout: "",
      currentPage: 1,

      perPage: "",
      total: "",
      paginationdiv: false,
      success: "",
      errors: [],

      clientId: sessionStorage.getItem("clientId"),
      scanDiv: false,
      scanBin: "",
      searchDiv: true,
      scanSkuNo: "",
      saveButton: false,
      toBinNo: "",
      body: "",
      skuflag: false,
      skuBatch: "",
      scanQty: "",
      sku: "",
      sloc: "",
      batchNo: "",
      toQty: "",
      hht: true,
      fromBinNo: "",
      skuName: "",
      getbin: false,
      toBin: "",
      searchSkuData: [],
      skuTable: false,
      toSaveDiv: false,
      availableQty: "",
      balanceQty: "",
      rackLocationDiv:false,              
      toBinSkuData:[],
      inputWhlocation:''
    };
  },

  methods: {
    async radiobuttonclick(sloc, sku, batchNo, availQty, balQty) {
    
      this.skuNo = sku;
      this.batchNo = batchNo;
      this.sloc = sloc;
      this.availableQty = availQty;
      this.balanceQty = balQty;

      for (var key of Object.keys(this.skuBatch)) {
        console.log(key + " -> " + this.skuBatch[key]);
        this.skubatchval = this.skuBatch[key];
        this.values[key] = "";
        // this.values[key].isDisabled;
      }
    },

    backToBinPage(){

      this.$swal
            .fire({
              title: "Are you sure?",
              text: "If Yes You will back to Bin Search",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Back To Bin!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                
              this.searchDiv=true;
              this.toSaveDiv = false;
              this.fromBinNo='';
              this.skuName='';
              this.toBinNo='';
              this.skuTable=false;
              this.scanDiv= false;
              this.searchSkuData=[];
              this.toQty='';
              this.toBin='';
              this.scanSkuNo='';
              this.whLocation='';
              this.$router.push({ path: "/bin-to-location-transfer" });
              }
             
           
            });
     

},

    backToSku(){

      this.$swal
            .fire({
              title: "Are you sure?",
              text: "If Yes You will back to SKU Search",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Back To SKU!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.scanDiv= true;
              this.searchDiv=false;
              this.toSaveDiv = false;
              this.skuName='';
              this.toBinNo='';
              this.skuTable=false;
              this.searchSkuData=[];
              this.toQty='';
              this.toBin='';
              this.scanSkuNo='';
            
              //this.whLocation='';
              this.$router.push({ path: "/bin-to-location-transfer" });
              }
             
           
            });
    },
    backtoToBinSearch(){

     this.$swal
      .fire({
        title: "Are you sure?",
        text: "If Yes You will back to To-Bin Search",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Back To To-Bin!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.scanDiv= false;
        this.searchDiv=false;
        this.toSaveDiv = false;
        this.getbin=true;
        //this.skuName='';
        this.toBinNo='';
         this.skuTable=true;
        // this.searchSkuData=[];
        this.toQty='';
        this.toBin='';
       // this.scanSkuNo='';
        //this.whLocation='';
        this.$router.push({ path: "/bin-to-location-transfer" });
        }
       
     
      });
},

    toBinSearch() {
      if (!this.toBin) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "To Bin is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          UserId: sessionStorage.getItem("UserId"),
          getBinNo: this.toBin,
        };
        axiosClient
          .get("/get-tobin-location-search", { params: params })
          .then((response) => {
            console.log(response.data.data);
            // sessionStorage.setItem('asnData',this.searchasnvalue);
            if (response.data.data.length == 0 || response.data.status == 401) {
              //console.log("Array is either empty or does not exist");
              //this.errors ='Data Not Found';
              this.searchAsn = "";
              this.toSaveDiv = false;
              this.toBin = "";
              (this.searchDiv = false), (this.scanDiv = false);
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Transfer Bin Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              console.log(response.data.data[0].LOCATION);

              this.toBinNo = response.data.data[0].LOCATION;
              this.errors = "";

              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.paginationdiv = true;
              (this.getbin = false),
                (this.searchDiv = false),
                (this.scanDiv = false);
              this.toSaveDiv = true;
            }
          })
          .catch((err) => {
            //console.log(err)
            this.searchAsn = "";
            this.scanDiv = false;
            (this.searchDiv = false), (this.scanDiv = false);
            this.toSaveDiv = false;
            this.toBin = "";

            //this.errors = err.response.data.error;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Transfer Bin Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },


    toGetBinSkuDetails() {

      if (!this.whLocation) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "To Bin is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {

        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          whBox: this.whLocation,
          skuId: this.skuId,
          skuName:this.skuName,
          page: this.currentPage,
        };
        axiosClient
          .get("/get-skudetails-bins", { params: params })
          .then((response) => {
            console.log(response.data.data);
            // sessionStorage.setItem('asnData',this.searchasnvalue);
            if (response.data.data.length == 0) {

              //console.log("Array is either empty or does not exist");
              //this.errors ='Data Not Found';
              // this.searchAsn = "";
              // this.toSaveDiv = false;
              // this.toBin = "";
              // (this.searchDiv = false), (this.scanDiv = false);

              this.rackLocationDiv='false';
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sku Bin Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              console.log(response.data.data);
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.paginationdiv = true;
              this.rackLocationDiv='true';
              this.isOpen='true';

              this.toBinSkuData = response.data.data;
             this.pagination = response
                if(this.currentPage ===1){
                this.btnDisabled=true;
              }else{
                this.btnDisabled=false;
              }
            }
          })
          .catch((err) => {
            //console.log(err)
            this.searchAsn = "";
            this.scanDiv = false;
            (this.searchDiv = false), (this.scanDiv = false);
            this.toSaveDiv = false;
            this.toBin = "";

            //this.errors = err.response.data.error;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "SKU in other Bin Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },



    frombinSearch() {
      if (!this.whLocation) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "From Bin is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          UserId: sessionStorage.getItem("UserId"),
          whLocation: this.whLocation,
          page: this.currentPage,
        };

        axiosClient
          .get("/from-bin-location-search", { params: params })
          .then((response) => {
            console.log(response.data.data);
            // sessionStorage.setItem('asnData',this.searchasnvalue);
            if (response.data.data.length == 0 || response.data.status == 401) {
              //console.log("Array is either empty or does not exist");
              //this.errors ='Data Not Found';

              this.searchAsn = "";
              this.scanDiv = false;
              (this.searchDiv = true), (this.toSaveDiv = false);
              this.whLocation = "";
              this.skuflag = false;
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Bin Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
             // console.log(response.data.data[0].whlocation);

              this.fromBinNo = response.data.data[0].whlocation;
              this.errors = "";
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.paginationdiv = true;
              (this.searchDiv = false), (this.scanDiv = true);
              this.toSaveDiv = false;
              this.skuflag = true;
            }
          })
          .catch((err) => {
            //console.log(err)
            this.searchAsn = "";
            this.scanDiv = false;
            (this.searchDiv = true), (this.toSaveDiv = false);
            this.whLocation = "";
            this.skuflag = false;

            //this.errors = err.response.data.error;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Bin Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
      console.log(this.errors);
    },

    //
    scanBinSkuTransfer() {
      if (!this.scanSkuNo) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "SKU Name is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          UserId: sessionStorage.getItem("UserId"),
          scanSkuNo: this.scanSkuNo,
          fromBinNo: this.fromBinNo,
          page: this.currentPage,
        };

        axiosClient
          .get("/scan-sku-bin-transfer", { params: params })
          .then((response) => {
            console.log(response.data.data);
            if (response.data.data.length == 0) {
              this.skuTable = "";
              (this.scanSkuNo = ""),
                this.$swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "SKU Not found",
                  showConfirmButton: false,
                  timer: 1500,
                });
              this.scanBinNo = "";
              this.frombinSearch();
            } else {
              this.scanDiv = false;
              (this.searchSkuData = response.data.data),
                (this.skuName = this.scanSkuNo),
                (this.getbin = true),
                (this.saveButton = true);
              (this.skuTable = true),
                (this.toBinNo = response.data.data[0].LOCATION);
            }
          })
          .catch((err) => {
            this.saveButton = false;
            this.scanDiv = false;
            (this.scanSkuNo = ""),
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "SKU Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            this.scanBinNo = "";
            this.frombinSearch();
          });
      }
    },


    toUpdateQtyInBin() {
      
      // console.log(this.skuBatch);
      // for (var key of Object.keys(this.skuBatch)) {
      //   console.log(key + " -> " + this.skuBatch[key]);
      // }
      //bin-to-bintransfer-save
      // alert('Save Bin');

      if (this.toQty === "" && this.availableQty==="") {
        this.saveButton = false;
        this.$swal.fire("Alert!", "Please Insert Valid Quantity", "alert");
      } else {
        if (this.toQty <= this.availableQty) {
          this.$swal
            .fire({
              title: "Are you sure?",
              text: "You won't be transfer SKU to another Bin",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Move it!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                var params = {
                  warehouseId: sessionStorage.getItem("WarehouseId"),
                  clientId: sessionStorage.getItem("clientId"),
                  UserId: sessionStorage.getItem("UserId"),
                  fromBinNo: this.whLocation,
                  toBinNo: this.toBinNo,
                  toQty: this.toQty,
                  availableQty: this.availableQty,
                  balQty: this.balanceQty,
                  skuNo: this.skuNo,
                  batchNo: this.batchNo,
                  sloc: this.sloc,
                };

                axiosClient
                  .post("/bin-to-location-transfer", params)
                  .then((response) => {
                    console.log(response.status);
                    if (response.status == 200) {
                      this.$swal
                        .fire({
                          position: "top-end",
                          icon: "success",
                          title: "Bin transfer Successfully",
                          showConfirmButton: false,
                          timer: 1500,
                        })
                        .then((result) => {
                          setTimeout(function () {
                            location.reload(true);
                          }, 10);
                        });
                      this.saveButton = false;
                    } else {
                      this.saveButton = true;
                    }
                  })
                  .catch((err) => {
                    this.$swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Data Not found",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    this.scanBinNo = "";
                  });
              } else {
                this.$swal
                  .fire("Alert!", "Bin to Bin Transfer Failed", "alert")
                  .then((result) => {
                    setTimeout(function () {
                      location.reload(true);
                    }, 10);
                  });
              }
            });
        } else {
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Input Qty is Greater than to Available Qty",
            showConfirmButton: false,
            timer: 1500,
          });
          this.scanBinNo = "";
        }
      }
    },



    clearfields(e) {
      this.scanBinNo = "";
      this.toBinNo = "";
      this.saveButton = false;
    },

    pageChange(pageNumber){
      this.currentPage = pageNumber;
      this.toGetBinSkuDetails(); 
    },
   
  
  },

  mounted() {
   
  
    this.$refs.inputWhlocation.focus()
    this.currentPage = 1;
    //this.serarchasnvalue();
  },

 
};
</script>

<style></style>
