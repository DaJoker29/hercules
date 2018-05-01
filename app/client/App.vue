<template>
  <div>
    <header class="site-header">
      <h1>Bullseye</h1>
      <a class="login">Log In</a>
    </header>
    <main>
      <div class="main-feed">
        <div class="post">
          <h2>Love Today Has Gone Digital</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="meta">April 28, 2018 by John Smith</p>
        </div>
        <div class="post">
          <h2>Love Today Has Gone Digital</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p class="meta">April 28, 2018 by John Smith</p>
        </div>
      </div>
      <div class="sidebar">
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
        <div class="search">
          <input 
            class="searchBox" 
            placeholder="Search..."></input>
        </div>
        <div class="authors">
          <ul>
            <li><a href="">John Smith</a></li>
            <li><a href="">Jane Doe</a></li>
            <li><a href="">Phil Collins</a></li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Howdy'
    };
  }
};
</script>
