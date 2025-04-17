import { useState } from 'react';
import './App.css'
import Timeline from './components/Timeline';
import UseCaseCategoryChart from './components/UseCaseCategoryChart';
import ProjectModal from './components/ProjectModal';
import { Project, UseCaseCategory, TechnologyConcept } from './types/data';
import projectsData from './data/projects.json';
import logo from './assets/moodle-nrw_Kooperationsvorhaben_Logo_RGB.png';

function App() {
  const [hoveredCategories, setHoveredCategories] = useState<(UseCaseCategory | TechnologyConcept)[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilters, setActiveFilters] = useState<(UseCaseCategory | TechnologyConcept)[]>([]);
  const allProjects: Project[] = projectsData as Project[];

  const handleProjectHover = (categories: (UseCaseCategory | TechnologyConcept)[]) => {
    setHoveredCategories(categories);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleFilterChange = (filter: UseCaseCategory | TechnologyConcept) => {
    setActiveFilters(prevFilters => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(f => f !== filter);
      }
      return [...prevFilters, filter];
    });
  };

  return (
    <>
      <header style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 20px 5px 20px',
        borderBottom: '1px solid #eee',
        marginBottom: '10px'
      }}>
        <img 
          src={logo} 
          alt="Moodle.NRW Kooperationsvorhaben Logo" 
          style={{ 
            height: '3rem',
            marginBottom: '1rem'
          }} 
        />
        <h1 style={{
          fontSize: '1.3rem',
          margin: 0, 
          color: '#003366',
          fontFamily: 'sans-serif'
        }}>
          Einblicke in unsere Arbeiten um Generative KI: Prototypen & Researches
        </h1>
      </header>

      <div className="app-container" style={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '0 20px 20px 20px'}}>
        <div className="timeline-section" style={{ flex: 2 }}>
          <Timeline 
            onProjectHover={handleProjectHover} 
            onProjectClick={handleProjectClick} 
            activeFilters={activeFilters}
          />
        </div>
        <div className="legend-section" style={{ flex: 1 }}>
          <UseCaseCategoryChart 
            highlightedCategories={hoveredCategories} 
            activeFilters={activeFilters} 
            onFilterChange={handleFilterChange} 
          />
        </div>

        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseModal} 
          allProjects={allProjects}
        />
      </div>
    </>
  )
}

export default App
