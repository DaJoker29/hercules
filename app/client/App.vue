<template>
  <body>
    <header class="site-header">
      <h1 class="site-title">Bulls-eye</h1>
      <a class="login">Log In</a>
    </header>
    <main class="main-container">
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
            placeholder="Search...">
        </div>
        <div class="authors">
          <h4>Authors</h4>
          <ul>
            <li><a href="">John Smith</a></li>
            <li><a href="">Jane Doe</a></li>
            <li><a href="">Phil Collins</a></li>
          </ul>
        </div>
        <footer class="site-footer">Copyright &copy; 2018 - Zero Daedalus</footer>
      </div>
      <div class="main-feed">
        <div class="post">
          <h2>Love Today Has Gone Digital</h2>
          <div class="post-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <p class="meta">April 28, 2018 by <a>John Smith</a></p>
        </div>
        <div class="post">
          <h2>Love Today Has Gone Digital</h2>
          <div class="post-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <p class="meta">April 28, 2018 by <a>John Smith</a></p>
        </div>
      </div>
    </main>
  </body>
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

.site-header > .site-title {
  font-style: 2rem;
  font-family: var(--font-cursive);
}

.site-header > .login {
  text-align: right;
}

.post {
  border-bottom: 2px solid var(--gray-l);
}

.post-content {
  text-indent: 2rem;
}

.post .meta {
  text-align: right;
  color: var(--gray-d);
  font-family: var(--font-sans);
}

.main-container {
  display: flex;
  flex-flow: row wrap;
  padding: 0;
}

.main-container > * {
  flex: 1 100%;
}

.main-feed,
.sidebar {
  margin: 2rem 0;
  padding: 0 2rem;
}

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

.site-footer {
  font-size: 0.8rem;
  color: var(--gray-d);
  margin-top: 2rem;
}

@media (min-width: 480px) {
  .main-container > .main-feed {
    flex: 4;
  }

  .main-container > .sidebar {
    flex: 1;
    border-right: 2px solid var(--gray-l);
  }
}
</style>
