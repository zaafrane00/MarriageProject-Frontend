<template>
  <div>
    <h2>Gestion des Categories</h2>
    <hr />
    <b-button variant="outline-primary" @click="showmodal1()">
      Ajouter
      <span>
        <i class="simple-icon-plus"></i>
      </span>
    </b-button>
    <!--------------------------------------------------------------------------->
    <b-modal id="modalright" class="modal-right" ref="modalright_create" title="Creation Categorie">
      <b-card class="mb-4">
        <b-form @submit.prevent="submit_creation(nomCategorie,iconCategorie)">
          <label class="form-group has-float-label">
            <b-form-input type="text" v-model="nomCategorie" />
            <span>Nom Categorie</span>
          </label>
          <label class="form-group has-float-label">
            <b-form-input type="text" v-model="iconCategorie" />
            <span>icon Categorie</span>
          </label>
          <!--<b-input-group>
            <b-form-file v-model="Categorie.Icon" placeholder="Choisir le Flag "></b-form-file>
          </b-input-group>-->

          <b-button type="submit" variant="primary" class="mt-4">Confirmer1</b-button>
        </b-form>
      </b-card>
      <template slot="modal-footer">
        <b-button variant="secondary" @click="hidemodal1()">Cancel</b-button>
      </template>
    </b-modal>
    <!--------------------------------------------------------------------------->
    <b-modal id="modalright" class="modal-right" ref="modalright" :title="title">
      <b-form @submit.prevent="submit_Modification(updateCategorie)">
        <br />
        <label class="form-group has-float-label">
          <b-form-input type="text" v-model="updateCategorie.nom" />
          <span>Nom Categorie</span>
        </label>
        <label class="form-group has-float-label">
          <b-form-input type="text" v-model="updateCategorie.icon" />
          <span>Icon Categorie</span>
        </label>
        <!-- <b-input-group>
          <b-form-file v-model="iconCategorie" placeholder="Choisir l'icon "></b-form-file>
        </b-input-group>-->

        <b-button type="submit" variant="primary" class="mt-4">Confirmer2</b-button>
      </b-form>
      <template slot="modal-footer">
        <b-button variant="secondary" @click="hidemodal_modif()">Cancel</b-button>
      </template>
    </b-modal>
    <br />
    <br />
    <b-table
      selectable
      responsive
      show-empty
      stacked="md"
      :items="categories"
      :fields="fields"
      :fixed="true"
      :select-mode="selectMode"
      @row-selected="rowSelected"
    >
      <template slot="Action" slot-scope="data">
        <b-badge href="#" variant="primary" @click="showmodal_modif(data.item)">
          <i class="simple-icon-pencil"></i> Modifier
        </b-badge>
        <b-badge href="#" variant="success" @click="submit_delete(data.item)">
          <i class="simple-icon-trash"></i> Delete
        </b-badge>
      </template>

      <!-- <template slot="isActive" slot-scope="row">
        {{row.item.isActive}}
        <b-badge href="#" variant="info">modifier</b-badge>
      </template>-->
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
    this.afficheCategories();
  },
  computed: {
    ...mapGetters(["categories"])
  },
  data() {
    return {
      updateCategorie: {
        nom: "name",
        icon: "icon"
      },
      title: "Create Category",

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
      nomCategorie: "",
      iconCategorie: ""
    };
  },
  created() {},

  methods: {
    ...mapActions([
      "createCategorie",
      "afficheCategories",
      "modifierCategorie",
      "deleteCategorie"
    ]),
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
      //console.log(item[0].nom);
      //his.$refs["modalright"].show();
    },
    onTopLabelsOverLineFormSubmit() {
      console.log(JSON.stringify(this.topLabelsOverLineForm));
    },

    showmodal1() {
      this.$refs["modalright_create"].show();
    },
    showmodal_modif(data) {
      this.updateCategorie = data;
      this.title = "Modifier Category " + this.updateCategorie.nom;
      //console.log("hello", row.item.nom);
      this.$refs["modalright"].show();
    },
    hidemodal1() {
      this.$refs["modalright_create"].hide();
    },
    hidemodal_modif() {
      this.$refs["modalright"].hide();
    },
    submit_creation(nom, icone) {
      this.createCategorie({ nom: nom, icon: icone });
      this.$refs["modalright_create"].hide();
    },
    submit_Modification(objet) {
      //this.updateCategorie = objet;
      console.log("after ", objet);
      this.modifierCategorie({
        nom: objet.nom,
        icon: objet.icon,
        id: objet.id_categories
      });
      this.$refs["modalright"].hide();
    },
    submit_delete(objet) {
      this.deleteCategorie({
        id: objet.id_categories
      });
      this.items.splice(objet.id_categories, 1);
    }
  }
};
</script>
