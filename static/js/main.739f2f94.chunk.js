(this["webpackJsonpbig-giant-wall"]=this["webpackJsonpbig-giant-wall"]||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(20)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),s=n(8),c=n.n(s),i=(n(14),n(1)),r=n(2),l=n(5),u=n(3),m=n(4),d=(n(15),n(16),function(e){function t(e){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).call(this,e))}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props.location;return o.a.createElement("header",{className:"header-base"},o.a.createElement("div",{className:"locator"},"@".concat(e.x,", ").concat(e.y)),o.a.createElement("div",{className:"user-control"},o.a.createElement("div",{className:"user-face"}),o.a.createElement("div",{className:"user-menu"},o.a.createElement("div",{className:"menu-item"},"User Name"),o.a.createElement("div",{className:"menu-item"},"Item 1"),o.a.createElement("div",{className:"menu-item"},"Item 2"),o.a.createElement("div",{className:"menu-item"},"Item 3"),o.a.createElement("div",{className:"menu-item"},"Item 4"))))}}]),t}(o.a.Component)),p=(n(17),"0123456789abcdefghijklmnopqrstuvwxyz".split("")),h=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).inputCapture=function(e){n.setState({textValue:e.target.value})},n.state={textValue:""},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.contentZone,a=t.contentCoords,s=this.props.location,c=s.zone,i=s.coords,r=function(e){return("-"===c[e].charAt(0)?-1:1)*(p.indexOf(n[e].charAt(n[e].length-1))-p.indexOf(c[e].charAt(c[e].length-1)))};switch(this.props.content.phase){case"new":return o.a.createElement("div",{className:"scrawl-item",style:{top:a.y+i.y+1e3*r("y"),left:a.x+i.x+1e3*r("x")}},o.a.createElement("input",{type:"text",className:"scrawl-text-new",onChange:this.inputCapture}),o.a.createElement("input",{type:"submit",className:"scrawl-submit-btn",value:"OK",onClick:function(){return e.props.saveScrawl(e.props.content.id,e.state.textValue)}}));case"set":return o.a.createElement("div",{className:"scrawl-item",style:{top:a.y+i.y+1e3*r("y"),left:a.x+i.x+1e3*r("x")}},this.props.content.value)}}}]),t}(o.a.Component),v=(n(18),"0123456789abcdefghijklmnopqrstuvwxyz".split("")),f=function(e,t){var n=e.split(""),a="";if("-"===n[0]&&(n.shift(),a="-",t=-t),1===t)for(var o=n.length-1;o>=-1;o--){if(o<0){n.unshift("1");break}if("z"!==n[o]){n[o]=v[v.indexOf(n[o])+1];break}n[o]="0"}else if(-1===t)for(var s=n.length-1;s>=-1;s--){if(s<0){n.shift();break}if("0"!==n[s]){n[s]=v[v.indexOf(n[s])-1],1===n.length&&"0"===n[s]&&(a="");break}if(1===n.length){a="-",n[0]="1";break}n[s]="z"}return a+n.join("")},y=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).modeAction=function(e){switch(n.props.mode){case"draw":n.makeScrawl(e);break;case"explore":n.pullWall(e)}},n.makeScrawl=function(e){if("draw"===n.props.mode){console.log("making new scrawl");var t={id:n.props.content.length+1,type:"text",phase:"new",value:"",coords:{x:e.clientX,y:e.clientY},zone:{x:n.props.location.zone.x,y:n.props.location.zone.y}};console.log(t),n.props.addScrawl(t),n.props.setMode("explore")}},n.pullWall=function(e){var t=n.props,a=t.location,o=t.transit;1===e.buttons&&"explore"===n.props.mode&&(a.coords.x+=e.movementX,a.coords.y+=e.movementY,a.coords.x>1e3?(a.coords.x-=1e3,a.zone.x=f(a.zone.x,-1)):a.coords.x<0&&(a.coords.x+=1e3,a.zone.x=f(a.zone.x,1)),a.coords.y>1e3?(a.coords.y-=1e3,a.zone.y=f(a.zone.y,-1)):a.coords.y<0&&(a.coords.y+=1e3,a.zone.y=f(a.zone.y,1)),o(a.zone,a.coords))},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.content,a=t.location;return o.a.createElement("div",{className:"wall-frame",onMouseMove:this.pullWall.bind(this),onClick:this.makeScrawl.bind(this)},n.map((function(t,s){switch(n[s].type){case"text":return o.a.createElement(h,{key:n[s].id,content:n[s],contentZone:n[s].zone,contentCoords:n[s].coords,location:a,saveScrawl:e.props.saveScrawl})}})))}}]),t}(o.a.Component),b=n(6),x=(n(19),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).action=function(e){n.props.setMode(e),n.setState({visible:"hidden"})},n.vanish=function(){n.setState({visible:"hidden"})},n.state={visible:"hidden",top:0,left:0},window.oncontextmenu=function(e){return this.setState({visible:"visible",top:e.clientY-20,left:e.clientX-75}),!1}.bind(Object(b.a)(n)),n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"mode-menu-elem",style:{visibility:this.state.visible}},o.a.createElement("div",{className:"mode-menu",style:{top:this.state.top,left:this.state.left}},o.a.createElement("input",{type:"button",value:"Draw",className:"mode-menu-item",onClick:function(){return e.action("draw")}}),o.a.createElement("input",{type:"button",value:"Explore",className:"mode-menu-item",onClick:function(){return e.action("explore")}})),o.a.createElement("div",{className:"mode-menu-backdrop",onClick:function(){return e.vanish()}}))}}]),t}(o.a.Component)),w=[{id:1,type:"text",phase:"set",value:"Joshua",coords:{x:25,y:180},zone:{x:"0",y:"0"}},{id:2,type:"text",phase:"set",value:"Aaron",coords:{x:750,y:521},zone:{x:"1",y:"1"}},{id:3,type:"text",phase:"set",value:"Guinness",coords:{x:805,y:16},zone:{x:"0",y:"-1"}},{id:4,type:"text",phase:"set",value:"Cristen",coords:{x:57,y:921},zone:{x:"1",y:"0"}}],O=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).addScrawl=function(e){w.push(e),n.setState({content:w}),console.log(n.state.content)},n.saveScrawl=function(e,t){var a=!0,o=!1,s=void 0;try{for(var c,i=w[Symbol.iterator]();!(a=(c=i.next()).done);a=!0){var r=c.value;if(r.id===e){r.phase="set",r.value=t;break}}}catch(l){o=!0,s=l}finally{try{a||null==i.return||i.return()}finally{if(o)throw s}}console.log("content",w),n.setState({content:w}),console.log("state content",n.state.content)},n.setMode=function(e){console.log(e),n.setState({mode:e})},n.state={content:w,location:{zone:{x:"0",y:"0"},coords:{x:0,y:0}},mode:"explore"},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"transit",value:function(e,t){var n={zone:e,coords:t};this.setState({location:n})}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(d,{location:this.state.location.zone}),o.a.createElement(x,{setMode:this.setMode}),o.a.createElement(y,{content:this.state.content,location:this.state.location,mode:this.state.mode,setMode:this.setMode,addScrawl:this.addScrawl,saveScrawl:this.saveScrawl,transit:this.transit.bind(this)}))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.739f2f94.chunk.js.map