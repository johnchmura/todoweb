(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[926],{1296:function(e,t,n){var i=0/0,r=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,u=/^0o[0-7]+$/i,a=parseInt,c="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g,l="object"==typeof self&&self&&self.Object===Object&&self,f=c||l||Function("return this")(),d=Object.prototype.toString,m=Math.max,h=Math.min,p=function(){return f.Date.now()};function b(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function g(e){if("number"==typeof e)return e;if("symbol"==typeof(t=e)||t&&"object"==typeof t&&"[object Symbol]"==d.call(t))return i;if(b(e)){var t,n="function"==typeof e.valueOf?e.valueOf():e;e=b(n)?n+"":n}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var c=s.test(e);return c||u.test(e)?a(e.slice(2),c?2:8):o.test(e)?i:+e}e.exports=function(e,t,n){var i,r,o,s,u,a,c=0,l=!1,f=!1,d=!0;if("function"!=typeof e)throw TypeError("Expected a function");function x(t){var n=i,o=r;return i=r=void 0,c=t,s=e.apply(o,n)}function j(e){var n=e-a,i=e-c;return void 0===a||n>=t||n<0||f&&i>=o}function v(){var e,n,i,r=p();if(j(r))return y(r);u=setTimeout(v,(e=r-a,n=r-c,i=t-e,f?h(i,o-n):i))}function y(e){return(u=void 0,d&&i)?x(e):(i=r=void 0,s)}function _(){var e,n=p(),o=j(n);if(i=arguments,r=this,a=n,o){if(void 0===u)return c=e=a,u=setTimeout(v,t),l?x(e):s;if(f)return u=setTimeout(v,t),x(a)}return void 0===u&&(u=setTimeout(v,t)),s}return t=g(t)||0,b(n)&&(l=!!n.leading,o=(f="maxWait"in n)?m(g(n.maxWait)||0,t):o,d="trailing"in n?!!n.trailing:d),_.cancel=function(){void 0!==u&&clearTimeout(u),c=0,i=a=r=u=void 0},_.flush=function(){return void 0===u?s:y(p())},_}},8523:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/enter",function(){return n(4847)}])},4847:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var i=n(5893),r=n(33),o=n(5759),s=n(9669),u=n(7294),a=n(6100),c=n(1296),l=n.n(c);function f(e){let{user:t,username:n}=(0,u.useContext)(o.S);return(0,i.jsx)("main",{children:t?n?(0,i.jsx)(m,{}):(0,i.jsx)(h,{}):(0,i.jsx)(d,{})})}function d(){let e=async()=>{try{await (0,s.F6)(r.I8,r.qV)}catch(e){console.log(e)}};return(0,i.jsxs)("button",{className:"btn-google",onClick:e,children:[(0,i.jsx)("img",{src:"/google.png"})," Sign in with Google"]})}function m(){return(0,i.jsx)("button",{onClick:()=>(0,s.w7)(r.I8),children:"Sign Out"})}function h(){let[e,t]=(0,u.useState)(""),[n,s]=(0,u.useState)(!1),[c,f]=(0,u.useState)(!1),{user:d,username:m}=(0,u.useContext)(o.S),h=async t=>{t.preventDefault();let n=(0,a.JU)(r.db,"users/".concat(d.uid)),i=(0,a.JU)(r.db,"usernames/".concat(e)),o=(0,a.qs)(r.db);o.set(n,{username:e,photoURL:d.photoURL,displayName:d.displayName}),o.set(i,{uid:d.uid}),await o.commit()};(0,u.useEffect)(()=>{b(e)},[e]);let b=l()(async e=>{if(e.length>=3){let t=(0,a.JU)(r.db,"usernames/".concat(e)),n=await (0,a.QT)(t),i=n.exists();s(!i),f(!1)}},500);return!m&&(0,i.jsxs)("section",{children:[(0,i.jsx)("h3",{children:"Choose Username"}),(0,i.jsxs)("form",{onSubmit:h,children:[(0,i.jsx)("input",{name:"username",placeholder:"myname",value:e,onChange:e=>{let n=e.target.value.toLowerCase();n.length<3&&(t(n),f(!1),s(!1)),/^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(n)&&(t(n),f(!0),s(!1))}}),(0,i.jsx)(p,{username:e,isValid:n,loading:c}),(0,i.jsx)("button",{type:"submit",className:"btn-green",disabled:!n,children:"Choose"}),(0,i.jsx)("h3",{children:"Debug State"}),(0,i.jsxs)("div",{children:["Username: ",e,(0,i.jsx)("br",{}),"Loading: ",c.toString(),(0,i.jsx)("br",{}),"Username Valid: ",n.toString()]})]})]})}function p(e){let{username:t,isValid:n,loading:r}=e;return r?(0,i.jsx)("p",{children:"Checking..."}):n?(0,i.jsxs)("p",{className:"text-success",children:[t," is available!"]}):t&&!n?(0,i.jsx)("p",{className:"text-danger",children:"That username is taken!"}):(0,i.jsx)("p",{})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8523)}),_N_E=e.O()}]);