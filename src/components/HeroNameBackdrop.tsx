const NAME_COPIES = 7

/**
 * Coluna do nome em contorno no fundo do Hero —
 * sobe/desce com fade suave entre as cópias.
 */
export function HeroNameBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="hero-name-mask absolute inset-0 flex items-center justify-center">
        <div className="hero-name-rail flex w-[145%] max-w-none flex-col items-center gap-3 sm:w-[125%] sm:gap-4 lg:w-[110%] lg:gap-5">
          {Array.from({ length: NAME_COPIES }, (_, i) => (
            <img
              key={i}
              src="/images/hero-nome-contorno.svg"
              alt=""
              className="hero-name-item h-auto w-full select-none object-contain"
              style={{ animationDelay: `${(i * 0.55).toFixed(2)}s` }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
