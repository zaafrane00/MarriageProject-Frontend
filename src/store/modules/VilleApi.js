import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";


Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  Ville: [],
  lengthVille: 0,
};
const getters = {
  Ville: state => state.Ville,
  lengthVille: state => state.lengthVille
};

const actions = {

  afficheVille() {
    state.Ville = [];
    let url = "http://dev.marriage/api/ville";
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        state.Ville = [];
        for (var item in response.data) {
          state.Ville.push(response.data[item]);
        }
        state.lengthVille = Object.keys(response.data).length
      });
  },

  createVille({ commit, state }, { nom, icon, isactive }) {

    var bodyFormData = new FormData();
    bodyFormData.set("nom", nom);
    bodyFormData.set("icone", icon.name);
    bodyFormData.set("isactive", isactive);
    let url = "http://dev.marriage/api/ville";
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
        console.log('ici reponse ville', response)
        console.log('ici reponse photo ville', response.data.icone)
        Vue.$notify("success filled", response.data.nom, response.statusText, {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);
        state.Ville.push(response.data)
        state.lengthVille = Object.keys(state.Ville).length
        console.log('heloeee', state.Ville)
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  modifierVille({ commit, state }, { nom, icon, isactive, id, index }) {
    console.log('isactive api', isactive)
    let url = "http://dev.marriage/api/ville/" + id;
    console.log('icond modif', icon)
    axios.put(url, { nom: nom, icone: icon, id: id, isactive: isactive }, {
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
        console.log("hello index", state.pays[index]);
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  deleteVille({ commit, state }, { id, index }) {

    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
    const data = {
      id: id
    }

    let url = "http://dev.marriage/api/ville/" + id;
    axios.delete(url, { headers, data },
    ).then(response => {

      Vue.$notify("success filled", response.data.nom, 'Deleted', {
        duration: 3000,
        permanent: false
      });
      console.log("response", response);
      console.log('index=', index)

      for (let i = 0; i < state.lengthVille; i++) {
        if (state.Ville[i]['id'] == id) {
          state.Ville.splice(i, 1);
        }
      }
      state.lengthVille = Object.keys(state.Ville).length

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
