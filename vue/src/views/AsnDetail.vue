<template>
  <div>
    <div
      class="p-2 m-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-1">
        <h6
          class="text-xs font-bold leading-none text-gray-900 dark:text-white"
        >
          {{ asnbyid[0].ASN_NO }}
        </h6>
        <a
          @click="$router.back()"
          class="text-xs font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Back
        </a>
      </div>

      <table class="w-full text-xs text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr
            class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-collapse border border-slate-200"
          >
            <th
              scope="row"
              class="text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Total Qty:
            </th>
            <td class="text-xs">
              {{ asnbyid[0].ASNQTY }}
            </td>
            <th
              class="text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Scan Qty:
            </th>
            <td class="">
              {{ asnbyid[0].ScanQty }}
            </td>
          </tr>

          <tr
            class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-collapse border border-slate-200"
          >
            <th
              scope="row"
              class="text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Invoice No:
            </th>
            <td class="text-xs">
              {{ asnbyid[0].InvoiceNO }}
            </td>
            <th
              class="text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              PO No:
            </th>
            <td class="text-xs">
              {{ asnbyid[0].PONO }}
            </td>
          </tr>
          <tr
            class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-collapse border border-slate-200"
          >
            <td
              scope="row"
              class="text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              LPN/BOX:
            </td>
            <td class="text-xs">
              {{ lpn_box }}
            </td>
            <th
              class="text-xs font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              SKU:
            </th>
            <td class="text-xs">
              {{ sku }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="p-1 pl-2 m-2 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="grid grid-flow-row-dense">
        <div class="grid grid-flow-row-dense">
          <label
            class="mb-2 text-xs font-medium text-gray-900 sr-only dark:text-white"
            id="lpn_box"
          >
            Search BOX / LPN</label
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
              name="lpn_box"
              ref="input1"
              v-model="lpn_box"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" Search BOX / LPN"
              required
            />
            <button
              type="button"
              @click.prevent="searchLPN"
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

        <div v-if="lpn" class="bg-white p-1 rounded mt-1">
          <!-- <div class="text-left mb-1 text-sm ml-2">
            <input
              type="checkbox"
              v-model="hhtDevice"
              @click="hhtEnable()"
              checked
            />
            Use HTT Device
          </div> -->
          <div class="grid grid-flow-row-dense">
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
              <!-- <input
                type="search"
                name="sku"
                id="skuid"
                ref="skuinputvalues"
                v-if="!hhtDevice"
                v-model="sku"
                @keyup.enter="searchSKU()"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search SKU"
                required
              /> -->
              <input
                type="search"
                name="qrCode"
                id="qrCode"
                ref="skuinputvalues"
                v-model="qrCode"
                @keyup.prevent="searchQrCode($event)"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Scan QR Code"
                required
              />
              <!-- <button
                type="button"
                v-if="!hhtDevice"
                @click.prevent="searchSKU()"
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
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- SKU TABLE -->
    <!-- <div class="flex flex-col" v-if="skutable">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="border-b bg-gradient-to-r from-indigo-500">
                <tr>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left"
                  >
                    SkU
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left"
                  >
                    Batch
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left"
                  >
                    ASN QTY
                  </th>
                  <th
                    scope="col"
                    class="text-xs font-medium text-gray-900 px-2 py-1 text-left"
                  >
                    Update
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b"
                  v-for="(sku, i) in skuData"
                  :key="`skuInput.${i}`"
                >
                  <td
                    class="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 text-left"
                  >
                    <input
                      type="radio"
                      name="skuBatch"
                      :value="sku.batchno"
                      v-model="skuBatch['dynamic-field-' + i]"
                      @change="
                        radiobuttonclick(
                          sku.SKU,
                          sku.ASNQTY,
                          sku.ScanQty,
                          sku.batchno
                        )
                      "
                      :checked="isChecked"
                    />
                  </td>
                  <td
                    class="text-xs text-gray-900 font-light px-2 py-1 whitespace-nowrap text-left"
                  >
                    {{ sku.SKU }}
                  </td>
                  <td
                    class="text-xs text-gray-900 font-light px-2 py-1 whitespace-nowrap text-left"
                  >
                    {{ sku.batchno != "" ? sku.batchno : "" }}
                  </td>
                  <td
                    class="text-xs text-gray-900 font-light px-2 py-1 whitespace-nowrap text-left"
                  >
                    {{ sku.ASNQTY }} ({{ sku.ScanQty }})
                  </td>

                  <td
                    class="text-sm text-gray-900 font-light px-2 py-1 whitespace-nowrap"
                  >
                    <input
                      type="number"
                      v-model="values['dynamic-field-' + i]"
                      :id="'skuInputUpdateVal' + i"
                      class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-24 h-6"
                      :max="sku.ASNQTY"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="mt-3 float-right mr-5 from-indigo-500" v-if="isVisible">
              <button
                class="py-1 px-4 bg-green-400 hover:bg-green-700 text-white rounded"
                @click.prevent="updateSku()"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
// import '@ocrv/vue-tailwind-pagination/styles'
// import VueTailwindPagination from '@ocrv/vue-tailwind-pagination'
export default {
  props: ["asnbyid"],
  data() {
    return {
      // values: {},
      qrDataFormated: [],
      lpn_box: "",
      qrCode: "",
      lpn: "",
      sku: "",
      // skutable: false,
      // skuData: [],
      // skuBatch: {},
      // ASNQty: "",
      // isDisabled: true,
      // max: 1,
      // skuval: "",
      // skubatchval: "",
      // skuupdateqty: "",
      // scanQty: "",
      // hhtDevice: true,
      // globalScanQty: "",
      // skuCode: "",
      // buttonshow: false,
      // condition: false,
      // gridskuscanqty: "",
      // batchValCondtion: "",
      // skuTemp: "",
      // SBVAl: "",
      // isChecked: false,
      // isVisible: false,
      // counter: 0,
    };
  },
  methods: {
    // hhtEnable() {
    //   this.hhtDevice = true;
    //   this.$refs.skuinputvalues.focus();
    // },

    async searchLPN() {
      if (this.lpn_box == "") {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Box / LPN Not Valid!",
        });
        return false;
      }
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        UserId: sessionStorage.getItem("UserId"),
        wLocation: this.lpn_box,
        asn: this.asnbyid[0].ASN_NO,
      };
      await axiosClient
        .get("/search-lpn-box", { params: params })
        .then((response) => {
          if (response.data == "ok") {
            this.lpn = true;
          } else {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "LPN Not Valid!",
            });
          }
        })
        .catch((err) => {
          //this.errors = err.response.data.error;
        });
    },
    searchQrCode($event) {
      //console.log($event.target.keys);
      let data = this.makeValidSkuBatchNoSeritalNo(this.qrCode);
      console.log(data);
    },
    makeValidSkuBatchNoSeritalNo(qrdata) {
      try {
        const myArray = qrdata.split(":");
        let finals = [];
        let skuword = myArray[1];
        let batchword = myArray[2];
        let serialword = myArray[3];
        let skuVal = skuword.split("BatchNo");
        let barchVal = batchword.split("SerialNo");
        finals["sku"] = skuVal[0];
        finals["batch"] = barchVal[0];
        finals["serial"] = serialword;
        return finals;
      } catch (e) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Wrong data format",
        });
      }
    },
    // searchSKU() {
    //   if (this.sku == "") {
    //     this.$swal({
    //       icon: "error",
    //       title: "Oops...",
    //       text: " SKU Field is empty",
    //     });
    //   } else {
    //     var params = {
    //       warehouseId: sessionStorage.getItem("WarehouseId"),
    //       clientId: sessionStorage.getItem("clientId"),
    //       skuCode: this.sku,
    //       cutInvoice: this.asnbyid[0].InvoiceNO,
    //     };

    //     axiosClient
    //       .get("/search-SKU", { params: params })
    //       .then((response) => {
    //         this.skutable = true;
    //         this.skuCode = this.sku;
    //         console.log(response.data);
    //         if (response.data.success == "success") {
    //           this.skuData = response.data.sku;

    //            if (response.data.sku.length == 1) {
    //              if (
    //                parseInt(response.data.sku[0].ScanQty) <
    //                parseInt(response.data.sku[0].ASNQTY)
    //              ) {
    //                this.insertupdateSkuSingleQty(
    //                  this.asnbyid[0].InvoiceNO,
    //                  this.asnbyid[0].ASN_NO,
    //                  this.lpn_box,
    //                  this.skuData[0].batchno,
    //                  this.skuData[0].SKU
    //                );
    //              } else {
    //                this.$swal({
    //                  icon: "error",
    //                  title: "Oops...",
    //                  text: "Scan Qty is Greater than Asn Quantiy!",
    //                });
    //              }
    //            }
    //              if (
    //                parseInt(response.data.sku[0].ScanQty) <
    //                parseInt(response.data.sku[0].ASNQTY)
    //              ) {
    //                this.insertupdateSkuSingleQty(
    //                  this.asnbyid[0].InvoiceNO,
    //                  this.asnbyid[0].ASN_NO,
    //                  this.lpn_box,
    //                  this.skuData[0].batchno,
    //                  this.skuData[0].SKU
    //                );
    //                // this.$swal('Recored Inserted Successfully');
    //                this.isChecked = false;
    //                this.isVisible = true;

    //                this.skuData = response.data.scanQtyTotalvalues;
    //                this.globalScanQty =
    //                  response.data.scanQtyTotalvalues[0].scanqty;
    //                this.sku = "";
    //              } else {
    //                this.$swal("Scan Qty should less then Asn Qty", "error");
    //              }
    //              this.sku = "";
    //              this.$refs.skuinput.focus();
    //         } else if (response.data.error == "error") {
    //           this.$swal({
    //             icon: "error",
    //             title: "Oops...",
    //             text: " SKU not foound!",
    //           });
    //           this.sku = "";
    //           this.skutable = false;
    //         }
    //       })
    //       .catch((err) => {
    //         //alert("false");
    //         // this.skuerrors = err.response.data.error;
    //       });
    //   }
    // },

    // searchSKUHHT($event) {
    //   $event.preventDefault();
    //   if ($event.target.value) {
    //     if (this.sku == "") {
    //     } else {
    //       var params = {
    //         warehouseId: sessionStorage.getItem("WarehouseId"),
    //         clientId: sessionStorage.getItem("clientId"),
    //         skuCode: this.sku,
    //         cutInvoice: this.asnbyid[0].InvoiceNO,
    //       };
    //       axiosClient
    //         .get("/search-SKU", { params: params })
    //         .then((response) => {
    //           this.skutable = true;
    //           this.skuCode = this.sku;

    //           if (response.data.error != "error") {
    //             this.skuData = response.data.sku;
    //             if (this.hhtDevice == true && response.data.total == 1) {
    //               if (
    //                 parseInt(response.data.sku[0].ScanQty) <
    //                 parseInt(response.data.sku[0].ASNQTY)
    //               ) {
    //                 this.insertupdateSkuSingleQty(
    //                   this.searchAsnVal[0].InvoiceNO,
    //                   this.searchAsnVal[0].ASN_NO,
    //                   this.lpn_box,
    //                   this.skuData[0].batchno,
    //                   this.skuData[0].SKU
    //                 );
    //                 // this.$swal('Recored Inserted Successfully');
    //                 this.isChecked = false;
    //                 this.isVisible = false;
    //                 this.skuData = response.data.scanQtyTotalvalues;
    //                 this.globalScanQty =
    //                   response.data.scanQtyTotalvalues[0].scanqty;
    //                 this.sku = "";
    //               } else {
    //                 this.$swal("Scan Qty should less then Asn Qty", "error");
    //               }
    //             }
    //             this.sku = "";
    //             this.$refs.skuinput.focus();
    //           } else {
    //             this.$swal({
    //               icon: "error",
    //               title: "Oops...",
    //               text: " SKU not foound!",
    //             });
    //             this.sku = "";
    //             this.skutable = false;
    //           }
    //         })
    //         .catch((err) => {
    //           // this.skuerrors = err.response.data.error;
    //         });
    //     }
    //     //alert($event.target.value);
    //     // this.$swal('Data Can not Read', 'error');
    //     return false;
    //   } else {
    //   }
    // },

    // async updateSku() {
    //   this.isChecked = false;
    //   this.isVisible = false;
    //   let check = "";
    //   this.condition = true;
    //   for (var key of Object.keys(this.values)) {
    //     //  console.log(key + " -> " + this.values[key]);
    //     if (this.values[key] != "") {
    //       this.skuTemp = this.values[key];
    //     }
    //   }
    //   for (var key of Object.keys(this.skuBatch)) {
    //     // console.log(key + " -> " + this.skuBatch[key]);
    //     if (this.skuBatch[key] != "") {
    //       this.batchValCondtion = this.skuBatch[key];
    //     }
    //   }

    //   if (this.batchValCondtion != "") {
    //     var params = {
    //       warehouseId: sessionStorage.getItem("WarehouseId"),
    //       clientId: sessionStorage.getItem("clientId"),
    //       enteryBy: sessionStorage.getItem("UserId"),
    //       invoice: this.asnbyid[0].InvoiceNO,
    //       asn: this.asnbyid[0].ASN_NO,
    //       wLocation: this.lpn_box,
    //       skuBatch: this.SBVAl,
    //       skuqtyval: this.skuTemp,
    //       skuNumber: this.skuData[0].SKU,
    //     };
    //   } else {
    //     var params = {
    //       warehouseId: sessionStorage.getItem("WarehouseId"),
    //       clientId: sessionStorage.getItem("clientId"),
    //       enteryBy: sessionStorage.getItem("UserId"),
    //       invoice: this.asnbyid[0].InvoiceNO,
    //       asn: this.asnbyid[0].ASN_NO,
    //       wLocation: this.lpn_box,
    //       skuBatch: this.skuData[0].batchno,
    //       skuqtyval: this.skuTemp,
    //       skuNumber: this.skuData[0].SKU,
    //     };
    //     // console.log("batchvalconditon  empty", params);
    //   }
    //   await axiosClient
    //     .get("/sku-insert-update-values", { params: params })
    //     .then((response) => {
    //       // this.sku.focus();
    //       this.$swal("Recored Inserted Successfully");
    //       this.values[key] = "";
    //       this.skutable = false;
    //       if (response.data.error == "greaterQty") {
    //         this.$swal("Update qty is greater than ASN qty");
    //         this.values[key] = "";
    //         this.isChecked = false;
    //         this.isVisible = false;
    //         this.skutable = false;
    //       }
    //       this.globalScanQty = response.data.scanQtyTotalvalues[0].scanqty;
    //       if (response.data.success == 1) {
    //         this.$swal("Recored Inserted Successfully");
    //         // this.skuData='';
    //         this.skutable = false;
    //         this.sku = "";
    //         this.isChecked = false;

    //         this.isVisible = false;
    //         $("#skuid").focus();
    //         this.searchSKU();
    //       }
    //       if (response.data == 0) {
    //         // alert('Recored Not Inserted Successfully');
    //         this.$swal("Recored Not Inserted");
    //         ///this.skuData='';
    //         this.skutable = false;
    //         this.sku = "";
    //         this.sku.focus();
    //       }
    //       if (response.data.success == 3) {
    //         //alert('Recored Updated Successfully');
    //         this.$swal("Recored Updated Successfully");
    //         this.skutable = false;
    //         this.sku = "";
    //         this.isChecked = false;
    //         this.isVisible = false;
    //         this.$refs["skuinputvalues"].focus();
    //       }
    //       if (response.data == 4) {
    //         // alert('Recored Not Updated Successfully');
    //         this.$swal("Recored Not Updated");
    //         //  this.skuData='';
    //         this.skutable = false;
    //         this.sku = "";
    //         this.sku.focus();
    //       }
    //     })
    //     .catch((err) => {
    //       // this.errors = err.response.data.error;
    //     });
    // },

    // insertupdateSkuSingleQty(InvoiceNO, asnNo, lpn_box, skubatchval, skuno) {
    //   var params = {
    //     warehouseId: sessionStorage.getItem("WarehouseId"),
    //     clientId: sessionStorage.getItem("clientId"),
    //     enteryBy: sessionStorage.getItem("UserId"),
    //     invoice: InvoiceNO,
    //     asn: asnNo,
    //     wLocation: lpn_box,
    //     skuBatch: skubatchval,
    //     skuqtyval: 1,
    //     skuNumber: skuno,
    //   };
    //   axiosClient
    //     .get("/sku-insert-update-values", { params: params })
    //     .then((response) => {
    //       this.skuData = response.data.sku;

    //       //   this.gridskuscanqty = response.data.sku[0].ScanQty;
    //       //   this.globalScanQty = response.data.sku[0].ScanQty;

    //       this.sku.focus();
    //       if (response.data == 1) {
    //         // alert('Recored Inserted Successfully');
    //         this.$swal("Recored Inserted Successfully");
    //         // this.skuData='';
    //         // this.skutable=false;
    //         // this.sku='';
    //         return response.data;
    //       }
    //       if (response.data == 0) {
    //         //  alert('Recored Not Inserted Successfully');
    //         this.$swal("Recored Not Inserted");
    //         // this.skuData='';
    //         // this.skutable=false;
    //         // this.sku='';
    //       }
    //       if (response.data == 3) {
    //         //alert('Recored Updated Successfully');
    //         this.$swal("Recored Updated Successfully");
    //         // this.skuData='';
    //         // this.skutable=false;
    //         // this.sku='';
    //         return response.data;
    //       }
    //       if (response.data == 4) {
    //         //alert('Recored Not Updated Successfully');
    //         this.$swal("Recored Not Updated");
    //         // this.skuData='';
    //         // this.skutable=false;
    //         // this.sku='';
    //       }
    //     })
    //     .catch((err) => {
    //       //this.errors = err.response.data.error;
    //     });
    // },
    // async radiobuttonclick(sku, asnQty, scanQty, batch) {
    //   this.ASNQty = asnQty;
    //   this.skuNo = sku;
    //   this.scanQty = scanQty;
    //   this.SBVAl = batch;
    //   this.buttonshow = true;
    //   this.isVisible = true;
    //   for (var key of Object.keys(this.values)) {
    //     this.values[key] = "";
    //   }
    // },
  },
};
</script>
