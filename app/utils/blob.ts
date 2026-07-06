export function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data)
  const byteArrays: Uint8Array[] = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)
    const byteNumbers = Array.from({ length: slice.length })
    for (let i = 0; i < slice.length; i++) byteNumbers[i] = slice.charCodeAt(i)
    byteArrays.push(new Uint8Array(byteNumbers))
  }
  return new Blob(byteArrays, { type: contentType })
}

export function toBlob(base64: string, fileType: string) {
  const bytes = window.atob(base64)
  let n = bytes.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bytes.charCodeAt(n)
  return new Blob([u8arr], { type: fileType })
}

export function url2Blob(src: string, cb: (base64: string) => void) {
  const image = new Image()
  image.src = `${src}?v=${Math.random()}`
  image.crossOrigin = 'Anonymous'
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(image, 0, 0, image.width, image.height)
    cb(canvas.toDataURL('image/png'))
  }
}
