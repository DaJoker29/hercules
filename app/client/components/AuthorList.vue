<template>
  <div class="authors">
    <h4>Authors</h4>
    <ul>
      <li 
        v-for="author in authors" 
        :key="author._id">
        <router-link :to="{ name: 'author', params: { username: author.username}}">{{ author.displayName || author.username }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    authors: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.authors li {
  margin: 1rem;
}

.authors a {
  color: var(--black);
  text-decoration: underline;
}

.authors a:hover {
  color: var(--red);
}
</style>
