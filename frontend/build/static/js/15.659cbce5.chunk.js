(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{35:function(e,t,a){"use strict";a.d(t,"a",function(){return r});var n=a(45),s=a.n(n),r="http://192.168.1.3:8000/";r="/",t.b=function(){return s.a.create({baseURL:r,headers:{authorization:sessionStorage.token}})}},505:function(e,t,a){"use strict";a.r(t);var n=a(37),s=a(5),r=a(9),c=a(7),i=a(6),o=a(8),l=a(0),d=a.n(l),m=a(35),f=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return d.a.createElement("div",{className:"row mt-2 px-0 brief"},d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-orange n-card-i"},d.a.createElement("i",{className:"fa fa-users fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Subscribers"),d.a.createElement("div",{className:"n-card-metric"},this.props.subscribers.total)))),d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 com n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-green n-card-i"},d.a.createElement("i",{className:"far fa-envelope fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Drafts"),d.a.createElement("div",{className:"n-card-metric"},this.props.drafts.total)))),d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-red n-card-i"},d.a.createElement("i",{className:"far fa-newspaper fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Newsfeed"),d.a.createElement("div",{className:"n-card-metric"},this.props.news.total)))),d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-sky-blue n-card-i"},d.a.createElement("i",{className:"fa fa-server fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Server"),d.a.createElement("div",{className:"n-card-metric"},this.props.subscribers.total)))))}}]),t}(l.Component),u=a(350),b=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).axios=Object(m.b)(),a.state={data:[]},a.componentDidMount=function(){a.axios.get("api/get_delivery_reports/").then(function(e){e=e.data,console.table(e);var t={id:"sent",color:"hsl(115, 100%, 50%)",data:[]},s={id:"complaints",color:"hsl(0, 100%, 50%)",data:[]},r={id:"rejects",data:[]},c={id:"bounces",data:[]};e.reverse().forEach(function(e,a){a=14-a;var n=new Date;n.setDate(n.getDate()-a);var i="".concat(n.getMonth()+1,"/").concat(n.toDateString().slice(8,10));console.log(i),t.data.push({x:i,y:e.sent}),s.data.push({x:i,y:e.complaints}),r.data.push({x:i,y:e.rejects}),c.data.push({x:i,y:e.bounces})}),e=[t,s,r,c],console.log(e),a.setState(Object(n.a)({},a.state,{data:e}))})},a.render=function(){return d.a.createElement("div",{className:"emails-sent-chart"},d.a.createElement(u.ResponsiveLine,{data:a.state.data,margin:{top:50,right:15,bottom:50,left:50},xScale:{type:"point"},yScale:{type:"linear",stacked:!1,min:"auto",max:"auto"},axisTop:null,axisRight:null,axisBottom:{orient:"bottom",tickSize:5,tickPadding:5,tickRotation:0,legend:"Day of the month",legendOffset:36,legendPosition:"middle"},axisLeft:{orient:"left",tickSize:5,tickPadding:5,tickRotation:0,legend:"No. of emails sent",legendOffset:-40,legendPosition:"middle"},curve:"linear",dotSize:10,dotColor:"inherit:darker(0.3)",dotBorderWidth:2,dotBorderColor:"#ffffff",enableDotLabel:!0,dotLabel:"y",dotLabelYOffset:-12,animate:!0,motionStiffness:90,motionDamping:15,legends:[{anchor:"top-right",direction:"column",justify:!1,translateX:0,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]}))},a}return Object(o.a)(t,e),t}(l.Component);a.d(t,"default",function(){return p});var p=function(e){function t(){var e,a;Object(s.a)(this,t);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(a=Object(c.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).axios=Object(m.b)(),a.state={drafts:{},news:{},subscribers:{},metrics:[]},a.componentDidMount=function(){a.axios.get("api/get_draft_details/").then(function(e){console.log(e.data)}),a.axios.get("api/subscribers_brief/").then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,{subscribers:e.data}))}),a.axios.get("api/drafts_brief/").then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,{drafts:e.data}))}),a.axios.get("api/news_brief/").then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,{news:e.data}))})},a}return Object(o.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return d.a.createElement("div",{className:"dashboard"},d.a.createElement("h1",{className:""},"Dashboard"),d.a.createElement(f,{subscribers:this.state.subscribers,drafts:this.state.drafts,news:this.state.news}),d.a.createElement(b,null))}}]),t}(l.Component)}}]);
//# sourceMappingURL=15.659cbce5.chunk.js.map