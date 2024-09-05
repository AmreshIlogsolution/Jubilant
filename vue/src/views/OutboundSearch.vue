<template>
  <div class="bg-blue w-full p-4 flex justify-center font-sans">
    <div class="rounded bg-grey-light p-2 bg-gray-500 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-white">Outbound Search</h3>

        <button
          @click="$router.back()"
          class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-gray-700 cursor-pointer"
        >
          Back
        </button>
      </div>

      <div class="bg-white p-2 rounde2remd mt-1 border-b border-grey h-22">
        <div class="grid grid-flow-row-dense grid-cols-3">
          <div class="col-span-2">
            <label
              for="search-asn"
              class="block text-sm font-medium text-red-700 float-left ml-2"
            >
              Search for Invoice (*)</label
            >
            <input
              type="text"
              name="search-asn"
              id="searchAsn"
              v-model="searchAsn"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              @click="serarchasnvalue()"
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
            <div>
              <!--
   <button @click="clearfields()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex">Clear
</button>  
  -->
            </div>
            <b>{{ shout }}</b>
          </div>
        </div>

        <div
          class="bg-white p-2 rounded mt-1 border-b border-grey h-45 cursor-pointer grid gap-6"
          v-if="searchAsnVal"
        >
          <div v-for="asn in searchAsnVal" :key="asn.MDN_No" class="grid gap-6">
            <router-link
              :to="{
                name: 'OutboundDocuments',
                params: { id: asn.MDN_No, inv: asn.CustInv },
              }"
            >
              <div
                class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200"
              >
                <h5 class="p-1 bg-slate-200">{{ asn.MDN_No }}</h5>

                <div class="grid gap-1 grid-cols-1 p-2">
                  <div class="text-sm text-blue-400 text-left">
                    MDN Date:
                    <span
                      class="text-sm font-light text-gray-500 dark:text-gray-400"
                      >{{ asn.MDNDate }}</span
                    >
                  </div>

                  <div class="text-sm text-blue-400 text-left">
                    MDN No:
                    <span
                      class="text-sm font-light text-gray-500 dark:text-gray-400"
                      >{{ asn.MDN_No }}</span
                    >
                  </div>

                  <div class="text-sm text-blue-400 text-left">
                    Custom Inv:
                    <span
                      class="text-sm font-light text-gray-500 dark:text-gray-400"
                      >{{ asn.CustInv }}</span
                    >
                  </div>
                </div>
              </div>
            </router-link>
          </div>

          <div
            class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200"
            v-if="paginationdiv"
          >
            <div class="flex flex-col items-center" v-if="paginationdiv">
              <!-- Help text -->
              <span class="text-sm text-gray-700 dark:text-gray-400">
                Showing
                <span class="font-semibold text-gray-900 dark:text-white">{{
                  pagination.data.from
                }}</span>
                to
                <span class="font-semibold text-gray-900 dark:text-white">{{
                  pagination.data.to
                }}</span>
                of
                <span class="font-semibold text-gray-900 dark:text-white">{{
                  pagination.data.total
                }}</span>
                Entries
              </span>
              <!-- Buttons -->
              <div class="inline-flex mt-2 xs:mt-0">
                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click="pageChange(currentPage - 1)"
                  :disabled="btnDisabled"
                >
                  Prev
                </button>
                <button
                  class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click="pageChange(currentPage + 1)"
                >
                  Next
                </button>
              </div>
            </div>
            <!-- end here -->
          </div>
        </div>

        <p class="mt-3 text-white">
          <router-link :to="{ path: 'inbound' }"> To Inbound...</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";

import "@ocrv/vue-tailwind-pagination/styles";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

export default {
  name: "Receiving",
  components: {
    VueTailwindPagination,
  },

  created() {
    if (!sessionStorage.getItem("TOKEN")) {
      router.push({ path: "/login" });
    }
  },

  data() {
    return {
      pagination: {
        meta: { to: 1, from: 1 },
      },
      searchAsn: null,
      shout: "",
      currentPage: 1,
      searchAsnVal: [],
      perPage: "",
      total: "",
      paginationdiv: false,
      btnDisabled: true,
    };
  },

  methods: {
    serarchasnvalue() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        UserId: sessionStorage.getItem("UserId"),
        searchScanValue: this.searchAsn,
        page: this.currentPage,
      };

      axiosClient
        .get("/outbound-serach-images", { params: params })
        .then((response) => {
          //   console.log(response.data);
          if (response.data.data.length == 0) {
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Data Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            this.searchAsnVal = response.data.data;
            this.errors = "";
            this.perPage = response.data.per_page;
            this.total = response.data.total;

            this.pagination = response;
            this.paginationdiv = true;
            if (this.currentPage === 1) {
              this.btnDisabled = true;
            } else {
              this.btnDisabled = false;
            }
          }
          // sessionStorage.setItem('asnData',this.searchasnvalue);
        })
        .catch((err) => {
          this.searchAsnVal = "";
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Data Not found",
            showConfirmButton: false,
            timer: 1500,
          });
          // this.errors = err.response.data.error;
        });
    },

    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.serarchasnvalue();
    },

    clearfields(e) {
      this.searchAsn = "";
    },
  },
  mounted() {
    this.currentPage = 1;
    // this.serarchasnvalue();
  },
};
</script>

<style>
.pagination {
  list-style-type: none;
}
</style>
