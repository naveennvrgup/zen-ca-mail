(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{413:function(e,a,t){"use strict";t.r(a),t.d(a,"default",function(){return u});var n=t(7),l=t(2),o=t(6),r=t(4),s=t(3),c=t(5),i=t(0),m=t.n(i),d=t(13),u=function(e){function a(){var e,t;Object(l.a)(this,a);for(var o=arguments.length,c=new Array(o),i=0;i<o;i++)c[i]=arguments[i];return(t=Object(r.a)(this,(e=Object(s.a)(a)).call.apply(e,[this].concat(c)))).axios=Object(d.b)(),t.state={groups:[],draft:{subject:"",body:"",files:[]}},t.componentDidMount=function(){t.draftId=t.props.match.params.id,t.send_mail=document.querySelector(".send-mail"),t.body=t.send_mail.querySelector(".body"),t.group=t.send_mail.querySelector("#group"),t.axios.get("api/group/").then(function(e){e=e.data,console.log(e),t.setState(Object(n.a)({},t.state,{groups:e}))}),t.axios.get("api/draft/".concat(t.draftId,"/")).then(function(e){e=e.data,console.log(e),t.body.innerHTML=e.body,t.setState({draft:e})})},t._forward_mail_handler=function(e){e.preventDefault(),t.axios.post("api/forward_mail/".concat(t.draftId,"/"),{}).then(function(e){console.log(e.data),t.props.history.push("/admin/email/edit_email/".concat(e.data.id,"/"))})},t}return Object(c.a)(a,e),Object(o.a)(a,[{key:"render",value:function(){var e=[m.a.createElement("option",{className:"form-control",key:0,value:0},"--choose--")];this.state.groups.forEach(function(a){return e.push(m.a.createElement("option",{className:"form-control",key:a.id,value:a.id},a.name," (",a.subs,")"))});var a=this.state.draft.files.map(function(e){return m.a.createElement("li",{key:e.id},m.a.createElement("a",{href:e.file},e.file.split("/").pop()))});return m.a.createElement("div",{className:"send-mail p-1 p-md-5"},m.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},m.a.createElement("h1",{className:""},"Sent Mail"),m.a.createElement("div",null,m.a.createElement("button",{onClick:this.props.history.goBack,className:"btn mx-2"},m.a.createElement("i",{className:"fa fa-arrow-left"})," back"),m.a.createElement("button",{onClick:this._forward_mail_handler,className:"btn btn-success mx-2"},"Forward ",m.a.createElement("i",{className:"fas fa-arrow-right"})))),m.a.createElement("div",{className:"info mt-4"},m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Sent to: "),m.a.createElement("span",null," ",this.state.draft.sentTo)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Sent to group: "),m.a.createElement("span",null," ",this.state.draft.group)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Subject:"),m.a.createElement("span",{className:"subject"}," ",this.state.draft.subject)),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Body:"),m.a.createElement("div",{className:"body"})),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",{className:"font-weight-bold"},"Attachments:"),m.a.createElement("ol",{className:"attachments"},a.length?a:"no attachments"))))}}]),a}(i.Component)}}]);
//# sourceMappingURL=5.32cbce75.chunk.js.map