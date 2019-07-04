<template>
  <div>
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
      ref="modalright_S_create"
      title="Creation Sous Categorie"
    >
      <b-card class="mb-4">
        <b-form @submit.prevent="submit_creation(nomSousCategorie,idCategorie,iconSousCategorie)">
          <b-container>
            <label class="form-group has-float-label">
              <b-form-input type="text" v-model="nomSousCategorie" />
              <span>Nom Sous Categorie</span>
            </label>
            <label class="form-group has-float-label">
              <b-form-input type="text" v-model="iconSousCategorie" />
              <span>Icon Sous Categorie</span>
            </label>
            <label class="form-group has-float-label">
              <span>Nom Sous Categorie</span>
              <b-form-group>
                <v-select
                  single
                  v-model="idCategorie"
                  item-text="label"
                  item-value="value"
                  :options="selectData"
                ></v-select>
              </b-form-group>
            </label>
          </b-container>

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
    <b-modal id="modalright" class="modal-right" ref="modalright_modiff" :title="title">
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
      :items="Souscategories"
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
      :total-rows="Souscategories"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import vSelect from "vue-select";
export default {
  name: "SousCategories",
  components: { vSelect },
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
        id_sous_categorie: {
          label: "#",
          sortable: true
        },
        id_categorie: {
          label: "ID Categorie",
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

      nomSousCategorie: "",
      iconSousCategorie: "",
      idCategorie: "",
      selectData: []
    };
  },

  created() {
    this.afficheSousCategories();
    console.log(this.Souscategories);
    this.afficheCategories().then(res => {
      for (var i in this.categories) {
        this.selectData.push({
          value: this.categories[i].id_categories,
          label: this.categories[i].nom
        });
      }
      console.log("data", this.selectData);
    });
  },
  computed: {
    ...mapGetters(["Souscategories", "lenghtSCat", "categories"])
  },
  methods: {
    ...mapActions([
      "afficheSousCategories",
      "createSousCategorie",
      "afficheCategories"
    ]),
    rows() {
      return this.Souscategories.length;
    },
    rowSelected(items) {
      this.selected = items;
      this.title = "Modifier Category " + this.selected[0].nom;
    },
    onTopLabelsOverLineFormSubmit() {
      console.log(JSON.stringify(this.topLabelsOverLineForm));
    },
    showmodal1() {
      this.$refs["modalright_S_create"].show();
    },
    hidemodal1() {
      this.$refs["modalright_S_create"].hide();
    },
    submit_creation(nom, id_categorie, icone) {
      this.createSousCategorie({
        nom: nom,
        idcategorie: id_categorie.value,
        icon: icone
      });
      this.$refs["modalright_S_create"].hide();
    }
  }
};
</script>