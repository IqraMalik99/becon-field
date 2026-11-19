const mobileApps = {
  slug: 'mobile-apps',
  name: 'Mobile App Development',
  shortName: 'Mobile Apps',
  icon: 'smartphone',
  kicker: 'Put your service in their pocket',
  tagline: 'Applications for customers and field teams, built for the devices they actually use.',
  description:
    'We build mobile products that are quick to use, reliable on real networks, and connected to the systems behind your business.',
  services: [
    {
      slug: 'android-app-development',
      title: 'Android App Development',
      summary:
        'Native Android applications built for performance and the wider Android device range.',
      description:
        'Android users are on a wide range of devices and OS versions. We build apps that perform well across that range, follow platform conventions, and use native capabilities such as notifications, camera, and location where they add real value.',
      benefits: [
        'Reliable performance across devices',
        'Platform-native navigation and permissions',
        'Play Store release support',
      ],
      includes: [
        'Native Android development',
        'Device and OS compatibility testing',
        'Push notifications and offline support',
        'Play Store submission and release',
      ],
    },
    {
      slug: 'ios-app-development',
      title: 'iOS App Development',
      summary:
        'Native iOS applications designed for the Apple ecosystem and App Store requirements.',
      description:
        'iOS users expect speed, privacy, and polish. We build native apps with clean interfaces, sensible permissions, and the performance expected on iPhone and iPad, then guide the app through App Store review.',
      benefits: [
        'A polished, native iOS experience',
        'Privacy and permission handling done properly',
        'App Store submission support',
      ],
      includes: [
        'Native iOS development',
        'iPhone and iPad layouts',
        'Secure data and authentication',
        'App Store submission and release',
      ],
    },
    {
      slug: 'cross-platform-app-development',
      title: 'Cross-Platform App Development',
      summary:
        'One codebase for iOS and Android without sacrificing usability.',
      description:
        'When time and budget matter, a cross-platform build can deliver a consistent product on both stores. We use modern frameworks, keep platform conventions in mind, and plan for the native features your app genuinely needs.',
      benefits: [
        'Faster delivery across both platforms',
        'One maintainable codebase',
        'A consistent experience for all users',
      ],
      includes: [
        'React Native or Flutter development',
        'Shared design system',
        'Platform-specific adjustments',
        'Release management for both stores',
      ],
    },
    {
      slug: 'business-application-development',
      title: 'Business Application Development',
      summary:
        'Mobile tools for field teams, approvals, inspections, and daily operations.',
      description:
        'Staff working away from a desk need information that is current and usable on a phone. We build business apps for job tracking, inspections, approvals, and reporting, with offline handling for areas with poor connectivity.',
      benefits: [
        'Operations visible from anywhere',
        'Offline support for field work',
        'Integration with back-office systems',
      ],
      includes: [
        'Field and operational app development',
        'Offline data capture and sync',
        'Role-based access and audit trails',
        'Backend and CRM integration',
      ],
    },
    {
      slug: 'ecommerce-mobile-applications',
      title: 'E-commerce Mobile Applications',
      summary:
        'Mobile shopping apps connected to your products, customers, and order systems.',
      description:
        'A mobile store should make repeat purchasing easy. We build shopping apps with fast product browsing, saved details, secure checkout, and order updates, connected to the commerce platform you already run.',
      benefits: [
        'A faster path to repeat purchases',
        'Secure, familiar checkout flows',
        'Orders and inventory synced with your store',
      ],
      includes: [
        'Product catalogue and search',
        'Cart, checkout, and payments',
        'Push notifications and order updates',
        'Store platform integration',
      ],
    },
    {
      slug: 'mobile-app-maintenance',
      title: 'Mobile App Maintenance & Support',
      summary:
        'Ongoing updates, monitoring, and fixes for apps already in use.',
      description:
        'Apps need maintenance as operating systems, devices, and business requirements change. We handle updates, crash investigation, performance improvements, and store releases so your app keeps working after launch.',
      benefits: [
        'Compatibility with new OS releases',
        'Faster resolution of crashes and bugs',
        'A planned release schedule',
      ],
      includes: [
        'OS and dependency updates',
        'Crash monitoring and bug fixes',
        'Performance and security reviews',
        'App store release management',
      ],
    },
  ],
}

export default mobileApps
