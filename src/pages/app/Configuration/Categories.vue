<template>
  <div>
    <h2>Gestion des Categories</h2>
    <hr>
    <b-button variant="outline-primary" @click="showmodal1()">
      Ajouter
      <span>
        <i class="simple-icon-plus"></i>
      </span>
    </b-button>
    <!--------------------------------------------------------------------------->
    <b-modal id="modalright" class="modal-right" ref="modalright_create" title="Creation Categorie">
      <b-card class="mb-4">
        <b-form @submit.prevent="submit_creation(Categorie.nom,Categorie.Icon)">
          <label class="form-group has-float-label">
            <b-form-input type="text" v-model="Categorie.nom"/>
            <span>Nom Pays</span>
          </label>
          <label class="form-group has-float-label">
            <b-form-input type="text" v-model="Categorie.Icon"/>
            <span>Nom Pays</span>
          </label>
          <!--<b-input-group>
            <b-form-file v-model="Categorie.Icon" placeholder="Choisir le Flag "></b-form-file>
          </b-input-group>-->

          <b-button type="submit" variant="primary" class="mt-4">Confirmer</b-button>
        </b-form>
      </b-card>
      <template slot="modal-footer">
        <b-button variant="secondary" @click="hidemodal1()">Cancel</b-button>
      </template>
    </b-modal>
    <!--------------------------------------------------------------------------->
    <b-modal id="modalright" class="modal-right" ref="modalright" :title="title">
      <b-dropdown id="action_drp" text="Choisir Action" variant="outline-secondary">
        <b-dropdown-item>Modifier</b-dropdown-item>
        <b-dropdown-item>Supprimer</b-dropdown-item>
      </b-dropdown>

      <b-form @submit.prevent="onTopLabelsOverLineFormSubmit">
        <br>
        <label class="form-group has-float-label">
          <b-form-input type="text" v-model="Categorie.nom"/>
          <span>Nom Pays</span>
        </label>

        <b-input-group>
          <b-form-file v-model="Categorie.Icon" placeholder="Choisir l'icon "></b-form-file>
        </b-input-group>

        <b-button type="submit" variant="primary" class="mt-4">Confirmer</b-button>
      </b-form>

      <template slot="modal-footer">
        <b-button variant="secondary" @click="hideModal('modalright')">Cancel</b-button>
      </template>
    </b-modal>
    <br>
    <br>
    <b-table
      striped
      responsive
      show-empty
      stacked="md"
      :items="categories"
      :fields="fields"
      :fixed="true"
      thead-class="myTable_thead"
    >
      <template slot="Action" slot-scope="data">
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
import InputTag from "components/Form/InputTag";
import vSelect from "vue-select";
import { validationMixin } from "vuelidate";
const { required, minLength, between } = require("vuelidate/lib/validators");

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
  components: { InputTag, vSelect },
  mounted() {
    //  console.log("CAAAT", this.categories);
    this.afficheCategories();
  },
  computed: {
    ...mapGetters(["categories"])
  },
  data() {
    return {
      title: "Create Category",
      // random: [],
      modes: ["multi", "single", "range"],
      items: [],
      selectMode: "single",
      selected: [],
      fields: {
        id_categories: {
          label: "Id",
          sortable: true
        },
        nom: {
          label: "Nom",
          sortable: true
        },
        icon: {
          label: "Icone"
        },
        Action: {
          label: "Action",
          sortable: false
        }
      },
      topLabelsOverLineForm: {
        email: "",
        password: "",
        tags: [],
        date: null,
        select: "",
        checked: false
      },
      Categorie: {}
    };
  },
  created() {},

  methods: {
    ...mapActions(["createCategorie", "afficheCategories"]),
    hideModal(refname) {
      this.$refs[refname].hide();
      console.log("hide modal:: " + refname);

      if (refname == "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    somethingModal(refname) {
      this.$refs[refname].hide();
      console.log("something modal:: " + refname);

      if (refname == "modalnestedinline") {
        this.$refs["modalnested"].show();
      }
    },
    rowSelected(items) {
      this.selected = items;
      this.title = "Modifier Category " + this.selected[0].nom;
      // console.log(this.selected[0].nom);
      this.$refs["modalright"].show();
    },
    onTopLabelsOverLineFormSubmit() {
      console.log(JSON.stringify(this.topLabelsOverLineForm));
    },

    showmodal1() {
      this.$refs["modalright_create"].show();
    },
    hidemodal1() {
      this.$refs["modalright_create"].hide();
    },
    submit_creation(nom, icone) {
      this.createCategorie({ nom: nom, icone: icone });
      this.$refs["modalright_create"].hide();
    }
  }
};
</script>
