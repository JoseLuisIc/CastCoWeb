<template>
  <div class="converter">
    <h2>Convertir Video a MP4</h2>

    <input type="file" @change="handleFileChange" accept="video/*" />
    <button @click="startConversion" :disabled="isConverting">Convertir a MP4</button>

    <p v-if="conversionStatus" :class="statusClass">{{ conversionStatus }}</p>

    <div v-if="downloadUrl">
      <a :href="downloadUrl" target="_blank" download>Descargar MP4</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedFile: null,
      isConverting: false,
      conversionStatus: '',
      downloadUrl: '',
      statusClass: ''
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0]
      this.conversionStatus = ''
      this.downloadUrl = ''
      this.statusClass = ''
    },

    async startConversion() {
      if (!this.selectedFile) {
        this.conversionStatus = 'Selecciona un archivo de video válido'
        this.statusClass = 'error'
        return
      }

      this.isConverting = true
      this.conversionStatus = 'Creando tarea de conversión...'
      this.statusClass = 'info'

      const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGUxNzdlMmE5OTZlYjBmYmQwYTNkOWQwNGJlZjgzYjcyYzE3NmE4OTJlOTNlZjY3N2VhOWFjMzEzMDJlZTViYTYwNGNjNDMxYWJlMGZiYTIiLCJpYXQiOjE3NDc4OTI3OTkuMzY0MjA1LCJuYmYiOjE3NDc4OTI3OTkuMzY0MjA2LCJleHAiOjQ5MDM1NjYzOTkuMzYxMTQ5LCJzdWIiOiI3MjAwMjQ2MSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSIsIndlYmhvb2sucmVhZCIsIndlYmhvb2sud3JpdGUiLCJwcmVzZXQucmVhZCIsInByZXNldC53cml0ZSJdfQ.LJBRHynrUsIyjNVR6btqkSOy6DfM4dqL9VLuAhF1wyShUKrMwtq-508vXq24q6UCDZTw4DgAJE-5l4OFFTdH9ZbeaScN7yYu26wbKH8j3yeTF-cQfCi7KFbhVnP3FbQRv4dv3rKKX11C99wUl4IpHKsxVlmQkkKCSDyMGpguc5ERsWiKAPwWPZGfvgfck-RRebJG7T0qWnUz_gw7PnAY-txAVahPJwVQS90ISi22cDnrbe58L148lCvcgh7dMq4mbrqUn-ydPdjVG7Z6BVC0UdoDs48dxv4US5_QpYwQAOc1j2meRAxy5SoU44N4SGKXAP_ikEs5VNJ89j3iqB_s-nHDXA-3xVG8TuKd0esn33ftjqPBI3ewZMvXxJltDJojxJnV4Y087jSILefBKQteb325vqJVhB2g4wK6McNAVpT3zpbr8rSrGnebFg7vJOKLQljM3z9LPOpa2aQZUXveWLkB6AQeVvepzE6JZQM_nzsUZdKFRPtSljslL4bYFs9DeHFu4jRC3rHdKcKdqbSF3LjEfsCl6xs3U9IaeQl8ReZm9ydXWACJbQ1zRvn3EcBlyxa7za-wlcbKiVBmO_QQBlyDJ5n4xFDJnjwi3Mz2RDD3FI_j_m2ROUVQsiW_Ch6lWA33bTc_sy-SxELWm_OP1On5DsoYFEu2kZN7YZ1EHvc' // Reemplaza con tu API Key

      try {
        // 1. Crear job con tareas: importar, convertir, exportar
        const jobResponse = await axios.post(
          'https://api.cloudconvert.com/v2/jobs',
          {
            tasks: {
              'import-my-file': {
                operation: 'import/upload'
              },
              'convert-my-file': {
                operation: 'convert',
                input: 'import-my-file',
                output_format: 'mp4'
              },
              'export-my-file': {
                operation: 'export/url',
                input: 'convert-my-file'
              }
            }
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          }
        )

        const jobId = jobResponse.data.data.id
        const uploadTask = jobResponse.data.data.tasks.find(t => t.name === 'import-my-file')

        // 2. Subir archivo al endpoint proporcionado
        const form = new FormData()
        Object.entries(uploadTask.result.form.parameters).forEach(([key, value]) => {
          form.append(key, value)
        })
        form.append('file', this.selectedFile)

        await axios.post(uploadTask.result.form.url, form)

        // 3. Esperar a que el job se complete
        let jobStatus = 'waiting'
        while (jobStatus !== 'finished') {
          const statusResponse = await axios.get(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${apiKey}` }
          })

          jobStatus = statusResponse.data.data.status

          if (jobStatus === 'error') {
            throw new Error('Error durante la conversión')
          }

          if (jobStatus !== 'finished') {
            await new Promise(resolve => setTimeout(resolve, 5000)) // esperar 5 segundos
          }
        }

        // 4. Obtener URL del archivo convertido
        const jobDetails = await axios.get(
          `https://api.cloudconvert.com/v2/jobs/${jobId}`,
          {
            headers: { Authorization: `Bearer ${apiKey}` }
          }
        )

        const exportTask = jobDetails.data.data.tasks.find(t => t.name === 'export-my-file')
        const file = exportTask.result.files[0]

        this.downloadUrl = file.url
        this.conversionStatus = 'Conversión completada 🎉'
        this.statusClass = 'success'
      } catch (error) {
        console.error(error)
        this.conversionStatus = 'Error en la conversión'
        this.statusClass = 'error'
      } finally {
        this.isConverting = false
      }
    }
  }
}
</script>

<style scoped>
.converter {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px
}

input {
  margin-bottom: 1rem
}

button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer
}

button:disabled {
  background-color: #ccc
}

p.success {
  color: green
}

p.error {
  color: red
}

p.info {
  color: #2196f3
}
</style>
