<template>
  <div>
    {{ scandata }}

    <input
      type="text"
      v-model="qrsearch"
      autocomplete="given-name"
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2"
      placeholder="Search qr *"
      @keyup.enter="findqr()"
      autofocus
      ref="zoneRef"
    />
  </div>
</template>
<script setup>
import store from "../store";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue";

const surveys = computed(() => store.state.surveys);
console.log(surveys);
function deleteSurvey(survey) {
  if (confirm(`Are you sure want to delete this survery`)) {
  }
}
</script>
<!-- <script setup>
import store from "../store";
import { computed } from "vue";
import PageComponent from "../components/PageComponent.vue";

const surveys = computed(() => store.state.surveys);

export default {
  data() {
    return {
      qrsearch: "",
      scandata: [],
      myVar: this.globalVar,
    };
  },
  methods: {
    findqr() {
      // var qrdata = `SKU:aaaaaaaaaasdfasdfsdfaBatchNo:bbbbbSerialNo:23423 4fgfgfg`;
      var qrdata = this.qrsearch;
      let data = this.makeValidSkuBatchNoSeritalNo(qrdata);

      this.findduplicate(data);
      // alert(dd);
    },

    makeValidSkuBatchNoSeritalNo(qrdata) {
      try {
        const myArray = qrdata.split(":");
        let skuword = myArray[1];
        let batchword = myArray[2];
        let serialword = myArray[3];
        let skuVal = skuword.split("BatchNo");
        let barchVal = batchword.split("SerialNo");
        let finals = skuVal[0] + barchVal[0] + serialword;
        return finals;
      } catch (e) {
        alert("wrong data");
      }
    },
    findduplicate(data) {
      if (this.scandata === undefined || this.scandata.length == 0) {
        this.scandata.push(data);
        this.qrsearch = "";
      } else {
        if (this.scandata.includes(data)) {
          alert("already exist");
          this.qrsearch = "";
        } else {
          this.scandata.push(data);
          this.qrsearch = "";
        }
      }
      var json_str = JSON.stringify(this.scandata);
      console.log(json_str);
      this.$cookies.set("username", json_str);
      //   createCookie("mycookie", json_str);
      var json_str = this.$cookies.get("username");
      // var arr = JSON.parse(json_str);
      console.log("amresh".json_str);
      console.log("main list array valuje" + list);
    },
  },
};
</script> -->
