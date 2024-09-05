<template>
  <div class="bg-blue w-full p-4 flex justify-center font-sans">
    <div class="rounded bg-grey-light p-2 bg-gray-500 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-white">Inward Receiving</h3>
        <button
          @click="$router.back()"
          class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-gray-600 cursor-pointer"
        >
          Back
        </button>
      </div>

      <div class="bg-white p-2 rounde2remd mt-1 border-b border-grey h-22">
        <div class="grid grid-flow-row-dense grid-cols-1">
          <div class="col-span-1">
            <label
              for="search-asn"
              class="block text-sm font-medium text-red-700 float-left ml-2"
            >
              Search for SRN (*)</label
            >

            <div class="relative" data-v-b1d88bd4="">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 mt-4 pointer-events-none"
                data-v-b1d88bd4=""
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-b1d88bd4=""
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    data-v-b1d88bd4=""
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                name="search-asn"
                id="searchAsn"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Search for ASN (*)"
                required=""
                data-v-b1d88bd4=""
              /><button
                type="button"
                @click="serarchasnvalue()"
                class="text-white absolute right-2.5 bottom-1.5 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-700 font-medium rounded-lg text-sm px-4 py-2 slate:bg-slate-600 slate:hover:bg-slate-700 slate:focus:ring-slate-800"
                data-v-b1d88bd4=""
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                  data-v-b1d88bd4=""
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    data-v-b1d88bd4=""
                  ></path>
                </svg>
              </button>
            </div>
            <b>{{ shout }}</b>
          </div>
        </div>
      </div>

      <div
        class="bg-white p-2 rounded mt-1 border-b border-grey h-45 cursor-pointer grid gap-3"
        v-if="searchAsnVal"
      >
        <div v-for="asn in searchAsnVal" :key="asn.SRN_NO" class="grid gap-6">
          <router-link
            :to="{ name: 'InwardDocuments', params: { id: asn.SRN_NO } }"
          >
            <div
              class="container mx-auto rounded overflow-hidden border border-slate-200 divide-y divide-blue-200"
            >
              <h5 class="p-1 bg-slate-200">{{ asn.SRN_NO }}</h5>

              <div class="grid gap-1 grid-cols-1 p-2 text-xs">
                <div class="text-blue-400 text-left">
                  GRN DATE:
                  <span
                    class="text-sm font-light text-gray-500 dark:text-gray-400"
                    >{{ asn.GRNDATE }}</span
                  >
                </div>

                <div class="text-sm text-blue-400 text-left text-xs">
                  PARTY NAME:
                  <span class="font-light text-gray-500 dark:text-gray-400">{{
                    asn.PARTYNAME
                  }}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-1 p-2 text-xs">
                <div class="text-blue-400 text-left">
                  INVOICE:
                  <span
                    class="text-sm font-light text-gray-500 dark:text-gray-400"
                    >{{ asn.INVOICE }}</span
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
        .get("/asn-inward-receiving", { params: params })

        .then((response) => {
          console.log(response.data);
          if (response.data.data.length == 0) {
            this.searchAsn = "";
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
          this.searchAsn = "";
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Data Not found",
            showConfirmButton: false,
            timer: 1500,
          });
          // this.searchAsnVal = '';
          // this.errors = err.response.data.error;
        });
    },

    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.serarchasnvalue();
    },
  },

  //   mounted: function () {
  //   const TOKEN=   sessionStorage.getItem('TOKEN');
  //  if (TOKEN !=''){
  //  const ClientID=   sessionStorage.getItem('clientId');
  //  const WarehouseId=   sessionStorage.getItem('WarehouseId');
  //   //alert(TOKEN,' token');
  //  }else{
  //     this.$router.push('/login');
  //  }
  // },
  // computed: {
  //     // Computed property named "count", depending on the
  //     // "text" variable
  //     count() {
  //       return this.searchAsn.length;
  //     },
  //   }, data() {
  //     return {
  //         searchAsn: '',
  //     };
  //   },
};
</script>
