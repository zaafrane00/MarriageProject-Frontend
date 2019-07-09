<template>
  <div>
    <b-input-group>
      <b-form-file
        v-model="image"
        placeholder="Choisir l'icon "
        @change="hello"
        enctype="multipart/form-data"
        accept="image/*"
      ></b-form-file>
    </b-input-group>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      image: ""
    };
  },
  methods: {
    hello(event) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = event => {
        this.image = event.target.files[0];
      };
      console.log("ici", this.image);
    }
  }
};
</script>