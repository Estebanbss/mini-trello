import{a as F}from"./chunk-5CRNBX7X.js";import"./chunk-IR7R6RGR.js";import{a as c}from"./chunk-RGB2TQAQ.js";import{$a as w,Aa as g,G as e,I as f,L as d,Na as A,Ra as S,Sa as y,Ta as T,Ua as x,Va as M,Ya as k,Za as m,ab as b,c as a,db as p,ma as h,na as v,oa as C}from"./chunk-4EG34OFM.js";var s=(r,o)=>a(void 0,null,function*(){let l=e(m),n=e(c),t=e(p),i=yield n.isAuth().catch(R=>(console.error("Error al verificar la autenticaci\xF3n:",R),!1));return i!=null&&i!=null?i?!0:(l.navigate(["login"]),t.delete("token"),t.delete("user.email"),t.delete("user.name"),t.delete("user.id"),t.delete("user.type"),localStorage.removeItem("user"),!1):!1});var u=(r,o)=>a(void 0,null,function*(){let l=e(m),n=e(c),t=!1;try{t=yield n.isAuth()}catch(i){console.error("Error al verificar la autenticaci\xF3n:",i)}return t&&l.navigate(["home"]),!0});var G=[{path:"",canActivate:[s],loadComponent:()=>import("./chunk-373T4GOM.js"),children:[{path:"board/:id/:boardName",canActivate:[s],title:"Boards",loadComponent:()=>import("./chunk-KVRCS3B2.js")}]},{path:"login",canActivate:[u],title:"Log In - MiniTrello",loadComponent:()=>import("./chunk-BLJVZVGI.js")},{path:"signup",canActivate:[u],title:"Sign Up - MiniTrello",loadComponent:()=>import("./chunk-ZIFVRYBJ.js")},{path:"",redirectTo:"/",pathMatch:"full"},{path:"**",redirectTo:"/",pathMatch:"full"}];var H={providers:[S(y()),w(G,b({skipInitialTransition:!0})),M(),d(T,p)]};var I=(()=>{let o=class o{constructor(){this.title="mini-trello",this.theme=e(F)}ngOnInit(){this.theme.veryfyTheme()}};o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=f({type:o,selectors:[["app-root"]],standalone:!0,features:[g],decls:2,vars:0,consts:[[1,"flex","flex-col"],[1,"block"]],template:function(t,i){t&1&&(h(0,"div",0),C(1,"router-outlet",1),v())},dependencies:[A,k]});let r=o;return r})();x(I,H).catch(r=>console.error(r));