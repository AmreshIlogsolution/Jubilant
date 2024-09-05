<template>
  <div class="bg-white p-5 rounded">
    <div>
      <img
        class="mx-auto h-12 w-auto"
        src="https://www.awlindia.com/img/logo.png"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <!-- <p class="mt-2 text-center text-sm text-gray-600">
        <router-link
          :to="{ path: '/register' }"
          class="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Register Free
        </router-link>
      </p> -->
    </div>
    <form class="mt-8 space-y-6" @submit="login">
      <div
        v-if="errorMsg"
        class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded"
      >
        {{ errorMsg }}
        <span
          @click="errorMsg = ''"
          class="w-8 h-8 flex items-center justify-center rounded-full` cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>

      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="uID"
            type="uID"
            autocomplete="email"
            required=""
            v-model="user.uID"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="pass"
            name="pass"
            type="password"
            autocomplete="current-password"
            required=""
            v-model="user.pass"
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            v-model="user.remember"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <!-- <div class="text-sm">
        <a href="#" class="font-medium text-indigo-600   path:'/login',hover:text-indigo-500">
          Forgot your password?
        </a>
      </div> -->
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
            <svg v-show="isLoadings" class="w-5 h-5 text-white animate-spin absolute left-1/2 -ml-2.5" fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"></path>
              </svg>
          
          <span :class="{'invisible': isLoadings}">Sign in </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const isLoadings = ref(false);
const user = {
  uID: "",
  password: "",
  remember: false,
};
let errorMsg = ref("");
function login(ev) {
  ev.preventDefault();
  isLoadings.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      router.push({ path: "/dashboard" });
    })
    .catch((err) => {
      console.log(err);
      errorMsg.value = err.response.data.error;
    });
}
</script>
