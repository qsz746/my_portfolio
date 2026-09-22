import { useEffect, useRef, useState } from 'react'

export default function ImageViewer({ images, initialIndex, onClose }) {
  const dialogRef = useRef(null)
  const [index, setIndex] = useState(initialIndex)
  const image = images[index]

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  function changeImage(direction) {
    setIndex(current => (current + direction + images.length) % images.length)
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      changeImage(event.key === 'ArrowRight' ? 1 : -1)
    }
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
  }

  return (
    <dialog
      className="image-viewer"
      ref={dialogRef}
      aria-labelledby="viewer-title"
      onCancel={event => { event.preventDefault(); onClose() }}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <div className="viewer-header">
        <div>
          <h2 id="viewer-title">{image.title || 'Project image'}</h2>
          <p className="viewer-counter" aria-live="polite">{image.projectTitle} · {index + 1} / {images.length}</p>
        </div>
        <button className="viewer-close" type="button" onClick={onClose}>Close <span aria-hidden="true">×</span></button>
      </div>
      <figure className="viewer-figure">
        <img key={image.src} src={image.src} alt={image.alt} />
        <figcaption>{image.alt}</figcaption>
      </figure>
      <div className="viewer-controls">
        <button className="viewer-previous" type="button" onClick={() => changeImage(-1)} disabled={images.length < 2}>← Previous</button>
        <a className="viewer-original" href={image.src} target="_blank" rel="noreferrer">Open original ↗</a>
        <button className="viewer-next" type="button" onClick={() => changeImage(1)} disabled={images.length < 2}>Next →</button>
      </div>
    </dialog>
  )
}
