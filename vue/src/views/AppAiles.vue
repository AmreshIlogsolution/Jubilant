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
    <div>
      <div class="p-2 h-auto sm:rounded-md">
        <div class="flex items-center py-2 px-3 rounded-lg bg-cyan-400">
          <input
            type="text"
            v-model="searchRack"
            v-if="!hht"
            autocomplete="given-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
            placeholder="Search Rack *"
            @keyup.enter="findrack()"
            autofocus
            ref="rackRef"
          />
          <input
            type="text"
            v-model="searchRack"
            v-else
            autocomplete="given-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
            placeholder="Search Rack *"
            @keyup="findrack()"
            autofocus
            ref="rackRef"
          />

          <button
            v-if="!hht"
            type="submit"
            class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mr-3"
            @click="findrack()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="px-3">
      <div
        class="container mx-auto rounded overflow-hidden shadow-xl divide-y mb-2 border border-blue-300 divide-blue-200"
        v-for="ailes in ailesList"
        :key="ailes.ZONE"
      >
        <div class="grid grid-cols-2 gap-1 p-1">
          <div class="text-sm text-blue-400 text-left">Aisle:</div>
          <div class="text-sm text-left">{{ ailes.Aisles }}</div>
        </div>
        <div class="grid grid-cols-4 gap-6 p-2">
          <div class="text-sm text-blue-400 text-left">Total Qty:</div>
          <div class="text-sm text-left">{{ ailes.TotalQty }}</div>

          <div class="text-sm text-blue-400 text-left">Total Picked:</div>
          <div class="text-sm text-left">{{ ailes.TotalScanned }}</div>
        </div>
      </div>
    </div>

    <!-- Ailes div end -->
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
      hht: true,
      zoneSearch: "",
      zoneList: "",
      pickList: [],
      ailesList: [],
      searchRack: "",
    };
  },
  methods: {
    isOpenk(skuModelNo, skudesc, batchno) {
      this.skuMNoMOd = skuModelNo;
      this.skuDescMod = skudesc;
      this.batchnoMod = batchno;
      this.isOpen = true;
    },
    backToRack() {
      this.zoneDiv = false;
      this.ailesDiv = false;
      this.rackDiv = true;
      this.rackLocationDiv = false;
    },
    backToAiels() {
      this.zoneDiv = false;
      this.ailesDiv = true;
      this.rackDiv = false;
      this.rackLocationDiv = false;
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
              text: "Zone not found!",
            });
            this.$router.go(-1);
          }
          this.loaderurl = true;
          this.zoneDiv = false;
          this.ailesDiv = true;
          this.zoneVal = this.zone;

          this.ailesList = response.data;
          this.loaderurl = false;
        })
        .catch((err) => {});
    },

    // Rack List Data
    async findrack() {
      // var params = {
      //   warehouseId: sessionStorage.getItem("WarehouseId"),
      //   clientId: sessionStorage.getItem("clientId"),
      //   refNo: this.$route.params.inv,
      //   zone: this.zoneSearch,
      //   zoneBarCode: this.zoneList[0].ZONEBARCODE,
      //   ailes: this.ailesList[0].Aisles,
      //   rack: this.searchRack,
      // };

      var dnno = this.$route.params.dnno;
      var inv = this.$route.params.inv;
      var totalqty = this.$route.params.tq;
      var totalScan = this.$route.params.ts;
      var warehouseId = sessionStorage.getItem("WarehouseId");
      var clientId = sessionStorage.getItem("clientId");
      var zone = this.$route.params.zone;
      var rack = this.searchRack; 

      this.$router.push({
        name: "AppRack",
        params: {
          dnno: dnno,
          inv: inv,
          tq: totalqty,
          ts: totalScan,
          zone: zone,
          rack: rack,
          warehouseId: warehouseId,
          clientId: clientId,
        },
      });
    },
    // Rack list Data
  },
  mounted() {
    this.boxPickListData();
    this.findailes();
  },
  created() {
   
  },
};
</script>
