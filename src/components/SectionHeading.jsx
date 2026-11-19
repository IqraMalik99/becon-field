export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  dark = false,
  id,
  eyebrowClass = '',
  children,
}) {
  return (
    <div
      className={`section-head section-head--${align}${dark ? ' section-head--dark' : ''}`}
    >
      {eyebrow && (
        <p className={`eyebrow${eyebrowClass ? ` ${eyebrowClass}` : ''}`}>
          <span className="eyebrow__dot" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 id={id}>{title}</h2>
      {text && <p className="section-head__text">{text}</p>}
      {children}
    </div>
  )
}
