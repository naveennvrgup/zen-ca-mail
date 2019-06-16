(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{293:function(e,t,a){"use strict";a.r(t);var n=a(7),s=a(2),l=a(6),r=a(4),o=a(3),c=a(5),i=a(0),u=a.n(i),p=a(13),m=function(e){function t(){var e,a;Object(s.a)(this,t);for(var l=arguments.length,c=new Array(l),i=0;i<l;i++)c[i]=arguments[i];return(a=Object(r.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(c)))).state={progress:0,onprogress:!1},a.selectFilesHandler=function(e){e.preventDefault();var t=document.createElement("input");t.type="file",t.accept=".csv",t.click(),t.addEventListener("change",function(e){var t=e.target.files[0];a.uploadFileHandler(t)})},a.uploadFileHandler=function(e){var t=new FormData,s=new XMLHttpRequest;console.log(a.props),t.append("group_id",a.props.selected_group_id),t.append("file",e),s.addEventListener("load",function(e){var t=e.target.response;console.log(t),a.props.get_subs(),a.props.update_groups(),a.setState(Object(n.a)({},a.state,{onprogress:!1}))}),s.upload.addEventListener("progress",function(e){var t=e.loaded/e.total*100;console.log(t),a.setState(Object(n.a)({},a.state,{progress:t}))}),s.responseType="json",s.open("post",p.a+"api/sub_as_csv/"),s.setRequestHeader("Authorization",sessionStorage.token),s.send(t),a.setState(Object(n.a)({},a.state,{onprogress:!0})),console.log("upload started",a.state)},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.onprogress?String(this.state.progress.toFixed(0)):u.a.createElement("i",{className:"fa fa-upload"});return u.a.createElement("div",{className:""},u.a.createElement("div",{className:"new_sub_csv d-flex justify-content-between align-items-center"},u.a.createElement("div",{className:"text-left"},"Upload a .csv with fields email, name, mobile"),u.a.createElement("button",{disabled:!!this.state.onprogress,onClick:this.selectFilesHandler,className:"btn nbtn green"},e)))}}]),t}(i.Component),d=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return(a=Object(r.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(l)))).axios=Object(p.b)(),a.state={},a.componentDidMount=function(){a.new_sub=document.querySelector(".new_sub"),a.new_sub_name=a.new_sub.querySelector(".new_sub_name"),a.new_sub_email=a.new_sub.querySelector(".new_sub_email"),a.new_sub_mobile=a.new_sub.querySelector(".new_sub_mobile"),console.log(a.props)},a.add_sub_to_group_handler=function(e){e.preventDefault(),a.axios.post("api/add_sub_to_group/",{groupId:a.props.selected_group_id,name:a.new_sub_name.value,email:a.new_sub_email.value,mobile:a.new_sub_mobile.value}).then(function(e){a.new_sub_name.value="",a.new_sub_email.value="",a.new_sub_mobile.value="",a.props.get_subs(),a.props.update_groups()})},a.delete_group_handler=function(e){if(e.preventDefault(),"Subscribers"!==a.props.selected_group_name){var t=a.props.selected_group_id;a.props.set_groups_state({selected_group_id:null,selected_group_name:"Subscribers"}),a.axios.delete("api/group/".concat(t,"/")).then(function(e){console.log(e.data),a.props.update_groups()})}},a.download_group_csv_handler=function(){var e=document.createElement("a");e.href=p.a+"api/download_group_as_csv/".concat(a.props.selected_group_id,"/"),e.click()},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=u.a.createElement("form",{autoComplete:"false",className:"d-flex new_sub align-items-center px-1 py-2",key:1},u.a.createElement("div",{className:"flex-grow-1 d-flex align-items-center flex-wrap justify-content-between"},u.a.createElement("input",{type:"email",className:"new_sub_email tab_input tab_input_sm mt-2",placeholder:"Email"}),u.a.createElement("input",{type:"text",className:"new_sub_name tab_input tab_input_sm mt-2",placeholder:"Name"}),u.a.createElement("input",{type:"mobile",className:"new_sub_mobile tab_input tab_input_sm mt-2",placeholder:"Mobile number"})),u.a.createElement("div",{className:"create-sub create"},u.a.createElement("button",{onClick:this.add_sub_to_group_handler,className:"btn nbtn green"},u.a.createElement("i",{className:"fa fa-plus"}))));return u.a.createElement("div",{className:"toolbar tab p-3"},u.a.createElement("div",null,u.a.createElement("div",{className:"font-weight-bold"},"New subscriber:"),e),u.a.createElement("div",null,u.a.createElement("div",{className:"font-weight-bold mt-2"},"Upload subscribers as CSV:"),u.a.createElement(m,this.props)),u.a.createElement("div",null,u.a.createElement("div",{className:"font-weight-bold mt-2"},"Download subscribers as CSV:"),u.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},u.a.createElement("div",null,"Click here to download .csv of the subscribers of this group"),u.a.createElement("button",{onClick:this.download_group_csv_handler,className:"btn nbtn blue"},u.a.createElement("i",{className:"fa fa-download"})))),u.a.createElement("div",null,u.a.createElement("div",{className:"font-weight-bold mt-2"},"Delete current group:"),u.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},u.a.createElement("div",null,"This will only delete the group not the subscribers"),u.a.createElement("button",{disabled:"Subscribers"===this.props.selected_group_name,onClick:this.delete_group_handler,className:"btn nbtn red"},u.a.createElement("i",{className:"fa fa-trash"})))))}}]),t}(i.Component);a.d(t,"default",function(){return b});var b=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).axios=Object(p.b)(),a.componentDidMount=function(){a.get_subs()},a.get_subs=function(){a.axios.get("api/group/".concat(a.props.selected_group_id,"/")).then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,e.data,{page:1,group_id:a.props.selected_group_id}))})},a.flag_sub_handler=function(e,t){e.preventDefault(),a.axios.delete("api/subscribe/".concat(t.id,"/")).then(function(e){console.log("flagged"),1===a.state.results.length&&a.state.page>1&&a.setState(Object(n.a)({},a.state,{page:a.state.page-1})),a.get_subs(),a.props.update_groups()})},a.change_page=function(e,t){var s;e.preventDefault();var l=a.state.page;if(t)s=a.state.next,l+=1;else{if(t)return;s=a.state.previous,l-=1}a.axios.get(s).then(function(e){console.log(e),a.setState(Object(n.a)({},a.state,e.data,{page:l}))})},a.state={next:null,previous:null,results:[],page:1,upload_subs:0},a}return Object(c.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;this.state.group_id!==this.props.selected_group_id&&this.get_subs();var t=this.state.results.map(function(t,a){return u.a.createElement("div",{className:"d-flex  tab align-items-center ",key:a+1},u.a.createElement("div",{className:"sub_sno px-2 font-weight-bold"},a+1),u.a.createElement("div",{className:"sub_phone px-2"},u.a.createElement("i",{className:"fa fa-circle ".concat(t.verified?"text-success":"text-danger")})),u.a.createElement("div",{className:"sub_email px-2"},t.email),u.a.createElement("div",{className:"sub_name px-2"},t.name),u.a.createElement("div",{className:"sub_phone px-2 flex-grow-1"},t.mobile),u.a.createElement("button",{onClick:function(a){return e.flag_sub_handler(a,t)},className:"btn nbtn red"},u.a.createElement("i",{className:"fa fa-times"})))}),a=u.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},u.a.createElement("div",{className:"font-weight-bold p-3"},"Subscribers: ",this.state.count),u.a.createElement("div",{className:"sub-pagination pagination"},u.a.createElement("span",{className:"mx-1"},"Page ",this.state.page),u.a.createElement("button",{disabled:!this.state.previous,onClick:function(t){return e.change_page(t,0)},className:"btn nbtn blue mx-1"},u.a.createElement("i",{className:"fa fa-angle-left"})),u.a.createElement("button",{disabled:!this.state.next,onClick:function(t){return e.change_page(t,1)},className:"btn nbtn blue mx-1"},u.a.createElement("i",{className:"fa fa-angle-right"}))));return u.a.createElement("div",null,u.a.createElement("div",{className:""},u.a.createElement(d,Object.assign({},this.props,{get_subs:this.get_subs})),a,t,this.state.results.length>10?a:null))}}]),t}(i.Component)}}]);
//# sourceMappingURL=8.106c554b.chunk.js.map