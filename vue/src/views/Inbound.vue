<template>
  <div class="flex justify-center font-sans">
    <div class="rounded bg-white p-2 w-screen h-screen">
      <div class="flex justify-between py-1">
        <h3 class="text-sm text-indigo-700 font-bold">Inbound</h3>
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
      <div class="text-sm m-2">
        <div
          class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
        >
          <router-link :to="{ path: 'receiving' }" type="button">
            <div class="flex font-semibold text-center text-white">
              <div class="flex mt-1">
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
                    d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Receiving</div>
            </div>
          </router-link>
        </div>

        <div
          class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
        >
          <router-link :to="{ path: 'asn-scan' }" type="button">
            <div class="flex font-semibold text-center text-white">
              <div class="flex mt-1">
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
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">ASN Scan</div>
            </div>
          </router-link>
        </div>
        <div
          class="bg-zinc-600 text-white p-2 rounded mt-1 mb-5 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
        >
          <router-link :to="{ path: 'put-away' }" type="button">
            <div class="flex font-semibold text-center text-white">
              <div class="flex mt-1">
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
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Put Away</div>
            </div>
          </router-link>
        </div>
        <div
          class="bg-zinc-600 text-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter hover:-translate-y-1 hover:scale-1 hover:bg-zinc-500 hover:text-white hover:font-bold duration-300 cursor-pointer outline outline-offset-2 outline-dark-200 py-8"
        >
          <router-link :to="{ path: 'asn-inward-receiving' }" type="button">
            <div class="flex font-semibold text-center text-white">
              <div class="flex mt-1">
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <div class="mt-1 ml-2">Inbound Document</div>
            </div>
          </router-link>
        </div>
        <!-- <div class="flex w-full justify-center">
          <router-link :to="{ path: 'dashboard' }">
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
