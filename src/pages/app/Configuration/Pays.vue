<template>
  <div>
    <piaf-breadcrumb />
    <b-card class="cardd">
      <b-tabs content-class="mt-3">
        <b-tab title="Pays" active>
          <!--------------------------------------- Gestion des Pays------------------------------------->
          <h2>Gestion des Pays</h2>
          <hr />
          <!---------------------------------------------------------------->
          <div class="d-inline-block float-md-right mr-1 align-top">
            <b-button variant="outline-primary" @click="showmodal1()">
              Ajouter
              <span>
                <i class="simple-icon-plus"></i>
              </span>
            </b-button>
          </div>
          <div class="search-sm d-inline-block float-md-left mr-1 align-top">
            <b-input placeholder="Rechercher" v-model="filter" />
          </div>
          <br />

          <!---------------------------------------------------------------->
          <b-modal
            id="modalright"
            class="modal-right"
            ref="modalright_create"
            title="Creation Pays"
          >
            <b-card class="mb-4">
              <b-form @submit.prevent="submit_creation(nomPays,iconPays,isactive)">
                <label class="form-group has-float-label">
                  <b-form-input type="text" v-model="nomPays" />
                  <span>Nom Pays</span>
                </label>
                <label class="form-group has-float-label">
                  <span>Icon Categorie</span>
                </label>
                <b-input-group>
                  <b-form-file
                    v-model="iconPays"
                    placeholder="Choisir le Flag "
                    @change="onupload"
                    accept="image/*"
                    enctype="multipart/form-data"
                  ></b-form-file>
                </b-input-group>
                <b-form-checkbox v-model="checked" name="check-button" @change="hello()" switch>
                  Switch Checkbox
                  <b>(Checked: {{ checked }})</b>
                </b-form-checkbox>

                <b-button type="submit" variant="primary" class="mt-4">Confirmer1</b-button>
              </b-form>
            </b-card>
            <template slot="modal-footer">
              <b-button variant="secondary" @click="hidemodal1()">Cancel</b-button>
            </template>
          </b-modal>
          <!--------------------------------------------------------------------------->
          <b-modal id="modalright" class="modal-right" ref="modalright" :title="title">
            <b-form @submit.prevent="submit_Modification(updatePays)">
              <br />
              <label class="form-group has-float-label">
                <b-form-input type="text" v-model="updatePays.nom" />
                <span>Nom Categorie</span>
              </label>
              <label class="form-group has-float-label">
                <span>Icon Categorie</span>
              </label>
              <b-input-group>
                <b-form-file
                  v-model="updatePays.icon"
                  @change="onupload"
                  accept="image/*"
                  enctype="multipart/form-data"
                ></b-form-file>
              </b-input-group>
              <b-form-checkbox
                v-model="updatePays.isactive"
                name="check-button"
                @change="hello()"
                switch
              >
                Active
                <b>({{ checked }})</b>
              </b-form-checkbox>

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
            :items="pays"
            :busy.sync="isBusy"
            :fields="fields"
            :fixed="true"
            :filter="filter"
            :select-mode="selectMode"
            @row-selected="rowSelected"
          >
            <template slot="Action" slot-scope="data">
              <b-badge href="#" variant="secondary" @click="showmodal_modif(data.item,data.index)">
                <i class="simple-icon-pencil"></i> Modifier
              </b-badge>
              <b-badge href="#" variant="danger" @click="submit_delete(data.item,data.index)">
                <i class="simple-icon-trash"></i> Delete
              </b-badge>
            </template>
            <template slot="Status" slot-scope="data">
              <b-badge href="#" variant="success" v-if="data.item.isactive==1">
                <i class="simple-icon-pencil"></i> Activé
              </b-badge>
              <b-badge href="#" variant="warning" v-else>
                <i class="simple-icon-trash"></i> Non Activé
              </b-badge>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="lengthPays"
            :per-page="perPage"
            aria-controls="my-table"
            align="center"
          ></b-pagination>
          <!--------------------------------------------------------------------------->
        </b-tab>
        <b-tab title="Governorat"></b-tab>
        <b-tab title="Ville"></b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import InputTag from "components/Form/InputTag";
import vSelect from "vue-select";
import Switches from "vue-switches";

export default {
  name: "Pays",
  components: {
    InputTag,
    vSelect,
    Switches
  },
  data() {
    return {
      rowSelected: "",
      isBusy: false,
      checked: false,
      search: "",
      lenghtrow: 0,
      perPage: 5,
      currentPage: 1,
      updatePays: {
        nom: "",
        icon: "icon",
        isactive: "isactive"
      },
      title: "Create Pays",

      modes: ["multi", "single", "range"],
      items: [],
      selectMode: "single",
      selected: [],
      fields: {
        id: {
          label: "Id",
          sortable: true
        },
        nom: {
          label: "Nom",
          sortable: true
        },
        icone: {
          label: "Icone"
        },
        Status: {
          label: "Status",
          sortable: true
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
      nomPays: "",
      iconPays: "",
      isactive: "",
      index: false,
      Cofirmation: "",
      switches: {
        primary: true,
        secondary: false,
        primaryInverse: false,
        secondaryInverse: true
      },
      filter: null
    };
  },
  created() {
    this.affichePays();
  },
  computed: {
    ...mapGetters(["pays", "lengthPays"])
  },
  mounted() {},
  methods: {
    ...mapActions(["affichePays", "createPays", "modifierPays", "deletePays"]),
    rowClass(item, type) {
      if (!this.pays) return;
      if (item.isactive == 0) {
        console.log("here", item.isactive);
        return "table-danger";
      }
    },
    showmodal1() {
      this.$refs["modalright_create"].show();
    },
    hidemodal1() {
      this.$refs["modalright_create"].hide();
    },
    submit_creation(nom, icone, isactive) {
      this.createPays({ nom: nom, icon: icone, isactive: isactive });
      this.$refs["modalright_create"].hide();
    },

    onupload(event) {
      this.iconPays = event.target.files[0];
      console.log("ici iconPays", this.iconPays);
    },
    hello() {
      if (this.checked == !true) {
        this.isactive = 1;
        console.log(" this.isactive", this.isactive);
      } else {
        this.isactive = 0;
        console.log(" this.isactive", this.isactive);
      }
    },
    showmodal_modif(data, index) {
      console.log("data", data);
      let target = {};
      const returnedTarget = Object.assign(target, data);
      returnedTarget["index"] = index;
      this.updatePays = returnedTarget;
      this.title = "Modifier Category " + this.updatePays.nom;
      this.index = index;
      console.log("obbbbbbb", this.updatePays.isactive);
      if (this.updatePays.isactive) this.checked = true;
      else this.checked = false;
      this.$refs["modalright"].show();
    },
    hidemodal_modif() {
      this.$refs["modalright"].hide();
    },
    submit_Modification(objet) {
      console.log("after ", objet);
      console.log("icon name", objet.icon.name);
      this.modifierPays({
        nom: objet.nom,
        icon: objet.icon.name,
        isactive: objet.isactive,
        id: objet.id,
        index: objet.index
      });
      this.$refs["modalright"].hide();
    },
    submit_delete(objet, index) {
      this.Cofirmation = "";
      this.$bvModal.msgBoxConfirm("Are you sure?").then(value => {
        this.Cofirmation = value;
        if (this.Cofirmation) {
          this.deletePays({
            id: objet.id,
            index: index
          });
        }
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style scooped>
.cardd {
  height: 650px;
}
</style>