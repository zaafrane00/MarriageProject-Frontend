import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

var state = {
  dataT: []
};
var getters = {
  dataT: state => state.dataT
};
var mutations = {};
var actions = {
  getDatafromDb({ commit, state }) {
    dataT = [];
    Axios.get("http://dev.marriage/api/get-token", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization:
          "Bearer " +
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFlMGYzOGE5ZThiZTcwMGUyM2I0Yzk0NzZlYzQyZTZjMzFiNGIyYWRlZTZkNzg0MzMzNmEyYzFiY2I2NjUxNmJjMDgzODc1ODQ4NzYzMzAxIn0.eyJhdWQiOiIxIiwianRpIjoiYWUwZjM4YTllOGJlNzAwZTIzYjRjOTQ3NmVjNDJlNmMzMWI0YjJhZGVlNmQ3ODQzMzM2YTJjMWJjYjY2NTE2YmMwODM4NzU4NDg3NjMzMDEiLCJpYXQiOjE1NjExMzY1MDksIm5iZiI6MTU2MTEzNjUwOSwiZXhwIjoxNTkyNzU4OTA5LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.o0WBpFGkLSxVJnS2Se018W93jQOcOodbmYZZhLyYFq9DL_fevKL9CU3VoQ4kmoX2u6VBqxC49rTk5H94t90Q4VJXiuleCBLR8NH0eExx8y8essNXlBGGl_XbXYVwezgwR9QD047HtpITbcxpOEIMKYfzCY27emSilsWlBRPYPxLOsYrUNhRUS9kZ516asmx83wTSdLoxaFR66PyzMgOC8XY6TShm74ALT9TK8o4vg23ssg7aOD51TaaiZbMtEg74au-Cm10tVxQdlI3lJPhrsRsN9BZLbaVpAWPLPVZ258FF8W2RUMFoMDjPSWslvGQY88NaB4LnxFAEf8RcFTRho7qp6VrlQt9IDEBW6AkodNv23i3clINoQgi5Lvv4xqO0zdedYI0juO4bg3sl4bLJ6l307vfqCIGPW6wkBjzK3_yAxghTjgerAxGw7BigJdLzLUrRdxkIQA9FI8cmleXdDx_P2Ag7nVHLgO17fwBOVmcRffwhnNSI5KlpEGFRunnW4DDPFKl7bODBh_P41cwo6LXju3K6V0cbX75bPaDDNBfgL13X7sNUL6at2DZ-kLJKY9eEG_Q-yTkUX_5zb5_458D3EmdA8Z_S-0WpNUweKy2nnD8xT-QCp1ZlfIrTS8ppl9j4djJfphK3peiW-o2IMzyW2bOZV5e5x9UW__4irO8"
      }
    }).then(response => {
      console.log(response);
    });
  },

  getListePays({ commit, state }) {
    state.dataT = [];
    Axios.get("http://dev.marriage/api/pays", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization:
          "Bearer " +
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImFlMGYzOGE5ZThiZTcwMGUyM2I0Yzk0NzZlYzQyZTZjMzFiNGIyYWRlZTZkNzg0MzMzNmEyYzFiY2I2NjUxNmJjMDgzODc1ODQ4NzYzMzAxIn0.eyJhdWQiOiIxIiwianRpIjoiYWUwZjM4YTllOGJlNzAwZTIzYjRjOTQ3NmVjNDJlNmMzMWI0YjJhZGVlNmQ3ODQzMzM2YTJjMWJjYjY2NTE2YmMwODM4NzU4NDg3NjMzMDEiLCJpYXQiOjE1NjExMzY1MDksIm5iZiI6MTU2MTEzNjUwOSwiZXhwIjoxNTkyNzU4OTA5LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.o0WBpFGkLSxVJnS2Se018W93jQOcOodbmYZZhLyYFq9DL_fevKL9CU3VoQ4kmoX2u6VBqxC49rTk5H94t90Q4VJXiuleCBLR8NH0eExx8y8essNXlBGGl_XbXYVwezgwR9QD047HtpITbcxpOEIMKYfzCY27emSilsWlBRPYPxLOsYrUNhRUS9kZ516asmx83wTSdLoxaFR66PyzMgOC8XY6TShm74ALT9TK8o4vg23ssg7aOD51TaaiZbMtEg74au-Cm10tVxQdlI3lJPhrsRsN9BZLbaVpAWPLPVZ258FF8W2RUMFoMDjPSWslvGQY88NaB4LnxFAEf8RcFTRho7qp6VrlQt9IDEBW6AkodNv23i3clINoQgi5Lvv4xqO0zdedYI0juO4bg3sl4bLJ6l307vfqCIGPW6wkBjzK3_yAxghTjgerAxGw7BigJdLzLUrRdxkIQA9FI8cmleXdDx_P2Ag7nVHLgO17fwBOVmcRffwhnNSI5KlpEGFRunnW4DDPFKl7bODBh_P41cwo6LXju3K6V0cbX75bPaDDNBfgL13X7sNUL6at2DZ-kLJKY9eEG_Q-yTkUX_5zb5_458D3EmdA8Z_S-0WpNUweKy2nnD8xT-QCp1ZlfIrTS8ppl9j4djJfphK3peiW-o2IMzyW2bOZV5e5x9UW__4irO8"
      }
    }).then(response => {
      for(var i in response){
        state.dataT.push(response[i])
      }
      console.log("ici  data =", response);
      console.log(response);
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
