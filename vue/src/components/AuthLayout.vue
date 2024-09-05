<template> 
<div class="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
  <section id="login" class="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
    <div class="p-6 bg-sky-300 rounded"> 
        <router-view></router-view>
    </div>
  </section> 
</div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
</script>
