<template>
  <select ref="select" class="form-control" style="width: 100%;"></select>
</template>

<script>
import $ from 'jquery'
import 'select2'

export default {
  name: 'select2',
  props: ['options', 'value', 'id'],
  mounted: function () {
    const vm = this

    // Inicializar select2
    $(this.$refs.select)
      .select2({ data: this.options })
      .val(this.value)
      .trigger('change')
      .on('change', function () {
        vm.$emit('input', this.value)
        vm.$emit('onChangeSelected', { value: this.value, id: vm.id })
      })
  },
  watch: {
    value: function (value) {
      // Actualizar el valor del select
      $(this.$refs.select).val(value).trigger('change')
    },
    options: function (options) {
      // Actualizar las opciones de select2
      $(this.$refs.select)
        .empty()
        .select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$refs.select)
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
