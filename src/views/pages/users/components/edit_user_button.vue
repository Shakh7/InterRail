<script>

import EditUserModal from '../modals/edit_user.vue'
export default {
    name: 'editUserButton',
    props: {
        userInfo: Object
    },
    computed: {
        userData: {
            get() {
                return this.userInfo
            },
            set() {
                console.log('ss')
            }
        }
    },
    components: {
        EditUserModal
    }
}
</script>

<template>
    <a :href="'#editUser' + userData.id + 'Modal'" data-bs-toggle="modal">
        <i class="ri-pencil-fill align-bottom me-2 text-muted fs-5"></i>
    </a>
    <EditUserModal :userData="userData" />
</template>