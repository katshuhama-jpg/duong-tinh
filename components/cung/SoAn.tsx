'use client';
/** Sổ án của phần Con tin họ Nghiêm: vụ đang mở, nghi phạm (bóng đen cho tới khi đủ manh mối), manh mối, hồ sơ chị Thanh. */
import type { CastK, Life } from '@/lib/cung/types';
import { CASES, KIND, clueOf, clueSet, knows, strength, suspectName } from '@/lib/cung/nghiem/cases';
import { TRUTHS } from '@/lib/cung/nghiem/world';
import { dauMoi, vayCanh, VC_KHEP, VC_NOI } from '@/lib/cung/nghiem/daumoi';
import { canDoubt } from '@/lib/cung/engine';

const LAMP = { mo: 'Mờ', vua: 'Vừa', sang: 'Sáng' };

function openCase(l: Life) {
  return CASES.find((c) => l.an?.[c.id]?.mo != null && !l.an[c.id].xu) ?? null;
}
const truthsOf = (l: Life) => TRUTHS.map((t, i) => ({ t, ok: l.flags.includes(`su${i + 1}`) }));

export function SoAnStrip({ life, onOpen }: { life: Life; onOpen: () => void }) {
  const c = openCase(life);
  const tr = truthsOf(life).filter((x) => x.ok).length;
  const dm = dauMoi(life);
  const left = c ? Math.max(0, dm.cap - (life.an![c.id].cd ?? 0)) : null;
  return (
    <button type="button" className="c-soan-strip" onClick={onOpen} aria-label="Mở sổ án">
      <span>{c ? <>Đang xét: <b>{c.title}</b> · {life.an![c.id].clues.length} manh mối · còn dò {left} lần</> : <>Không có án đang mở</>}</span>
      <span>
        <b className="hiem">Hiểm {life.n.hiem ?? 0}</b> · Lòng cha {life.n.cha ?? 0} · Hồ sơ chị {tr}/12
      </span>
    </button>
  );
}

export default function SoAn({ life, faceOf, onDoubt }: { life: Life; faceOf: (k: CastK) => string; onDoubt?: (clueId: string) => void }) {
  const cases = CASES.filter((c) => life.an?.[c.id]?.mo != null);
  const tr = truthsOf(life);
  const dm = dauMoi(life);
  const vc = vayCanh(life);
  const VC = { con: 'còn', nho: 'đã nhổ', lat: 'đã lật, chịu khai', dut: 'đã mất trước khi kịp dùng' };
  return (
    <>
      <p className="c-note">
        Hiểm {life.n.hiem ?? 0}/100: kẻ thủ ác biết bạn đang đào tới đâu. Đầy thì họ ra tay. Lòng cha {life.n.cha ?? 0}.
      </p>
      <section>
        <h3>Đầu mối · mỗi vụ dò được {dm.cap} lần</h3>
        <p className="c-note">
          {dm.ban.length ? <>Người giúp: {dm.ban.join(', ')}.</> : <>Không ai giúp. Bạn đang phá án một mình.</>}
          {dm.thu.length > 0 && <> Dao hai lưỡi: {dm.thu.join(', ')}. Mỗi lần dò, bên kia cũng biết.</>}
        </p>
      </section>
      <section>
        <h3>Những bàn tay quanh hồ sơ của chị · {Math.max(0, vc.diem)}/8</h3>
        <p className="c-note">
          Người giết chị không đứng một mình. Nhổ được {VC_NOI} trụ thì lời bạn nói ra mới có người giữ, {VC_KHEP} trụ mới khép được án. Giết người trước khi họ kịp khai chỉ làm đứt đầu mối. Xử oan một người thì mất một trụ đã nhổ.
        </p>
        <ul>
          {vc.list.map((x, i) => (
            <li key={x.k} style={{ opacity: x.st === 'con' ? 0.6 : 1 }}>
              {x.lo ? (
                <>
                  {x.t}: {VC[x.st]}
                </>
              ) : (
                <>Trụ thứ {i + 1}: chưa rõ</>
              )}
            </li>
          ))}
        </ul>
      </section>
      {!cases.length && <p className="c-note">Chưa có vụ án nào.</p>}
      {cases
        .slice()
        .reverse()
        .map((c) => {
          const st = life.an![c.id];
          const left = Math.max(0, dm.cap - (st.cd ?? 0));
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
                    const tu = st.tu?.includes(id);
                    const nghi = life.flags.includes(`nghi_${id}`);
                    return (
                      <li key={id} style={{ opacity: nghi ? 0.55 : 1 }}>
                        <b>{KIND[cl.kind]}:</b> {cl.t}. <i>Trỏ về: {who.join(' hoặc ')}.</i>
                        {tu && <> <small>Có qua tay kẻ thù, có thể giả.</small></>}
                        {nghi && <> <small>Bạn đang nghi, không tính.</small></>}
                        {!st.xu && onDoubt && (
                          <button type="button" className="c-soan-nghi" disabled={!canDoubt(life, id)} onClick={() => onDoubt(id)}>
                            {nghi ? 'Thôi nghi' : 'Nghi manh mối này (tốn một lần dò)'}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="c-note">Chưa có manh mối nào.</p>
              )}
              {!st.xu && left === 0 && <p className="c-note">Không còn ai để hỏi. Bạn chỉ còn những gì đã có trong tay.</p>}
              {!st.xu && <p className="c-note">Án vững khi có ít nhất hai loại chứng cùng trỏ về một người, và có chứng then chốt. Đèn sáng chưa chắc là đúng người: có thể bạn đang bị gài.</p>}
            </section>
          );
        })}
      <section>
        <h3>Hồ sơ chị Thanh · {tr.filter((x) => x.ok).length}/12</h3>
        {tr.some((x) => !x.ok) && <p className="c-note">Còn {tr.filter((x) => !x.ok).length} mảnh chưa tìm được.</p>}
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
