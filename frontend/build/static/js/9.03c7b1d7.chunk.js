(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{36:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var n=a(48),s=a.n(n),r="http://192.168.1.3:8000/";r="/",t.b=function(){return s.a.create({baseURL:r,headers:{authorization:sessionStorage.token}})}},507:function(e,t,a){"use strict";a.r(t);var n=a(56),s=a.n(n),r=a(59),l=a(38),i=a(5),c=a(9),o=a(7),d=a(6),u=a(8),f=a(0),m=a.n(f),p=(a(254),a(147)),b=a(36),h=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(o.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(s)))).axios=Object(b.b)(),a.state={files:[]},a.componentDidMount=function(){var e=a.props.initialFiles;console.log(e),e=e.map(function(e){return{id:e.id,url:e.file,progess:"100%",name:e.file.split("/").pop(),saved:!0}}),a.setState(Object(l.a)({},a.state,{files:e}))},a.selectFilesHandler=function(e){e.preventDefault();var t=document.createElement("input");t.type="file",t.multiple=!0,t.click(),t.addEventListener("change",function(e){for(var n=Object(p.a)(a.state.files),s=function(e){var a=t.files[e],s=!0;n.forEach(function(e){e.name===a.name&&(s=!1)}),s&&n.push({file:a,name:a.name,progress:0})},r=0;r<t.files.length;r++)s(r);a.setState(Object(l.a)({},a.state,{files:n}))})},a.uploadFileHandler=function(e,t){e.preventDefault();var n=new FormData,s=new XMLHttpRequest;n.append("file",t.file),n.append("draft",a.props.draftId),s.addEventListener("load",function(e){var n=e.target.response;console.log(n),a.setState({files:a.state.files.map(function(e){return e.name===t.name?Object(l.a)({},e,{saved:!0,progress:"100%",url:n.file,id:n.id}):e})})}),console.log(a.state.files),s.upload.addEventListener("progress",function(e){var n=e.loaded/e.total*100+"%";a.setState({files:a.state.files.map(function(e){return e.name===t.name?Object(l.a)({},e,{progress:n}):e})})}),s.upload.addEventListener("abort",function(e){var n=a.state.files.filter(function(e){return e.name!==t.file.name});a.setState(Object(l.a)({},a.state,{files:n}))}),s.responseType="json",s.open("post",b.a+"api/attachment/"),s.setRequestHeader("Authorization",sessionStorage.token),s.send(n),a.setState({files:a.state.files.map(function(e){return e.name===t.name?Object(l.a)({},e,{request:s}):e})})},a.deleteFileHandler=function(e,t){e.preventDefault(),t.saved?a.axios.delete("api/attachment/".concat(t.id,"/")).then(function(e){e=e.data;var n=a.state.files.filter(function(e){return e.id!==t.id});a.setState({files:n})}):t.request.abort()},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=m.a.createElement("div",{className:"alert alert-warning"},"No attachments yet");return this.state.files.length>0&&(t=[],this.state.files.forEach(function(a,n){var s=m.a.createElement("button",{className:"btn green nbtn mx-2",onClick:function(t){return e.uploadFileHandler(t,a)}},m.a.createElement("i",{className:"fa fa-upload"})),r="inprogess";a.progess||(r="waiting"),a.saved&&(r=m.a.createElement("a",{href:a.url,target:"_blank",rel:"noopener noreferrer"},"link")),(a.progress||a.id)&&(s=m.a.createElement("button",{className:"btn red nbtn mx-2",onClick:function(t){return e.deleteFileHandler(t,a)}},m.a.createElement("i",{className:"fa fa-times"}))),t.push(m.a.createElement("div",{className:"d-flex tab file align-items-center justify-content-between",key:a.name},m.a.createElement("div",{className:"d-flex align-items-center justify-content-between"},m.a.createElement("div",{className:"name mx-2"},a.name),m.a.createElement("div",{className:"link mx-2 badge badge-pill badge-dark"},r)),m.a.createElement("div",{className:"d-flex align-items-center justify-content-between"},m.a.createElement("div",{className:"progress mx-2 ".concat(a.saved?"hide-progress":"")},m.a.createElement("div",{className:"progress-bar progress-bar-striped m-0",style:{width:a.progress}})),s)))})),m.a.createElement("div",{className:"fileUpload"},m.a.createElement("div",{className:"d-flex align-items-center mt-3"},m.a.createElement("div",null,m.a.createElement("label",{className:"font-weight-bold mx-3 my-4"},"Attachments:")),m.a.createElement("div",null,m.a.createElement("button",{className:"btn blue nbtn",onClick:this.selectFilesHandler},m.a.createElement("i",{className:"fa fa-plus"})))),m.a.createElement("div",{className:"files"},t))}}]),t}(f.Component),v=a(97),g=a(345),E=a(346),j=a.n(E),N=a(347),S=a.n(N);a.d(t,"default",function(){return y});var y=function(e){function t(e){var a;Object(i.a)(this,t),(a=Object(o.a)(this,Object(d.a)(t).call(this,e))).axios=Object(b.b)(),a.componentDidMount=function(){a.subject=document.querySelector("#subject"),a.files=document.querySelector(".files"),a.draftId=a.props.match.params.id,localStorage.setItem("currDraft",a.draftId),a.axios.get("api/draft/"+a.draftId+"/").then(function(e){e=e.data,a.html2Draft(e.body),a.subject.value=e.subject,console.log(e),a.setState(Object(l.a)({},a.state,e))})},a.onEditorStateChange=function(e){a.setState({editorState:e})},a.draft2Html=function(){var e=a.state.editorState;return j()(Object(v.convertToRaw)(e.getCurrentContent()))},a.html2Draft=function(e){var t=S()(e);if(t){var n=v.ContentState.createFromBlockArray(t.contentBlocks),s=v.EditorState.createWithContent(n);a.setState({editorState:s})}},a.saveDraftHandler=function(e,t){e.preventDefault(),a.axios.put("api/draft/"+a.draftId+"/",{subject:a.subject.value,body:a.draft2Html()}).then(function(e){t||a.props.history.push("/admin/email/")})},a.sendMailHandler=function(){var e=Object(r.a)(s.a.mark(function e(t){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,a.saveDraftHandler(t,!0);case 3:a.props.history.push("/admin/email/send_email/".concat(a.draftId,"/"));case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a.deleteDraftHandler=function(e){e.preventDefault(),a.axios.delete("api/draft/"+a.draftId+"/").then(function(e){console.log(e.data),a.props.history.push("/admin/email/")})};var n=S()("<p>loading please wait...</p>");if(n){var c=v.ContentState.createFromBlockArray(n.contentBlocks),u=v.EditorState.createWithContent(c);a.state={editorState:u,files:!1}}return a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=m.a.createElement("h1",null,"Edit Mail");return m.a.createElement("div",{className:"newMail"},m.a.createElement("form",{className:"ml-3"},m.a.createElement("div",{className:"d-flex align-items-center justify-content-between"},e,m.a.createElement("div",{className:"buttons py-3 ".concat(this.state.status?"d-none":"d-flex")},m.a.createElement("button",{className:"btn btn-outline-danger mr-3",onClick:this.deleteDraftHandler},"delete"),m.a.createElement("button",{className:"btn mr-3",onClick:this.saveDraftHandler},"save"),m.a.createElement("button",{className:"btn btn-success",onClick:this.sendMailHandler},"send"))),m.a.createElement("div",{className:"form-group mt-3"},m.a.createElement("label",{htmlFor:"subject",className:"font-weight-bold"},"Subject:"),m.a.createElement("input",{status:this.state.status,type:"text",id:"subject",className:"form-control w-100"})),m.a.createElement("label",{className:"font-weight-bold mt-2"},"Body:"),m.a.createElement("div",{className:"body"},m.a.createElement(g.Editor,{className:"bg-white",status:this.state.status,editorState:this.state.editorState,onEditorStateChange:this.onEditorStateChange})),this.state.files?m.a.createElement(h,{draftId:this.draftId,initialFiles:this.state.files}):""))}}]),t}(f.Component)}}]);
//# sourceMappingURL=9.03c7b1d7.chunk.js.map