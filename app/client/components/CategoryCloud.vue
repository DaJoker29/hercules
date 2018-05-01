<template>
  <div class="category-cloud">
    <ul>
      <li><a href="">Essays</a></li>
      <li><a href="">Poetry</a></li>
      <li><a href="">Sci-Fi</a></li>
      <li><a href="">Non-Fiction</a></li>
      <li><a href="">Short Stories</a></li>
      <li><a href="">Fantasy</a></li>
      <li><a href="">Comedy</a></li>
      <li><a href="">Screenwriting</a></li>
    </ul>
  </div>
</template>

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
</style>
