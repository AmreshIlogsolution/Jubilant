<template>
  <div>
    <div class="flex justify-between py-1 bg-blue-800">
      <h3 class="text-sm text-white pl-3">Pick List</h3>
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
          @click="enabledesiblehht()"
        />
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600 mr-3"
        ></div>
        <span class="pr-3 text-sm font-medium text-white">Use HHT Device</span>
      </label>
    </div>
    <div class="bg-white p-2 rounded mt-1 h-30">
      <div>
        <h5 class="p-1 bg-slate-200 text-left">
          Pick List
          <button
            class="float-right inline-block px-1 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            @click="backToPickList()"
          >
            Back To Pick List
          </button>
        </h5>
      </div>
    </div>

    <div
      class="container mx-auto rounded overflow-hidden shadow-xl divide-y divide-blue-200"
    >
      <div class="grid grid-cols-4 gap-6 p-2">
        <div class="text-sm text-blue-400 text-left">DN NO :</div>
        <div class="text-sm text-left">{{ pickList.dnno }}</div>

        <div class="text-sm text-blue-400 text-left">Invocie No :</div>
        <div class="text-sm text-left">{{ pickList.REF_NO }}</div>
      </div>
      <div class="grid grid-cols-4 gap-6 p-2">
        <div class="text-sm text-blue-400 text-left">Total Qty :</div>
        <div class="text-sm text-left">{{ pickList.InvQty }}</div>

        <div class="text-sm text-blue-400 text-left">Total Scan :</div>
        <div class="text-sm text-left">{{ pickList.PickQTy }}</div>
      </div>
    </div>

    <!-- Zone Div -->

    <!-- Sku list -->
    <div>
      <div class="p-2 h-auto sm:rounded-md">
        <div class="flex items-center py-2 px-3 rounded-lg bg-cyan-400">
          <input
            type="text"
            v-if="!hht"
            v-model="sku"
            autocomplete="given-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
            placeholder="Search SKU"
          />
          <input
            type="text"
            v-else
            v-model="sku"
            autocomplete="given-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
            placeholder="Search SKU"
            @keyup.prevent="findSkuHHTDevice($event)"
          />
          <button
            v-if="!hht"
            type="submit"
            class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mr-3"
            @click.prevent="findSkuHHT()"
          >
            Search
          </button>
        </div>
      </div>

      <div class="px-3">
        <div
          class="container mx-auto rounded overflow-hidden shadow-xl divide-y mb-2 border border-blue-300 divide-blue-200"
          v-for="sku in rackLocation"
          :key="sku.sku"
        >
          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">SKU:</div>
            <div
              class="text-sm text-left"
              @click="isOpenk(sku.sku, sku.skudesc, sku.batchno)"
            >
              {{ sku.sku }}
            </div>
          </div>
          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">Description:</div>
            <div class="text-sm text-left">{{ sku.skudesc }}</div>
          </div>
          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">Batch:</div>
            <div class="text-sm text-left">{{ sku.batchno }}</div>
          </div>
          <div class="grid grid-cols-4 gap-6 p-2 bg-gray-200">
            <div class="text-sm text-blue-400 text-left">Total Qty:</div>
            <div class="text-sm text-left">{{ sku.InvQty }}</div>

            <div class="text-sm text-blue-400 text-left">Total Picked:</div>
            <div class="text-sm text-left">{{ sku.PickQTy }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-2 justify-center">
      <div class="absolute left-0">
        <button
          type="button"
          class="inline-block px-4 py-2 ml-3 bg-purple-600 text-white text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out font-bold float-left"
          @click="backToAiels()"
        >
          Back to Aisle
        </button>
      </div>
      <div class="absolute right-3">
        <button
          type="button"
          class="mb-3 inline-block px-4 py-2 bg-green-500 text-white text-xs leading-tight uppercase rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out font-bold float-right"
          @click="backToRack()"
        >
          Back to Rack
        </button>
      </div>
    </div>
    <!-- End Rack Locaiton-->

    <!-- pagination Div -->

    <!-- <div class="flex flex-col items-center">
     
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
    
      <div class="inline-flex mt-2 xs:mb-3 mb-4">
        <button
          class="px-4 py-1 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="pageChange($event, currentPage - 1)"
          :disabled="btnDisabled"
        >
          Prev
        </button>
        <button
          class="px-4 py-1 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="pageChange($event, currentPage + 1)"
        >
          Next
        </button>
      </div>
      
    </div> -->
    <Pagination
      v-bind:paginationData="paginationData"
      @my-event="pageChange"
    ></Pagination>

    <!-- Pagination div end -->

    <!-- Ailes div end -->
    <!-- SKU Modal -->
    <div>
      <div
        v-show="isOpen"
        class="absolute inset-0 items-center justify-center bg-gray-700 bg-opacity-50 mt-20"
      >
        <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">Manual Update Qty</h3>
            <svg
              @click="isOpen = false"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-red-900 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="mt-4">
            <div class="p-2 bg-slate-200">
              <p class="text-sm text-left p-2">SKU : {{ skuMNoMOd }}</p>
              <p class="text-sm text-left p-2">
                Description : {{ skuDescMod }}
              </p>
              <p class="text-sm text-left p-2">Batch : {{ batchnoMod }}</p>
            </div>
            <div class="p-2 bg-slate-400">
              <p class="mb-2">
                <input
                  type="text"
                  v-model="skuQtyVal"
                  ref="skuQtyValll"
                  @keypress="onlyNumber"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Update Quantiy"
                />
              </p>
            </div>

            <div
              class="grid grid-cols-2 gap-2 mt-3 border border-slate-300 p-3"
            >
              <div>
                <input
                  type="radio"
                  name="skuRadioButton"
                  value="1"
                  v-model="skuRadioButton"
                />
                Add
              </div>
              <!-- ... -->
              <div>
                <input
                  type="radio"
                  name="skuRadioButton"
                  value="0"
                  v-model="skuRadioButton"
                />
                Remove
              </div>
            </div>

            <div class="mt-5">
              <button
                class="px-6 py-2 text-blue-100 bg-blue-600 rounded"
                @click.prevent="updateSkuQtyValue($event)"
              >
                Update
              </button>
              <button
                @click="isOpen = false"
                class="px-6 py-2 ml-2 text-blue-800 border border-blue-600 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- SKU Modal End -->
  </div>
</template>
<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Pagination from "../views/Pagination.vue";
export default {
  setup() {
    let isOpen = ref(false);
    return { isOpen };
  },
  components: {
    Pagination,
  },
  emits: ["my-event"],
  data() {
    return {
      hht: true,
      zoneSearch: "",
      zoneList: "",
      pickList: [],
      ailesList: [],
      rackLocs: "",
      rackLocation: [],
      rackList: [],
      dataKey: "",
      perPage: "",
      total: "",
      racklocvalues: "",
      sku: "",
      skuQtyVal: "",
      skuRadioButton: "",
      skuDescModal: "",
      skuBatchModal: "",
      skuMNoMOd: "",
      skuDescMod: "",
      batchnoMod: "",
      dataKey: "",
      paginationdiv: false,
      pagination: {
        data: { to: 1, from: 1 },
      },
      currentPage: 1,

      perPage: "",
      total: "",
      racklocvalues: "",
      paginationData: "",
      skuModel: "",
      rackLocationhht: [],
    };
  },
  methods: {
    backToAiels() {
      var inv = this.$route.params.inv;
      var dnno = this.$route.params.dnno;
      var rack = this.$route.params.rack;
      var zone = this.$route.params.zone;
      var tq = this.$route.params.tq;
      var ts = this.$route.params.ts;
      var location = this.$route.params.locationid;
      this.$router.push({
        name: "AppAiles",
        params: { dnno: dnno, inv: inv, tq: tq, ts: ts, zone: zone },
      });
      // ailes-lists/DN-JAIPUR-0000002/ABC%20TEST1/150/73/ETHNICITY
    },
    backToRack() {
      var inv = this.$route.params.inv;
      var dnno = this.$route.params.dnno;
      var rack = this.$route.params.rack;
      var zone = this.$route.params.zone;
      var tq = this.$route.params.tq;
      var ts = this.$route.params.ts;
      var location = this.$route.params.locationid;
      this.$router.push({
        name: "AppRack",
        params: {
          dnno: dnno,
          inv: inv,
          tq: tq,
          ts: ts,
          zone: zone,
          rack: rack,
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
        },
      });
      //dnno/:inv/:tq/:ts/:zone/:rack/:warehouseId/:clientId",
    },

    isOpenk(skuModelNo, skudesc, batchno) {
      this.skuMNoMOd = skuModelNo;
      this.skuDescMod = skudesc;
      this.batchnoMod = batchno;
      this.isOpen = true;
    },

    enabledesiblehht() {
      this.hht = !this.hht;
      sessionStorage.setItem("HHT", this.hht);
    },
    backToPickList() {
      this.$router.push({ path: "/pick-list" });
      // this.$router.replace({ name: "aisle-list", params: {id:"123"}, query: {rno:rno,tq:tq,ts:ts,zone:zone} })
    },
    async boxPickListData() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        refNo: this.$route.params.inv,
      };
      await axiosClient
        .get("/pending-pick-list-box", { params: params })
        .then((response) => {
          if (response.data.picklist.error == "noReocrd") {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Invalid Zone!",
            });
            return false;
          }
          this.loaderurl = true;

          this.pickList = response.data.picklist[0];

          this.zoneList = response.data.zone;
          this.loaderurl = false;
        })
        .catch((err) => {});
    },
    async findaileshht($event) {
      $event.preventDefault();
      if ($event.target.value) {
        if (this.zoneSearch == "") {
          this.$swal({
            icon: "info",
            title: "Oops...",
            text: "Zone is empty!",
          });
        } else {
          alert();
        }
      }
    },
    async findailes() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        REF_NO: this.$route.params.inv, //inv=Ref_No
        zone: this.$route.params.zone,
      };

      await axiosClient
        .get("/get-ailes", { params: params })
        .then((response) => {
          if (response.data.error == "noReocrd") {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Not Found  Zone!",
            });
            return false;
          }
          this.loaderurl = true;
          this.zoneDiv = false;
          this.ailesDiv = true;
          this.zoneVal = this.zone;
          console.log(response.data);
          this.ailesList = response.data;
          this.loaderurl = false;
        })
        .catch((err) => {});
    },

    // Rack List Data

    async findrack() {
      var params = {
        dnno: this.$route.params.dnno,
        refNo: this.$route.params.inv,
        tq: this.$route.params.tq,
        ts: this.$route.params.ts,
        zoneBarCode: this.$route.params.zone,
        ailes: this.$route.params.rack,
        warehouseId: this.$route.params.warehouseId,
        clientId: this.$route.params.clientId,
      };

      await axiosClient
        .get("/get-rack", { params: params })
        .then((response) => {
          if (response.data.error == "noReocrd") {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Record Not Found!",
            });
            this.$router.go(-1);
          } else {
            this.loaderurl = true;
            this.rackVal = this.rack;
            this.zoneDiv = false;
            this.ailesDiv = false;
            this.rackDiv = true;
            this.rackList = response.data;
            this.loaderurl = false;
          }
        })
        .catch((err) => {});
    },

    // Rack list Data

    // Find Rack Location
    async findRackLocation() {
      var params = {
        inv: this.$route.params.inv,
        dnno: this.$route.params.dnno,
        rack: this.$route.params.rack,
        zone: this.$route.params.zone,
        tq: this.$route.params.tq,
        ts: this.$route.params.ts,
        location: this.$route.params.locationid,
        warehouseId: sessionStorage.getItem("WarehouseId"),
        page: this.currentPage,
      };

      await axiosClient
        .get("/get-rack-location", { params: params })
        .then((response) => {
          console.log(response.data.cdata);
          if (response.data.data.data.length === 0) {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Record Not Found!",
            });
            this.$router.go(-1);
          } else {
            this.rackLocation = response.data.data.data;
            this.rackLocationhht = response.data.cdata;
            // console.log(response);
            this.paginationData = response;

            this.isOpen = false;
            this.racklocvalues = this.rackLoc;
            //  return this.isOpen;
          }
        })
        .catch((err) => {});
    },
    async updateSkuQtyValue(e) {
      e.preventDefault();
      if (this.skuQtyVal === "") {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Wrong enter SKU Quantity!",
        });
        return false;
      }
      if (this.skuRadioButton == "") {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Please Select Sku Add or Remove!",
        });
        return false;
      }

      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        userid: sessionStorage.getItem("UserType"),
        dnno: this.$route.params.dnno,
        sku: this.skuMNoMOd,
        batchNo: this.batchnoMod,
        wlocation: this.$route.params.locationid,
        qty: this.skuQtyVal,
        skuRadioButton: this.skuRadioButton,
        skuModel: "skuModel",
        page: this.currentPage,
      };

      await axiosClient
        .get("/update-sku-qty-value", { params: params })
        .then((response) => {
          if (response.data.error == "err") {
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Pick qty can't be greater than order qty! ",
            });
          } else {
            this.isOpen = false;
            this.$swal({
              position: "top-end",
              icon: "success",
              title: "SKU quantity update successfuly!",
              showConfirmButton: false,
              timer: 1000,
            });

            this.rackLocation = response.data.data;

            // this.paginationData = response;

            // console.log(response.data);
            this.findRackLocation();
          }
        })
        .catch((err) => {});
    },

    pageChange(pageNumber) {
      this.currentPage = pageNumber;
      this.findRackLocation();
    },

    // Sku scan using HHT Device Function
    async findSkuHHT(event) {
      var key = this.dataKey;

      var mySku = "";
      var myBatchNo = "";
      if (this.sku == "") {
        this.$swal({
          icon: "info",
          title: "Oops...",
          text: "wrong SKU",
        });
      } else {
        for (let k = 0; k < this.rackLocation.length; k++) {
          if (this.sku == this.rackLocation[k].sku) {
            mySku = this.rackLocation[k].sku;
            myBatchNo = this.rackLocation[k].batchno;
          }
        }

        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          userid: sessionStorage.getItem("UserType"),
          dnno: this.$route.params.dnno,
          sku: mySku,
          // batchNo not found//
          batchNo: myBatchNo,
          wlocation: this.$route.params.locationid,
          qty: 1,
          page: this.currentPage,
        };

        await axiosClient
          .get("/update-sku-qty-value", { params: params })
          .then((response) => {
            console.log(response.data.error);

            if (response.data.error == "err") {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Picking Data Retail Record could not be updated due to negative quantity Or quantity is greater!",
              });
            } else if (response.data.error == "NoRecordFound") {
              this.$swal({
                icon: "error",
                title: "Oops...",
                text: " No Record Found!",
              });
              this.sku = "";
            } else {
              this.isOpen = false;
              // this.findSku();
              this.sku = "";
              this.zoneDiv = false;
              this.ailesDiv = false;
              this.rackDiv = false;
              this.rackLocationDiv = true;
              this.rackLocation = response.data.data;
              this.paginationData = response;
              this.$swal({
                position: "top-end",
                icon: "success",
                title: "SKU quantity update successfuly!",
                showConfirmButton: false,
                timer: 2000,
              });
              this.findRackLocation();
            }
          })
          .catch((err) => {});
      }
    },
    // HHT DEVICE //
    async findSkuHHTDevice($event) {
      if (event.keyCode === 17) {
        return false;
      }
      var batchNo = "";
      $event.preventDefault();
      if ($event.target.value) {
        if (this.sku == "") {
          this.$swal({
            icon: "info",
            title: "Data ...",
            text: "Input value is empty",
          });
        } else {
          var key = this.dataKey;
          console.log(this.dataKey);
          let z = 0;
          //  console.log(this.rackLocationhht.length);
          for (z; z < this.rackLocationhht.length; z++) {
            if (this.sku == this.rackLocationhht[z].sku) {
              this.sku = this.rackLocationhht[z].sku;
              batchNo = this.rackLocationhht[z].batchno;
            }
          }

          var params = {
            warehouseId: sessionStorage.getItem("WarehouseId"),
            clientId: sessionStorage.getItem("clientId"),
            userid: sessionStorage.getItem("UserType"),

            dnno: this.$route.params.dnno,
            sku: this.sku,
            // batchNo not found//
            batchNo: batchNo,
            wlocation: this.$route.params.locationid,
            qty: 1,
            page: this.currentPage,
          };

          await axiosClient
            .get("/update-sku-qty-value-hht", { params: params })
            .then((response) => {
              if (response.data.error == "err") {
                this.$swal({
                  icon: "error",
                  title: "Oops...",
                  text: "Picking Data Retail Record could not be updated due to negative quantity Or quantity is greater!",
                });
              } else if (response.data.error == "notFound") {
                this.$swal({
                  icon: "error",
                  title: "Oops...",
                  text: " No Record Found!",
                });
                this.sku = "";
              } else {
                this.isOpen = false;
                // this.findSku();
                this.sku = "";
                // console.log("amresh", response.data.datarow[0].PickQTy);
                // console.log("amresh", response.data.rackData, "IA188B");
                this.findRackLocation();
                // this.rackLocation = response.data.datarow;
                // this.paginationData = response.data.data.rackData.data;
                this.sku = "";
                this.$swal({
                  position: "top-end",
                  icon: "success",
                  title: "SKU quantity update successfuly!",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            })
            .catch((err) => {});
        }
      }
    },
  },
  mounted() {
    this.boxPickListData();
    this.findRackLocation();
  },
  created() {},
};
</script>
