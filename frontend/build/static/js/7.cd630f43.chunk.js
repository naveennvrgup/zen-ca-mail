(window.webpackJsonp=window.webpackJsonp||[]).push([[7,8],{145:function(e,t,a){"use strict";a.r(t),a.d(t,"set_loading",function(){return c}),a.d(t,"update_state",function(){return o}),a.d(t,"get_subs",function(){return i});var n=a(7),s=a(10),r=a(36),l=a(56),c=function(e){return function(t){return t({type:r.a,payload:{loading:e}})}},o=function(e){return function(t){return t({type:r.a,payload:e})}},i=function(e,t,a){return function(c){var o=l.store.getState().subscribers,i=o.page_no,u=o.selected_group_id,p=o.selected_group_name,m=o.search_keyword;e&&(u=e),t&&(i=t),a&&(m=a),Object(s.b)().get("api/all_subs/?".concat(m?"search="+m:"","&group_id=").concat(u,"&page=").concat(i)).then(function(t){console.log(t.data);var a=t.data.groups;return a=Object.keys(a).map(function(e){return Object(n.a)({name:e},a[e])}),e&&(p=a.find(function(t){return t.id===e}).name),u||(u=a.find(function(e){return"Subscribers"===e.name}).id),console.log({selected_group_name:p,selected_group_id:u}),c({type:r.a,payload:Object(n.a)({},t.data,{selected_group_id:u,selected_group_name:p,loading:!1})})})}}},266:function(e,t,a){"use strict";a.r(t);var n=a(14),s=a(7),r=a(2),l=a(6),c=a(4),o=a(3),i=a(5),u=a(0),p=a.n(u),m=a(10),b=a(35),d=a(145),_=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(c.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(l)))).state={progress:0,onprogress:!1},a.selectFilesHandler=function(e){e.preventDefault();var t=document.createElement("input");t.type="file",t.accept=".csv",t.click(),t.addEventListener("change",function(e){var t=e.target.files[0];a.uploadFileHandler(t)})},a.uploadFileHandler=function(e){var t=new FormData,n=new XMLHttpRequest;console.log(a.props),t.append("group_id",a.props.selected_group_id),t.append("file",e),n.addEventListener("load",function(e){var t=e.target.response;console.log(t),a.props.set_loading(!0),a.props.get_subs(),a.setState(Object(s.a)({},a.state,{onprogress:!1}))}),n.upload.addEventListener("progress",function(e){var t=e.loaded/e.total*100;console.log(t),a.setState(Object(s.a)({},a.state,{progress:t}))}),n.responseType="json",n.open("post",m.a+"api/sub_as_csv/"),n.setRequestHeader("Authorization",sessionStorage.token),n.send(t),a.setState(Object(s.a)({},a.state,{onprogress:!0})),console.log("upload started",a.state)},a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.onprogress?String(this.state.progress.toFixed(0)):p.a.createElement("i",{className:"fa fa-upload"});return p.a.createElement("div",{className:""},p.a.createElement("div",{className:"new_sub_csv d-flex justify-content-between align-items-center"},p.a.createElement("div",{className:"text-left"},"Upload a .csv with fields email, name, mobile"),p.a.createElement("button",{disabled:!!this.state.onprogress,onClick:this.selectFilesHandler,className:"btn nbtn green"},e)))}}]),t}(u.Component),g=Object(b.b)(function(e){return e.subscribers},d)(_),f=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(s)))).state={upload_subs:0},a.componentDidMount=function(){a.new_sub=document.querySelector(".new_sub"),a.new_sub_name=a.new_sub.querySelector(".new_sub_name"),a.new_sub_email=a.new_sub.querySelector(".new_sub_email"),a.new_sub_mobile=a.new_sub.querySelector(".new_sub_mobile")},a.add_sub_to_group_handler=function(e){e.preventDefault(),a.props.set_loading(!0),Object(m.b)().post("api/add_sub_to_group/",{groupId:a.props.selected_group_id,name:a.new_sub_name.value,email:a.new_sub_email.value,mobile:a.new_sub_mobile.value}).then(function(e){a.new_sub_name.value="",a.new_sub_email.value="",a.new_sub_mobile.value="",a.props.get_subs()})},a.delete_group_handler=function(e){if(e.preventDefault(),"Subscribers"!==a.props.selected_group_name){var t=a.props.selected_group_id;a.props.update_state({selected_group_id:null,selected_group_name:"Subscribers",loading:!0}),Object(m.b)().delete("api/group/".concat(t,"/")).then(function(e){console.log(e.data),a.props.get_subs()})}},a.download_group_csv_handler=function(){var e=document.createElement("a");e.href=m.a+"api/download_group_as_csv/".concat(a.props.selected_group_id,"/"),e.click()},a._search=function(e){e.preventDefault(),a.props.update_state({loading:!0,state:"search",search_keyword:a.search_box.value}),a.props.get_subs(null,null,a.search_box.value)},a._clear_search=function(e){e.preventDefault(),a.props.update_state({loading:!0,state:"normal",search_keyword:null}),a.props.get_subs(),a.search_box.value=""},a.find_duplicates=function(e){e.preventDefault(),a.props.set_loading(!0),Object(m.b)().get("api/find_duplicates/".concat(a.props.selected_group_id,"/")).then(function(e){alert(e.data.msg),a.props.set_loading(!1)})},a.delete_duplicates=function(e){e.preventDefault(),a.props.set_loading(!0),Object(m.b)().get("api/delete_duplicates/".concat(a.props.selected_group_id,"/")).then(function(e){alert(e.data.msg),a.props.get_subs()})},a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=p.a.createElement("button",{onClick:this._search,className:"btn btn-primary btn-sm"},"Search ",p.a.createElement("i",{className:"fa fa-search"})),a=p.a.createElement("button",{onClick:this._clear_search,className:"btn btn-danger btn-sm"},"Clear Search ",p.a.createElement("i",{className:"fa fa-times"})),n=p.a.createElement("form",{autoComplete:"false",className:"d-flex new_sub align-items-center px-1 py-2",key:1},p.a.createElement("div",{className:"flex-grow-1 d-flex align-items-center flex-wrap justify-content-between"},p.a.createElement("input",{type:"email",className:"new_sub_email tab_input tab_input_sm mt-2",placeholder:"Email"}),p.a.createElement("input",{type:"text",className:"new_sub_name tab_input tab_input_sm mt-2",placeholder:"Name"}),p.a.createElement("input",{type:"mobile",className:"new_sub_mobile tab_input tab_input_sm mt-2",placeholder:"Mobile number"})),p.a.createElement("div",{className:"create-sub create"},p.a.createElement("button",{onClick:this.add_sub_to_group_handler,className:"btn nbtn green"},p.a.createElement("i",{className:"fa fa-plus"}))));return p.a.createElement("div",{className:"toolbar tab p-3"},p.a.createElement("div",null,p.a.createElement("div",{className:"font-weight-bold"},"New subscriber:"),n),p.a.createElement("div",null,p.a.createElement("div",{className:"font-weight-bold mt-2"},"Upload subscribers as CSV:"),p.a.createElement(g,null)),p.a.createElement("div",null,p.a.createElement("div",{className:"font-weight-bold mt-2"},"Download subscribers as CSV:"),p.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},p.a.createElement("div",null,"Click here to download .csv of the subscribers of this group"),p.a.createElement("button",{onClick:this.download_group_csv_handler,className:"btn nbtn blue"},p.a.createElement("i",{className:"fa fa-download"})))),p.a.createElement("div",null,p.a.createElement("div",{className:"font-weight-bold mt-2"},"Delete current group:"),p.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},p.a.createElement("div",null,"This will only delete the group not the subscribers"),p.a.createElement("button",{disabled:"Subscribers"===this.props.selected_group_name,onClick:this.delete_group_handler,className:"btn nbtn red"},p.a.createElement("i",{className:"fa fa-trash"})))),p.a.createElement("form",null,p.a.createElement("div",{className:"font-weight-bold mt-2"},"Search for subscribers:"),p.a.createElement("div",{className:"d-flex new_sub align-items-center px-1 py-2"},p.a.createElement("div",null,p.a.createElement("input",{ref:function(t){return e.search_box=t},type:"mobile",className:"new_sub_mobile tab_input tab_input_sm lg_input mt-2",placeholder:"Search by email, name, phone no"})),p.a.createElement("div",{className:"create-sub create mx-2"},"search"===this.props.state?a:t),p.a.createElement("button",{onClick:this.find_duplicates,className:"btn btn-success btn-sm mx-2"},"Find ",p.a.createElement("i",{className:"fa fa-clone"})),p.a.createElement("button",{onClick:this.delete_duplicates,className:"btn btn-danger btn-sm mx-2"},"Delete ",p.a.createElement("i",{className:"fa fa-clone"})))))}}]),t}(u.Component),h=Object(b.b)(function(e){return e.subscribers},d)(f),v=a(54),E=function(e){function t(){var e,a;Object(r.a)(this,t);for(var l=arguments.length,i=new Array(l),u=0;u<l;u++)i[u]=arguments[u];return(a=Object(c.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(i)))).axios=Object(m.b)(),a.state={edit:{}},a._unblock_subscriber=function(e,t){e.preventDefault(),a.props.set_loading(!0),Object(m.b)().put("api/all_subs/".concat(t.id,"/"),{status:"available",flag:!1,email:t.email,name:t.name,mobile:t.mobile,group:t.group}).then(function(e){a.setState({edit:Object(s.a)({},a.state.edit,Object(n.a)({},t.id,null))}),a.props.get_subs()})},a._delete_subscriber=function(e,t){e.preventDefault(),a.props.set_loading(!0),Object(m.b)().delete("api/all_subs/".concat(t.id,"/")).then(function(e){console.log("flagged"),1===a.props.subscribers.length&&a.props.page_no>1?a.props.get_subs(null,a.props.page_no-1):a.props.get_subs(null,a.props.page_no)})},a._edit_subscriber=function(e,t){e.preventDefault(),a.setState({edit:Object(s.a)({},a.state.edit,Object(n.a)({},t.id,t))})},a._edit_sub_change=function(e,t,n){e.preventDefault();var s=a.state.edit;s[n][t]=e.target.value,a.setState({edit:s})},a}return Object(i.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t=this.props.subscribers.map(function(t,a){return e.state.edit[t.id]?function(t,a){return p.a.createElement("div",{className:"d-flex  tab align-items-center ",key:a+1},p.a.createElement("div",{className:"sub_sno px-2 font-weight-bold"},a+1),p.a.createElement("div",{className:"sub_phone px-2"},p.a.createElement("i",{className:"fa fa-circle ".concat("available"===t.status?"text-success":"text-danger")})),p.a.createElement("div",{className:"sub_email px-2"},p.a.createElement("input",{type:"email",placeholder:"Email",onChange:function(a){return e._edit_sub_change(a,"email",t.id)},value:t.email})),p.a.createElement("div",{className:"sub_name px-2"},p.a.createElement("input",{type:"text",placeholder:"Name",onChange:function(a){return e._edit_sub_change(a,"name",t.id)},value:t.name})),p.a.createElement("div",{className:"sub_phone px-2 flex-grow-1"},p.a.createElement("input",{type:"text",placeholder:"Phone no.",onChange:function(a){return e._edit_sub_change(a,"mobile",t.id)},value:t.mobile})),p.a.createElement("button",{onClick:function(a){return e._unblock_subscriber(a,t)},className:"btn mx-1 nbtn green"},p.a.createElement("i",{className:"fa fa-check"})))}(e.state.edit[t.id],a):function(t,a){return p.a.createElement("div",{className:"d-flex  tab align-items-center ",key:a+1},p.a.createElement("div",{className:"sub_sno px-2 font-weight-bold"},a+1),p.a.createElement("div",{className:"sub_phone px-2"},p.a.createElement("i",{className:"fa fa-circle ".concat("available"===t.status?"text-success":"text-danger")})),p.a.createElement("div",{className:"sub_email px-2"},t.email),p.a.createElement("div",{className:"sub_name px-2"},t.name),p.a.createElement("div",{className:"sub_phone px-2 flex-grow-1"},t.mobile),"available"!==t.status?p.a.createElement("button",{onClick:function(a){return e._unblock_subscriber(a,t)},className:"btn mx-1 nbtn green"},p.a.createElement("i",{className:"fa fa-check"})):null,p.a.createElement("button",{onClick:function(a){return e._edit_subscriber(a,t)},className:"btn mx-1 nbtn blue"},p.a.createElement("i",{className:"fa fa-pen"})),p.a.createElement("button",{onClick:function(a){return e._delete_subscriber(a,t)},className:"btn mx-1 nbtn red"},p.a.createElement("i",{className:"fa fa-trash"})))}(t,a)}),a=p.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},p.a.createElement("div",{className:"font-weight-bold p-3"},"Subscribers: ",this.props.subscribers.length),p.a.createElement("div",{className:"sub-pagination pagination"},p.a.createElement("span",{className:"mx-1"},"Page ",this.props.page_no),p.a.createElement("button",{disabled:!this.props.previous,onClick:function(t){e.props.set_loading(!0),e.props.get_subs(null,e.props.page_no-1)},className:"btn nbtn blue mx-1"},p.a.createElement("i",{className:"fa fa-angle-left"})),p.a.createElement("button",{disabled:!this.props.next,onClick:function(t){e.props.set_loading(!0),e.props.get_subs(null,e.props.page_no+1)},className:"btn nbtn blue mx-1"},p.a.createElement("i",{className:"fa fa-angle-right"}))));return p.a.createElement("div",null,p.a.createElement("div",{className:""},p.a.createElement(h,null),this.props.loading?v.a:p.a.createElement(u.Fragment,null,a,t,this.props.subscribers.length>10?a:null)))}}]),t}(u.Component);t.default=Object(b.b)(function(e){return e.subscribers},d)(E)},435:function(e,t,a){"use strict";a.r(t);var n=a(7),s=a(2),r=a(6),l=a(4),c=a(3),o=a(5),i=a(0),u=a.n(i),p=a(266),m=a(54),b=a(10),d=a(35),_=a(145),g=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(r)))).state={new_group_name:""},a.componentDidMount=function(){a.props.get_subs()},a.new_group=function(e){e.preventDefault(),a.state.new_group_name&&(a.props.set_loading(!0),Object(b.b)().post("api/group/",{name:a.state.new_group_name}).then(function(e){console.log(e.data),a.setState({new_group_name:""})}).catch(function(e){return console.error(e)}).finally(function(e){return a.props.get_subs()}))},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=Object.keys(this.props.groups).map(function(t){return Object(n.a)({name:t},e.props.groups[t])}).map(function(t,a){return u.a.createElement("div",{className:"d-flex tab align-items-center \n                ".concat(t.id===e.props.selected_group_id?"active-tab":"","\n                    "),key:a+2},u.a.createElement("div",{className:"group-name px-2 flex-grow-1",onClick:function(a){e.props.set_loading(!0),e.props.get_subs(t.id,1)}},t.name),u.a.createElement("div",{className:"ml-2 badge badge-pill badge-secondary "},"normal"===e.props.state?t.total_subs:t.result))}),a=u.a.createElement("form",{className:"d-flex tab align-items-center new-group",key:1},u.a.createElement("div",{className:"flex-grow-1 pl-2"},u.a.createElement("input",{onChange:function(t){return e.setState({new_group_name:t.target.value})},value:this.state.new_group_name,type:"text",className:"new_group_name tab_input",placeholder:"create group"})),u.a.createElement("div",{className:"create-group create px-1"},u.a.createElement("button",{onClick:function(t){return e.new_group(t)},className:"btn nbtn green"},u.a.createElement("i",{className:"fa fa-plus"})))),s=u.a.createElement(p.default,null);return u.a.createElement("div",{className:"subscribers "},u.a.createElement("div",{className:"subs row"},u.a.createElement("div",{className:"col-md-9 order-md-1 order-2"},s),u.a.createElement("div",{className:"col-md-3 order-md-2 order-1 groups-container"},u.a.createElement("div",{className:"groups-list"},u.a.createElement("div",{className:"text-muted p-3 font-weight-bold"},"Total groups: ",this.props.groups.length),a,this.props.loading?m.a:t))))}}]),t}(i.Component);t.default=Object(d.b)(function(e){return e.subscribers},_)(g)}}]);
//# sourceMappingURL=7.cd630f43.chunk.js.map