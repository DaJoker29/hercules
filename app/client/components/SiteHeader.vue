<template>
  <header class="site-header">
    <h1 class="site-title"><router-link to="/">{{ title }}</router-link></h1>
    <router-link 
      to="login" 
      class="login">Log In</router-link>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Default Title'
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

.site-header > .login {
  text-align: right;
}
</style>
