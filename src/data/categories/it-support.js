const itSupport = {
  slug: 'it-support',
  name: 'IT Support & Technical Services',
  shortName: 'IT Support',
  icon: 'wrench',
  kicker: 'Keep the business running',
  tagline: 'Reliable support for the technology your team depends on.',
  description:
    'Everyday support for devices, networks, and software. We diagnose the cause, fix it properly, and help prevent the same problem from coming back.',
  services: [
    {
      slug: 'hardware-troubleshooting',
      title: 'Hardware Troubleshooting',
      summary:
        'Diagnosis and repair for laptops, desktops, servers, and peripherals that are failing, slow, or unstable.',
      description:
        'When hardware stops behaving predictably, every hour of downtime has a cost. We isolate the fault, explain your repair or replacement options, and get the device back into service with minimal disruption. Where a device is beyond economical repair, we help you migrate data and choose a sensible replacement.',
      benefits: [
        'A clear diagnosis before you spend on parts',
        'Repairs and replacements matched to the device role',
        'Data preserved and migrated wherever possible',
      ],
      includes: [
        'Component-level diagnostics',
        'RAM, storage, and power supply replacement',
        'Device setup and data migration',
        'Repair versus replace recommendations',
      ],
    },
    {
      slug: 'network-setup',
      title: 'Network Setup & Troubleshooting',
      summary:
        'Reliable wired and wireless networks for offices, shops, and remote teams.',
      description:
        'Slow Wi-Fi and intermittent connections usually have a cause: weak coverage, outdated equipment, or poor configuration. We design and support networks that fit the space and the workload, with sensible security and room to grow.',
      benefits: [
        'Stable connectivity across your premises',
        'Network security that matches how you work',
        'A setup documented for future changes',
      ],
      includes: [
        'Router, switch, and access point setup',
        'Wi-Fi coverage and performance checks',
        'VPN and remote access configuration',
        'Network fault diagnosis and repair',
      ],
    },
    {
      slug: 'software-installation',
      title: 'Software Installation & Upgrades',
      summary:
        'Careful deployment of business software, updates, and operating system upgrades.',
      description:
        'Software changes can break workflows if they are rushed. We check compatibility, plan the rollout, install and configure licensed software, and support users through the change so the transition stays calm.',
      benefits: [
        'Fewer compatibility surprises',
        'Licensed, correctly configured software',
        'Users supported through the upgrade',
      ],
      includes: [
        'Software installation and configuration',
        'Operating system upgrades',
        'License and version management',
        'Rollout planning and user support',
      ],
    },
    {
      slug: 'remote-it-support',
      title: 'Remote IT Support',
      summary:
        'Secure remote assistance for quick fixes and routine maintenance.',
      description:
        'Many issues can be resolved without a site visit. Using a secure remote session with your permission, we diagnose problems, install updates, and guide your team through fixes, often within the same working day.',
      benefits: [
        'Faster response without travel delays',
        'Support for distributed and remote teams',
        'Scheduled maintenance with minimal interruption',
      ],
      includes: [
        'Secure remote diagnostic sessions',
        'Remote software and update deployment',
        'User guidance during live sessions',
        'Follow-up notes and recommendations',
      ],
    },
  ],
}

export default itSupport
