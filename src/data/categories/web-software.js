const webSoftware = {
  slug: 'web-software',
  name: 'Web & Software Development',
  shortName: 'Web & Software',
  icon: 'code',
  kicker: 'Build the digital product',
  tagline: 'Websites and software built around how your business actually operates.',
  description:
    'From a first professional website to a custom platform, we design and build systems that fit your workflow instead of forcing your team into a template.',
  services: [
    {
      slug: 'website-design-development',
      title: 'Website Design & Development',
      summary:
        'Professional, fast, accessible websites that represent your business clearly.',
      description:
        'Your website is often the first impression a customer gets. We design and build sites that explain what you do, load quickly, work on every screen, and make it easy for visitors to take the next step.',
      benefits: [
        'A clear, credible first impression',
        'Fast loading and mobile-friendly layouts',
        'Content structure built for search and accessibility',
      ],
      includes: [
        'Discovery and content planning',
        'UI design and responsive build',
        'SEO foundations and analytics setup',
        'Launch support and training',
      ],
    },
    {
      slug: 'web-application-development',
      title: 'Custom Web Application Development',
      summary:
        'Purpose-built web applications for internal operations and customer-facing services.',
      description:
        'Off-the-shelf tools rarely match a process exactly. We build web applications around your workflow, including dashboards, portals, booking systems, and internal tools, with the access control and integrations the work requires.',
      benefits: [
        'Software shaped around your process',
        'Secure access for staff and customers',
        'A codebase your team can maintain',
      ],
      includes: [
        'Requirements and workflow mapping',
        'Frontend and backend development',
        'Role-based access and security',
        'Deployment and documentation',
      ],
    },
    {
      slug: 'custom-business-software',
      title: 'Custom Business Software',
      summary:
        'Internal systems for inventory, scheduling, finance, reporting, and operations.',
      description:
        'When spreadsheets and disconnected tools start slowing the business down, custom software can remove the duplication. We build internal systems that match the way your team works and connect to the tools you already use.',
      benefits: [
        'Less manual entry and duplicate work',
        'One reliable source of business data',
        'Software that fits existing roles and permissions',
      ],
      includes: [
        'Process discovery and scoping',
        'Custom module development',
        'Reporting and data export',
        'Integration with existing systems',
      ],
    },
    {
      slug: 'api-development-integration',
      title: 'API Development & Integration',
      summary:
        'APIs and integrations that let your software and business tools share data reliably.',
      description:
        'Most businesses run on several tools that were never designed to talk to each other. We build and integrate APIs so data moves between systems accurately, with proper authentication, error handling, and documentation.',
      benefits: [
        'Data shared without manual re-entry',
        'Reliable integrations with clear failure handling',
        'Documented APIs for future development',
      ],
      includes: [
        'REST and GraphQL API development',
        'Third-party service integration',
        'Authentication and rate-limit handling',
        'API documentation and monitoring',
      ],
    },
  ],
}

export default webSoftware
