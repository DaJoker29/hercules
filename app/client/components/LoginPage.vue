<template>
  <main>
    <h3>Log In Here{{ username.length ? ': ' + username : '' }}</h3>
    <h4 v-if="message.length">{{ message }} </h4>
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
      @keyup.enter="authenticate">
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      input: '',
      message: ''
    };
  },
  computed: mapState(['username']),
  methods: {
    ...mapActions(['setUsername', 'setToken']),
    submitUsername() {
      this.setUsername(this.input);
      this.input = '';
    },
    authenticate: async function() {
      try {
        const response = await axios.post('/auth/login', {
          username: this.username,
          password: this.input
        });
        this.setToken(response.data.token);
        this.$router.push('/');
      } catch (e) {
        this.input = '';
        this.message = 'Incorrect username or passcode';
      }
    }
  }
};
</script>
