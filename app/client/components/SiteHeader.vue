<template>
  <header class="site-header">
    <h1 class="site-title"><router-link to="/">{{ getSiteName }}</router-link></h1>
    <div 
      v-if="token.length === 0" 
      class="loggedOut">
      <router-link 
        to="/login">Log In</router-link>
    </div>
    <div 
      v-else 
      class="loggedIn"
    >
      <router-link 
        to="/post/new">Create Post</router-link>
      <a 
        @click="signOut">Log Out</a>
    </div>
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

.site-header > .loggedIn,
.site-header > .loggedOut {
  text-align: right;
}

.loggedIn a,
.loggedOut a {
  cursor: pointer;
  margin-right: 1rem;
}

.router-link-exact-active {
  color: var(--gray-l);
}
</style>
