





  <div class="container mx-auto rounded overflow-hidden shadow-2xl border border-slate-200 divide-y divide-blue-200" v-if="paginationdiv">

  
    <div class="flex flex-col items-center" v-if="paginationdiv">
      <!-- Help text -->
      <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.from}}</span> to <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.to}}</span> of <span class="font-semibold text-gray-900 dark:text-white">{{pagination.data.total}}</span> Entries
      </span>
      <!-- Buttons -->
      <div class="inline-flex mt-2 xs:mt-0">
         {{btnDisabled}}
    
         <button class="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="pageChange(currentPage - 1)"  :disabled='btnDisabled' >
              Prev
          </button>
          <button class="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="pageChange(currentPage + 1)">
              Next
          </button>
      
       
      </div>
    </div>