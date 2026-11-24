const css = `
.logo {
  display: inline-flex;
  align-items: center;
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

.logo .logo__mark {
  display: block;
  flex-shrink: 0;
  width: 148px;
  height: auto;
  object-fit: contain;
  border: 0;
  outline: 0;
  background: transparent;
  box-shadow: none;
}

@media (max-width: 520px) {
  .logo .logo__mark {
    width: 118px;
  }
}
`;

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Beaconsfield home">
      <style>{css}</style>
      <img
        className="logo__mark"
        src="/images/logo-black-grey.svg"
        alt="Beaconsfield"
        width="148"
        height="44"
      />
    </a>
  );
}
