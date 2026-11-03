import { openingHours } from '@/data/clinic';
import type { Dictionary } from '@/content';

/** Horário estático (fonte: src/data/clinic.ts). */
export function HoursTable({ t, compact = false }: { t: Dictionary; compact?: boolean }) {
  return (
    <table className={compact ? 'hours hours-compact' : 'hours'}>
      <caption className="visually-hidden">{t.common.hours}</caption>
      <tbody>
        {openingHours.map((d) => (
          <tr key={d.days}>
            <th scope="row">{compact ? t.common.daysShort[d.days] : t.common.days[d.days]}</th>
            <td>
              {d.slots.length === 0
                ? t.common.closed
                : d.slots.map(([a, b]) => `${a}–${b}`).join(compact ? ' · ' : ` ${t.common.and} `)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
