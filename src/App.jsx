import { Cursor, StarField, Nav } from './components/UI/index.jsx';
import HeroSection from './components/Hero/index.jsx';
import AboutSection from './components/About/index.jsx';
import EducationSection from './components/Education/index.jsx';
import ProjectsSection from './components/Projects/index.jsx';
import ExperienceSection from './components/Experience/index.jsx';
import ContactSection from './components/Contact/index.jsx';

export default function App() {
  return (
    <>
      {/* Global UI */}
      <Cursor />
      <StarField />
      <Nav />

      {/* Page */}
      <main id="main-content">
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            top: -100,
            left: 0,
            background: 'var(--cyan)',
            color: 'var(--bg)',
            padding: '8px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            zIndex: 9999,
            textDecoration: 'none',
            borderRadius: '0 0 8px 0',
          }}
          onFocus={(e) => { e.currentTarget.style.top = '0'; }}
          onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
        >
          Skip to main content
        </a>

        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
