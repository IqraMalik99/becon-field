const css = `
.logo {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  flex-shrink: 0;
  min-width: max-content;
  padding: 2px 0;
  overflow: visible;
  text-decoration: none;
  border: 0;
  outline: 0;
  background: transparent;
  box-shadow: none;
}

.logo__brand {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
}

.logo .logo__mark {
  display: block;
  flex-shrink: 0;
  width: 148px;
  height: auto;
  object-fit: contain;
  border: 0;
  border-radius: 0;
  outline: 0;
  background: transparent;
  box-shadow: none;
}

.logo__tagline {
  margin-top: 5px;
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.2;
}

@media (max-width: 520px) {
  .logo .logo__mark {
    width: 118px;
  }
  .logo__tagline {
    font-size: 0.55rem;
  }
}
`;

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Beaconsfield home">
      <style>{css}</style>
      <span className="logo__brand">
        <img
          className="logo__mark"
          src="/images/logo.png"
          alt="Beaconsfield"
          width="148"
          height="32"
        />
        <span className="logo__tagline">Making tech awesome</span>
      </span>
    </a>
  );
}
