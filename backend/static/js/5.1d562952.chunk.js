(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{399:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return u});var n=a(7),s=a(2),l=a(6),o=a(4),r=a(3),c=a(5),i=a(0),m=a.n(i),d=a(13),u=function(e){function t(){var e,a;Object(s.a)(this,t);for(var l=arguments.length,c=new Array(l),i=0;i<l;i++)c[i]=arguments[i];return(a=Object(o.a)(this,(e=Object(r.a)(t)).call.apply(e,[this].concat(c)))).axios=Object(d.b)(),a.state={groups:[],draft:{subject:"",body:"",files:[]}},a.componentDidMount=function(){a.draftId=a.props.match.params.id,a.send_mail=document.querySelector(".send-mail"),a.body=a.send_mail.querySelector(".body"),a.group=a.send_mail.querySelector("#group"),a.axios.get("api/group/").then(function(e){e=e.data,console.log(e),a.setState(Object(n.a)({},a.state,{groups:e}))}),a.axios.get("api/draft/".concat(a.draftId,"/")).then(function(e){e=e.data,console.log(e),a.body.innerHTML=e.body,a.setState({draft:e})})},a._forward_mail_handler=function(e){e.preventDefault(),a.axios.post("api/draft/",{subject:a.state.draft.subject,body:a.state.draft.body}).then(function(e){console.log(e.data),a.props.history.push("/admin/email/edit_email/".concat(e.data.id,"/"))})},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=[m.a.createElement("option",{className:"form-control",key:0,value:0},"--choose--")];this.state.groups.forEach(function(t){return e.push(m.a.createElement("option",{className:"form-control",key:t.id,value:t.id},t.name," (",t.subs,")"))});var t=this.state.draft.files.map(function(e){return m.a.createElement("li",{key:e.id},m.a.createElement("a",{href:e.file},e.file.split("/").pop()))});return m.a.createElement("div",{className:"send-mail p-1 p-md-5"},m.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},m.a.createElement("h1",{className:""},"Sent Mail"),m.a.createElement("div",null,m.a.createElement("button",{onClick:this.props.history.goBack,className:"btn mx-2"},m.a.createElement("i",{className:"fa fa-arrow-left"})," back"),m.a.createElement("button",{onClick:this._forward_mail_handler,className:"btn btn-success mx-2"},"Forward ",m.a.createElement("i",{className:"fas fa-arrow-right"})))),m.a.createElement("div",{className:"info mt-4"},m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Sent to: "),m.a.createElement("span",null," ",this.state.draft.sentTo)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Sent to group: "),m.a.createElement("span",null," ",this.state.draft.group)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Subject:"),m.a.createElement("span",{className:"subject"}," ",this.state.draft.subject)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Body:"),m.a.createElement("div",{className:"body"})),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Attachments:"),m.a.createElement("ol",{className:"attachments"},t.length?t:"no attachments"))))}}]),t}(i.Component)}}]);
//# sourceMappingURL=5.1d562952.chunk.js.map