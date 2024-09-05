<template>
  <div> 
    
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 flex justify-around m-5 ">
        <h1>Page Not Found</h1>
    </div> 
          
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 flex justify-around m-5 ">
        <div class="flex justify-center items-center bg-blue-800 w-100 h-24 rounded transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-105 hover:bg-blue-500 duration-300 cursor-pointer"> 
            <p class="font-semibold text-center text-white">            
              <router-link :to="{path: 'dashboard'}"> Back to Dashboard  </router-link> 
            </p>  
        </div> 
    </div> 
</div> 

</template>


<script>

export default{

    name:'PageNotFound',

}

</script >

<style scoped>
h1{
    color:red;
    text-align: center;
    font-size: large;
}
</style>