<template>
  <div>
    <v-select :options="options" label="title">
      <template slot="option" slot-scope="option">
        <img :src="option.cardImage" style="width:50px" />
        {{ option.title }}
      </template>
    </v-select>
  </div>
</template>

<script>
import VueSelectImage from "vue-select-image";
require("vue-select-image/dist/vue-select-image.css");
import vSelect from "vue-select";
export default {
  name: "SelectImageComponent",
  components: { VueSelectImage, vSelect },
  data() {
    return {
      options: [
        {
          label: "Egypte",
          cardImage: "../../../assets/img/Flags/eg.svg"
        },
        {
          title: "Tunisia",
          cardImage: "../../../assets/img/Flags/tn.svg"
        },
        {
          title: "France",
          cardImage: "../../../assets/img/Flags/fr.svg"
        },
        {
          title: "Spain",
          cardImage: "../../../assets/img/Flags/es.svg"
        },
        {
          title: "Italy",
          cardImage: "../../../assets/img/Flags/it.svg"
        },
        {
          title: "Algeria",
          cardImage: "../../../assets/img/Flags/dz.svg"
        }
      ]
    };
  },
  methods: {
    onSelectImage() {
      console.log("hello");
    }
  }
};
</script>