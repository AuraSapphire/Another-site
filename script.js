const forums=[
 {name:"General",desc:"Talk about anything here.",topics:"12,451",posts:"98,230",title:"Re: What are you thinking right now?",user:"starrysky",time:"2 minutes ago"},
 {name:"Technology",desc:"PCs, phones, software, and more.",topics:"8,732",posts:"61,204",title:"Re: Best lightweight games?",user:"neko.exe",time:"14 minutes ago"},
 {name:"Anime & Manga",desc:"Discuss anime, manga, and related media.",topics:"10,221",posts:"88,119",title:"Re: Fall 2026 anime list?",user:"yuu",time:"37 minutes ago"},
 {name:"Study & School",desc:"Homework, exams, tips, and more.",topics:"6,114",posts:"42,908",title:"Re: Class 11 Physics Help",user:"aura",time:"1 hour ago"},
 {name:"Creative Corner",desc:"Art, writing, music, projects.",topics:"4,389",posts:"31,776",title:"Re: My latest artwork!",user:"rui",time:"2 hours ago"},
 {name:"Off-Topic",desc:"For the random stuff.",topics:"15,672",posts:"120,441",title:"Re: Random thoughts...",user:"mizu",time:"3 hours ago"}
];
const rows=document.querySelector("#forumRows");
function render(list=forums){rows.innerHTML=list.map((f,i)=>`<article class="forum-row" tabindex="0" data-name="${f.name.toLowerCase()}"><div class="fmain"><div class="thumb">${["▥","◈","◌","▤","◇","☕"][i]}</div><div><div class="fname">${f.name}</div><div class="desc">${f.desc}</div></div></div><div class="num">${f.topics}</div><div class="num">${f.posts}</div><div class="last">${f.title}<small>by ${f.user}<br>${f.time}</small></div></article>`).join("");}
render();
document.querySelector("#searchForm").addEventListener("submit",e=>{e.preventDefault();const q=document.querySelector("#searchInput").value.trim().toLowerCase();render(q?forums.filter(f=>(f.name+" "+f.desc+" "+f.title).toLowerCase().includes(q)):forums);document.querySelector("#forums").scrollIntoView({behavior:"smooth"});});
document.querySelector("#randomBtn").onclick=()=>{const msgs=["good people\nshare great things.","stay curious.\nkeep talking.","someone out there\ngets it.","same sky.\ndifferent stories.","leave the internet\na little kinder."];const p=document.querySelector(".random p");const x=msgs[Math.floor(Math.random()*msgs.length)].split("\n");p.innerHTML=x.join("<br>");};
document.querySelector("#play").onclick=e=>{e.currentTarget.textContent=e.currentTarget.textContent==="Ⅱ"?"▶":"Ⅱ";};
const auth=document.querySelector("#auth"), title=document.querySelector("#authTitle");document.querySelector("#login").onclick=e=>{e.preventDefault();title.textContent="LOGIN";auth.showModal()};document.querySelector("#register").onclick=e=>{e.preventDefault();title.textContent="REGISTER";auth.showModal()};document.querySelector(".close").onclick=()=>auth.close();
document.querySelectorAll(".topnav .navitem").forEach(a=>a.addEventListener("click",()=>{document.querySelectorAll(".topnav .navitem").forEach(x=>x.classList.remove("active"));a.classList.add("active")}));
setInterval(()=>{const n=document.querySelector("#online");n.textContent=142+Math.floor(Math.random()*9)-4},12000);