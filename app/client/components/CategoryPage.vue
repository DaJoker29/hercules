<template>
  <main>
    <div>
      <PostList :posts="posts"/>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    }
  },
  mounted: async function() {
    this.posts = await this.fetchCategoryPosts();
  },
  methods: {
    fetchCategoryPosts: async function() {
      const response = await axios.get(`/api/category/${this.slug}`);
      return response.data;
    }
  }
};
</script>
