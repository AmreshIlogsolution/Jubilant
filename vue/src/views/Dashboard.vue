<template>
  <div>
    <!-- <transition name="fade">
      <div v-if="isModalVisible && warehose_id != '' ">
        <div
          @click="onToggle"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
          class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
             
              <h2 class="text-2xl font-bold py-4">Select a Warehouse Location</h2>
              <p class="text-md text-gray-500 px-8">
                <select id="warehouse_id" v-model="warehouse_id"  @change="onToggle()" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm">  
                  
                  <option v-for="warehouse in warehouse_id" :key="warehouse.id" v-bind:value="warehouse.id">{{warehouse.warehouseName}}</option>
                </select>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </transition>
   <transition name="fade">


       <div v-if="isModalVisible && client_id != ''">
        <div
          @click="onToggle"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
          class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
             
              <h2 class="text-2xl font-bold py-4">Select a Client </h2>
              <p class="text-md text-gray-500 px-8">
                <select id="client_id" v-model="client_id"  @change="onToggle()" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm">  
                  
                  <option v-for="client in client_id" :key="client.id" v-bind:value="client.id">{{client.clientName}}</option>
                </select>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </transition> -->

    <div
      class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 flex justify-around m-5"
    >
      <div
        class="flex justify-center items-center bg-gray-500 w-100 h-28 rounded transition ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 duration-300 cursor-pointer"
      >
        <router-link :to="{ path: 'inbound' }">
          <div class="grid grid-cols-2 font-semibold text-center text-white">
            <div style="margin-left: 30px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>

            <div style="margin-top: 15px; margin-left: 10px">Inbound</div>
          </div>
        </router-link>
      </div>

      <div
        class="flex justify-center items-center bg-gray-500 w-100 h-28 rounded transition ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 duration-300 cursor-pointer"
      >
        <router-link :to="{ path: 'outbound' }">
          <div class="grid grid-cols-2 font-semibold text-center text-white">
            <div style="margin-left: 35px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>

            <div style="margin-top: 15px; margin-left: 10px">Outbound</div>
          </div>
        </router-link>
      </div>
      <div
        class="flex justify-center items-center bg-gray-500 w-100 h-28 rounded transition ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 duration-300 cursor-pointer"
      >
        <router-link :to="{ name: 'Inventory' }">
          <div class="grid grid-cols-2 font-semibold text-center text-white">
            <div style="margin-left: 35px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                />
              </svg>
            </div>

            <div style="margin-top: 16px">INVENTORY</div>
          </div>
        </router-link>
      </div>
      <!-- <div class="flex justify-center items-center bg-gray-500 w-100 h-28 rounded transition ease-in-out delay-150 bg-gray-800 hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 duration-300 cursor-pointer" >
          <p class="font-semibold text-center text-white">
        <router-link :to="{name:'rfidOperation'}">   RFID Operation </router-link>  
          </p>
        </div>  -->
    </div>
    <div>
      <!-- <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      Open small modal
    </button> -->
      <div>
        <div
          v-if="showModal"
          class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
        >
          <div class="relative w-auto my-6 mx-auto max-w-sm w-96">
            <!--content-->
            <div
              class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              <!--header-->
              <div
                class="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t bg-cyan-500 text-white"
              >
                <h3 class="text-1xl font-semibold">
                  Select {{ loggedType == "admin" ? "Warehouse" : "Client" }}
                </h3>
              </div>
              <!--body-->
              <div
                class="relative p-2 flex-auto"
                v-if="isModalVisible && loggedType == 'admin'"
              >
                <div v-if="isLoading" class="flex items-center justify-center">
                  <div
                    class="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"
                  ></div>
                </div>
                <p class="my-2 text-slate-500 text-lg leading-relaxed">
                  <label for="w" class="float-left pl-3">Warehoue :</label>
                  <select
                    id="warehouse_id"
                    v-model="wSelect"
                    @change="findClient($event)"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm"
                  >
                    <option
                      v-for="warehouse in warehouse_id"
                      :key="warehouse.WHid"
                      :disabled="!warehouse.WHid"
                      v-bind:value="warehouse.WHid"
                    >
                      {{ warehouse.WHname }}
                    </option>
                  </select>
                </p>
                <p class="my-2 text-slate-500 text-lg leading-relaxed">
                  <label for="w" class="float-left pl-3">Client : </label>
                  <select
                    id="client_id"
                    v-model="cSelect"
                    @change="onToggle()"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm"
                  >
                    <option
                      v-for="client in client_id"
                      :key="client.Clientid"
                      v-bind:value="client.Clientid"
                    >
                      {{ client.ClientName }}
                    </option>
                  </select>
                </p>
                <!-- <p v-if="(client_id == '' && wSelect != '')" class="text-red-800"> Client not exit in  warehouse</p> -->
              </div>

              <div
                v-if="isModalVisible && loggedType == 'user'"
                class="relative p-2 flex-auto"
              >
                <p class="my-2 text-slate-500 text-lg leading-relaxed">
                  <label for="w" class="float-left pl-3">Client : </label>
                  <select
                    id="client_ids"
                    v-model="cSelects"
                    @change="onToggle()"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm foucs:ouline-none focus:ring-indigo-500 foucs:border-indigo-500 sm-text-sm"
                  >
                    <option
                      v-for="client in client_id"
                      :key="client.Clientid"
                      v-bind:value="client.Clientid"
                    >
                      {{ client.ClientName }}
                    </option>
                  </select>
                </p>
              </div>

              <!--footer-->
              <div
                class="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b bg-cyan-500"
              ></div>
            </div>
          </div>
        </div>
        <div
          v-if="showModal"
          class="opacity-50 fixed inset-0 z-40 bg-black"
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
import footer from "../components/footer.vue";
export default {
  // name: "small-modal",
  data() {
    return {
      isOpen: true,
      warehouse_id: "",
      client_id: "",
      client_ids: "",
      showModal: true,
      loggedType: "",
      wSelect: "",
      cSelect: "",
      cSelects: "",
      isLoading: false,
    };
  },
  computed: {
    isModalVisible() {
      this.isLoading = true;
      if (sessionStorage.getItem("UserType") === "admin") {
        this.getwarehouse();
        if (sessionStorage.getItem("WarehouseId") == null) {
          this.loggedType = "admin";
          return this.showModal;
        } else {
          this.showModal = false;
        }
      } else {
        this.findclientuserwise();
        if (sessionStorage.getItem("clientId") == null) {
          this.loggedType = "user";
          return this.showModal;
        } else {
          this.showModal = false;
        }
      }
    },
  },
  methods: {
    onToggle() {
      if (this.loggedType == "admin") {
        sessionStorage.setItem("WarehouseId", this.wSelect);
        sessionStorage.setItem("clientId", this.cSelect);

        this.showModal = !this.showModal;
      } else {
        sessionStorage.setItem("clientId", this.cSelects);

        this.showModal = !this.showModal;
      }
    },
    getwarehouse() {
      axiosClient
        .get("/get-warehouse-name")
        .then((response) => {
          this.warehouse_id = response.data;
          this.isLoading = false;
        })
        .catch();
    },

    findClient(event) {
      var wid = event.target.value;
      this.isLoading = true;
      // var params = {
      //   warehouseId: wid,
      //   Token: sessionStorage.getItem("TOKEN")
      // }

      axiosClient
        .get("get-client-name")
        .then((response) => {
          this.client_id = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },

    findclientuserwise() {
      var uid = sessionStorage.getItem("UserId");

      // var params = {
      //   userId: uid,
      // }
      axiosClient
        .get("get-client-name")
        .then((response) => {
          this.client_id = response.data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },
  },
};
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
