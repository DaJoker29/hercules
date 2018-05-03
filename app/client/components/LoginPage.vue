<template>
  <main>
    <h3>Log In Here{{ username.length ? ': ' + username : '' }}</h3>
    <input 
      v-if="!username.length"
      v-model="input" 
      type="text"
      placeholder="Enter Username..."
      @keyup.enter="submitUsername">

    <input 
      v-if="username.length"
      v-model="input"
      type="text" 
      placeholder="Enter Access code..."
      @keyup.enter="submitAccessCode">
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      input: ''
    };
  },
  computed: mapState(['username']),
  methods: {
    ...mapActions(['setUsername']),
    submitUsername() {
      this.setUsername(this.input);
      this.input = '';
    },
    submitAccessCode() {}
  }
};
</script>
