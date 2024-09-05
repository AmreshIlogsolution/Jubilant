<template>
  <div>
    <div
      class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200 mb-32"
      v-if="paginationData"
    >
      <div class="flex flex-col items-center" v-if="paginationData">
        <!-- Help text -->
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900">{{
            paginationData.data.from
          }}</span>
          to
          <span class="font-semibold text-gray-900">{{
            paginationData.data.to
          }}</span>
          of
          <span class="font-semibold text-gray-900">{{
            paginationData.data.total
          }}</span>
          Entries
        </span>
        <!-- Buttons -->
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-stone-500 rounded-l hover:bg-stone-700"
            @click="pageEvent(currentPage - 1)"
            :disabled="btnDisabled"
          >
            Prev
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-stone-500 border-0 border-l border-gray-700 rounded-r hover:bg-stone-700"
            @click="pageEvent(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <!-- pagination box end here -->
  </div>
</template>

<script>
import axios from "axios";
import axiosClient from "../axios";
import { useRouter } from "vue-router";

export default {
  props: ["paginationData"],

  data() {
    return {
      zonelists: [],

      clientid: "",
      warehouseid: "",
      currentPage: 1,
      perPage: "",
      total: "",
      searchZoneInput: "",
      zoneBatchNo: "",
      loaderurl: false,
      zonelistsFlag: true,
      orderBatchNo: "",
      paginationdiv: true,
      btnDisabled: true,
    };
  },
  methods: {
    pageEvent(pageNumber) {
      if (pageNumber === 1) {
        this.btnDisabled = true;
      } else {
        this.btnDisabled = false;
      }
      this.currentPage = pageNumber;
      //alert(this.currentPage);
      this.$emit("my-event", pageNumber);
    },
  },

  mounted() {},
};
</script>
