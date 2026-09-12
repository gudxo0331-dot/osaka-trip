(()=>{
  if(typeof D==='undefined'||!D[0]||!Array.isArray(D[0][2])) return;
  const day1=D[0][2];
  if(day1.some(x=>String(x[2]||'').includes('ICOCA'))) return;
  day1.splice(1,0,[
    '15:45*','k','여자친구 실물 ICOCA 구매',
    '입국심사·수하물 수령 후 제1터미널 2층 밖 간사이공항역으로 이동. JR 또는 난카이 전철 역에서 구매 가능. JR 자동발매기(ICOCA 표시)나 JR 티켓오피스를 이용하면 쉬움. ¥2,000로 사면 이용가능액 ¥1,500 + 보증금 ¥500. 카드 구매·충전은 현금 준비. 구매 후 바로 난카이 전철과 오사카 시내 교통에 사용.',
    'walking'
  ]);
})();