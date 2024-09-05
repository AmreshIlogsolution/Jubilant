<template>
  <div>
    <div
      v-show="elementVisible"
      wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
    >
      <div
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      ></div>
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    </div>
    <div class="bg-blue w-full p-2 flex justify-center font-sans">
      <div class="rounded bg-grey-light p-2 bg-gray-200 w-screen">
        <div class="flex justify-between py-1">
          <h3 class="text-lg font-bold ml-1 text text-indigo-900">PUT AWAY</h3>
          <label
            for="default-toggle"
            class="inline-flex relative items-center cursor-pointer ml-10"
          >
            <input
              type="checkbox"
              value=""
              v-model="hht"
              id="default-toggle"
              class="sr-only peer"
              checked
            />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3.5px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600"
            ></div>
            <span class="ml-3 text-sm font-medium text-indigo-900"
              >Use HHT Device</span
            >
          </label>
        </div>
        <div class="bg-white p-2 rounded mt-1 h-25">
          <div class="grid grid-flow-row-dense">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="search-asn"
                id="searchAsn"
                v-model="searchAsn"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Search MRN / Invoice"
                required
              />
              <button
                type="button"
                @click.prevent="searchMrnInvoiceValue()"
                class="text-white absolute right-2.5 bottom-1.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-700 font-medium rounded-lg text-sm px-4 py-2 slate:bg-slate-600 slate:hover:bg-slate-700 slate:focus:ring-slate-800"
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
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- <p class="mt-3 text-indigo-900">
          <router-link :to="'/inbound'"> To Inbound...</router-link>
        </p> -->
      </div>
    </div>

    <div class="bg-white p-2 rounded mt-1 h-20 cursor-pointer">
      <div v-if="putaways">
        <div
          class="container mx-auto rounded overflow-hidden shadow-xl divide-y divide-blue-200 mb-2"
          v-for="putaway in putaways"
          :key="putaway.MRNNo"
        >
          <router-link
            :to="{ name: 'PutAwayDetail', params: { id: putaway.Invoice } }"
          >
            <h6 class="p-1 bg-slate-200">{{ putaway.MRNNo }}</h6>
            <!-- <div class="grid grid-cols-4 gap-6 p-2">
                    <div class="text-sm text-blue-400 text-left">asnQty: </div>
                    <div class="text-sm"> </div> 
                </div> -->
            <div class="grid grid-cols-2 gap-1 p-1">
              <div class="text-xs text-blue-400 text-left">Invoice No:</div>
              <div class="text-xs text-left">{{ putaway.Invoice }}</div>
            </div>
            <div class="grid grid-cols-2 gap-1 p-1">
              <div class="text-xs text-blue-400 text-left">Party Name:</div>
              <div class="text-xs text-left">{{ putaway.PartyName }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <VueTailwindPagination
      :current="currentPage"
      :total="total"
      :per-page="perPage"
      @page-changed="pageChange($event)"
      small
    />
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
//import { ref, onMounted } from 'vue'
import "@ocrv/vue-tailwind-pagination/styles";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  data() {
    return {
      hht: true,
      searchMrnInvoice: "",
      putaways: {},
      currentPage: 1,
      perPage: "",
      total: "",
      elementVisible: true,
    };
  },
  methods: {
    async searchMrnInvoiceValue() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        mrnInvoice: this.searchMrnInvoice,
        page: this.currentPage,
      };
      await axiosClient
        .get("/search-Mrn-Invoice", { params: params })
        .then((response) => {
          setTimeout(() => (this.elementVisible = false), 500);
          this.putaways = response.data;
          this.elementVisible = true;
        })
        .catch((err) => {});
    },
    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.searchMrnInvoiceValue();
    },
  },
  created() {
    if (!sessionStorage.getItem("TOKEN")) {
      router.push({ path: "/login" });
    }
    setTimeout(() => (this.elementVisible = false), 500);
  },
};
</script>
