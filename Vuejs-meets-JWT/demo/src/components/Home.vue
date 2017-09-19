<template>
  <div>
    <h2>Home</h2>
    <h3 class="green">{{ msg }}</h3>

    <pre>
      <code>
        {{ status }}
      </code>
    </pre>
    <p>
      {{ tokenStatus }}
    </p>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'home',

  data () {
    return {
      user: JSON.parse(window.localStorage.user),
      status: {},
      tokenStatus: ''
    }
  },

  computed: {
    msg () {
      if (!this.user.fullname) { return 'N/A' }

      return `Welcome ${this.user.fullname}!`
    }
  },

  created () {
    this.getStatus()
    this.checkToken()
  },

  methods: {
    getStatus () {
      api.getStatus()
        .then(status => (this.status = status))
    },

    checkToken () {
      api.checkToken()
        .then(tokenStatus => (this.tokenStatus = tokenStatus))
    }
  }
}
</script>

<style lang="css">
</style>
