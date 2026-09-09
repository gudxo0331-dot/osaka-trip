(()=>{
  'use strict';
  if(typeof D==='undefined'||typeof P==='undefined'||!window.OsakaTravelCore)return;
  const C=window.OsakaTravelCore,root=document.getElementById('travel'),bar=document.getElementById('trip-modebar');
  if(!root||!bar)return;
  const key='osakaTravelProgressV1';let saved={},storageOK=true,selectedDay=C.dayFor(),mode='travel';
  try{const raw=JSON.parse(localStorage.getItem(key)||'{}');if(raw&&typeof raw==='object'&&!Array.isArray(raw))saved=raw;}catch{storageOK=false;}
  if(saved.viewDate===C.japanDate()&&Number.isInteger(saved.viewDay)&&saved.viewDay>=0&&saved.viewDay<D.length)selectedDay=saved.viewDay;
  const indices=D.map((d,i)=>C.position(saved[i],d[2]));
  const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const notices=[
    ['13:00 항공 출발 확정 · TW0321','14:30 간사이 도착 예정. 16:30 공항 → 호텔은 입국 상황에 따라 조정.'],
    ['USJ 입장권·익스프레스 구매 완료','익스프레스 지정시간 미입력 · 바우처를 먼저 확인. 오전·오후 배치는 임시이며 실제 지정시간 우선.','06:50 출발·19:30 복귀는 운영시간과 체력에 따라 조정.'],
    ['14:00 전망대 입장 목표 · 주유패스 입장은 15:00까지','20:00 크루즈는 희망 시간 · 오전 교환한 승선권 시간 우선.','주유패스 구매 미정 · 당일 사용 여부 확인.'],
    ['15:30 귀국편 출발 확정 · TW0322','12:15 공항 이동 계획 · 13:15~13:30 공항 도착 목표. 당일 열차·터미널 확인.']
  ];
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
    return `<section class="travel-current" aria-label="선택한 일정"><div class="travel-card-top"><span>이어서 갈 곳</span><span>${i+1} / ${stops.length}</span></div><div class="travel-time">${esc(s[0])}</div><h2>${esc(s[2])}</h2><div class="travel-actions"><a target="_blank" rel="noopener" href="${esc(mainUrl)}">${flight?'김해공항 위치 보기 ↗':'현재 위치에서 길찾기 ↗'}</a>${!flight&&prev!==p?`<a target="_blank" rel="noopener" href="${esc(planUrl)}">계획 동선: ${esc(prev[1])} → ${esc(p[1])}</a>`:''}</div><div class="travel-next"><span>다음 일정</span><strong>${next?esc(next[0]+' · '+next[2]):'오늘의 마지막 일정이에요'}</strong></div><div class="travel-controls"><button type="button" data-back ${i===0?'disabled':''}>이전 일정</button><button type="button" data-next>${next?'다음 일정으로 →':'오늘 일정 마치기'}</button></div><details class="travel-route"><summary>일정 메모 펼치기</summary><p>${esc(s[3])}</p></details>${routeDetail(i,s)}</section>`;
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
  render();setMode(location.hash&&location.hash!=='#travel'?'plan':'travel',false);
})();
