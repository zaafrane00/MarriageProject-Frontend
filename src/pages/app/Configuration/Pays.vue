<template>
  <div>
    <h2>Gestion des Pays</h2>
    <hr>
    <b-button variant="outline-primary">
      Ajouter
      <span>
        <i class="simple-icon-plus"></i>
      </span>
    </b-button>
    <br>
    <br>
    <b-table
      Outlined
      Fixed
      responsive
      selectable
      head-variant
      :select-mode="selectMode"
      selectedVariant="success"
      :fields="fields"
      :items="items"
      @row-selected="rowSelected"
    >
      <template slot="action" slot-scope>
        <b-badge href="#" variant="primary">
          <i class="simple-icon-pencil"></i> Modifier
        </b-badge>
        <b-badge href="#" variant="success">
          <i class="simple-icon-trash"></i> Delete
        </b-badge>
      </template>

      <template slot="isActive" slot-scope="row">
        {{row.item.isActive}}
        <b-badge href="#" variant="info">modifier</b-badge>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

// export default {
//   components: {},
//   data() {
//     return {};
//   },
//   computed: {
//     ...mapGetters([])
//   },
//   methods: {
//     ...mapActions([])
//   }
// };
export default {
  data() {
    return {
      modes: ["multi", "single", "range"],
      items: [],
      selectMode: "multi",
      selected: [],
      fields: [{}]
    };
  },
  created() {
    let url = "http://dev.marriage/api/pays";
    this.axios.get(url).then(response => {
      this.items = response.data;
    });
  },
  mounted() {
    // this.getListePays();
  },
  methods: {
    //...mapActions(["getListePays"]),
    rowSelected(items) {
      this.selected = items;
    }
  }
};
</script>
