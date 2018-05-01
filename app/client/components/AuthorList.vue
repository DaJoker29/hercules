<template>
  <div class="authors">
    <h4>Authors</h4>
    <ul>
      <li><a href="">John Smith</a></li>
      <li><a href="">Jane Doe</a></li>
      <li><a href="">Phil Collins</a></li>
    </ul>
  </div>
</template>

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
