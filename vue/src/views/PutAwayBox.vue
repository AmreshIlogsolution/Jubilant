<template>
    <div>
        <div class="py-12 grid grid-cols-1 md:grid-cols-1">  
            <div class="w-full md:w-auto md:max-w-full mx-auto ">
                <div class="bg-blue-700 rounded-md border border-indigo-600"> 
                    <div class="flex items-center border-t border-slate-400/20 py-3">
                        <span class="ml-3 text-white text-sm font-medium text-red-600 mr-32 ">PUT AWAY BOX</span>
                        <label for="default-toggle" class="inline-flex relative items-center cursor-pointer ml-10">
                        <input type="checkbox" value="" id="default-toggle" class="sr-only peer" checked>
                        <div class=" w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ml-3 text-sm font-medium text-white ">Use HHT Device</span>
                        </label>
                    </div>            
                    <div class="p-3 h-auto sm:rounded-md bg-white">
                        <form> 
                            <div class="flex items-center py-2 px-3 rounded-lg"> 
                                <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mx-2" placeholder="Scan LPN/BOX*"> 
                                <button type="submit" class="bg-pink-300 hover:bg-pink-500 text-white font-bold py-2 px-4 rounded mr-3">
                                Search </button>
                                
                                
                            </div>
                        </form> 
                    </div>  
                </div> 
            </div> 
         </div> 
    </div>
</template> 
 
<script>

</script>
