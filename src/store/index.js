import Vue from "vue";
import Vuex from "vuex";


import app from "../main";
import menu from "./modules/menu";
import user from "./modules/user";
import chat from "./modules/chat";
import todo from "./modules/todo";
import survey from "./modules/survey";
import getDataFromTable from "./getDataFromTable";
import categoriesApi from "./modules/categoriesApi";
import LoginApi from "./modules/LoginApi";
import souscategoriesApi from "./modules/souscategoriesApi";
import paysApi from "./modules/paysApi";
Vue.use(Vuex);

import { defaultLocale, localeOptions } from "constants/config";
export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    changeLang(state, payload) {
      app.$i18n.locale = payload;
      localStorage.setItem("currentLanguage", payload);
    }
  },
  actions: {
    setLang({ commit }, payload) {
      commit("changeLang", payload);
    }
  },
  modules: {
    menu,
    user,
    chat,
    todo,
    survey,
    getDataFromTable,
    categoriesApi,
    LoginApi,
    souscategoriesApi,
    paysApi
  }
});
