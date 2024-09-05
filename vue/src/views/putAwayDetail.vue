<template>
  <div>
    <div class="flex justify-between py-1 bg-gray-500">
      <h3 class="text-sm text-white pl-3">PUT AWAY</h3>
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
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600 mr-3"
        ></div>
        <span class="pr-3 text-sm font-medium text-white">Use HHT Device</span>
      </label>
    </div>
    <div class="bg-white p-2 rounded mt-1 h-30">
      <div v-if="putaways">
        <div
          class="container mx-auto rounded overflow-hidden divide-y divide-blue-200"
          v-for="putaway in putaways"
          :key="putaway.MRNNo"
        >
          <h5 class="p-1 bg-slate-200 text-left">
            {{ putaway.MRNNo }}
            <span class="float-right"
              ><router-link :to="'/put-away/'"> Back </router-link>
            </span>
          </h5>

          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">Invoice No:</div>
            <div class="text-sm text-left">{{ putaway.Invoice }}</div>
          </div>
          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">Party Name:</div>
            <div class="text-sm text-left">{{ putaway.PartyName }}</div>
          </div>

          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">Bin :</div>
            <div class="text-sm text-left">{{ bin }}</div>
          </div>
          <div class="grid grid-cols-2 gap-1 p-1">
            <div class="text-sm text-blue-400 text-left">SKU :</div>
            <div class="text-sm text-left">{{ sku }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!binVal" class="bg-white p-1 pl-2 rounded mt-1 h-15">
      <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-1 setupgap-3">
        <div class="col-span-2">
          <label
            for="search-asn"
            class="block text-sm font-medium text-red-700 float-left ml-2 mb-1"
          >
          </label>
          <input
            type="text"
            v-if="!hht"
            name="bin"
            ref="bin"
            v-model="bin"
            @keyup.enter="searchBin()"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search Bin"
          />

          <input
            type="text"
            v-else
            name="bin"
            ref="bin"
            v-model="bin"
            @keyup.prevent="searchBinHHT($event)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search Bin"
          />

          <!-- <input   v-if="!hht" type="text" name="bin" ref="bin"  v-model="bin" @keyup="searchBin()" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Search Bin">  -->
        </div>
        <div>
          <button
            v-if="!hht"
            class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-1 rounded outline outline-offset-2 outline-slate-500 mt-2 float-left ml-4 flex"
            @click.prevent="searchBin()"
          >
            Search
          </button>
        </div>
      </div>
      <div v-if="errors">
        <span
          class="flex items-center justify-between py-1 px-2 bg-red-500 text-white rounded mt-2"
        >
          {{ errors }}
        </span>
      </div>
    </div>

    <div class="bg-white p-1 pl-2 rounded h-20" v-if="binVal > 0">
      <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-3">
        <div class="col-span-2">
          <label
            for="search-asn"
            class="block text-sm font-medium text-red-700 float-left ml-2 mb-1"
          >
          </label>

          <input
            type="text"
            v-if="!hht"
            id="sku"
            ref="sku"
            v-model="sku"
            @keyup.enter="searchsku()"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search SKU"
            autofocus
          />

          <input
            type="text"
            v-else
            id="sku"
            ref="sku"
            v-model="skuhht"
            @keyup.prevent="searchskuHHT($event)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search SKU"
            autofocus
          />
        </div>
        <div>
          <button
            v-if="!hht"
            class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-1 rounded outline outline-offset-2 outline-slate-500 mt-3 float-left ml-4 flex"
            @click.prevent="searchsku()"
          >
            Search
          </button>
        </div>
      </div>
      <div v-if="skuerrors">
        <span
          class="flex items-center justify-between py-1 px-2 bg-red-500 text-white rounded mt-2"
        >
          {{ skuerrors }}
        </span>
      </div>
    </div>
    <div class="flex flex-col" v-if="skutable">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="border-b bg-slate-400">
                <tr>
                  <!-- <th scope="col" class="text-sm font-medium text-white px-1 py-1 text-left w-1/7">#</th> -->
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-1 py-1 text-center"
                  >
                    <small>SkU / Batch</small>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-1 py-1 text-left"
                  >
                    <small>Qty</small>
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-white px-1 py-1 text-left"
                  >
                    <small>SLOC</small>
                  </th>
                  <!-- <th scope="col" class="text-sm font-medium text-white px-1 py-1 text-left w-1/9"><small>Update</small></th> -->
                  <!-- <th ></th> -->
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b"
                  v-for="(skuarray, i) in skuarrays"
                  :key="`skuInput.${i}`"
                >
                  <!-- <td class="px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                        <input type="radio" name="skuBatch"  :value="skuarray.batchno" 
                                        v-model="skuBatch['dynamic-field-'+i]" @change="radiobuttonclick(skuarray.sku,skuarray.qty,skuarray.batchno,skuarray.scanqty,skuarray.SEGTYPE)"  >
                                    
                                    </td> -->
                  <td
                    class="text-sm text-gray-900 font-light px-1 py-1 whitespace-nowrap text-center"
                  >
                    <div
                      class="col-span-2 font-bold"
                      @click="
                        isOpenk(
                          skuarray.sku,
                          skuarray.batchno,
                          skuarray.qty,
                          skuarray.scanqty,
                          skuarray.SEGTYPE
                        )
                      "
                    >
                      <small class="text-sky-400 hover:text-red-500:">
                        {{ skuarray.sku }} <br />
                        {{ skuarray.batchno }}</small
                      >
                    </div>
                  </td>

                  <td
                    class="text-sm text-gray-900 font-light px-1 py-1 whitespace-nowrap text-left"
                  >
                    <small>
                      {{ skuarray.qty }}( {{ skuarray.scanqty }} )
                    </small>
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-1 py-1 whitespace-nowrap text-left"
                  >
                    <small> {{ skuarray.SEGTYPE }} </small>
                  </td>

                  <!-- <td class="text-sm text-gray-900 font-light px-1 py-1 whitespace-nowrap"> -->

                  <!-- <input type="number"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-24 h-6"   > -->

                  <!-- <input type="number" v-model="values['dynamic-field-'+i]" :id="'skuInputUpdateVal'+i" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm  h-6" :max="skuarray.qty" v-if=" skuarray.qty != skuarray.scanqty"   style="width:80px" >
                                    </td>  -->
                  <!-- <td >
                                        <div  class="mt-3 float-right mr-5" v-if=" skuarray.qty != skuarray.scanqty">
                                        <button class="py-1 px-1 bg-green-400 hover:bg-green-700 text-white rounded outline outline-offset-2"  @click="updateSku()">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        </button>
                                    </div>
                                    </td> -->
                </tr>
              </tbody>
            </table>
            <div class="flex mb-4">
              <button
                @click="backtobin()"
                class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-1 rounded outline outline-offset-2 outline-slate-500 mt-3 float-left ml-4 flex"
              >
                Back To Bin
              </button>
              <button
                @click="backtosku()"
                class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-1 rounded outline outline-offset-2 outline-slate-500 mt-3 float-left ml-4 flex"
              >
                Back To Sku
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <p class="text-sm text-left p-2">
              SKU : {{ skuVal }} / {{ skuBatchVal }}
            </p>
            <p class="text-sm text-left p-2">Batch : {{ skuBatchVal }}</p>
            <p class="text-sm text-left p-2">
              Qty : {{ skuQty }} ( {{ skuScanedVal }})
            </p>
            <p class="text-sm text-left p-2">SLOC : {{ sloc }}</p>
          </div>
          <div class="p-2 bg-slate-400">
            <p class="mb-2">
              <input
                type="number"
                v-model="putawaySkuVal"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Update Quantiy"
              />
            </p>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-3 border border-slate-300 p-3">
            <div>
              <input
                type="radio"
                name="skuRadioButton"
                value="1"
                @click="addRemove()"
                v-model="skuRadioButton"
              />
              Add
            </div>
            <!-- ... -->
            <div v-if="skuScanedVal != 0">
              <input
                type="radio"
                name="skuRadioButton"
                value="0"
                @click="addRemove()"
                v-model="skuRadioButton"
              />
              Remove
            </div>
          </div>

          <div class="mt-5">
            <button
              class="px-6 py-2 text-blue-100 bg-blue-600 rounded"
              @click.prevent="updateSku()"
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
</template>
<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";
import { ref } from "vue";
import $ from "jquery";
export default {
  setup() {
    let isOpen = ref(false);
    return { isOpen };
  },
  data() {
    return {
      hht: true,
      searchMrnInvoice: "",
      putaways: {},
      bin: "",
      errors: null,
      skuerrors: null,
      binVal: "",
      sku: "",
      skutable: false,
      skuarrays: {},
      skuBatch: {},

      // set Table grid value
      values: {},
      skuVal: "",
      skuBatchVal: "",
      skuQty: "",
      sloc: "",

      skuScanedVal: "",
      skuInputValue: "",
      // table grrid value
      skuqtyerror: "",
      skuRadioButton: "",
      putawaySkuVal: "",
      skuhht: "",
    };
  },
  methods: {
    addRemove() {
      this.skuRadioButton = this.skuRadioButton;
    },
    isOpenk(sku, batchnos, qty, scanqty, SEGTYPE) {
      this.skuVal = sku;
      this.skuBatchVal = batchnos;
      this.skuQty = qty;
      this.sloc = SEGTYPE;
      this.skuScanedVal = scanqty;
      this.isOpen = true;
    },
    async findMrnInvoiceWithId() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        mrnInvoice: this.$route.params.id,
      };

      await axiosClient
        .get("/search-Mrn-Invoice-withid", { params: params })
        .then((response) => {
          this.putaways = response.data;
        })
        .catch((err) => {});
    },

    async searchBinHHT($event) {
      $event.preventDefault();
      if ($event.target.value) {
        if (this.bin == "") {
        } else {
          var params = {
            warehouseId: sessionStorage.getItem("WarehouseId"),
            clientId: sessionStorage.getItem("clientId"),
            bin: this.bin,
          };

          await axiosClient
            .get("/search-bin", { params: params })
            .then((response) => {
              //console.log(response.data.error);

              if (response.data.error == "notFounds") {
                this.$swal({
                  icon: "error",
                  text: "RACK NOT BELONGS TO WAREHOUSE AND CLIENT.",
                });
                this.bin = "";
                return false;
              } else {
                this.binVal = response.data;
                this.errors = "";
                $("#sku").focus();
              }
            })
            .catch((err) => {});
        }
      }
    },

    async searchBin() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        bin: this.bin,
      };

      await axiosClient
        .get("/search-bin", { params: params })
        .then((response) => {
          //console.log(response.data.error);

          if (response.data.error == "notFounds") {
            this.$swal({
              icon: "error",
              text: "RACK NOT BELONGS TO WAREHOUSE AND CLIENT.",
            });
            return false;
          } else {
            this.binVal = response.data;
            this.errors = "";
            $("#sku").focus();
          }
        })
        .catch((err) => {
          //this.errors = err.response.data.error;
          // this.$swal({
          //     icon: 'error',
          //     text: err.response.data.error,
          // });
        });
    },

    async searchsku() {
      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        sku: this.sku,
        mrnNo: this.putaways[0].MRNNo,
      };

      await axiosClient
        .get("/search-bin-sku", { params: params })
        .then((response) => {
          this.skuarrays = response.data;
          this.skuerrors = "";
          this.skutable = true;

          if (response.data.error != "") {
            this.$swal({
              icon: "error",
              text: err.response.data.error,
            });
          }
          this.sku = "";
        })
        .catch((err) => {
          // this.skutable=false;
          //this.skuerrors = err.response.data.error;
          //   this.$swal({
          //     icon: 'error',
          //     text: err.response.data.error,
          // });
          //   this.$swal({
          //         icon: 'error',
          //         text: err.response.data.error,
          //     });
        });
    },

    async searchskuHHT($event) {
      $event.preventDefault();

      if (this.skuhht != "") {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          sku: this.skuhht,
          mrnNo: this.putaways[0].MRNNo,
        };

        await axiosClient
          .get("/search-bin-sku", { params: params })
          .then((response) => {
            this.skuarrays = response.data;
            this.skuerrors = "";
            this.skutable = true;

            if (response.data.error != "") {
              this.$swal({
                icon: "error",
                text: err.response.data.error,
              });
            }
            this.skuhht = "";
          })
          .catch((err) => {});
      }
    },

    radiobuttonclick(sku, qty, batch, sloc, scanqty) {
      this.skuVal = sku;
      this.skuBatchVal = batch;
      this.skuQty = qty;
      this.sloc = sloc;
      this.skuScanedVal = scanqty;
      for (var key of Object.keys(this.skuBatch)) {
        console.log(key + " -> " + this.skuBatch[key]);
      }
    },

    async updateSku() {
      // alert(parseInt(this.skuScanedVal)+parseInt(this.putawaySkuVal));
      var total = parseInt(this.skuScanedVal) + parseInt(this.putawaySkuVal);
      //alert(this.skuQty + '' + this.putawaySkuVal);
      if (this.skuQty > this.putawaySkuVal && total < this.skuScanedVal) {
        this.$swal({
          icon: "error",
          text: "Input qty is greater then SKU qty sdsd!",
        });
        return false;
      }

      if (this.putawaySkuVal == "") {
        this.$swal({
          icon: "error",
          text: "Invalid update qty !",
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
      if (this.putawaySkuVal > total) {
        this.$swal({
          icon: "error",
          text: "Input value is greater then Sku Qty !",
        });
        return false;
      }

      var params = {
        warehouseId: sessionStorage.getItem("WarehouseId"),
        clientId: sessionStorage.getItem("clientId"),
        ENTRYBY: sessionStorage.getItem("UserType"),
        sku: this.skuVal,
        batchVal: this.skuBatchVal,
        sloc: this.sloc,
        skuinputvalue: this.putawaySkuVal,
        invoice: this.putaways[0].Invoice,
        skuQty: this.skuQty,
        location: this.bin,
        mrnNo: this.putaways[0].MRNNo,
        skuRadio: this.skuRadioButton,
      };

      await axiosClient
        .get("/update-sku-put-away", { params: params })
        .then((response) => {
          //alert(response.data.success);
          //console.log(response.data.error)
          if (response.data.error == "err") {
            this.$swal({
              icon: "error",
              text: "Sku Qty greater then Scan Qty",
            });
            return false;
          }

          if (response.data.success == 1) {
            this.$swal({
              icon: "success",
              text: "SKU value inserted successfuly!",
            });
          }
          if (response.data.success == 2) {
            this.$swal({
              icon: "success",
              text: "SKU value remove successfuly!",
            });
          }
          if (response.data.success == 3) {
            this.$swal({
              icon: "error",
              text: "Less Quantity!",
            });
          }

          this.skuarrays = response.data.putawaydata;
          this.putawaySkuVal = "";
          this.isOpen = false;
        })
        .catch((err) => {
          // alert(err.response.data.error);
          // this.skuqtyerror = err.response.data.error;
          //   this.$swal({
          //     icon: 'error',
          //     text: response.data.error,
          // });
        });
    },
    backtobin() {
      this.skutable = false;
      this.binVal = false;
      this.sku = "";
      this.bin = "";
    },
    backtosku() {
      this.skutable = false;
      this.sku = "";
    },

    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: " SKU value should be numeric!",
        });
      }
    },
  },
  created() {
    this.findMrnInvoiceWithId();
  },
  mounted() {
    this.$refs.bin.focus();
  },
};
</script>
