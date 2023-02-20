<template>
  <select class="form-control" style="width: 100%;">
  </select>
</template>

<script>

import $ from 'jquery'
import 'select2'

export default {
  name: 'select2',
  props: ['options', 'value', 'id'],
  template: '#' + this.id,
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ data: this.options })
      .val(this.value)
      .trigger('change')
      // emit event on change.
      .on('change', function () {
        vm.$emit('input', this.value)
        vm.$emit('onChangeSelected', { value: this.value, id: vm.id })
      })
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el).val(value)
    },
    options: function (options) {
      // update options
      $(this.$el)
        .empty()
        .select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el)
      .off()
      .select2('destroy')
  }
}
</script>

<style>
@import '/static/js/plugins/select2/select2.min.css';

.select2-selection {
  border-radius: 0px !important;
  text-align: left !important;
}

.select2-dropdown {
  border-radius: 0px !important;
}
</style>
