<template>
  <main class="home-container">
    <div class="sidebar">
      <CategoryCloud :categories="categories"/>
      <SearchBox />
      <AuthorList :authors="users"/>
      <SiteFooter />
    </div>
    <div class="main-feed">
      <PostList :posts="posts"/>
    </div>
  </main>
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import CategoryCloud from './CategoryCloud';
import SearchBox from './SearchBox';
import AuthorList from './AuthorList';
import SiteFooter from './SiteFooter';
import PostList from './PostList';

export default {
  components: {
    CategoryCloud,
    SearchBox,
    AuthorList,
    SiteFooter,
    PostList
  },
  data() {
    return {
      posts: [],
      users: [],
      categories: [],
      msg: 'Howdy'
    };
  },
  mounted: async function() {
    this.posts = await this.fetchPosts();
    this.users = await this.fetchAuthors();
    this.categories = await this.fetchCategories();
  },
  methods: {
    fetchPosts: async function() {
      const response = await axios.get('/api/posts');
      return response.data;
    },
    fetchAuthors: async function() {
      const response = await axios.get('/api/users');
      return response.data;
    },
    fetchCategories: async function() {
      const response = await axios.get('/api/categories');
      return response.data;
    }
  }
};
</script>

<style>
.home-container {
  display: flex;
  flex-flow: row wrap;
  padding: 0;
}

.home-container > * {
  flex: 1 100%;
  margin-right: 2rem;
}

@media (min-width: 480px) {
  .home-container > .main-feed {
    flex: 4;
  }

  .home-container > .sidebar {
    flex: 1;
    border-right: 2px solid var(--gray-l);
  }
}
</style>
