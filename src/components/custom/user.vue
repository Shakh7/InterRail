<template>
  <div class="d-flex align-items-center justify-content-end" v-if="avatar">
    <div class="flex-shrink-0 me-2" :class="'avatar-' + avatarSize">
      <div class="avatar-title rounded-circle"
           :class="'bg-soft-' + avatarBgColor + ' text-' + avatarBgColor">
        {{ user.full_name.split(' ').map(name => name[0]).join('') }}
      </div>
    </div>
    {{ user.full_name }}
  </div>
  <span v-else>
    {{ user.full_name }}
  </span>
</template>

<script>
import store from '../../state/store.js'

export default {
  name: "user",
  props: {
    userId: {
      type: Number,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    avatarBgColor: {
      type: String,
      default: "success",
    },
    avatarSize: {
      type: String,
      default: "xs",
    },
  },
  computed: {
    user: {
      get() {
        return store.state.users_list.map(i => i.id).includes(this.userId)
            ? store.state.users_list.find(user => user.id === this.userId)
            : { full_name: "Unknown" };
      },
    },
  },
}
</script>

<style scoped>

</style>