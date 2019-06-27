import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

  var state= {  
      token:[],
      
  };
   var getters= {
    token : state =>state.token,
 
  };
  var mutations= {
  };
   var actions={
       setToken({state,mutations},{token}){
           
       }
  };


