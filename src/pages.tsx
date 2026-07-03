import { Link, NavLink, Route, Routes } from 'react-router-dom'

type PageSectionProps = {
  title: string
  description: string
  children: React.ReactNode
}

function PageSection({ title, description, children }: PageSectionProps) {
  return (
    <section className="section-card">
      <h2>{title}</h2>
      <p className="muted">{description}</p>
      <div className="page-content">{children}</div>
    </section>
  )
}

function HomePage() {
  return (
    <PageSection title="Home" description="A modern React version of the original landing experience.">
      <div className="grid">
        <article className="card">
          <h3>Transform your business</h3>
          <p>Mupuma helps organizations modernize operations with ERP, consultancy, and technology services.</p>
        </article>
        <article className="card">
          <h3>Solutions</h3>
          <p>From CRM implementation to ERP strategy and IT support, the company offers a full-stack delivery model.</p>
        </article>
        <article className="card">
          <h3>Trusted partnerships</h3>
          <p>Delivery is supported by long-term partnerships with clients and technology providers.</p>
        </article>
      </div>
    </PageSection>
  )
}

function AboutPage() {
  return (
    <PageSection title="About" description="The company was established in Zambia and focuses on ERP, business intelligence, and implementation support.">
      <div className="grid">
        <article className="card">
          <h3>Who we are</h3>
          <p>Mupuma Management Solutions provides technology-driven business solutions tailored to each client’s operational needs.</p>
        </article>
        <article className="card">
          <h3>Our approach</h3>
          <p>We combine implementation expertise, training, and consultancy to ensure smooth adoption and lasting value.</p>
        </article>
      </div>
    </PageSection>
  )
}

function CareersPage() {
  return (
    <PageSection title="Careers" description="Build your career in consulting, technology implementation, and business transformation.">
      <div className="grid">
        <article className="card">
          <h3>Join the team</h3>
          <p>We are looking for professionals who enjoy solving operational and strategic technology challenges.</p>
        </article>
        <article className="card">
          <h3>Growth opportunities</h3>
          <p>Opportunities span implementation consulting, delivery leadership, training, and support services.</p>
        </article>
      </div>
    </PageSection>
  )
}

function CulturePage() {
  return (
    <PageSection title="Culture" description="A values-driven culture centered on collaboration, accountability, and continuous learning.">
      <div className="grid">
        <article className="card">
          <h3>Our values</h3>
          <p>We care about quality delivery, client outcomes, and creating a strong professional environment.</p>
        </article>
        <article className="card">
          <h3>How we work</h3>
          <p>Projects are delivered with partnership, clarity, and practical support at every stage.</p>
        </article>
      </div>
    </PageSection>
  )
}

function PartnersPage() {
  return (
    <PageSection title="Partners" description="Strategic collaborations help us deliver better technology outcomes.">
      <div className="grid">
        <article className="card">
          <h3>Technology partners</h3>
          <p>We work with established platforms and solution providers to bring robust services to clients.</p>
        </article>
        <article className="card">
          <h3>Client partnerships</h3>
          <p>We build long-term relationships that support growth, adoption, and measurable value.</p>
        </article>
      </div>
    </PageSection>
  )
}

function TeamPage() {
  return (
    <PageSection title="Team" description="Our team combines consulting expertise, industry understanding, and technical delivery capability.">
      <div className="grid">
        <article className="card">
          <h3>Leadership</h3>
          <p>The leadership team brings operational focus and a deep understanding of business transformation.</p>
        </article>
        <article className="card">
          <h3>Delivery specialists</h3>
          <p>Implementation specialists, advisors, and support professionals collaborate to deliver reliable outcomes.</p>
        </article>
      </div>
    </PageSection>
  )
}

function TestimonialsPage() {
  return (
    <PageSection title="Testimonials" description="Client feedback highlights the value of trusted guidance and dependable delivery.">
      <div className="grid">
        <article className="card">
          <p>“The team brought structure and clarity to our digital transformation journey.”</p>
          <h3>Client A</h3>
        </article>
        <article className="card">
          <p>“Implementation support felt practical, responsive, and focused on results.”</p>
          <h3>Client B</h3>
        </article>
      </div>
    </PageSection>
  )
}

function BlogPage() {
  return (
    <PageSection title="Blog" description="Insights, updates, and practical perspectives around technology and business transformation.">
      <div className="grid">
        <article className="card">
          <h3>Why ERP adoption matters</h3>
          <p>Learn how alignment between process design and software deployment improves adoption.</p>
        </article>
        <article className="card">
          <h3>Operational visibility in practice</h3>
          <p>Explore how better reporting and analytics create faster decisions and clearer accountability.</p>
        </article>
      </div>
    </PageSection>
  )
}

function EventsPage() {
  return (
    <PageSection title="Events" description="Upcoming discussions, workshops, and engagements focused on business technology.">
      <div className="grid">
        <article className="card">
          <h3>Technology roundtable</h3>
          <p>An interactive session on ERP readiness, implementation planning, and leadership alignment.</p>
        </article>
        <article className="card">
          <h3>Client workshop</h3>
          <p>Hands-on guidance for teams preparing for rollout, training, and adoption support.</p>
        </article>
      </div>
    </PageSection>
  )
}

function PackagesPage() {
  return (
    <PageSection title="Packages" description="Flexible delivery options for organizations at different stages of their technology journey.">
      <div className="grid">
        <article className="card">
          <h3>Starter</h3>
          <p>Ideal for smaller teams that need focused implementation support and rapid onboarding.</p>
        </article>
        <article className="card">
          <h3>Growth</h3>
          <p>For teams planning broader rollout, training, and advisory support across departments.</p>
        </article>
      </div>
    </PageSection>
  )
}

function AppRoutes() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/careers', label: 'Careers' },
    { to: '/culture', label: 'Culture' },
    { to: '/partners', label: 'Partners' },
    { to: '/team', label: 'Team' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/blog', label: 'Blog' },
    { to: '/events', label: 'Events' },
    { to: '/packages', label: 'Packages' },
  ]

  return (
    <div>
      <nav className="top-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/packages" element={<PackagesPage />} />
      </Routes>
    </div>
  )
}

export default function Pages() {
  return (
    <main className="shell">
      <section className="hero-card">
        <p className="eyebrow">Template-driven pages translated into React</p>
        <h1>Mupuma website sections</h1>
        <p>This React experience now covers the company, resources, services, and contact-oriented pages from the original templates.</p>
        <Link to="/about" className="cta-link">Explore the company pages</Link>
      </section>
      <AppRoutes />
    </main>
  )
}
