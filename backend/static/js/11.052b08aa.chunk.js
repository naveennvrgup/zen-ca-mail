(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{423:function(e,t,a){"use strict";a.r(t);var n=a(7),s=a(2),c=a(6),r=a(4),i=a(3),o=a(5),l=a(0),d=a.n(l),m=a(9),f=function(e){function t(){return Object(s.a)(this,t),Object(r.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return d.a.createElement("div",{className:"row mt-2 px-0 brief justify-content-center"},d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-orange n-card-i"},d.a.createElement("i",{className:"fa fa-users fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Subscribers"),d.a.createElement("div",{className:"n-card-metric"},this.props.subscribers.total)))),d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 com n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-green n-card-i"},d.a.createElement("i",{className:"far fa-envelope fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Drafts"),d.a.createElement("div",{className:"n-card-metric"},this.props.drafts.total)))),d.a.createElement("div",{className:"col-md-3 mt-3 col-sm-6 n-card-wrapper"},d.a.createElement("div",{className:" n-card"},d.a.createElement("div",{className:"admin-red n-card-i"},d.a.createElement("i",{className:"far fa-newspaper fa-2x text-white"})),d.a.createElement("div",{className:"n-card-info"},d.a.createElement("div",{className:"n-card-title"},"Newsfeed"),d.a.createElement("div",{className:"n-card-metric"},this.props.news.total)))))}}]),t}(l.Component),u=a(261),b=function(e){function t(){var e,a;Object(s.a)(this,t);for(var c=arguments.length,o=new Array(c),l=0;l<c;l++)o[l]=arguments[l];return(a=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).axios=Object(m.b)(),a.state={data:[]},a.componentDidMount=function(){a.axios.get("api/get_delivery_reports/").then(function(e){e=e.data,console.table(e);var t={id:"sent",color:"green",data:[]},s={id:"complaints",color:"hsl(0, 100%, 50%)",data:[]},c={id:"rejects",data:[]},r={id:"bounces",data:[]};e.reverse().forEach(function(e,a){a=14-a;var n=new Date;n.setDate(n.getDate()-a);var i="".concat(n.getMonth()+1,"/").concat(n.toDateString().slice(8,10));console.log(i),t.data.push({x:i,y:e.sent}),s.data.push({x:i,y:e.complaints}),c.data.push({x:i,y:e.rejects}),r.data.push({x:i,y:e.bounces})}),e=[t,s,c,r],console.log(e),a.setState(Object(n.a)({},a.state,{data:e}))})},a.render=function(){return d.a.createElement("div",{className:"emails-sent-chart"},d.a.createElement(u.ResponsiveLine,{data:a.state.data,margin:{top:50,right:15,bottom:50,left:50},xScale:{type:"point"},yScale:{type:"linear",stacked:!1,min:"auto",max:"auto"},axisTop:null,axisRight:null,axisBottom:{orient:"bottom",tickSize:5,tickPadding:5,tickRotation:0,legend:"Day of the month",legendOffset:36,legendPosition:"middle"},axisLeft:{orient:"left",tickSize:5,tickPadding:5,tickRotation:0,legend:"No. of emails sent",legendOffset:-40,legendPosition:"middle"},curve:"linear",colors:"dark2",dotSize:10,dotColor:"inherit:darker(0.3)",dotBorderWidth:2,dotBorderColor:"#ffffff",enableDotLabel:!0,dotLabel:"y",dotLabelYOffset:-12,animate:!0,motionStiffness:90,motionDamping:15,legends:[{anchor:"top-right",direction:"column",justify:!1,translateX:0,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]}))},a}return Object(o.a)(t,e),t}(l.Component);a.d(t,"default",function(){return p});var p=function(e){function t(){var e,a;Object(s.a)(this,t);for(var c=arguments.length,o=new Array(c),l=0;l<c;l++)o[l]=arguments[l];return(a=Object(r.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).axios=Object(m.b)(),a.state={drafts:{},news:{},subscribers:{},metrics:[]},a.componentDidMount=function(){a.axios.get("api/get_draft_details/").then(function(e){console.log(e.data)}),a.axios.get("api/subscribers_brief/").then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,{subscribers:e.data}))}),a.axios.get("api/drafts_brief/").then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,{drafts:e.data}))}),a.axios.get("api/news_brief/").then(function(e){console.log(e.data),a.setState(Object(n.a)({},a.state,{news:e.data}))})},a}return Object(o.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return d.a.createElement("div",{className:"dashboard"},d.a.createElement("h1",{className:""},"Dashboard"),d.a.createElement(f,{subscribers:this.state.subscribers,drafts:this.state.drafts,news:this.state.news,cost:this.state.cost}),d.a.createElement(b,null))}}]),t}(l.Component)}}]);
//# sourceMappingURL=11.052b08aa.chunk.js.map