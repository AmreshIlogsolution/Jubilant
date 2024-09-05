<template>
  <div>
    <header class="bg-white shadow">
      <div class="py-1 px-4 sm:px-2 lg:px-8 text-left">
        <h1 class="text-gray-900">
          {{ title }}
        </h1>
        <slot name="header"></slot>
      </div>
    </header>

    <main>
      <div class="max-w-2xl mx-auto sm:px-2 lg:px-2">
        <!-- Replace with your content -->
        <div class="px-2 sm:px-0">
          <slot></slot>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style scoped></style>
