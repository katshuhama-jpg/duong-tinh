'use client';
/** "Chuyện chưa ai kể": các ghi chú giải nghĩa chi tiết đã gặp, đọc như một đoạn truyện. */
import { ghiChuOf } from '@/lib/cung/ghichu/index';

export default function GhiChuList({ ids, heading = 'Chuyện chưa ai kể', fill = (x: string) => x }: { ids: string[]; heading?: string | null; fill?: (x: string) => string }) {
  const list = ids.map(ghiChuOf).filter((x) => !!x);
  if (!list.length) return null;
  return (
    <section className="c-ghichu" aria-label={heading ?? 'Ghi chép'}>
      {heading && <h3>{heading}</h3>}
      {list.map((g) => (
        <article key={g!.id}>
          <h4>{fill(g!.title)}</h4>
          {g!.text.map((p, i) => (
            <p key={i}>{fill(p)}</p>
          ))}
        </article>
      ))}
    </section>
  );
}
