import { NG_CARDS } from '../lib/cung/nghiem/index';
for (const c of NG_CARDS) {
  const txt = JSON.stringify(c);
  const usesCon = c.cast.includes('con');
  const mentionsCanh = /Cảnh/.test(txt);
  const guard = c.when?.sons ? 'sons' : (c.when?.flags ?? []).some((f) => /canh|sinh3|dc_canh/.test(f)) ? 'flag:' + (c.when?.flags ?? []).filter((f) => /canh|sinh3/.test(f)).join(',') : '';
  if ((usesCon || mentionsCanh) && c.chapter.some((x) => x >= 4)) {
    const chs = c.choices.map((o, i) => /Cảnh/.test(o.t + (o.note ?? '')) ? `#${i}${o.need?.sons ? '(sons)' : ''}` : '').filter(Boolean).join(' ');
    console.log(c.id, 'ch' + c.chapter, 'cast:' + usesCon, 'guard:' + (guard || 'NONE'), /Cảnh/.test(c.text.join(' ') + (c.lead ?? '')) ? 'TEXT' : '', chs);
  }
}
