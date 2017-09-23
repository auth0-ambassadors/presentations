<script>
  export default {
    name: 'logo',

    props: {
      type: {
        type: String,
        default: 'old'
      }
    }
  }
</script>

<template>
  <div>
    <img v-if="type === 'old'" src="./assets/old-logo.png">
    <img v-else src="./assets/new-logo.png">
  </div>
</template>

<style>
  div {
    text-align: center;
  }

  img {
    max-width: 50%;
  }
</style>
