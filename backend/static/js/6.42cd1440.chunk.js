(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{522:function(e,a,t){"use strict";t.r(a),t.d(a,"default",function(){return u});var n=t(7),s=t(2),l=t(6),o=t(4),r=t(3),c=t(5),i=t(0),m=t.n(i),d=t(13),u=function(e){function a(){var e,t;Object(s.a)(this,a);for(var l=arguments.length,c=new Array(l),i=0;i<l;i++)c[i]=arguments[i];return(t=Object(o.a)(this,(e=Object(r.a)(a)).call.apply(e,[this].concat(c)))).axios=Object(d.b)(),t.state={groups:[],draft:{subject:"",body:"",files:[]}},t.componentDidMount=function(){t.draftId=t.props.match.params.id,t.send_mail=document.querySelector(".send-mail"),t.body=t.send_mail.querySelector(".body"),t.group=t.send_mail.querySelector("#group"),t.axios.get("api/group/").then(function(e){e=e.data,console.log(e),t.setState(Object(n.a)({},t.state,{groups:e}))}),t.axios.get("api/draft/".concat(t.draftId,"/")).then(function(e){e=e.data,console.log(e),t.body.innerHTML=e.body,t.setState(Object(n.a)({},t.state,{draft:e}))})},t.send_mail_handler=function(e){e.preventDefault(),"0"!==t.group.value&&t.axios.post("api/send_bulk_mail/",{group:t.group.value,draft:t.draftId}).then(function(e){console.log(e.data),t.props.history.push("/admin/email/")})},t}return Object(c.a)(a,e),Object(l.a)(a,[{key:"render",value:function(){var e=[m.a.createElement("option",{className:"form-control",key:0,value:0},"--choose--")];this.state.groups.forEach(function(a){return e.push(m.a.createElement("option",{className:"form-control",key:a.id,value:a.id},a.name," (",a.subs,")"))});var a=this.state.draft.files.map(function(e){return m.a.createElement("li",{key:e.id},m.a.createElement("a",{href:e.file},e.file.split("/").pop()))});return m.a.createElement("div",{className:"send-mail"},m.a.createElement("div",{className:"d-md-flex justify-content-between align-items-center"},m.a.createElement("h1",{className:"text-center"},"Send Mail"),m.a.createElement("div",{className:"text-center"},m.a.createElement("button",{onClick:this.props.history.goBack,className:"btn mx-2"},m.a.createElement("i",{className:"fa fa-arrow-left"})," back"),m.a.createElement("button",{disabled:!this.state.draft.id,onClick:this.send_mail_handler,className:"btn btn-success mx-2 "},"Send ",m.a.createElement("i",{className:"fa fa-plane"})))),m.a.createElement("div",{className:"info mt-4"},m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Subscriber group:"),m.a.createElement("select",{name:"group",className:"form-control d-inline-block w-auto mx-3",defaultValue:0,id:"group"},e)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Subject:"),m.a.createElement("span",{className:"subject mx-3"},this.state.draft.subject)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Body:"),m.a.createElement("div",{className:"body"})),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Attachments:"),m.a.createElement("ol",{className:"attachments"},a))))}}]),a}(i.Component)}}]);
//# sourceMappingURL=6.42cd1440.chunk.js.map