<template>
  <div>
    <div class="py-1 px-4 grid grid-cols-1 md:grid-cols-1">
      <div class="w-full">
        <div class="bg-blue-700 rounded-md border border-indigo-600">
          <div class="flex justify-between py-1">
            <h1 class="p-3 font-bold text-white">RFID Operation</h1>

            <h5>
              <span class="float-right">
                <router-link
                  class="
                    mb-3
                    inline-block
                    px-4
                    py-2
                    bg-slate-500
                    text-white
                    font-medium
                    text-xs
                    leading-tight
                    uppercase
                    rounded-xl
                    shadow-md
                    hover:bg-slate-600 hover:shadow-lg
                    focus:bg-slate-600
                    focus:shadow-lg
                    focus:outline-none
                    focus:ring-0
                    active:bg-slate-700 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out
                    font-bold
                  "
                  :to="'/dashboard/'"
                >
                  Back
                </router-link>
              </span>
            </h5>
          </div>
          <div class="p-2 sm:rounded-md bg-white">
            <div class="space-x-2 justify-center">
              <div class="text-sm mt-2">
                <input
                  type="radio"
                  name="radioVal"
                  v-model="radioVal"
                  value="inventoryAllData"
                  class="
                    mr-3
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    border-gray-300
                    focus:ring-blue-500
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800
                    focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />Inventory

                <input
                  type="radio"
                  name="radioVal"
                  v-model="radioVal"
                  value="inv"
                  class="
                    mr-3
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    border-gray-300
                    focus:ring-blue-500
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800
                    focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />Identify

                <input
                  type="radio"
                  name="radioVal"
                  v-model="radioVal"
                  value="inventoryByPack"
                  class="
                    mr-3
                    w-
                    h-4
                    text-blue-600
                    bg-gray-100
                    border-gray-300
                    focus:ring-blue-500
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800
                    focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />Identify By Pack
              </div>
            </div>

            
            <div class="space-x-2 justify-center">
              <div class="text-sm mt-2">
                <input
                  type="radio"
                  name="radioVal"
                  v-model="radioVal"
                  value="searchChild"
                  class="
                    mr-3
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    border-gray-300
                    focus:ring-blue-500
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800
                    focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />
                Search Child Box

                <input
                  type="radio"
                  name="radioVal"
                  v-model="radioVal"
                  value="searchMother"
                  class="
                    mr-3
                    w-4
                    h-4
                    text-blue-600
                    bg-gray-100
                    border-gray-300
                    focus:ring-blue-500
                    dark:focus:ring-blue-600 dark:ring-offset-gray-800
                    focus:ring-2
                    dark:bg-gray-700 dark:border-gray-600
                  "
                />
                Search Mother Box
              </div>

              <div class="flex items-center py-2 px-3 rounded-lg">
                <input
                  type="text"
                  v-model="searchKey"
                  v-if="hht"
                  autocomplete="given-name"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                    mx-2
                  "
                  placeholder="Search "
                />

                <input
                  type="text"
                  v-model="searchKey"
                  autocomplete="given-name"
                  v-else
                  @keyup.enter="rfidOperationSearch()"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                    mx-2
                  " placeholder="Search "
                />

                <button
                  type="submit"
                  @click.prevent="rfidOperationSearch()"
                  class="bg-pink-300
                    hover:bg-pink-500
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   


   <!-- child Box Div Data End -->

<!-- INventory All Data-->
<div class="bg-white p-2 rounded mt-1" v-if="inventoryAllDiv">
      <div class="overflow-x-auto relative">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            ">
            <tr>
              <td scope="col" class="py-1 px-3">MC.Name</td>
              <td scope="col" class="py-1 px-3">C.Name</td>
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Pack Name</td>
              <td scope="col" class="py-1 px-3">Total Pack</td>
         
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            " colspan="5">Matched Records No:{{ matchRecords }}</th>
            </tr>
            <tr
              v-for="inventoryData in inventoryAllData"
              :key="inventoryData.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >  <td class="text-center">{{ inventoryData.mc_name }}</td>
              <td class="text-center">{{ inventoryData.cc_no }}</td>
              <td class="text-center">{{ inventoryData.cc_name }}</td>
            
              <td class="text-center">{{ inventoryData.pack_name }}</td>
              <td class="text-center">{{ inventoryData.TotalPack }}</td>
            </tr>
          </tbody>
        </table>
      </div>
     
     
    
    </div>

<!-- INventory By Packedd Data-->
<div class="bg-white p-2 rounded mt-1" v-if="inventoryByPackDiv">
      <div class="overflow-x-auto relative">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            ">
            <tr>
              <td scope="col" class="py-1 px-3">MT.Cube</td>
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Position</td>
              <td scope="col" class="py-1 px-3">Pack Name</td>
         
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            " colspan="5">Matched Records No:{{ matchRecords }}</th>
            </tr>
            <tr
              v-for="inventory in inventoryData"
              :key="inventory.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="text-center">{{ inventory.MC_NO }}</td>
              <td class="text-center">{{ inventory.CC_NO }}</td>
              <td class="text-center">{{ inventory.CC_POSITION }}</td>
              <td class="text-center">{{ inventory.PACK_NAME }}</td>
            </tr>
          </tbody>
        </table>
      </div>
     
     
      <div  v-if="inventoryByPackDiv">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            " colspan="5">Miss Match Records No:{{ rl }}</th>
            </tr>
          
          </thead>
          <tbody>
            <tr  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="notMatched in resultNotMatched" :key="notMatched.id">
                <td class="text-left text-red-400">{{ notMatched.pecNo }}</td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>


<!-- INventory  Data-->
<div class="bg-white p-2 rounded mt-1" v-if="inventoryDiv">
      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            ">
            <tr>
              <td scope="col" class="py-1 px-3">MT.Cube</td>
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Position</td>
              <td scope="col" class="py-1 px-3">Pack Name</td>
              <td scope="col" class="py-1 px-3">SKU Name</td>
              <td scope="col" class="py-1 px-3">Qty</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            " colspan="5">Matched Records No:{{ matchRecords }}</th>
            </tr>
            <tr
              v-for="inventory in inventoryData"
              :key="inventory.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="text-center">{{ inventory.MC_NO }}</td>
              <td class="text-center">{{ inventory.CC_NO }}</td>
              <td class="text-center">{{ inventory.CC_POSITION }}</td>
              <td class="text-center">{{ inventory.PACK_NAME }}</td>

              <td class="text-center">{{ inventory.SKU_NAME }}</td>
              <td class="text-center">{{ inventory.SKU_QTY }}</td>
            </tr>
          </tbody>
        </table>
      </div>
     
     <!-- INventory Mismatched Data-->
      <div  v-if="inventoryDiv">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            " colspan="5">Miss Match Records No:{{ rl }}</th>
            </tr>
          
          </thead>
          <tbody>
            <tr  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="notMatched in resultNotMatched" :key="notMatched.id">
                <td class="text-left text-red-400">{{ notMatched.pecNo }}</td>
            </tr>
          </tbody>
        </table>
      </div> 
    </div>

    <!--  XTYYYA-->
    <div class="bg-white p-2 rounded mt-1" v-if="childBoxDiv">
   <div class="flex items-center py-2 px-3 rounded-lg">
   <input
                  type="text"
                  v-model="searchKeyChieldBox"
                  autocomplete="given-name"
                   
                  @keyup.enter="matchChildBox()"
                  class="
                    mt-1
                    focus:ring-indigo-500 focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                    mx-2
                  "
                  placeholder="Search "
                />

                <button
                  type="submit"
                  @click.prevent="matchChildBox()"
                  class="
                    bg-pink-300
                    hover:bg-pink-500
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                  "
                >
                  Search
                </button>
   </div>


     <div class="overflow-x-auto relative" v-if="originalList">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            "
          >
            <tr>
              <td scope="col" class="py-1 px-3">MT.Cube</td>
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Position</td>
              <td scope="col" class="py-1 px-3">Pack Name</td>
              <td scope="col" class="py-1 px-3">Pack Expiry</td>
              <td scope="col" class="py-1 px-3">Qty</td>
              <td scope="col" class="py-1 px-3">Match/MissMatch</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cb in childBox"
              :key="cb.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="text-center">{{ cb.MC_NO }}</td>
              <td class="text-center">{{ cb.CC_NO }}</td>
              <td class="text-center">{{ cb.CC_POSITION }}</td>
              <td class="text-center">{{ cb.PACK_NAME }}</td>

              <td class="text-center">{{ cb.PACK_EXPIRY }}</td>
              <td class="text-center">{{ cb.SKU_QTY }}</td> 
               <td class="text-center">{{ cb.PACK_EPC }}</td>
            </tr>
          </tbody>
        </table>
      </div>
       <div class="overflow-x-auto relative">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            "
          >
            <tr>
              <td scope="col" class="py-1 px-3">Pack Name</td>
            <!--  <td scope="col" class="py-1 px-3">MT.Cube</td>-->
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Position</td>
                       <!--   <td scope="col" class="py-1 px-3">Pack Name</td> -->
              <td scope="col" class="py-1 px-3">Pack Expiry</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="mm in matched"
              :key="mm.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td class="text-center text-green-800">{{ mm.PACK_NAME }}</td>
                <td class="text-center text-green-800">{{ mm.MC_NO }}</td>
                <td class="text-center text-green-800">{{ mm.CC_NO }}</td>
             <!-- <td class="text-center text-green-800">{{ mm.CC_POSITION }}</td> -->
                <td class="text-center">{{ mm.PACK_EXPIRY }}</td>
              
            </tr>
           
             <tr
              v-for="un in unMatched"
              :key="un.id"
              class="bg-white border-b dark:bg-red-800 dark:border-red-700"
            >
              <td class="text-center text-red-800">{{ un.PACK_NAME }}</td>
                <td class="text-center text-red-800">{{ un.MC_NO }}</td>
                <td class="text-center text-red-800">{{ un.CC_NO }}</td>
                <td class="text-center text-red-800">{{ un.CC_POSITION }}</td>
              
            </tr>


            
          </tbody>
        </table>
        <div>{{ this.unMatchSCan}}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  data() {
    return {
      rfidOper: "",
      searchKey: "",
      radioVal: "",
      rfidOpeationDiv: false,
      hht: true,
      inventoryData: [],
      resultNotMatched: [],
      childBox:[],
      notMatchedCount: "",
      inventoryDiv:false,
      inventoryByPackDiv:false,
      childBoxDiv:false,
      searchKeyChieldBox:'',
      count:0,
      childboxnewqq:[],
      matcharrval:[],

      matched:[],
      unMatched:[],
      originalList:true,
      unMatchSCan:[],
      inventoryAllDiv:false,
      inventoryAllData:[],
    };
  },
  methods: {
   
    abc(arr1,arr2){
      console.log(arr2,arr1)
      for(let element of arr1){
       for(let i=0;i<=arr2.length; i++){
        // console.log(arr2[i]);
        // let val = arr2[i].PACK_EPC;
        //console.log(typeof(element),typeof(val));
        // if(element == val){
        //   this.count = this.count+1;
         
        // }
       }
      }
    //  return count;
    },
    matchChildBox() {
     

      
     let searchKeyChieldBox1 = this.searchKeyChieldBox;
    
      var chunks1 = [];
      let uniqueArr1 = [];
      let listarray = this.childBox;
      for (
        var i = 0, charsLength = searchKeyChieldBox1.length;
        i < charsLength;
        i += 24
      ) {
        chunks1.push(searchKeyChieldBox1.substring(i, i + 24));
      }
      
      uniqueArr1 = this.removeDuplicates(chunks1);

     let Match = listarray.filter(e=>uniqueArr1.includes(e.PACK_EPC));
     let unMatch = listarray.filter(e=>!uniqueArr1.includes(e.PACK_EPC));
 
     console.log('Match',Match);
      
     this.matched = Match;
     this.unMatched = unMatch;

      let arr3=[]
      for(i=0;i<this.childboxnewqq.length;i++){
          arr3.push(this.childboxnewqq[i].PACK_EPC)
      }
      let scanUnmatchData = uniqueArr1.filter(e=>!arr3.includes(e))

      

    this.unMatchSCan =scanUnmatchData


     this.originalList=false;
   
   
 console.log('klsdf',this.childboxnewqq);
      
     
 
    },
 
    async rfidOperationSearch() { 

      if(this.radioVal=='inv'){      
      let searchKeyValue = this.searchKey;
      var chunks = [];
      let uniqueArr = [];
      for (
        var i = 0, charsLength = searchKeyValue.length;
        i < charsLength;
        i += 24
      ) {
        chunks.push(searchKeyValue.substring(i, i + 24));
      }
      uniqueArr = this.removeDuplicates(chunks);
 
      this.searchKey;
      this.radioVal;
      if (this.searchKey == "" && this.radioVal == "") {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Select Above Inputs",
        });
      } else {
        //this.$swal('Hello Vue world!!!');
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          page: this.currentPage,
          searchKey: uniqueArr,
          radioVal: this.radioVal,
        };
        await axiosClient
          .post("/rfid-search", { params: params })
          .then((response) => {
            if (response.data.error === "NoRecord") {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Record Not Found!",
              });
            } else {
             
              this.inventoryData = response.data.data;
              this.matchRecords=this.inventoryData.length;
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.resultNotMatched = response.data.resultDiff;
            
              this.rl= this.resultNotMatched.length;
             // console.log(this.rl);
               this.inventoryDiv = true;
               this.inventoryByPackDiv = false;
               this.childBoxDiv=false;
               this.inventoryAllDiv=false;
            }
          })
          .catch((err) => {
            //  console.log(response.data.error);
          });
      }

    }else if(this.radioVal=='inventoryByPack'){
      let searchKeyValue = this.searchKey;
      var chunks = [];
      let uniqueArr = [];
      for (
        var i = 0, charsLength = searchKeyValue.length;
        i < charsLength;
        i += 24
      ) {
        chunks.push(searchKeyValue.substring(i, i + 24));
      }
      uniqueArr = this.removeDuplicates(chunks);
 
      this.searchKey;
      this.radioVal;
      if (this.searchKey == "" && this.radioVal == "") {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Select Above Inputs",
        });
      } else {
        //this.$swal('Hello Vue world!!!');
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          page: this.currentPage,
          searchKey: uniqueArr,
          radioVal: this.radioVal,
        };
        await axiosClient
          .post("/rfid-search-inventorybypack", { params: params })
          .then((response) => {
            if (response.data.error === "NoRecord") {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Record Not Found!",
              });
            } else {
             
              this.inventoryData = response.data.data;
              this.matchRecords=this.inventoryData.length;
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.resultNotMatched = response.data.resultDiff;
            
              this.rl= this.resultNotMatched.length;
             // console.log(this.rl);
               this.inventoryByPackDiv = true;
               this.inventoryDiv = false;
               this.childBoxDiv=false;
               this.inventoryAllDiv=false;
            }
          })
          .catch((err) => {
            //  console.log(response.data.error);
          });
       }
    }else if(this.radioVal=='inventoryAllData'){
    let searchKeyValue = this.searchKey;
      var chunks = [];
      let uniqueArr = [];
      for (
        var i = 0, charsLength = searchKeyValue.length;
        i < charsLength;
        i += 24
      ) {
        chunks.push(searchKeyValue.substring(i, i + 24));
      }
      uniqueArr = this.removeDuplicates(chunks);
 
      this.searchKey;
      this.radioVal;
      if (this.searchKey == "" && this.radioVal == "") {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Select Above Inputs",
        });
      } else {
        //this.$swal('Hello Vue world!!!');
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          page: this.currentPage,
          searchKey: uniqueArr,
          radioVal: this.radioVal,
        };
        await axiosClient
          .post("/rfid-search-inventoryalldata", { params: params })
          .then((response) => {
            if (response.data.error === "NoRecord") {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Record Not Found!",
              });
            } else {
             //console.log(response.data);
              this.inventoryAllData = response.data.data;
              this.matchRecords=this.inventoryAllData.length;
            //  this.perPage = response.data.per_page;
            //  this.total = response.data.total;
             // this.resultNotMatched = response.data.resultDiff;
            
              //this.rl= this.resultNotMatched.length;
             // console.log(this.rl);
               this.inventoryByPackDiv = false;
               this.inventoryDiv = false;
               this.childBoxDiv=false;
               this.inventoryAllDiv=true;
            }
          })
          .catch((err) => {
            //  console.log(response.data.error);
          });
       }
    }else{
    
      var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          page: this.currentPage,
          searchKey: this.searchKey,
          radioVal: this.radioVal,
        };
        await axiosClient
          .post("/rfid-search-child", { params: params })
          .then((response) => {
            if (response.data.error === "NoRecord") {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Record Not Found!",
              });
            } else {
             
             this.childboxnewqq = response.data.limitData;
              this.childBox =  response.data.fullData;
              this.inventoryDiv=false;
              this.inventoryByPackDiv = false;
             this.childBoxDiv=true;
             this.inventoryAllDiv=false;
            }

          })
          .catch((err) => {
            //  console.log(response.data.error);
          });
    }  

  },

    removeDuplicates(arr) {
      return arr.filter((item, index) => arr.indexOf(item) === index);
    },
  },
};
</script>
