(()=>{
  if(typeof D==='undefined'||typeof P==='undefined') return;

  const modeName=m=>m==='walking'?'도보':'전철/대중교통';
  const modeIcon=m=>m==='walking'?'🚶':'🚇';
  const dir=(a,b,m)=>`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(P[a][2])}&destination=${encodeURIComponent(P[b][2])}&travelmode=${m==='walking'?'walking':'transit'}&hl=ko`;
  const search=k=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(P[k][2])}&hl=ko`;

  const G={
    'k>h':{
      diff:'환승 1회',path:'KIX → 난카이 덴가차야 → Osaka Metro 닛폰바시 K17 → 호텔',
      steps:[
        '<b>간사이공항 도착층</b>에서 입국심사·수하물 수령 후 “Railways / Train” 표지판을 따라 전철역으로 이동.',
        '<b>NANKAI · 南海</b> 표지판을 찾고 난카이 개찰구로 간다. ICOCA가 있으면 교통카드로 통과 가능.',
        '<b>Airport Express(공항급행) 난바 방면</b>을 타고 <b>Tengachaya · 天下茶屋</b>에서 내린다.',
        '난카이 개찰구를 나온 뒤 <b>Osaka Metro 堺筋線 / Sakaisuji Line / K</b> 표지판을 따라 지하철로 환승.',
        '덴가차야는 남쪽 종점이라 북쪽 방면 열차를 타고 <b>Nippombashi · 日本橋 K17</b>에서 하차.',
        '닛폰바시역에서 숙소 방향으로 나와 호텔까지 도보 이동. 현장에서는 Google Maps가 안내하는 출구를 우선 확인.'
      ],
      signs:['NANKAI 南海','Airport Express','天下茶屋 Tengachaya','堺筋線 K','日本橋 K17'],
      note:'공항에서 열차 시간·플랫폼은 당일 달라질 수 있어. “난카이 → 덴가차야 → 닛폰바시”만 기억하고 실제 출발 열차는 Google Maps를 보면 된다.'
    },
    'h>d':{
      diff:'매우 쉬움',path:'호텔 → 도톤보리 · 글리코사인',
      steps:[
        '호텔에서 나와 <b>도톤보리 강 / Dotonbori</b> 방향으로 걷는다.',
        '큰 네온 간판과 강이 보이면 도톤보리 구역. <b>에비스바시(Ebisubashi)</b> 쪽으로 가면 글리코사인이 나온다.',
        '전철 탈 필요 없이 계속 도보로 움직이면 된다.'
      ],
      signs:['道頓堀 Dotonbori','戎橋 Ebisubashi','Glico'],
      note:'첫날은 길을 외우려고 하지 말고 Google Maps 도보 모드로 호텔→글리코사인만 켜놓고 따라가면 된다.'
    },
    'd>s':{
      diff:'매우 쉬움',path:'도톤보리 → 신사이바시',
      steps:[
        '도톤보리의 <b>에비스바시</b>에서 북쪽으로 이동.',
        '<b>Shinsaibashi-suji / 心斎橋筋</b> 상점가 방향으로 계속 걷는다.',
        '상점가를 따라가면 자연스럽게 신사이바시 중심부로 이어진다.'
      ],
      signs:['心斎橋筋','Shinsaibashi-suji'],
      note:'둘 다 같은 번화가 권역이라 지하철을 타는 것보다 걷는 게 단순하다.'
    },
    'h>u':{
      diff:'환승 있음',path:'닛폰바시 → 난바 → 오사카난바 → 니시쿠조 → 유니버설시티',
      steps:[
        '호텔에서 <b>Nippombashi · 日本橋</b>역으로 이동.',
        '<b>千日前線 / Sennichimae Line / S</b>을 타고 <b>Namba · なんば</b>까지 1정거장 이동.',
        '난바역에서 <b>Osaka-Namba · 大阪難波 / Hanshin 阪神</b> 표지판을 따라 연결 통로로 이동.',
        '<b>Hanshin Namba Line</b>을 타고 <b>Nishikujo · 西九条</b>에서 하차.',
        '니시쿠조에서 <b>JR Yumesaki Line / ゆめ咲線</b>으로 갈아타고 <b>Universal City · ユニバーサルシティ</b> 하차.',
        '역에서 나오면 사람들이 대부분 USJ 방향으로 이동한다. 파크 입구까지 도보 이동.'
      ],
      signs:['千日前線 S','なんば Namba','大阪難波 Osaka-Namba','西九条 Nishikujo','JR ゆめ咲線','Universal City'],
      note:'USJ 가는 날은 아침 시간대라 Google Maps에서 “도착시간”을 보고 출발하면 좋다. 니시쿠조→유니버설시티 구간은 USJ 공식 안내에도 나오는 핵심 구간이다.'
    },
    'h>q':{
      diff:'매우 쉬움',path:'호텔 → 구로몬시장',
      steps:[
        '호텔에서 <b>Kuromon Ichiba Market / 黒門市場</b> 방향으로 도보 이동.',
        '시장 입구 간판이 보이면 그대로 안쪽 상점가를 따라 구경하면 된다.'
      ],
      signs:['黒門市場','Kuromon Market'],
      note:'숙소와 매우 가까운 권역이라 전철은 필요 없다.'
    },
    'q>c':{
      diff:'환승 1회',path:'닛폰바시 K17 → 사카이스지혼마치 K15 → 주오선 환승 → 다니마치4초메 → 오사카성',
      steps:[
        '구로몬시장에서 <b>Nippombashi · 日本橋 K17</b>역으로 돌아간다.',
        '<b>堺筋線 / Sakaisuji Line</b> 북쪽 방면을 타고 <b>Sakaisuji-Hommachi · 堺筋本町 K15</b> 하차.',
        '역 안에서 <b>中央線 / Chuo Line / C</b> 표지판을 따라 환승.',
        '동쪽 방면 열차를 타고 <b>Tanimachi 4-chome · 谷町四丁目</b>에서 하차.',
        '역에서 나온 뒤 <b>Osaka Castle / 大阪城</b> 방향으로 공원을 걸어 천수각 쪽으로 이동.'
      ],
      signs:['堺筋線 K','堺筋本町 K15','中央線 C','谷町四丁目','大阪城'],
      note:'오사카성은 역에서 내린 뒤에도 공원 안을 꽤 걷는다. 이 구간은 신발 편한 걸 추천.'
    },
    'c>m':{
      diff:'쉬움',path:'오사카성 → JR 오사카조코엔 → 오사카역 → 우메다',
      steps:[
        '오사카성 관람 후 Google Maps를 켜고 <b>Osakajokoen · 大阪城公園</b>역으로 이동.',
        '<b>JR Osaka Loop Line / 大阪環状線</b>에서 <b>Osaka · 大阪</b> 방면 열차를 탄다.',
        '<b>Osaka Station</b>에서 내리면 그 주변이 바로 우메다 중심권.',
        '우메다 스카이빌딩은 오사카역에서 다시 도보 이동.'
      ],
      signs:['JR','大阪環状線 Osaka Loop Line','大阪 Osaka','梅田 Umeda'],
      note:'오사카성 공원이 넓어서 실제로는 “어느 출구로 공원을 나왔는지”에 따라 가까운 JR역이 달라질 수 있다. 그때는 Google Maps가 제시하는 JR역을 우선하면 된다.'
    },
    'm>d':{
      diff:'쉬움',path:'우메다 → Osaka Metro 미도스지선 → 난바 → 도톤보리',
      steps:[
        '우메다 스카이빌딩에서 <b>Umeda · 梅田</b>역 방향으로 이동.',
        '<b>御堂筋線 / Midosuji Line / M</b>을 찾아 남쪽 난바 방면 열차를 탄다.',
        '<b>Namba · なんば</b>에서 하차.',
        '난바역에서 도톤보리 방향으로 도보 이동.'
      ],
      signs:['御堂筋線 M','梅田 Umeda','なんば Namba','道頓堀'],
      note:'우메다에는 역 이름이 비슷한 곳이 많다. “Osaka Metro 미도스지선 Umeda”를 찾는다고 생각하면 된다.'
    },
    'd>h':{
      diff:'매우 쉬움',path:'도톤보리 → 호텔',
      steps:['도톤보리에서 <b>호텔 이름(Sotetsu Grand Fresa Osaka Namba)</b>을 Google Maps 목적지로 잡고 도보 이동.','닛폰바시 방향으로 이동하면 된다.'],
      signs:['日本橋 Nippombashi','Sotetsu Grand Fresa'],
      note:'밤에는 지하철보다 그냥 걸어서 숙소로 돌아가는 게 간단한 거리다.'
    },
    'h>k':{
      diff:'환승 1회',path:'호텔 → 닛폰바시 K17 → 덴가차야 K20 → 난카이 → KIX',
      steps:[
        '짐을 찾은 뒤 호텔에서 <b>Nippombashi · 日本橋 K17</b>역으로 이동.',
        '<b>堺筋線 / Sakaisuji Line</b>에서 <b>Tengachaya · 天下茶屋</b> 방면 열차 탑승.',
        '<b>Tengachaya K20</b>에서 내려 난카이 전철 <b>NANKAI · 南海</b> 표지판을 따라 환승.',
        '<b>Kansai Airport / 関西空港</b> 방면 Airport Express 또는 당일 선택한 공항열차 탑승.',
        '<b>Kansai-Airport</b>역에서 하차 후 항공편 출발 터미널·체크인 카운터 확인.'
      ],
      signs:['堺筋線 K','天下茶屋 K20','NANKAI 南海','関西空港 Kansai Airport'],
      note:'귀국일은 열차 자체보다 공항 도착 여유가 중요하다. 계획한 출발시간에 맞춰 Google Maps의 실제 열차를 우선 사용.'
    },
    'h>a':{
      diff:'환승 1회',path:'닛폰바시 → 사카이스지혼마치 → 주오선 → 오사카코 → 가이유칸',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 북쪽 방면 탑승.','<b>Sakaisuji-Hommachi</b>에서 <b>中央線 / Chuo Line</b>으로 환승.','서쪽 <b>Yumeshima / 夢洲</b> 방면을 타고 <b>Osakako · 大阪港</b> 하차.','역에서 가이유칸까지 도보 이동.'],
      signs:['堺筋線 K','中央線 C','大阪港 Osakako','海遊館 Kaiyukan'],
      note:'비 오는 날 선택지 중 이동이 비교적 단순한 편.'
    },
    'h>t':{
      diff:'환승 1회',path:'닛폰바시 → 도부츠엔마에 → 미도스지선 → 나가이 → teamLab',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 남쪽 덴가차야 방면 탑승.','<b>Dobutsuen-mae · 動物園前</b>에서 <b>御堂筋線 / Midosuji Line</b>으로 환승.','남쪽 방면으로 <b>Nagai · 長居</b> 하차.','나가이공원·식물원 안 teamLab 위치까지 도보 이동.'],
      signs:['堺筋線 K','動物園前','御堂筋線 M','長居 Nagai'],
      note:'야간 운영시간·입장시간은 방문일에 다시 확인해야 한다.'
    },
    'h>b':{
      diff:'직통',path:'닛폰바시 K17 → 기타하마 K14 → 나카노시마',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 북쪽 방면 탑승.','<b>Kitahama · 北浜 K14</b>에서 하차.','강변·나카노시마 방향으로 도보 이동.'],
      signs:['堺筋線 K','北浜 Kitahama','中之島 Nakanoshima'],
      note:'환승 없이 갈 수 있어서 잠깐 산책·카페용으로 편하다.'
    },
    'h>r':{
      diff:'난바 경유',path:'호텔 → 난카이 난바 → 난카이 본선 → 스미요시타이샤',
      steps:['호텔에서 <b>Nankai Namba · 南海なんば</b>역으로 이동.','난카이 본선에서 <b>Sumiyoshitaisha · 住吉大社</b> 정차 열차를 확인해 탑승.','스미요시타이샤역에서 하차 후 신사까지 도보 이동.'],
      signs:['南海 NANKAI','住吉大社 Sumiyoshitaisha'],
      note:'열차 종류별 정차역이 다를 수 있으니 승차 직전 Google Maps에 표시되는 열차명을 확인.'
    },
    'h>o':{
      diff:'직통',path:'닛폰바시 K17 → 덴진바시스지6초메 → 오사카 주택박물관',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 북쪽 방면 탑승.','<b>Tenjimbashisuji 6-chome · 天神橋筋六丁目</b>에서 하차.','역에서 오사카 주택박물관 안내를 따라 이동.'],
      signs:['堺筋線 K','天神橋筋六丁目','大阪くらしの今昔館'],
      note:'실내 후보라 날씨가 안 좋을 때 쓰기 좋다.'
    },
    'h>v':{
      diff:'환승 1회',path:'닛폰바시 → 도부츠엔마에 → 미도스지선 → 덴노지 → 아베노 하루카스',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 남쪽 방면 탑승.','<b>Dobutsuen-mae</b>에서 <b>御堂筋線</b>으로 환승.','한 정거장 이동해 <b>Tennoji · 天王寺</b> 하차.','역과 연결된 아베노 하루카스 방향으로 이동.'],
      signs:['堺筋線 K','動物園前','御堂筋線 M','天王寺 Tennoji','あべのハルカス'],
      note:'우메다 대신 남쪽 야경을 보고 싶을 때 동선이 괜찮다.'
    },
    'h>n':{
      diff:'직통 1정거장',path:'닛폰바시 K17 → 에비스초 K18 → 신세카이',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 덴가차야 방면 탑승.','바로 다음 <b>Ebisucho · 恵美須町 K18</b>에서 하차.','츠텐카쿠·신세카이 표지판을 따라 도보 이동.'],
      signs:['堺筋線 K','恵美須町 K18','通天閣 Tsutenkaku'],
      note:'숙소에서 매우 가까운 추가 선택지라 체력이 남을 때 넣기 쉽다.'
    },
    'h>c':{
      diff:'환승 1회',path:'닛폰바시 → 사카이스지혼마치 → 주오선 → 다니마치4초메 → 오사카성',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 북쪽 방면 탑승.','<b>Sakaisuji-Hommachi</b>에서 <b>中央線</b> 동쪽 방면으로 환승.','<b>Tanimachi 4-chome</b>에서 하차 후 오사카성 공원으로 도보 이동.'],
      signs:['堺筋線 K','中央線 C','谷町四丁目','大阪城'],
      note:'선택지에서 오사카성을 단독으로 넣을 때 쓰는 기본 경로.'
    }
  };

  const generic=(a,b,m)=>({
    diff:m==='walking'?'도보':'실시간 확인',
    path:`${P[a][1]} → ${P[b][1]}`,
    steps:[`${P[a][1]}에서 출발.`,m==='walking'?`${P[b][1]}까지 Google Maps 도보 안내를 따라 이동.`:`Google Maps에서 추천하는 당일 전철·환승 경로를 확인하고 ${P[b][1]}까지 이동.`],
    signs:[P[a][1],P[b][1]],
    note:'열차 시간·플랫폼·공사 정보는 여행 당일 Google Maps의 실시간 안내를 우선하세요.'
  });

  const getGuide=(a,b,m)=>G[`${a}>${b}`]||generic(a,b,m);
  const mainBox=document.querySelector('.mapbox');
  const optBox=document.querySelector('.optmapbox');

  const mkPanel=(box,id,title)=>{
    if(!box) return null;
    const p=document.createElement('div');
    p.className='legpanel';p.id=id;
    p.innerHTML=`<div class="head"><b>${title}</b><span class="mode">카드를 눌러보세요</span></div><div class="route">출발지 → 도착지</div><div class="routepath">일정 카드를 누르면 초행길용 추천 경로가 표시됩니다.</div><div class="hint">상세 단계는 선택한 일정 카드 안에서 바로 펼쳐집니다.</div><div class="actions"></div>`;
    box.appendChild(p);return p;
  };

  const mainPanel=mkPanel(mainBox,'legPanel','🧭 초행길 이동 가이드');
  const optPanel=mkPanel(optBox,'optLegPanel','🧭 선택지 이동 가이드');

  function renderDetail(el,a,b,m,g){
    document.querySelectorAll('.stop.route-open,.opt.route-open').forEach(x=>{if(x!==el)x.classList.remove('route-open')});
    el.classList.add('route-open');
    let d=el.querySelector('.routeDetail');
    if(!d){d=document.createElement('div');d.className='routeDetail';el.appendChild(d)}
    d.innerHTML=`<div class="rdtitle">🪧 처음 가도 이렇게 따라가면 돼요</div><div class="rdsum">${g.path}</div><div class="rdsteps">${g.steps.map((x,i)=>`<div class="rdstep"><span class="rdnum">${i+1}</span><div class="rdtext">${x}</div></div>`).join('')}</div><div class="rdsigns">${g.signs.map(x=>`<span class="rdsign">찾기: ${x}</span>`).join('')}</div><div class="rdnote">💡 ${g.note}</div><div class="rdactions"><a class="primary" target="_blank" href="${dir(a,b,m)}">Google Maps에서 출발→도착 바로 열기 →</a><a class="search" target="_blank" href="${search(b)}">도착지 위치</a></div>`;
    d.querySelectorAll('a').forEach(x=>x.addEventListener('click',e=>e.stopPropagation()));
  }

  function panelRoute(panel,a,b,m,g){
    if(!panel) return;
    panel.querySelector('.mode').textContent=`${modeIcon(m)} ${g.diff}`;
    panel.querySelector('.route').innerHTML=`<b>${P[a][1]}</b> → <b>${P[b][1]}</b>`;
    panel.querySelector('.routepath').textContent=g.path;
    panel.querySelector('.hint').textContent='카드 안에 단계별 설명이 펼쳐졌어요. 실제 열차 시간·플랫폼은 출발 직전 Google Maps를 우선하세요.';
    panel.querySelector('.actions').innerHTML=`<a class="primary" target="_blank" href="${dir(a,b,m)}">Google Maps 바로 길찾기 →</a><a class="muted" target="_blank" href="${search(a)}">출발지</a><a class="muted" target="_blank" href="${search(b)}">도착지</a>`;
  }

  function panelSame(panel,k,el){
    if(!panel) return;
    panel.querySelector('.mode').textContent='📍 같은 장소';
    panel.querySelector('.route').innerHTML=`<b>${P[k][1]}</b>에서 계속`;
    panel.querySelector('.routepath').textContent='별도 환승 없이 같은 지역에서 이어지는 일정';
    panel.querySelector('.hint').textContent='장소를 옮기는 일정이 아니라서 위치만 확인하면 됩니다.';
    panel.querySelector('.actions').innerHTML=`<a class="primary" target="_blank" href="${search(k)}">Google Maps에서 위치 보기 →</a>`;
    document.querySelectorAll('.stop.route-open,.opt.route-open').forEach(x=>x.classList.remove('route-open'));
    if(el){el.classList.add('route-open');let d=el.querySelector('.routeDetail');if(!d){d=document.createElement('div');d.className='routeDetail';el.appendChild(d)}d.innerHTML='<div class="rdtitle">📍 같은 지역에서 계속</div><div class="rdnote">전철을 새로 탈 필요가 없는 일정입니다. 주변에서 그대로 다음 일정으로 이어가면 돼요.</div>';}
  }

  function panelFlight(panel,el){
    if(!panel) return;
    panel.querySelector('.mode').textContent='✈️ TW0321';
    panel.querySelector('.route').innerHTML='<b>김해국제공항</b> → <b>간사이국제공항</b>';
    panel.querySelector('.routepath').textContent='PUS 13:00 → KIX 14:30';
    panel.querySelector('.hint').textContent='항공 구간입니다. KIX 도착 후 다음 “공항 → 호텔” 카드를 누르면 전철 이동법이 단계별로 나옵니다.';
    panel.querySelector('.actions').innerHTML=`<a class="primary" target="_blank" href="${search('k')}">간사이공항 위치 보기 →</a>`;
    document.querySelectorAll('.stop.route-open,.opt.route-open').forEach(x=>x.classList.remove('route-open'));
    if(el){el.classList.add('route-open');let d=el.querySelector('.routeDetail');if(!d){d=document.createElement('div');d.className='routeDetail';el.appendChild(d)}d.innerHTML='<div class="rdtitle">✈️ 항공 구간</div><div class="rdnote">부산에서 탑승할 때는 TW0321을 확인. 간사이공항에 도착한 뒤 입국심사와 짐 수령을 마치고 다음 카드의 NANKAI 안내를 따라가면 됩니다.</div>';}
  }

  D.forEach((day,di)=>{
    const cards=[...document.querySelectorAll(`.day[data-day="${di}"] .stop`)];
    day[2].forEach((st,si)=>{
      const el=cards[si]; if(!el) return;
      const cur=st[1],m=st[4];
      let from=null,same=false,flight=false;
      if(di===0&&si===0){flight=true;}
      else if(si===0){if(cur!=='h')from='h';else same=true;}
      else {const prev=day[2][si-1][1];if(prev===cur)same=true;else from=prev;}
      const line=document.createElement('div');line.className='legline';
      if(flight){line.innerHTML='<div class="legtop"><span class="mode">✈️ 항공</span><span class="diff">확정</span><b>김해국제공항 → 간사이국제공항</b></div><span class="mini">카드 클릭 → 도착 후 다음 이동 안내까지 확인</span>';}
      else if(same){line.innerHTML=`<div class="legtop"><span class="mode">📍 같은 지역</span><b>${P[cur][1]}에서 계속</b></div><span class="mini">별도 전철 이동 없음</span>`;}
      else if(from){const g=getGuide(from,cur,m);line.innerHTML=`<div class="legtop"><span class="mode">${modeIcon(m)} ${modeName(m)}</span><span class="diff">${g.diff}</span><b>${P[from][1]} → ${P[cur][1]}</b></div><span class="mini">${g.path} · 카드 클릭하면 단계별 설명</span><a target="_blank" href="${dir(from,cur,m)}">Google Maps 바로 열기 →</a>`;}
      el.appendChild(line);
      el.addEventListener('click',e=>{
        if(e.target.closest('a'))return;
        if(flight)panelFlight(mainPanel,el);
        else if(same)panelSame(mainPanel,cur,el);
        else if(from){const g=getGuide(from,cur,m);panelRoute(mainPanel,from,cur,m,g);renderDetail(el,from,cur,m,g)}
      });
      line.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
    });
  });

  document.querySelectorAll('.opt[data-place]').forEach(el=>{
    const k=el.dataset.place,m=k==='d'?'walking':'transit';
    const g=getGuide('h',k,m);
    const line=document.createElement('div');line.className='legline';
    line.innerHTML=`<div class="legtop"><span class="mode">${modeIcon(m)} ${modeName(m)}</span><span class="diff">${g.diff}</span><b>호텔 → ${P[k][1]}</b></div><span class="mini">${g.path} · 카드 클릭하면 이동법 펼치기</span><a target="_blank" href="${dir('h',k,m)}">Google Maps 바로 열기 →</a>`;
    el.appendChild(line);
    el.addEventListener('click',e=>{if(e.target.closest('a'))return;panelRoute(optPanel,'h',k,m,g);renderDetail(el,'h',k,m,g)});
    line.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
  });

  const help=document.createElement('div');help.className='routeGuideHelp';help.innerHTML='<b>사용법:</b> 일정 카드 클릭 → 지도 위치 + “어느 역/노선/환승/표지판을 찾는지” 설명 펼침 → 출발 직전에 Google Maps 버튼으로 실제 열차 확인.';
  if(mainPanel)mainPanel.appendChild(help);

  panelFlight(mainPanel,null);
  if(optPanel&&P.a){const g=getGuide('h','a','transit');panelRoute(optPanel,'h','a','transit',g)}
})();