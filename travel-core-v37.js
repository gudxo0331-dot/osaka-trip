(function(root){
  'use strict';
  const dates=['2026-09-17','2026-09-18','2026-09-19','2026-09-20'];
  function japanDate(now=new Date()){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
    const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));
    return `${p.year}-${p.month}-${p.day}`;
  }
  function dayFor(now=new Date()){const i=dates.indexOf(japanDate(now));return i<0?0:i;}
  function signature(stops){return stops.map(s=>[s[0],s[1],s[2]].join('|')).join('\n');}
  function position(saved,stops){return saved&&saved.signature===signature(stops)&&Number.isInteger(saved.index)?Math.min(stops.length,Math.max(0,saved.index)):0;}
  function directions(query,mode,origin){
    const p=new URLSearchParams({api:'1',destination:query,travelmode:mode==='walking'?'walking':'transit',hl:'ko'});
    if(origin)p.set('origin',origin);
    return 'https://www.google.com/maps/dir/?'+p.toString();
  }
  function place(query){return 'https://www.google.com/maps/search/?'+new URLSearchParams({api:'1',query,hl:'ko'});}
  root.OsakaTravelCore={dates,japanDate,dayFor,signature,position,directions,place};
})(typeof window==='undefined'?globalThis:window);
