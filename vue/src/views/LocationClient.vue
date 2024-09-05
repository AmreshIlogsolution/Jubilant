<template>
  <div class="overflow-x-hidden justify-center items-center flex px-2">
    <div class="relative w-auto my-2 mx-auto max-w-sm w-96">
      <!--content-->
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
      >
        <!--header-->
        <div
          class="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t bg-gray-500 text-white"
        >
          <h3 class="text-1xl font-semibold">Select Location / Client</h3>
        </div>
        <!--body-->
        <div class="relative p-2 flex-auto">
          <p class="text-slate-500 text-xm">
            <label for="w" class="float-left pl-3">Warehoue :</label>
            <select
              id="warehouse_id"
              v-model="wSelected"
              @change="findClient($event)"
              class="text-sm mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm"
            >
              <option
                v-for="warehouse in warehouse_id"
                :key="warehouse.WHid"
                v-bind:value="warehouse.WHid"
                selected
              >
                {{ warehouse.WHname }}
              </option>
            </select>
          </p>
          <p class="text-slate-500 leading-relaxed">
            <label for="w" class="float-left pl-3">Client : </label>
            <select
              id="client_id"
              v-model="cSelected"
              @change="setClientWarehouse()"
              required
              class="text-sm mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm"
            >
              <option
                v-for="client in client_id"
                :key="client.Clientid"
                v-bind:value="client.Clientid"
                selected
              >
                {{ client.ClientName }}
              </option>
            </select>
          </p>
        </div>
        <!--footer-->
        <div
          class="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b bg-gray-500"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";
export default {
  data() {
    return {
      warehouse_id: {},
      client_id: "",
      loggedType: "",
      wSelected: "",
      cSelected: "",
    };
  },
  computed: {},
  created() {
    this.getwarehouse();
    this.findSelectedClient();
  },
  methods: {
    getwarehouse() {
      axiosClient
        .get("/get-warehouse-name")
        .then((response) => {
          this.warehouse_id = response.data;
          this.wSelected = sessionStorage.getItem("WarehouseId");
        })
        .catch();
    },
    findClient(event) {
      // var wid = event.target.value;
      // var params = {
      //   warehouseId: wid,
      //   Token: sessionStorage.getItem("TOKEN")
      // }

      axiosClient
        .get("get-client-name")
        .then((response) => {
          this.client_id = response.data;
          sessionStorage.setItem("WarehouseId", this.wSelected);
          sessionStorage.setItem("clientId", this.cSelected);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },

    findSelectedClient() {
      var wid = sessionStorage.getItem("WarehouseId");
      var params = {
        warehouseId: wid,
        Token: sessionStorage.getItem("TOKEN"),
      };

      axiosClient
        .get("get-client-name")
        .then((response) => {
          this.client_id = response.data;
          this.cSelected = sessionStorage.getItem("clientId");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },
    setClientWarehouse() {
      sessionStorage.setItem("WarehouseId", this.wSelected);
      sessionStorage.setItem("clientId", this.cSelected);
    },
  },
};
</script>

<style scoped></style>
