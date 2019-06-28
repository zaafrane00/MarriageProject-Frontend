import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(Vuex);

var state = {
  token: []
};
var getters = {
  token: state => state.token
};
var mutations = {};
var actions = {
  getTokenn({ commit, state }, { email, password }) {
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
      .then(function(response) {
        state.token = response.data.data;
        console.log(state.token);
        Vue.$notify("success filled", "Succès", "Ajouté avec succés", {
          duration: 3000,
          permanent: false
        });
      })
      .catch(e => {
        Vue.$notify("error filled", "Erreur", "Cette assurance existe déja", {
          duration: 3000,
          permanent: false
        });
      });
  }

  //setToken({ state, mutations }, { token }) {}
};

export default {
  state,
  getters,
  mutations,
  actions
};
