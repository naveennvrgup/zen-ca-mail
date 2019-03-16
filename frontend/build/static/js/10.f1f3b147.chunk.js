(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{532:function(e,t,r){"use strict";r.r(t);var n=r(55),a=r.n(n),o=r(58),i=r(7),s=r(2),c=r(6),l=r(4),u=r(3),f=r(5),p=r(0),h=r.n(p),m=r(13),d=function(e){function t(){var e,r;Object(s.a)(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(r=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).axios=Object(m.b)(),r.state={progress:0,onprogress:!1},r.componentDidMount=function(){var e=r.props.img?"100%":"";r.setState(Object(i.a)({},r.state,r.props,{progress:e})),console.log(r.state)},r.selectFilesHandler=function(e){e.preventDefault();var t=document.createElement("input");t.type="file",t.accept="image/x-png,image/gif,image/jpeg",t.click(),t.addEventListener("change",function(e){var t=e.target.files[0];r.uploadFileHandler(t)})},r.uploadFileHandler=function(e){var t=new FormData,n=new XMLHttpRequest;console.log(r.props),t.append("nid",r.props.id),t.append("img",e),n.addEventListener("load",function(e){var t=e.target.response;console.log(t),r.setState(Object(i.a)({},r.state,t,{onprogress:!1}))}),n.upload.addEventListener("progress",function(e){var t=e.loaded/e.total*100+"%";console.log(t),r.setState(Object(i.a)({},r.state,{progress:t}))}),n.upload.addEventListener("abort",function(e){r.setState(Object(i.a)({},r.state,{onprogress:!1,progress:0}))}),n.responseType="json",n.open("post",m.a+"api/put_news_img/"),n.setRequestHeader("Authorization",sessionStorage.token),n.send(t),r.setState(Object(i.a)({},r.state,{progress:0,onprogress:!0,request:n}))},r.abortUploadHandler=function(e){e.preventDefault(),r.state.request.abort()},r.delete_handler=function(e){e.preventDefault(),r.axios.patch("api/news/".concat(r.state.id,"/"),{img:null}).then(function(e){console.log(e.data),r.setState(Object(i.a)({},r.state,e.data,{progress:0})),console.log(r.state)})},r}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state.onprogress?h.a.createElement("i",{className:"fa fa-times"}):h.a.createElement("i",{className:"fa fa-upload"}),t=h.a.createElement("button",{onClick:this.delete_handler,className:"btn btn-primary"},h.a.createElement("i",{className:"fa fa-times"})),r=h.a.createElement("button",{onClick:this.state.onprogress?this.abortUploadHandler:this.selectFilesHandler,className:"btn btn-primary"},e),n=this.state.img?t:r,a=h.a.createElement("div",{className:"progress mx-2  ".concat(this.state.onprogress?"":"hide-progress-news")},h.a.createElement("div",{className:"progress-bar progress-bar-striped",style:{width:this.state.progress}})),o=this.state.img?this.state.img.split("/").pop():"";return h.a.createElement("div",{className:"flex-grow-1 px-0"},h.a.createElement("div",{className:"new_sub_csv d-flex flex-wrap  justify-content-between align-items-center"},h.a.createElement("div",{className:""},h.a.createElement("span",{className:"d-none d-md-inline-block"},o||"No images attached to the news"),this.state.img&&h.a.createElement("span",{className:"badge text-white mx-2 badge-dark badge-pill"},h.a.createElement("a",{href:this.state.img,rel:"noopener noreferrer",target:"_blank"},"link"))),h.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},a,n)))}}]),t}(p.Component);r.d(t,"default",function(){return g});var g=function(e){function t(){var e,r;Object(s.a)(this,t);for(var n=arguments.length,c=new Array(n),f=0;f<n;f++)c[f]=arguments[f];return(r=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).axios=Object(m.b)(),r.state={error:!1},r.componentDidMount=function(){r.files=document.querySelector(".edit_news"),r.title=r.files.querySelector(".title"),r.link=r.files.querySelector(".link"),r.brief=r.files.querySelector(".brief"),r.newsId=r.props.match.params.id,r.axios.get("api/news/"+r.newsId+"/").then(function(e){e=e.data,console.log(e),r.title.value=e.title,r.link.value=e.link,r.brief.value=e.brief,r.setState(Object(i.a)({},r.state,e))})},r.saveNewsHandler=function(e,t){e.preventDefault(),r.axios.put("api/news/"+r.state.id+"/",{title:r.title.value,link:r.link.value,brief:r.brief.value,show:t||r.state.show}).then(function(e){console.log(e.data),r.props.history.push("/admin/news/")}).catch(function(e){r.setState(Object(i.a)({},r.state,{error:!0}))})},r.showNewsHandler=function(){var e=Object(o.a)(a.a.mark(function e(t){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,r.saveNewsHandler(t,!0);case 3:r.props.history.push("/admin/news/");case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r.deleteNewsHandler=function(e){e.preventDefault(),r.axios.patch("api/news/"+r.newsId+"/",{flag:!0}).then(function(e){console.log(e.data),r.props.history.push("/admin/news/")})},r}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=h.a.createElement("h1",{className:"text-center"},"Edit News");return h.a.createElement("div",{className:"edit_news"},h.a.createElement("form",{className:""},h.a.createElement("div",{className:"d-md-flex align-items-center justify-content-between"},e,h.a.createElement("div",{className:"buttons justify-content-center py-3 d-flex"},h.a.createElement("button",{className:"btn btn-outline-danger mr-3",onClick:this.deleteNewsHandler},"delete"),h.a.createElement("button",{className:"btn mr-3",onClick:this.saveNewsHandler},"save"),h.a.createElement("button",{className:"btn btn-success",onClick:this.showNewsHandler},"show"))),h.a.createElement("div",{className:"form-group mt-3"},h.a.createElement("label",{className:"font-weight-bold"},"Title:"),h.a.createElement("input",{type:"text",className:"title form-control w-100"})),h.a.createElement("div",{className:"form-group mt-3"},h.a.createElement("label",{className:"font-weight-bold"},"Img:"),h.a.createElement("div",{className:"form-control d-flex pr-0 align-items-center"},this.state.id&&h.a.createElement(d,Object.assign({},this.state,{newsId:this.state.id})))),h.a.createElement("div",{className:"form-group mt-3"},h.a.createElement("label",{className:"font-weight-bold"},"Link:"),this.state.error?h.a.createElement("div",{className:"text-danger mb-3"},"Please provide a proper link ex: https://www.google.com/"):"",h.a.createElement("input",{type:"text",className:"link form-control w-100"})),h.a.createElement("div",{className:"form-group mt-3"},h.a.createElement("label",{className:"font-weight-bold"},"Brief:"),h.a.createElement("textarea",{rows:"4",className:"brief form-control w-100"}))))}}]),t}(p.Component)},55:function(e,t,r){e.exports=r(56)},56:function(e,t,r){var n=function(){return this||"object"===typeof self&&self}()||Function("return this")(),a=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,o=a&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r(57),a)n.regeneratorRuntime=o;else try{delete n.regeneratorRuntime}catch(i){n.regeneratorRuntime=void 0}},57:function(e,t){!function(t){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",l="object"===typeof e,u=t.regeneratorRuntime;if(u)l&&(e.exports=u);else{(u=t.regeneratorRuntime=l?e.exports:{}).wrap=b;var f="suspendedStart",p="suspendedYield",h="executing",m="completed",d={},g={};g[i]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(F([])));y&&y!==n&&a.call(y,i)&&(g=y);var w=j.prototype=x.prototype=Object.create(g);N.prototype=w.constructor=j,j.constructor=N,j[c]=N.displayName="GeneratorFunction",u.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===N||"GeneratorFunction"===(t.displayName||t.name))},u.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,j):(e.__proto__=j,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(w),e},u.awrap=function(e){return{__await:e}},O(L.prototype),L.prototype[s]=function(){return this},u.AsyncIterator=L,u.async=function(e,t,r,n){var a=new L(b(e,t,r,n));return u.isGeneratorFunction(t)?a:a.next().then(function(e){return e.done?e.value:a.next()})},O(w),w[c]="Generator",w[i]=function(){return this},w.toString=function(){return"[object Generator]"},u.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},u.values=F,H.prototype={constructor:H,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(S),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,a){return s.type="throw",s.arg=e,t.next=n,a&&(t.method="next",t.arg=r),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=a.call(i,"catchLoc"),l=a.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),S(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;S(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:F(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),d}}}function b(e,t,r,n){var a=t&&t.prototype instanceof x?t:x,o=Object.create(a.prototype),i=new H(n||[]);return o._invoke=function(e,t,r){var n=f;return function(a,o){if(n===h)throw new Error("Generator is already running");if(n===m){if("throw"===a)throw o;return P()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var s=k(i,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=E(e,t,r);if("normal"===c.type){if(n=r.done?m:p,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=m,r.method="throw",r.arg=c.arg)}}}(e,r,i),o}function E(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(n){return{type:"throw",arg:n}}}function x(){}function N(){}function j(){}function O(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function L(e){var t;this._invoke=function(r,n){function o(){return new Promise(function(t,o){!function t(r,n,o,i){var s=E(e[r],e,n);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"===typeof l&&a.call(l,"__await")?Promise.resolve(l.__await).then(function(e){t("next",e,o,i)},function(e){t("throw",e,o,i)}):Promise.resolve(l).then(function(e){c.value=e,o(c)},function(e){return t("throw",e,o,i)})}i(s.arg)}(r,n,t,o)})}return t=t?t.then(o,o):o()}}function k(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,k(e,t),"throw"===t.method))return d;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=E(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,d;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,d):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function _(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function S(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function H(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(_,this),this.reset(!0)}function F(e){if(e){var t=e[i];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return o.next=o}}return{next:P}}function P(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},58:function(e,t,r){"use strict";function n(e,t,r,n,a,o,i){try{var s=e[o](i),c=s.value}catch(l){return void r(l)}s.done?t(c):Promise.resolve(c).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise(function(a,o){var i=e.apply(t,r);function s(e){n(i,a,o,s,c,"next",e)}function c(e){n(i,a,o,s,c,"throw",e)}s(void 0)})}}r.d(t,"a",function(){return a})}}]);
//# sourceMappingURL=10.f1f3b147.chunk.js.map