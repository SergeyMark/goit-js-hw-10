const n=document.querySelector("#search-box"),a=document.querySelector(".country-list"),e=document.querySelector(".country-info");n.addEventListener("input",(function(n){let t=n.target.value.trim();if(!t)return a.innerHTML="",void(e.innerHTML="");(i=t,fetch(`https://restcountries.com/v3.1/name/${i}?fields=name,capital,population,flags,languages`).then((n=>{if(!n.ok)throw new Error(n.statusText);return n.json()}))).then((n=>{var t;console.log(n),n.length>10&&console.log("info"),n.length>=2&&n.length<=10&&(t=n,a.innerHTML=t.map((({flags:{svg:n},name:{official:a}})=>`<li>\n            <img src="${n}" alt="${a}" width="100">\n            <h2>${a}</h2>\n        </li>`)).join(""),e.innerHTML=""),1===n.length&&(!function(n){e.innerHTML=n.map((({flags:{svg:n},name:{official:a},capital:e,population:t,languages:i})=>`<img src="${n}" alt="${a}" width="50">\n    <span>${a}</span>\n    <div>\n      <span>Capital:</span>\n      <span>${e}</span>\n    </div>\n    <div>\n      <span>Population:</span>\n      <span>${t}</span>\n    </div>\n    <div>\n      <span>Languages:</span>\n      <span>${Object.values(i).join(", ")}</span>\n    </div>`)).join("")}(n),a.innerHTML="")}));var i}));
//# sourceMappingURL=index.8527b975.js.map
