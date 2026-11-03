
type IconName = 'prevencao' | 'diagnostico' | 'cirurgia' | 'higiene';

/** Ícones de linha discretos, um por grupo de serviços. */
export function GroupIcon({ name }: { name: IconName }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false" className="group-icon">
      {name === 'prevencao' && (
        <>
          <path d="M16 4l10 4v7c0 7-4.5 11-10 13-5.5-2-10-6-10-13V8z" {...common} />
          <path d="M11.5 16l3 3 6-6" {...common} />
        </>
      )}
      {name === 'diagnostico' && (
        <>
          <rect x="4" y="6" width="24" height="20" rx="4" {...common} />
          <path d="M8 17h4l2-5 3 9 2-4h5" {...common} />
        </>
      )}
      {name === 'cirurgia' && (
        <>
          <rect x="5" y="5" width="22" height="22" rx="6" {...common} />
          <path d="M16 11v10M11 16h10" {...common} />
        </>
      )}
      {name === 'higiene' && (
        <>
          <path d="M16 4c5 6.5 8 11 8 15a8 8 0 01-16 0c0-4 3-8.5 8-15z" {...common} />
          <path d="M12.5 19.5a3.5 3.5 0 003.5 3.5" {...common} />
        </>
      )}
    </svg>
  );
}
