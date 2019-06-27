import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import { AlertPlugin } from "bootstrap-vue";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const actions = {
  afficheCategories() {
    let url = "http://dev.marriage/api/categorie";
    axios.get(url).then(response => {
      for (var item in response.data) {
        state.categories.push(response.data[item]);
      }
      console.log("helloooo", state.categories);
    });
    console.log("CAAATT", state.categories.nom);
  },

  createCategorie({ commit, state }, { nom, icone }) {
    let url = "http://dev.marriage/api/categorie";
    axios.post(url, { nom: nom, icon: icone }).then(response => {
      Vue.$notify("success filled", "Succès", "Ajouté avec succés", {
        duration: 3000,
        permanent: false
      });

      state.categories
        .push({
          nom: response.data.nom,
          icone: response.data.icon,
          updated_at: response.data.updated_at,
          created_at: response.data.created_at
        })
        .catch(e => {
          Vue.$notify("error filled", "Erreur", "Cette assurance existe déja", {
            duration: 3000,
            permanent: false
          });
          this.state.loading = false;
        });

      console.log("xxxx", response);
      alert(response);
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
