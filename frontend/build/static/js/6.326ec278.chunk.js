(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{146:function(e,t,a){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}a.d(t,"a",function(){return n})},414:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return d});var n=a(146),r=a(2),s=a(6),l=a(4),o=a(3),c=a(5),i=a(0),u=a.n(i),m=a(13),d=function(e){function t(){var e,a;Object(r.a)(this,t);for(var s=arguments.length,c=new Array(s),i=0;i<s;i++)c[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).axios=Object(m.b)(),a.state={groups:[],selected_groups:[],draft:{subject:"",body:"",files:[]}},a.componentDidMount=function(){a.draftId=a.props.match.params.id,a.send_mail=document.querySelector(".send-mail"),a.body=a.send_mail.querySelector(".body"),a.group=a.send_mail.querySelector("#group"),a.axios.get("api/group/").then(function(e){e=e.data,console.log(e),a.setState({groups:e})}),a.axios.get("api/draft/".concat(a.draftId,"/")).then(function(e){e=e.data,console.log(e),a.body.innerHTML=e.body,a.setState({draft:e})})},a.send_mail_handler=function(e){e.preventDefault(),0!==a.state.selected_groups.length&&a.axios.post("api/send_bulk_mail/",{groups:a.state.selected_groups.map(function(e){return e.id}),draft:a.draftId}).then(function(e){console.log(e.data),a.props.history.push("/admin/email/")})},a._on_group_select=function(e){e.preventDefault();var t=Number(e.target.value);if("0"!==t){var r=a.state.groups.filter(function(e){return e.id!==Number(t)}),s=a.state.groups.filter(function(e){return e.id===Number(t)})[0];a.setState({groups:r,selected_groups:[].concat(Object(n.a)(a.state.selected_groups),[s])})}},a._on_selectall_group=function(e){e.preventDefault(),a.setState({groups:[],selected_groups:a.state.groups})},a._on_group_deselect=function(e,t){e.preventDefault();var r=a.state.selected_groups.filter(function(e){return e.id===t})[0],s=a.state.selected_groups.filter(function(e){return e.id!==t});a.setState({groups:[].concat(Object(n.a)(a.state.groups),[r]),selected_groups:s})},a}return Object(c.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this,t=[u.a.createElement("option",{className:"form-control",key:0,value:0},"--choose--")];this.state.groups.forEach(function(e){return t.push(u.a.createElement("option",{className:"form-control",key:e.id,value:e.id},e.name," (",e.subs,")"))});var a=this.state.selected_groups.map(function(t){return u.a.createElement("div",{className:"mx-1 my-1 selected-group",key:t.id},u.a.createElement("span",{className:"group-name"},t.name," (",t.subs,")"),u.a.createElement("button",{className:"d-inline-block",onClick:function(a){return e._on_group_deselect(a,t.id)}},u.a.createElement("i",{className:"fa fa-times"})))}),n=this.state.selected_groups.length,r=this.state.selected_groups.reduce(function(e,t){return e+t.subs},0),s=this.state.draft.files.map(function(e){return u.a.createElement("li",{key:e.id},u.a.createElement("a",{href:e.file},e.file.split("/").pop()))});return u.a.createElement("div",{className:"send-mail"},u.a.createElement("div",{className:"d-md-flex justify-content-between align-items-center"},u.a.createElement("h1",{className:"text-center"},"Send Mail"),u.a.createElement("div",{className:"text-center"},u.a.createElement("button",{onClick:this.props.history.goBack,className:"btn mx-2"},u.a.createElement("i",{className:"fa fa-arrow-left"})," back"),u.a.createElement("button",{disabled:!this.state.draft.id,onClick:this.send_mail_handler,className:"btn btn-success mx-2 "},"Send ",u.a.createElement("i",{className:"fa fa-plane"})))),u.a.createElement("div",{className:"info mt-4"},u.a.createElement("div",{className:"form-group"},u.a.createElement("label",{className:"font-weight-bold"},"Select groups:"),u.a.createElement("select",{name:"group",className:"form-control d-inline-block w-auto mx-3",defaultValue:0,onChange:this._on_group_select,id:"group"},t),u.a.createElement("button",{onClick:this._on_selectall_group,className:"btn"},"Select all")),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",null,"Selected groups: "),a),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",null,"Total Selected groups: ")," ",n),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",null,"Total Selected emails: ")," ",r),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",{className:"font-weight-bold"},"Subject:"),u.a.createElement("span",{className:"subject mx-3"},this.state.draft.subject)),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",{className:"font-weight-bold"},"Body:"),u.a.createElement("div",{className:"body"})),u.a.createElement("div",{className:"form-group"},u.a.createElement("label",{className:"font-weight-bold"},"Attachments:"),u.a.createElement("ol",{className:"attachments"},s))))}}]),t}(i.Component)}}]);
//# sourceMappingURL=6.326ec278.chunk.js.map