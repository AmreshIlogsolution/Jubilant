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
    <div
      class="bg-blue w-full p-4 flex justify-center font-sans"
      v-if="!myIsActive"
    >
      <div class="rounded bg-grey-light p-2 bg-gray-200 w-screen">
        <div class="flex justify-between py-1">
          <h2 class="text-lg font-bold ml-1 text text-indigo-900">
            ASN Details
          </h2>
          <button
            @click="$router.back()"
            class="bg-slate-700 hover:bg-slate-600 hover:text-white text-white px-4 mr-2 rounded outline outline-offset-2 outline-slate-700 cursor-pointer"
          >
            Back
          </button>
        </div>

        <div class="bg-white p-2 rounde2remd mt-1 border-b border-grey h-22">
          <div class="grid grid-flow-row-dense">
            <label
              id="search"
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
                v-model="searchasnvalue"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Search for ASN (*)"
                required
              />
              <button
                type="button"
                @click="searchAsn()"
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

        <div v-if="searchAsnVal">
          <div
            v-for="asn in searchAsnVal"
            :key="asn.id"
            class="w-full p-2 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mb-2 mt-1"
          >
            <div>
              <h5
                class="text-sm font-medium text-indigo-900"
                @click="findAsnWithId(asn.ASN_NO)"
              >
                {{ asn.ASN_NO }}
              </h5>
              <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />

              <div
                class="block mb-2 text-xs font-medium grid-cols-1 float-left"
              >
                ASN Qty : <span class="text-slate-600"> {{ asn.ASNQTY }} </span>
              </div>

              <div class="block mb-2 text-xs font-medium grid-cols-1">
                Invoice No :
                <span class="text-slate-600"> {{ asn.InvoiceNO }} </span>
              </div>
              <div
                class="block mb-2 ttext-xs font-medium grid-cols-1 float-left text-xs"
              >
                Scan Qty :
                <span class="text-slate-600"> {{ asn.ScanQty }} </span>
              </div>
              <div class="block mb-2 text-xs font-medium grid-cols-1">
                PO No : <span class="text-slate-600"> {{ asn.PONO }} </span>
              </div>
            </div>
          </div>
          <div>
            <!-- end here -->

            <div
              class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200"
              style="margin-bottom: 60px"
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <AsnDetail ref="componet" v-if="showAsnDetial" ></AsnDetail> -->
    <AsnDetail v-else :asnbyid="asnbyid"> </AsnDetail>
  </div>
</template>
<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import AsnDetail from "../views/AsnDetail.vue";
// import '@ocrv/vue-tailwind-pagination/styles'
// import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'

export default {
  components: {
    AsnDetail,
  },
  data() {
    return {
      pagination: {
        data: { to: 1, from: 1 },
      },
      searchasnvalue: null,
      errors: null,
      searchAsnVal: [],
      currentPage: 1,
      perPage: "",
      total: "",
      paginationdiv: false,
      btnDisabled: true,
      myIsActive: false,
      asnbyid: [],
      elementVisible: true,
    };
  },
  methods: {
    async searchAsn() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        UserType: sessionStorage.getItem("UserType"),
        UserId: sessionStorage.getItem("UserId"),
        searchScanValue: this.searchasnvalue,
        page: this.currentPage,
      };
      await axiosClient
        .get("/search-asn", { params: params })
        .then((response) => {
          this.searchAsnVal = response.data.data;
          this.errors = "";
          this.pagination = response;
          this.paginationdiv = true;
          if (this.currentPage === 1) {
            this.btnDisabled = true;
          } else {
            this.btnDisabled = false;
          }
          if (response.data.error === "Record not found") {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Record Not Found!",
            });
          }
        })
        .catch((err) => {
          this.searchAsnVal = "";
          this.errors = err.response.data.error;
        });
    },
    async findAsnWithId(AsnNO) {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        UserType: sessionStorage.getItem("UserType"),
        UserId: sessionStorage.getItem("UserId"),
        searchScanValue: AsnNO,
      };

      await axiosClient
        .get("/asn-detail-values", { params: params })
        .then((response) => {
          if (response.data.error != "error") {
            setTimeout(() => (this.elementVisible = false), 500);
            this.asnbyid = response.data.asn;
            this.myIsActive = true;
            this.elementVisible = true;
          } else {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "ASN Detail not found!",
            });
          }
          this.errors = "";
        })
        .catch((err) => {});
    },
    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.searchAsn();
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
<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}
@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
