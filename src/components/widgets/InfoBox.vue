<template>
  <div class="info-box">
    <!-- small box -->
    <div :class="['small-box', colorClass]">
      <div class="inner">
        <h3>{{ number }}</h3>
        <p>{{ text }}</p>
      </div>
      <div class="icon">
        <i :class="iconClasses"></i>
      </div>
      <router-link class="small-box-footer" :to="link">
          Ver más <i :class="iconClasses"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBox',
  props: {
    text: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      default: ''
    },
    iconClasses: {
      type: Array,
      default: []
    },
    colorClass: {
      type: String,
      default: 'bg-default'
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>
