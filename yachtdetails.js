document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementById("lengthFilter"),t=document.getElementById("nameSearch"),n=document.querySelector(".yacht-grid");let o=[];function i(){}fetch("yachts.json").then((e=>e.json())).then((e=>{o=e,n.innerHTML=""})),e.addEventListener("change",i),t.addEventListener("keyup",i)}));let touchStartX=0;function handleTouchStart(e){touchStartX=e.touches[0].clientX}function handleTouchEnd(e,t,n,o){const i=e.changedTouches[0].clientX;touchStartX-i>50?(t=(t+1)%n.length,o.src=n[t]):i-touchStartX>50&&(t=(t-1+n.length)%n.length,o.src=n[t])}function populateSimilarYachts(e,t){}document.addEventListener("DOMContentLoaded",(function(){const e=new URLSearchParams(window.location.search).get("id");fetch("yachts.json").then((e=>e.json())).then((t=>{const n=t.find((t=>t.id===parseInt(e,10)));if(n){document.querySelector(".yacht-name").textContent=n.name,document.querySelector(".main-image").src=n.image,document.querySelector(".description-text").textContent=n.description,document.querySelector(".price-text").textContent=n.price;const e=document.querySelector(".detailed-specs");for(const[t,o]of Object.entries(n.detailedSpecs)){const n=document.createElement("li");n.textContent=`${t}: ${o}`,e.appendChild(n)}const o=document.querySelector(".interior-carousel"),i=n.interiorImages;i.forEach(((e,t)=>{const n=document.createElement("img");n.src=e,n.alt="Interior Image",n.addEventListener("click",(function(){const n=document.createElement("div");n.className="fullscreen-modal",n.style.position="fixed",n.style.left="0",n.style.top="0",n.style.width="100%",n.style.height="100%",n.style.backgroundColor="rgba(0,0,0)",n.style.zIndex="1000";const o=document.createElement("img");o.className="fullscreen-image",o.src=e,o.style.width="80%",o.style.height="auto",o.style.objectFit="cover",o.style.margin="auto";const c=document.createElement("span");c.innerHTML="&times;",c.className="exit-button",c.style.position="absolute",c.style.right="20px",c.style.top="20px",c.style.fontSize="2em",c.style.color="white",c.style.cursor="pointer",c.addEventListener("click",(function(){document.body.removeChild(n)}));const s=document.createElement("span");s.innerHTML="&rsaquo;",s.className="next-button",s.style.position="absolute",s.style.right="20px",s.style.bottom="50%",s.style.fontSize="3em",s.style.color="white",s.style.cursor="pointer",s.addEventListener("click",(function(){t=(t+1)%i.length,o.src=i[t]}));const a=document.createElement("span");a.innerHTML="&lsaquo;",a.className="prev-button",a.style.position="absolute",a.style.left="20px",a.style.bottom="50%",a.style.fontSize="3em",a.style.color="white",a.style.cursor="pointer",a.addEventListener("click",(function(){t=(t-1+i.length)%i.length,o.src=i[t]})),n.appendChild(c),n.appendChild(s),n.appendChild(a),n.appendChild(o),n.addEventListener("touchstart",handleTouchStart),n.addEventListener("touchend",(function(e){handleTouchEnd(e,t,i,o)})),document.body.appendChild(n)})),o.appendChild(n)}));const c=document.getElementById("exterior");n.exteriorImages.forEach((e=>{const t=document.createElement("img");t.src=e,c.appendChild(t)})),populateSimilarYachts(t,n.id)}}))}));let position=0;function move(e){const t=document.getElementById("carousel-container"),n=document.querySelector(".carousel-item").offsetWidth,o=t.children.length;position+=e,position<0&&(position=o-1),position>=o&&(position=0);const i=-position*n;t.style.transform=`translateX(${i}px)`}const yachtsData=[{id:1,name:"Mangusta 108",image:"Mangusta 108",image:"Nomad108.jpg",link:"yacht-detail.html?id=1"},{id:2,name:"CRN 130",image:"Bunker/CRN130Exterior28.jpg",link:"yacht-detail.html?id=3"},{id:3,name:"Persing 90",image:"Persing90.jpg",link:"yacht-detail.html?id=2"}];function populateYachts(e){const t=document.getElementById("carousel-container");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.className="carousel-item";const o=document.createElement("a");o.href=e.link;const i=document.createElement("img");i.src=e.image,i.alt=e.name,o.appendChild(i);const c=document.createElement("span");c.innerText=e.name,o.appendChild(c),n.appendChild(o),t.appendChild(n)}))}document.addEventListener("DOMContentLoaded",(function(){populateYachts(yachtsData)})),window.addEventListener("scroll",(function(){const e=document.getElementById("about"),t=document.getElementById("aboutLink"),n=e.getBoundingClientRect();n.top<=window.innerHeight&&n.bottom>=0?t.classList.add("active-link"):t.classList.remove("active-link")})),window.addEventListener("load",(function(){var e=document.querySelector(".your-image-class"),t=e.parentElement;if(e&&t){var n=e.getBoundingClientRect(),o=document.createElement("div");o.classList.add("yacht-name"),o.innerHTML="Boat Name Here",t.appendChild(o),o.style.left=n.left-200+"px",o.style.top=n.top+"px",o.offsetWidth,setTimeout((function(){o.style.left=n.left+"px"}),0)}}));var yachtNameDiv=document.createElement("div");function getCurrentYachtId(){const e=new URLSearchParams(window.location.search);return parseInt(e.get("id"))||1}function updatePriceDisplay(e){const t=document.querySelector(".price-text");let n='<div class="seasonal-price-columns">',o='<div class="inline-months">';Object.entries(e).forEach((([e,t],i,c)=>{const s=i===c.length-1?"":"border-right";"June"===e||"September"===e?o+=`<div class="seasonal-price-item ${s}">\n                                <div class="season-label">${e}</div>\n                                <div class="season-price">${t}</div>\n                              </div>`:n+=`<div class="seasonal-price-item ${s}">\n                            <div class="season-label">${e}</div>\n                            <div class="season-price">${t}</div>\n                          </div>`})),o+="</div>",n=n.replace("\x3c!--inline-months--\x3e",o),n+="</div>",t.innerHTML=n}function isInViewport(e){const t=e.getBoundingClientRect();return t.top<=(window.innerHeight||document.documentElement.clientHeight)&&t.bottom>=0}function wrapLiTextWithSpan(){document.querySelectorAll(".detailed-specs li").forEach((function(e){const t=e.textContent;e.innerHTML=`<span>${t}</span>`}))}yachtNameDiv.className="yacht-name",yachtNameDiv.innerText="Boat Name",document.body.appendChild(yachtNameDiv),window.addEventListener("load",(function(){var e=document.querySelector(".yacht-name");e&&setTimeout((function(){e.style.left="0px"}),100)})),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelectorAll(".tab-buttons button"),t=document.querySelectorAll(".tab-content");e.forEach((n=>{n.addEventListener("click",(function(){e.forEach((e=>e.classList.remove("active"))),this.classList.add("active");const n=this.id.replace("-tab","-content");t.forEach((e=>e.classList.remove("active"))),document.getElementById(n).classList.add("active")}))}))})),document.addEventListener("DOMContentLoaded",(function(){fetch("yachts.json").then((e=>e.json())).then((e=>{!function(){const t=getCurrentYachtId(),n=e.find((e=>e.id===t));n&&n.seasonalPrices&&updatePriceDisplay(n.seasonalPrices)}()}))})),window.addEventListener("scroll",(function(){const e=document.querySelector(".navigation-row");window.scrollY>100?e.classList.add("centered-nav"):e.classList.remove("centered-nav")})),document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".detailed-specs"),t=Array.from(e.querySelectorAll("li"));if(t.length>15){const e=document.createElement("ul");e.className="detailed-specs";for(let n=15;n<t.length;n++)e.appendChild(t[n]);document.getElementById("key-info").appendChild(e)}})),window.addEventListener("scroll",(function(){const e=document.querySelector(".description-text");isInViewport(e)&&e.classList.add("visible")})),window.addEventListener("scroll",(function(){var e=document.getElementById("interior").getBoundingClientRect();e.top<window.innerHeight/2&&e.bottom>=0&&document.querySelectorAll("#interior img").forEach((function(e){e.style.transform="translateY(0)",e.style.opacity="1"}))})),document.addEventListener("DOMContentLoaded",(function(){wrapLiTextWithSpan()})),window.addEventListener("scroll",(function(){const e=document.querySelector(".section-title"),t=e.getBoundingClientRect();t.top<window.innerHeight&&t.bottom>=0?e.classList.add("active"):e.classList.remove("active");const n=document.querySelector(".yacht-specs h2"),o=n.getBoundingClientRect();o.top<window.innerHeight&&o.bottom>=0?n.classList.add("active"):n.classList.remove("active")})),window.addEventListener("scroll",(function(){const e=document.querySelector(".yacht-specs h2"),t=e.getBoundingClientRect();t.top<window.innerHeight&&t.bottom>=0?e.classList.add("active"):e.classList.remove("active")})),window.addEventListener("scroll",(function(){document.querySelectorAll(".detailed-specs li").forEach((function(e,t){const n=e.getBoundingClientRect();n.top<window.innerHeight&&n.bottom>=0&&setTimeout((()=>{e.classList.add("reveal")}),100*t)}))}));
