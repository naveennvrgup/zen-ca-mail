(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{544:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return u});var n=a(7),l=a(2),s=a(6),o=a(4),c=a(3),r=a(5),m=a(0),i=a.n(m),d=a(13),u=function(e){function t(){var e,a;Object(l.a)(this,t);for(var s=arguments.length,r=new Array(s),m=0;m<s;m++)r[m]=arguments[m];return(a=Object(o.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).axios=Object(d.b)(),a.state={groups:[],draft:{subject:"",body:"",files:[]}},a.componentDidMount=function(){a.draftId=a.props.match.params.id,a.send_mail=document.querySelector(".send-mail"),a.body=a.send_mail.querySelector(".body"),a.group=a.send_mail.querySelector("#group"),a.axios.get("api/group/").then(function(e){e=e.data,console.log(e),a.setState(Object(n.a)({},a.state,{groups:e}))}),a.axios.get("api/draft/".concat(a.draftId,"/")).then(function(e){e=e.data,console.log(e),a.body.innerHTML=e.body,a.setState(Object(n.a)({},a.state,{draft:e}))})},a}return Object(r.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=[i.a.createElement("option",{className:"form-control",key:0,value:0},"--choose--")];this.state.groups.forEach(function(t){return e.push(i.a.createElement("option",{className:"form-control",key:t.id,value:t.id},t.name," (",t.subs,")"))});var t=this.state.draft.files.map(function(e){return i.a.createElement("li",{key:e.id},i.a.createElement("a",{href:e.file},e.file.split("/").pop()))});return i.a.createElement("div",{className:"send-mail p-1 p-md-5"},i.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},i.a.createElement("h1",{className:""},"Send Mail"),i.a.createElement("div",null,i.a.createElement("button",{onClick:this.props.history.goBack,className:"btn mx-2"},i.a.createElement("i",{className:"fa fa-arrow-left"})," back"))),i.a.createElement("div",{className:"info mt-4"},i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{className:"font-weight-bold"},"Sent to: "),i.a.createElement("span",null," ",this.state.draft.sentTo)),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{className:"font-weight-bold"},"Sent to group: "),i.a.createElement("span",null," ",this.state.draft.group)),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{className:"font-weight-bold"},"Subject:"),i.a.createElement("span",{className:"subject"}," ",this.state.draft.subject)),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{className:"font-weight-bold"},"Body:"),i.a.createElement("div",{className:"body"})),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{className:"font-weight-bold"},"Attachments:"),i.a.createElement("ol",{className:"attachments"},t.length?t:"no attachments"))))}}]),t}(m.Component)}}]);
//# sourceMappingURL=5.9d1e9f26.chunk.js.map