import { Wrench } from '@phosphor-icons/react/dist/csr/Wrench'
import { WifiHigh } from '@phosphor-icons/react/dist/csr/WifiHigh'
import { DownloadSimple } from '@phosphor-icons/react/dist/csr/DownloadSimple'
import { Laptop } from '@phosphor-icons/react/dist/csr/Laptop'
import { Globe } from '@phosphor-icons/react/dist/csr/Globe'
import { SquaresFour } from '@phosphor-icons/react/dist/csr/SquaresFour'
import { Stack } from '@phosphor-icons/react/dist/csr/Stack'
import { PlugsConnected } from '@phosphor-icons/react/dist/csr/PlugsConnected'
import { Devices } from '@phosphor-icons/react/dist/csr/Devices'
import { ClipboardText } from '@phosphor-icons/react/dist/csr/ClipboardText'
import { Gear } from '@phosphor-icons/react/dist/csr/Gear'
import { ChatCircleDots } from '@phosphor-icons/react/dist/csr/ChatCircleDots'
import { PhoneCall } from '@phosphor-icons/react/dist/csr/PhoneCall'
import { Robot } from '@phosphor-icons/react/dist/csr/Robot'
import { FlowArrow } from '@phosphor-icons/react/dist/csr/FlowArrow'
import { ShieldWarning } from '@phosphor-icons/react/dist/csr/ShieldWarning'
import { ShieldCheck } from '@phosphor-icons/react/dist/csr/ShieldCheck'
import { Gauge } from '@phosphor-icons/react/dist/csr/Gauge'
import { ChartLineUp } from '@phosphor-icons/react/dist/csr/ChartLineUp'

const serviceIcons = {
  'hardware-troubleshooting': Wrench,
  'network-setup': WifiHigh,
  'software-installation': DownloadSimple,
  'remote-it-support': Laptop,

  'website-design-development': Globe,
  'web-application-development': SquaresFour,
  'custom-business-software': Stack,
  'api-development-integration': PlugsConnected,

  'cross-platform-app-development': Devices,
  'business-application-development': ClipboardText,
  'mobile-app-maintenance': Gear,

  'ai-chatbot-development': ChatCircleDots,
  'ai-voice-agents': PhoneCall,
  'ai-agents-assistants': Robot,
  'workflow-automation': FlowArrow,

  'malware-detection-removal': ShieldWarning,
  'website-security': ShieldCheck,
  'monthly-it-maintenance': Gauge,
  'system-monitoring-updates': ChartLineUp,
}

export function getServiceIcon(slug) {
  return serviceIcons[slug] ?? Wrench
}
