<template>
  <ul class="pagination pagination-sm pagination-separated my-0">
    <li class="page-item"
        :class="{ 'disabled' : pagination.ratio === 1 || pagination.current === 1 }">
      <router-link class="page-link" :to="'?page=' + (pagination.current - 1)">
        {{ prev_text }}
      </router-link>
    </li>

    <li v-for="page in pagination.ratio" :key="page"
        class="page-item" :class="{ 'active' : page === pagination.current }"
    >
      <router-link class="page-link" :to="'?page=' + page">
        {{ page }}
      </router-link>
    </li>

    <li class="page-item" :class="{ 'disabled' : pagination.ratio === 1 || pagination.current === pagination.ratio }">
      <router-link class="page-link" :to="'?page=' + (pagination.current + 1)">
        {{ next_text }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['page_change', 'current_page'],
  name: "pagination",
  data() {
    return {
      current_page: 1
    }
  },
  props: {
    page_count: {
      type: Number,
      default: () => 0
    },
    per_page: {
      type: Number,
      default: () => 10
    },
    prev_text: {
      type: String,
      default: () => 'Prev'
    },
    next_text: {
      type: String,
      default: () => 'Next'
    }
  },
  computed: {
    pagination: {
      get() {
        return {
          current: this.current_page,
          count: this.page_count,
          per: this.per_page,
          ratio: Math.ceil(this.page_count / this.per_page)
        }
      }
    }
  },
  mounted() {
    try {
      this.current_page = this.$route.query.page === undefined ? 1 : Math.ceil(this.$route.query.page)
    } catch {
      this.current_page = 1
    }
    this.$emit('current_page', Math.ceil(this.$route.query.page))
  },
  watch: {
    "$route.query": function () {
      this.current_page = Math.ceil(this.$route.query.page)
      this.$emit('page_change', this.$route.query.page)
    },
  },
}
</script>

<style scoped>

</style>