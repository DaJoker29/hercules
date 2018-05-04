<template>
  <header class="site-header">
    <h1 class="site-title"><router-link to="/">{{ getSiteName }}</router-link></h1>
    <router-link 
      v-if="token.length === 0"
      to="/login" 
      class="login">Log In</router-link>
    <a 
      v-else
      class="logout" 
      @click="signOut">Log Out</a>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['token']),
    ...mapGetters(['getSiteName'])
  },
  methods: {
    ...mapActions(['logout']),
    signOut() {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.site-header {
  border-bottom: 2px solid var(--gray-l);
  padding: 0 2rem;
  background-color: var(--black);
  color: var(--white);
  display: grid;
  grid-template-columns: 2fr 1fr;
}

.site-header > * {
  align-self: center;
}

.site-header > .site-title > a {
  font-style: 2rem;
  font-family: var(--font-cursive);
}

.site-header > .login,
.site-header > .logout {
  text-align: right;
  cursor: pointer;
}
</style>
