import { Wrench } from '@phosphor-icons/react/dist/csr/Wrench'
import { Printer } from '@phosphor-icons/react/dist/csr/Printer'
import { Scan } from '@phosphor-icons/react/dist/csr/Scan'
import { WifiHigh } from '@phosphor-icons/react/dist/csr/WifiHigh'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { HardDrives } from '@phosphor-icons/react/dist/csr/HardDrives'
import { Laptop } from '@phosphor-icons/react/dist/csr/Laptop'
import { Globe } from '@phosphor-icons/react/dist/csr/Globe'
import { SquaresFour } from '@phosphor-icons/react/dist/csr/SquaresFour'
import { ShoppingCart } from '@phosphor-icons/react/dist/csr/ShoppingCart'
import { Cloud } from '@phosphor-icons/react/dist/csr/Cloud'
import { Stack } from '@phosphor-icons/react/dist/csr/Stack'
import { PlugsConnected } from '@phosphor-icons/react/dist/csr/PlugsConnected'
import { ArrowsClockwise } from '@phosphor-icons/react/dist/csr/ArrowsClockwise'
import { DeviceMobile } from '@phosphor-icons/react/dist/csr/DeviceMobile'
import { AppleLogo } from '@phosphor-icons/react/dist/csr/AppleLogo'
import { Devices } from '@phosphor-icons/react/dist/csr/Devices'
import { ClipboardText } from '@phosphor-icons/react/dist/csr/ClipboardText'
import { ShoppingBag } from '@phosphor-icons/react/dist/csr/ShoppingBag'
import { Gear } from '@phosphor-icons/react/dist/csr/Gear'
import { ChatCircleDots } from '@phosphor-icons/react/dist/csr/ChatCircleDots'
import { PhoneCall } from '@phosphor-icons/react/dist/csr/PhoneCall'
import { ChatsCircle } from '@phosphor-icons/react/dist/csr/ChatsCircle'
import { Robot } from '@phosphor-icons/react/dist/csr/Robot'
import { FlowArrow } from '@phosphor-icons/react/dist/csr/FlowArrow'
import { Headset } from '@phosphor-icons/react/dist/csr/Headset'
import { TreeStructure } from '@phosphor-icons/react/dist/csr/TreeStructure'
import { ShareNetwork } from '@phosphor-icons/react/dist/csr/ShareNetwork'
import { Funnel } from '@phosphor-icons/react/dist/csr/Funnel'
import { UsersThree } from '@phosphor-icons/react/dist/csr/UsersThree'
import { Lightning } from '@phosphor-icons/react/dist/csr/Lightning'
import { Target } from '@phosphor-icons/react/dist/csr/Target'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { Graph } from '@phosphor-icons/react/dist/csr/Graph'
import { EnvelopeSimple } from '@phosphor-icons/react/dist/csr/EnvelopeSimple'
import { CalendarCheck } from '@phosphor-icons/react/dist/csr/CalendarCheck'
import { ShieldWarning } from '@phosphor-icons/react/dist/csr/ShieldWarning'
import { ShieldCheck } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { LockKey } from '@phosphor-icons/react/dist/csr/LockKey'
import { VideoCamera } from '@phosphor-icons/react/dist/csr/VideoCamera'
import { Heartbeat } from '@phosphor-icons/react/dist/csr/Heartbeat'
import { Gauge } from '@phosphor-icons/react/dist/csr/Gauge'
import { CloudArrowUp } from '@phosphor-icons/react/dist/csr/CloudArrowUp'
import { ChartLineUp } from '@phosphor-icons/react/dist/csr/ChartLineUp'

const serviceIcons = {
  'hardware-troubleshooting': Wrench,
  'printer-support': Printer,
  'scanner-support': Scan,
  'network-setup': WifiHigh,
  'software-installation': DownloadSimple,
  'data-backup-recovery': HardDrives,
  'remote-it-support': Laptop,

  'website-design-development': Globe,
  'web-application-development': SquaresFour,
  'ecommerce-development': ShoppingCart,
  'saas-platform-development': Cloud,
  'custom-business-software': Stack,
  'api-development-integration': PlugsConnected,
  'website-redesign-bug-fixing': ArrowsClockwise,

  'android-app-development': DeviceMobile,
  'ios-app-development': AppleLogo,
  'cross-platform-app-development': Devices,
  'business-application-development': ClipboardText,
  'ecommerce-mobile-applications': ShoppingBag,
  'mobile-app-maintenance': Gear,

  'ai-chatbot-development': ChatCircleDots,
  'ai-voice-agents': PhoneCall,
  'whatsapp-automation': ChatsCircle,
  'ai-agents-assistants': Robot,
  'workflow-automation': FlowArrow,
  'customer-support-automation': Headset,
  'business-process-automation': TreeStructure,
  'third-party-api-integrations': ShareNetwork,

  'crm-setup-implementation': Funnel,
  'custom-crm-development': UsersThree,
  'crm-workflow-automation': Lightning,
  'lead-generation-systems': Target,
  'lead-capture-qualification': MagnifyingGlass,
  'sales-pipeline-management': Graph,
  'automated-email-follow-ups': EnvelopeSimple,
  'appointment-booking-automation': CalendarCheck,

  'malware-detection-removal': ShieldWarning,
  'website-security': ShieldCheck,
  'firewall-web-protection': LockKey,
  'surveillance-system-support': VideoCamera,
  'website-maintenance': Heartbeat,
  'monthly-it-maintenance': Gauge,
  'cloud-backup-recovery': CloudArrowUp,
  'system-monitoring-updates': ChartLineUp,
}

export function getServiceIcon(slug) {
  return serviceIcons[slug] ?? Wrench
}
