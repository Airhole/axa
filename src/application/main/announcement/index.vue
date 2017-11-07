<template>
  <div>
    <h3>I'm Hello.vue</h3>
  </div>
</template>
<script>
import {IDEMO, ILOGIN} from '@/api'
export default {
  name: 'announcement',
  components: {},
  data () {
    return {
    }
  },
  methods: {
    ajaxDemo () {
      this.axios.get(IDEMO).then((response) => {
        console.log(response)
      }, (response) => {
      }).catch((err) => {
        console.log(err)
        throw new Error(err)
      })
    },
    ajaxDemo1 () {
      this.axios.get(ILOGIN).then((response) => {
        console.log(response)
      }, (response) => {
      }).catch((err) => {
        console.log(err)
        throw new Error(err)
      })
    }
  }
}
</script>
