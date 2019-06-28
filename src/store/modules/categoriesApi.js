import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import { AlertPlugin } from "bootstrap-vue";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const actions = {
  afficheCategories() {
    state.categories = [];
    let url = "http://dev.marriage/api/categorie";
    axios.get(url).then(response => {
      for (var item in response.data) {
        state.categories.push(response.data[item]);
      }
      // console.log("helloooo", state.categories);
    });
    // console.log("CAAATT", state.categories.nom);
  },

  createCategorie({ commit, state }, { nom, icone }) {
    let url = "http://dev.marriage/api/categorie";
    axios
      .post(
        url,
        { nom: nom, icon: icone },
        { headers: { "X-Requested-With": "XMLHttpRequest" } }
      )
      .then(response => {
        Vue.$notify("success filled", "Succès", "Ajouté avec succés", {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);
        actions.afficheCategories();
      })
      .catch(e => {
        Vue.$notify("error filled", "Erreur", "Cette assurance existe déja", {
          duration: 3000,
          permanent: false
        });
        this.state.loading = false;
      });
  }
};
const state = {
  categories: []
};
const getters = {
  categories: state => state.categories
};
const mutations = {};

export default {
  state,
  getters,
  mutations,
  actions
};
