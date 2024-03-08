import{$ as ae,Ca as a,Fa as $,Ha as le,Ma as c,N as F,O as v,R as h,Sa as ue,T as w,U as l,Ua as W,Z as H,_a as q,a as d,aa as I,b as p,ca as g,gb as C,ha as _,m as re,mb as de,r as se,sa as b,ta as L,ub as z,wb as Z,x as oe}from"./chunk-5JIOMJAB.js";var Ce=(()=>{let e=class e{constructor(t,r){this._renderer=t,this._elementRef=r,this.onChange=s=>{},this.onTouched=()=>{}}setProperty(t,r){this._renderer.setProperty(this._elementRef.nativeElement,t,r)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}};e.\u0275fac=function(r){return new(r||e)(a($),a(H))},e.\u0275dir=l({type:e});let i=e;return i})(),$e=(()=>{let e=class e extends Ce{};e.\u0275fac=(()=>{let t;return function(s){return(t||(t=L(e)))(s||e)}})(),e.\u0275dir=l({type:e,features:[c]});let i=e;return i})(),Q=new g("");var We={provide:Q,useExisting:_(()=>Ve),multi:!0};function qe(){let i=Z()?Z().getUserAgent():"";return/android (\d+)/.test(i.toLowerCase())}var ze=new g(""),Ve=(()=>{let e=class e extends Ce{constructor(t,r,s){super(t,r),this._compositionMode=s,this._composing=!1,this._compositionMode==null&&(this._compositionMode=!qe())}writeValue(t){let r=t??"";this.setProperty("value",r)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}};e.\u0275fac=function(r){return new(r||e)(a($),a(H),a(ze,8))},e.\u0275dir=l({type:e,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(r,s){r&1&&q("input",function(u){return s._handleInput(u.target.value)})("blur",function(){return s.onTouched()})("compositionstart",function(){return s._compositionStart()})("compositionend",function(u){return s._compositionEnd(u.target.value)})},features:[C([We]),c]});let i=e;return i})();function f(i){return i==null||(typeof i=="string"||Array.isArray(i))&&i.length===0}function De(i){return i!=null&&typeof i.length=="number"}var j=new g(""),ee=new g(""),Ze=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,ce=class{static min(e){return Xe(e)}static max(e){return Ye(e)}static required(e){return be(e)}static requiredTrue(e){return Ke(e)}static email(e){return Je(e)}static minLength(e){return Qe(e)}static maxLength(e){return et(e)}static pattern(e){return tt(e)}static nullValidator(e){return O(e)}static compose(e){return Ie(e)}static composeAsync(e){return Oe(e)}};function Xe(i){return e=>{if(f(e.value)||f(i))return null;let n=parseFloat(e.value);return!isNaN(n)&&n<i?{min:{min:i,actual:e.value}}:null}}function Ye(i){return e=>{if(f(e.value)||f(i))return null;let n=parseFloat(e.value);return!isNaN(n)&&n>i?{max:{max:i,actual:e.value}}:null}}function be(i){return f(i.value)?{required:!0}:null}function Ke(i){return i.value===!0?null:{required:!0}}function Je(i){return f(i.value)||Ze.test(i.value)?null:{email:!0}}function Qe(i){return e=>f(e.value)||!De(e.value)?null:e.value.length<i?{minlength:{requiredLength:i,actualLength:e.value.length}}:null}function et(i){return e=>De(e.value)&&e.value.length>i?{maxlength:{requiredLength:i,actualLength:e.value.length}}:null}function tt(i){if(!i)return O;let e,n;return typeof i=="string"?(n="",i.charAt(0)!=="^"&&(n+="^"),n+=i,i.charAt(i.length-1)!=="$"&&(n+="$"),e=new RegExp(n)):(n=i.toString(),e=i),t=>{if(f(t.value))return null;let r=t.value;return e.test(r)?null:{pattern:{requiredPattern:n,actualValue:r}}}}function O(i){return null}function Ae(i){return i!=null}function Me(i){return de(i)?re(i):i}function Ee(i){let e={};return i.forEach(n=>{e=n!=null?d(d({},e),n):e}),Object.keys(e).length===0?null:e}function Fe(i,e){return e.map(n=>n(i))}function it(i){return!i.validate}function we(i){return i.map(e=>it(e)?e:n=>e.validate(n))}function Ie(i){if(!i)return null;let e=i.filter(Ae);return e.length==0?null:function(n){return Ee(Fe(n,e))}}function Se(i){return i!=null?Ie(we(i)):null}function Oe(i){if(!i)return null;let e=i.filter(Ae);return e.length==0?null:function(n){let t=Fe(n,e).map(Me);return oe(t).pipe(se(Ee))}}function Ne(i){return i!=null?Oe(we(i)):null}function he(i,e){return i===null?[e]:Array.isArray(i)?[...i,e]:[i,e]}function Pe(i){return i._rawValidators}function xe(i){return i._rawAsyncValidators}function X(i){return i?Array.isArray(i)?i:[i]:[]}function N(i,e){return Array.isArray(i)?i.includes(e):i===e}function fe(i,e){let n=X(e);return X(i).forEach(r=>{N(n,r)||n.push(r)}),n}function pe(i,e){return X(e).filter(n=>!N(i,n))}var P=class{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=Se(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=Ne(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control&&this.control.reset(e)}hasError(e,n){return this.control?this.control.hasError(e,n):!1}getError(e,n){return this.control?this.control.getError(e,n):null}},m=class extends P{get formDirective(){return null}get path(){return null}},y=class extends P{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}},x=class{constructor(e){this._cd=e}get isTouched(){return!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return!!this._cd?.submitted}},nt={"[class.ng-untouched]":"isUntouched","[class.ng-touched]":"isTouched","[class.ng-pristine]":"isPristine","[class.ng-dirty]":"isDirty","[class.ng-valid]":"isValid","[class.ng-invalid]":"isInvalid","[class.ng-pending]":"isPending"},$t=p(d({},nt),{"[class.ng-submitted]":"isSubmitted"}),Wt=(()=>{let e=class e extends x{constructor(t){super(t)}};e.\u0275fac=function(r){return new(r||e)(a(y,2))},e.\u0275dir=l({type:e,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(r,s){r&2&&W("ng-untouched",s.isUntouched)("ng-touched",s.isTouched)("ng-pristine",s.isPristine)("ng-dirty",s.isDirty)("ng-valid",s.isValid)("ng-invalid",s.isInvalid)("ng-pending",s.isPending)},features:[c]});let i=e;return i})(),qt=(()=>{let e=class e extends x{constructor(t){super(t)}};e.\u0275fac=function(r){return new(r||e)(a(m,10))},e.\u0275dir=l({type:e,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(r,s){r&2&&W("ng-untouched",s.isUntouched)("ng-touched",s.isTouched)("ng-pristine",s.isPristine)("ng-dirty",s.isDirty)("ng-valid",s.isValid)("ng-invalid",s.isInvalid)("ng-pending",s.isPending)("ng-submitted",s.isSubmitted)},features:[c]});let i=e;return i})();var A="VALID",S="INVALID",V="PENDING",M="DISABLED";function te(i){return(B(i)?i.validators:i)||null}function rt(i){return Array.isArray(i)?Se(i):i||null}function ie(i,e){return(B(e)?e.asyncValidators:i)||null}function st(i){return Array.isArray(i)?Ne(i):i||null}function B(i){return i!=null&&!Array.isArray(i)&&typeof i=="object"}function ke(i,e,n){let t=i.controls;if(!(e?Object.keys(t):t).length)throw new F(1e3,"");if(!t[n])throw new F(1001,"")}function Ge(i,e,n){i._forEachChild((t,r)=>{if(n[r]===void 0)throw new F(1002,"")})}var D=class{constructor(e,n){this._pendingDirty=!1,this._hasOwnPendingAsyncValidator=!1,this._pendingTouched=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._assignValidators(e),this._assignAsyncValidators(n)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get valid(){return this.status===A}get invalid(){return this.status===S}get pending(){return this.status==V}get disabled(){return this.status===M}get enabled(){return this.status!==M}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(fe(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(fe(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(pe(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(pe(e,this._rawAsyncValidators))}hasValidator(e){return N(this._rawValidators,e)}hasAsyncValidator(e){return N(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){this.touched=!0,this._parent&&!e.onlySelf&&this._parent.markAsTouched(e)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(e=>e.markAllAsTouched())}markAsUntouched(e={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(n=>{n.markAsUntouched({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}markAsDirty(e={}){this.pristine=!1,this._parent&&!e.onlySelf&&this._parent.markAsDirty(e)}markAsPristine(e={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(n=>{n.markAsPristine({onlySelf:!0})}),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}markAsPending(e={}){this.status=V,e.emitEvent!==!1&&this.statusChanges.emit(this.status),this._parent&&!e.onlySelf&&this._parent.markAsPending(e)}disable(e={}){let n=this._parentMarkedDirty(e.onlySelf);this.status=M,this.errors=null,this._forEachChild(t=>{t.disable(p(d({},e),{onlySelf:!0}))}),this._updateValue(),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(p(d({},e),{skipPristineCheck:n})),this._onDisabledChange.forEach(t=>t(!0))}enable(e={}){let n=this._parentMarkedDirty(e.onlySelf);this.status=A,this._forEachChild(t=>{t.enable(p(d({},e),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors(p(d({},e),{skipPristineCheck:n})),this._onDisabledChange.forEach(t=>t(!1))}_updateAncestors(e){this._parent&&!e.onlySelf&&(this._parent.updateValueAndValidity(e),e.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===A||this.status===V)&&this._runAsyncValidator(e.emitEvent)),e.emitEvent!==!1&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!e.onlySelf&&this._parent.updateValueAndValidity(e)}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(n=>n._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?M:A}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e){if(this.asyncValidator){this.status=V,this._hasOwnPendingAsyncValidator=!0;let n=Me(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(t=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(t,{emitEvent:e})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(e,n={}){this.errors=e,this._updateControlsErrors(n.emitEvent!==!1)}get(e){let n=e;return n==null||(Array.isArray(n)||(n=n.split(".")),n.length===0)?null:n.reduce((t,r)=>t&&t._find(r),this)}getError(e,n){let t=n?this.get(n):this;return t&&t.errors?t.errors[e]:null}hasError(e,n){return!!this.getError(e,n)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(e)}_initObservables(){this.valueChanges=new v,this.statusChanges=new v}_calculateStatus(){return this._allControlsDisabled()?M:this.errors?S:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(V)?V:this._anyControlsHaveStatus(S)?S:A}_anyControlsHaveStatus(e){return this._anyControls(n=>n.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e={}){this.pristine=!this._anyControlsDirty(),this._parent&&!e.onlySelf&&this._parent._updatePristine(e)}_updateTouched(e={}){this.touched=this._anyControlsTouched(),this._parent&&!e.onlySelf&&this._parent._updateTouched(e)}_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){B(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){let n=this._parent&&this._parent.dirty;return!e&&!!n&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=rt(this._rawValidators)}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=st(this._rawAsyncValidators)}},k=class extends D{constructor(e,n,t){super(te(n),ie(t,n)),this.controls=e,this._initObservables(),this._setUpdateStrategy(n),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}registerControl(e,n){return this.controls[e]?this.controls[e]:(this.controls[e]=n,n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange),n)}addControl(e,n,t={}){this.registerControl(e,n),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}removeControl(e,n={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}setControl(e,n,t={}){this.controls[e]&&this.controls[e]._registerOnCollectionChange(()=>{}),delete this.controls[e],n&&this.registerControl(e,n),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}contains(e){return this.controls.hasOwnProperty(e)&&this.controls[e].enabled}setValue(e,n={}){Ge(this,!0,e),Object.keys(e).forEach(t=>{ke(this,!0,t),this.controls[t].setValue(e[t],{onlySelf:!0,emitEvent:n.emitEvent})}),this.updateValueAndValidity(n)}patchValue(e,n={}){e!=null&&(Object.keys(e).forEach(t=>{let r=this.controls[t];r&&r.patchValue(e[t],{onlySelf:!0,emitEvent:n.emitEvent})}),this.updateValueAndValidity(n))}reset(e={},n={}){this._forEachChild((t,r)=>{t.reset(e?e[r]:null,{onlySelf:!0,emitEvent:n.emitEvent})}),this._updatePristine(n),this._updateTouched(n),this.updateValueAndValidity(n)}getRawValue(){return this._reduceChildren({},(e,n,t)=>(e[t]=n.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(n,t)=>t._syncPendingControls()?!0:n);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(n=>{let t=this.controls[n];t&&e(t,n)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[n,t]of Object.entries(this.controls))if(this.contains(n)&&e(t))return!0;return!1}_reduceValue(){let e={};return this._reduceChildren(e,(n,t,r)=>((t.enabled||this.disabled)&&(n[r]=t.value),n))}_reduceChildren(e,n){let t=e;return this._forEachChild((r,s)=>{t=n(t,r,s)}),t}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return this.controls.hasOwnProperty(e)?this.controls[e]:null}};var Y=class extends k{};var U=new g("CallSetDisabledState",{providedIn:"root",factory:()=>R}),R="always";function Te(i,e){return[...e.path,i]}function K(i,e,n=R){ne(i,e),e.valueAccessor.writeValue(i.value),(i.disabled||n==="always")&&e.valueAccessor.setDisabledState?.(i.disabled),at(i,e),ut(i,e),lt(i,e),ot(i,e)}function ge(i,e,n=!0){let t=()=>{};e.valueAccessor&&(e.valueAccessor.registerOnChange(t),e.valueAccessor.registerOnTouched(t)),T(i,e),i&&(e._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}))}function G(i,e){i.forEach(n=>{n.registerOnValidatorChange&&n.registerOnValidatorChange(e)})}function ot(i,e){if(e.valueAccessor.setDisabledState){let n=t=>{e.valueAccessor.setDisabledState(t)};i.registerOnDisabledChange(n),e._registerOnDestroy(()=>{i._unregisterOnDisabledChange(n)})}}function ne(i,e){let n=Pe(i);e.validator!==null?i.setValidators(he(n,e.validator)):typeof n=="function"&&i.setValidators([n]);let t=xe(i);e.asyncValidator!==null?i.setAsyncValidators(he(t,e.asyncValidator)):typeof t=="function"&&i.setAsyncValidators([t]);let r=()=>i.updateValueAndValidity();G(e._rawValidators,r),G(e._rawAsyncValidators,r)}function T(i,e){let n=!1;if(i!==null){if(e.validator!==null){let r=Pe(i);if(Array.isArray(r)&&r.length>0){let s=r.filter(o=>o!==e.validator);s.length!==r.length&&(n=!0,i.setValidators(s))}}if(e.asyncValidator!==null){let r=xe(i);if(Array.isArray(r)&&r.length>0){let s=r.filter(o=>o!==e.asyncValidator);s.length!==r.length&&(n=!0,i.setAsyncValidators(s))}}}let t=()=>{};return G(e._rawValidators,t),G(e._rawAsyncValidators,t),n}function at(i,e){e.valueAccessor.registerOnChange(n=>{i._pendingValue=n,i._pendingChange=!0,i._pendingDirty=!0,i.updateOn==="change"&&je(i,e)})}function lt(i,e){e.valueAccessor.registerOnTouched(()=>{i._pendingTouched=!0,i.updateOn==="blur"&&i._pendingChange&&je(i,e),i.updateOn!=="submit"&&i.markAsTouched()})}function je(i,e){i._pendingDirty&&i.markAsDirty(),i.setValue(i._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1}function ut(i,e){let n=(t,r)=>{e.valueAccessor.writeValue(t),r&&e.viewToModelUpdate(t)};i.registerOnChange(n),e._registerOnDestroy(()=>{i._unregisterOnChange(n)})}function dt(i,e){i==null,ne(i,e)}function ct(i,e){return T(i,e)}function Be(i,e){if(!i.hasOwnProperty("model"))return!1;let n=i.model;return n.isFirstChange()?!0:!Object.is(e,n.currentValue)}function ht(i){return Object.getPrototypeOf(i.constructor)===$e}function ft(i,e){i._syncPendingControls(),e.forEach(n=>{let t=n.control;t.updateOn==="submit"&&t._pendingChange&&(n.viewToModelUpdate(t._pendingValue),t._pendingChange=!1)})}function Ue(i,e){if(!e)return null;Array.isArray(e);let n,t,r;return e.forEach(s=>{s.constructor===Ve?n=s:ht(s)?t=s:r=s}),r||t||n||null}function pt(i,e){let n=i.indexOf(e);n>-1&&i.splice(n,1)}function me(i,e){let n=i.indexOf(e);n>-1&&i.splice(n,1)}function ye(i){return typeof i=="object"&&i!==null&&Object.keys(i).length===2&&"value"in i&&"disabled"in i}var E=class extends D{constructor(e=null,n,t){super(te(n),ie(t,n)),this.defaultValue=null,this._onChange=[],this._pendingChange=!1,this._applyFormState(e),this._setUpdateStrategy(n),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),B(n)&&(n.nonNullable||n.initialValueIsDefault)&&(ye(e)?this.defaultValue=e.value:this.defaultValue=e)}setValue(e,n={}){this.value=this._pendingValue=e,this._onChange.length&&n.emitModelToViewChange!==!1&&this._onChange.forEach(t=>t(this.value,n.emitViewToModelChange!==!1)),this.updateValueAndValidity(n)}patchValue(e,n={}){this.setValue(e,n)}reset(e=this.defaultValue,n={}){this._applyFormState(e),this.markAsPristine(n),this.markAsUntouched(n),this.setValue(this.value,n),this._pendingChange=!1}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){me(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){me(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){ye(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}};var gt=i=>i instanceof E;var mt={provide:y,useExisting:_(()=>yt)},ve=Promise.resolve(),yt=(()=>{let e=class e extends y{constructor(t,r,s,o,u,Le){super(),this._changeDetectorRef=u,this.callSetDisabledState=Le,this.control=new E,this._registered=!1,this.name="",this.update=new v,this._parent=t,this._setValidators(r),this._setAsyncValidators(s),this.valueAccessor=Ue(this,o)}ngOnChanges(t){if(this._checkForErrors(),!this._registered||"name"in t){if(this._registered&&(this._checkName(),this.formDirective)){let r=t.name.previousValue;this.formDirective.removeControl({name:r,path:this._getPath(r)})}this._setUpControl()}"isDisabled"in t&&this._updateDisabled(t),Be(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){K(this.control,this,this.callSetDisabledState),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(t){ve.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(t){let r=t.isDisabled.currentValue,s=r!==0&&z(r);ve.then(()=>{s&&!this.control.disabled?this.control.disable():!s&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(t){return this._parent?Te(t,this._parent):[t]}};e.\u0275fac=function(r){return new(r||e)(a(m,9),a(j,10),a(ee,10),a(Q,10),a(le,8),a(U,8))},e.\u0275dir=l({type:e,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[h.None,"disabled","isDisabled"],model:[h.None,"ngModel","model"],options:[h.None,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[C([mt]),c,b]});let i=e;return i})(),Zt=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275dir=l({type:e,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""]});let i=e;return i})();var Re=new g("");var vt={provide:m,useExisting:_(()=>_t)},_t=(()=>{let e=class e extends m{constructor(t,r,s){super(),this.callSetDisabledState=s,this.submitted=!1,this._onCollectionChange=()=>this._updateDomValue(),this.directives=[],this.form=null,this.ngSubmit=new v,this._setValidators(t),this._setAsyncValidators(r)}ngOnChanges(t){this._checkFormPresent(),t.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}ngOnDestroy(){this.form&&(T(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get control(){return this.form}get path(){return[]}addControl(t){let r=this.form.get(t.path);return K(r,t,this.callSetDisabledState),r.updateValueAndValidity({emitEvent:!1}),this.directives.push(t),r}getControl(t){return this.form.get(t.path)}removeControl(t){ge(t.control||null,t,!1),pt(this.directives,t)}addFormGroup(t){this._setUpFormContainer(t)}removeFormGroup(t){this._cleanUpFormContainer(t)}getFormGroup(t){return this.form.get(t.path)}addFormArray(t){this._setUpFormContainer(t)}removeFormArray(t){this._cleanUpFormContainer(t)}getFormArray(t){return this.form.get(t.path)}updateModel(t,r){this.form.get(t.path).setValue(r)}onSubmit(t){return this.submitted=!0,ft(this.form,this.directives),this.ngSubmit.emit(t),t?.target?.method==="dialog"}onReset(){this.resetForm()}resetForm(t=void 0){this.form.reset(t),this.submitted=!1}_updateDomValue(){this.directives.forEach(t=>{let r=t.control,s=this.form.get(t.path);r!==s&&(ge(r||null,t),gt(s)&&(K(s,t,this.callSetDisabledState),t.control=s))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(t){let r=this.form.get(t.path);dt(r,t),r.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(t){if(this.form){let r=this.form.get(t.path);r&&ct(r,t)&&r.updateValueAndValidity({emitEvent:!1})}}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm&&this._oldForm._registerOnCollectionChange(()=>{})}_updateValidators(){ne(this.form,this),this._oldForm&&T(this._oldForm,this)}_checkFormPresent(){this.form}};e.\u0275fac=function(r){return new(r||e)(a(j,10),a(ee,10),a(U,8))},e.\u0275dir=l({type:e,selectors:[["","formGroup",""]],hostBindings:function(r,s){r&1&&q("submit",function(u){return s.onSubmit(u)})("reset",function(){return s.onReset()})},inputs:{form:[h.None,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],features:[C([vt]),c,b]});let i=e;return i})();var Ct={provide:y,useExisting:_(()=>Vt)},Vt=(()=>{let e=class e extends y{set isDisabled(t){}constructor(t,r,s,o,u){super(),this._ngModelWarningConfig=u,this._added=!1,this.name=null,this.update=new v,this._ngModelWarningSent=!1,this._parent=t,this._setValidators(r),this._setAsyncValidators(s),this.valueAccessor=Ue(this,o)}ngOnChanges(t){this._added||this._setUpControl(),Be(t,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model))}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}get path(){return Te(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_checkParentType(){}_setUpControl(){this._checkParentType(),this.control=this.formDirective.addControl(this),this._added=!0}};e._ngModelWarningSentOnce=!1,e.\u0275fac=function(r){return new(r||e)(a(m,13),a(j,10),a(ee,10),a(Q,10),a(Re,8))},e.\u0275dir=l({type:e,selectors:[["","formControlName",""]],inputs:{name:[h.None,"formControlName","name"],isDisabled:[h.None,"disabled","isDisabled"],model:[h.None,"ngModel","model"]},outputs:{update:"ngModelChange"},features:[C([Ct]),c,b]});let i=e;return i})();var Dt=(()=>{let e=class e{constructor(){this._validator=O}ngOnChanges(t){if(this.inputName in t){let r=this.normalizeInput(t[this.inputName].currentValue);this._enabled=this.enabled(r),this._validator=this._enabled?this.createValidator(r):O,this._onChange&&this._onChange()}}validate(t){return this._validator(t)}registerOnValidatorChange(t){this._onChange=t}enabled(t){return t!=null}};e.\u0275fac=function(r){return new(r||e)},e.\u0275dir=l({type:e,features:[b]});let i=e;return i})();var bt={provide:j,useExisting:_(()=>At),multi:!0};var At=(()=>{let e=class e extends Dt{constructor(){super(...arguments),this.inputName="required",this.normalizeInput=z,this.createValidator=t=>be}enabled(t){return t}};e.\u0275fac=(()=>{let t;return function(s){return(t||(t=L(e)))(s||e)}})(),e.\u0275dir=l({type:e,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(r,s){r&2&&ue("required",s._enabled?"":null)},inputs:{required:"required"},features:[C([bt]),c]});let i=e;return i})();var He=(()=>{let e=class e{};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=w({type:e}),e.\u0275inj=I({});let i=e;return i})(),J=class extends D{constructor(e,n,t){super(te(n),ie(t,n)),this.controls=e,this._initObservables(),this._setUpdateStrategy(n),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}at(e){return this.controls[this._adjustIndex(e)]}push(e,n={}){this.controls.push(e),this._registerControl(e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}insert(e,n,t={}){this.controls.splice(e,0,n),this._registerControl(n),this.updateValueAndValidity({emitEvent:t.emitEvent})}removeAt(e,n={}){let t=this._adjustIndex(e);t<0&&(t=0),this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),this.updateValueAndValidity({emitEvent:n.emitEvent})}setControl(e,n,t={}){let r=this._adjustIndex(e);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),n&&(this.controls.splice(r,0,n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(e,n={}){Ge(this,!1,e),e.forEach((t,r)=>{ke(this,!1,r),this.at(r).setValue(t,{onlySelf:!0,emitEvent:n.emitEvent})}),this.updateValueAndValidity(n)}patchValue(e,n={}){e!=null&&(e.forEach((t,r)=>{this.at(r)&&this.at(r).patchValue(t,{onlySelf:!0,emitEvent:n.emitEvent})}),this.updateValueAndValidity(n))}reset(e=[],n={}){this._forEachChild((t,r)=>{t.reset(e[r],{onlySelf:!0,emitEvent:n.emitEvent})}),this._updatePristine(n),this._updateTouched(n),this.updateValueAndValidity(n)}getRawValue(){return this.controls.map(e=>e.getRawValue())}clear(e={}){this.controls.length<1||(this._forEachChild(n=>n._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:e.emitEvent}))}_adjustIndex(e){return e<0?e+this.length:e}_syncPendingControls(){let e=this.controls.reduce((n,t)=>t._syncPendingControls()?!0:n,!1);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){this.controls.forEach((n,t)=>{e(n,t)})}_updateValue(){this.value=this.controls.filter(e=>e.enabled||this.disabled).map(e=>e.value)}_anyControls(e){return this.controls.some(n=>n.enabled&&e(n))}_setUpControls(){this._forEachChild(e=>this._registerControl(e))}_allControlsDisabled(){for(let e of this.controls)if(e.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(e){e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)}_find(e){return this.at(e)??null}};function _e(i){return!!i&&(i.asyncValidators!==void 0||i.validators!==void 0||i.updateOn!==void 0)}var Xt=(()=>{let e=class e{constructor(){this.useNonNullable=!1}get nonNullable(){let t=new e;return t.useNonNullable=!0,t}group(t,r=null){let s=this._reduceControls(t),o={};return _e(r)?o=r:r!==null&&(o.validators=r.validator,o.asyncValidators=r.asyncValidator),new k(s,o)}record(t,r=null){let s=this._reduceControls(t);return new Y(s,r)}control(t,r,s){let o={};return this.useNonNullable?(_e(r)?o=r:(o.validators=r,o.asyncValidators=s),new E(t,p(d({},o),{nonNullable:!0}))):new E(t,r,s)}array(t,r,s){let o=t.map(u=>this._createControl(u));return new J(o,r,s)}_reduceControls(t){let r={};return Object.keys(t).forEach(s=>{r[s]=this._createControl(t[s])}),r}_createControl(t){if(t instanceof E)return t;if(t instanceof D)return t;if(Array.isArray(t)){let r=t[0],s=t.length>1?t[1]:null,o=t.length>2?t[2]:null;return this.control(r,s,o)}else return this.control(t)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=ae({token:e,factory:e.\u0275fac,providedIn:"root"});let i=e;return i})();var Yt=(()=>{let e=class e{static withConfig(t){return{ngModule:e,providers:[{provide:U,useValue:t.callSetDisabledState??R}]}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=w({type:e}),e.\u0275inj=I({imports:[He]});let i=e;return i})(),Kt=(()=>{let e=class e{static withConfig(t){return{ngModule:e,providers:[{provide:Re,useValue:t.warnOnNgModelWithFormControl??"always"},{provide:U,useValue:t.callSetDisabledState??R}]}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=w({type:e}),e.\u0275inj=I({imports:[He]});let i=e;return i})();export{Ve as a,ce as b,Wt as c,qt as d,yt as e,Zt as f,_t as g,Vt as h,At as i,Xt as j,Yt as k,Kt as l};
