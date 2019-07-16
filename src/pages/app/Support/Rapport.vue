<template>
  <div>
    <b-colxx xxs="12">
      <piaf-breadcrumb heading="Menu Prestataires" />
      <div class="separator mb-5"></div>
    </b-colxx>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions, Store } from "vuex";
import InputTag from "components/Form/InputTag";
import vSelect from "vue-select";
import Switches from "vue-switches";

export default {
  name: "Rapport",
  components: {
    InputTag,
    vSelect,
    Switches
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters([])
  },
  mounted() {},
  methods: {}
};
</script>

<style scooped>
.cardd {
  height: 650px;
}
</style>