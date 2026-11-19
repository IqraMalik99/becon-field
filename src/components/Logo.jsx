
const css = `
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  min-width: max-content;
  padding: 4px 0;
  overflow: visible;
  text-decoration: none;
  border: 0;
  outline: 0;
  background: transparent;
  box-shadow: none;
}

.logo .logo__mark {
  display: block;
  flex-shrink: 0;
  width: 180px;
  height: 80px;
  object-fit: contain;
  border: 0;
  outline: 0;
  background: transparent;
  box-shadow: none;
}

.logo__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  line-height: 1.15;
}

.logo__name {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.logo__tag {
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 520px) {
  .logo .logo__mark {
    width: 40px;
    height: 40px;
  }

  .logo__name {
    font-size: 1.02rem;
  }

  .logo__tag {
    display: none;
  }
}
`;

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Making Tech Awesome — home">
      <style>{css}</style>
      <img
        className="logo__mark"
        src="/images/logo-tile.webp"
        alt=""
        width="180"
        height="80"
        aria-hidden="true"
      />
    </a>
  );
}
