<script>
export default {
    name: 'UpdateSmgsButton',
    emits: {
        onUpdateBtnClicked: null
    },
    props: {
        train: {
            type: Object
        }
    },
    methods : {
        onUpdateBtnClicked () {
            this.$emit('onUpdateBtnClicked', this.train )
        }
    }
}
</script>

<template>
    <a href="#UpdateSmgsModal" data-bs-toggle="modal" class="text-dark px-1 mx-1" 
        @click="onUpdateBtnClicked">
        <font-awesome-icon icon="fa-regular fa-pen-to-square" class="c_icon_hoverable c_icon " />
    </a>
</template>