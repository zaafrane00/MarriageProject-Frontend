<template>
  <div>
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
      <b-input placeholder="Rechercher" v-model="filter" />
    </div>
    <br />
    <!--------------------------------------------------------------------------->
    <b-modal
      id="modalright"
      class="modal-right"
      ref="modalright_create"
      title="Creation Gouvernorat"
    >
      <b-row>
        <b-colxx>
          <b-card class="mb-4">
            <b-form @submit.prevent="submit_creation(Ville)">
              <b-row>
                <b-colxx sm="12">
                  <label class="form-group has-float-label">
                    <b-form-input type="text" v-model="CreateVille.nom" required />
                    <span>Nom Ville</span>
                  </label>
                </b-colxx>
                <b-colxx sm="12">
                  <label class="form-group has-float-label">
                    <b-form-select
                      v-model="CreateVille.idGouverorat"
                      item-text="text"
                      item-value="value"
                      :options="selectData"
                      required
                    />
                    <span>Nom Gouverorat</span>
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
    <!--------------------------------------------------------------------------->

    <!--------------------------------------------------------------------------->
    <br />
    <br />

    <!----------------------------------------------------------------------------------->
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import InputTag from "components/Form/InputTag";
import vSelect from "vue-select";

export default {
  name: "Ville",
  components: {},
  mounted() {},
  computed: {
    ...mapGetters(["Gouvernorat", "Ville", "lengthVille"])
  },
  data() {
    return {
      filter: "",
      checked: false,
      falsetrue: false,
      selectData: [],
      CreateVille: {
        nom: "",
        idGouverorat: "",
        isactive: 0
      },
      UpdateVille: {
        nom: "",
        idGouverorat: "",
        isactive: 0
      }
    };
  },
  created() {},

  methods: {
    ...mapActions(["afficheVille"]),

    showmodal1() {
      this.$refs["modalright_create"].show();
    },
    showmodal_modif(data) {},
    hidemodal1() {
      this.$refs["modalright_create"].hide();
    },
    hidemodal_modif() {
      this.$refs["modalright"].hide();
    },
    submit_creation(nom, icone) {},
    submit_Modification(objet) {},
    submit_delete(objet, index) {}
  }
};
</script>
<style scooped>
.cardd {
  height: 650px;
}
</style>