<template>
  <main class="home-container">
    <div class="sidebar">
      <CategoryCloud />
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
import { mapActions } from 'vuex';
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
      msg: 'Howdy'
    };
  },
  mounted: async function() {
    this.posts = await this.fetchPosts();
    this.users = await this.fetchAuthors();
  },
  methods: {
    ...mapActions(['addPending', 'removePending', 'clearPending']),
    fetchPosts: async function() {
      this.addPending();
      const response = await axios.get('/api/posts');
      this.removePending();
      return response.data;
    },
    fetchAuthors: async function() {
      this.addPending();
      const response = await axios.get('/api/users');
      this.removePending();
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
