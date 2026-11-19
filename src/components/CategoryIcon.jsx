import { Wrench } from '@phosphor-icons/react/dist/csr/Wrench'
import { Code } from '@phosphor-icons/react/dist/csr/Code'
import { DeviceMobile } from '@phosphor-icons/react/dist/csr/DeviceMobile'
import { Robot } from '@phosphor-icons/react/dist/csr/Robot'
import { FunnelSimple } from '@phosphor-icons/react/dist/csr/FunnelSimple'
import { ShieldCheck } from '@phosphor-icons/react/dist/csr/ShieldCheck'

const iconMap = {
  wrench: Wrench,
  code: Code,
  smartphone: DeviceMobile,
  bot: Robot,
  funnel: FunnelSimple,
  shield: ShieldCheck,
}

export default function CategoryIcon({ name, size = 26, weight = 'duotone' }) {
  const Icon = iconMap[name] ?? Wrench
  return (
    <Icon
      size={size}
      weight={weight}
      aria-hidden="true"
      focusable="false"
    />
  )
}
