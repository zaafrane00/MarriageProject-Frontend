<template>
  <div>
    <piaf-breadcrumb />
    <b-card class="cardd">
      <b-tabs content-class="mt-3">
        <b-tab title="Categories" active>
          <!--------------------------------------- Gestion des Categories------------------------------------->

          <h2>Gestion des Categories</h2>
          <hr />

          <div class="d-inline-block float-md-right mr-1 align-top">
            <b-button variant="outline-primary" @click="showmodal1()">
              Ajouter
              <span>
                <i class="simple-icon-plus"></i>
              </span>
            </b-button>
          </div>
          <div class="search-sm d-inline-block float-md-left mr-1 align-top">
            <b-input placeholder="Rechercher" v-model="search" />
          </div>
          <br />
          <!--------------------------------------------------------------------------->
          <b-modal
            id="modalright"
            class="modal-right"
            ref="modalright_create"
            title="Creation Categorie"
          >
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
          <!--------------------------------------------------------------------------->
          <br />
          <br />

          <b-table
            id="my-table"
            selectable
            bordered="bordered"
            :per-page="perPage"
            hover="hover"
            :current-page="currentPage"
            show-empty
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
              <b-badge href="#" variant="success" @click="submit_delete(data.item,data.index)">
                <i class="simple-icon-trash"></i> Delete
              </b-badge>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="lenghtCat"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
          ></b-pagination>
        </b-tab>

        <!--------------------------------------- Gestion des SousCategories-------------------------------------------->

        <b-tab title="Sous Categories">
          <br />

          <h2>Gestion des Sous Categories</h2>
          <hr />
          <SousCategories></SousCategories>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import InputTag from "components/Form/InputTag";
import vSelect from "vue-select";
import { validationMixin } from "vuelidate";
const { required, minLength, between } = require("vuelidate/lib/validators");
import SousCategories from "../Configuration/SousCategories.vue";

export default {
  name: "Categories",
  components: {
    InputTag,
    vSelect,
    SousCategories: SousCategories
  },
  mounted() {},
  computed: {
    ...mapGetters(["categories", "lenghtCat"])
  },
  data() {
    return {
      search: "",
      lenghtrow: 0,
      perPage: 5,
      currentPage: 1,
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
      iconCategorie: "",
      Cofirmation: ""
    };
  },
  created() {
    this.afficheCategories();
  },

  methods: {
    ...mapActions([
      "createCategorie",
      "afficheCategories",
      "modifierCategorie",
      "deleteCategorie"
    ]),
    rows() {
      return this.categories.length;
    },
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
    submit_delete(objet, index) {
      this.Cofirmation = "";
      this.$bvModal.msgBoxConfirm("Are you sure?").then(value => {
        this.Cofirmation = value;
        if (this.Cofirmation) {
          this.deleteCategorie({
            id: objet.id_categories,
            index: index
          });
        }
      });
    }
  }
};
</script>
<style scooped>
.cardd {
  height: 650px;
}
</style>