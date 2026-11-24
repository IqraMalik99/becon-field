const aiAutomation = {
  slug: 'ai-automation',
  name: 'AI & Business Automation',
  shortName: 'AI & Automation',
  icon: 'bot',
  kicker: 'Remove the repetitive work',
  tagline: 'Practical AI and automation that speed up responses and free your team to focus.',
  description:
    'We use AI where it genuinely reduces effort: answering routine questions, qualifying enquiries, moving data between tools, and handling the steps that should not need a person.',
  services: [
    {
      slug: 'ai-chatbot-development',
      title: 'AI Chatbot Development',
      summary:
        'Chatbots that answer common questions using your own business information.',
      description:
        'A useful chatbot needs accurate answers, not generic conversation. We build assistants grounded in your documentation, products, and policies, with clear escalation to a person when a question is outside their scope.',
      benefits: [
        'Faster answers outside working hours',
        'Responses based on your real information',
        'Clear handover to human support',
      ],
      includes: [
        'Knowledge base preparation',
        'Conversation design and testing',
        'Website and messaging integration',
        'Escalation rules and analytics',
      ],
    },
    {
      slug: 'ai-voice-agents',
      title: 'AI Voice Agents',
      summary:
        'Voice assistants that handle calls, bookings, and routine enquiries.',
      description:
        'Phone calls still matter, but not every call needs a person. We build voice agents that answer common questions, capture details, and book appointments, with a defined route to a human for anything sensitive or complex.',
      benefits: [
        'Calls answered without long waits',
        'Consistent handling of routine enquiries',
        'Appointments and details captured automatically',
      ],
      includes: [
        'Call flow and script design',
        'Voice agent configuration',
        'Calendar integration',
        'Call recording and quality review',
      ],
    },
    {
      slug: 'ai-agents-assistants',
      title: 'AI Agents & Assistants',
      summary:
        'Task-focused AI agents that work inside your tools and processes.',
      description:
        'Beyond chat, AI can take on defined tasks: summarising enquiries, drafting replies, extracting data from documents, or preparing reports. We build agents with clear boundaries, human review where needed, and logging so you can see what they did.',
      benefits: [
        'Repetitive tasks handled consistently',
        'Human review kept where it matters',
        'Actions logged and auditable',
      ],
      includes: [
        'Use-case selection and scoping',
        'Agent development and tool access',
        'Guardrails and approval steps',
        'Logging and performance review',
      ],
    },
    {
      slug: 'workflow-automation',
      title: 'Workflow Automation',
      summary:
        'Automated hand-offs between the apps your team uses every day.',
      description:
        'Many delays come from work moving between tools by hand. We map the workflow, connect the systems, and automate the routine steps so requests, approvals, and notifications happen without someone chasing them.',
      benefits: [
        'Fewer manual hand-offs and delays',
        'Consistent steps every time',
        'Visibility into where work is stuck',
      ],
      includes: [
        'Workflow mapping and prioritisation',
        'Automation build in n8n, Make, or Zapier',
        'Approvals and notifications',
        'Monitoring and error alerts',
      ],
    },
  ],
}

export default aiAutomation
