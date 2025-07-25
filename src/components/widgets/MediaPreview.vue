<template>
  <div class="mailbox-attachment-icon has-img">
    <img v-if="isImage" :src="displayUrl" :alt="extension" />
    <video v-else-if="isVideo" :src="displayUrl" controls width="200px"></video>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import heic2any from 'heic2any'

const props = defineProps({
  material: {
    type: Object,
    required: true
  }
})

const displayUrl = ref(props.material.url)
const extension = String(props.material.type || '').toLowerCase()

const isImage = ['jpg', 'jpeg', 'png', 'heic'].includes(extension)
const isVideo = ['mp4', 'avi', 'mov'].includes(extension)

onMounted(async () => {
  if (extension === 'heic') {
    try {
      const res = await fetch(props.material.url)
      const blob = await res.blob()
      const converted = await heic2any({ blob, toType: 'image/jpeg', quality: 0.9 })
      displayUrl.value = URL.createObjectURL(converted)
    } catch (e) {
      console.error('Error al convertir HEIC:', e)
    }
  }
})
</script>
