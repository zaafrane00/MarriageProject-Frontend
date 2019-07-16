import Vue from "vue";
import Router from "vue-router";
import AuthRequired from "./authRequired";
Vue.use(Router);

import Error from "pages/Error";
import User from "pages/user";
import UserLogin from "pages/user/Login";
import UserRegister from "pages/user/Register";
import UserForgotPassword from "pages/user/ForgotPassword";

import App from "pages/app";

import Dashboards from "pages/app/dashboards";
import DashboardsDefault from "pages/app/dashboards/Default";
import DashboardsAcceuil from "pages/app/dashboards/Acceuil";



import Configuration from "pages/app/Configuration";
import ConfigurationCategories from "pages/app/Configuration/Categories";
import ConfigurationSousCategories from "pages/app/Configuration/SousCategories";
import ConfigurationPays from "pages/app/Configuration/Pays";
import ConfigurationGouvernorat from "pages/app/Configuration/Gouvernorat";
import ConfigurationVille from "pages/app/Configuration/Ville";
import ConfigurationsearchComponent from "pages/app/Configuration/searchComponent";
import ConfigurationSelectImageComponent from "pages/app/Configuration/SelectImageComponent";

import Admin from "pages/app/Admin/Admin";
import Marriages from "pages/app/Marriages/Marriages";
import Prestataires from "pages/app/Prestataires/Prestataires";
import Utilisateurs from "pages/app/Utilisateurs/Utilisateurs";

import Support from "pages/app/Support";
import SupportRapport from "pages/app/Support/Rapport";
import SupportMessages from "pages/app/Support/Messages";


const routes = [
  {
    path: "/",
    component: App,
    redirect: "/app/dashboards",
    beforeEnter: AuthRequired,
    children: [
      {
        path: "app/dashboards",
        component: Dashboards,
        redirect: "/app/dashboards/default",
        children: [
          { path: "default", component: DashboardsDefault },
          { path: "Acceuil", component: DashboardsAcceuil },

        ]
      },

      {
        path: "app/Configuration",
        component: Configuration,
        redirect: "/app/Configuration/Categories",
        children: [
          { path: "Categories", component: ConfigurationCategories },
          { path: "SousCategories", component: ConfigurationSousCategories },
          { path: "Pays", component: ConfigurationPays },
          { path: "Gouvernorat", component: ConfigurationGouvernorat },
          { path: "Ville", component: ConfigurationVille },
          { path: "searchComponent", component: ConfigurationsearchComponent },
          { path: "SelectImageComponent", component: ConfigurationSelectImageComponent },

        ]
      },

      {
        path: "app/Support",
        component: Support,
        redirect: "/app/Support/Rapport",
        children: [
          { path: "Rapport", component: SupportRapport },
          { path: "Messages", component: SupportMessages },

        ]
      },
      {
        path: "app/Admin",
        component: Admin,
        redirect: "/app/Admin/Admin",
        children: [
          { path: "Admin", component: Admin },

        ]
      },
      {
        path: "app/Marriages",
        component: Marriages,
        redirect: "/app/Marriages/Marriages",
        children: [
          { path: "Marriages", component: Marriages },

        ]
      },
      {
        path: "app/Prestataires",
        component: Prestataires,
        redirect: "/app/Prestataires/Prestataires",
        children: [
          { path: "Prestataires", component: Prestataires },

        ]
      },
      {
        path: "app/Utilisateurs",
        component: Utilisateurs,
        redirect: "/app/Utilisateurs/Utilisateurs",
        children: [
          { path: "Utilisateurs", component: Utilisateurs },

        ]
      },

    ]
  },
  { path: "/error", component: Error },
  {
    path: "/user",
    component: User,
    redirect: "/user/login",
    children: [
      { path: "login", component: UserLogin },
      { path: "register", component: UserRegister },
      { path: "forgot-password", component: UserForgotPassword }
    ]
  },
  { path: "*", component: Error }
];

const router = new Router({
  linkActiveClass: "active",
  routes,
  mode: "history"
});

export default router;
