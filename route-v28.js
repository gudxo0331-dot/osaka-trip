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
      diff:'환승 1회',path:'긴테츠닛폰바시 → 한신/긴테츠 난바선 직통 → 니시쿠조 → JR 유메사키선 → 유니버설시티',
      steps:[
        '호텔에서 <b>Kintetsu-Nippombashi · 近鉄日本橋</b>역까지 도보 이동. 호텔 공식 안내 기준 약 4분.',
        '개찰구에서 <b>大阪難波・尼崎方面 / Osaka-Namba·Amagasaki 방면</b> 열차를 확인. 긴테츠나라선에서 한신난바선으로 직통하는 열차를 타면 난바에서 갈아탈 필요가 없다.',
        '<b>Nishikujo · 西九条</b>에서 하차.',
        'JR 표지판을 따라 <b>JR Yumesaki Line / ゆめ咲線</b>으로 환승.',
        '<b>Universal City · ユニバーサルシティ</b>에서 하차.',
        '역에서 USJ 입구까지 안내 표지와 인파를 따라 도보 이동.'
      ],
      signs:['近鉄日本橋 Kintetsu-Nippombashi','大阪難波・尼崎方面','西九条 Nishikujo','JR ゆめ咲線','Universal City'],
      note:'호텔 공식 안내도 “긴테츠닛폰바시 → 니시쿠조 → JR 유메사키선 → 유니버설시티” 약 38분 경로를 안내한다. 아침에는 실제 열차 출발시각만 Google Maps로 확인하면 된다.'
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
    'q>j':{
      diff:'도보',path:'구로몬시장 → 도톤보리 리버크루즈 매표소',
      steps:['구로몬시장에서 <b>Dotonbori / 道頓堀</b> 방향으로 도보 이동.','Tombori River Cruise 매표소 위치를 Google Maps에서 확인해 20:00 희망편 승선권을 교환.'],
      signs:['道頓堀 Dotonbori','Tombori River Cruise'],
      note:'주유패스로 저녁 크루즈를 탈 계획이면 공식 안내대로 낮에 시간 지정권을 먼저 확보하는 게 안전하다.'
    },
    'j>n':{
      diff:'직통 1정거장',path:'도톤보리 → 닛폰바시 K17 → 에비스초 K18 → 신세카이',
      steps:['크루즈 매표소에서 <b>Nippombashi · 日本橋 K17</b>역으로 이동.','<b>堺筋線 / Sakaisuji Line</b> 덴가차야 방면을 타고 한 정거장 뒤 <b>Ebisucho · 恵美須町 K18</b> 하차.','츠텐카쿠·신세카이 표지판을 따라 도보 이동.'],
      signs:['日本橋 K17','堺筋線 K','恵美須町 K18','通天閣 Tsutenkaku'],
      note:'한 정거장이라 간단하다. 날씨 좋고 걷고 싶으면 도보도 가능하지만, DAY 3 체력 보존을 위해 전철 추천.'
    },
    'n>c':{
      diff:'환승 1회',path:'에비스초 K18 → 사카이스지혼마치 K15 → 주오선 → 다니마치4초메 → 오사카성',
      steps:['신세카이에서 <b>Ebisucho · 恵美須町 K18</b>역으로 이동.','사카이스지선 북쪽 방면으로 <b>Sakaisuji-Hommachi · 堺筋本町 K15</b> 하차.','<b>中央線 / Chuo Line</b> 동쪽 방면으로 환승.','<b>Tanimachi 4-chome · 谷町四丁目 C18</b>에서 하차해 오사카성 방향으로 도보 이동.'],
      signs:['恵美須町 K18','堺筋本町 K15','中央線 C','谷町四丁目 C18','大阪城'],
      note:'오사카성은 역에서 천수각까지 공원 안을 꽤 걷기 때문에 이동시간을 넉넉히 잡는다.'
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
    'c>h':{
      diff:'환승 1회',path:'다니마치4초메 → 주오선 → 사카이스지혼마치 → 사카이스지선 → 닛폰바시 → 호텔',
      steps:['오사카성에서 <b>Tanimachi 4-chome · 谷町四丁目 C18</b>역으로 이동.','<b>中央線 / Chuo Line</b> 서쪽 방면으로 <b>Sakaisuji-Hommachi · 堺筋本町 C17</b> 하차.','<b>堺筋線 / Sakaisuji Line</b> 남쪽 방면으로 환승해 <b>Nippombashi · 日本橋 K17</b> 하차.','6번 출구 쪽으로 나와 호텔까지 도보 이동.'],
      signs:['谷町四丁目 C18','中央線 C','堺筋本町','堺筋線 K','日本橋 K17'],
      note:'DAY 3은 USJ 다음날이라 오사카성 뒤 호텔로 돌아와 1시간 이상 쉬는 흐름으로 잡았다.'
    },
    'c>w':{
      diff:'주유패스 · 지하철 직통',path:'오사카성 → 다니마치4초메 T23 → 히가시우메다 T20 → 스카이빌딩',
      steps:['오사카성에서 <b>Tanimachi 4-chome · 谷町四丁目 T23</b>역까지 도보 이동. 공원 내 걷는 시간 포함.','<b>谷町線 / Tanimachi Line</b> 다이니치 방면 열차 탑승.','<b>Higashi-Umeda · 東梅田 T20</b>에서 하차.','오사카역 북쪽을 지나 <b>Umeda Sky Building</b>까지 도보 이동. 역 출구부터 약 20~30분 여유를 잡고 실제 길은 Google Maps 확인.'],
      signs:['谷町線 T','谷町四丁目 T23','東梅田 T20','梅田スカイビル'],
      note:'우메다 스카이빌딩은 이제 메인 일정이 아니라 교체용 선택지다. 넣는다면 오사카성 또는 신세카이 시간을 줄여야 한다.'
    },
    'j>c':{
      diff:'주유패스 · 환승 1회',path:'크루즈 매표소 → 닛폰바시 K17 → 사카이스지혼마치 → 다니마치4초메 → 오사카성',
      steps:['승선권 교환 후 <b>Nippombashi · 日本橋 K17</b>역까지 도보 이동.','사카이스지선 북쪽 방면으로 <b>Sakaisuji-Hommachi · 堺筋本町</b>까지 이동.','<b>中央線 / Chuo Line</b> 동쪽 방면으로 환승해 <b>Tanimachi 4-chome · 谷町四丁目</b> 하차.','공원을 걸어 천수각까지 이동.'],
      signs:['日本橋 K17','堺筋本町','中央線 C','谷町四丁目'],
      note:'리버크루즈 승선권 교환 뒤 신세카이를 거치지 않고 바로 오사카성으로 갈 때 쓰는 대안 경로.'
    },
    'm>h':{
      diff:'지하철',path:'오사카역 주변 → 미도스지선 우메다 M16 → 난바 M20 → 호텔',
      steps:['쇼핑 후 <b>Osaka Metro Umeda · 梅田 M16</b>역으로 이동.','<b>御堂筋線 / Midosuji Line</b> 나카모즈 방면 열차를 타고 <b>Namba · なんば M20</b> 하차.','난바역에서 호텔까지 Google Maps 도보 안내로 이동.'],
      signs:['御堂筋線 M','梅田 M16','なんば M20'],
      note:'우메다는 선택지로 바뀌었으므로 실제로 방문했을 때만 사용.'
    },
    'm>d':{
      diff:'쉬움',path:'우메다 → Osaka Metro 미도스지선 → 난바 → 도톤보리',
      steps:[
        '오사카역 주변에서 <b>Umeda · 梅田</b>역 방향으로 이동.',
        '<b>御堂筋線 / Midosuji Line / M</b>을 찾아 남쪽 난바 방면 열차를 탄다.',
        '<b>Namba · なんば</b>에서 하차.',
        '난바역에서 도톤보리 방향으로 도보 이동.'
      ],
      signs:['御堂筋線 M','梅田 Umeda','なんば Namba','道頓堀'],
      note:'우메다에는 역 이름이 비슷한 곳이 많다. “Osaka Metro 미도스지선 Umeda”를 찾는다고 생각하면 된다.'
    },
    'd>j':{
      diff:'도보',path:'도톤보리 저녁 → 리버크루즈 선착장',
      steps:['저녁 식당에서 <b>Tombori River Cruise</b> 매표소·선착장 방향으로 도보 이동.','시간 지정권에 적힌 집합시간과 현장 안내를 우선.'],
      signs:['Tombori River Cruise','道頓堀 Dotonbori'],
      note:'20:00 승선권을 확보했다면 19:45 전후 도착 목표.'
    },
    'j>d':{
      diff:'도보',path:'리버크루즈 → 도톤보리 마지막 밤',
      steps:['하선 후 도톤보리 강변으로 이동.','글리코사인·상점가·간식은 시간표 없이 여유 있게 즐긴다.'],
      signs:['道頓堀','戎橋 Ebisubashi'],
      note:'마지막 일정이라 체력에 따라 바로 호텔로 돌아가도 된다.'
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
      note:'2026/9/1–2027/1/5 임시 휴관으로 이번 여행에서는 제외.'
    },
    'h>v':{
      diff:'환승 1회',path:'닛폰바시 → 도부츠엔마에 → 미도스지선 → 덴노지 → 아베노 하루카스',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 남쪽 방면 탑승.','<b>Dobutsuen-mae</b>에서 <b>御堂筋線</b>으로 환승.','한 정거장 이동해 <b>Tennoji · 天王寺</b> 하차.','역과 연결된 아베노 하루카스 방향으로 이동.'],
      signs:['堺筋線 K','動物園前','御堂筋線 M','天王寺 Tennoji','あべのハルカス'],
      note:'우메다 대신 남쪽 야경을 보고 싶을 때 동선이 괜찮다.'
    },
    'h>w':{
      diff:'환승 1회',path:'닛폰바시 → 난바 → 미도스지선 → 우메다 → 스카이빌딩',
      steps:['닛폰바시 S17에서 <b>千日前線 / Sennichimae Line</b>으로 난바 S16 이동.','<b>御堂筋線 / Midosuji Line</b> 우메다 방면으로 환승.','<b>Umeda · 梅田 M16</b> 하차 후 오사카역 북쪽을 지나 스카이빌딩까지 도보 이동.'],
      signs:['千日前線 S','なんば S16','御堂筋線 M','梅田 M16','梅田スカイビル'],
      note:'DAY 3 메인 일정에서는 제외한 교체용 선택지. 왕복까지 생각하면 2~3시간을 따로 잡는 편이 좋다.'
    },
    'h>n':{
      diff:'직통 1정거장',path:'닛폰바시 K17 → 에비스초 K18 → 신세카이',
      steps:['닛폰바시 K17에서 <b>堺筋線</b> 덴가차야 방면 탑승.','바로 다음 <b>Ebisucho · 恵美須町 K18</b>에서 하차.','츠텐카쿠·신세카이 표지판을 따라 도보 이동.'],
      signs:['堺筋線 K','恵美須町 K18','通天閣 Tsutenkaku'],
      note:'숙소에서 매우 가까워 이동이 간단하다.'
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
  window.OsakaRouteGuide=getGuide;
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