<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <b-card class="mb-4" :title="$t('form-components.vue-select')">
          <b-form>
            <b-row>
              <b-colxx>
                <b-form-group label="hello">
                  <v-select v-model="vueSelectForm.single" :options="selectData" />
                </b-form-group>
              </b-colxx>
            </b-row>
          </b-form>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import vSelect from "vue-select";
import { VueAutosuggest } from "vue-autosuggest";
import VueDropzone from "vue2-dropzone";
import InputTag from "components/Form/InputTag";
import Switches from "vue-switches";
import VueSlider from "vue-slider-component";
import Stars from "components/Common/Stars";
export default {
  components: {
    vSelect,
    VueAutosuggest,
    VueDropzone,
    InputTag,
    Switches,
    VueSlider,
    Stars
  },
  data() {
    return {
      selectData: [
        "Chocolate",
        "Vanilla",
        "Strawberry",
        "Caramel",
        "Cookies and Cream",
        "Peppermint"
      ],
      vueSelectForm: {
        single: ""
      }
    };
  },
  methods: {}
};
</script>