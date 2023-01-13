<script>
import Swal from "sweetalert2";
export default {
    name: 'DeleteSmgsButton',
    emits: {
        onTrainDeleted: null,
    },
    data() {
        return {
            numberOfErrors: 0
        }
    },
    props: {
        train: Object,
    },
    methods: {
        onDeleteClicked(train) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `You are about to delete ${(train.name).toString().toUpperCase()}`,
                text: 'Deleting your train will remove all of its information from our database.',
                showDenyButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Yes, Delete It',
                denyButtonText: 'Cancel',
                cancelButtonColor: 'transparent',
                focusConfirm: false,
                inputLabel: `Please type ${(train.name).toString().toUpperCase()} to confirm`,
                input: 'email',
                inputPlaceholder: `${(train.name).toString().toUpperCase()}`,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value === (train.name).toString().toUpperCase()) {
                            resolve(this.deleteTrain(train.id))
                        } else {
                            resolve('Train name did not match :)')
                        }
                    })
                }
            });
        },

        deleteTrain(trainId) {
            fetch(`${process.env.VUE_APP_SMGS_URL}/v1/train/${trainId}`, {
                method: 'DELETE',
            }).then(response => {
                console.log(response)
                if (response.status === 204) {
                    this.$emit('onTrainDeleted', true)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Train has been deleted successfully',
                        showConfirmButton: false,
                        timer: 3000
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'An error occured while deleting train',
                        showConfirmButton: false,
                    })
                }
            }).catch(error => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `ERROR \n ${error}`,
                    showConfirmButton: true,
                    confirmButtonText: 'Try Again',
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (this.numberOfErrors >= 2) {
                            Swal.fire({
                                position: 'center',
                                icon: 'warning',
                                title: `Too Many Tries...\nPlease, talk to IT department to fix the proplem`,
                                showConfirmButton: false,
                                timer: 10000,
                                willClose: () => {
                                    window.location.reload()
                                }
                            })
                        } else {
                            this.numberOfErrors += 1
                            this.deleteTrain(trainId)
                        }
                    }
                })
                console.log(error)
            })
        }
    }
}                                       
</script>

<template>
    <a class="px-1 mx-1" @click="onDeleteClicked(train)">
        <font-awesome-icon icon="fa-solid fa-trash" class="delete_icon c_icon_hoverable text-danger" />
    </a>
</template>