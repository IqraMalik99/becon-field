export const site = {
  name: 'Making Tech Awesome',
  // Public contact address shown in the footer. The Gmail inbox is kept
  // backend-only via CONTACT_TO in .env and is never rendered on the site.
  email: 'Info@beacons-field.com',
  tagline: 'Technology & Business Solutions',
}

export const navItems = [
  { label: 'Home', to: '#top' },
  { label: 'About Us', to: '#about' },
  { label: 'Services', to: '#services' },
  { label: 'Our Work', to: '#work' },
  { label: 'Contact', to: '#contact' },
]

export const businessProblems = [
  {
    problem: 'Too much manual work',
    solution: 'Automated workflows that move data and tasks forward without chasing.',
    link: { label: 'Workflow automation', to: '/services/ai-automation/workflow-automation' },
  },
  {
    problem: 'Slow, unreliable devices',
    solution: 'Hardware diagnostics and upgrades that keep your team working without interruptions.',
    link: { label: 'Hardware troubleshooting', to: '/services/it-support/hardware-troubleshooting' },
  },
  {
    problem: 'Slow customer responses',
    solution: 'AI chatbots and voice agents that answer routine questions promptly.',
    link: { label: 'AI chatbot development', to: '/services/ai-automation/ai-chatbot-development' },
  },
  {
    problem: 'An outdated digital presence',
    solution: 'Modern websites and applications that reflect the quality of your business.',
    link: { label: 'Website design & development', to: '/services/web-software/website-design-development' },
  },
  {
    problem: 'Disconnected business tools',
    solution: 'Integrations that get your systems sharing data instead of duplicating it.',
    link: { label: 'API development & integration', to: '/services/web-software/api-development-integration' },
  },
  {
    problem: 'Technical disruptions',
    solution: 'Reliable IT support and maintenance that catches problems early.',
    link: { label: 'Monthly IT maintenance', to: '/services/cybersecurity-maintenance/monthly-it-maintenance' },
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    text: 'One conversation about goals, constraints, and what success looks like for your team.',
  },
  {
    number: '02',
    title: 'Planning',
    text: 'Scope, timeline, and cost in writing. Nothing starts until you approve it.',
  },
  {
    number: '03',
    title: 'Design',
    text: 'Flows and interfaces reviewed with you before a line of code is committed.',
  },
  {
    number: '04',
    title: 'Build',
    text: 'Delivered in visible stages — progress is never a mystery.',
  },
  {
    number: '05',
    title: 'Test',
    text: 'Checked across devices, browsers, and real usage scenarios.',
  },
  {
    number: '06',
    title: 'Launch',
    text: 'A managed release with documentation and handover.',
  },
  {
    number: '07',
    title: 'Support',
    text: 'Maintenance, fixes, and improvements after go-live.',
  },
]

export const whyUs = [
  {
    title: 'One partner across IT and software',
    text: 'Support, development, automation, and maintenance under one roof — no juggling vendors.',
  },
  {
    title: 'Senior attention on every project',
    text: 'The people who scope your work stay on it. Decisions never get lost in handovers.',
  },
  {
    title: 'Clear scope before work starts',
    text: 'Written deliverables, assumptions, and costs. You approve the plan before work begins.',
  },
  {
    title: 'Maintainable code and documentation',
    text: 'Built to be understood later — not locked to the person who wrote it.',
  },
  {
    title: 'Security considered throughout',
    text: 'Access, data handling, and updates designed in — not bolted on at the end.',
  },
  {
    title: 'Support after launch',
    text: 'Maintenance, fixes, and improvements after go-live — not silence.',
  },
]

export const techGroups = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Python', 'Laravel', 'Express', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  },
  {
    label: 'Data & cloud',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'AWS', 'Azure', 'Docker'],
  },
  {
    label: 'AI & automation',
    items: ['OpenAI', 'Anthropic', 'LangChain', 'n8n', 'Make', 'Zapier'],
  },
  {
    label: 'Platforms & tools',
    items: ['WordPress', 'Shopify', 'Docker', 'Git', 'Linux', 'Figma'],
  },
]

export const faqs = [
  {
    question: 'Can you support our existing IT setup as well as build new software?',
    answer:
      'Yes. The traditional IT support services remain a core part of what we do. Many clients start with support or maintenance and later bring us in for a website, application, or automation project. Keeping both under one roof means the person fixing the infrastructure understands the systems running on it.',
  },
  {
    question: 'How do you decide whether AI is actually worth using?',
    answer:
      'We look for a specific, repetitive task with a measurable cost: answering the same questions, re-entering data, routing enquiries, or preparing routine documents. If a simpler rule-based automation will do the job, we will recommend that instead of adding AI for its own sake.',
  },
  {
    question: 'Do you work with businesses that already have a website or internal system?',
    answer:
      'Often. We can improve and extend what exists, migrate it to a better platform, or integrate it with new tools. We will tell you when a rebuild is genuinely necessary and when targeted fixes are the better use of budget.',
  },
  {
    question: 'What happens during a free consultation?',
    answer:
      'It is a short conversation about the problem, the current setup, and what you want to change. We will outline the likely approach and next steps. If we are not the right fit, we will say so rather than push a project that does not make sense.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'It depends on scope. A focused website may take a few weeks; a custom platform or mobile app usually takes longer and is delivered in stages. You receive a timeline with the written scope before work begins.',
  },
  {
    question: 'Can you maintain a system another team built?',
    answer:
      'Usually, yes. We start with a technical review to understand the codebase, hosting, and dependencies, then give you an honest assessment of what can be supported and what needs attention first.',
  },
  {
    question: 'Do you provide support outside normal business hours?',
    answer:
      'Routine support is scheduled during business hours. For businesses with critical systems, we agree escalation arrangements and response expectations as part of the support plan rather than promising round-the-clock cover by default.',
  },
  {
    question: 'How is pricing structured?',
    answer:
      'Support and maintenance are usually monthly. Projects are quoted as a fixed scope or in agreed stages, depending on how clearly the requirements can be defined. You will always see the basis for the price before committing.',
  },
]
