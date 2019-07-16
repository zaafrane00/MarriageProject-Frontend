import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";


Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  pays: [],
  lengthPays: 0,
};
const getters = {
  pays: state => state.pays,
  lengthPays: state => state.lengthPays
};

const actions = {

  affichePays() {

    state.pays = [];
    let url = "http://dev.marriage/api/pays";
    return axios
      .get(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {

        state.pays = [];
        for (var item in response.data) {
          state.pays.push(response.data[item]);
        }
        state.lengthPays = Object.keys(response.data).length
      });
  },

  createPays({ commit, state }, { nom, icon, isactive }) {

    var bodyFormData = new FormData();
    bodyFormData.set("nom", nom);
    bodyFormData.set("icone", icon.name);
    bodyFormData.set("isactive", isactive);
    let url = "http://dev.marriage/api/pays";
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
        state.pays.push(response.data)
        state.lengthPays = Object.keys(state.pays).length
        console.log('heloeee', state.pays)
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  modifierPays({ commit, state }, { nom, icon, isactive, id, index }) {
    console.log('isactive api', isactive)
    let url = "http://dev.marriage/api/pays/" + id;
    console.log('icond modif', icon)
    axios.put(url, { nom: nom, icone: icon, id: id, isactive: isactive }, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
    )
      .then(response => {
        console.log('icondee modif222222', icon)
        Vue.$notify("success filled", response.data.nom, response.statusText, {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);

        actions.affichePays()

        console.log("hello index", state.pays[index]);
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  deletePays({ commit, state }, { id, index }) {

    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
    const data = {
      id: id
    }

    let url = "http://dev.marriage/api/pays/" + id;
    axios.delete(url, { headers, data },
    ).then(response => {

      Vue.$notify("success filled", response.data.nom, 'Deleted', {
        duration: 3000,
        permanent: false
      });
      console.log("response", response);
      console.log('index=', index)

      for (let i = 0; i < state.lengthPays; i++) {
        if (state.pays[i]['id'] == id) {
          state.pays.splice(i, 1);
        }
      }
      state.lengthPays = Object.keys(state.pays).length

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
