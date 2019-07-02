import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import { AlertPlugin } from "bootstrap-vue";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const actions = {
  afficheCategories() {
    //alert(localStorage.getItem("token"));
    state.categories = [];
    let url = "http://dev.marriage/api/categorie";
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        for (var item in response.data) {
          state.categories.push(response.data[item]);
        }
      });
  },

  createCategorie({ commit, state }, { nom, icon }) {

    var bodyFormData = new FormData();
    bodyFormData.set("nom", nom);
    bodyFormData.set("icon", icon);
    let url = "http://dev.marriage/api/categorie";
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem('token')
      }

    })
      .then(response => {
        Vue.$notify("success filled", "Succès", "Ajouté avec succés", {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);
        actions.afficheCategories();
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  modifierCategorie({ commit, state }, { nom, icon, id }) {
    var bodyFormData = new FormData();
    bodyFormData.set("id", id);
    bodyFormData.set("nom", nom);
    bodyFormData.set("icon", icon);
    console.log(id)
    let url = "http://dev.marriage/api/categorie/" + id;
    axios.put(url, { nom: nom, icon: icon, id_categories: id }, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
      // method: "put",
      // url: url,
      // data: { nom: 45, icon: 45, id_categories: 1 },

      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "X-Requested-With": "XMLHttpRequest",
      //   Authorization: "Bearer " + localStorage.getItem('token')
      // }
    )
      .then(response => {
        Vue.$notify("success filled", "Succès", "Ajouté avec succés", {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  deleteCategorie({ commit, state }, { id }) {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
    const data = {
      id_categories: id
    }

    let url = "http://dev.marriage/api/categorie/" + id;
    axios.delete(url, { headers, data },

      // method: "put",
      // url: url,
      // data: { nom: 45, icon: 45, id_categories: 1 },

      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded",
      //   "X-Requested-With": "XMLHttpRequest",
      //   Authorization: "Bearer " + localStorage.getItem('token')
      // }
    ).then(response => {
      Vue.$notify("success filled", "Succès", "Ajouté avec succés", {
        duration: 3000,
        permanent: false
      });
      console.log("hello", response);
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
