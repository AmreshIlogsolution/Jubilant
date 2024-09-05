<template>
  <div class="bg-blue w-full p-8 flex justify-center font-sans">
    <div class="rounded bg-grey-light p-2 bg-gray-300 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-indigo-700">
          Inwards Documents
          <p class="ml-2 text-gray-500">{{ asnNumber }}</p>
        </h3>

        <button
          @click="$router.back()"
          class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-gray-500 cursor-pointer"
        >
          Back
        </button>
      </div>
      <form enctype="multipart/form-data" @submit="submitForm">
        <div class="bg-white p-2 rounded mt-1 border-b border-grey h-90">
          <div class="grid grid-flow-row-dense">
            <div class="flex">
              <div class="w-3/4">
                <label
                  for="vehicleImage"
                  class="block text-sm font-medium text-red-700 float-left ml-2"
                >
                  Invoice Documents (*)</label
                >
                <input
                  type="file"
                  name="invoicedocuments"
                  id="invoicedocuments"
                  v-on:change="invoiceonChange"
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="invoicedocuments"
                />
              </div>

              <div class="w-1/4" id="preview">
                <img v-if="invoicedocumentsurl" :src="invoicedocumentsurl" />
              </div>
            </div>

            <div class="flex">
              <div class="w-3/4">
                <label
                  for="vehicleSealImage"
                  class="block text-sm font-medium text-red-700 float-left ml-2"
                >
                  LR Documents(*)</label
                >
                <input
                  type="file"
                  name="lrdocuments"
                  id="lrdocuments"
                  v-on:change="lrdocumentschange"
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="lrdocuments"
                />
              </div>

              <div class="w-1/4" id="preview">
                <img v-if="lrdocumentsurl" :src="lrdocumentsurl" />
              </div>
            </div>

            <div class="flex">
              <div class="w-3/4">
                <label
                  for="otherdocuments"
                  class="block text-sm font-medium text-red-700 float-left ml-2"
                  >Other Documents</label
                >
                <input
                  type="file"
                  name="otherdocuments"
                  id="otherdocuments"
                  v-on:change="otherdocumentschange"
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
              <div class="w-1/4" id="preview">
                <img v-if="otherdocumentsurl" :src="otherdocumentsurl" />
              </div>
            </div>

            <button
              class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-3 rounded outline outline-offset-2 outline-slate-500 mt-6 float-right"
              type="submit"
            >
              Upload
            </button>
            <!-- -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 50%;
  max-height: 100px;
  float: left;
}
</style>
<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";

export default {
  name: "uploadsReceivingDocuments",

  created() {
    if (!sessionStorage.getItem("TOKEN")) {
      router.push({ path: "/login" });
    }
  },

  data() {
    return {
      errors: null,
      invoicedocumentsurl: null,
      lrdocumentsurl: null,
      otherdocumentsurl: null,
      success: "",
      errors: "",
      clientId: sessionStorage.getItem("clientId"),
      asnNumber: this.$route.params.id,
    };
  },
  components: {},

  methods: {
    lrdocumentschange(e) {
      this.lrdocuments = e.target.files[0];
      const lrdocuments = e.target.files[0];
      this.lrdocumentsurl = URL.createObjectURL(lrdocuments);
    },
    otherdocumentschange(e) {
      this.otherdocuments = e.target.files[0];
      const otherdocuments = e.target.files[0];
      this.otherdocumentsurl = URL.createObjectURL(otherdocuments);
    },

    invoiceonChange(e) {
      this.invoicedocuments = e.target.files[0];
      const invoicedocuments = e.target.files[0];
      this.invoicedocumentsurl = URL.createObjectURL(invoicedocuments);
    },

    async submitForm(e) {
      e.preventDefault();
      let existingObj = this;
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      // console.log( this.file);
      let data = new FormData();

      data.append("invoicedocuments", this.invoicedocuments);
      data.append("lrdocuments", this.lrdocuments);
      data.append("otherdocuments", this.otherdocuments);
      data.append("userId", sessionStorage.getItem("UserId"));
      data.append("warehouseId", sessionStorage.getItem("WarehouseId"));
      data.append("clientId", this.clientId);
      data.append("asnNumber", this.asnNumber);
      axiosClient
        .post("/uploads-invoice-documents", data, config)
        .then((res) => {
          if (res.data.status == "200") {
            console.log(res.data.status);
            //this.success  = res.data.success;
            this.$swal
              .fire({
                position: "top-end",
                icon: "success",
                title: "Images Successfully uploaded",
                showConfirmButton: false,
                timer: 1500,
              })
              .then((response) => {
                this.$router.push({ path: "/asn-inward-receiving" });
              });
          }
        })
        .catch((err) => {
          //console.log(err);
          this.$swal
            .fire({
              position: "top-end",
              icon: "error",
              title: "Images Not uploaded",
              showConfirmButton: false,
              timer: 1500,
            })
            .then((response) => {
              this.$router.push({ path: "/asn-inward-receiving" });
            });
        });
    },
  },
};
</script>
