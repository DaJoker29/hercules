<template>
  <div class="post">
    <h2>{{ post.title }}</h2>
    <div class="post-content">
      <p>{{ post.excerpt }}</p>
    </div>
    <p class="meta">{{ formatDate(post.created) }} by <a>{{ post.author.displayName || post.author.username }}</a></p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      moment
    };
  },
  methods: {
    formatDate: function(date, format = 'MMMM do YYYY') {
      return moment(date).format(format);
    }
  }
};
</script>

<style scoped>
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
</style>
