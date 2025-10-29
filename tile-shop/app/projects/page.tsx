import Link from 'next/link';
import { mockProjects } from '@/lib/data';
import { MapPin, Calendar } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Project Gallery</h1>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Get inspired by real-world installations featuring our premium tiles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <div className="group bg-[var(--color-bg-secondary)] rounded-xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-xl)] transition-shadow">
              <div className="relative aspect-video bg-[var(--color-bg-tertiary)]">
                <div className="absolute inset-0 bg-[var(--color-accent-emerald)]/0 group-hover:bg-[var(--color-accent-emerald)]/10 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-[var(--color-text-tertiary)]">
                  <span className="px-3 py-1 bg-[var(--color-accent-emerald)]/10 text-[var(--color-accent-emerald)] rounded-full">
                    {project.style}
                  </span>
                  <span className="px-3 py-1 bg-[var(--color-bg-tertiary)] rounded-full">
                    {project.room}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-[var(--color-accent-emerald)] transition-colors">
                  {project.title}
                </h2>
                <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
