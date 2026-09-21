const forums=[
{name:"General",desc:"Talk about anything here.",topics:12451,posts:98230,title:"What are you thinking right now?",user:"starrysky",time:"2 minutes ago"},
{name:"Technology",desc:"PCs, phones, software, and more.",topics:8732,posts:61204,title:"Best lightweight games for low-end PC?",user:"neko.exe",time:"14 minutes ago"},
{name:"Anime & Manga",desc:"Discuss anime, manga, and related media.",topics:10221,posts:88119,title:"Fall 2026 anime list?",user:"yuu",time:"37 minutes ago"},
{name:"Study & School",desc:"Homework, exams, tips, and more.",topics:6114,posts:42908,title:"Class 11 Physics Help",user:"aura",time:"1 hour ago"},
{name:"Creative Corner",desc:"Art, writing, music, projects.",topics:4389,posts:31776,title:"My latest artwork!",user:"rui",time:"2 hours ago"},
{name:"Off-Topic",desc:"For the random stuff.",topics:15672,posts:120441,title:"Random thoughts...",user:"mizu",time:"3 hours ago"}];

const topicSeed=[
["Best lightweight games for low-end PC?","neko.exe","14 minutes ago",35,781,"riku","2 minutes ago","📌","discussions"],
["Show your desktop setup!","starrysky","2 hours ago",128,5221,"yuu","12 minutes ago","▧","discussions"],
["Linux vs Windows in 2026","mizu","3 hours ago",62,1904,"kero","25 minutes ago","⚙","help"],
["Phone recommendations? (2026)","aura","5 hours ago",89,3612,"hazel","37 minutes ago","▯","mobile"],
["What are you currently working on?","void","6 hours ago",41,1330,"syn","1 hour ago","</>","other"],
["AI tools that are actually useful","luna","8 hours ago",77,2811,"mizu","1 hour ago","♙","software"],
["Troubleshooting & Tech Support","helpme","10 hours ago",120,4982,"neko.exe","2 hours ago","⚒","help"],
["Random tech news and discussions","ray","12 hours ago",301,9441,"starrysky","2 hours ago","▤","discussions"],
["Programming / Coding Help","devnull","14 hours ago",96,3214,"aura","3 hours ago",">_","software"],
["Share your projects!","kai","1 day ago",58,2017,"riku","4 hours ago","■","other"]
].map(function(x,i){return{id:i+1,title:x[0],author:x[1],time:x[2],replies:x[3],views:x[4],lastUser:x[5],lastTime:x[6],icon:x[7],type:x[8]}});

const state={forum:"Technology",page:1,tab:"all",query:""};
const app=document.querySelector("#app"),modal=document.querySelector("#modal"),modalContent=document.querySelector("#modalContent");
const esc=function(s){return String(s).replace(/[&<>"']/g,function(m){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[m]})};
function toast(msg){var t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(function(){t.remove()},2300)}

function home(){
var html='<section class="hero"><div class="hero-copy left-copy">見知らぬ誰かと、<br>少しだけ近くに。<b>DIFFERENT PEOPLE.<br>SAME SKY.</b></div><div class="earth"><div class="lights"></div></div><div class="astronaut">◉<br>╱▔╲<br>│◌│<br>╲__╱</div><div class="hero-title"><strong>MIZOBOARD</strong><span>ANONYMOUS • GLOBAL • ALWAYS ONLINE</span></div><div class="hero-copy right-copy">POST<br>TALK<br>SHARE<br>BELONG<br>...</div><div class="stars">✦　 ·　　　✧　　·　　✦</div></section>';
html+='<section class="statusbar"><span>&gt; welcome to mizoboard -- a space for open minds.</span><b>[ <em>142</em> online ] <i></i></b><small>“better conversations<br>for a brighter tomorrow.”</small></section>';
html+='<section class="panel forum"><div class="section-head"><h2>// FORUM CATEGORIES</h2><span>→›</span></div><div class="topic-head"><span>FORUM</span><span>TOPICS</span><span>POSTS</span><span>LAST POST</span></div><div>';
forums.forEach(function(f,i){html+='<article class="topic-row forum-home-row" data-forum="'+esc(f.name)+'"><div class="topic-info"><div class="topic-icon">'+["▥","◈","◌","▤","◇","☕"][i]+'</div><div><div class="topic-title">'+esc(f.name)+'</div><div class="topic-sub">'+esc(f.desc)+'</div></div></div><div class="topic-num">'+f.topics.toLocaleString()+'</div><div class="topic-num">'+f.posts.toLocaleString()+'</div><div class="last-post">Re: '+esc(f.title)+'<small>by '+esc(f.user)+'<br>'+esc(f.time)+'</small></div></article>'});
html+='</div></section>';app.innerHTML=html;
document.querySelectorAll(".forum-home-row").forEach(function(x){x.onclick=function(){location.hash="forum/"+encodeURIComponent(x.dataset.forum)}});
}

function forum(name){
state.forum=name;state.page=1;var f=forums.find(function(x){return x.name===name})||forums[1];
app.innerHTML='<div class="breadcrumb"><a href="#home">⚑ MIZOBOARD</a><span>›</span><span>'+esc(name)+'</span></div>'+
'<section class="forum-banner"><div class="device"></div><div class="forum-title"><h1>'+esc(name)+'</h1><p>'+esc(f.desc)+'</p></div><div class="forum-meta">// '+esc(name.toUpperCase())+'<br>BRINGS PEOPLE<br>CLOSER.</div><div class="forum-meta" style="right:155px;top:15px;text-align:right">'+f.topics.toLocaleString()+' topics<br>'+f.posts.toLocaleString()+' posts</div><button class="new-topic" id="newTopic">＋ new topic</button></section>'+
'<div class="forum-controls"><div class="pagination" id="pagination"></div><form class="forum-search" id="forumSearch"><input id="forumQuery" placeholder="search this forum..." value="'+esc(state.query)+'"><button>⌕</button></form></div>'+
'<div class="tabs" id="tabs"><button class="tab active" data-tab="all">ALL TOPICS</button><button class="tab" data-tab="discussions">DISCUSSIONS</button><button class="tab" data-tab="guides">GUIDES</button><button class="tab" data-tab="help">HELP</button><button class="tab" data-tab="hardware">HARDWARE</button><button class="tab" data-tab="software">SOFTWARE</button><button class="tab" data-tab="mobile">MOBILE</button><button class="tab" data-tab="other">OTHER</button></div>'+
'<section class="topic-table"><div class="topic-head"><span>TOPIC</span><span>REPLIES</span><span>VIEWS</span><span>LAST POST</span></div><div id="topicRows"></div></section><div class="pager-bottom"><div class="pagination" id="paginationBottom"></div></div>';
document.querySelectorAll(".tab").forEach(function(b){b.onclick=function(){state.tab=b.dataset.tab;document.querySelectorAll(".tab").forEach(function(x){x.classList.remove("active")});b.classList.add("active");renderTopics()}});
document.querySelector("#forumSearch").onsubmit=function(e){e.preventDefault();state.query=document.querySelector("#forumQuery").value;state.page=1;renderTopics()};
document.querySelector("#newTopic").onclick=newTopic;renderTopics();
}

function filtered(){
var list=topicSeed.slice();
if(state.tab!=="all")list=list.filter(function(t){return t.type===state.tab});
if(state.query)list=list.filter(function(t){return(t.title+" "+t.author+" "+t.lastUser).toLowerCase().indexOf(state.query.toLowerCase())>=0});
return list;
}
function renderTopics(){
var list=filtered(),per=10,total=437,page=Math.min(state.page,total),slice=[];\nfor(var z=0;z<per;z++){var base=list[((page-1)*per+z)%Math.max(1,list.length)];if(base)slice.push(Object.assign({},base,{id:(page-1)*per+z+1}));else slice.push({id:(page-1)*per+z+1,title:"Community technology discussion #"+((page-1)*per+z+1),author:"guest",time:""+(z+1)+" hours ago",replies:12+z,views:200+z*73,lastUser:"mizu",lastTime:"recently",icon:"▣",type:"discussions"})}var html="";
if(!slice.length)html='<div class="empty">No topics match this filter.</div>';
slice.forEach(function(t){html+='<article class="topic-row" data-thread="'+t.id+'"><div class="topic-info"><div class="topic-icon">'+t.icon+'</div><div><div class="topic-title">'+esc(t.title)+'</div><div class="topic-sub">by '+esc(t.author)+' • '+esc(t.time)+'</div></div></div><div class="topic-num">'+t.replies+'</div><div class="topic-num">'+t.views.toLocaleString()+'</div><div class="last-post">by '+esc(t.lastUser)+'<small>'+esc(t.lastTime)+'</small></div></article>'});
document.querySelector("#topicRows").innerHTML=html;document.querySelectorAll("[data-thread]").forEach(function(x){x.onclick=function(){location.hash="thread/"+x.dataset.thread}});renderPager(total,page);
}
function renderPager(total,current){
var html="";
for(var i=1;i<=Math.min(total,5);i++)html+='<button class="'+(i===current?"active":"")+'" data-page="'+i+'">'+i+'</button>';
if(total>5)html+='<span style="padding:8px">…</span><button data-page="'+total+'">'+total+'</button>';
html+='<button data-page="'+Math.min(total,current+1)+'">›</button>';
document.querySelectorAll("#pagination,#paginationBottom").forEach(function(p){p.innerHTML=html;p.querySelectorAll("button").forEach(function(b){b.onclick=function(){state.page=Number(b.dataset.page);renderTopics();window.scrollTo({top:250,behavior:"smooth"})}})});
}

function thread(id){
var t=topicSeed.find(function(x){return x.id===Number(id)})||topicSeed[0];
app.innerHTML='<div class="breadcrumb"><a href="#home">⚑ MIZOBOARD</a><span>›</span><a href="#forum/Technology">Technology</a><span>›</span><span>Topic</span></div><section class="thread-head"><h1>'+esc(t.title)+'</h1><p>Started by '+esc(t.author)+' • '+esc(t.time)+' • '+t.views.toLocaleString()+' views</p></section><div id="posts"><article class="post"><div class="post-user"><div class="avatar">◌</div><strong>'+esc(t.author)+'</strong><small>member</small></div><div class="post-body"><div class="post-bar">#1 • '+esc(t.time)+'</div>Welcome to the discussion. This is a functional MIZOBOARD thread. Write a reply below and it will appear immediately in this conversation.</div></article><article class="post"><div class="post-user"><div class="avatar">◇</div><strong>'+esc(t.lastUser)+'</strong><small>member</small></div><div class="post-body"><div class="post-bar">#2 • '+esc(t.lastTime)+'</div>Interesting topic. I think this deserves a proper discussion. What does everyone else think?</div></article></div><form class="reply-box" id="replyForm"><textarea id="replyText" placeholder="write your reply..."></textarea><button class="action">POST REPLY</button></form>';
document.querySelector("#replyForm").onsubmit=function(e){e.preventDefault();var text=document.querySelector("#replyText").value.trim();if(!text)return toast("Write something first.");var n=document.createElement("article");n.className="post";n.innerHTML='<div class="post-user"><div class="avatar">◉</div><strong>guest</strong><small>just now</small></div><div class="post-body"><div class="post-bar">#3 • just now</div>'+esc(text)+'</div>';document.querySelector("#posts").appendChild(n);e.target.reset();toast("Reply posted.")};
}

function generic(title,body){app.innerHTML='<section class="generic"><div class="breadcrumb" style="margin:-22px -22px 18px"><a href="#home">⚑ MIZOBOARD</a><span>›</span><span>'+esc(title)+'</span></div><h1>'+esc(title)+'</h1><div>'+body+'</div></section>'}
function members(){var h='<div class="member-list">';["starrysky","neko.exe","yuu","aura","mizu","rui","kero","hazel","syn"].forEach(function(x){h+='<a class="member-card" href="#member/'+x+'">@'+x+'<small>active member</small></a>'});h+='</div>';generic("Members",h)}
function route(){
var raw=location.hash.slice(1)||"home",parts=raw.split("/"),kind=parts[0];
document.querySelectorAll(".navitem").forEach(function(a){a.classList.toggle("active",a.dataset.route===kind)});
document.querySelectorAll(".side-link").forEach(function(a){a.classList.toggle("active",a.getAttribute("href")===location.hash)});
if(kind==="forum")forum(decodeURIComponent(parts.slice(1).join("/")));
else if(kind==="thread")thread(parts[1]);
else if(kind==="members")members();\nelse if(kind==="forums")forum("Technology");
else if(kind==="search")generic("Search","Use the search box on the right to search the forum database.");
else if(kind==="help")generic("Help","Use the navigation, open a forum, select a topic, and post replies. This front-end is ready for a backend.");
else if(["recent","popular","rules","about","terms","privacy","contact"].indexOf(kind)>=0)generic(kind.charAt(0).toUpperCase()+kind.slice(1),"This section is ready for content and backend integration.");
else if(kind==="member")generic("@"+esc(parts[1]||"guest"),"Member profile page.");
else home();
}
window.addEventListener("hashchange",route);route();

document.querySelector("#globalSearch").onsubmit=function(e){e.preventDefault();var q=document.querySelector("#globalSearchInput").value.trim();if(q){state.query=q;location.hash="forum/Technology"}};
document.querySelector("#randomBtn").onclick=function(){var a=["good people|share great things.","stay curious.|keep talking.","someone out there|get it.","same sky.|different stories.","leave the internet|a little kinder."],x=a[Math.floor(Math.random()*a.length)].split("|");document.querySelector("#randomText").innerHTML=x.join("<br>")};
document.querySelector("#login").onclick=function(e){e.preventDefault();modalContent.innerHTML='<h2>LOGIN</h2><input id="authUser" placeholder="username"><input type="password" placeholder="password"><button class="primary" id="authGo">CONTINUE</button><small>Demo authentication interface.</small>';modal.showModal();document.querySelector("#authGo").onclick=function(){var u=document.querySelector("#authUser").value.trim()||"guest";document.querySelector("#guestName").textContent=u;document.querySelector("#guestState").textContent="online";modal.close();toast("Logged in as @"+u)}};
document.querySelector("#register").onclick=function(e){e.preventDefault();modalContent.innerHTML='<h2>REGISTER</h2><input id="regUser" placeholder="username"><input type="email" placeholder="email"><input type="password" placeholder="password"><button class="primary" id="regGo">CREATE ACCOUNT</button>';modal.showModal();document.querySelector("#regGo").onclick=function(){modal.close();toast("Account created — demo mode.")}};
document.querySelector(".close").onclick=function(){modal.close()};
function newTopic(){modalContent.innerHTML='<h2>NEW TOPIC — TECHNOLOGY</h2><input id="ntTitle" placeholder="topic title"><select id="ntType" style="display:block;width:100%;padding:11px;background:#03070a;border:1px solid #384a57;color:#fff;font:inherit"><option>discussions</option><option>guides</option><option>help</option><option>hardware</option><option>software</option><option>mobile</option><option>other</option></select><textarea id="ntBody" placeholder="write your first post..."></textarea><button class="primary" id="ntGo">CREATE TOPIC</button>';modal.showModal();document.querySelector("#ntGo").onclick=function(){var title=document.querySelector("#ntTitle").value.trim();if(!title)return toast("Add a topic title.");var body=document.querySelector("#ntBody").value.trim()||"No content.";topicSeed.unshift({id:Date.now(),title:title,author:"guest",time:"just now",replies:0,views:1,lastUser:"guest",lastTime:"just now",icon:"▣",type:document.querySelector("#ntType").value,body:body});modal.close();state.tab="all";toast("Topic created.");renderTopics()}}

document.querySelector("#play").onclick=function(e){e.currentTarget.textContent=e.currentTarget.textContent==="Ⅱ"?"▶":"Ⅱ"};document.querySelector("#prev").onclick=function(){toast("Previous track")};document.querySelector("#next").onclick=function(){toast("Next track")};
setInterval(function(){var el=document.querySelector(".statusbar em");if(el)el.textContent=138+Math.floor(Math.random()*10)},12000);
