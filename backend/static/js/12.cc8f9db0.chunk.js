(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{436:function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return b});var n=a(7),s=a(2),c=a(6),l=a(4),i=a(3),r=a(5),o=a(0),u=a.n(o),m=a(10),b=function(e){function t(){var e,a;Object(s.a)(this,t);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(r)))).axios=Object(m.b)(),a.state={results:[],page:1,selected_category:-1},a.componentDidMount=function(){a.get_records()},a.get_records=function(){var e="api/complaint_mails/?page=".concat(a.state.page);a.axios.get(e).then(function(e){e=e.data,console.log(e),a.setState(Object(n.a)({},a.state,e))})},a.change_page=function(e,t){var s;e.preventDefault();var c=a.state.page;if(t)s=a.state.next,c+=1;else{if(t)return;s=a.state.previous,c-=1}a.axios.get(s).then(function(e){console.log(e),a.setState(Object(n.a)({},a.state,e.data,{page:c}))})},a._unblock_subscriber=function(e,t){e.preventDefault(),a.axios.put("api/all_subs/".concat(t.id,"/"),{status:"available",flag:!1,email:t.email,group:t.group}).then(function(e){a.get_records()})},a._edit_subscriber=function(e,t){e.preventDefault();var n=a.state.results,s=n.findIndex(function(e){return e.id===t});n[s].onedit=!0,a.setState({results:n}),console.log(n)},a._edit_sub_change=function(e,t,n){e.preventDefault();var s=a.state.results,c=s.findIndex(function(e){return e.id===n});s[c][t]=e.target.value,a.setState({results:s})},a._delete_subscriber=function(e,t){e.preventDefault(),a.axios.delete("api/all_subs/".concat(t.id,"/")).then(function(e){console.log("flagged"),1===a.state.results.length&&a.state.page>1&&a.setState(Object(n.a)({},a.state,{page:a.state.page-1})),a.get_records()})},a}return Object(r.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state.results.map(function(t,a){return!0===t.onedit?function(t,a){return u.a.createElement("div",{className:"d-flex  tab align-items-center ",key:a+1},u.a.createElement("div",{className:"sub_sno px-2 font-weight-bold"},a+1),u.a.createElement("div",{className:"sub_phone px-2"},u.a.createElement("i",{className:"fa fa-circle ".concat("available"===t.status?"text-success":"text-danger")})),u.a.createElement("div",{className:"sub_email px-2"},u.a.createElement("input",{type:"email",placeholder:"Email",onChange:function(a){return e._edit_sub_change(a,"email",t.id)},value:t.email})),u.a.createElement("div",{className:"sub_name px-2"},u.a.createElement("input",{type:"text",placeholder:"Name",onChange:function(a){return e._edit_sub_change(a,"name",t.id)},value:t.name})),u.a.createElement("div",{className:"sub_phone px-2 flex-grow-1"},u.a.createElement("input",{type:"text",placeholder:"Phone no.",onChange:function(a){return e._edit_sub_change(a,"mobile",t.id)},value:t.mobile})),u.a.createElement("button",{onClick:function(a){return e._unblock_subscriber(a,t)},className:"btn mx-1 nbtn green"},u.a.createElement("i",{className:"fa fa-check"})))}(t,a):function(t,a){return u.a.createElement("div",{className:"d-flex  tab align-items-center ",key:a+1},u.a.createElement("div",{className:"sub_sno px-2 font-weight-bold"},a+1),u.a.createElement("div",{className:"sub_phone px-2"},u.a.createElement("i",{className:"fa fa-circle ".concat("available"===t.status?"text-success":"text-danger")})),u.a.createElement("div",{className:"sub_email px-2"},t.email),u.a.createElement("div",{className:"sub_name px-2"},t.name),u.a.createElement("div",{className:"sub_phone px-2 flex-grow-1"},t.mobile),"available"!==t.status?u.a.createElement("button",{onClick:function(a){return e._unblock_subscriber(a,t)},className:"btn mx-1 nbtn green"},u.a.createElement("i",{className:"fa fa-check"})):null,u.a.createElement("button",{onClick:function(a){return e._edit_subscriber(a,t.id)},className:"btn mx-1 nbtn blue"},u.a.createElement("i",{className:"fa fa-pen"})),u.a.createElement("button",{onClick:function(a){return e._delete_subscriber(a,t)},className:"btn mx-1 nbtn red"},u.a.createElement("i",{className:"fa fa-trash"})))}(t,a)}),a=["Total","Displayed","Archieved"][this.state.selected_category+1],n=u.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},u.a.createElement("div",{className:"font-weight-bold p-3"},a,": ",this.state.count),u.a.createElement("div",{className:"sub-pagination pagination"},u.a.createElement("span",{className:"mx-1"},"Page ",this.state.page),u.a.createElement("button",{disabled:!this.state.previous,onClick:function(t){return e.change_page(t,0)},className:"btn nbtn blue mx-1"},u.a.createElement("i",{className:"fa fa-angle-left"})),u.a.createElement("button",{disabled:!this.state.next,onClick:function(t){return e.change_page(t,1)},className:"btn nbtn blue mx-1"},u.a.createElement("i",{className:"fa fa-angle-right"}))));return u.a.createElement("div",{className:"newss"},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-9 order-2 order-md-1"},n,t,this.state.results.length>10?n:"")))}}]),t}(o.Component)}}]);
//# sourceMappingURL=12.cc8f9db0.chunk.js.map