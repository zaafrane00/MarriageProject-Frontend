<template>
  <div>
    <link
      href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
      rel="stylesheet"
    />

    <div
      :class="{'search':true, 'mobile-view':isMobileSearch} "
      ref="searchContainer"
      @mouseenter="isSearchOver=true"
      @mouseleave="isSearchOver=false"
    >
      <div class="container-2">
        <span class="icon search-icon" @click="searchClick">
          <i class="simple-icon-magnifier"></i>
        </span>
        <input type="search" id="search" placeholder="  Rechercher" />
      </div>
    </div>
  </div>
</template>
<script>
import { MenuIcon, MobileMenuIcon } from "components/Svg";
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  searchPath,
  menuHiddenBreakpoint,
  localeOptions,
  buyUrl
} from "constants/config";
export default {
  name: "test",
  components: {
    MenuIcon,
    MobileMenuIcon
  },
  data() {
    return {
      selectedParentMenu: "",
      searchKeyword: "",
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuForMobile"]),
    search() {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`);
      this.searchKeyword = "";
    },
    searchClick() {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true;
        } else {
          this.search();
          this.isMobileSearch = false;
        }
      } else {
        this.search();
      }
    }
  }
};
</script>

<style scooped>
.container-2 {
  width: 300px;
  vertical-align: middle;
  white-space: nowrap;
  position: relative;
}
.container-2 input#search {
  width: 50px;
  height: 50px;
  background: #2b303b;
  border: none;
  font-size: 10pt;
  float: left;
  color: #262626;
  padding-left: 35px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  color: #f8f8f8;
  background-color: #f8f8f8;
  -webkit-transition: width 0.55s ease;
  -moz-transition: width 0.55s ease;
  -ms-transition: width 0.55s ease;
  -o-transition: width 0.55s ease;
  transition: width 0.55s ease;
  border-radius: 50%;
  text-align: center;
}
.container-2 input#search::-webkit-input-placeholder {
  color: #65737e;
}

.container-2 input#search:-moz-placeholder {
  /* Firefox 18- */
  color: #65737e;
}

.container-2 input#search::-moz-placeholder {
  /* Firefox 19+ */
  color: #65737e;
}

.container-2 input#search:-ms-input-placeholder {
  color: #65737e;
}
.container-2 .icon {
  position: absolute;
  top: 50%;
  margin-left: 17px;
  margin-top: 17px;
  z-index: 1;
  color: #4f5b66;
  width: 30px;
}
.container-2 input#search:focus,
.container-2 input#search:active {
  outline: none;
  color: black;
  width: 300px;
  background-color: #f8f8f8;
  border-radius: 30px;
}

.container-2:hover input#search {
  width: 300px;
  background-color: #f8f8f8;
  color: #262626;

  border-radius: 30px;
}
@media screen and (max-width: 768px) {
  .container-2 {
    display: none;
  }
}
/*.container-2:hover .icon {
}*/
</style>