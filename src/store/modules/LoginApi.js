import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "../../router";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const actions = {
  go_acceuil() {
    router.push("/");
  },
  go_login() {
    router.push("/user/login");
  },

  /*get_admin({ commit, state }, { email, password }){
    let url = "http://dev.marriage/api/get-token";
   },*/

  register({ commit, state }, { email, password }) {
    let url = "http://dev.marriage/api/get-token";
    var bodyFormData = new FormData();
    bodyFormData.set("user_name", email);
    bodyFormData.set("password", password);
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    })
      .then(response => {
        router.push("/");
        state.token = response.data;
        localStorage.setItem("token", response.data.access_token);
        console.log("retour ici=", response);
        console.log(state.token);
        Vue.$notify("success filled", response.data.nom, "Ajouté avec succés", {
          duration: 3000,
          permanent: false
        });
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  }
};
const state = {
  token: [],
  admin_name: ""
};
const getters = {
  token: state => state.token
};
const mutations = {};

export default {
  state,
  getters,
  mutations,
  actions
};
