<template>
  <div>
  <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                <b-input :placeholder="$t('menu.search')" v-model="search"/>
              </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        boxOne: '',
        boxTwo: ''
      }
    },
    methods: {
      showMsgBoxOne() {
        this.boxOne = ''
        this.$bvModal.msgBoxConfirm('Are you sure?')
          .then(value => {
            this.boxOne = value
          })
          .catch(err => {
            // An error occurred
          })
      },
      showMsgBoxTwo() {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
          })
          .catch(err => {
            // An error occurred
          })
      }
    }
  }
</script>