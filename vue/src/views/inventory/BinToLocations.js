
import axios from "axios";
import axiosClient from "../../axios";
import { useRouter } from "vue-router";

import "@ocrv/vue-tailwind-pagination/styles";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

import { ref } from 'vue';


export default {
  name: "Receiving",
  components: {
    VueTailwindPagination,
  },
  setup() {
    let isOpen = ref(false);
    return { isOpen };
  },

  created() {
    if (!sessionStorage.getItem("TOKEN")) {
      router.push({ path: "/login" });
    }
  },

  data() {
    return {

      pagination: {
        meta: { to: 1, from: 1 }
      },
      whLocation: '',
      shout: "",
      currentPage: 1,

      perPage: "",
      total: "",
      paginationdiv: false,
      success: "",
      errors: [],

      clientId: sessionStorage.getItem("clientId"),
      scanDiv: false,
      scanBin: "",
      searchDiv: true,
      scanSkuNo: "",
      saveButton: false,
      toBinNo: "",
      body: "",
      skuflag: false,
      skuBatch: "",
      scanQty: "",
      sku: "",
      sloc: "",
      batchNo: "",
      toQty: "",
      hht: true,
      fromBinNo: "",
      skuName: "",
      getbin: false,
      toBin: "",
      searchSkuData: [],
      skuTable: false,
      toSaveDiv: false,
      availableQty: "",
      balanceQty: "",
      rackLocationDiv:false,              
      toBinSkuData:[],
      inputWhlocation:''
    };
  },

  methods: {
    async radiobuttonclick(sloc, sku, batchNo, availQty, balQty) {
    
      this.skuNo = sku;
      this.batchNo = batchNo;
      this.sloc = sloc;
      this.availableQty = availQty;
      this.balanceQty = balQty;

      for (var key of Object.keys(this.skuBatch)) {
        console.log(key + " -> " + this.skuBatch[key]);
        this.skubatchval = this.skuBatch[key];
        this.values[key] = "";
        // this.values[key].isDisabled;
      }
    },

    backToBinPage(){

      this.$swal
            .fire({
              title: "Are you sure?",
              text: "If Yes You will back to Bin Search",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Back To Bin!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                
              this.searchDiv=true;
              this.toSaveDiv = false;
              this.fromBinNo='';
              this.skuName='';
              this.toBinNo='';
              this.skuTable=false;
              this.scanDiv= false;
              this.searchSkuData=[];
              this.toQty='';
              this.toBin='';
              this.scanSkuNo='';
              this.whLocation='';
              this.$router.push({ path: "/bin-to-location-transfer" });
              }
             
           
            });
     

},

    backToSku(){

      this.$swal
            .fire({
              title: "Are you sure?",
              text: "If Yes You will back to SKU Search",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Back To SKU!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.scanDiv= true;
              this.searchDiv=false;
              this.toSaveDiv = false;
              this.skuName='';
              this.toBinNo='';
              this.skuTable=false;
              this.searchSkuData=[];
              this.toQty='';
              this.toBin='';
              this.scanSkuNo='';
            
              //this.whLocation='';
              this.$router.push({ path: "/bin-to-location-transfer" });
              }
             
           
            });
    },
    backtoToBinSearch(){

     this.$swal
      .fire({
        title: "Are you sure?",
        text: "If Yes You will back to To-Bin Search",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Back To To-Bin!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.scanDiv= false;
        this.searchDiv=false;
        this.toSaveDiv = false;
        this.getbin=true;
        //this.skuName='';
        this.toBinNo='';
         this.skuTable=true;
        // this.searchSkuData=[];
        this.toQty='';
        this.toBin='';
       // this.scanSkuNo='';
        //this.whLocation='';
        this.$router.push({ path: "/bin-to-location-transfer" });
        }
       
     
      });
},

    toBinSearch() {
      if (!this.toBin) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "To Bin is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          UserId: sessionStorage.getItem("UserId"),
          getBinNo: this.toBin,
        };
        axiosClient
          .get("/get-tobin-location-search", { params: params })
          .then((response) => {
            console.log(response.data.data);
            // sessionStorage.setItem('asnData',this.searchasnvalue);
            if (response.data.data.length == 0 || response.data.status == 401) {
              //console.log("Array is either empty or does not exist");
              //this.errors ='Data Not Found';
              this.searchAsn = "";
              this.toSaveDiv = false;
              this.toBin = "";
              (this.searchDiv = false), (this.scanDiv = false);
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Transfer Bin Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              console.log(response.data.data[0].LOCATION);

              this.toBinNo = response.data.data[0].LOCATION;
              this.errors = "";

              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.paginationdiv = true;
              (this.getbin = false),
                (this.searchDiv = false),
                (this.scanDiv = false);
              this.toSaveDiv = true;
            }
          })
          .catch((err) => {
            //console.log(err)
            this.searchAsn = "";
            this.scanDiv = false;
            (this.searchDiv = false), (this.scanDiv = false);
            this.toSaveDiv = false;
            this.toBin = "";

            //this.errors = err.response.data.error;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Transfer Bin Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },


    toGetBinSkuDetails() {

      if (!this.whLocation) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "To Bin is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {

        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          whBox: this.whLocation,
          skuId: this.skuId,
          skuName:this.skuName,
          page: this.currentPage,
        };
        axiosClient
          .get("/get-skudetails-bins", { params: params })
          .then((response) => {
            console.log(response.data.data);
            // sessionStorage.setItem('asnData',this.searchasnvalue);
            if (response.data.data.length == 0) {

              //console.log("Array is either empty or does not exist");
              //this.errors ='Data Not Found';
              // this.searchAsn = "";
              // this.toSaveDiv = false;
              // this.toBin = "";
              // (this.searchDiv = false), (this.scanDiv = false);

              this.rackLocationDiv='false';
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Sku Bin Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              console.log(response.data.data);
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.paginationdiv = true;
              this.rackLocationDiv='true';
              this.isOpen='true';

              this.toBinSkuData = response.data.data;
             this.pagination = response
                if(this.currentPage ===1){
                this.btnDisabled=true;
              }else{
                this.btnDisabled=false;
              }
            }
          })
          .catch((err) => {
            //console.log(err)
            this.searchAsn = "";
            this.scanDiv = false;
            (this.searchDiv = false), (this.scanDiv = false);
            this.toSaveDiv = false;
            this.toBin = "";

            //this.errors = err.response.data.error;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "SKU in other Bin Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    },



    frombinSearch() {
      if (!this.whLocation) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "From Bin is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          UserId: sessionStorage.getItem("UserId"),
          whLocation: this.whLocation,
          page: this.currentPage,
        };

        axiosClient
          .get("/from-bin-location-search", { params: params })
          .then((response) => {
            console.log(response.data.data);
            // sessionStorage.setItem('asnData',this.searchasnvalue);
            if (response.data.data.length == 0 || response.data.status == 401) {
              //console.log("Array is either empty or does not exist");
              //this.errors ='Data Not Found';

              this.searchAsn = "";
              this.scanDiv = false;
              (this.searchDiv = true), (this.toSaveDiv = false);
              this.whLocation = "";
              this.skuflag = false;
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "Bin Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
             // console.log(response.data.data[0].whlocation);

              this.fromBinNo = response.data.data[0].whlocation;
              this.errors = "";
              this.perPage = response.data.per_page;
              this.total = response.data.total;
              this.paginationdiv = true;
              (this.searchDiv = false), (this.scanDiv = true);
              this.toSaveDiv = false;
              this.skuflag = true;
            }
          })
          .catch((err) => {
            //console.log(err)
            this.searchAsn = "";
            this.scanDiv = false;
            (this.searchDiv = true), (this.toSaveDiv = false);
            this.whLocation = "";
            this.skuflag = false;

            //this.errors = err.response.data.error;
            this.$swal.fire({
              position: "top-end",
              icon: "error",
              title: "Bin Not found",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
      console.log(this.errors);
    },

    //
    scanBinSkuTransfer() {
      if (!this.scanSkuNo) {
        this.$swal.fire({
          position: "top-end",
          icon: "error",
          title: "SKU Name is required",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        var params = {
          warehouseId: sessionStorage.getItem("WarehouseId"),
          clientId: sessionStorage.getItem("clientId"),
          UserId: sessionStorage.getItem("UserId"),
          scanSkuNo: this.scanSkuNo,
          fromBinNo: this.fromBinNo,
          page: this.currentPage,
        };

        axiosClient
          .get("/scan-sku-bin-transfer", { params: params })
          .then((response) => {
            console.log(response.data.data);
            if (response.data.data.length == 0) {
              this.skuTable = "";
              (this.scanSkuNo = ""),
                this.$swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "SKU Not found",
                  showConfirmButton: false,
                  timer: 1500,
                });
              this.scanBinNo = "";
              this.frombinSearch();
            } else {
              this.scanDiv = false;
              (this.searchSkuData = response.data.data),
                (this.skuName = this.scanSkuNo),
                (this.getbin = true),
                (this.saveButton = true);
              (this.skuTable = true),
                (this.toBinNo = response.data.data[0].LOCATION);
            }
          })
          .catch((err) => {
            this.saveButton = false;
            this.scanDiv = false;
            (this.scanSkuNo = ""),
              this.$swal.fire({
                position: "top-end",
                icon: "error",
                title: "SKU Not found",
                showConfirmButton: false,
                timer: 1500,
              });
            this.scanBinNo = "";
            this.frombinSearch();
          });
      }
    },


    toUpdateQtyInBin() {
      
      // console.log(this.skuBatch);
      // for (var key of Object.keys(this.skuBatch)) {
      //   console.log(key + " -> " + this.skuBatch[key]);
      // }
      //bin-to-bintransfer-save
      // alert('Save Bin');

      if (this.toQty === "" && this.availableQty==="") {
        this.saveButton = false;
        this.$swal.fire("Alert!", "Please Insert Valid Quantity", "alert");
      } else {
        if (this.toQty <= this.availableQty) {
          this.$swal
            .fire({
              title: "Are you sure?",
              text: "You won't be transfer SKU to another Bin",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Move it!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                var params = {
                  warehouseId: sessionStorage.getItem("WarehouseId"),
                  clientId: sessionStorage.getItem("clientId"),
                  UserId: sessionStorage.getItem("UserId"),
                  fromBinNo: this.whLocation,
                  toBinNo: this.toBinNo,
                  toQty: this.toQty,
                  availableQty: this.availableQty,
                  balQty: this.balanceQty,
                  skuNo: this.skuNo,
                  batchNo: this.batchNo,
                  sloc: this.sloc,
                };

                axiosClient
                  .post("/bin-to-location-transfer", params)
                  .then((response) => {
                    console.log(response.status);
                    if (response.status == 200) {
                      this.$swal
                        .fire({
                          position: "top-end",
                          icon: "success",
                          title: "Bin transfer Successfully",
                          showConfirmButton: false,
                          timer: 1500,
                        })
                        .then((result) => {
                          setTimeout(function () {
                            location.reload(true);
                          }, 10);
                        });
                      this.saveButton = false;
                    } else {
                      this.saveButton = true;
                    }
                  })
                  .catch((err) => {
                    this.$swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: "Data Not found",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    this.scanBinNo = "";
                  });
              } else {
                this.$swal
                  .fire("Alert!", "Bin to Bin Transfer Failed", "alert")
                  .then((result) => {
                    setTimeout(function () {
                      location.reload(true);
                    }, 10);
                  });
              }
            });
        } else {
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: "Input Qty is Greater than to Available Qty",
            showConfirmButton: false,
            timer: 1500,
          });
          this.scanBinNo = "";
        }
      }
    },



    clearfields(e) {
      this.scanBinNo = "";
      this.toBinNo = "";
      this.saveButton = false;
    },

    pageChange(pageNumber){
      this.currentPage = pageNumber;
      this.toGetBinSkuDetails(); 
    },
   
  
  },

  mounted() {
   
  
    this.$refs.inputWhlocation.focus()
    this.currentPage = 1;
    //this.serarchasnvalue();
  },

 
};