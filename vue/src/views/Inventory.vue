<template>
  <div class="w-full p-4 flex justify-center font-sans">
    <div class="rounded bg-white p-2 w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-indigo-600">Inventory</h3>
        <svg
          class="h-4 fill-current text-grey-dark cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"
          />
        </svg>
      </div>
      <div class="text-sm mt-2">
        <div
          class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
        >
          <router-link :to="{ path: 'bin-to-bin-transfer' }">
            <div
              class="flex items-center justify-center font-semibold text-white"
            >
              <div class="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Bin to Bin Transfer</div>
            </div>
          </router-link>
        </div>

        <div
          class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
        >
          <router-link :to="{ path: 'bin-to-location-transfer' }">
            <div
              class="flex items-center justify-center font-semibold text-white"
            >
              <div class="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Bin To Bin Location</div>
            </div></router-link
          >
        </div>
        <!-- <p class="mt-4 text-white"><router-link :to="{path:'dashboard'}"> To Dashboard...</router-link></p> -->
      </div>
    </div>
  </div>
</template>

<script></script>
