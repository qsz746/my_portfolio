import { projects } from './projects'
import { profile } from './profile'
import { useState } from 'react'
import ProjectVideo from './ProjectVideo'
import ImageViewer from './ImageViewer'
import './App.css'

const galleryImages = projects.flatMap(project => project.images.map(image => ({ ...image, projectTitle: project.title })))

function ProfileLink({ href, label, primary = false }) {
  const className = `profile-link${primary ? ' profile-link-primary' : ''}`
  const content = <><span>{label}</span><span aria-hidden="true">↗</span></>

  return href
    ? <a className={className} href={href} target="_blank" rel="noreferrer">{content}</a>
    : <button className={className} type="button" disabled title={`${label} link coming soon`}>{content}</button>
}

function ProjectPhoto({ image, onOpen }) {
  return (
    <figure className={`project-photo${image.layout === 'portrait' ? ' project-photo-portrait' : ''}`}>
      <button className="photo-trigger" type="button" onClick={() => onOpen(image.src)} aria-haspopup="dialog" aria-label={`Enlarge ${image.title || image.alt}`}>
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        <span className="photo-zoom" aria-hidden="true">
          View image
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
          </svg>
        </span>
      </button>
      <figcaption>{image.title || image.alt}</figcaption>
    </figure>
  )
}

function ProjectSection({ project, onOpenImage }) {
  const [mainImage, ...detailImages] = project.images
  const hasVideo = Boolean(project.youtubeId || project.videoLinks?.length || project.video)

  return (
    <article className="project-section" id={`project-${project.id}`} aria-labelledby={`project-title-${project.id}`}>
      <div className="project-heading">
        <p className="project-category">
          <span>{project.id} / {project.category}</span>
          {project.period && <span>{project.period}</span>}
        </p>
        <h2 id={`project-title-${project.id}`}>{project.title}</h2>
        <p className="project-subtitle">{project.subtitle}</p>
      </div>
      <div className={`project-row project-overview${mainImage ? '' : ' project-overview-text'}`}>
        {mainImage && <ProjectPhoto image={mainImage} onOpen={onOpenImage} />}
        <div className="project-copy">
          <p className="project-description">{project.description}</p>
          <ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
          <p className="project-tools">{project.tags.join(' · ')}</p>
          {project.github && (
            <a className="repo-link" href={project.github} target="_blank" rel="noreferrer">
              View source on GitHub ↗
            </a>
          )}
        </div>
      </div>
      {hasVideo && (
        <div className="project-row project-demo">
          <div className="media-copy">
            <h3>{project.videoTitle || 'Project demonstration'}</h3>
            {project.videoDescription && <p>{project.videoDescription}</p>}
          </div>
          <ProjectVideo project={project} />
        </div>
      )}
      {detailImages.map(image => (
        <div className="project-row project-detail" key={image.src}>
          <ProjectPhoto image={image} onOpen={onOpenImage} />
          <div className="media-copy">
            <h3>{image.title || 'A closer look'}</h3>
            <p>{image.description || image.alt}</p>
          </div>
        </div>
      ))}
    </article>
  )
}

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? null)

  function openImage(src) {
    const index = galleryImages.findIndex(image => image.src === src)
    if (index !== -1) setSelectedImage(index)
  }

  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <a className="current" href="#projects">Projects</a>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>
      <main>
        <section className="profile-intro" aria-label="Profile">
          <div>
            <h1>{profile.name}</h1>
            <p>{profile.headline}</p>
          </div>
          <div className="profile-links">
            <ProfileLink href={profile.linkedinUrl} label="LinkedIn" />
            <ProfileLink href={profile.resumeUrl} label="Résumé" primary />
          </div>
        </section>
        <section id="projects" className="projects" aria-labelledby="projects-title">
          <div className="section-title">
            <h2 id="projects-title">Projects</h2>
          </div>

          <div className="project-cards" aria-label="Project overview cards">
            {projects.map(project => {
              const primaryImage = project.images[0]
              const isSelected = selectedProjectId === project.id

              return (
                <a
                  key={project.id}
                  href={`#project-${project.id}`}
                  className={`project-card${isSelected ? ' project-card-active' : ''}`}
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  {primaryImage && (
                    <div className="project-card-media">
                      <img src={primaryImage.src} alt={primaryImage.alt} loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="project-card-copy">
                    <h3>{project.title}</h3>
                    {project.subtitle && <p>{project.subtitle}</p>}
                  </div>
                  <span className="project-card-action">More Details</span>
                </a>
              )
            })}
          </div>

          <div className="project-list">
            {projects.map(project => <ProjectSection project={project} key={project.id} onOpenImage={openImage} />)}
          </div>
        </section>
      </main>
      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#">Back to top ↑</a>
      </footer>
      {selectedImage !== null && (
        <ImageViewer images={galleryImages} initialIndex={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  )
}

export default App
