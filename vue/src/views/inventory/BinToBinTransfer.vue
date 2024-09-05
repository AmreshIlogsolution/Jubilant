<template>
  <div class="bg-blue w-full flex justify-center font-sans">
    <div class="rounded bg-gray-300 p-2 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-indigo-600">Inventory</h3>
        <button
          @click="$router.back()"
          class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white px-4 rounded outline outline-offset-2 outline-gray-500 cursor-pointer mb-2"
        >
          Back
        </button>
      </div>

      <div class="overflow-x-auto relative">
        <div
          class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200"
        >
          <!-- <h5 class="p-1 bg-slate-200 text-left">Bin to Bin Transfer</h5> -->
          <!-- toogle button-->

          <div class="flex justify-between py-1 bg-gray-800">
            <h3 class="text-sm text-white ml-1">Bin to Bin Transfer</h3>
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
                class="w-11 h-6 bg-rose-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600 mr-2"
              ></div>
              <span class="text-sm font-medium text-white mr-1"
                >Use HHT Device</span
              >
            </label>
          </div>

          <div class="grid gap-1 grid-cols-1 p-2 bg-white">
            <div class="text-sm text-blue-400 text-left">
              Client Id:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400">
                {{ clientId }}
              </span>
            </div>

            <div class="text-sm text-blue-400 text-left">
              From Bin No:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400"
                >{{ whLocation }}
              </span>
            </div>

            <div class="text-sm text-blue-400 text-left">
              To Bin No:
              <span class="text-sm font-light text-gray-500 dark:text-gray-400"
                >{{ toBinNo }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-2 rounde2remd mt-1 border-b border-grey h-22">
        <div
          class="grid grid-flow-row-dense grid-cols-4 gap-3"
          v-if="searchDiv"
        >
          <div class="col-span-2" v-if="!hht">
            <label
              for="search-whLocation"
              class="block text-sm font-medium text-red-700 float-left ml-2"
              >From Bin Search *</label
            >

            <input
              type="text"
              name="search-whLocation"
              id="whLocation"
              v-model="whLocation"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @keyup.enter="frombinSearch()"
              autofocus
            />
          </div>

          <div class="col-span-2" v-else>
            <label
              for="search-whLocation"
              class="block text-sm font-medium text-red-700 float-left ml-2"
              >From Bin Search *</label
            >

            <input
              type="text"
              name="search-whLocation"
              id="whLocation"
              v-model="whLocation"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @keyup="frombinSearch()"
              autofocus
            />
          </div>

          <div>
            <button
              v-if="!hht"
              @click="frombinSearch()"
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
                />
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

        <div class="grid grid-flow-row-dense grid-cols-4 gap-3" v-if="scanDiv">
          <div class="col-span-2" v-if="!hht">
            <label
              for="scanBin"
              class="block text-sm font-medium text-red-700 float-left ml-2"
              >To Bin Scan*</label
            >

            <input
              type="text"
              name="scanBinNo"
              id="scanBinNo"
              v-model="scanBinNo"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @keyup.enter="scanBinTransfer()"
              autofocus
            />
          </div>
          <div class="col-span-2" v-else>
            <label
              for="scanBin"
              class="block text-sm font-medium text-red-700 float-left ml-2"
              >To Bin Scan*</label
            >

            <input
              type="text"
              name="scanBinNo"
              id="scanBinNo"
              v-model="scanBinNo"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              @keyup="scanBinTransfer()"
              autofocus
            />
          </div>

          <div>
            <button
              v-if="!hht"
              @click="scanBinTransfer()"
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
                /></svg
              >Scan
            </button>
          </div>

          <div>
            <button
              @click="saveBinToBin()"
              v-if="saveButton"
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-4 flex"
            >
              Save
            </button>

            <button
              @click="clearfields()"
              v-if="hht"
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-left ml-2 flex"
            >
              Clear
            </button>
          </div>

          <b>{{ shout }}</b>
        </div>

        <div class="grid gap-1 grid-cols-3 bg-white" v-if="scanDiv">
          <div class="text-sm text-blue-400 text-left">
            <button
              @click="backToBinPage()"
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 float-left mx-2 my-2 flex"
            >
              Back To Bin
            </button>
          </div>

          <b>{{ shout }}</b>
        </div>
      </div>

      <div
        class="bg-white p-2 rounded mt-1 border-b border-grey h-45 cursor-pointer grid gap-6"
        v-if="searchAsnVal"
      >
        <div class="overflow-x-auto relative">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b"
            >
              <tr>
                <th scope="col" class="py-0 px-0">SKU</th>
                <th scope="col" class="py-0 px-0">Batch No.</th>
                <th scope="col" class="py-0 px-0">Bal QTY</th>
                <th scope="col" class="py-0 px-0">SLOCK</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="asn in searchAsnVal"
                :key="asn.sku"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="py-0 px-0 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ asn.sku }}
                </th>
                <td class="py-0 px-0">
                  {{ asn.batchNo }}
                </td>
                <td class="py-0 px-0">
                  {{ asn.balqty }}
                </td>
                <td class="py-0 px-0">
                  {{ asn.sloc }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- <p class="mt-3 text-white">
          <router-link :to="{ path: 'inventory' }"> To Inventory...</router-link>
        </p> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../../axios";
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
      whLocation: null,
      shout: "",
      currentPage: 1,
      searchAsnVal: [],
      perPage: "",
      total: "",
      paginationdiv: false,
      success: "",
      errors: "",
      clientId: sessionStorage.getItem("clientId"),
      scanDiv: false,
      scanBin: "",
      searchDiv: true,
      scanBinNo: "",
      saveButton: false,
      toBinNo: "",
      body: "",
      hht: true,
    };
  },

  methods: {
    backToBinPage() {
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
            this.searchDiv = true;
            this.scanDiv = false;
            this.searchAsnVal = [];
            this.scanBinNo = "";
            this.whLocation = "";
            this.$router.push({ path: "/bin-to-bin-transfer" });
          }
        });
    },

    frombinSearch() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        UserId: sessionStorage.getItem("UserId"),
        whLocation: this.whLocation,
        page: this.currentPage,
      };

      axiosClient
        .get("/from-bin-search", { params: params })
        .then((response) => {
          console.log(response.data.data.length);
          // sessionStorage.setItem('asnData',this.searchasnvalue);
          if (response.data.data.length == 0 || response.data.status == 401) {
            //console.log("Array is either empty or does not exist");
            //this.errors ='Data Not Found';
            this.searchAsn = "";
            (this.whLocation = ""), (this.scanDiv = false);
            (this.searchDiv = true), (this.scanDiv = false);
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Data Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.log(response.data);
            this.searchAsnVal = response.data.data;

            this.errors = "";
            this.perPage = response.data.per_page;
            this.total = response.data.total;
            this.paginationdiv = true;
            (this.searchDiv = false), (this.scanDiv = true);
          }
        })
        .catch((err) => {
          //console.log(err)
          this.searchAsnVal = "";
          this.searchAsn = "";
          this.scanDiv = false;
          (this.searchDiv = true), (this.scanDiv = false);
          //this.errors = err.response.data.error;
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Data Not found",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    },

    scanBinTransfer() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        UserId: sessionStorage.getItem("UserId"),
        scanBinNo: this.scanBinNo,
        page: this.currentPage,
      };

      axiosClient
        .get("/scan-to-transfer", { params: params })
        .then((response) => {
          //console.log(response.data.data[0].LOCATION);
          if (response.data.data.length == 0) {
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Data Not found",
              showConfirmButton: false,
              timer: 1500,
            });
            this.scanBinNo = "";
            this.frombinSearch();
          } else {
            this.saveButton = true;
            this.toBinNo = response.data.data[0].LOCATION;
          }
        })
        .catch((err) => {
          this.saveButton = false;
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Data Not found",
            showConfirmButton: false,
            timer: 1500,
          });
          this.scanBinNo = "";
          this.frombinSearch();
        });
    },

    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.frombinSearch();
    },

    saveBinToBin() {
      //bin-to-bintransfer-save
      // alert('Save Bin');

      if (this.toBinNo === "" && this.whLocation === "") {
        this.saveButton = false;
        this.$swal.fire("Alert!", "Please Select To Bin Location", "alert");
      } else {
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
                page: this.currentPage,
                body: this.searchAsnVal,
              };

              axiosClient
                .post("/bin-to-bin-transfer-save", params)
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
      }
    },

    clearfields(e) {
      this.scanBinNo = "";
      this.toBinNo = "";
      this.saveButton = false;
    },
  },

  mounted() {
    this.currentPage = 1;
    // this.serarchasnvalue();
  },
};
</script>

<style></style>
