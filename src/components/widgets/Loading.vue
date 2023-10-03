<template>
    <div class="mask-loading" v-if="isLoading">
        <div class="center-loading">
            <div class="loading">
                <i class="fa fa-refresh fa-spin"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.mask-loading {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*background-color: rgba(0, 0, 0, 0.5);*/
    display: table;
    transition: opacity 0.3s ease;
}
.center-loading {
  font-size: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loading {
  height: 100px;
  width: 100px;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
}
</style>
