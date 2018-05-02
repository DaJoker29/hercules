<template>
  <main class="main-container">
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
    this.loading = true;
    this.posts = await this.fetchPosts();
    this.users = await this.fetchAuthors();
    this.loading = false;
  },
  methods: {
    fetchPosts: async function() {
      const response = await axios.get('/api/posts');
      return response.data;
    },
    fetchAuthors: async function() {
      const response = await axios.get('/api/users');
      return response.data;
    }
  }
};
</script>
