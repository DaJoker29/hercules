<template>
  <main>
    <h3>Log In Here{{ username.length ? ': ' + username : '' }}</h3>
    <h4 v-if="message.length">{{ message }} </h4>
    <input 
      v-model="userInput" 
      type="text"
      placeholder="Enter Username...">

    <transition 
      name="fade" 
      enter-active-class="animated fadeInUp" 
      leave-active-class="animated fadeOutDown">
      <input 
        v-if="userInput.length > 3"
        v-model="passInput"
        type="text" 
        placeholder="Enter Access code..."
        @keyup.enter="authenticate">
    </transition>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      userInput: '',
      passInput: '',
      message: ''
    };
  },
  computed: mapState(['username']),
  methods: {
    ...mapActions(['login']),
    authenticate: async function() {
      try {
        const response = await axios.post('/auth/login', {
          username: this.userInput,
          password: this.passInput
        });
        const { token } = response.data;
        this.login({ token, username: this.userInput });
        this.$router.push('/');
      } catch (e) {
        this.passInput = '';
        this.userInput = '';
        this.message = 'Incorrect username or passcode';
      }
    }
  }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css';
</style>
