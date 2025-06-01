/**
 * Comprime una imagen usando Canvas API
 * @param {File} file - Archivo de imagen
 * @param {number} quality - Calidad (0 - 1)
 * @param {number} maxWidth - Ancho máximo
 * @param {number} maxHeight - Alto máximo
 * @returns {Promise<File>} - Imagen comprimida
 */
async function compressImage(file, quality = 0.7, maxWidth = 1024, maxHeight = 1024) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      let { width, height } = img

      if (width > maxWidth || height > maxHeight) {
        const scaleFactor = Math.min(maxWidth / width, maxHeight / height)
        width *= scaleFactor
        height *= scaleFactor
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => resolve(new File([blob], `compressed-${file.name}`, { type: blob.type })),
        'image/jpeg',
        quality
      )
    }

    img.onerror = (error) => reject(error)
  })
}
export { compressImage }
