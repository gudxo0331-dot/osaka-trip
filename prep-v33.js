(()=>{
const root=document.getElementById('prepChecklist');if(!root)return;
const L={
  vjw:'https://services.digital.go.jp/visit-japan-web/',
  icoca:'https://www.westjr.co.jp/global/kr/howto/icoca/applepay/',
  kixIcoca:'https://www.kansai-airport.or.jp/kr/faq/1121',
  usj:'https://www.usj.co.jp/web/ko/kr/park-guide/schedule/park-hour',
  twayBag:'https://www.twayair.com/app/serviceInfo/contents/1148'
};
const item=(id,t,links=[])=>({id,t,links});
const groups=[
['🎢 USJ',[
 item('usjEntryQr','USJ 입장권 QR 2명분 정리'),
 item('expressQr','Express Pass QR 2명분 정리'),
 item('expressTimes','익스프레스 지정시간 캡처·메모'),
 item('usjApp','USJ 공식 앱에 티켓 등록·표시 확인'),
 item('usjHours','9/18 USJ 공식 운영시간 재확인',[['USJ 운영시간',L.usj]]),
 item('usjDeparture','06:50 호텔 출발 · 오전 해리포터 우선 동선 최종 확인')
]],
['🛂 입국 · 서류',[
 item('passport','여권 유효기간 확인'),
 item('visitJapan','Visit Japan Web 등록 완료',[['Visit Japan Web 공식',L.vjw]]),
 item('vjwQr','입국심사·세관용 Visit Japan Web QR 바로 열리게 준비'),
 item('flightShot','항공권·예약내역 오프라인 캡처'),
 item('hotelShot','호텔 예약내역·주소 오프라인 캡처')
]],
['📶 통신',[
 item('esimChoice','eSIM 또는 로밍 방식 결정'),
 item('esimInstall','eSIM 사용 시 출국 전에 설치 완료'),
 item('dataSwitch','일본 도착 후 데이터 회선 전환 방법 확인')
]],
['🚇 교통',[
 item('icoca','ICOCA 준비 · 나는 iPhone / 여자친구는 KIX에서 실물 구매',[['iPhone ICOCA',L.icoca],['KIX 실물 ICOCA',L.kixIcoca]]),
 item('kixHotel','KIX → 호텔: 난카이 공항급행 → 덴가차야 → 사카이스지선 → 닛폰바시 K17'),
 item('hotelUsj','호텔 → USJ: 긴테츠닛폰바시 → 니시쿠조 → JR 유메사키선 → 유니버설시티'),
 item('returnAirport','귀국일 호텔 → KIX 이동시간·루트 확정'),
 item('airportRail','출발 1주 전 공항철도 시간표 재확인')
]],
['💳 결제 · 현금',[
 item('overseasCard','해외결제 카드 사용 가능 여부·해외이용 차단 여부 확인'),
 item('yenCash','엔화 현금 소액 준비 · 여자친구 실물 ICOCA 구매용 현금 포함'),
 item('budgetSplit','교통·식비·쇼핑 예산 대략 분리'),
 item('cardCash','카드/현금 사용 비율 정하기 · 현금만 받는 곳 대비')
]],
['🗓 일정 · 예약',[
 item('day3Discuss','DAY 3 여유 일정 최종 확인 · 구로몬 → 신세카이 → 오사카성 → 도톤보리/리버크루즈'),
 item('cruiseDecide','도톤보리 리버크루즈 이용 여부 확정 · 20:00 희망'),
 item('cruiseMethod','리버크루즈 승선권 교환·예약 방식 최종 확인'),
 item('amazingPass','오사카성 + 리버크루즈 둘 다 이용하면 주유패스 구매 추천 · 아직 미결제'),
 item('foodCandidates','DAY 1·DAY 3·USJ 식사 후보 정리'),
 item('restaurantReserve','인기 맛집 예약 필요 여부 확인')
]],
['🗣 현지 사용',[
 item('japaneseBasics','필수 일본어 5개 저장 · 스미마센 / 후타리데스 / 코레 쿠다사이 / 오카이케이 오네가이시마스 / 아리가토 고자이마스'),
 item('translateApp','아이폰 번역 또는 Google 번역에서 일본어 바로 쓸 수 있게 준비')
]],
['📅 출발 1주 전',[
 item('weather','오사카 날씨·태풍·비 가능성 확인'),
 item('usjHoursWeek','USJ 운영시간 다시 확인',[['USJ 운영시간',L.usj]]),
 item('expressTimesWeek','Express Pass 지정시간 다시 확인'),
 item('terminal','티웨이 출발·도착 터미널 최종 확인'),
 item('insurance','여행자보험 가입'),
 item('baggageRule','티웨이 수하물 규정 다시 확인',[['티웨이 수하물',L.twayBag]])
]],
['🎒 출발 전날',[
 item('finalPassport','여권 챙기기'),
 item('finalWallet','지갑·해외결제 카드·엔화 현금 챙기기'),
 item('finalQr','USJ 입장권·Express QR 저장'),
 item('finalDocs','항공권·호텔 예약내역·Visit Japan Web QR 저장'),
 item('finalEsim','eSIM·로밍 상태 최종 확인'),
 item('powerbank','보조배터리·충전기 챙기기'),
 item('clothes','우산·얇은 겉옷 준비'),
 item('meds','상비약 챙기기'),
 item('luggage','위탁수하물 15kg 초과 여부 확인',[['티웨이 수하물',L.twayBag]])
]]
];
const key='osakaPrepV41',oldKey='osakaPrepV33';
let saved={};
try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch{}
if(!Object.keys(saved).length){
  let old={};try{old=JSON.parse(localStorage.getItem(oldKey)||'{}')||{}}catch{}
  const migration={
   g0i0:'usjEntryQr',g0i1:'expressQr',g0i2:'expressTimes',g0i3:'usjApp',g0i4:'day3Discuss',
   g1i0:'passport',g1i1:'visitJapan',g1i2:'flightShot',g1i3:'hotelShot',g1i4:'esimInstall',
   g2i0:'icoca',g2i1:'kixHotel',g2i2:'hotelUsj',g2i3:'returnAirport',g2i4:'overseasCard',g2i5:'yenCash',
   g3i0:'cruiseDecide',g3i2:'amazingPass',g3i3:'foodCandidates',g3i4:'restaurantReserve',
   g4i0:'weather',g4i1:'usjHoursWeek',g4i2:'expressTimesWeek',g4i3:'terminal',g4i4:'airportRail',g4i5:'insurance',
   g5i0:'finalWallet',g5i1:'finalDocs',g5i2:'finalDocs',g5i3:'powerbank',g5i4:'clothes',g5i5:'luggage'
  };
  Object.entries(migration).forEach(([o,n])=>{if(old[o])saved[n]=true});
  try{localStorage.setItem(key,JSON.stringify(saved))}catch{}
}
const priorities=['expressTimes','visitJapan','esimInstall','icoca','amazingPass'];
const flat=groups.flatMap(g=>g[1]);
root.innerHTML='<div class="prep-progress"><div class="bar"><div class="fill" id="prepFill"></div></div><strong id="prepCount">0 / 0 완료</strong></div><div class="prep-priority"><div class="prep-priority-head"><strong>⭐ 먼저 끝낼 5개</strong><span id="priorityCount"></span></div><div id="priorityList"></div></div><div class="prep-board" id="prepBoard"></div><div class="prep-note">체크 상태는 이 기기 브라우저에 저장돼요. 예전 체크 상태도 가능한 항목은 이어서 가져왔어요.</div>';
const board=document.getElementById('prepBoard');
function linksHtml(links){return links.length?`<div class="prep-links">${links.map(x=>`<a target="_blank" rel="noopener" href="${x[1]}">↗ ${x[0]}</a>`).join('')}</div>`:''}
groups.forEach(([title,items])=>{
 const box=document.createElement('section');box.className='prep-group';box.innerHTML=`<h3>${title}</h3><div class="prep-items"></div>`;const list=box.querySelector('.prep-items');
 items.forEach(obj=>{const row=document.createElement('div');row.className='prep-item';row.dataset.prepId=obj.id;row.innerHTML=`<input id="prep-${obj.id}" type="checkbox" ${saved[obj.id]?'checked':''}><div class="prep-item-body"><label for="prep-${obj.id}"><span>${obj.t}</span></label>${linksHtml(obj.links)}</div>`;row.classList.toggle('done',!!saved[obj.id]);row.querySelector('input').addEventListener('change',e=>{saved[obj.id]=e.target.checked;try{localStorage.setItem(key,JSON.stringify(saved))}catch{}row.classList.toggle('done',e.target.checked);update()});list.appendChild(row)});board.appendChild(box)
});
function update(){
 const checked=flat.filter(x=>saved[x.id]).length;document.getElementById('prepCount').textContent=`${checked} / ${flat.length} 완료`;document.getElementById('prepFill').style.width=`${flat.length?checked/flat.length*100:0}%`;
 const p=priorities.map(id=>flat.find(x=>x.id===id)).filter(Boolean);const pc=p.filter(x=>saved[x.id]).length;document.getElementById('priorityCount').textContent=`${pc} / ${p.length}`;document.getElementById('priorityList').innerHTML=p.map(x=>`<button type="button" data-jump="${x.id}" class="${saved[x.id]?'done':''}"><span>${saved[x.id]?'✓':'○'}</span>${x.t}</button>`).join('');
}
root.addEventListener('click',e=>{const b=e.target.closest('[data-jump]');if(!b)return;const row=root.querySelector(`[data-prep-id="${b.dataset.jump}"]`);row?.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>row?.querySelector('input')?.focus(),350)});
update();
})();