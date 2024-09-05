
<template>
  <div class="bg-blue w-full p-8 flex justify-center font-sans">
    <div class="rounded bg-grey-light p-2 bg-blue-500 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-white">{{asnNumber}}</h3>
        <button @click="$router.back()" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-blue-500 cursor-pointer">Back
              </button>
      </div>

      <div class="bg-white p-2 rounded mt-1 border-b border-grey h-90">
        <div class="grid grid-flow-row-dense">
         
         
         
          <form enctype="multipart/form-data"  @submit="submitForm">

            <div v-if="success != ''">
              <span class="flex items-center justify-between py-3 px-5 bg-green-500 text-white rounded">{{success}} </span>
            
            </div>

            <div v-if="errors != ''">
            <span class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded"> {{ errors }} </span>
            </div>
          
            
            <!-- <input type="file" ref="vehicleImage" @change="onChange"   name="vehicleImage" 
id="vehicleImage" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
-->
            <!-- <VueSelfie @picture-taken="imageSrc=$event"/>
<img :src="imageSrc" />
<VehicleImage @vehicle-image="vehicleImgSrc=$event"/>
<img :src="vehicleImgSrc"/> -->

<div class="flex ...">

        <div class="w-3/4">
        <label for="vehicleImage" class="block text-sm font-medium text-red-700 float-left ml-2">
        Vehicle Image (*)</label>
        <input type="file" name="vehicleImage" id="vehicleImage" v-on:change="onChange" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="vehicleImage" /> 
        </div>
      
        <div class="w-1/4" id="preview">
        <img v-if="vehicleImageurl" :src="vehicleImageurl" />
        </div>

      </div> 
   

      <div class="flex">

       <div class="w-3/4">
        <label for="vehicleSealImage"  class="block text-sm font-medium text-red-700 float-left ml-2"> Vehicle Seal Image(*)</label>
        <input  type="file" name="vehicleSealImage" id="vehicleSealImage"  v-on:change="vehicleSealImagechange"  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="vehicleSealImage" />
        </div>

        <div class="w-1/4" id="preview">
        <img v-if="vehicleSealImgurl" :src="vehicleSealImgurl" />
        </div>
      </div>

      
        <div class="flex ...">

        <div class="w-3/4">
    <label for="vehicleNoPlateImage" class="block text-sm font-medium text-red-700 float-left ml-2">
      Vehicle Number Plate Image(*)</label>
    <input type="file" name="vehicleNoPlateImage" id="vehicleNoPlateImage" v-on:change="vehicleNoPlateImagechange"   class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
  </div>

  
  <div class="w-1/4" id="preview">
        <img v-if="vehicleNoPlateImageurl" :src="vehicleNoPlateImageurl" />
        </div>

      </div> 

      <div class="flex ...">

  <div class="w-3/4">
    <label for="materialLoadedone"  class="block text-sm font-medium text-red-700 float-left ml-2">
      Material Loaded – Image 1(*)</label>
    <input  type="file"  name="materialLoadedone" v-on:change="MaterialImgOnefilechange"  id="materialLoadedone" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
  </div>
  <div class="w-1/4" id="preview">
        <img v-if="materialLoadedoneurl" :src="materialLoadedoneurl" />
        </div>

      </div> 


      <div class="flex">

  <div class="w-3/4">
    <label for="materialLoadedtwo"  class="block text-sm font-medium text-red-700 float-left ml-2" >
      Material Loaded – Image 2(*)</label>
    <input type="file" name="materialLoadedtwo" id="materialLoadedtwo" v-on:change="MaterialImgTwofilechange"  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
  </div>
  <div class="w-1/4" id="preview">
        <img v-if="materialLoadedtwourl" :src="materialLoadedtwourl" />
        </div>
      </div> 

      <div class="flex">
  <div class="w-3/4">
    <label for="materialLoadedthree"
      class="block text-sm font-medium text-red-700 float-left ml-2" >
      Material Loaded – Image 3(*)</label
    >
    <input type="file" name="materialLoadedthree" v-on:change="MaterialImgThreefilechange"  id="materialLoadedthree" class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"/>
  </div>

  <div class="w-1/4" id="preview">
        <img v-if="materialLoadedthreeurl" :src="materialLoadedthreeurl" />
        </div>
            <!-- <input type="file" class="form-control" v-on:change="onChange" /> -->
          </div> 
       
            <div>
             

              <button
                class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1  px-3
                  rounded outline outline-offset-2 outline-slate-500  mt-6 float-right ml-4 flex"
                type="submit">
                Upload
              </button>

              <!-- -->
            </div>
          </form>
        </div>
      </div>
      <p class="mt-3 text-white">
        <router-link v-on:click.native="doSomethingCool" to="/">Home</router-link>



        <router-link :to="{ path: 'inbound' }"> To Inbound...</router-link>
      </p>
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
      vehicleImage: null,
      vehicleImgSrc: null,
      errors: '',
      vehicleImageurl: null,
      vehicleSealImgurl:null,
      vehicleNoPlateImageurl:null,
      materialLoadedtwourl:null,
      materialLoadedthreeurl:null,
      materialLoadedoneurl:null,
      success:'',
      asnNumber: this.$route.params.id ,
    };
  },
  components: {},

  methods: {

    MaterialImgThreefilechange(e){
      this.materialLoadedthree= e.target.files[0];
      const materialLoadedthree = e.target.files[0];
      this.materialLoadedthreeurl= URL.createObjectURL(materialLoadedthree);
    },

    MaterialImgTwofilechange(e){
      this.materialLoadedtwo= e.target.files[0];
      const materialLoadedtwo = e.target.files[0];
      this.materialLoadedtwourl= URL.createObjectURL(materialLoadedtwo);
    },

    MaterialImgOnefilechange(e){
      this.materialLoadedone= e.target.files[0];
      const materialLoadedone = e.target.files[0];
      this.materialLoadedoneurl= URL.createObjectURL(materialLoadedone);
    },


    vehicleSealImagechange(e){
      this.vehicleSealImage= e.target.files[0];
      const vehicleSealImage = e.target.files[0];
      this.vehicleSealImgurl = URL.createObjectURL(vehicleSealImage);
    },

    vehicleNoPlateImagechange(e){
      this.vehicleNoPlateImage= e.target.files[0];
      const vehicleNoPlateImage = e.target.files[0];
      this.vehicleNoPlateImageurl = URL.createObjectURL(vehicleNoPlateImage);
    },
    onChange(e) {
     this.vehicleImage = e.target.files[0];
     const vehicleImageFile = e.target.files[0];
     this.vehicleImageurl = URL.createObjectURL(vehicleImageFile);
      },


    async submitForm(e) {
                e.preventDefault();
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                console.log( this.file);
                let data = new FormData();
               
                data.append('vehicleImage', this.vehicleImage);
                data.append('vehicleSealImage', this.vehicleSealImage);
                data.append('vehicleNoPlateImage', this.vehicleNoPlateImage);
                data.append('materialLoadedone', this.materialLoadedone);
                data.append('materialLoadedtwo', this.materialLoadedtwo);
                data.append('materialLoadedthree', this.materialLoadedthree);
                data.append( 'userId', sessionStorage.getItem("UserId"));
                data.append( 'warehouseId', sessionStorage.getItem("WarehouseId"));
                data.append('clientId', sessionStorage.getItem("clientId"));
                data.append( 'asnNumber', this.asnNumber);
                axiosClient.post('/uploads-outvehicles-documents', data, config)
                    .then((res)=> {
                      if(res.data.status =='200'){

                        this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Images Succesfully Uploaded',
                        timer: 1500
                        }).then((result) => {
                      
                        this.$router.push({ path: "/vehicleout" });
                        })
                 
                      }
                   
                    }).catch( (err)=> {
                       console.log(err.response.data);
                       this.$swal.fire({
                          position: 'top-end',
                          icon: 'error',
                          title: 'Images Not uploaded',
                          showConfirmButton: false,
                          timer: 1500,
                          }).then((result) => {
                        
                          this.$router.push({ path: "/vehicleout" });
                          })

                    });
            }
  },
};
</script>