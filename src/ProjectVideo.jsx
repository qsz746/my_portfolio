export default function ProjectVideo({ project }) {
  if (project.youtubeId) {
    return (
      <figure className={`project-video${project.videoLayout === 'portrait' ? ' project-video-portrait' : ''}`}>
        <div className="youtube-player">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?hl=en&rel=0`}
            title={`${project.title} — video demonstration`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <figcaption>
          <span>Project demonstration</span>
          <a
            href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube ↗
          </a>
        </figcaption>
      </figure>
    )
  }

  if (project.videoLinks?.length) {
    return (
      <div className="project-video-grid">
        {project.videoLinks.map((link, index) => (
          <figure key={link} className="project-video project-video-short">
            <div className="youtube-player youtube-player-short">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${new URL(link).pathname.split('/').pop()}?hl=en&rel=0`}
                title={`${project.title} — short demo ${index + 1}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <figcaption>
              <span>Short demo {index + 1}</span>
              <a href={link} target="_blank" rel="noreferrer">Watch on YouTube ↗</a>
            </figcaption>
          </figure>
        ))}
      </div>
    )
  }

  if (!project.video) return null

  return (
    <video className="project-video" src={project.video} controls playsInline preload="metadata">
      Your browser does not support video playback.
    </video>
  )
}
