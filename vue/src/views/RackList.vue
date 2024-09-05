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
            v-if="!hht"
            v-model="rackLocs"
            autocomplete="given-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
            placeholder="Search Rack Location *"
            @keyup.enter="findRackLocation()"
          />

          <input
            type="text"
            v-else
            v-model="rackLocs"
            autocomplete="given-name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
            placeholder="Search Rack Location *"
            @keyup.prevent="findRackLocationHHT($event)"
          />

          <button
            v-if="!hht"
            type="submit"
            class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mr-3"
            @click="findRackLocation()"
          >
            Search
          </button>
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
      rackList: [],
      rackLoc: "",
    };
  },
  methods: {
    backToPickList() {
      this.$router.push("/pick-list");
    },
    async findrack() {
      var params = {
        //  warehouseId: sessionStorage.getItem("WarehouseId"),
        // clientId :sessionStorage.getItem("clientId"),
        //   refNo: this.$route.query.inv,
        //  ##  zoneBarCode:this.$route.query.zone,
        aisle: this.$route.query.aisle,
      };

      await axiosClient
        .get("/get-rack", { params: params })
        .then((response) => {
          this.rackList = response.data;
        })
        .catch((err) => {});
    },

    findSku() {
      var inv = this.$route.query.inv;
      var dnno = this.$route.query.dnno;
      var tq = this.$route.query.tq;
      var ts = this.$route.query.ts;
      var zone = this.$route.query.zone;
      var aisle = this.$route.query.aisle;
      var rackLoc = this.rackLoc;
      this.$router.replace({
        name: "sku-list",
        params: { id: "123" },
        query: {
          dnno: dnno,
          inv: inv,
          tq: tq,
          ts: ts,
          zone: zone,
          aisle: aisle,
          rackLoc: rackLoc,
        },
      });
    },
  },
  mounted() {
    this.findrack();
    this.$refs.rackloca.focus();
    this.hht = sessionStorage.getItem("HHT");
  },
  created() {
    this.hht = sessionStorage.getItem("HHT");
  },
};
</script>
