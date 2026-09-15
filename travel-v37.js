(()=>{
  'use strict';
  if(typeof D==='undefined'||typeof P==='undefined'||!window.OsakaTravelCore)return;
  const C=window.OsakaTravelCore,root=document.getElementById('travel'),bar=document.getElementById('trip-modebar');
  if(!root||!bar)return;
  const key='osakaTravelProgressV1';let saved={},storageOK=true,selectedDay=C.dayFor(),mode='plan';
  try{const raw=JSON.parse(localStorage.getItem(key)||'{}');if(raw&&typeof raw==='object'&&!Array.isArray(raw))saved=raw;}catch{storageOK=false;}
  if(saved.viewDate===C.japanDate()&&Number.isInteger(saved.viewDay)&&saved.viewDay>=0&&saved.viewDay<D.length)selectedDay=saved.viewDay;
  const indices=D.map((d,i)=>C.position(saved[i],d[2]));
  const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const notices=[
    ['13:00 항공 출발 확정 · TW0321','14:30 간사이 도착 예정. 입국심사·수하물·세관 후 전철 이동.'],
    ['USJ · 해리포터 먼저 + Nintendo 시간 고정','오전은 해리포터 집중 · Forbidden Journey 일반 대기. 13:40–14:40 SUPER NINTENDO WORLD.','Mario Kart 13:40–14:10 → Mine Cart 14:10–14:40. CHOICE B는 Flying Dinosaur 계획, CHOICE A는 JAWS/Jurassic 현장 선택.'],
    ['DAY 3 · 10시 시작 여유 버전','구로몬 → 크루즈 승선권 확보(패스 사용 시) → 신세카이 → 오사카성 → 호텔 휴식 → 도톤보리.','20:00 크루즈 목표. 우메다 스카이빌딩은 메인에서 제외하고 교체용 선택지로 둠.'],
    ['15:30 귀국편 출발 확정 · TW0322','12:15 공항 이동 계획 · 13:15~13:30 공항 도착 목표. 당일 열차·터미널 확인.']
  ];
  const memoKey='osakaTravelMemosV1';
  let memos={};
  try{const raw=JSON.parse(localStorage.getItem(memoKey)||'{}');if(raw&&typeof raw==='object'&&!Array.isArray(raw))memos=raw;}catch{}
  function memoId(){const s=D[selectedDay][2][indices[selectedDay]];return JSON.stringify([C.dates[selectedDay],s[1],s[2]]);}
  function memoValue(s){const value=memos[memoId()];return typeof value==='string'?value:s[3];}
  function memoEditor(s){return `<details class="travel-route" data-memo-panel><summary>일정 메모 · 작성/수정</summary><label for="travel-memo">이 일정의 메모</label><textarea id="travel-memo" rows="5" style="display:block;box-sizing:border-box;width:100%;margin:8px 0;padding:12px;border:1px solid #ffffff44;border-radius:10px;background:#10151a;color:#f7f2e9;font:inherit;font-size:16px;line-height:1.6;resize:vertical" placeholder="예약 시간이나 챙길 것을 적어두세요">${esc(memoValue(s))}</textarea><div class="travel-controls"><button type="button" data-memo-reset>기본 메모 복원</button><button type="button" data-memo-save>메모 저장</button></div><p class="travel-muted" id="travel-memo-status" role="status" aria-live="polite">메모는 이 브라우저에 저장돼요. 다른 기기와 자동 공유되지 않아요.</p></details>`;}
  function persistMemo(){
    const field=root.querySelector('#travel-memo');if(!field)return true;
    const id=memoId(),value=field.value,status=root.querySelector('#travel-memo-status');
    try{
      const latest=JSON.parse(localStorage.getItem(memoKey)||'{}');
      const next=latest&&typeof latest==='object'&&!Array.isArray(latest)?{...latest}:{...memos};
      next[id]=value;localStorage.setItem(memoKey,JSON.stringify(next));memos=next;
      status.textContent='저장했어요 · 이 브라우저에서 다시 열어도 유지돼요.';return true;
    }catch{status.textContent='저장하지 못했어요. 입력한 내용을 복사해 보관한 뒤 다시 시도하세요.';return false;}
  }
  root.addEventListener('input',e=>{if(e.target.id==='travel-memo')persistMemo();});
  function save(){saved.viewDate=C.japanDate();saved.viewDay=selectedDay;saved[selectedDay]={signature:C.signature(D[selectedDay][2]),index:indices[selectedDay]};try{localStorage.setItem(key,JSON.stringify(saved));}catch{storageOK=false;}}
  function setMode(next,updateHash=true){
    mode=next;document.body.classList.toggle('travel-mode',next==='travel');root.hidden=next!=='travel';bar.hidden=false;
    bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===next)));
    if(updateHash)history.replaceState(null,'',next==='travel'?'#travel':'#trip');
    if(next==='plan')window.dispatchEvent(new Event('resize'));
  }
  function heading(){const today=C.japanDate(),isToday=today===C.dates[selectedDay];return `<div class="travel-intro"><div><div class="travel-eyebrow">OSAKA · 3박 4일</div><h1>여행 중 보기</h1><p class="travel-muted">${isToday?'오늘 일정':C.dates[selectedDay].slice(5).replace('-','/')+' 일정 미리보기'} · 다음 장소를 한 번에 확인해요.</p></div></div><div class="travel-days" role="group" aria-label="여행 날짜 선택">${D.map((d,i)=>`<button type="button" data-day="${i}" aria-pressed="${i===selectedDay}"><span>DAY ${i+1}</span>9/${17+i} ${['목','금','토','일'][i]}</button>`).join('')}</div>`;}
  function routeDetail(index,stop){
    if(selectedDay===0&&index===0)return '<details class="travel-route"><summary>항공편 확인</summary><p>김해국제공항에서 TW0321 탑승. 항공사 체크인 안내와 실제 운항 정보를 확인하세요.</p></details>';
    const prev=index>0?D[selectedDay][2][index-1][1]:'h';
    if(prev===stop[1])return '<details class="travel-route"><summary>이동 안내</summary><p>같은 장소·지역에서 이어지는 일정이에요. 실제 티켓 시간과 현장 안내를 확인하세요.</p></details>';
    const guide=window.OsakaRouteGuide?.(prev,stop[1],stop[4]);
    if(!guide)return '<details class="travel-route"><summary>이동 안내</summary><p>위 길찾기 버튼에서 현재 위치 기준 경로를 확인하세요.</p></details>';
    return `<details class="travel-route"><summary>교통·환승 설명 펼치기</summary><p>${esc(guide.path)}</p><ol>${guide.steps.map(s=>`<li>${s}</li>`).join('')}</ol><p class="travel-muted">${esc(guide.note)}</p></details>`;
  }
  function card(){
    const stops=D[selectedDay][2],i=indices[selectedDay],s=stops[i];
    if(!s)return `<section class="travel-current travel-empty"><p class="travel-eyebrow">DAY ${selectedDay+1}</p><h2>오늘 일정 끝!</h2><p>수고했어요. 아래 목록에서 언제든 다시 선택할 수 있어요.</p><div class="travel-controls"><button type="button" data-back>이전 일정</button><button type="button" ${selectedDay<3?'data-next-day':'data-first'}>${selectedDay<3?'다음 날 보기':'첫날부터 다시 보기'}</button></div></section>`;
    const flight=selectedDay===0&&i===0,p=P[s[1]],prev=i>0?P[stops[i-1][1]]:P.h,next=stops[i+1];
    const mainUrl=flight?C.place('Gimhae International Airport'):C.directions(p[2],s[4]);
    const planUrl=C.directions(p[2],s[4],prev[2]);
    return `<section class="travel-current" aria-label="선택한 일정"><div class="travel-card-top"><span>이어서 갈 곳</span><span>${i+1} / ${stops.length}</span></div><div class="travel-time">${esc(s[0])}</div><h2>${esc(s[2])}</h2><div class="travel-actions"><a target="_blank" rel="noopener" href="${esc(mainUrl)}">${flight?'김해공항 위치 보기 ↗':'현재 위치에서 길찾기 ↗'}</a>${!flight&&prev!==p?`<a target="_blank" rel="noopener" href="${esc(planUrl)}">계획 동선: ${esc(prev[1])} → ${esc(p[1])}</a>`:''}</div><div class="travel-next"><span>다음 일정</span><strong>${next?esc(next[0]+' · '+next[2]):'오늘의 마지막 일정이에요'}</strong></div><div class="travel-controls"><button type="button" data-back ${i===0?'disabled':''}>이전 일정</button><button type="button" data-next>${next?'다음 일정으로 →':'오늘 일정 마치기'}</button></div>${memoEditor(s)}${routeDetail(i,s)}</section>`;
  }
  function food(){
    const source=document.getElementById('food');
    const cards=source?[...source.querySelectorAll('.card')].filter(c=>c.querySelector('h3')?.textContent.includes('DAY '+(selectedDay+1))):[];
    return `<details class="travel-fold travel-food"><summary>식사·맛집 후보 · 미정</summary><p class="travel-muted">${cards.length?'아직 식당은 정하지 않았어요. 아래는 비교용 후보예요.':selectedDay===1?'USJ 식당 미정. 익스프레스 지정시간 사이에 식사 시간을 잡으세요.':'마지막 날 식당 미정. 공항 이동에 늦지 않게 가까운 곳에서 간단히 식사해요.'}</p>${cards.map(c=>c.outerHTML).join('')}<button type="button" class="travel-plan-food">전체 맛집 후보 보기</button></details>`;
  }
  function render(focusSelector){
    const stops=D[selectedDay][2],i=indices[selectedDay];
    root.innerHTML=heading()+`<details class="travel-alerts"><summary><span>꼭 확인할 시간 · 더 보기</span><b>${esc(notices[selectedDay][0])}</b></summary><ul>${notices[selectedDay].slice(1).map(s=>`<li>${esc(s)}</li>`).join('')}</ul></details>`+card()+`<p class="travel-save">${storageOK?'진행 위치는 이 브라우저에 저장돼요 · 두 사람 기기는 별도':'이 브라우저에서는 진행 위치를 저장할 수 없어요'}</p><details class="travel-fold"><summary>DAY ${selectedDay+1} 전체 일정 · ${stops.length}개</summary><ol class="travel-list">${stops.map((s,n)=>`<li><button type="button" data-stop="${n}" ${n===i?'aria-current="step"':''}><time>${esc(s[0])}</time><span>${esc(s[2])}${n===i?'<small>현재 선택한 일정</small>':''}</span></button></li>`).join('')}</ol></details>`+food()+`<p class="travel-footer">일정은 계획 시간이에요. 실제 운항·열차·티켓 시간을 우선하세요. 홈 화면에 이 페이지를 추가하면 바로 열 수 있어요.</p>`;
    if(focusSelector)root.querySelector(focusSelector)?.focus({preventScroll:true});
  }
  root.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.hasAttribute('data-memo-save')){persistMemo();return;}
    if(b.hasAttribute('data-memo-reset')){
      if(!window.confirm('작성한 내용을 지우고 기본 일정 메모로 되돌릴까요?'))return;
      root.querySelector('#travel-memo').value=D[selectedDay][2][indices[selectedDay]][3];persistMemo();return;
    }
    const field=root.querySelector('#travel-memo');
    if(field&&field.value!==memoValue(D[selectedDay][2][indices[selectedDay]])&&!persistMemo())return;
    if(b.hasAttribute('data-day')){selectedDay=Number(b.dataset.day);save();render(`[data-day="${selectedDay}"]`);}
    else if(b.hasAttribute('data-next')){indices[selectedDay]=Math.min(D[selectedDay][2].length,indices[selectedDay]+1);save();render('[data-next], [data-next-day], [data-first]');}
    else if(b.hasAttribute('data-back')){indices[selectedDay]=Math.max(0,indices[selectedDay]-1);save();render('[data-back]');}
    else if(b.hasAttribute('data-stop')){indices[selectedDay]=Number(b.dataset.stop);save();render();root.querySelector('.travel-current').scrollIntoView({block:'start',behavior:'smooth'});}
    else if(b.hasAttribute('data-next-day')){selectedDay=Math.min(3,selectedDay+1);save();render();window.scrollTo(0,0);}
    else if(b.hasAttribute('data-first')){selectedDay=0;indices[0]=0;save();render();window.scrollTo(0,0);}
    else if(b.classList.contains('travel-plan-food')){setMode('plan',false);location.hash='food';}
  });
  bar.addEventListener('click',e=>{const b=e.target.closest('button[data-mode]');if(!b)return;setMode(b.dataset.mode);window.scrollTo(0,0);});
  addEventListener('hashchange',()=>{setMode(location.hash==='#travel'?'travel':'plan',false);});
  render();setMode(location.hash==='#travel'?'travel':'plan',false);
})();