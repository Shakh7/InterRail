<template>
  <!--  <div class="skeleton">-->
  <!--    <div class="skeleton-left">-->
  <!--      <div class="line h17 w40 m10"></div>-->
  <!--      <div class="line"></div>-->
  <!--      <div class="line h8 w50"></div>-->
  <!--      <div class="line  w75"></div>-->
  <!--    </div>-->
  <!--    <div class="skeleton-right">-->
  <!--      <div class="square"></div>-->
  <!--    </div>-->

  <!--  </div>-->

  <!--  <div class="skeleton">-->
  <!--    <div class="skeleton-left flex1">-->
  <!--      <div class="square"></div>-->
  <!--    </div>-->
  <!--    <div class="skeleton-right flex2">-->
  <!--      <div class="line h17 w40 m10"></div>-->
  <!--      <div class="line"></div>-->
  <!--      <div class="line h8 w50"></div>-->
  <!--      <div class="line  w75"></div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="skeleton bg-white mb-3 p-3 d-flex align-items-center justify-content-start border-2">-->
  <!--    <div class="skeleton-left">-->
  <!--      <div class="square circle"></div>-->
  <!--    </div>-->
  <!--    <div class="skeleton-right">-->
  <!--      <div class="line"></div>-->
  <!--      <div class="line"></div>-->
  <!--    </div>-->
  <!--  </div>-->

  <!--  <div class="skeleton" v-if="circle">-->
  <!--    <div class="square circle"></div>-->
  <!--  </div>-->

  <!--  <div class="skeleton" v-if="line">-->
  <!--    <div class="skeleton-right">-->
  <!--      <div class="line"></div>-->
  <!--    </div>-->
  <!--  </div>-->


  <h2 class="skeleton my-0" v-if="custom_style.length > 0" :style="custom_style"></h2>
  <h2 class="skeleton my-0" v-else style="min-height: 10px"></h2>


</template>

<script>
export default {
  name: "skeleton",
  props: {
    custom_style: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>