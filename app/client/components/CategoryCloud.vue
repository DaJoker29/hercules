<template>
  <div class="category-cloud">
    <ul>
      <li 
        v-for="category in categories" 
        :key="category.slug">
        <router-link :to="{ name: 'category', params: { category: category.slug }}">{{ category.label }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.category-cloud > ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  text-align: center;
}

.category-cloud > ul > li {
  flex: 0 0 auto;
  padding: 0.25rem 1rem;
  margin: 0.25rem;
  background-color: var(--gray-l);
  border-radius: 1rem;
  border: 1px var(--gray-d) solid;
}

.category-cloud li:hover {
  background-color: var(--red);
}

.category-cloud li:hover a {
  color: var(--white);
}

.category-cloud a {
  cursor: pointer;
}
</style>
