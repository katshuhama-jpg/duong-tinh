'use client';
/** Sổ án của phần Con tin họ Nghiêm: vụ đang mở, nghi phạm (bóng đen cho tới khi đủ manh mối), manh mối, hồ sơ chị Thanh. */
import type { CastK, Life } from '@/lib/cung/types';
import { CASES, KIND, clueOf, clueSet, knows, strength, suspectName } from '@/lib/cung/nghiem/cases';
import { TRUTHS } from '@/lib/cung/nghiem/world';

const LAMP = { mo: 'Mờ', vua: 'Vừa', sang: 'Sáng' };

function openCase(l: Life) {
  return CASES.find((c) => l.an?.[c.id]?.mo != null && !l.an[c.id].xu) ?? null;
}
const truthsOf = (l: Life) => TRUTHS.map((t, i) => ({ t, ok: l.flags.includes(`su${i + 1}`) }));

export function SoAnStrip({ life, onOpen }: { life: Life; onOpen: () => void }) {
  const c = openCase(life);
  const tr = truthsOf(life).filter((x) => x.ok).length;
  return (
    <button type="button" className="c-soan-strip" onClick={onOpen} aria-label="Mở sổ án">
      <span>{c ? <>Đang xét: <b>{c.title}</b> · {life.an![c.id].clues.length} manh mối</> : <>Không có án đang mở</>}</span>
      <span>
        <b className="hiem">Hiểm {life.n.hiem ?? 0}</b> · Lòng cha {life.n.cha ?? 0} · Hồ sơ chị {tr}/12
      </span>
    </button>
  );
}

export default function SoAn({ life, faceOf }: { life: Life; faceOf: (k: CastK) => string }) {
  const cases = CASES.filter((c) => life.an?.[c.id]?.mo != null);
  const tr = truthsOf(life);
  return (
    <>
      <p className="c-note">
        Hiểm {life.n.hiem ?? 0}/100: kẻ thủ ác biết bạn đang đào tới đâu. Đầy thì họ ra tay. Lòng cha {life.n.cha ?? 0}.
      </p>
      {!cases.length && <p className="c-note">Chưa có vụ án nào.</p>}
      {cases
        .slice()
        .reverse()
        .map((c) => {
          const st = life.an![c.id];
          return (
            <section key={c.id}>
              <h3>
                {c.title} {st.xu ? '· đã khép' : '· đang xét'}
              </h3>
              <p className="c-note">{c.sum}</p>
              <div className="sus">
                {c.suspects.map((s) => {
                  const k = knows(life, c.id, s.k);
                  const g = strength(life, c.id, s.k);
                  return (
                    <div key={s.k} className={k ? 'known' : ''}>
                      {k && s.cast ? <img className="face" src={`${faceOf(s.cast)}/f_binh.webp`} alt="" /> : <span className="shadow" aria-hidden="true" />}
                      <b>{suspectName(life, c.id, s.k)}</b>
                      {!st.xu && (
                        <div style={{ border: 0, padding: 0, background: 'none' }}>
                          <span className={`lamp ${g.lamp}`} aria-hidden="true" />
                          Độ vững: {LAMP[g.lamp]} · {g.n} manh mối
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <h3>Manh mối đã có</h3>
              {st.clues.length ? (
                <ul>
                  {st.clues.map((id) => {
                    const cl = clueOf(id)!;
                    const who = clueSet(life, id).map((k) => suspectName(life, c.id, k));
                    return (
                      <li key={id}>
                        <b>{KIND[cl.kind]}:</b> {cl.t}. <i>Trỏ về: {who.join(' hoặc ')}.</i>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="c-note">Chưa có manh mối nào.</p>
              )}
              {!st.xu && <p className="c-note">Án vững khi có ít nhất hai loại chứng cùng trỏ về một người, và có chứng then chốt. Đèn sáng chưa chắc là đúng người: có thể bạn đang bị gài.</p>}
            </section>
          );
        })}
      <section>
        <h3>Hồ sơ chị Thanh · {tr.filter((x) => x.ok).length}/12</h3>
        <ul>
          {tr.map((x, i) => (
            <li key={i} style={{ opacity: x.ok ? 1 : 0.5 }}>
              {x.ok ? x.t : '???'}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
