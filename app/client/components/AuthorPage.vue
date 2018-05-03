<template>
  <main>
    <h2>
      {{ author.displayName || author.username || 'Nobody found' }}
    </h2>
    <div>
      <PostList :posts="posts"/>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import PostList from './PostList';

export default {
  components: {
    PostList
  },
  data() {
    return {
      author: {},
      posts: []
    };
  },
  mounted: async function() {
    const { user, posts } = await this.fetchAuthor(this.$route.params.username);
    [this.author] = user;
    this.posts = posts;
  },
  methods: {
    fetchAuthor: async function(username) {
      try {
        const response = await axios.get(`/api/user/${username}`);
        return response.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
