<template>
    <div class="bg-blue w-full p-4 flex justify-center font-sans ">
        <div class="rounded bg-grey-light p-2 bg-blue-500 w-screen">
            <div class="flex justify-between py-1">
            	<h3 class="text-sm text-white">Total ASN List</h3>
                <router-link :to="{path:'receiving'}" class="bg-slate-500 hover:bg-slate-700 hover:text-white text-white py-1 px-4 rounded outline outline-offset-2 outline-blue-500 cursor-pointer">
                Back
                </router-link>
            </div> 
  	        <div class="bg-white p-2 rounded mt-1 border-b border-grey h-45"> 
                <div class="grid grid-flow-row-dense grid-cols-4 grid-rows-1">
                   <div class="col-span-4 ">
                      <h5 class="text-xl font-bold leading-none text-gray-900:text-slate float-left p-2">ASNAP-BIR-0000647</h5>
                    </div>
                     <div class="col-span-4 float-left text-sm text-gray-900 dark:text-white">
                        <span class="float-left pl-2">custId :</span>  <span class="pl-5">SBERLC01</span> 
                          <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                      </div>
                     <div class="col-span-4 float-left text-sm text-gray-900 dark:text-white">
                        <span class="float-left pl-2">asnQty: 700</span>    scanQty: 0
                          <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                      </div>
                    <div class="col-span-4 float-left text-normal text-sm text-gray-900 dark:text-white">
                        <span class="float-left pl-2">InvoiceNo: ASN/00004959/22-23</span>    poNo: PO(ELT)/00218/22-23
                          <hr class="my-1 h-px bg-gray-200 border-0 dark:bg-gray-700">
                      </div>
                      
                    
                </div>  
	        </div> 
             <p class="mt-3 text-white"><router-link :to="{path:'inbound'}"> To Inbound...</router-link></p>
        </div>
    </div> 
</template>

<script>


</script>