(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{268:function(e,t,n){e.exports=n(726)},475:function(e,t,n){},476:function(e,t,n){},726:function(e,t,n){"use strict";n.r(t);n(269);var a=n(1),o=n.n(a),r=n(91),i=n.n(r),s=(n(475),n(76)),c=n(77),l=n(79),u=n(78),v=n(80),d=(n(476),n(49)),p=n(265),h=n.n(p),f=n(267),m=n(2),g=n.n(m),b=n(264),C=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={displayColorPicker:!1,color:{r:"255",g:"255",b:"255",a:"1"}},n.handleClick=function(){var e=n.state.displayColorPicker;n.setState({displayColorPicker:!e})},n.handleClose=function(){var e=n.state.color;n.setState({displayColorPicker:!1},function(){return n.props.setCanvasColor(e)})},n.handleChange=function(e){n.setState({color:e.rgb})},n}return Object(v.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props);var e=this.props.colorFromStorage;this.setState({color:e})}},{key:"render",value:function(){var e=this.state,t=e.color,n=e.displayColorPicker,a=g()({default:{color:{width:"36px",height:"14px",borderRadius:"2px",background:"rgba(".concat(t.r,", ").concat(t.g,", ").concat(t.b,", ").concat(t.a,")")},swatch:{padding:"5px",background:"#fff",borderRadius:"1px",boxShadow:"0 0 0 1px rgba(0,0,0,.1)",display:"inline-block",cursor:"pointer"},popover:{position:"absolute",zIndex:"2",top:"45%",left:"10%"},cover:{position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}}});return o.a.createElement("div",null,o.a.createElement("div",{style:a.swatch,onClick:this.handleClick},o.a.createElement("div",{style:a.color})),n?o.a.createElement("div",{style:a.popover},o.a.createElement("div",{style:a.cover,onMouseDown:this.handleClose}),o.a.createElement(b.SketchPicker,{color:t,onChange:this.handleChange})):null)}}]),t}(a.Component),y=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={lines:new d.a.List,isDrawing:!1,canvasColor:JSON.parse(localStorage.getItem("canvasColor"))||{r:"255",g:"255",b:"255",a:"1"}},n.retrieveDataFromLocalStorage=function(){if("undefined"!==localStorage.getItem("lines")&&localStorage.getItem("lines")){for(var e=JSON.parse(localStorage.getItem("lines")),t=[],a=0;a<e.length;a++){for(var o=e[a],r=[],i=0;i<o.length;i++){var s=o[i],c=new d.a.Map({x:s.x,y:s.y});r.push(c)}var l=new d.a.List(r);t.push(l)}n.setState({lines:new d.a.List(t)})}},n.saveLinesToLocalStorage=function(){var e=n.state.lines;localStorage.setItem("lines",JSON.stringify(e))},n.handleMouseMove=function(e){if(n.state.isDrawing){var t=n.relativeCoordinatesForEvent(e);n.setState(function(e){return{lines:e.lines.updateIn([e.lines.size-1],function(e){return e.push(t)})}},function(){return n.saveLinesToLocalStorage()})}},n.handlePointerUp=function(){n.setState({isDrawing:!1})},n.handleMouseDown=function(e){if(0===e.button){var t=n.relativeCoordinatesForEvent(e);n.setState(function(e){return{lines:e.lines.push(new d.a.List([t])),isDrawing:!0}},function(){return n.saveLinesToLocalStorage()})}},n.relativeCoordinatesForEvent=function(e){var t=n.refs.canvas.getBoundingClientRect();return new d.a.Map({x:e.clientX-t.left,y:e.clientY-t.top})},n.eraseCanvas=function(){n.setState({lines:new d.a.List},function(){localStorage.removeItem("lines")})},n.setCanvasColor=function(e){n.setState({canvasColor:e},function(){return localStorage.setItem("canvasColor",JSON.stringify(e))})},n}return Object(v.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("touchend",function(t){t.preventDefault(),e.handlePointerUp()},!1),document.addEventListener("mouseup",this.handlePointerUp),this.retrieveDataFromLocalStorage()}},{key:"componentWillUnmount",value:function(){var e=this;document.removeEventListener("touchend",function(t){t.preventDefault(),e.handlePointerUp()},!1),document.removeEventListener("mouseup",this.handlePointerUp)}},{key:"render",value:function(){var e=this.state,t=e.lines,n=e.canvasColor,a=this.props.classes;return o.a.createElement("div",{className:"canvas",ref:"canvas",onPointerDown:this.handleMouseDown,onPointerMove:this.handleMouseMove,style:{backgroundColor:"rgba(".concat(n.r,", ").concat(n.g,", ").concat(n.b,", ").concat(n.a,")")}},o.a.createElement(S,{lines:t}),o.a.createElement("div",null,o.a.createElement(h.a,{variant:"outlined",className:a.button,onMouseDown:this.eraseCanvas,style:{display:"inline",float:"left"}},"Erase"),o.a.createElement("div",{className:"colorButton"},o.a.createElement("p",{className:"label"},"Canvas Color"),o.a.createElement(C,{setCanvasColor:this.setCanvasColor,colorFromStorage:n,className:"colorPicker"}))))}}]),t}(a.Component),w=Object(f.withStyles)(function(e){return{button:{margin:e.spacing.unit}}})(y),S=function(e){var t=e.lines;return o.a.createElement("svg",{className:"drawing"},t.map(function(e,t){return o.a.createElement(E,{key:t,line:e})}))},E=function(e){var t="M "+e.line.map(function(e){return"".concat(e.get("x")," ").concat(e.get("y"))}).join(" L ");return o.a.createElement("path",{className:"path",d:t})},k=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Picasso: A Whiteboard App"),o.a.createElement(w,null))}}]),t}(a.Component),O=function(){i.a.render(o.a.createElement(k,null),document.getElementById("root"))};window.cordova?document.addEventListener("deviceready",O,!1):O()}},[[268,1,2]]]);
//# sourceMappingURL=main.f5f1c5c2.chunk.js.map