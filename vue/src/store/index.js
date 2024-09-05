import { createStore } from "vuex";
import axiosClient from "../axios";

let pagginationValue = 1;
const tempSurveys = [
  {
    id: 100,
    title: "What is Lorem Ipsum?",
    slug: "what-is-lorem-ipsum?",
    status: "draft",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-20 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From Which country are you?",
        description: "nulll",
        data: {
          options: [
            { uuid: "fac65ef0-ddb7-11ec-9558-8bfe1345ec3d", text: "USA" },
            { uuid: "05191b10-e015-11ec-89bf-93e432e4d404", text: "Gorgia" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f34", text: "India" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f35", text: "Nepal" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f36", text: "UK" },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "which language video you want to see",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        data: {
          options: [
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f37", text: "PHP" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f37", text: "NODE" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f37", text: "VUE" },
            {
              uuid: "051d86a0-e015-11ec-b003-91915c2d9f37",
              text: "JAVASCRIPT",
            },
          ],
        },
      },
      {
        id: 3,
        type: "radio",
        question: "which language video you want to see",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        data: {
          options: [
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f37", text: "PHP" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f37", text: "NODE" },
            { uuid: "051d86a0-e015-11ec-b003-91915c2d9f37", text: "VUE" },
            {
              uuid: "051d86a0-e015-11ec-b003-91915c2d9f37",
              text: "JAVASCRIPT",
            },
          ],
        },
      },
      {
        id: 4,
        type: "text",
        question: "What's your favourite Your YouTube Chanel",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        data: {},
      },
      {
        id: 5,
        type: "textarea",
        question: "What's your favourite Your YouTube Chanel",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "What is Lorem Ipsum?",
    slug: "what-is-lorem-ipsum?",
    status: "draft",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-20 18:00:00",
    questions: [],
  },
  {
    id: 300,
    title: "What is Lorem Ipsum?",
    slug: "what-is-lorem-ipsum?",
    status: "draft",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-20 18:00:00",
    questions: [],
  },
  {
    id: 400,
    title: "What is Lorem Ipsum?",
    slug: "what-is-lorem-ipsum?",
    status: "draft",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-20 18:00:00",
    questions: [],
  },
  {
    id: 500,
    title: "What is Lorem Ipsum?",
    slug: "what-is-lorem-ipsum?",
    status: "draft",
    image: "https://picsum.photos/200/300",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-20 18:00:00",
    questions: [],
  },
];
const store = createStore({
  state: {
    title: "demo text",
    user: {
      data: {
        name: "",
        email: "",
        id: "",
        // imageUrl:
        // "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tempSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
  actions: {
    // Register fucntion
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    // end of register function
    //login funciton
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        //store.state.user.data.id=123;
        return data;
      });
    },
    //logout function
    logout({ commit }) {
      sessionStorage.removeItem("TOKEN");
      sessionStorage.clear();
      location.reload();
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
      sessionStorage.removeItem("WarehouseId");
      sessionStorage.removeItem("ClientId");
      sessionStorage.removeItem("UserType");
      sessionStorage.clear();
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("UserId", userData.user.ID);
      sessionStorage.setItem("UserType", userData.user.user_type);
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});
export default store;
