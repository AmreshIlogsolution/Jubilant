<template>
  <div class="bg-blue w-full p-4 flex justify-center font-sans">
    <div class="rounded bg-grey-light p-2 bg-white w-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-indigo-700 font-bold">Outbound</h3>
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
        <router-link :to="{ name: 'PickList' }">
          <div
            class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
          >
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Picklist</div>
            </div>
          </div>
        </router-link>
        <div>
          <router-link :to="{ name: 'OutboundSearch' }">
            <div
              class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8 w-full"
            >
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
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </div>
                <div class="mt-1 ml-2">Document Upload</div>
              </div>
            </div>
          </router-link>
        </div>
        <router-link :to="{ name: 'VehicleOut' }">
          <div
            class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
          >
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
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Vehicle Out Upload</div>
            </div>
          </div>
        </router-link>

        <!-- <div class="flex w-full justify-center mt-2">
          <router-link :to="{ name: 'Dashboard' }">
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script></script>
