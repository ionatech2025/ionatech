import { ExternalLink, FolderKanban } from 'lucide-react';
import { useContent, mergeBySlug } from '../../lib/api';
import { getIcon } from '../../data/iconRegistry';
import { projects as projectsFallback } from '../../data/projects';
import './Projects.css';

const STATUS_LABEL = {
  live: 'Live',
  ongoing: 'Ongoing',
  completed: 'Completed',
};

function ProjectCard({ project }) {
  const Icon = getIcon(project.iconName) || FolderKanban;
  const statusLabel = STATUS_LABEL[project.status] || project.status;

  return (
    <article className="projects-card ion-card">
      <div className="projects-card-top">
        <div className="projects-card-icon ion-icon-tile">
          {project.image ? (
            <img src={project.image} alt="" loading="lazy" decoding="async" className="projects-card-thumb" />
          ) : (
            <Icon size={20} />
          )}
        </div>
        {statusLabel && <span className="projects-status-pill">{statusLabel}</span>}
      </div>

      <h3 className="projects-card-title">{project.title}</h3>
      {project.client && <p className="projects-card-client">{project.client}</p>}
      {project.description && <p className="projects-card-description">{project.description}</p>}

      {project.techStack?.length > 0 && (
        <div className="projects-card-tags">
          {project.techStack.map((t) => (
            <span key={t} className="projects-card-tag">{t}</span>
          ))}
        </div>
      )}

      {project.projectUrl && (
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="projects-card-link"
        >
          Visit project
          <ExternalLink size={14} />
        </a>
      )}
    </article>
  );
}

export default function Projects() {
  const projects = useContent('projects', projectsFallback);
  const merged = mergeBySlug(projects, projectsFallback);

  if (!merged || merged.length === 0) return null;

  return (
    <section className="projects-section ion-section" aria-labelledby="projects-heading">
      <div className="ion-aurora" aria-hidden="true" />
      <div className="ion-aurora ion-aurora-right" aria-hidden="true" />

      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-badge ion-badge">
            <span className="ion-live-dot" />
            Ongoing work
          </span>
          <h2 id="projects-heading" className="projects-heading">
            Projects we've <span className="ion-heading-accent">shipped and are shipping</span>
          </h2>
          <p className="projects-subtitle ion-copy">
            A running list of client platforms iONA TECH has built and deployed — live links included.
          </p>
        </div>

        <div className="projects-grid">
          {merged.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
