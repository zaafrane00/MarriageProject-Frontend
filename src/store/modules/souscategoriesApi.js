import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";


Vue.use(Vuex);
Vue.use(VueAxios, axios);

const state = {
  Souscategories: [],
  lenghtSCat: 0,
};
const getters = {
  Souscategories: state => state.Souscategories,
  lenghtSCat: state => state.lenghtSCat
};

const actions = {
  afficheSousCategories() {
    state.Souscategories = [];
    let url = "http://dev.marriage/api/sous_categorie ";
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
          state.Souscategories.push(response.data[item]);
        }
        state.lenghtSCat = Object.keys(response.data).length
      });
  },

  createSousCategorie({ commit, state }, { nom, idcategorie, icon }) {

    var bodyFormData = new FormData();
    bodyFormData.set("nom", nom);
    bodyFormData.set("icon", icon);
    bodyFormData.set("idcategorie", idcategorie);
    console.log(bodyFormData)
    let url = "http://dev.marriage/api/sous_categorie ";
    axios({
      method: "post",
      url: url,
      data: bodyFormData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: "Bearer " + localStorage.getItem('token')
      }

    })
      .then(response => {
        Vue.$notify("success filled", response.data.nom, response.statusText, {
          duration: 3000,
          permanent: false
        });
        console.log("hello", response);
        state.Souscategories.push(response.data)
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  modifierSousCategorie({ commit, state }, { nom, icon, id, idcategorie }) {

    let url = "http://dev.marriage/api/sous_categorie/" + id;
    axios.put(url, { nom: nom, icon: icon, id_sous_categorie: id, idcategorie: idcategorie }, {
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
      })
      .catch(e => {
        Vue.$notify("error filled", e, e, {
          duration: 3000,
          permanent: false
        });
      });
  },

  deleteSousCategorie({ commit, state }, { id, index }) {
    const headers = {
      'Authorization': "Bearer " + localStorage.getItem('token'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
    const data = {
      id_sous_categorie: id
    }

    let url = "http://dev.marriage/api/sous_categorie/" + id;
    axios.delete(url, { headers, data },
    ).then(response => {
      Vue.$notify("success filled", response.data.nom, 'Deleted', {
        duration: 3000,
        permanent: false
      });
      console.log("hello", response);
      console.log('index=', index)
      for (let i = 0; i < state.lenghtSCat; i++) {
        if (state.Souscategories[i]['id_sous_categorie'] == id) {
          state.Souscategories.splice(i, 1);
        }
      }
      state.lenghtSCat = Object.keys(state.Souscategories).length
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
