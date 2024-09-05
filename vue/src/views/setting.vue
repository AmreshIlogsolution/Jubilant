<template>
  <div class="px-2 py-2z">
    <div class="max-w rounded overflow-hidden shadow-lg">
      <div class="px- pt-1 pb-2">
        <div class="flex justify-between py-1">
          <h3 class="text-lg font-bold ml-2 text text-indigo-900">
            HHT Off / On
          </h3>
          <label
            for="default-toggle"
            class="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value="{{ hht }}"
              v-model="hht"
              id="default-toggle"
              class="sr-only peer"
              checked
            />
            <div
              class="w-11 h-6 bg-red-800 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white dark:peer-focus:ring-white rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3.5px] after:left-[2px] after:bg- after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-green-600 peer-checked:bg-green-600"
            ></div>

            <span
              v-if="hht"
              class="ml-3 text-sm font-medium text-indigo-900 mr-2 text-green-900"
              >Use HHT Device</span
            >
            <span
              v-else
              class="ml-3 text-sm font-medium text-indigo-900 mr-2 text-red-800"
              >Use HHT Device</span
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hht: true,
    };
  },
};
</script>
