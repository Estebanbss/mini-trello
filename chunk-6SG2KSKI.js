import{A as n,Ia as h,c as o,f as c,j as p,ua as l,w as m}from"./chunk-WGJX6WOX.js";var E=(()=>{let i=class i{constructor(t,e){this.http=t,this.cookies=e,this.apiLogin="/api/login/authenticate"}login(t){return this.http.post(this.apiLogin,t).pipe(p(e=>(console.error(e.error.message),alert(e.error.message),c("e"))))}getToken(){return o(this,null,function*(){return yield this.cookies.get("token")})}isAuth(){return o(this,null,function*(){try{let t=yield this.getToken();return t?!(yield this.isTokenExpired(t))?.expired:!1}catch(t){return console.error("Error al verificar la autenticaci\xF3n:",t),!1}})}isTokenExpired(t){return o(this,null,function*(){let e=t.split(".");return new Promise((k,u)=>{try{let r=JSON.parse(atob(e[1]));this.cookies.set("user.email",r["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]),this.cookies.set("user.name",r["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]),this.cookies.set("user.type",r.AType);let a=Math.floor(new Date().getTime()/1e3),d=r?.exp-a;k({expired:a>=r?.exp,timeRemaining:d})}catch(r){console.error("Error parsing token payload:",r),u(r)}})})}};i.\u0275fac=function(e){return new(e||i)(n(l),n(h))},i.\u0275prov=m({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})();export{E as a};
