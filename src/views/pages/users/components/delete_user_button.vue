<script>
import Swal from 'sweetalert2'
import UsersApi from '../../../../api/users/users_api.js'
export default {
    name: 'deleteUserButton',
    props: {
        userId: Number
    },
    methods: {
        deleteUser(id) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#f46a6a",
                confirmButtonColor: "#0ab39c",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.value) {
                    let User = new UsersApi(localStorage.getItem("jwt"))
                    let user = await User.deleteUser(id)
                    console.log(user)
                    if(user.status === 204) {
                        this.$emit('deleteSuccess', true)
                        await Swal.fire("Deleted!", "User has been deleted successfully", "success");
                    }else {
                        await Swal.fire(`Error - ${user.status}`, "An Error Has Occured !", "error");
                    }
                    
                }
            });
        }
    }
}
</script>
<template>
    <i v-if="userId !== $store.state.user.id" class="ri-delete-bin-fill align-bottom text-danger fs-5" @click="deleteUser(userId)"></i>
</template>