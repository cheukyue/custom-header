var e={},t=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,n="[^\\s]+",o=/\[([^]*?)\]/gm,r=function(){};function a(e,t){for(var n=[],o=0,r=e.length;o<r;o++)n.push(e[o].substr(0,t));return n}function i(e){return function(t,n,o){var r=o[e].indexOf(n.charAt(0).toUpperCase()+n.substr(1).toLowerCase());~r&&(t.month=r)}}function s(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=["January","February","March","April","May","June","July","August","September","October","November","December"],d=a(l,3),u=a(c,3);e.i18n={dayNamesShort:u,dayNames:c,monthNamesShort:d,monthNames:l,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var h={D:function(e){return e.getDate()},DD:function(e){return s(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return s(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return s(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return s(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return s(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return s(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return s(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return s(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return s(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return s(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return s(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+s(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},m={D:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+n,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],YY:["\\d\\d?",function(e,t){var n=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?n-1:n)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],YYYY:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],d:["\\d\\d?",r],ddd:[n,r],MMM:[n,i("monthNamesShort")],MMMM:[n,i("monthNames")],a:[n,function(e,t,n){var o=t.toLowerCase();o===n.amPm[0]?e.isPm=!1:o===n.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var n,o=(t+"").match(/([+-]|\d\d)/gi);o&&(n=60*o[1]+parseInt(o[2],10),e.timezoneOffset="+"===o[0]?n:-n)}]};m.dd=m.d,m.dddd=m.ddd,m.DD=m.D,m.mm=m.m,m.hh=m.H=m.HH=m.h,m.MM=m.M,m.ss=m.s,m.A=m.a,e.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},e.format=function(n,r,a){var i=a||e.i18n;if("number"==typeof n&&(n=new Date(n)),"[object Date]"!==Object.prototype.toString.call(n)||isNaN(n.getTime()))throw new Error("Invalid Date in fecha.format");r=e.masks[r]||r||e.masks.default;var s=[];return(r=(r=r.replace(o,(function(e,t){return s.push(t),"@@@"}))).replace(t,(function(e){return e in h?h[e](n,i):e.slice(1,e.length-1)}))).replace(/@@@/g,(function(){return s.shift()}))},e.parse=function(n,r,a){var i=a||e.i18n;if("string"!=typeof r)throw new Error("Invalid format in fecha.parse");if(r=e.masks[r]||r,n.length>1e3)return null;var s={},c=[],l=[];r=r.replace(o,(function(e,t){return l.push(t),"@@@"}));var d,u=(d=r,d.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(t,(function(e){if(m[e]){var t=m[e];return c.push(t[1]),"("+t[0]+")"}return e}));u=u.replace(/@@@/g,(function(){return l.shift()}));var h=n.match(new RegExp(u,"i"));if(!h)return null;for(var p=1;p<h.length;p++)c[p-1](s,h[p],i);var y,b=new Date;return!0===s.isPm&&null!=s.hour&&12!=+s.hour?s.hour=+s.hour+12:!1===s.isPm&&12==+s.hour&&(s.hour=0),null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,y=new Date(Date.UTC(s.year||b.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):y=new Date(s.year||b.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),y};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();const p=document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main"),y=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}(),b=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot}(),f=e=>{let t;const{views:n}=y.config;return isNaN(e)?n.forEach(o=>{o.title!==e&&o.path!==e||(t=n.indexOf(o))}):t=parseInt(e,10),t},g=e=>{const t=[],n=(e,t)=>new Array(t-e+1).fill(void 0).map((t,n)=>n+e);if(e.includes("to")){const o=e.split("to");parseInt(o[1])>parseInt(o[0])?t.push(n(parseInt(o[0]),parseInt(o[1]))):t.push(n(parseInt(o[1]),parseInt(o[0])))}return t.flat()},v=e=>{let t=[];e="string"==typeof e?e.replace(/\s+/g,"").split(","):e;for(const n in e)"string"==typeof e[n]&&e[n].includes("to")?t.push(g(e[n])):t.push(e[n]);t=t.flat();for(const e in t)isNaN(t[e])?t[e]=f(t[e]):t[e]=parseInt(t[e]);return t.sort((e,t)=>e-t)},w=e=>{let t={},n=0;return e.exceptions&&e.exceptions.forEach(e=>{const o=(e=>{const t={user:document.body.querySelector("home-assistant").hass.user.name,user_agent:navigator.userAgent};let n=0;for(const o in e)if("user"==o&&e[o].includes(","))e[o].split(/[ ,]+/).forEach(e=>{t[o]==e&&n++});else{if(!(t[o]==e[o]||"query_string"==o&&window.location.search.includes(e[o])||"user_agent"==o&&t[o].includes(e[o])||"media_query"==o&&window.matchMedia(e[o]).matches))return 0;n++}return n})(e.conditions);o>n&&(n=o,t=e.config)}),t.hide_tabs&&e.show_tabs&&t.hide_tabs.length&&e.show_tabs.length?delete e.show_tabs:t.show_tabs&&e.hide_tabs&&t.show_tabs.length&&e.hide_tabs.length&&delete e.hide_tabs,{...e,...t}},_=(()=>{if(b.querySelector("cch-header"))return;const e={},t=Array.from((b.querySelector("paper-tabs")||b).querySelectorAll("paper-tab"));e.tabContainer=document.createElement("paper-tabs"),e.tabContainer.setAttribute("scrollable",""),e.tabContainer.setAttribute("dir","ltr"),e.tabContainer.style.width="100%",e.tabContainer.style.marginLeft="0",t.forEach(n=>{const o=t.indexOf(n),r=n.cloneNode(!0),a=r.querySelector("ha-icon");a&&a.setAttribute("icon",y.config.views[o].icon),r.addEventListener("click",()=>{b.querySelector("paper-tabs").querySelectorAll("paper-tab")[o].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))}),e.tabContainer.appendChild(r)}),e.tabs=e.tabContainer.querySelectorAll("paper-tab");const n=(t,n,o)=>{if("options"===t){e[t]=b.querySelector(o).cloneNode(!0),e[t].removeAttribute("horizontal-offset"),e[t].querySelector("paper-icon-button").style.height="48px";const n=Array.from(e[t].querySelectorAll("paper-item"));n.forEach(e=>{const t=n.indexOf(e);e.addEventListener("click",()=>{b.querySelector(o).querySelectorAll("paper-item")[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})})}else{if("voice"!==t||b.querySelector("ha-start-voice-button")||(o='[icon="hass:microphone"]'),!b.querySelector(o))return;e[t]=document.createElement("paper-icon-button"),e[t].addEventListener("click",()=>{(b.querySelector(o).shadowRoot.querySelector("paper-icon-button")||b.querySelector(o)).dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})}e[t].setAttribute("icon",n),e[t].setAttribute("buttonElem",t),e[t].style.flexShrink="0",e[t].style.height="48px"};n("menu","mdi:menu","ha-menu-button"),n("voice","mdi:microphone","ha-start-voice-button"),n("options","mdi:dots-vertical","paper-menu-button");const o=document.createElement("cch-stack"),r=document.createElement("div");return r.setAttribute("id","contentContainer"),e.container=document.createElement("cch-header"),e.menu&&e.container.appendChild(e.menu),e.container.appendChild(o),e.stack=e.container.querySelector("cch-stack"),e.stack.appendChild(r),e.tabContainer&&e.stack.appendChild(e.tabContainer),e.voice&&"hidden"!=e.voice.style.visibility&&e.container.appendChild(e.voice),e.options&&e.container.appendChild(e.options),b.querySelector("ha-app-layout").appendChild(e.container),e})(),S=e=>{if(window.location.href.includes("disable_ch"))return;let t=document.createElement("style");t.setAttribute("id","cch_header_style"),t.innerHTML+="\n        #drawer {\n          display: none;\n        }\n      ",e||(t.innerHTML+="\n        cch-header {\n          display: none;\n        }\n        app-header {\n          display: none;\n        }\n        hui-view, hui-panel-view {\n          min-height: 100vh;\n        }\n      ");const n=b.querySelector("#cch_header_style");n&&n.innerText==t.innerHTML||(b.appendChild(t),n&&n.remove()),p.shadowRoot.querySelector("#drawer").style.display="none",p.shadowRoot.querySelector("ha-sidebar").shadowRoot.querySelector("#cch_sidebar_style")||((t=document.createElement("style")).setAttribute("id","cch_sidebar_style"),t.innerHTML=":host(:not([expanded])) {width: 0px !important;}",p.shadowRoot.querySelector("ha-sidebar").shadowRoot.appendChild(t)),p.shadowRoot.querySelector("#cch_sidebar_style")||((t=document.createElement("style")).setAttribute("id","cch_sidebar_style"),t.innerHTML=":host {--app-drawer-width: 0px !important;}",p.shadowRoot.appendChild(t)),window.dispatchEvent(new Event("resize"))},M=e=>{let t=document.createElement("style");if(window.location.href.includes("disable_ch"))return;const n=p.shadowRoot.querySelector("ha-sidebar");e.disable_sidebar?S(!0):e.disable_sidebar||e.kiosk_mode||((()=>{p.shadowRoot.querySelector("#drawer").style.display="";let e=p.shadowRoot.querySelector("#cch_sidebar_style");e&&e.remove(),(e=p.shadowRoot.querySelector("ha-sidebar").shadowRoot.querySelector("#cch_sidebar_style"))&&e.remove(),p.shadowRoot.querySelector("#drawer").style.display=""})(),n.shadowRoot.querySelector(".menu").style="height:49px;",n.shadowRoot.querySelector("paper-listbox").style="height:calc(100% - 155px);",n.shadowRoot.querySelector("div.divider").style="margin-bottom: -10px;");let o=48;e.compact_mode||(_.container.querySelector("#contentContainer").innerHTML=e.header_text,o=_.tabs.length?96:48),t.setAttribute("id","cch_header_style"),t.innerHTML=`\n      cch-header {\n        width:100%;\n        display:flex;\n        justify-content: center;\n        background: ${e.background||"var(--primary-color)"};\n        color: ${e.elements_color||"var(--text-primary-color)"};\n        margin-top: 4px;\n        margin-bottom: 0px;\n        margin-top: ${e.footer?"4px;":"0px"};\n        ${e.footer?"position: sticky; bottom: 0px;":"position: sticky; top: 0px;"}\n      }\n      cch-stack {\n        flex-direction: column;\n        width: 100%;\n        margin-left: 9px;\n        margin-right: 9px;\n      }\n      #contentContainer {\n        padding: 12px 20px 12px 20px;\n        color: var(--text-primary-color);\n        font: 400 20px Roboto, sans-serif;\n        ${e.compact_mode?"display: none;":""}\n      }\n      app-header {\n        display: none;\n      }\n      [buttonElem="menu"] {\n        ${e.menu_color?`color: ${e.menu_color};`:""}\n      }\n      [buttonElem="options"] {\n        ${e.options_color?`color: ${e.options_color};`:""}\n      }\n      [buttonElem="voice"] {\n        ${e.voice_color?`color: ${e.voice_color};`:""}\n      }\n      paper-tab {\n        ${e.all_tabs_color?`color: ${e.all_tabs_color};`:""}\n      }\n    `,e.tabs_color&&Object.keys(e.tabs_color).forEach(n=>{t.innerHTML+=`\n      paper-tab:nth-child(${f(n)+1}) {\n        color: ${e.tabs_color[n]};\n      }\n    `}),e.hide_tabs&&e.hide_tabs.forEach(e=>{t.innerHTML+=`\n      paper-tab:nth-child(${f(e)+1}) {\n        display: none;\n      }\n    `});let r=b.querySelector("#cch_header_style");b.appendChild(t),r&&r.remove();const a=document.createElement("style");a.setAttribute("id","cch_view_style"),a.innerHTML=`\n        hui-view, hui-panel-view {\n          min-height: calc(100vh - ${o}px);\n          padding-top: 2px;\n          ${e.footer?`padding-bottom: ${o}px;`:""}\n          ${e.footer?`margin-bottom: -${o+4}px;`:""}\n        }\n        hui-panel-view {\n          padding-top: 0px;\n        }\n        #view {\n          ${e.footer?`min-height: calc(100vh - ${o+4}px) !important;`:""}\n        }\n      `,(r=b.querySelector("#cch_view_style"))&&a.innerHTML==r.innerHTML||(b.appendChild(a),r&&r.remove()),(t=document.createElement("style")).setAttribute("id","cch_chevron"),t.innerHTML='\n      .not-visible[icon*="chevron"] {\n        display:none;\n      }\n    ',r=_.tabContainer.shadowRoot.querySelector("#cch_chevron"),_.tabContainer.shadowRoot.appendChild(t),r&&r.remove(),e.chevrons?_.tabContainer.hideScrollButtons=!1:_.tabContainer.hideScrollButtons=!0,e.indicator_top?_.tabContainer.alignBottom=!0:_.tabContainer.alignBottom=!1,e.footer?_.options.setAttribute("vertical-align","bottom"):_.options.removeAttribute("vertical-align"),e.footer?_.container.removeAttribute("slot"):_.container.setAttribute("slot","header"),_.tabContainer.dir=e.tab_direction,_.container.dir=e.button_direction;const i=b.querySelector("ha-menu-button"),s=()=>{i.style.display="none",e.disable_sidebar?_.menu.style.display="none":"hidden"===i.style.visibility?(_.menu.style.display="none",_.menu.style.visibility="hidden",_.menu.style.marginRight="33px"):(_.menu.style.visibility="initial",_.menu.style.marginRight="",_.menu.style.display="initial")};new MutationObserver(()=>{s()}).observe(i,{attributes:!0,attributeFilter:["style"]}),s(),_.tabs.length?_.tabContainer.querySelector("paper-tab.iron-selected").click():_.tabContainer.style.display="none",window.dispatchEvent(new Event("resize"))},q=()=>{let e={footer:!1,kiosk_mode:!1,disable_sidebar:!1,compact_mode:!0,background:"var(--primary-color)",elements_color:"var(--text-primary-color)",menu_color:"",voice_color:"",options_color:"",all_tabs_color:"",tabs_color:[],tab_direction:"ltr",button_direction:"ltr",chevrons:!0,indicator_top:!1,hide_tabs:[],show_tabs:[],template_variables:"",exceptions:[],header_text:"Home Assistant",...y.config.custom_header};const t=(e={...e,...w(e)}).template_variables;delete e.template_variables;const n=()=>{e.hide_tabs&&(e.hide_tabs=v(e.hide_tabs)),e.show_tabs&&(e.show_tabs=v(e.show_tabs)),e.show_tabs&&e.show_tabs.length&&(e.hide_tabs=(e=>{const t=Array.from(b.querySelectorAll("paper-tab"));if(e&&e.length){const n=[];for(let e=0;e<t.length;e+=1)n.push(e);return n.filter(t=>!e.includes(t))}})(e.show_tabs)),e.kiosk_mode?S(!1):M(e)};let o=!1;const r=JSON.stringify(e),a=!!t||r.includes("{{")||r.includes("{%");a?((e,t)=>{const n=document.body.querySelector("home-assistant").hass.connection,o={user:document.body.querySelector("home-assistant").hass.user.name,browser:navigator.userAgent,hash:location.hash.substr(1)||" ",...t.variables},r=t.template,a=t.entity_ids;n.subscribeMessage(t=>e(t.result),{type:"render_template",template:r,variables:o,entity_ids:a})})(t=>{o=!0,window.customHeaderLastTemplateResult!=t&&(window.customHeaderLastTemplateResult=t,e=JSON.parse(t.replace(/"true"/gi,"true").replace(/"false"/gi,"false").replace(/""/,"")),n(),window.customHeaderTemplateRenderInterval||(window.customHeaderTemplateRenderInterval=!0,window.setInterval(()=>{q()},1e3*(60-(new Date).getSeconds()))))},{template:JSON.stringify(t).replace(/\\/g,"")+JSON.stringify(e).replace(/\\/g,"")}):n(),setTimeout((function(){!o&&a&&console.log("Custom-Header: There was an issue with your template/s. Please, check your config.")}),1e4)};q(),(()=>{const e=new MutationObserver(e=>{e.forEach(({addedNodes:e,target:t})=>{e.length&&"PARTIAL-PANEL-RESOLVER"==t.nodeName?q():"edit-mode"===t.className&&e.length?(window.scrollTo({top:0,behavior:"smooth"}),b.querySelector("app-header").style.visibility="initial",b.querySelector("cch-header").style.visibility="hidden",b.querySelector("#cch_header_style").remove(),_.menu.style.display="none"):"APP-HEADER"===t.nodeName&&e.length&&(_.menu.style.display="",b.querySelector("cch-header").style.visibility="initial",q())})});e.observe(p.shadowRoot.querySelector("partial-panel-resolver"),{childList:!0}),e.observe(b.querySelector("app-header"),{childList:!0})})();
