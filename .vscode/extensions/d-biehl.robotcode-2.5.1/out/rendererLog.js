var O,_,ae,we,E,re,se,le,ie,K,z,J,de,I={},$=[],ke=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,W=Array.isArray;function C(t,e){for(var r in e)t[r]=e[r];return t}function V(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Ce(t,e,r){var s,a,o,l={};for(o in e)o=="key"?s=e[o]:o=="ref"?a=e[o]:l[o]=e[o];if(arguments.length>2&&(l.children=arguments.length>3?O.call(arguments,2):r),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)l[o]===void 0&&(l[o]=t.defaultProps[o]);return M(t,l,s,a,null)}function M(t,e,r,s,a){var o={type:t,props:e,key:r,ref:s,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:a??++ae,__i:-1,__u:0};return a==null&&_.vnode!=null&&_.vnode(o),o}function F(){return{current:null}}function x(t){return t.children}function k(t,e){this.props=t,this.context=e}function D(t,e){if(e==null)return t.__?D(t.__,t.__i+1):null;for(var r;e<t.__k.length;e++)if((r=t.__k[e])!=null&&r.__e!=null)return r.__e;return typeof t.type=="function"?D(t):null}function Re(t){if(t.__P&&t.__d){var e=t.__v,r=e.__e,s=[],a=[],o=C({},e);o.__v=e.__v+1,_.vnode&&_.vnode(o),q(t.__P,o,e,t.__n,t.__P.namespaceURI,32&e.__u?[r]:null,s,r??D(e),!!(32&e.__u),a),o.__v=e.__v,o.__.__k[o.__i]=o,ue(s,o,a),e.__e=e.__=null,o.__e!=r&&pe(o)}}function pe(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),pe(t)}function N(t){(!t.__d&&(t.__d=!0)&&E.push(t)&&!j.__r++||re!=_.debounceRendering)&&((re=_.debounceRendering)||se)(j)}function j(){try{for(var t,e=1;E.length;)E.length>e&&E.sort(le),t=E.shift(),e=E.length,Re(t)}finally{E.length=j.__r=0}}function ce(t,e,r,s,a,o,l,d,h,i,u){var n,m,c,b,y,v,g,f=s&&s.__k||$,R=e.length;for(h=Ee(r,e,f,h,R),n=0;n<R;n++)(c=r.__k[n])!=null&&(m=c.__i!=-1&&f[c.__i]||I,c.__i=n,v=q(t,c,m,a,o,l,d,h,i,u),b=c.__e,c.ref&&m.ref!=c.ref&&(m.ref&&G(m.ref,null,c),u.push(c.ref,c.__c||b,c)),y==null&&b!=null&&(y=b),(g=!!(4&c.__u))||m.__k===c.__k?h=he(c,h,t,g):typeof c.type=="function"&&v!==void 0?h=v:b&&(h=b.nextSibling),c.__u&=-7);return r.__e=y,h}function Ee(t,e,r,s,a){var o,l,d,h,i,u=r.length,n=u,m=0;for(t.__k=new Array(a),o=0;o<a;o++)(l=e[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[o]=M(null,l,null,null,null):W(l)?l=t.__k[o]=M(x,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=t.__k[o]=M(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[o]=l,h=o+m,l.__=t,l.__b=t.__b+1,d=null,(i=l.__i=Se(l,r,h,n))!=-1&&(n--,(d=r[i])&&(d.__u|=2)),d==null||d.__v==null?(i==-1&&(a>u?m--:a<u&&m++),typeof l.type!="function"&&(l.__u|=4)):i!=h&&(i==h-1?m--:i==h+1?m++:(i>h?m--:m++,l.__u|=4))):t.__k[o]=null;if(n)for(o=0;o<u;o++)(d=r[o])!=null&&(2&d.__u)==0&&(d.__e==s&&(s=D(d)),fe(d,d));return s}function he(t,e,r,s){var a,o;if(typeof t.type=="function"){for(a=t.__k,o=0;a&&o<a.length;o++)a[o]&&(a[o].__=t,e=he(a[o],e,r,s));return e}t.__e!=e&&(s&&(e&&t.type&&!e.parentNode&&(e=D(t)),r.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Se(t,e,r,s){var a,o,l,d=t.key,h=t.type,i=e[r],u=i!=null&&(2&i.__u)==0;if(i===null&&d==null||u&&d==i.key&&h==i.type)return r;if(s>(u?1:0)){for(a=r-1,o=r+1;a>=0||o<e.length;)if((i=e[l=a>=0?a--:o++])!=null&&(2&i.__u)==0&&d==i.key&&h==i.type)return l}return-1}function oe(t,e,r){e[0]=="-"?t.setProperty(e,r??""):t[e]=r==null?"":typeof r!="number"||ke.test(e)?r:r+"px"}function A(t,e,r,s,a){var o,l;e:if(e=="style")if(typeof r=="string")t.style.cssText=r;else{if(typeof s=="string"&&(t.style.cssText=s=""),s)for(e in s)r&&e in r||oe(t.style,e,"");if(r)for(e in r)s&&r[e]==s[e]||oe(t.style,e,r[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(ie,"$1")),l=e.toLowerCase(),e=l in t||e=="onFocusOut"||e=="onFocusIn"?l.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=r,r?s?r.u=s.u:(r.u=K,t.addEventListener(e,o?J:z,o)):t.removeEventListener(e,o?J:z,o);else{if(a=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=r??"";break e}catch{}typeof r=="function"||(r==null||r===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&r==1?"":r))}}function ne(t){return function(e){if(this.l){var r=this.l[e.type+t];if(e.t==null)e.t=K++;else if(e.t<r.u)return;return r(_.event?_.event(e):e)}}}function q(t,e,r,s,a,o,l,d,h,i){var u,n,m,c,b,y,v,g,f,R,S,H,te,L,B,w=e.type;if(e.constructor!==void 0)return null;128&r.__u&&(h=!!(32&r.__u),o=[d=e.__e=r.__e]),(u=_.__b)&&u(e);e:if(typeof w=="function")try{if(g=e.props,f=w.prototype&&w.prototype.render,R=(u=w.contextType)&&s[u.__c],S=u?R?R.props.value:u.__:s,r.__c?v=(n=e.__c=r.__c).__=n.__E:(f?e.__c=n=new w(g,S):(e.__c=n=new k(g,S),n.constructor=w,n.render=De),R&&R.sub(n),n.state||(n.state={}),n.__n=s,m=n.__d=!0,n.__h=[],n._sb=[]),f&&n.__s==null&&(n.__s=n.state),f&&w.getDerivedStateFromProps!=null&&(n.__s==n.state&&(n.__s=C({},n.__s)),C(n.__s,w.getDerivedStateFromProps(g,n.__s))),c=n.props,b=n.state,n.__v=e,m)f&&w.getDerivedStateFromProps==null&&n.componentWillMount!=null&&n.componentWillMount(),f&&n.componentDidMount!=null&&n.__h.push(n.componentDidMount);else{if(f&&w.getDerivedStateFromProps==null&&g!==c&&n.componentWillReceiveProps!=null&&n.componentWillReceiveProps(g,S),e.__v==r.__v||!n.__e&&n.shouldComponentUpdate!=null&&n.shouldComponentUpdate(g,n.__s,S)===!1){e.__v!=r.__v&&(n.props=g,n.state=n.__s,n.__d=!1),e.__e=r.__e,e.__k=r.__k,e.__k.some(function(P){P&&(P.__=e)}),$.push.apply(n.__h,n._sb),n._sb=[],n.__h.length&&l.push(n);break e}n.componentWillUpdate!=null&&n.componentWillUpdate(g,n.__s,S),f&&n.componentDidUpdate!=null&&n.__h.push(function(){n.componentDidUpdate(c,b,y)})}if(n.context=S,n.props=g,n.__P=t,n.__e=!1,H=_.__r,te=0,f)n.state=n.__s,n.__d=!1,H&&H(e),u=n.render(n.props,n.state,n.context),$.push.apply(n.__h,n._sb),n._sb=[];else do n.__d=!1,H&&H(e),u=n.render(n.props,n.state,n.context),n.state=n.__s;while(n.__d&&++te<25);n.state=n.__s,n.getChildContext!=null&&(s=C(C({},s),n.getChildContext())),f&&!m&&n.getSnapshotBeforeUpdate!=null&&(y=n.getSnapshotBeforeUpdate(c,b)),L=u!=null&&u.type===x&&u.key==null?_e(u.props.children):u,d=ce(t,W(L)?L:[L],e,r,s,a,o,l,d,h,i),n.base=e.__e,e.__u&=-161,n.__h.length&&l.push(n),v&&(n.__E=n.__=null)}catch(P){if(e.__v=null,h||o!=null)if(P.then){for(e.__u|=h?160:128;d&&d.nodeType==8&&d.nextSibling;)d=d.nextSibling;o[o.indexOf(d)]=null,e.__e=d}else{for(B=o.length;B--;)V(o[B]);X(e)}else e.__e=r.__e,e.__k=r.__k,P.then||X(e);_.__e(P,e,r)}else o==null&&e.__v==r.__v?(e.__k=r.__k,e.__e=r.__e):d=e.__e=Pe(r.__e,e,r,s,a,o,l,h,i);return(u=_.diffed)&&u(e),128&e.__u?void 0:d}function X(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(X))}function ue(t,e,r){for(var s=0;s<r.length;s++)G(r[s],r[++s],r[++s]);_.__c&&_.__c(e,t),t.some(function(a){try{t=a.__h,a.__h=[],t.some(function(o){o.call(a)})}catch(o){_.__e(o,a.__v)}})}function _e(t){return typeof t!="object"||t==null||t.__b>0?t:W(t)?t.map(_e):C({},t)}function Pe(t,e,r,s,a,o,l,d,h){var i,u,n,m,c,b,y,v=r.props||I,g=e.props,f=e.type;if(f=="svg"?a="http://www.w3.org/2000/svg":f=="math"?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),o!=null){for(i=0;i<o.length;i++)if((c=o[i])&&"setAttribute"in c==!!f&&(f?c.localName==f:c.nodeType==3)){t=c,o[i]=null;break}}if(t==null){if(f==null)return document.createTextNode(g);t=document.createElementNS(a,f,g.is&&g),d&&(_.__m&&_.__m(e,o),d=!1),o=null}if(f==null)v===g||d&&t.data==g||(t.data=g);else{if(o=o&&O.call(t.childNodes),!d&&o!=null)for(v={},i=0;i<t.attributes.length;i++)v[(c=t.attributes[i]).name]=c.value;for(i in v)c=v[i],i=="dangerouslySetInnerHTML"?n=c:i=="children"||i in g||i=="value"&&"defaultValue"in g||i=="checked"&&"defaultChecked"in g||A(t,i,null,c,a);for(i in g)c=g[i],i=="children"?m=c:i=="dangerouslySetInnerHTML"?u=c:i=="value"?b=c:i=="checked"?y=c:d&&typeof c!="function"||v[i]===c||A(t,i,c,v[i],a);if(u)d||n&&(u.__html==n.__html||u.__html==t.innerHTML)||(t.innerHTML=u.__html),e.__k=[];else if(n&&(t.innerHTML=""),ce(e.type=="template"?t.content:t,W(m)?m:[m],e,r,s,f=="foreignObject"?"http://www.w3.org/1999/xhtml":a,o,l,o?o[0]:r.__k&&D(r,0),d,h),o!=null)for(i=o.length;i--;)V(o[i]);d||(i="value",f=="progress"&&b==null?t.removeAttribute("value"):b!=null&&(b!==t[i]||f=="progress"&&!b||f=="option"&&b!=v[i])&&A(t,i,b,v[i],a),i="checked",y!=null&&y!=t[i]&&A(t,i,y,v[i],a))}return t}function G(t,e,r){try{if(typeof t=="function"){var s=typeof t.__u=="function";s&&t.__u(),s&&e==null||(t.__u=t(e))}else t.current=e}catch(a){_.__e(a,r)}}function fe(t,e,r){var s,a;if(_.unmount&&_.unmount(t),(s=t.ref)&&(s.current&&s.current!=t.__e||G(s,null,e)),(s=t.__c)!=null){if(s.componentWillUnmount)try{s.componentWillUnmount()}catch(o){_.__e(o,e)}s.base=s.__P=null}if(s=t.__k)for(a=0;a<s.length;a++)s[a]&&fe(s[a],e,r||typeof t.type!="function");r||V(t.__e),t.__c=t.__=t.__e=void 0}function De(t,e,r){return this.constructor(t,r)}function ge(t,e,r){var s,a,o,l;e==document&&(e=document.documentElement),_.__&&_.__(t,e),a=(s=typeof r=="function")?null:r&&r.__k||e.__k,o=[],l=[],q(e,t=(!s&&r||e).__k=Ce(x,null,[t]),a||I,I,e.namespaceURI,!s&&r?[r]:a?null:e.firstChild?O.call(e.childNodes):null,o,!s&&r?r:a?a.__e:e.firstChild,s,l),ue(o,t,l)}function me(t){function e(r){var s,a;return this.getChildContext||(s=new Set,(a={})[e.__c]=this,this.getChildContext=function(){return a},this.componentWillUnmount=function(){s=null},this.shouldComponentUpdate=function(o){this.props.value!=o.value&&s.forEach(function(l){l.__e=!0,N(l)})},this.sub=function(o){s.add(o);var l=o.componentWillUnmount;o.componentWillUnmount=function(){s&&s.delete(o),l&&l.call(o)}}),r.children}return e.__c="__cC"+de++,e.__=t,e.Provider=e.__l=(e.Consumer=function(r,s){return r.children(s)}).contextType=e,e}O=$.slice,_={__e:function(t,e,r,s){for(var a,o,l;e=e.__;)if((a=e.__c)&&!a.__)try{if((o=a.constructor)&&o.getDerivedStateFromError!=null&&(a.setState(o.getDerivedStateFromError(t)),l=a.__d),a.componentDidCatch!=null&&(a.componentDidCatch(t,s||{}),l=a.__d),l)return a.__E=a}catch(d){t=d}throw t}},ae=0,we=function(t){return t!=null&&t.constructor===void 0},k.prototype.setState=function(t,e){var r;r=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=C({},this.state),typeof t=="function"&&(t=t(C({},r),this.props)),t&&C(r,t),t!=null&&this.__v&&(e&&this._sb.push(e),N(this))},k.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),N(this))},k.prototype.render=x,E=[],se=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,le=function(t,e){return t.__v.__b-e.__v.__b},j.__r=0,ie=/(PointerCapture)$|Capture$/i,K=0,z=ne(!1),J=ne(!0),de=0;var He=0;function p(t,e,r,s,a,o){e||(e={});var l,d,h=e;if("ref"in h)for(d in h={},e)d=="ref"?l=e[d]:h[d]=e[d];var i={type:t,props:h,key:r,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--He,__i:-1,__u:0,__source:a,__self:o};if(typeof t=="function"&&(l=t.defaultProps))for(d in l)h[d]===void 0&&(h[d]=l[d]);return _.vnode&&_.vnode(i),i}var be=me({registerChild:()=>{},unregisterChild:()=>{},get parentThis(){return null}}),T=class extends k{childRefs=[];ref=F();childrenRef=F();togglerRef=F();headerRef=F();registerChild(e){e&&!this.childRefs.includes(e)&&this.childRefs.push(e)}unregisterChild(e){this.childRefs=this.childRefs.filter(r=>r!==e)}get isCollapsible(){return this.props.collapsible!==!1}get isFocusable(){return this.props.focusable!==!1}get isCollapsed(){return this.childrenRef.current?.getAttribute("data-collapsed")==="true"}get isRootContainer(){return this.props.rootContainer===!0}get isExpanded(){return!this.isCollapsed}componentWillMount(){try{this.context?.registerChild(this.ref)}catch(e){console.log(e)}}get parent(){let e=this.context;return e?.parentThis?.current?e.parentThis.current:null}get root(){let e=this.parent;for(;e;)if(e.parent)e=e.parent;else return e;return null}componentDidMount(){this.ref.current=this}expand(){this.isCollapsible&&(this.childrenRef.current?.setAttribute("data-collapsed","false"),this.togglerRef.current?.setAttribute("data-collapsed","false"),this.props.collapsed=!1)}collapse(){this.isCollapsible&&(this.childrenRef.current?.setAttribute("data-collapsed","true"),this.togglerRef.current?.setAttribute("data-collapsed","true"),this.props.collapsed=!0)}toggle(){this.isCollapsed?this.expand():this.collapse()}expandAll(){this.expand(),this.childRefs.forEach(e=>e.current?.expandAll())}collapseAll(e){e||this.collapse(),this.childRefs.forEach(r=>r.current?.collapseAll())}renderHeader(){return p(x,{children:this.props.header?this.props.header:p(x,{children:"\xA0"})})}renderItems(){return p(be.Provider,{value:{registerChild:e=>this.registerChild(e),unregisterChild:e=>this.unregisterChild(e),parentThis:this.ref},children:this.props.children})}isElementInViewport(e){let r=e.getBoundingClientRect(),s=this.root?.childrenRef.current?.closest("expandable-root")??document.body;if(s){let a=s.getBoundingClientRect();return r.bottom>=a.top&&r.top<a.bottom}return r.top>=0&&r.left>=0&&r.bottom<=window.innerHeight&&r.right<=window.innerWidth}ensureElementInView(e){e&&!this.isElementInViewport(e)&&e.scrollIntoView({block:"nearest",inline:"nearest"})}focusHeader(){this.isFocusable&&(this.ensureElementInView(this.headerRef.current),this.headerRef.current?.focus({preventScroll:!0}))}handleKeyDown(e){let r=this.headerRef.current,s=r?.getRootNode();if(r&&r===s.activeElement)switch(e.key){case"ArrowLeft":e.stopPropagation(),this.isCollapsed?this.parent?.focusHeader():this.collapse();break;case"ArrowRight":e.stopPropagation(),this.isExpanded?this.getFirstChild()?.focusHeader():this.expand();break;case"ArrowDown":if(e.preventDefault(),e.stopPropagation(),this.isExpanded&&this.childRefs.length>0)this.childRefs[0].current?.focusHeader();else{let a=this;for(;a;){let o=a?.parent;if(!o)break;let l=o.childRefs.indexOf(a.ref);if(l<o.childRefs.length-1){o.childRefs[l+1].current?.focusHeader();return}a=o}}break;case"ArrowUp":if(e.preventDefault(),e.stopPropagation(),this.parent){let a=this.parent.childRefs.indexOf(this.ref);if(a>0){let o=this.parent.childRefs[a-1]?.current;for(;o?.isExpanded&&o.childRefs.length>0;)o=o.childRefs[o.childRefs.length-1]?.current;o?.focusHeader()}else this.parent.focusHeader()}break;case"Home":this.root&&this.root.childRefs.length&&(e.preventDefault(),e.stopPropagation(),this.root.getFirstChild()?.focusHeader());break;case"End":this.root&&this.root.childRefs.length&&(e.preventDefault(),e.stopPropagation(),this.root?.getLastExpandedChild()?.focusHeader());break;case"PageUp":this.root&&this.root.childRefs.length&&(e.preventDefault(),e.stopPropagation(),this.root.getFirstChild()?.focusHeader());break;case"PageDown":this.root&&this.root.childRefs.length&&(e.preventDefault(),e.stopPropagation(),this.root?.getLastExpandedChild()?.focusHeader());break;default:break}}handleWheel(e){let r=this.childrenRef.current;if(r){let s=r.scrollTop===0&&e.deltaY<0,a=r.scrollTop+r.clientHeight>=r.scrollHeight&&e.deltaY>0;!s&&!a&&e.stopPropagation()}}getFirstChild(){return this.childRefs.length>0?this.childRefs[0].current??void 0:null}getLastChild(){if(this.childRefs.length>0)return this.childRefs[this.childRefs.length-1].current??void 0}getLastExpandedChild(){let e=this.getLastChild();for(;e?.isExpanded&&e.childRefs.length>0;)e=e.getLastChild();return e}render(){return p(x,{children:[p("div",{ref:this.headerRef,...this.isFocusable?{tabIndex:0}:{},class:this.isRootContainer?"expander-root-header":"expander-header",onKeyDown:e=>{this.handleKeyDown(e)},onClick:e=>{e.stopPropagation(),this.toggle(),this.headerRef.current?.focus()},children:[this.isRootContainer?p("div",{class:"expander-root-header-left",title:this.props.title}):p("div",{class:"expander-header-left",title:this.props.title,children:this.renderHeader()}),p("div",{class:"expander-header-right",children:[p("span",{class:"expander-icon expand-all",title:"Expand all",onClick:e=>{e.stopPropagation(),this.expandAll()}}),p("span",{class:"expander-icon collapse-all",title:"Collapse all",onClick:e=>{e.stopPropagation(),this.collapseAll()}})]}),this.isCollapsible?p("span",{ref:this.togglerRef,class:`expander-icon toggle ${this.props.collapsed?"closed":"open"}`,"data-collapsed":this.props.collapsed,onClick:e=>{e.stopPropagation(),this.toggle()}}):null]}),p("div",{ref:this.childrenRef,onWheel:e=>{this.isRootContainer&&this.handleWheel(e)},"data-collapsed":this.props.collapsed,class:`children ${this.isCollapsible?"collapsible":""} ${this.isRootContainer?"root-container":""}`,children:this.renderItems()})]})}};T.contextType=be;var Y=class extends k{renderItems(){return p(x,{children:this.props.data.items.map(e=>ee(e))})}render(){return p("div",{class:"result-body expandable-root",children:p(T,{focusable:!1,collapsible:!1,rootContainer:!0,children:this.renderItems()})})}},Q=class extends k{render(){let e=this.props.data.level.toLocaleLowerCase();return p("table",{id:this.props.data.id,class:`messages ${e}-message`,children:p("tr",{class:"message-row",children:[p("td",{class:"time",children:this.props.data.timestamp}),p("td",{class:`${e} level`,children:p("span",{class:`label ${e}`,children:this.props.data.level})}),this.props.data.html?p("td",{class:"message",dangerouslySetInnerHTML:{__html:this.props.data.message}}):p("td",{class:"message",children:this.props.data.message})]})})}},Z=class extends k{renderHeader(){return p(x,{children:[p("span",{class:"elapsed",title:"Elapsed time",children:this.props.data.elapsed_time}),p("span",{class:`label ${this.props.data.status.toLowerCase()}`,children:this.props.data.type}),p("span",{class:"assign",children:this.props.data.assign.join("    ")}),p("span",{class:"name",children:[this.props.data.owner?p("span",{class:"parent-name",children:[this.props.data.owner," . "]}):null,this.props.data.name]}),"\xA0",p("span",{class:"arg",children:this.props.data.args})]})}renderItems(){return p(x,{children:[p("table",{class:"metadata keyword-metadata",children:[this.props.data.doc?p("tr",{children:[p("th",{children:"Documentation:"}),p("td",{class:"doc",dangerouslySetInnerHTML:{__html:this.props.data.doc}})]}):null,this.props.data.tags&&this.props.data.tags.length>0?p("tr",{children:[p("th",{children:"Tags:"}),p("td",{class:"tags",children:this.props.data.tags.join(", ")})]}):null,this.props.data.timeout?p("tr",{children:[p("th",{children:"Tags:"}),p("td",{class:"tags",children:this.props.data.timeout})]}):null,p("tr",{children:[p("th",{children:"Start / End / Elapsed:"}),p("td",{children:[this.props.data.start_time," / $",this.props.data.elapsed_time," / $",this.props.data.elapsed_time]})]})]}),this.props.data.items.map(e=>ee(e))]})}render(){return p("div",{class:"keyword",children:p(T,{header:this.renderHeader(),collapsed:this.props.data.status!=="FAIL",title:`${this.props.data.type} ${this.props.data.owner?this.props.data.owner+"."+this.props.data.name:this.props.data.name} [${this.props.data.status}]`,children:this.renderItems()})})}};function ee(t){switch(t.node_type){case"root":return p(Y,{data:t});case"message":return p(Q,{data:t});case"keyword":return p(Z,{data:t});default:return p("div",{children:"Unknown node type"})}}var U=class extends k{render(){return ee(this.props.data)}};var ve=`:target {
    overflow: hidden;
}

/* Generic and misc styles */
.result-body {
    /* font-family: var(--vscode-font-family); */
    font-family: Helvetica, sans-serif;
    color: var(--vscode-robotcode-logForeground);
    background-color: var(--vscode-robotcode-logBackground);
}

.root-container {
    overflow-y: auto;
    max-height: var(--notebook-cell-output-max-height);
}

table {
    table-layout: fixed;
    word-wrap: break-word;
    empty-cells: show;
}

th,
td {
    vertical-align: top;
}


hr {
    height: 1px;
    border: 0;
}

a,
a:link,
a:visited {
    text-decoration: none;
}

a>img {
    border-width: 1px !important;
    border-style: solid !important;
}

a:hover,
a:active {
    text-decoration: underline;
}

.parent-name {
    font-size: x-small;
}

.message {
    white-space: pre-wrap;
}

/* Headers */
#header {
    width: 65em;
    height: 3em;
    margin: 20px 0 6px 0;
}

h1 {
    float: left;
    margin: 0 0 0.5em 0;
    width: 75%;
}

h2 {
    clear: left;
}

#generated {
    float: right;
    text-align: right;
    font-size: 0.9em;
    white-space: nowrap;
}

/* Documentation headers */
.doc>h2 {
    font-size: 1.2em;
}

.doc>h3 {
    font-size: 1.1em;
}

.doc>h4 {
    font-size: 1.0em;
}

.label {
    padding: 2px 5px;
    font-size: 0.75em;
    letter-spacing: 1px;
    white-space: nowrap;
    border-radius: 3px;
    color: var(--vscode-robotcode-logLabelForeground);
    background-color: var(--vscode-robotcode-logLabelBackground);
}

.label.debug,
.label.trace,
.label.error,
.label.keyword {
    letter-spacing: 0;
}

.label.pass,
.label.fail,
.label.error,
.label.skip,
.label.warn {
    font-weight: bold;
    color: var(--vscode-robotcode-logLabelWarnForeground);
    background-color: var(--vscode-robotcode-logLabelWarnBackground);
}

.label.pass {
    background-color: #97bd61;
    color: var(--vscode-robotcode-logLabelPassForeground);
    background-color: var(--vscode-robotcode-logLabelPassBackground);
}

.label.fail,
.label.error {
    color: var(--vscode-robotcode-logLabelErrorForeground);
    background-color: var(--vscode-robotcode-logLabelErrorBackground);
}

.label.skip,
.label.warn {
    background-color: #fed84f;
    color: var(--vscode-robotcode-logLabelWarnForeground);
    background-color: var(--vscode-robotcode-logLabelWarnBackground);
}

/* Top right header */
#top-right-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 12em;
    text-align: center;
}

#log-level-selector {
    padding: 0.3em 0;
    font-size: 0.9em;
    border-bottom-left-radius: 4px;
}`;var xe=`.suite,
.test,
#errors {
    border-width: 1px;
    border-style: solid;
    padding: 0.3em 0.2em;
    margin: 0.2em 0;
}


.test {
    border-style: dashed;
}

#errors,
.messages {
    width: 100%;
    border-spacing: 0;
}

.children {
    margin-left: 0em;
}

.children.collapsible {
    margin-left: 1.4em;
}


.children[data-collapsed=true] {
    display: none;
}

.children[data-collapsed=false] {
    display: block;
}


.suite,
.test,
.keyword {
    border-left-width: 1px;
    border-left-style: solid;
    border-color: transparent;
}

.keyword:hover {
    border-left-style: dashed;
    border-color: inherit;
}

#s1,
.suite>.children>.keyword {
    margin-left: 0;
}

/* Suite, test and kw headers */
.expander-header {
    border-width: 0px;
    border-radius: 5px;
    position: relative;
    margin-left: 2px;
}

.expander-root-header {
    border-width: 0px;
    border-radius: 5px;
    position: relative;
    margin-left: 2px;
}

.expander-header:hover {
    background-color: var(--vscode-robotcode-expanderHeaderHoverBackground);
    outline: 1px dashed var(--vscode-robotcode-expanderHeaderHoverOutline);
    outline-offset: -1px;
}

.expander-header:focus {
    color: var(--vscode-robotcode-expanderHeaderFocusForeground);
    background-color: var(--vscode-robotcode-expanderHeaderFocusBackground);
    outline: 1px solid var(--vscode-robotcode-expanderHeaderFocusOutline);
    outline-offset: -1px;
}

.expander-header:focus:hover {
    color: var(--vscode-robotcode-expanderHeaderFocusForeground);
    background-color: var(--vscode-robotcode-expanderHeaderHoverBackground);
    outline: 1px solid var(--vscode-robotcode-expanderHeaderFocusOutline);
    outline-offset: -1px;
}

.expander-header-left {
    cursor: pointer;
    padding: 3px 80px 3px 20px;
}

.expander-root-header-left {
    padding: 3px 80px 3px 20px;
    height: 1em;
}

.expander-header-right {
    position: absolute;
    right: 0px;
    top: 2px;
    cursor: default;
}

.expander-header .label {
    margin-right: 0.5em;
}

.name {
    font-weight: bold;
    white-space: pre-wrap;
}

.arg,
.assign {
    white-space: pre-wrap;
}

.elapsed {
    float: right;
    padding-left: 1em;
}

.expander-icon {
    color: var(--vscode-robotcode-expanderIconForeground);
    text-align: center;
    vertical-align: middle;
    font-family: monospace;
    fill: var(--vscode-icon-foreground);
    cursor: pointer;
    display: inline-block;
    width: 1em;
    height: 1em;
    padding: 1px;
    border-radius: 5px;
}

.expander-icon:hover {
    cursor: pointer;
    background-color: var(--vscode-robotcode-expanderIconHoverBackground);
    outline: 1px dashed var(--vscode-robotcode-expanderIconHoverOutline);
    outline-offset: -1px;
}

.expander-icon.toggle[data-collapsed=false]::after {
    content: '-';
}

.expander-icon.toggle[data-collapsed=true]::after {
    content: '+';
}

.expander-icon.toggle {
    margin: 0 auto;
    position: absolute;
    left: 0px;
    top: 3px;
}

.expander-header .expand-all,
.expander-header .collapse-all,
.expander-header .link,
.expander-root-header .expand-all,
.expander-root-header .collapse-all,
.expander-root-header .link {
    visibility: hidden;
}

.collapse-all::after {
    content: '\u25B2';
}

.expand-all::after {
    content: '\u25BC';
}

.link::after {
    content: '\u21D7';
}

.expander-header:hover .collapse-all,
.expander-header:hover .expand-all,
.expander-header:hover .link,
.expander-root-header:hover .collapse-all,
.expander-root-header:hover .expand-all,
.expander-root-header:hover .link {
    visibility: visible;
}

/* Messages and errors */
.messages .time,
.messages .message {
    font-family: monospace;
}

#errors .message {
    font-family: monospace;
}

.message-row {
    height: 20px;
}

.time {
    width: 5.5em;
}

.error-time {
    width: 11em;
    white-space: nowrap;
}

.level {
    width: 5em;
    text-align: center;
}

/* Message tables - these MUST NOT be combined together because otherwise
   dynamically altering them based on visible log level is not possible. */
.trace-message {
    display: none;
}

.debug-message {
    display: none;
}

/* Metadata */
.metadata {
    width: 100%;
    border-spacing: 0.2em;
}

.metadata th {
    width: 12em;
    vertical-align: top;
    text-align: left;
}

.metadata td {
    vertical-align: top;
}

.keyword-metadata {
    font-size: 1em;
}`;var ye=`.doc>* {
    margin: 0.7em 1em 0.1em 1em;
    padding: 0;
}

.doc>p,
.doc>h1,
.doc>h2,
.doc>h3,
.doc>h4 {
    margin: 0.7em 0 0.1em 0;
}

.doc>*:first-child {
    margin-top: 0.1em;
}

.doc table {
    background: transparent;
    border-collapse: collapse;
    empty-cells: show;
    font-size: 0.9em;
}

.doc table th,
.doc table td {
    background: transparent;
    padding: 0.1em 0.3em;
    height: 1.2em;
}

.doc table th {
    text-align: center;
    letter-spacing: 0.1em;
}

.doc pre {
    border-radius: 2px;
    font-size: 1.1em;
    letter-spacing: 0.05em;
}

.doc code {
    border-radius: 2px;
    padding: 0 0.2em;
    letter-spacing: 0.05em;
}

.doc li {
    list-style-position: inside;
    list-style-type: square;
}

.doc img,
.doc table,
.doc table th,
.doc table td {
    border-width: 1px;
    border-style: solid;
}

.doc hr {
    background: #ccc;
    /* Fallback value */
    height: 1px;
    border: 0;
}`;var Ye=t=>{let e=new CSSStyleSheet({media:"all"});e.replaceSync(ve);let r=new CSSStyleSheet({media:"all"});r.replaceSync(xe);let s=new CSSStyleSheet({media:"all"});return s.replaceSync(ye),{renderOutputItem(a,o,l){let d=o.shadowRoot;if(!d){d=o.attachShadow({mode:"open"}),d.adoptedStyleSheets=[...document.adoptedStyleSheets,e,r,s];let i=document.createElement("div");i.id="root",d?.append(i)}let h=d.querySelector("#root");h&&ge(p(U,{data:a.json()}),h)}}};export{Ye as activate};
