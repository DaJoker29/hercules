<template>
  <body>
    <SiteHeader :title="config.name" />
    <main class="main-container">
      <div class="sidebar">
        <CategoryCloud />
        <SearchBox />
        <AuthorList />
        <SiteFooter />
      </div>
      <div class="main-feed">
        <PostList :posts="posts"/>
      </div>
    </main>
  </body>
</template>

<script>
import SiteHeader from './components/SiteHeader';
import CategoryCloud from './components/CategoryCloud';
import SearchBox from './components/SearchBox';
import AuthorList from './components/AuthorList';
import SiteFooter from './components/SiteFooter';
import PostList from './components/PostList';

const posts = [
  {
    id: 1,
    title: 'Title One',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit voluptatibus similique placeat, asperiores nobis accusamus obcaecati ab consectetur rerum, sequi modi, delectus minus reiciendis velit illo sint in. Beatae, quaerat?',
    createdAt: Date.now(),
    author: 'John Smith'
  },
  {
    id: 2,
    title: 'Title One',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit voluptatibus similique placeat, asperiores nobis accusamus obcaecati ab consectetur rerum, sequi modi, delectus minus reiciendis velit illo sint in. Beatae, quaerat?',
    createdAt: Date.now(),
    author: 'John Smith'
  },
  {
    id: 3,
    title: 'Title One',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit voluptatibus similique placeat, asperiores nobis accusamus obcaecati ab consectetur rerum, sequi modi, delectus minus reiciendis velit illo sint in. Beatae, quaerat?',
    createdAt: Date.now(),
    author: 'John Smith'
  },
  {
    id: 4,
    title: 'Title One',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit voluptatibus similique placeat, asperiores nobis accusamus obcaecati ab consectetur rerum, sequi modi, delectus minus reiciendis velit illo sint in. Beatae, quaerat?',
    createdAt: Date.now(),
    author: 'John Smith'
  }
];

export default {
  components: {
    SiteHeader,
    CategoryCloud,
    SearchBox,
    AuthorList,
    SiteFooter,
    PostList
  },
  data() {
    return {
      posts,
      msg: 'Howdy',
      config: process.env.SITE_CONFIG
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
