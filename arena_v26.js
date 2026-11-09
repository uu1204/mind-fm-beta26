/* MIND FM Beta 2.6 — self-contained, host-graded melody continuation quiz.
   Audio is synthesized by Web Audio; no YouTube recording is sampled or redistributed.
   The real classical hooks below are short, simplified public-domain melodic motifs.
   All other exercises are plainly labeled original MIND FM practice tunes. */
var ARENA_BANK = [
 {id:'b5',kind:'melody',origin:'classic',name:'貝多芬｜第五號交響曲 第一樂章（開頭動機）',source:'https://www.thefifthdesk.org/work/beethoven-symphony-no-5/',tempo:98,intro:[['G4',.5],['G4',.5],['G4',.5],['Eb4',2]],next:[['F4',.5],['F4',.5],['F4',.5],['D4',2]]},
 {id:'ode',kind:'melody',origin:'classic',name:'貝多芬｜《歡樂頌》主題（簡化旋律）',source:'https://www.mutopiaproject.org/cgibin/piece-info.cgi?id=528',tempo:112,intro:[['B4',1],['B4',1],['C5',1],['D5',1]],next:[['D5',1],['C5',1],['A4',1],['B4',1]]},
 {id:'maman',kind:'melody',origin:'classic',name:'法國民謠《Ah ! vous dirai-je, maman》｜莫札特變奏曲主題',source:'https://portenotes.lacultureataporte.fr/composition/repertoire/ah-vous-dirai-je-maman',tempo:118,intro:[['C5',1],['C5',1],['G5',1],['G5',1]],next:[['A5',1],['A5',1],['G5',2]]},
 {id:'orig01',kind:'melody',origin:'original',name:'MIND FM 原創｜巴洛克花園',tempo:128,intro:[['C5',.5],['D5',.5],['E5',1],['G5',1]],next:[['F5',.5],['E5',.5],['D5',1],['C5',1.5]]},
 {id:'orig02',kind:'melody',origin:'original',name:'MIND FM 原創｜月光小徑',tempo:102,intro:[['A4',1],['C5',.5],['B4',.5],['A4',1]],next:[['G4',1],['F4',.5],['G4',.5],['A4',2]]},
 {id:'orig03',kind:'melody',origin:'original',name:'MIND FM 原創｜宮廷華爾滋',tempo:138,intro:[['D5',1],['F#5',1],['A5',1]],next:[['G5',1],['F#5',1],['E5',1]]},
 {id:'orig04',kind:'melody',origin:'original',name:'MIND FM 原創｜遲到的告白',tempo:90,intro:[['G4',1],['B4',.5],['C5',.5],['D5',1]],next:[['E5',1],['D5',.5],['C5',.5],['B4',2]]},
 {id:'orig05',kind:'melody',origin:'original',name:'MIND FM 原創｜弦樂追逐',tempo:150,intro:[['E5',.5],['D5',.5],['C5',.5],['B4',.5]],next:[['A4',.5],['B4',.5],['C5',.5],['E5',1]]},
 {id:'orig06',kind:'melody',origin:'original',name:'MIND FM 原創｜雪夜鐘聲',tempo:108,intro:[['C5',1],['G4',1],['A4',1],['E4',1]],next:[['F4',1],['G4',1],['C5',1],['B4',2]]},
 {id:'orig07',kind:'melody',origin:'original',name:'MIND FM 原創｜小奏鳴曲',tempo:126,intro:[['F4',.5],['A4',.5],['C5',.5],['F5',.5]],next:[['E5',.5],['C5',.5],['A4',.5],['F4',1]]},
 {id:'orig08',kind:'melody',origin:'original',name:'MIND FM 原創｜雨後第一束光',tempo:116,intro:[['E4',.5],['G4',.5],['B4',1],['A4',1]],next:[['G4',.5],['F4',.5],['E4',1],['G4',1.5]]},
 {id:'orig09',kind:'melody',origin:'original',name:'MIND FM 原創｜第七號午後',tempo:120,intro:[['D4',1],['F4',.5],['A4',.5],['C5',1]],next:[['B4',.5],['A4',.5],['G4',1],['F4',1.5]]},
 {id:'orig10',kind:'melody',origin:'original',name:'MIND FM 原創｜劇院的秘密',tempo:94,intro:[['C5',1],['Eb5',1],['G5',1],['F5',1]],next:[['Eb5',.5],['D5',.5],['C5',1],['G4',2]]},
 {id:'rh01',kind:'rhythm',origin:'original',name:'MIND FM 原創節奏｜敲門暗號',tempo:116,intro:[[60,.5],[60,.5],[60,1],[60,1]],next:[[60,.5],[60,.5],[60,1],[60,2]]},
 {id:'rh02',kind:'rhythm',origin:'original',name:'MIND FM 原創節奏｜慢與快',tempo:110,intro:[[60,1],[60,.5],[60,.5],[60,1]],next:[[60,1.5],[60,.5],[60,.5],[60,.5],[60,1]]},
 {id:'rh03',kind:'rhythm',origin:'original',name:'MIND FM 原創節奏｜雨滴接力',tempo:132,intro:[[60,.5],[60,1],[60,.5],[60,1]],next:[[60,.5],[60,.5],[60,.5],[60,.5],[60,2]]},
 {id:'rh04',kind:'rhythm',origin:'original',name:'MIND FM 原創節奏｜三拍舞會',tempo:144,intro:[[60,1],[60,1],[60,1]],next:[[60,.5],[60,.5],[60,1],[60,1]]}
];
var ARENA_MIDI={C:0,'C#':1,Db:1,D:2,'D#':3,Eb:3,E:4,F:5,'F#':6,Gb:6,G:7,'G#':8,Ab:8,A:9,'A#':10,Bb:10,B:11};
function arenaMidi(note){if(typeof note==='number')return note;var x=String(note).match(/^([A-G](?:#|b)?)(\d)$/);return x?12*(Number(x[2])+1)+ARENA_MIDI[x[1]]:60}
function arenaNormalized(notes){return notes.map(function(n){return [arenaMidi(n[0]),Number(n[1])||1]})}
function arenaUnique(sets){var seen=new Set();return sets.filter(function(notes){var key=JSON.stringify(notes);if(seen.has(key))return false;seen.add(key);return true})}
function arenaOptions(q){var right=arenaNormalized(q.next),n=right.length,sets;
 if(q.kind==='rhythm'){
  var inv=right.slice().reverse().map(function(x){return x.slice()});
  var alt=right.map(function(x,i){return [60,(i%2===0?.5:1.5)]});
  var steady=right.map(function(x){return [60,1]});
  sets=arenaUnique([right,inv,alt,steady]);
 }else{
  var shifted=right.map(function(x){return [Math.min(88,x[0]+2),x[1]]});
  var reversed=right.slice().reverse().map(function(x){return x.slice()});
  var changed=right.map(function(x,i){return [Math.max(48,Math.min(88,x[0]+(i%2===0?-3:3))),x[1]]});
  sets=arenaUnique([right,shifted,reversed,changed]);
 }
 while(sets.length<4)sets.push(right.map(function(x,i){return [x[0]+(sets.length+i)*2,x[1]]}));
 var wrapped=sets.slice(0,4).map(function(notes,i){return {notes:notes,correct:i===0}});
 for(var j=wrapped.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1)),tmp=wrapped[j];wrapped[j]=wrapped[k];wrapped[k]=tmp}
 return {options:wrapped.map(function(x){return x.notes}),correctIndex:wrapped.findIndex(function(x){return x.correct})}
}
function arenaChooseQuestion(g){g.arenaUsed=g.arenaUsed||[];var bank=ARENA_BANK.filter(function(x){return !g.arenaUsed.includes(x.id)});if(!bank.length){g.arenaUsed=[];bank=ARENA_BANK.slice()}
 var classics=bank.filter(function(x){return x.origin==='classic'}),others=bank.filter(function(x){return x.origin!=='classic'});
 var list=g.round%3===1&&classics.length?classics:(others.length?others:bank);
 var q=pick(list);g.arenaUsed.push(q.id);return q;
}
function arenaTeams(players){var t=[[],[]];(players||[]).forEach(function(p){if(p.team==='pink')t[0].push(p);else if(p.team==='blue')t[1].push(p)});return t.map(function(members,i){var sum=members.reduce(function(a,p){return a+(p.score||0)},0);return {id:i?'blue':'pink',label:i?'藍隊':'粉隊',count:members.length,score:members.length?Math.round(sum/members.length):0,sum:sum}})}
function arenaStartRound(){var g=APP.g,original=arenaChooseQuestion(g),options=arenaOptions(original);
 g.game={mode:'arena',phase:'answer',q:{id:original.id,kind:original.kind,origin:original.origin,name:original.name,source:original.source||'',tempo:original.tempo,intro:arenaNormalized(original.intro),next:arenaNormalized(original.next)},options:options.options,correctIndex:options.correctIndex,answers:{},result:null};
 setPhase(g.game,'answer');
}
function arenaEndRound(){var g=APP.g,gm=g&&g.game;if(!gm||gm.mode!=='arena'||gm.phase!=='answer')return;var pts={};
 online().forEach(function(p){var reply=gm.answers[p.id]||{option:-1,ts:0};var correct=reply.option===gm.correctIndex;var seconds=Math.max(0,(reply.ts-gm.phaseStarted)/1000);var fast=Math.max(0,Math.round(30*(1-seconds/phaseDuration(gm))));var n=correct?(100+fast)*(reply.double?2:1):0;pts[p.id]=n;addPoints(p.id,n)});
 gm.result={gains:pts,correctIndex:gm.correctIndex};setPhase(gm,'reveal');
}
/* WebAudio: generated short synthetic notes, no sampled commercial recordings. */
var ARENA_AUDIO={ctx:null,active:[]};
function arenaStopSound(){ARENA_AUDIO.active.forEach(function(osc){try{osc.stop(0)}catch(e){}});ARENA_AUDIO.active=[]}
async function arenaPlay(which,index){var v=APP.view,g=v&&v.game;if(!g||g.mode!=='arena')return;
 var notes=which==='lead'?g.q.intro:which==='full'?g.q.intro.concat(g.q.next):g.options[index];
 if(!Array.isArray(notes)||!notes.length)return;
 try{
 var C=window.AudioContext||window.webkitAudioContext;if(!C){toast('這個瀏覽器不支援音訊試聽');return}
 if(!ARENA_AUDIO.ctx)ARENA_AUDIO.ctx=new C();var ctx=ARENA_AUDIO.ctx;await ctx.resume();arenaStopSound();
 var t=ctx.currentTime+.045,bpm=g.q.tempo||112,notesList=notes;
 notesList.forEach(function(n){var beats=Number(n[1])||1,duration=60/bpm*beats;var freq=440*Math.pow(2,(n[0]-69)/12);var osc=ctx.createOscillator(),gain=ctx.createGain();
 osc.type=g.q.kind==='rhythm'?'sine':'triangle';osc.frequency.setValueAtTime(g.q.kind==='rhythm'?200:freq,t);
 if(g.q.kind==='rhythm')osc.frequency.exponentialRampToValueAtTime(80,t+.08);
 gain.gain.setValueAtTime(.0005,t);gain.gain.exponentialRampToValueAtTime(g.q.kind==='rhythm'?.17:.12,t+.015);
 var off=t+Math.min(duration*.86,g.q.kind==='rhythm'?.14:1.2);gain.gain.exponentialRampToValueAtTime(.0005,off);
 osc.connect(gain);gain.connect(ctx.destination);osc.start(t);osc.stop(off+.035);ARENA_AUDIO.active.push(osc);t+=duration;
 });
 }catch(e){toast('播放失敗：請確認手機沒有靜音，並點擊試聽按鈕')}
}
function arenaNoteName(m){var x=['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];return x[m%12]+(Math.floor(m/12)-1)}
function arenaScoreSvg(notes,kind){if(kind==='rhythm'){
 var total=notes.reduce(function(a,x){return a+x[1]},0),pos=0;
 var bars=notes.map(function(n){var w=n[1]/total*240,x=22+pos/total*240;pos+=n[1];return '<rect x="'+x.toFixed(1)+'" y="40" width="'+Math.max(2,w-3).toFixed(1)+'" height="22" rx="5" fill="#c6a4ee"/><text x="'+(x+w/2).toFixed(1)+'" y="78" fill="#e5d9f4" text-anchor="middle" font-size="11">'+n[1]+'</text>'}).join('');
 return '<svg class="arena-note-svg" viewBox="0 0 290 98" role="img" aria-label="節奏長短視覺圖"><text x="18" y="20" fill="#ddd0f3" font-size="12">節奏節拍（音值）</text>'+bars+'</svg>';
 }
 var names=['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];var letterIndex={C:0,D:1,E:2,F:3,G:4,A:5,B:6};var width=300,spacing=225/Math.max(1,notes.length-1);
 var lineYs=[34,45,56,67,78].map(function(y){return '<line x1="18" y1="'+y+'" x2="292" y2="'+y+'" stroke="#c8b6e3" opacity=".68" stroke-width="1.2"/>'}).join('');
 var marks=notes.map(function(n,i){var midi=n[0],letter=names[midi%12].charAt(0),octave=Math.floor(midi/12)-1,dia=octave*7+letterIndex[letter],ref=4*7+letterIndex.E,yy=78-(dia-ref)*5.5,xx=31+spacing*i;
 yy=Math.max(13,Math.min(98,yy));var flag=n[1]===.5?'<path d="M '+(xx+7)+' '+(yy-28)+' q 16 6 8 18" fill="none" stroke="#eedaff" stroke-width="2.1"/>':'';
 var accidental=(names[midi%12].includes('#')?'♯':names[midi%12].includes('b')?'♭':'');return '<ellipse cx="'+xx+'" cy="'+yy+'" rx="7" ry="4.7" transform="rotate(-17 '+xx+' '+yy+')" fill="#edc7ff"/><line x1="'+(xx+6)+'" y1="'+yy+'" x2="'+(xx+6)+'" y2="'+(yy-27)+'" stroke="#edc7ff" stroke-width="1.8"/>'+flag+(accidental?'<text x="'+(xx-17)+'" y="'+(yy+4)+'" fill="#edc7ff" font-size="17">'+accidental+'</text>':'');}).join('');
 return '<svg class="arena-note-svg" viewBox="0 0 310 115" role="img" aria-label="簡化音高記譜：'+esc(notes.map(function(n){return arenaNoteName(n[0])}).join(' '))+'"><text x="2" y="79" font-size="49" fill="#d2a9ed">𝄞</text>'+lineYs+marks+'</svg>';
}
function arenaAnswer(option){var g=APP.view&&APP.view.game;if(!g||g.mode!=='arena'||g.phase!=='answer'||g.hasArenaAnswered)return;send({type:'arena-answer',option:option})}
function arenaRender(g,v){var done=g.hasArenaAnswered,kind=g.q.kind,scoreLabel=kind==='rhythm'?'節奏接續挑戰':'旋律接續挑戰';var isTeam=v.mode==='arena'&&v.arenaFormat==='teams';
 var out='<div class="arena-box"><div class="arena-kicker">'+(kind==='rhythm'?'🥁':'♫')+' 音樂競技場 · '+esc(scoreLabel)+'</div><h2>先聽這一段，下一句是哪個？</h2><p class="arena-sub">'+(kind==='rhythm'?'找出正確的下一段節奏。':'可以聽四個選項，也能看簡化樂譜。')+' 答對得分，答錯不扣分。</p>'+
 '<div class="arena-lead"><div><b>第 1 步｜聽題目</b><span class="arena-small">點一下即可播放 · 可反覆重聽</span></div><button type="button" class="btn" onclick="arenaPlay(\'lead\')">▶ 播放前半段</button>'+arenaScoreSvg(g.q.intro,kind)+'</div>'+
 '<div class="arena-choices-title"><b>第 2 步｜從四段接續裡選一段</b><span>點試聽後再作答</span></div>';
 if(g.phase==='reveal'){
 out+='<div class="arena-answer-banner"><div class="arena-small">正確接續</div><strong>'+String.fromCharCode(65+g.correctIndex)+'</strong><button type="button" class="btn small" onclick="arenaPlay(\'full\')">▶ 聽完整正確旋律</button></div>';
 out+='<div class="arena-choice-grid">'+g.options.map(function(o,i){return '<div class="arena-choice '+(i===g.correctIndex?'arena-correct':'arena-muted')+'"><div class="arena-choice-header"><strong>'+String.fromCharCode(65+i)+'</strong>'+(i===g.correctIndex?'<span>✓ 正解</span>':'')+'</div>'+arenaScoreSvg(o,kind)+'<button type="button" class="btn small alt full" onclick="arenaPlay(\'option\','+i+')">▶ 聽選項 '+String.fromCharCode(65+i)+'</button></div>'}).join('')+'</div>';
 out+='<div class="arena-recap"><h3>這局揭曉</h3>'+(v.players.filter(function(p){return p.online}).map(function(p){var a=g.answers[p.id],right=a&&a.option===g.correctIndex,display=a&&a.option>=0?String.fromCharCode(65+a.option):'未作答';return '<div class="arena-recap-row"><span>'+esc(p.name)+(isTeam?' · '+(p.team==='blue'?'藍隊':'粉隊'):'')+'</span><span>'+display+(right?' ✓':'')+'</span><b>+'+((g.result&&g.result.gains[p.id])||0)+' 分</b></div>'}).join(''))+'<p class="hint">'+esc(g.q.name)+' · '+(g.q.origin==='classic'?'公共領域旋律摘錄（以音符合成，非錄音原曲）':'MIND FM 原創練習旋律')+'</p>'+(g.q.source?'<a href="'+esc(g.q.source)+'" target="_blank" rel="noopener noreferrer" class="arena-source">查看樂譜／資料來源 ↗</a>':'')+'</div>';
 }else{
  out+='<div class="arena-choice-grid">'+g.options.map(function(o,i){return '<div class="arena-choice"><div class="arena-choice-header"><strong>'+String.fromCharCode(65+i)+'</strong><span>候選旋律</span></div>'+arenaScoreSvg(o,kind)+'<button type="button" class="btn small alt full" onclick="arenaPlay(\'option\','+i+')">▶ 試聽 '+String.fromCharCode(65+i)+'</button>'+(done?'<div class="arena-submitted">已送出答案，等朋友作答</div>':'<button type="button" class="arena-pick" onclick="arenaAnswer('+i+')">選這段 '+String.fromCharCode(65+i)+'</button>')+'</div>'}).join('')+'</div>';
  if(done)out+='<div class="notice">✓ 答案已鎖定；其他玩家答完或時間到就會一起公布。</div>';
 }
 if(isTeam){var teams=arenaTeams(v.players);out+='<div class="arena-team-row">'+teams.map(function(t){return '<div class="arena-team-badge '+t.id+'"><b>'+t.label+'</b><strong>'+t.score+'</strong><small>隊員平均分 · '+t.count+' 人</small></div>'}).join('')+'</div>'}
 out+='<div class="arena-footer-hint">音訊為網站即時合成，不使用 YouTube 錄音；簡化記譜提供音高與基本音值參考，非正式總譜。</div></div>';
 return out;
}
