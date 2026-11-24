export default function SecurityVisual() {
  return (
    <g stroke="#e6e6e6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="280" cy="206" rx="196" ry="150" stroke="rgba(201,209,218,0.14)" strokeDasharray="4 9" />
      <path
        d="M280 62 420 114v104c0 76-58 124-140 150-82-26-140-74-140-150V114L280 62Z"
        fill="rgba(201,209,218,0.08)"
        stroke="rgba(230,235,241,0.4)"
      />
      <path
        d="M280 88 396 130v88c0 62-48 103-116 126-68-23-116-64-116-126v-88L280 88Z"
        stroke="rgba(201,209,218,0.28)"
        strokeDasharray="3 6"
      />

      <rect x="246" y="186" width="68" height="58" rx="10" fill="rgba(201,209,218,0.2)" stroke="#c8c8c8" />
      <path d="M260 186v-16a20 20 0 0 1 40 0v16" stroke="#c8c8c8" strokeWidth="3" />
      <circle cx="280" cy="211" r="5" fill="#e6e6e6" stroke="none" />
      <path d="M280 216v10" stroke="#e6e6e6" strokeWidth="2.4" />

      <g stroke="rgba(201,209,218,0.35)" strokeDasharray="4 7">
        <path d="M280 62V34M420 114l26-16M140 114l-26-16M280 368v24M420 218h30M140 218h-30" />
      </g>
      <g fill="#c8c8c8" stroke="none">
        <circle cx="280" cy="30" r="5" />
        <circle cx="450" cy="96" r="5" />
        <circle cx="110" cy="96" r="5" />
        <circle cx="280" cy="396" r="5" />
        <circle cx="454" cy="218" r="5" />
        <circle cx="106" cy="218" r="5" />
      </g>

      <g>
        <rect x="48" y="286" width="168" height="62" rx="14" fill="#141414" />
        <circle cx="72" cy="310" r="11" fill="rgba(201,209,218,0.22)" />
        <path d="M67 310l3.5 3.5 6-7" stroke="#c8c8c8" strokeWidth="2" />
        <rect x="92" y="304" width="84" height="7" rx="3.5" fill="#e6e6e6" opacity="0.8" />
        <rect x="92" y="319" width="58" height="5" rx="2.5" fill="#8c8c8c" opacity="0.6" />
      </g>
      <g>
        <rect x="356" y="306" width="158" height="58" rx="14" fill="#222222" stroke="rgba(230,235,241,0.24)" />
        <circle cx="380" cy="330" r="11" fill="rgba(201,209,218,0.2)" />
        <path d="M375 330l3.5 3.5 6-7" stroke="#c8c8c8" strokeWidth="2" />
        <rect x="400" y="324" width="82" height="7" rx="3.5" fill="#141414" opacity="0.7" />
        <rect x="400" y="339" width="54" height="5" rx="2.5" fill="#a6a6a6" opacity="0.6" />
      </g>
    </g>
  )
}
