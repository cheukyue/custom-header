var e={},t=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,n="[^\\s]+",o=/\[([^]*?)\]/gm,r=function(){};function a(e,t){for(var n=[],o=0,r=e.length;o<r;o++)n.push(e[o].substr(0,t));return n}function i(e){return function(t,n,o){var r=o[e].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~r&&(t.month=r)}}function c(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],u=["January","February","March","April","May","June","July","August","September","October","November","December"],s=a(u,3),d=a(l,3);e.i18n={dayNamesShort:d,dayNames:l,monthNamesShort:s,monthNames:u,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var h={D:function(e){return e.getDate()},DD:function(e){return c(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return c(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return c(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return c(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return c(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return c(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return c(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return c(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return c(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return c(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return c(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+c(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},m={D:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+n,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],YY:["\\d\\d?",function(e,t){var n=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?n-1:n)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],YYYY:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],d:["\\d\\d?",r],ddd:[n,r],MMM:[n,i("monthNamesShort")],MMMM:[n,i("monthNames")],a:[n,function(e,t,n){var o=t.toLowerCase();o===n.amPm[0]?e.isPm=!1:o===n.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var n,o=(t+"").match(/([+-]|\d\d)/gi);o&&(n=60*o[1]+parseInt(o[2],10),e.timezoneOffset="+"===o[0]?n:-n)}]};m.dd=m.d,m.dddd=m.ddd,m.DD=m.D,m.mm=m.m,m.hh=m.H=m.HH=m.h,m.MM=m.M,m.ss=m.s,m.A=m.a,e.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},e.format=function(n,r,a){var i=a||e.i18n;if("number"==typeof n&&(n=new Date(n)),"[object Date]"!==Object.prototype.toString.call(n)||isNaN(n.getTime()))throw new Error("Invalid Date in fecha.format");r=e.masks[r]||r||e.masks.default;var c=[];return(r=(r=r.replace(o,function(e,t){return c.push(t),"@@@"})).replace(t,function(e){return e in h?h[e](n,i):e.slice(1,e.length-1)})).replace(/@@@/g,function(){return c.shift()})},e.parse=function(n,r,a){var i=a||e.i18n;if("string"!=typeof r)throw new Error("Invalid format in fecha.parse");if(r=e.masks[r]||r,n.length>1e3)return null;var c={},l=[],u=[];r=r.replace(o,function(e,t){return u.push(t),"@@@"});var s,d=(s=r,s.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(t,function(e){if(m[e]){var t=m[e];return l.push(t[1]),"("+t[0]+")"}return e});d=d.replace(/@@@/g,function(){return u.shift()});var h=n.match(new RegExp(d,"i"));if(!h)return null;for(var p=1;p<h.length;p++)l[p-1](c,h[p],i);var f,y=new Date;return!0===c.isPm&&null!=c.hour&&12!=+c.hour?c.hour=+c.hour+12:!1===c.isPm&&12==+c.hour&&(c.hour=0),null!=c.timezoneOffset?(c.minute=+(c.minute||0)-+c.timezoneOffset,f=new Date(Date.UTC(c.year||y.getFullYear(),c.month||0,c.day||1,c.hour||0,c.minute||0,c.second||0,c.millisecond||0))):f=new Date(c.year||y.getFullYear(),c.month||0,c.day||1,c.hour||0,c.minute||0,c.second||0,c.millisecond||0),f};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();var p=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null},f=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot};const y=e=>{let t;const{views:n}=p().config;return isNaN(e)?n.forEach(o=>{o.title!==e&&o.path!==e||(t=n.indexOf(o))}):t=parseInt(e,10),t},b=e=>{const t="string"==typeof e?e.replace(/\s+/g,"").split(","):e;return t.forEach(e=>{t[t.indexOf(e)]=y(e)}),t},g={...p().config.custom_header};g.hide_tabs&&(g.hide_tabs=b(g.hide_tabs)),g.show_tabs&&(g.show_tabs=b(g.show_tabs));const v=Array.from(f().querySelectorAll("paper-tab"));if(g.show_tabs&&g.show_tabs.length){const e=[];for(let t=0;t<v.length;t+=1)e.push(t);g.hide_tabs=e.filter(e=>!g.show_tabs.includes(e))}const S={footer:!1,background:"var(--primary-color)",elements_color:"var(--text-primary-color)",menu_color:"",voice_color:"",options_color:"",all_tabs_color:"",tabs_color:[],chevrons:!0,indicator_top:!1,hide_tabs:[],show_tabs:[],...g};const M=function(){const e={},t=Array.from((f().querySelector("paper-tabs")||f()).querySelectorAll("paper-tab"));e.tabContainer=document.createElement("paper-tabs"),e.tabContainer.setAttribute("scrollable",""),e.tabContainer.setAttribute("dir","ltr"),e.tabContainer.style.width="100%",e.tabContainer.style.marginLeft="0",t.forEach(n=>{const o=t.indexOf(n),r=n.cloneNode(!0),a=r.querySelector("ha-icon");a&&a.setAttribute("icon",p().config.views[o].icon),r.addEventListener("click",()=>{f().querySelector("paper-tabs").querySelectorAll("paper-tab")[o].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))}),e.tabContainer.appendChild(r)}),e.tabs=e.tabContainer.querySelectorAll("paper-tab");const n=(t,n,o)=>{if("options"===t){e[t]=f().querySelector(o).cloneNode(!0),S.footer&&e[t].setAttribute("vertical-align","bottom"),e[t].removeAttribute("horizontal-offset"),e[t].querySelector("paper-icon-button").style.height="48px";const n=Array.from(e[t].querySelectorAll("paper-item"));n.forEach(e=>{const t=n.indexOf(e);e.addEventListener("click",()=>{f().querySelector(o).querySelectorAll("paper-item")[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})})}else e[t]=document.createElement("paper-icon-button"),e[t].addEventListener("click",()=>{f().querySelector(o).shadowRoot.querySelector("paper-icon-button").dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))});e[t].setAttribute("icon",n),e[t].setAttribute("buttonElem",t),e[t].style.flexShrink="0",e[t].style.height="48px"};return n("menu","mdi:menu","ha-menu-button"),n("voice","mdi:microphone","ha-start-voice-button"),n("options","mdi:dots-vertical","paper-menu-button"),e.container=document.createElement("cch-header"),S.footer||e.container.setAttribute("slot","header"),e.menu&&e.container.appendChild(e.menu),e.tabContainer&&e.container.appendChild(e.tabContainer),e.voice&&e.container.appendChild(e.voice),e.options&&e.container.appendChild(e.options),f().querySelector("ha-app-layout").appendChild(e.container),e}();function w(){f().querySelector("app-header").style.visibility="hidden";const e=getComputedStyle(f().querySelector("app-header")).getPropertyValue("height");let t=document.createElement("style");t.setAttribute("id","cch_header_style"),t.innerHTML=`\n      cch-header {\n        width:100%;\n        display:flex;\n        justify-content: center;\n        background: ${S.background};\n        color: ${S.elements_color};\n        ${0===M.tabs.length?"margin-top: 48px;":""}\n        ${S.footer?"position: sticky; bottom: 0px;":""}\n      }\n      hui-view, hui-panel-view {\n        margin-top: -${e};\n        padding-top: ${S.footer?"0px;":"53px;"}\n        ${S.footer?"padding-bottom: 48px;":""}\n        ${S.footer?"margin-bottom: -48px;":""}\n      }\n      hui-panel-view {\n        ${S.footer?"":"padding-top: 48px;"}\n      }\n      #view {\n        ${S.footer?"min-height: calc(100vh - 160px) !important;":""}\n      }\n      [buttonElem="menu"] {\n        ${S.menu_color?`color: ${S.menu_color};`:""}\n      }\n      [buttonElem="options"] {\n        ${S.options_color?`color: ${S.options_color};`:""}\n      }\n      [buttonElem="voice"] {\n        ${S.voice_color?`color: ${S.voice_color};`:""}\n      }\n      paper-tab {\n        ${S.all_tabs_color?`color: ${S.all_tabs_color};`:""}\n      }\n    `,S.tabs_color&&Object.keys(S.tabs_color).forEach(e=>{t.innerHTML+=`\n      paper-tab:nth-child(${y(e)+1}) {\n        color: ${S.tabs_color[e]};\n      }\n    `}),S.hide_tabs&&S.hide_tabs.forEach(e=>{t.innerHTML+=`\n      paper-tab:nth-child(${y(e)+1}) {\n        display: none;\n      }\n    `}),f().appendChild(t),(t=document.createElement("style")).setAttribute("id","cch_chevron"),t.innerHTML='\n      .not-visible[icon*="chevron"] {\n        display:none;\n      }\n    ',M.tabContainer.shadowRoot.appendChild(t),S.chevrons||(M.tabContainer.hideScrollButtons=!0),S.indicator_top&&(M.tabContainer.alignBottom=!0);let n=root.querySelector("ha-menu-button");const o=()=>{n.style.display="none","hidden"===n.style.visibility?(S.footer&&(M.menu.style.display="none"),M.menu.style.visibility="hidden",M.menu.style.marginRight="33px"):(M.menu.style.visibility="initial",M.menu.style.display="initial",M.menu.style.marginRight="")};o(),new MutationObserver(()=>{o()}).observe(n,{attributes:!0,attributeFilter:["style"]})}w(),new MutationObserver(e=>{e.forEach(({addedNodes:e,target:t})=>{"edit-mode"===t.className&&e.length?(window.scrollTo({top:0,behavior:"smooth"}),f().querySelector("app-header").style.visibility="initial",f().querySelector("cch-header").style.visibility="hidden",f().querySelector("#cch_header_style").remove(),M.menu.style.display="none"):"APP-HEADER"===t.nodeName&&e.length&&(M.menu.style.display="",f().querySelector("cch-header").style.visibility="initial",w())})}).observe(f().querySelector("app-header"),{childList:!0});
