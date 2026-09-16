(()=>{if(document.getElementById('food'))return;const nav=document.querySelector('nav');if(nav&&!nav.querySelector('a[href="#food"]')){const a=document.createElement('a');a.href='#food';a.textContent='맛집';nav.insertBefore(a,nav.querySelector('a[href="#prep"]'))}
const airport=document.querySelector('#day1-airport .grid');if(airport&&!document.getElementById('day1-cash')){const card=document.createElement('div');card.className='card';card.id='day1-cash';card.innerHTML='<strong>15:30 전후 · 엔화 현금 출금</strong><p>세관 통과 후 <b>T1 1F Seven Bank ATM</b>에서 신한 SOL트래블 카드로 엔화 출금. 첫날은 <b>¥10,000 정도면 충분</b>하고, 대부분 결제는 카드로 사용. 현금은 여자친구 실물 ICOCA 구매·충전과 현금만 받는 작은 가게용으로 남겨두기.</p><p><a target="_blank" rel="noopener" href="https://www.kansai-airport.or.jp/en/service/money_insurance/atm">KIX ATM 위치 확인 ↗</a></p>';const anchor=[...airport.children].find(x=>x.textContent.includes('15:35 · 간사이공항역'));airport.insertBefore(card,anchor||airport.firstChild)}
const data=[
['🍽 DAY 1 · 9/17 첫날 저녁 후보','난바·도톤보리권에서 저녁 → 글리코상 → 신사이바시 쇼핑 → 돈키호테',[
['Sushi Ginza Onodera MUSUKO NAMBA','카운터 스시','셰프가 바로 앞에서 쥐는 카운터 경험이 장점. 분위기는 좋지만 다른 후보보다 가격대가 높은 편이라 ‘경험값’ 보고 선택.','Sushi Ginza Onodera MUSUKO NAMBA Osaka'],
['Sumibi-yakitori Enya Namba','야키토리','꼬치구이 중심. 첫날 가볍게 술 한잔하며 먹기 좋고 난바 동선과 잘 맞는 후보.','Sumibi Yakitori Enya Namba Osaka'],
['Dotonbori Ichiaki','오코노미야키·철판','오사카 첫 끼 느낌을 가장 강하게 내는 후보. 도톤보리권이라 식후 글리코상 이동이 편함.','Dotonbori Ichiaki Osaka'],
['Creo-Ru Dotonbori','타코야키·오코노미야키·쿠시카츠','한 곳에서 여러 오사카 먹거리를 맛보기 좋은 캐주얼 후보. 첫날 메뉴를 하나로 못 고를 때 편함.','Creo-Ru Dotonbori Osaka'],
['Namba Udon','우동','비행·입국 후 피곤하면 부담 적게 먹는 플랜 B. 빠르고 가볍게 먹고 바로 도톤보리로 움직이기 좋음.','Namba Udon Osaka'],
['Sushimaru Namba Walk','캐주얼 스시','카운터 스시 분위기는 유지하면서 오노데라보다 부담을 낮추고 싶을 때 보는 후보.','Sushimaru Namba Walk Osaka'],
['Tempura to Sushi Sakaba Minaminami','튀김·스시','초밥만 먹기보다 튀김까지 같이 먹고 싶을 때. 캐주얼 이자카야 스타일 후보.','Tempura to Sushi Sakaba Minaminami Osaka'],
['Glico Sign Dotonbori','사진','저녁 후 글리코상·에비스바시 사진.','Glico Sign Dotonbori Osaka'],
['Shinsaibashi-Suji Shopping Street','쇼핑','글리코상에서 북쪽으로 이어지는 상점가. 마감이 빠른 매장부터 먼저 보기.','Shinsaibashi-Suji Shopping Street Osaka'],
['Don Quijote Dotonbori','쇼핑','신사이바시 매장들이 닫기 시작하면 도톤보리 돈키호테로 이동해 마무리 쇼핑.','Don Quijote Dotonbori Osaka']
]],
['🌃 DAY 3 · 9/19 마지막 밤','18:30 저녁 후보 · 확보한 크루즈 시간에 맞춰 조정',[
['마쓰사카규 야키니쿠 M 호젠지요코초점','야키니쿠','여행 마지막 기념식사 후보.','Matsusakagyu Yakiniku M Hozenji Yokocho Osaka'],
['카니도라쿠 도톤보리 본점','게요리','도톤보리 상징적인 특별식.','Kani Doraku Dotonbori Main Branch Osaka'],
['겐로쿠스시 도톤보리점','회전초밥','가격 부담 적은 스시 선택.','Genrokuzushi Dotonbori Osaka'],
['이치란 라멘 도톤보리','라멘','늦은 시간에도 가능한 대표 라멘.','Ichiran Dotonbori Osaka'],
['후쿠타로 본점','네기야키','오코노미야키와 다른 오사카 철판요리.','Fukutaro Honten Osaka'],
['Tombori River Cruise 매표소·선착장','크루즈','저녁 뒤 바로 이동할 수 있게 위치·길찾기 버튼 추가.','Tombori River Cruise Ticket Office Osaka']
]],
['🍢 간식·길거리 후보','돌아다니며 먹기',[
['쿠쿠루 도톤보리','타코야키','도톤보리 대표 길거리 음식.','Takoyaki Kukuru Dotonbori Osaka'],
['와나카 난바','타코야키','여러 맛 비교 가능.','Takoyaki Wanaka Namba Osaka'],
['리쿠로오지상 난바 본점','치즈케이크','오사카 유명 디저트.','Rikuro Ojisan Namba Osaka']
]]
];
const st=document.createElement('style');st.textContent=`#food .food-item{margin:12px 0;padding:11px 12px;border:1px solid #ffffff19;border-radius:13px;background:#171c23}#food .food-item strong{display:block;margin-bottom:3px}#food .food-item small{display:block;color:#b9c2cc;line-height:1.5}#food .food-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}#food .food-actions a{display:inline-flex;align-items:center;justify-content:center;border:1px solid #ffffff22;border-radius:999px;padding:6px 10px;text-decoration:none;font-size:.68rem;font-weight:700}#food .food-actions .map{color:#e0ad5d}#food .food-actions .dir{color:#8db9e8}`;document.head.appendChild(st);
const q=s=>encodeURIComponent(s);const maps=s=>`https://www.google.com/maps/search/?api=1&query=${q(s)}`;const dirs=s=>`https://www.google.com/maps/dir/?api=1&destination=${q(s)}`;
const sec=document.createElement('section');sec.className='sec';sec.id='food';sec.innerHTML='<div class="title"><h2>🍽 맛집 후보</h2><span>DAY 1·3 위치 + 현재 위치 길찾기</span></div><p>각 후보에 <b>📍 위치 보기</b>와 <b>🧭 현재 위치에서 길찾기</b>를 붙였어요. 길찾기는 출발지를 비워둬서 휴대폰에서 열면 Google Maps가 현재 위치를 기준으로 바로 안내합니다.</p>'+data.map(x=>`<div class="card"><h3>${x[0]}</h3><p>${x[1]}</p>${x[2].map(a=>`<div class="food-item"><strong>${a[0]}</strong><small>${a[1]} · ${a[2]}</small><div class="food-actions"><a class="map" target="_blank" rel="noopener" href="${maps(a[3])}">📍 위치 보기</a><a class="dir" target="_blank" rel="noopener" href="${dirs(a[3])}">🧭 현재 위치에서 길찾기</a></div></div>`).join('')}</div>`).join('');document.getElementById('prep').parentNode.insertBefore(sec,document.getElementById('prep'));})();