<template>
  <transition name="modal">
        <div class="modal-mask modal">
          <div class="modal-wrapper modal-dialog" :class="iconClasses">
            <div class="modal-content">

              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" @click="$emit('close')">&times;</button>
                <slot name="header">
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                </slot>
              </div>

              <div class="modal-footer">
                <button class="btn btn-default" @click="$emit('close')">
                    Cerrar
                </button>
                <slot name="footer">
                </slot>
              </div>
            </div>
          </div>
        </div>
  </transition>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    dismissible: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'info'
    },
    iconClasses: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

/* .modal-wrapper {
  display: table-cell;
  vertical-align: middle;
} */

/* .modal-container {
  width: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
} */

.modal-header h3 {
  margin-top: 0;
  color: #000000;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
