<template>
  <div id="app">
    <logo type="new"></logo>
    <input type="text" v-model="msg">
    <h1> {{ msg }} </h1>
    <button @click="toggleModal"> Open Modal</button>
    <modal v-show="showModal" :msg="msg" @close="toggleModal"></modal>
  </div>
</template>

<script>
import Logo from './Logo.vue'
import Modal from './Modal.vue'

export default {
  name: 'app',

  components: { Logo, Modal },

  data () {
    return {
      msg: 'Hello Warsaw 🇵🇱!',
      showModal: false
    }
  },

  methods: {
    toggleModal () {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style>
  body {
    background-color: #F4F4F4;
    font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    width: 100%;
  }

  h1, input {
    font-weight: 300;
    margin: 0;
    font-size: 3.2em;
    color: #2c3e50;
  }

  h1:hover {
    cursor: pointer;
    opacity: 0.7;
  }

  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
</style>
