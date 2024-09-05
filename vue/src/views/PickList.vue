<template>
  <div>
    <div class="py-1 px-4 grid grid-cols-1 md:grid-cols-1">
      <div class="w-full">
        <div class="bg-gray-700 rounded-md border border-gray-600">
          <div class="flex justify-between py-1">
            <h1 class="p-3 font-bold text-white">PENDING PICK LIST</h1>

            <h5>
              <span class="float-right">
                <router-link
                  class="mb-3 mr-3 mt-3 inline-block px-4 py-2 bg-slate-500 text-white font-medium text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-slate-600 hover:shadow-lg focus:bg-slate-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-700 active:shadow-lg transition duration-150 ease-in-out font-bold"
                  :to="'/outbound/'"
                >
                  Back
                </router-link>
              </span>
            </h5>
          </div>
          <div class="p-2 sm:rounded-md bg-white">
            <div class="flex items-center py-2 px-3 rounded-lg">
              <input
                type="text"
                v-model="picklistInput"
                autocomplete="given-name"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
                placeholder="Search for picklist*"
              />
              <button
                type="submit"
                @click.prevent="picklistdata()"
                class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded"
              >
                Search
              </button>
            </div>

            <div class="text-xs text-center mt-1 mb-1">OR</div>

            <div class="flex space-x-2 justify-center">
              <div>
                <button
                  type="button"
                  class="mb-3 inline-block px-2 py-2 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out font-bold"
                  @click.prevent="picklistdata()"
                >
                  PENDING PICKLIST
                </button>
                <button
                  type="button"
                  class="inline-block px-2 py-2 ml-3 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out font-bold"
                >
                  Scan for Pick List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white p-2 rounded mt-1">
      <div v-if="picklists" class="px-3">
        <div
          class="container mx-auto rounded overflow-hidden border border-indigo-600 divide-y divide-blue-200 mb-2"
          v-for="picklist in picklists"
          :key="picklist.dnno"
        >
          <router-link
            :to="{
              name: 'PickListDetails',
              params: {
                dnno: picklist.dnno,
                inv: picklist.REF_NO,
                tq: picklist.InvQty,
                ts: picklist.PickQTy,
              },
            }"
          >
            <div class="grid grid-cols-2 gap-1 p-1">
              <div class="text-xs text-blue-400 text-left">Picklist:</div>
              <div class="text-xs text-left">{{ picklist.dnno }}</div>
            </div>
            <div class="grid grid-cols-2 gap-1 p-1">
              <div class="text-xs text-blue-400 text-left">Invoice:</div>
              <div class="text-xs text-left">{{ picklist.REF_NO }}</div>
            </div>
            <div class="grid grid-cols-2 gap-1 p-1">
              <div class="text-xs text-blue-400 text-left">Customer:</div>
              <div class="text-xs text-left">{{ picklist.custid }}</div>
            </div>
            <div class="grid grid-cols-4 gap-6 p-2 bg-slate-300">
              <div class="text-xs text-left">INV :</div>
              <div class="text-xs">{{ picklist.InvQty }}</div>
              <div class="text-xs text-left">Pck:</div>
              <div class="text-xs">{{ picklist.PickQTy }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div v-if="loaderurl">
      <img
        class="h-50 w-50"
        src="http://localhost:3000/blue-spinner.gif"
        alt="Workflow"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      picklists: [],

      clientid: "",
      currentPage: 1,
      perPage: "",
      total: "",
      picklistInput: "",
      loaderurl: false,
    };
  },
  methods: {
    async picklistdata() {
      //this.$swal('Hello Vue world!!!');
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        page: this.currentPage,
        picklistcontrol: this.picklistInput,
      };
      await axiosClient
        .get("/pending-pick-list", { params: params })
        .then((response) => {
          this.picklistInput = "";
          this.loaderurl = true;
          if (response.data.error === "NoRecord") {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Record Not Found!",
            });
            this.picklists = false;
            this.loaderurl = false;
          } else {
            this.picklists = response.data.data;
            this.perPage = response.data.per_page;
            this.total = response.data.total;
            this.clientId = sessionStorage.getItem("clientId");
            this.loaderurl = false;
          }
        })
        .catch((err) => {
          //  console.log(response.data.error);
        });
    },
    pageChange(pageNumber) {
      this.currentPage = pageNumber;

      this.picklistdata();
    },
  },
};
</script>
