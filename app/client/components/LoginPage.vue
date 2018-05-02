<template>
  <main>
    <h3>Log In Here{{ username.length ? ': ' + username : '' }}</h3>
    <input 
      v-if="!username.length"
      v-model="input" 
      type="text"
      placeholder="Enter Username..."
      @keyup.enter="setUsername">

    <input 
      v-if="username.length" 
      type="text" 
      placeholder="Enter Access code...">
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      input: '',
      password: ''
    };
  },
  methods: {
    setUsername: function() {
      this.username = this.input;
      this.input = '';
    }
  }
};
</script>
