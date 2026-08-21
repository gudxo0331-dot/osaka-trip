(()=>{
  if(typeof D==='undefined'||typeof P==='undefined') return;
  const modeName=m=>m==='walking'?'도보':'전철/대중교통';
  const modeIcon=m=>m==='walking'?'🚶':'🚇';
  const dir=(a,b,m)=>`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(P[a][2])}&destination=${encodeURIComponent(P[b][2])}&travelmode=${m==='walking'?'walking':'transit'}&hl=ko`;
  const search=k=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(P[k][2])}&hl=ko`;
  const mainBox=document.querySelector('.mapbox');
  const optBox=document.querySelector('.optmapbox');
  const mkPanel=(box,id,title)=>{
    if(!box) return null;
    const p=document.createElement('div');
    p.className='legpanel';p.id=id;
    p.innerHTML=`<div class="head"><b>${title}</b><span class="mode">카드를 눌러보세요</span></div><div class="route">출발지 → 도착지를 여기서 바로 확인</div><div class="hint">구글맵을 열면 해당 구간의 실제 열차·도보 경로가 표시됩니다.</div><div class="actions"></div>`;
    box.appendChild(p);return p;
  };
  const mainPanel=mkPanel(mainBox,'legPanel','🧭 초행길 이동 가이드');
  const optPanel=mkPanel(optBox,'optLegPanel','🧭 선택지 이동 가이드');
  function panelRoute(panel,a,b,m){
    if(!panel) return;
    panel.querySelector('.mode').textContent=`${modeIcon(m)} ${modeName(m)}`;
    panel.querySelector('.route').innerHTML=`<b>${P[a][1]}</b> → <b>${P[b][1]}</b>`;
    panel.querySelector('.hint').textContent='아래 버튼은 출발지와 도착지가 이미 입력된 구글맵 길찾기입니다.';
    panel.querySelector('.actions').innerHTML=`<a class="primary" target="_blank" href="${dir(a,b,m)}">Google Maps로 이 구간 이동하기 →</a><a class="muted" target="_blank" href="${search(a)}">출발지</a><a class="muted" target="_blank" href="${search(b)}">도착지</a>`;
  }
  function panelSame(panel,k){
    if(!panel) return;
    panel.querySelector('.mode').textContent='📍 같은 장소';
    panel.querySelector('.route').innerHTML=`<b>${P[k][1]}</b>에서 계속`;
    panel.querySelector('.hint').textContent='별도 전철 이동 없이 같은 지역에서 이어지는 일정입니다.';
    panel.querySelector('.actions').innerHTML=`<a class="primary" target="_blank" href="${search(k)}">Google Maps에서 위치 보기 →</a>`;
  }
  function panelFlight(panel){
    if(!panel) return;
    panel.querySelector('.mode').textContent='✈️ TW0321';
    panel.querySelector('.route').innerHTML='<b>김해국제공항</b> → <b>간사이국제공항</b>';
    panel.querySelector('.hint').textContent='항공 구간입니다. 오사카 도착 후 다음 카드부터 구글맵 구간 길찾기를 사용하세요.';
    panel.querySelector('.actions').innerHTML=`<a class="primary" target="_blank" href="${search('k')}">간사이공항 위치 보기 →</a>`;
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
      if(flight){line.innerHTML='<span class="mode">✈️ 항공</span><b>김해국제공항 → 간사이국제공항</b>';}
      else if(same){line.innerHTML=`<span class="mode">📍 같은 지역</span><b>${P[cur][1]}에서 계속</b>`;}
      else if(from){line.innerHTML=`<span class="mode">${modeIcon(m)} ${modeName(m)}</span><b>${P[from][1]} → ${P[cur][1]}</b><br><a target="_blank" href="${dir(from,cur,m)}">Google Maps 이 구간 이동하기 →</a>`;}
      el.appendChild(line);
      el.addEventListener('click',e=>{if(e.target.closest('a'))return;if(flight)panelFlight(mainPanel);else if(same)panelSame(mainPanel,cur);else if(from)panelRoute(mainPanel,from,cur,m)});
      line.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
    });
  });
  document.querySelectorAll('.opt[data-place]').forEach(el=>{
    const k=el.dataset.place,m=k==='d'?'walking':'transit';
    const line=document.createElement('div');line.className='legline';
    line.innerHTML=`<span class="mode">${modeIcon(m)} ${modeName(m)}</span><b>호텔 → ${P[k][1]}</b><br><a target="_blank" href="${dir('h',k,m)}">Google Maps 이 구간 이동하기 →</a>`;
    el.appendChild(line);
    el.addEventListener('click',e=>{if(!e.target.closest('a'))panelRoute(optPanel,'h',k,m)});
    line.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
  });
  panelFlight(mainPanel);
  if(optPanel&&P.a) panelRoute(optPanel,'h','a','transit');
})();