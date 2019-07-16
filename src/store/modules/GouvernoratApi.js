import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import { AlertPlugin } from "bootstrap-vue";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  Gouvernorat: [],
  lengthGouvernorat: 0,
};
const getters = {
  Gouvernorat: state => state.Gouvernorat,
  lengthGouvernorat: state => state.lengthGouvernorat
};

const actions = {

  afficheGouvernorat() {

    state.Gouvernorat = [];
    let url = "http://dev.marriage/api/governorate";
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {

        state.Gouvernorat = [];
        for (var item in response.data) {
          state.Gouvernorat.push(response.data[item]);
        }
        state.lengthGouvernorat = Object.keys(response.data).length
      });
  },

  createGouvernorat({ commit, state }, { nom, code_postal, isactive, idpays }) {

    var bodyFormData = new FormData();
    bodyFormData.set("nom", nom);
    bodyFormData.set("code_postal", code_postal);
    bodyFormData.set("isactive", isactive);
    bodyFormData.set("idpays", idpays);
    let url = "http://dev.marriage/api/governorate";
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
        console.log('ici reponse Gouvernorat', response)
        Vue.$notify("success filled", response.data.nom, response.statusText, {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);
        state.Gouvernorat.push(response.data)
        state.lengthGouvernorat = Object.keys(state.Gouvernorat).length
        console.log('state Gouvernorat ', state.Gouvernorat)
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  modifierGouvernorat({ commit, state }, { nom, code_postal, isactive, id, idpays, index }) {
    let url = "http://dev.marriage/api/governorate/" + id;
    axios.put(url, { nom: nom, code_postal: code_postal, isactive: isactive, id: id, idpays: idpays }, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    )
      .then(response => {

        Vue.$notify("success filled", response.data.nom, response.statusText, {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);

        //actions.affichePays()

        console.log("hello index", state.Gouvernorat[index]);
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  deleteGouvernorat({ commit, state }, { id, index }) {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
    const data = {
      id: id
    }

    let url = "http://dev.marriage/api/governorate/" + id;
    axios.delete(url, { headers, data },
    ).then(response => {

      Vue.$notify("success filled", response.data.nom, 'Deleted', {
        duration: 3000,
        permanent: false
      });
      console.log("response", response);
      console.log('index=', index)

      for (let i = 0; i < state.lengthGouvernorat; i++) {
        if (state.Gouvernorat[i]['id'] == id) {
          state.Gouvernorat.splice(i, 1);
        }
      }
      state.lengthGouvernorat = Object.keys(state.Gouvernorat).length

    })
      .catch(e => {
        Vue.$notify("Error", e, e, {
          duration: 3000,
          permanent: false

        });

      });
  }

};


const mutations = {};

export default {
  state,
  getters,
  mutations,
  actions
};
