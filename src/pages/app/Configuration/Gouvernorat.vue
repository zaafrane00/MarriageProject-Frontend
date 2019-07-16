<template>
  <div>
    <h2>Gestion des Gouvernorats</h2>
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
      title="Creation Gouvernorat"
    >
      <b-row>
        <b-colxx>
          <b-card class="mb-4">
            <b-form @submit.prevent="submit_creation(Gouvernorate)">
              <b-row>
                <b-colxx sm="12">
                  <label class="form-group has-float-label">
                    <b-form-input type="text" v-model="Gouvernorate.nom" required />
                    <span>Nom Gouvernorat</span>
                  </label>
                </b-colxx>
                <b-colxx sm="6">
                  <label class="form-group has-float-label">
                    <b-form-select
                      v-model="Gouvernorate.idPays"
                      item-text="text"
                      item-value="value"
                      :options="selectData"
                      required
                    />
                    <span>Nom Pays</span>
                  </label>
                </b-colxx>
                <b-colxx sm="6">
                  <label class="form-group has-float-label">
                    <b-form-input
                      v-model="Gouvernorate.codepostale"
                      type="number"
                      min="1000"
                      max="999999999"
                      required
                    />
                    <span>Code Postale</span>
                  </label>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-checkbox
                    v-model="checked"
                    name="check-button"
                    @change="hello(falsetrue)"
                    switch
                    style="float: right"
                  >
                    Switch Checkbox
                    <b>(Checked: {{ checked }})</b>
                  </b-form-checkbox>
                </b-colxx>
              </b-row>

              <b-button type="submit" variant="primary" class="mt-4">Confirmer1</b-button>
            </b-form>
          </b-card>
        </b-colxx>
      </b-row>
      <template slot="modal-footer">
        <b-button variant="secondary" @click="hidemodal1()">Cancel</b-button>
      </template>
    </b-modal>
    <!------------------------------------------------------------------>
    <b-modal id="modalright" class="modal-right" ref="modalright" :title="title">
      <b-row>
        <b-colxx>
          <b-card class="mb-4">
            <b-form @submit.prevent="submit_Modification(UpdateGouvernorate)">
              <b-row>
                <b-colxx sm="12">
                  <label class="form-group has-float-label">
                    <b-form-input type="text" v-model="UpdateGouvernorate.nom" required />
                    <span>Nom Gouvernorat</span>
                  </label>
                </b-colxx>
                <b-colxx sm="6">
                  <label class="form-group has-float-label">
                    <b-form-select
                      v-model="UpdateGouvernorate.idpays"
                      item-text="text"
                      item-value="value"
                      :options="selectData"
                      required
                    />
                    <span>Nom Pays</span>
                  </label>
                </b-colxx>
                <b-colxx sm="6">
                  <label class="form-group has-float-label">
                    <b-form-input
                      v-model="UpdateGouvernorate.code_postal"
                      type="number"
                      min="1000"
                      max="999999999"
                      required
                    />
                    <span>Code Postale</span>
                  </label>
                </b-colxx>
                <b-colxx sm="6">
                  <b-form-checkbox
                    v-model="checked"
                    name="check-button"
                    @change="hello(falsetrue)"
                    switch
                    style="float: right"
                  >
                    Switch Checkbox
                    <b>(Checked: {{ checked }})</b>
                  </b-form-checkbox>
                </b-colxx>
              </b-row>

              <b-button type="submit" variant="primary" class="mt-4">Confirmer1</b-button>
            </b-form>
          </b-card>
        </b-colxx>
      </b-row>
      <template slot="modal-footer">
        <b-button variant="secondary" @click="hidemodal_modif()">Cancel</b-button>
      </template>
    </b-modal>
    <!------------------------------------------------------------------>
    <br />
    <br />
    <!------------------------------------------------------------------>
    <b-table
      id="my-table"
      hover="hover"
      bordered="bordered"
      :per-page="perPage"
      :current-page="currentPage"
      show-empty
      :items="Gouvernorat"
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
        <b-badge href="#" variant="success" v-if="data.item.isactive==1">Activé</b-badge>
        <b-badge href="#" variant="warning" v-else>Non Activé</b-badge>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="lengthGouvernorat"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import InputTag from "components/Form/InputTag";
import vSelect from "vue-select";
import Switches from "vue-switches";

export default {
  name: "Gouvernorat",
  components: {
    InputTag,
    vSelect,
    Switches
  },
  data() {
    return {
      falsetrue: false,
      rowSelected: "",
      isBusy: false,
      checked: false,
      search: "",
      lenghtrow: 0,
      perPage: 5,
      currentPage: 1,
      title: "Create ",
      Gouvernorate: {
        nom: "",
        codepostale: "",
        idPays: "",
        isactive: 0
      },
      UpdateGouvernorate: {
        nom: "",
        codepostale: "",
        idPays: "",
        isactive: ""
      },
      checked: false,
      filter: null,
      selectData: [],
      modes: ["multi", "single", "range"],
      items: [],
      selectMode: "single",
      selected: [],
      fields: {
        id: {
          label: "ID",
          sortable: true
        },
        idpays: {
          label: "ID Pays",
          sortable: true
        },
        nom: {
          label: "Nom",
          sortable: true
        },
        code_postal: {
          label: "Code Postale"
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
      index: false
    };
  },
  created() {
    this.afficheGouvernorat();
    this.affichePays().then(res => {
      for (var i in this.pays) {
        this.selectData.push({
          value: this.pays[i].id,
          text: this.pays[i].nom
        });
      }
      console.log("data selectData", this.selectData);
    });
  },
  computed: {
    ...mapGetters(["pays", "Gouvernorat", "lengthGouvernorat"])
  },
  mounted() {},
  methods: {
    ...mapActions([
      "affichePays",
      "afficheGouvernorat",
      "createGouvernorat",
      "modifierGouvernorat",
      "deleteGouvernorat"
    ]),
    returnFalse(x) {
      if (x == 0) this.falsetrue = false;
      else this.falsetrue = true;
    },
    showmodal1() {
      this.$refs["modalright_create"].show();
    },
    hidemodal1() {
      this.$refs["modalright_create"].hide();
    },
    hidemodal_modif() {
      this.$refs["modalright"].hide();
    },
    submit_creation(objet) {
      this.createGouvernorat({
        nom: objet.nom,
        code_postal: objet.codepostale,
        isactive: objet.isactive,
        idpays: objet.idPays
      });
      this.$refs["modalright_create"].hide();
    },
    hello(x) {
      if (x == true) {
        this.Gouvernorate.isactive = 0;
        this.UpdateGouvernorate.isactive = 0;
        console.log(" this.isactive", this.UpdateGouvernorate.isactive);
      } else {
        this.Gouvernorate.isactive = 1;
        this.UpdateGouvernorate.isactive = 1;
        console.log(" this.isactive", this.UpdateGouvernorate.isactive);
      }
    },
    showmodal_modif(data, index) {
      console.log("data showmodif", data);
      this.UpdateGouvernorate = data;
      console.log("idPays", this.UpdateGouvernorate.idpays);
      console.log("UpdateGouvernorate", this.UpdateGouvernorate);
      this.returnFalse(this.UpdateGouvernorate.isactive);
      this.title = "Modifier Category " + this.UpdateGouvernorate.nom;
      this.index = index;
      console.log(
        "UpdateGouvernorate is active",
        this.UpdateGouvernorate.isactive
      );
      if (this.UpdateGouvernorate.isactive) this.checked = true;
      else this.checked = false;
      this.$refs["modalright"].show();
    },
    submit_Modification(objet) {
      console.log("objet modification submit ", objet);

      this.modifierGouvernorat({
        nom: objet.nom,
        code_postal: objet.code_postal,
        isactive: objet.isactive,
        id: objet.id,
        index: objet.index,
        idpays: objet.idpays
      });
      this.$refs["modalright"].hide();
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    submit_delete(objet, index) {
      this.Cofirmation = "";
      this.$bvModal.msgBoxConfirm("Are you sure?").then(value => {
        this.Cofirmation = value;
        if (this.Cofirmation) {
          this.deleteGouvernorat({
            id: objet.id,
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