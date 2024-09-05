<template>
     <div class="flex flex-col" v-if="skutable">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full" >
                            <thead class="border-b">
                                <tr><th scope="col" class="text-sm font-medium text-gray-900 px-2 py-1 text-left">#</th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-1 text-left">SkU</th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-1 text-left">Batch</th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-1 text-left">ASN QTY</th> 
                                <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-1 text-left">Update</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr class="border-b" v-for="(sku,i) in skuData" :key="`skuInput.${i}`">
                                    <td class="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                        <!-- <input type="radio" name="skuBatch" :value="sku.batchno" 
                                        v-model="skuBatch['dynamic-field-'+i]" @change="radiobuttonclick(sku.SKU,sku.ASNQTY,sku.ScanQty,sku.batchno,i)"> -->
                                          <input type="radio" name="skuBatch" :value="sku.batchno" 
                                        v-model="skuBatch['dynamic-field-'+i]" @change="radiobuttonclick(sku.SKU,sku.ASNQTY,sku.ScanQty,sku.batchno)">
                                    </td>
                                    <td class="text-sm text-gray-900 font-light px-2 py-1 whitespace-nowrap text-left">{{sku.SKU}}</td>
                                    <td class="text-sm text-gray-900 font-light px-2 py-1 whitespace-nowrap text-left">
                                        {{sku.batchno != '' ? sku.batchno : "" }} </td>
                                    <td class="text-sm text-gray-900 font-light px-2 py-1 whitespace-nowrap text-left">{{ sku.ASNQTY}} ({{  parseInt(sku.ScanQty) }})  </td>
                                    
                                    <td class="text-sm text-gray-900 font-light px-2 py-1 whitespace-nowrap">
                                        <!-- <input type="number"  v-model="skutexboxs.skutexbox"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-24 h-6" :max="sku.ASNQTY" :ref="'skuInputUpdateVal'+i"  >  -->
                                        <!-- <input type="number" v-model="values['dynamic-field-'+i]" :id="'skuInputUpdateVal'+i" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-24 h-6" :max="sku.ASNQTY"  > -->
                                         <input type="number" v-model="values['dynamic-field-'+i]" :id="'skuInputUpdateVal'+i" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-24 h-6" :max="sku.ASNQTY"   >
                                    </td> 
                                </tr>
                                
                                
                            </tbody>
                        
                        </table>
                        <div  class="mt-3 float-right mr-5"><button class="py-2 px-8 bg-green-400 hover:bg-green-700 text-white rounded outline outline-offset-2" @click.prevent="updateSku()" >Update</button></div>
                    </div> 
                </div>
            </div>
        </div>
</template>

<script>
 

export default {
   
}
</script>
