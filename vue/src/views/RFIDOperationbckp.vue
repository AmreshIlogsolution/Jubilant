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
                />Inventory

                <input
                  type="radio"
                  name="radioVal"
                  v-model="radioVal"
                  value="rfscan"
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
                />
                RF Scaning
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
                  "
                  placeholder="Search "
                />

                <button
                  type="submit"
                  @click.prevent="rfidOperationSearch()"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--- inventory data -->
    <div class="bg-white p-2 rounded mt-1" v-if="!inventoryDiv">
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
              <td scope="col" class="py-1 px-3">MT.Cube</td>
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Position</td>
              <td scope="col" class="py-1 px-3">Pack Name</td>
              <td scope="col" class="py-1 px-3">SKU Name</td>
              <td scope="col" class="py-1 px-3">Qty</td>
            </tr>
          </thead>
          <tbody>
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
       
    </div>

   <!-- Inventory Data End --->


   <!-- child Box div data -->
<div class="bg-white p-2 rounded mt-1" v-if="!childBoxDiv">
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
              <td scope="col" class="py-1 px-3">MT.Cube</td>
              <td scope="col" class="py-1 px-3">C.Cube</td>
              <td scope="col" class="py-1 px-3">Position</td>
              <td scope="col" class="py-1 px-3">Pack Name</td>
              <td scope="col" class="py-1 px-3">SKU Name</td>
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
              <!-- <td class="text-center">{{ cb.MC_NO }}</td>
              <td class="text-center">{{ cb.CC_NO }}</td>
              <td class="text-center">{{ cb.CC_POSITION }}</td>
              <td class="text-center">{{ cb.PACK_NAME }}</td>

              <td class="text-center">{{ cb.SKU_NAME }}</td>
              <td class="text-center">{{ cb.SKU_QTY }}</td> -->
               <td class="text-center">{{ cb.PACK_EPC }}</td>
            </tr>
          </tbody>
        </table>
      </div>
       
    </div>



   <!-- child Box Div Data End -->

    
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
      resultDiff: [],

      childBox:[],
      notMatchedCount: "",
      inventoryDiv:false,
      childBoxDiv:false,
      searchKeyChieldBox:'',
      count:0,
      childboxnewqq:[]
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
      for (
        var i = 0, charsLength = searchKeyChieldBox1.length;
        i < charsLength;
        i += 24
      ) {
        chunks1.push(searchKeyChieldBox1.substring(i, i + 24));
      }
     uniqueArr1 = this.removeDuplicates(chunks1);
     
      
     // const intersection = this.childBox.filter(element => uniqueArr.includes(element));
     // console.log('asdfsdf'+intersection)

      for(let u=0;u<uniqueArr1.length-1;u++){
        for(let j=0;j < this.childboxnewqq.length-1;j++){
          if(this.childboxnewqq[u].PACK_EPC == uniqueArr1[j]){
            console.log('don');
            this.count++;
          }
        }
          //console.log(this.childboxnewqq[u].PACK_EPC);
      }
       if(uniqueArr1.length === this.count){
        console.log('Match')
      }else{
        console.log('Not Matched')
      }
     
      // console.log(this.count);

  // let ass = this.abc(uniqueArr1,this.childboxnewqq);

  // console.log(ass);
      
      
      
     
 
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
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.notMatchedCount = length(response.data.resultDiff);
              // console.log(response.data.resultDiff);
              this.resultDiff = response.data.resultDiff;
               this.inventoryDiv = true;
            }
          })
          .catch((err) => {
            //  console.log(response.data.error);
          });
      }

    }else{
      
      this.inventoryDiv=!this.inventoryDiv;
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
             
             this.childboxnewqq = response.data;
              this.childBox = response.data;

              this.childBoxDiv = !this.childBoxDiv
              
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
