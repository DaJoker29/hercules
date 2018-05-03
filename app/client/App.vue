<template>
  <body>
    <SiteHeader :title="getSiteName" />
    <div class="app-container">
      <div 
        v-if="isLoading" 
        class="loading">
        Loading...
      </div>
      <router-view/>
    </div>
  </body>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import SiteHeader from './components/SiteHeader';

export default {
  components: {
    SiteHeader
  },
  computed: {
    ...mapGetters(['isLoading', 'getSiteName'])
  },
  created() {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      axios.defaults.headers.common['Authorization'] = `bearer ${savedToken}`;
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Crimson+Text|Noto+Sans:400,700|Permanent+Marker');
:root {
  --white: #dedede;
  --black: #000000;
  --gray-d: #595959;
  --gray-l: #b0b0b0;
  --red: #481b1b;
  --font-serif: 'Crimson Text', serif;
  --font-sans: 'Noto Sans', sans-serif;
  --font-cursive: 'Permanent Marker', cursive;
}

html {
  font: 100%/1.2 var(--font-serif);
  margin: 0;
  padding: 0;
  background-color: var(--white);
  color: var(--black);
}

body {
  padding: 0;
  margin: 0;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-sans);
  font-weight: bold;
}

a {
  font-family: var(--font-sans);
  color: var(--red);
  text-decoration: none;
  transition: 0.2s;
}

a:hover {
  color: var(--gray-d);
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

input {
  margin: 1rem 0;
  border: 0;
  background: none;
  font-size: 1.3rem;
  font-weight: bold;
}

.app-container > * {
  margin: 2rem;
}
</style>
