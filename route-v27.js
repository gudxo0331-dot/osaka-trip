(()=>{
if(typeof D==='undefined'||typeof P==='undefined')return;
const modeName=m=>m==='walking'?'도보':'전철/대중교통';
const modeIcon=m=>m==='walking'?'🚶':'🚇';
const dir=(a,b,m)=>`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(P[a][2])}&destination=${encodeURIComponent(P[b][2])}&travelmode=${m==='walking'?'walking':'transit'}&hl=ko`;
const search=k=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(P[k][2])}&hl=ko`;
document.querySelectorAll('.legpanel,.legline').forEach(x=>x.remove());
const R={
'k>h':{title:'KIX → 덴가차야 → 닛폰바시 → 호텔',note:'처음 일본 전철을 타는 날이라 환승이 단순한 기본 루트로 적어뒀어요. 실제 출발시각·승강장은 당일 Google Maps를 확인하세요.',steps:[['KIX 철도역','Train / Railways 표지판'],['난카이 전철','Airport Express · NANKAI 南海'],['덴가차야','天下茶屋에서 하차·환승'],['사카이스지선','堺筋線 K · 닛폰바시 방향'],['닛폰바시 K17','日本橋 · 6번 출구'],['호텔','출구에서 약 2분 도보']]},
'h>d':{title:'호텔 → 도톤보리',note:'숙소가 도톤보리와 가까워 전철보다 걷는 게 편한 구간입니다.',steps:[['호텔 출발','닛폰바시 쪽'],['도보','도톤보리 방향 표지·Google Maps'],['도톤보리','글리코·에비스바시 권역']]},
'd>s':{title:'도톤보리 → 신사이바시',note:'상점가를 따라 북쪽으로 걷는 짧은 구간입니다.',steps:[['도톤보리','에비스바시'],['도보','신사이바시스지 상점가'],['신사이바시','쇼핑·드럭스토어']]},
'h>u':{title:'호텔 → 난바권 → 니시쿠조 → 유니버설시티',note:'USJ 가는 기본 구조만 기억하면 됩니다. 당일 Google Maps가 더 빠른 연결을 제시하면 그 경로를 우선하세요.',steps:[['호텔','닛폰바시/난바로 이동'],['난바권','한신 난바선 방향'],['니시쿠조','西九条에서 JR 환승'],['JR 유메사키선','ゆめ咲線'],['유니버설시티','Universal City 하차'],['USJ','역에서 입구까지 도보']]},
'u>d':{title:'USJ → 니시쿠조 → 난바/도톤보리',note:'퇴장 시간대에는 열차가 붐빌 수 있으니 Google Maps의 실시간 안내를 그대로 따라가세요.',steps:[['유니버설시티','JR 탑승'],['니시쿠조','西九条 환승'],['난바권','한신 난바선 등'],['도톤보리','역에서 도보']]},
'h>q':{title:'호텔 → 구로몬시장',note:'숙소에서 가까워 아침 산책처럼 걸어가면 됩니다.',steps:[['호텔','출발'],['도보','닛폰바시·구로몬 방향'],['구로몬시장','黒門市場 도착']]},
'q>c':{title:'구로몬 → 닛폰바시 K17 → 사카이스지혼마치 → 다니마치4초메 → 오사카성',note:'환승 1회가 있는 구간입니다. 역에서는 K(사카이스지선)와 C(주오선) 노선 글자를 찾으면 훨씬 쉽습니다.',steps:[['구로몬시장','닛폰바시역으로 도보'],['닛폰바시 K17','堺筋線 K 탑승'],['사카이스지혼마치','堺筋本町 K15/C17 환승'],['주오선 C','다니마치4초메 방향'],['다니마치4초메','谷町四丁目 C18 하차'],['오사카성','역에서 공원까지 도보']]},
'c>m':{title:'오사카성 → 다니마치4초메 → 히가시우메다 → 우메다',note:'오사카성 관람 위치에 따라 역까지 걷는 거리가 달라질 수 있습니다. 실제 위치에서 Google Maps를 다시 열어 확인하세요.',steps:[['오사카성','다니마치4초메역 방향'],['다니마치4초메 T23','谷町線 T 탑승'],['히가시우메다 T20','東梅田 하차'],['우메다','오사카역·쇼핑몰까지 도보']]},
'm>d':{title:'우메다 M16 → 난바 M20 → 도톤보리',note:'미도스지선 한 노선으로 내려온 뒤 난바에서 걸어가면 됩니다.',steps:[['우메다 M16','御堂筋線 M'],['미도스지선','난바 방향'],['난바 M20','なんば 하차'],['도톤보리','약 5~10분 도보']]},
'd>h':{title:'도톤보리 → 호텔',note:'마지막은 숙소까지 걸어서 복귀하는 짧은 구간입니다.',steps:[['도톤보리','출발'],['도보','닛폰바시 방향'],['호텔','도착']]},
'h>k':{title:'호텔 → 닛폰바시 K17 → 덴가차야 → KIX',note:'귀국일은 공항 도착 여유시간을 우선하세요. 난카이 열차 종류와 출발시각은 당일 Google Maps에서 최종 확인합니다.',steps:[['호텔','닛폰바시역으로 도보'],['닛폰바시 K17','堺筋線 K 탑승'],['덴가차야 K20','天下茶屋 하차'],['난카이 전철','공항행 열차 환승'],['KIX','간사이공항 도착']]},
'h>a':{title:'호텔 → 아와자 → 오사카코 → 가이유칸',note:'가이유칸을 선택했을 때의 기본 루트입니다.',steps:[['닛폰바시 S17','千日前線 S'],['아와자','阿波座에서 C선 환승'],['주오선 C','오사카코 방향'],['오사카코 C11','大阪港 하차'],['가이유칸','역에서 도보']]},
'h>t':{title:'호텔 → 난바 → 나가이 → teamLab',note:'teamLab은 야간 일정이라 돌아오는 막차 시간도 Google Maps에서 확인하세요.',steps:[['난바 M20','호텔에서 난바권 이동'],['미도스지선 M','나가이 방향'],['나가이 M26','長居 하차'],['나가이공원','식물원 방향 도보'],['teamLab','입장']]},
'h>b':{title:'호텔 → 닛폰바시 K17 → 기타하마 → 나카노시마',note:'환승 없이 사카이스지선으로 접근하기 쉬운 선택지입니다.',steps:[['닛폰바시 K17','堺筋線 K'],['기타하마 K14','北浜 하차'],['나카노시마','강변으로 도보']]},
'h>r':{title:'호텔 → 난바 → 스미요시타이샤',note:'난카이 난바역에서 남쪽으로 내려가는 전철을 이용하는 방식이 이해하기 쉽습니다.',steps:[['호텔','난카이 난바역으로 이동'],['난카이 난바','南海 탑승'],['스미요시타이샤역','住吉大社 하차'],['신사','도보']]},
'h>o':{title:'호텔 → 닛폰바시 K17 → 덴진바시스지6초메 → 주택박물관',note:'사카이스지선으로 거의 직선 이동이라 비 오는 날 후보로 편합니다.',steps:[['닛폰바시 K17','堺筋線 K'],['덴진바시스지6초메 K11','天神橋筋六丁目 하차'],['주택박물관','역에서 도보']]},
'h>v':{title:'호텔 → 난바 → 덴노지 → 아베노 하루카스',note:'난바에서 미도스지선으로 내려가면 이해하기 쉬운 루트입니다.',steps:[['호텔','난바권으로 이동'],['난바 M20','御堂筋線 M'],['덴노지 M23','天王寺 하차'],['아베노 하루카스','역과 연결된 건물로 이동']]},
'h>n':{title:'호텔 → 닛폰바시 K17 → 에비스초 → 신세카이',note:'지하철 한 정거장이라 부담 없는 추가 일정입니다.',steps:[['닛폰바시 K17','堺筋線 K'],['에비스초 K18','恵美須町 하차'],['신세카이','츠텐카쿠 방향 도보']]},
'h>c':{title:'호텔 → 닛폰바시 K17 → 사카이스지혼마치 → 다니마치4초메 → 오사카성',note:'오사카성만 따로 갈 때 쓰는 기본 루트입니다.',steps:[['닛폰바시 K17','堺筋線 K'],['사카이스지혼마치','K15/C17 환승'],['주오선 C','동쪽 방향'],['다니마치4초메 C18','하차'],['오사카성','도보']]}
};
const generic=(a,b,m)=>({title:`${P[a][1]} → ${P[b][1]}`,note:'이 구간은 당일 Google Maps가 제시하는 실제 열차·도보 경로를 우선하세요.',steps:[[P[a][1],'출발'],[modeName(m),'Google Maps 안내 확인'],[P[b][1],'도착']]});
const same=k=>({title:`${P[k][1]}에서 계속`,note:'별도 전철 이동 없이 같은 지역에서 이어지는 일정입니다.',steps:[[P[k][1],'같은 장소에서 다음 일정 진행']]});
function closeOthers(except){document.querySelectorAll('.journey.open').forEach(x=>{if(x!==except)x.classList.remove('open')})}
function build(el,a,b,m,special){
 const data=special==='flight'?{title:'김해국제공항 → 간사이국제공항',note:'TW0321 항공 구간입니다. KIX 도착 후 다음 카드부터 현지 이동 가이드를 사용하세요.',steps:[['김해국제공항','PUS 13:00'],['TW0321','비행 약 1시간 30분'],['간사이국제공항','KIX 14:30']]}:special==='same'?same(b):(R[`${a}>${b}`]||generic(a,b,m));
 const j=document.createElement('div');j.className='journey';
 const label=special==='flight'?'✈️ 항공':special==='same'?'📍 같은 지역':`${modeIcon(m)} ${modeName(m)}`;
 j.innerHTML=`<div class="journey-summary"><div class="left"><span class="kind">${label}</span><b>${data.title}</b></div><span class="tap">설명 보기 ▾</span></div><div class="journey-detail"><div class="journey-title">처음 가는 길 · 이렇게 보면 돼요</div><div class="journey-steps">${data.steps.map((s,i)=>`<div class="journey-step"><div class="no">STEP ${i+1}</div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div><div class="journey-note">💡 ${data.note}</div><div class="journey-actions">${special==='flight'?`<a class="primary" target="_blank" href="${search('k')}">간사이공항 위치 보기 →</a>`:special==='same'?`<a class="primary" target="_blank" href="${search(b)}">Google Maps 위치 보기 →</a>`:`<a class="primary" target="_blank" href="${dir(a,b,m)}">Google Maps에서 이 구간 열기 →</a><a class="secondary" target="_blank" href="${search(b)}">도착지 위치</a>`}</div></div>`;
 el.appendChild(j);
 const toggle=()=>{const open=!j.classList.contains('open');closeOthers(j);j.classList.toggle('open',open);j.querySelector('.tap').textContent=open?'설명 닫기 ▴':'설명 보기 ▾'};
 el.addEventListener('click',e=>{if(e.target.closest('a')||e.target.closest('.journey'))return;toggle()});
 j.querySelector('.journey-summary').addEventListener('click',e=>{e.stopPropagation();toggle()});
 j.querySelectorAll('a').forEach(x=>x.addEventListener('click',e=>e.stopPropagation()));
}
D.forEach((day,di)=>{
 const cards=[...document.querySelectorAll(`.day[data-day="${di}"] .stop`)];
 day[2].forEach((st,si)=>{
  const el=cards[si];if(!el)return;const cur=st[1],m=st[4];
  if(di===0&&si===0)return build(el,null,'k',m,'flight');
  let from;if(si===0)from=cur==='h'?cur:'h';else from=day[2][si-1][1];
  build(el,from,cur,m,from===cur?'same':null);
 });
});
document.querySelectorAll('.opt[data-place]').forEach(el=>{const k=el.dataset.place,m=k==='d'?'walking':'transit';build(el,'h',k,m,null)});
})();