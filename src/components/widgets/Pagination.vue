<template>
  <div>
    <div class="pull-left" style="padding: 20px;">Mostrando {{ calculatePage }} a {{ calculateEndPage }} de {{ count }}
      entradas</div>
    <div class="pull-right">
      <ul class="pagination">
        <li class="pagination-item" :disabled="isInFirstPage">
          <a type="button" @click="onClickPreviousPage">
            Anterior
          </a>
        </li>
        <li v-for="page in pages" class="pagination-item" :class="{ active: isPageActive(page.name) }">
          <a type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled">
            {{ page.name }}
          </a>
        </li>
        <li class="pagination-item" :disabled="isInLastPage">
          <a type="button" @click="onClickNextPage">
            Siguiente
          </a>
        </li>
        <!-- <li class="pagination-item" :disabled="isInLastPage">
        <a type="button" @click="onClickLastPage">
          Ultimo
        </a>
      </li> -->
      </ul>
    </div>
  </div>

</template>
<script>
export default {
  name: 'pagination',
  template: 'pagination',
  props: {
    count: {
      type: Number, // Aquí estamos diciendo que `count` debe ser de tipo `Number`.
      default: 0 // Y su valor por defecto será `0`.
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage() {
      if (this.currentPage <= 2) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }
      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }
      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
    calculatePage() {
      if (this.currentPage === 1) {
        return 1
      }
      return this.perPage * (this.currentPage - 1) + 1
    },
    calculateEndPage() {
      if (this.currentPage === this.totalPages) {
        return this.count
      }
      return this.perPage * this.currentPage
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      if (this.currentPage >= 1) {
        this.$emit('pagechanged', this.currentPage - 1)
      }
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      if (this.totalPages > this.currentPage) {
        this.$emit('pagechanged', this.currentPage + 1)
      }
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    }
  }
}
</script>

<style>
.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover {
  z-index: 3;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}
</style>
