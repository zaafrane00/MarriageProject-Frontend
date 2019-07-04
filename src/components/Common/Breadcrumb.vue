<template>
    <span>
      <h1 v-if="heading && heading.length>0">{{ heading }}</h1>
      <b-nav class="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        <h3>  <b-breadcrumb :items="items"/></h3>
      </b-nav>
    </span>
</template>
    

<script>
export default {
  props: ["heading"],
  data() {
    return {
      items: []
    };
  },
  methods: {
    getUrl(path, sub, index) {
      return "/" + path.split(sub)[0] + sub;
    }
  },
  mounted() {
    let path = this.$route.path.substr(1);
    let rawPaths = path.split("/");
    
    for(var pName in this.$route.params) {
      if(rawPaths.includes(this.$route.params[pName])){
        rawPaths= rawPaths.filter(x=>x!=this.$route.params[pName]);
      }
  }
  rawPaths.map((sub, index) => {
      this.items.push({
        text: this.$t( sub),
        to: this.getUrl(path, sub, index)
      });
    });
  }
};
</script>
