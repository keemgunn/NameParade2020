(function(e){function t(t){for(var i,r,a=t[0],c=t[1],l=t[2],h=0,d=[];h<a.length;h++)r=a[h],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&d.push(o[r][0]),o[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);u&&u(t);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(i=!1)}i&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var i={},o={app:0},s=[];function r(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=i,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0fe7":function(e,t,n){"use strict";var i=n("22b3"),o=n.n(i);o.a},1:function(e,t){},10:function(e,t){},11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t){},2:function(e,t){},"22b3":function(e,t,n){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"53d8":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",class:{"ALL-LOADED":e.LOADING_PROGRESS>=1}},[n("Background"),n("div",{attrs:{id:"content"}},[n("Loader"),n("TitleSign"),n("Pathmaker"),e.test.modal?n("test"):e._e()],1)],1)},s=[],r=n("5530"),a=n("2f62"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"test"}},[n("h1",[e._v("TEST")]),e._v(" vw: "+e._s(e.winSize.vw)+" "),n("br"),e._v(" vh: "+e._s(e.winSize.vh)+" "),n("br"),e._v(" viewtype: "+e._s(e.viewtype)+" "),n("br"),e._v(" modal: "+e._s(e.modal)+" "),n("br"),e._v(" justLoaded: "+e._s(e.loading.justLoaded)+" "),n("br"),e._v(" loading: "+e._s(100*e.LOADING_PROGRESS)+"% "),n("br"),e._v(" BBC:"),n("br"),e._v(e._s(e.BBC)),n("br"),e._v(" writer.scopeSize:"+e._s(e.writer.scopeSize)+" writer.pixelRatio:"+e._s(e.writer.pixelRatio)+" writer.relocation:"+e._s(e.writer.relocation)+" "),n("br"),e._v(" msg00: "+e._s(e.msg00)+" "),n("br"),e._v(" msg01: "+e._s(e.msg01)+" "),n("br"),e._v(" msg02: "+e._s(e.msg02)+" "),n("br"),e._v(" msg03: "+e._s(e.msg03)+" "),n("br"),e._v(" msg04: "+e._s(e.msg04)+" "),n("br"),n("button",{on:{click:function(t){return e.setBBC({comp:-1,hue:-1})}}},[e._v("test A")]),n("br"),n("button",{on:{click:function(t){return e.setBBC({comp:1,hue:3})}}},[e._v("test B")]),n("br"),n("button",{on:{click:function(t){return e.progressDone()}}},[e._v("test C")]),n("br"),n("button",[e._v("test D")]),n("br"),n("button",[e._v("test E")]),n("br")])},l=[],u={name:"test",components:{},props:[],data:function(){return{msg00:null,msg01:null,msg02:null,msg03:null,msg04:null}},computed:Object(r["a"])(Object(r["a"])({},Object(a["e"])(["viewtype","modal","winSize","loading","writer"])),Object(a["c"])(["BBC","byType","LOADING_PROGRESS"])),methods:Object(r["a"])(Object(r["a"])({},Object(a["d"])(["setBBC"])),{},{progressDone:function(){this.$store.state.loading.filesLoaded+=1}}),created:function(){},mounted:function(){},beforeUpdate:function(){},beforeCreate:function(){}},h=u,d=(n("9dab"),n("2877")),L=Object(d["a"])(h,c,l,!1,null,"5ad0c14f",null),p=L.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"background"}},[e._v(" "+e._s(e.VIEWTYPE)+" "),n("div",{style:e.bgLoading,attrs:{id:"bg-loading"}}),n("canvas",{attrs:{id:"BG"}})])},w=[],v=n("2222"),g={name:"Background",data:function(){return{scope:null,COLORS:[],levels:{now:0,start:42,end:38},size:.66,amount:6,velocity:.4}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(a["e"])(["winSize","writer"])),Object(a["c"])(["BBC","VIEWTYPE","LOADING_PROGRESS"])),{},{bgLoading:function(){var e=100;return this.LOADING_PROGRESS>=1?this.writer.paths.length?{transition:"800ms","background-color":"black",opacity:"100%"}:{opacity:"100%"}:{transition:"50ms",opacity:this.LOADING_PROGRESS*e+"%"}},radius:function(){return this.winSize.vw>this.winSize.vh?{min:this.winSize.vh*this.size,max:this.winSize.vw*this.size}:{min:this.winSize.vw*this.size,max:this.winSize.vh*this.size}}}),methods:{onResize:function(){this.scope.view.size.width=window.innerWidth,this.scope.view.size.height=window.innerHeight,this.scope.view.viewSize.width=window.innerWidth,this.scope.view.viewSize.height=window.innerHeight}},created:function(){this.COLORS=this.BBC,this.scope=new v.PaperScope,this.$store.state.loading.fakeOffset+=20},mounted:function(){var e=this;this.scope.setup(document.getElementById("BG")),this.$nextTick((function(){window.addEventListener("resize",e.onResize)}));for(var t=[],n=0;n<this.amount;n++){var i="hsl("+this.COLORS[n]+"deg, 100%, 0%)",o="hsl("+this.COLORS[n]+"deg, 100%, 0%, 0)",s=new this.scope.Path.Circle({center:new this.scope.Point(Math.random()*this.winSize.vw,Math.random()*this.winSize.vh),radius:Math.random()*(this.radius.max-this.radius.min)+this.radius.min,data:{veloX:Math.random()*this.velocity,veloY:Math.random()*this.velocity,sizeVar:Math.random()}});s.fillColor={gradient:{stops:[i,o],radial:!0},origin:s.position,destination:s.bounds.rightCenter},s.blendMode="saturation",t[n]=s}function r(e,t,n,i,o,s,r){n.position.x+=n.data.veloX,n.position.y+=n.data.veloY,(n.position.x<0||n.position.x>e.vw)&&(n.data.veloX*=-1),(n.position.y<0||n.position.y>e.vh)&&(n.data.veloY*=-1),i[s]!==o&&(o>i[s]?i[s]+=.5:i[s]-=.5,r.now<r.start?(r.now+=.1,r.now<r.end+.1?n.fillColor.gradient.stops=["hsl("+i[s]+"deg, 100%, "+r.now+"%)","hsl("+i[s]+"deg, 100%, "+r.now+"%, 0)"]:n.fillColor.gradient.stops=["hsl("+i[s]+"deg, 100%, "+r.now+"%)","hsl("+i[s]+"deg, 100%, "+r.end+"%, 0)"]):n.fillColor.gradient.stops=["hsl("+i[s]+"deg, 100%, "+r.start+"%)","hsl("+i[s]+"deg, 100%, "+r.end+"%, 0)"])}this.scope.view.onFrame=function(){for(var n=0;n<e.amount;n++)r(e.winSize,e.scope,t[n],e.COLORS,e.BBC[n],n,e.levels)},this.$store.state.loading.fakeOffset+=30}},m=g,S=(n("7506"),Object(d["a"])(m,f,w,!1,null,"2961a2f2",null)),C=S.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"loader"}},[n("div",{staticClass:"loader",class:e.byType},[n("div",{staticClass:"title-box",class:{"title-box_LOADED":e.LOADING_PROGRESS>=1}},[n("div",{staticClass:"title _A"},[n("svg",{attrs:{viewBox:"0 0 540 60",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[n("title",[e._v("title_parade")]),n("path",{attrs:{d:"M509.616446,0 C519.561814,0 525.492537,8.76427132 525.492537,22.4546676 C525.492537,36.2357287 519.592228,45 509.616446,45 C499.640665,45 493.709941,36.2659503 493.709941,22.4848892 C493.709941,8.79449295 499.701493,0 509.616446,0 Z M437.413686,0 C447.359054,0 453.289778,8.76427132 453.289778,22.4546676 C453.289778,36.2357287 447.389468,45 437.413686,45 C427.437905,45 421.507181,36.2659503 421.507181,22.4848892 C421.507181,8.79449295 427.498733,0 437.413686,0 Z M291.609124,0.695097381 L308.002253,44.3049026 L303.622642,44.3049026 L298.756407,30.9469443 L280.325542,30.9469443 L275.459307,44.3049026 L271.049282,44.3049026 L287.472825,0.695097381 L291.609124,0.695097381 Z M4.10588567,0.695097381 L29.8361025,37.1121558 L30.0490003,37.1121558 L30.0490003,0.695097381 L34.1548859,0.695097381 L34.1548859,44.3049026 L30.1402422,44.3049026 L4.31878344,7.85762257 L4.10588567,7.85762257 L4.10588567,44.3049026 L0,44.3049026 L0,0.695097381 L4.10588567,0.695097381 Z M59.5201352,0.695097381 L75.9132639,44.3049026 L71.5336525,44.3049026 L66.6674176,30.9469443 L48.2365531,30.9469443 L43.3703182,44.3049026 L38.9602929,44.3049026 L55.3838355,0.695097381 L59.5201352,0.695097381 Z M473.727964,0 C481.605182,0 487.201352,5.37944929 487.201352,12.0282069 C487.201352,16.7427804 485.04196,20.3089322 477.22557,28.3176629 L477.22557,28.3176629 L465.485779,40.4969778 L465.485779,40.6178643 L488.326669,40.6178643 L488.326669,44.3049026 L459.707125,44.3049026 L459.707125,41.4036266 L475.218248,25.2048355 C481.51394,18.6769644 483.065052,16.0779046 483.065052,12.2397582 C483.065052,7.43451981 479.263306,3.62659503 473.727964,3.62659503 C467.918896,3.62659503 463.569699,7.58562794 463.508871,12.9348556 L463.508871,12.9348556 L459.494227,12.9348556 C459.555055,5.47011417 465.607435,0 473.727964,0 Z M85.5240777,0.695097381 L101.795551,39.0463398 L101.978034,39.0463398 L118.219093,0.695097381 L123.0245,0.695097381 L123.0245,44.3049026 L119.131512,44.3049026 L119.131512,8.52249832 L118.949028,8.52249832 L103.681217,44.3049026 L100.061954,44.3049026 L84.8245565,8.52249832 L84.6420727,8.52249832 L84.6420727,44.3049026 L80.7490848,44.3049026 L80.7490848,0.695097381 L85.5240777,0.695097381 Z M157.726838,0.695097381 L157.726838,4.44257891 L135.372571,4.44257891 L135.372571,20.1276024 L156.601521,20.1276024 L156.601521,23.8146407 L135.372571,23.8146407 L135.372571,40.5574211 L157.726838,40.5574211 L157.726838,44.3049026 L131.236271,44.3049026 L131.236271,0.695097381 L157.726838,0.695097381 Z M179.74655,0.695097381 C188.140805,0.695097381 193.828217,6.16521155 193.828217,14.2646071 C193.828217,22.3640027 188.079977,27.8643385 179.716136,27.8643385 L179.716136,27.8643385 L168.949592,27.8643385 L168.949592,44.3049026 L164.813292,44.3049026 L164.813292,0.695097381 Z M216.942833,0.695097381 L233.335962,44.3049026 L228.95635,44.3049026 L224.090115,30.9469443 L205.659251,30.9469443 L200.793016,44.3049026 L196.382991,44.3049026 L212.806533,0.695097381 L216.942833,0.695097381 Z M253.652492,0.695097381 C262.229231,0.695097381 267.703745,5.68166555 267.703745,13.4486232 C267.703745,19.6138348 264.175725,24.2679651 258.305829,25.7790463 L258.305829,25.7790463 L268.950718,44.3049026 L264.084483,44.3049026 L253.987046,26.4439221 L242.308082,26.4439221 L242.308082,44.3049026 L238.171783,44.3049026 L238.171783,0.695097381 Z M401.525204,0 C409.402422,0 414.998592,5.37944929 414.998592,12.0282069 C414.998592,16.7427804 412.8392,20.3089322 405.02281,28.3176629 L405.02281,28.3176629 L393.283019,40.4969778 L393.283019,40.6178643 L416.123909,40.6178643 L416.123909,44.3049026 L387.504365,44.3049026 L387.504365,41.4036266 L403.015489,25.2048355 C409.31118,18.6769644 410.862292,16.0779046 410.862292,12.2397582 C410.862292,7.43451981 407.060546,3.62659503 401.525204,3.62659503 C395.716136,3.62659503 391.366939,7.58562794 391.306111,12.9348556 L391.306111,12.9348556 L387.291467,12.9348556 C387.352295,5.47011417 393.404675,0 401.525204,0 Z M327.071811,0.695097381 C340.210645,0.695097381 347.874965,8.70382807 347.874965,22.4848892 C347.874965,36.2961719 340.241059,44.3049026 327.071811,44.3049026 L327.071811,44.3049026 L312.838074,44.3049026 L312.838074,0.695097381 Z M380.813292,0.695097381 L380.813292,4.44257891 L358.459026,4.44257891 L358.459026,20.1276024 L379.687975,20.1276024 L379.687975,23.8146407 L358.459026,23.8146407 L358.459026,40.5574211 L380.813292,40.5574211 L380.813292,44.3049026 L354.322726,44.3049026 L354.322726,0.695097381 L380.813292,0.695097381 Z M437.413686,3.65681666 C430.08392,3.65681666 425.704309,11.0913365 425.704309,22.4546676 C425.704309,34.02955 429.992678,41.373405 437.413686,41.373405 C444.834694,41.373405 449.123064,34.02955 449.123064,22.4848892 C449.123064,11.0308932 444.773867,3.65681666 437.413686,3.65681666 Z M509.616446,3.65681666 C502.28668,3.65681666 497.907068,11.0913365 497.907068,22.4546676 C497.907068,34.02955 502.195438,41.373405 509.616446,41.373405 C517.037454,41.373405 521.325824,34.02955 521.325824,22.4848892 C521.325824,11.0308932 516.976626,3.65681666 509.616446,3.65681666 Z M326.828499,4.44257891 L317.004787,4.44257891 L317.004787,40.5574211 L326.828499,40.5574211 C337.625458,40.5574211 343.647423,34.0899933 343.647423,22.5151108 C343.647423,10.9100067 337.625458,4.44257891 326.828499,4.44257891 L326.828499,4.44257891 Z M536.793359,32.1428571 C538.58632,32.1428571 540,33.55233 540,35.3743316 C540,37.1619557 538.58632,38.5714286 536.793359,38.5714286 C535.000399,38.5714286 533.552239,37.1619557 533.552239,35.3743316 C533.552239,33.55233 535.000399,32.1428571 536.793359,32.1428571 Z M57.5432273,5.80255205 L57.3607435,5.80255205 L49.4835258,27.3807925 L65.4204449,27.3807925 L57.5432273,5.80255205 Z M214.965925,5.80255205 L214.783441,5.80255205 L206.906224,27.3807925 L222.843143,27.3807925 L214.965925,5.80255205 Z M289.632216,5.80255205 L289.449732,5.80255205 L281.572515,27.3807925 L297.509434,27.3807925 L289.632216,5.80255205 Z M178.773303,4.38213566 L168.949592,4.38213566 L168.949592,24.1773002 L178.773303,24.1773002 C185.525204,24.1773002 189.570262,20.4600403 189.570262,14.2646071 C189.570262,8.06917394 185.555618,4.38213566 178.773303,4.38213566 L178.773303,4.38213566 Z M253.165869,4.38213566 L242.308082,4.38213566 L242.308082,22.7871054 L253.317939,22.7871054 C259.704872,22.7871054 263.415376,19.4022834 263.415376,13.5695097 C263.415376,7.79717931 259.552802,4.38213566 253.165869,4.38213566 L253.165869,4.38213566 Z M536.793359,8.03571429 C538.58632,8.03571429 540,9.44518717 540,11.2671887 C540,13.0548128 538.58632,14.4642857 536.793359,14.4642857 C535.000399,14.4642857 533.552239,13.0548128 533.552239,11.2671887 C533.552239,9.44518717 535.000399,8.03571429 536.793359,8.03571429 Z","fill-rule":"nonzero"}})])]),"tablet"!==e.viewtype?n("div",{staticClass:"title _B"},[n("svg",{attrs:{viewBox:"0 0 540 60",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[n("title",[e._v("title_designer")]),n("path",{attrs:{d:"M334.486764,-1.42108547e-14 C343.639226,-1.42108547e-14 349.890417,5.20534206 350.099787,12.78769 L350.099787,12.78769 L343.609316,12.78769 C343.190576,8.42483108 339.631285,5.74693834 334.397033,5.74693834 C329.342242,5.74693834 325.633401,8.2142103 325.633401,12.1859164 C325.633401,15.345228 327.846742,17.4514358 333.439913,18.6549831 L333.439913,18.6549831 L338.165694,19.6479096 C347.198517,21.5735853 350.907358,25.2143159 350.907358,31.5329392 C350.907358,39.7170608 344.506616,44.8622255 334.456854,44.8622255 C324.706191,44.8622255 318.215719,39.9577703 317.796979,32.2249789 L317.796979,32.2249789 L324.317361,32.2249789 C324.915561,36.5276605 328.983322,39.1152872 334.726044,39.1152872 C340.199575,39.1152872 344.117786,36.286951 344.117786,32.405511 C344.117786,29.0355785 341.844625,26.9293708 336.071994,25.6656461 L336.071994,25.6656461 L331.376123,24.6727196 C322.732131,22.83731 318.81392,18.8054265 318.81392,12.5469806 C318.81392,5.11507601 325.304391,-1.42108547e-14 334.486764,-1.42108547e-14 Z M390.059558,-1.42108547e-14 C399.66067,-1.42108547e-14 406.928802,5.71684966 408.424302,14.3823902 L408.424302,14.3823902 L401.545001,14.3823902 C399.92986,8.99651605 395.712549,5.89738176 390.089468,5.89738176 C381.834306,5.89738176 376.869244,11.9752956 376.869244,22.175359 C376.869244,32.5559544 381.983856,38.9648438 390.209108,38.9648438 C397.208049,38.9648438 402.053471,34.4515414 402.143201,27.8621199 L402.143201,27.8621199 L402.143201,27.1099029 L390.986768,27.1099029 L390.986768,21.6638514 L408.753312,21.6638514 L408.753312,26.0868877 C408.753312,37.8515625 401.844101,44.8622255 390.149288,44.8622255 C377.796455,44.8622255 370.019853,36.1665963 370.019853,22.2355363 C370.019853,8.54518581 377.766545,-1.42108547e-14 390.059558,-1.42108547e-14 Z M258.634984,0.722128378 C271.466377,0.722128378 279.063519,8.66554054 279.063519,22.355891 C279.063519,36.0763302 271.496287,44.1400971 258.634984,44.1400971 L258.634984,44.1400971 L243.41079,44.1400971 L243.41079,0.722128378 Z M312.861828,0.722128378 L312.861828,6.52924409 L292.164103,6.52924409 L292.164103,19.2266681 L311.755158,19.2266681 L311.755158,24.823163 L292.164103,24.823163 L292.164103,38.3028927 L312.861828,38.3028927 L312.861828,44.1400971 L285.464261,44.1400971 L285.464261,0.722128378 L312.861828,0.722128378 Z M363.619111,0.722128378 L363.619111,44.1400971 L356.919269,44.1400971 L356.919269,0.722128378 L363.619111,0.722128378 Z M421.375336,0.722128378 L443.748021,32.7364865 L443.987301,32.7364865 L443.987301,0.722128378 L450.507683,0.722128378 L450.507683,44.1400971 L444.465861,44.1400971 L422.093176,12.1558277 L421.823986,12.1558277 L421.823986,44.1400971 L415.303604,44.1400971 L415.303604,0.722128378 L421.375336,0.722128378 Z M485.861312,0.722128378 L485.861312,6.52924409 L465.163587,6.52924409 L465.163587,19.2266681 L484.754642,19.2266681 L484.754642,24.823163 L465.163587,24.823163 L465.163587,38.3028927 L485.861312,38.3028927 L485.861312,44.1400971 L458.463745,44.1400971 L458.463745,0.722128378 L485.861312,0.722128378 Z M509.460308,0.722128378 C518.34358,0.722128378 523.876932,5.89738176 523.876932,13.9912373 C523.876932,19.8585304 520.766291,24.6125422 515.50213,26.3877745 L515.50213,26.3877745 L525.163062,44.1400971 L517.44628,44.1400971 L508.652738,27.4408784 L499.440455,27.4408784 L499.440455,44.1400971 L492.740614,44.1400971 L492.740614,0.722128378 Z M535.978678,31.9787268 C538.219567,31.9787268 540,33.7697952 540,36.0240709 C540,38.2783467 538.219567,40.0694151 535.978678,40.0694151 C533.737789,40.0694151 531.957356,38.2783467 531.957356,36.0240709 C531.957356,33.7697952 533.737789,31.9787268 535.978678,31.9787268 Z M258.006874,6.52924409 L250.110632,6.52924409 L250.110632,38.3028927 L258.006874,38.3028927 C267.159336,38.3028927 272.214128,32.6763091 272.214128,22.4160684 C272.214128,12.1859164 267.129426,6.52924409 258.006874,6.52924409 L258.006874,6.52924409 Z M508.652738,6.37880068 L499.440455,6.37880068 L499.440455,21.9948269 L508.832198,21.9948269 C514.006629,21.9948269 516.96772,19.136402 516.96772,14.1717694 C516.96772,9.32749155 513.827169,6.37880068 508.652738,6.37880068 L508.652738,6.37880068 Z M535.978678,8.10810811 C538.219567,8.10810811 540,9.89917652 540,12.1534523 C540,14.407728 538.219567,16.1987965 535.978678,16.1987965 C533.737789,16.1987965 531.957356,14.407728 531.957356,12.1534523 C531.957356,9.89917652 533.737789,8.10810811 535.978678,8.10810811 Z",id:"Combined-Shape","fill-rule":"nonzero"}})])]):e._e(),"tablet"===e.viewtype?n("div",{staticClass:"title _C"},[n("svg",{attrs:{viewBox:"0 0 540 60",version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[n("title",[e._v("title_designer")]),n("path",{attrs:{d:"M334.486764,-1.42108547e-14 C343.639226,-1.42108547e-14 349.890417,5.20534206 350.099787,12.78769 L350.099787,12.78769 L343.609316,12.78769 C343.190576,8.42483108 339.631285,5.74693834 334.397033,5.74693834 C329.342242,5.74693834 325.633401,8.2142103 325.633401,12.1859164 C325.633401,15.345228 327.846742,17.4514358 333.439913,18.6549831 L333.439913,18.6549831 L338.165694,19.6479096 C347.198517,21.5735853 350.907358,25.2143159 350.907358,31.5329392 C350.907358,39.7170608 344.506616,44.8622255 334.456854,44.8622255 C324.706191,44.8622255 318.215719,39.9577703 317.796979,32.2249789 L317.796979,32.2249789 L324.317361,32.2249789 C324.915561,36.5276605 328.983322,39.1152872 334.726044,39.1152872 C340.199575,39.1152872 344.117786,36.286951 344.117786,32.405511 C344.117786,29.0355785 341.844625,26.9293708 336.071994,25.6656461 L336.071994,25.6656461 L331.376123,24.6727196 C322.732131,22.83731 318.81392,18.8054265 318.81392,12.5469806 C318.81392,5.11507601 325.304391,-1.42108547e-14 334.486764,-1.42108547e-14 Z M390.059558,-1.42108547e-14 C399.66067,-1.42108547e-14 406.928802,5.71684966 408.424302,14.3823902 L408.424302,14.3823902 L401.545001,14.3823902 C399.92986,8.99651605 395.712549,5.89738176 390.089468,5.89738176 C381.834306,5.89738176 376.869244,11.9752956 376.869244,22.175359 C376.869244,32.5559544 381.983856,38.9648438 390.209108,38.9648438 C397.208049,38.9648438 402.053471,34.4515414 402.143201,27.8621199 L402.143201,27.8621199 L402.143201,27.1099029 L390.986768,27.1099029 L390.986768,21.6638514 L408.753312,21.6638514 L408.753312,26.0868877 C408.753312,37.8515625 401.844101,44.8622255 390.149288,44.8622255 C377.796455,44.8622255 370.019853,36.1665963 370.019853,22.2355363 C370.019853,8.54518581 377.766545,-1.42108547e-14 390.059558,-1.42108547e-14 Z M258.634984,0.722128378 C271.466377,0.722128378 279.063519,8.66554054 279.063519,22.355891 C279.063519,36.0763302 271.496287,44.1400971 258.634984,44.1400971 L258.634984,44.1400971 L243.41079,44.1400971 L243.41079,0.722128378 Z M312.861828,0.722128378 L312.861828,6.52924409 L292.164103,6.52924409 L292.164103,19.2266681 L311.755158,19.2266681 L311.755158,24.823163 L292.164103,24.823163 L292.164103,38.3028927 L312.861828,38.3028927 L312.861828,44.1400971 L285.464261,44.1400971 L285.464261,0.722128378 L312.861828,0.722128378 Z M363.619111,0.722128378 L363.619111,44.1400971 L356.919269,44.1400971 L356.919269,0.722128378 L363.619111,0.722128378 Z M421.375336,0.722128378 L443.748021,32.7364865 L443.987301,32.7364865 L443.987301,0.722128378 L450.507683,0.722128378 L450.507683,44.1400971 L444.465861,44.1400971 L422.093176,12.1558277 L421.823986,12.1558277 L421.823986,44.1400971 L415.303604,44.1400971 L415.303604,0.722128378 L421.375336,0.722128378 Z M485.861312,0.722128378 L485.861312,6.52924409 L465.163587,6.52924409 L465.163587,19.2266681 L484.754642,19.2266681 L484.754642,24.823163 L465.163587,24.823163 L465.163587,38.3028927 L485.861312,38.3028927 L485.861312,44.1400971 L458.463745,44.1400971 L458.463745,0.722128378 L485.861312,0.722128378 Z M509.460308,0.722128378 C518.34358,0.722128378 523.876932,5.89738176 523.876932,13.9912373 C523.876932,19.8585304 520.766291,24.6125422 515.50213,26.3877745 L515.50213,26.3877745 L525.163062,44.1400971 L517.44628,44.1400971 L508.652738,27.4408784 L499.440455,27.4408784 L499.440455,44.1400971 L492.740614,44.1400971 L492.740614,0.722128378 Z M535.978678,31.9787268 C538.219567,31.9787268 540,33.7697952 540,36.0240709 C540,38.2783467 538.219567,40.0694151 535.978678,40.0694151 C533.737789,40.0694151 531.957356,38.2783467 531.957356,36.0240709 C531.957356,33.7697952 533.737789,31.9787268 535.978678,31.9787268 Z M258.006874,6.52924409 L250.110632,6.52924409 L250.110632,38.3028927 L258.006874,38.3028927 C267.159336,38.3028927 272.214128,32.6763091 272.214128,22.4160684 C272.214128,12.1859164 267.129426,6.52924409 258.006874,6.52924409 L258.006874,6.52924409 Z M508.652738,6.37880068 L499.440455,6.37880068 L499.440455,21.9948269 L508.832198,21.9948269 C514.006629,21.9948269 516.96772,19.136402 516.96772,14.1717694 C516.96772,9.32749155 513.827169,6.37880068 508.652738,6.37880068 L508.652738,6.37880068 Z M535.978678,8.10810811 C538.219567,8.10810811 540,9.89917652 540,12.1534523 C540,14.407728 538.219567,16.1987965 535.978678,16.1987965 C533.737789,16.1987965 531.957356,14.407728 531.957356,12.1534523 C531.957356,9.89917652 533.737789,8.10810811 535.978678,8.10810811 Z",id:"Combined-Shape","fill-rule":"nonzero"}})])]):e._e(),n("div",{staticClass:"load-bar",class:{_upper:"tablet"===e.viewtype,"load-bar_LOADED":e.LOADING_PROGRESS>=1},style:e.loadBar}),"tablet"===e.viewtype?n("div",{staticClass:"load-bar _lower",class:{"load-bar_LOADED":e.LOADING_PROGRESS>=1},style:e.loadBar}):e._e()])])])},_=[],O={name:"Loader",components:{},props:[],data:function(){return{loadSpeed:30}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(a["e"])(["viewtype","modal","loading","loadedArr","SIGNS"])),Object(a["c"])(["byType","LOADING_PROGRESS"])),{},{loadBar:function(){if("tablet"!==this.viewtype){var e=46;return this.LOADING_PROGRESS>=1?{transition:"2200ms"}:{transition:"800ms",width:this.LOADING_PROGRESS*e+"%"}}var t=100;return this.LOADING_PROGRESS>=1?{transition:"2200ms"}:{transition:"800ms",width:this.LOADING_PROGRESS*t+"%"}}}),methods:{pushToSIGNS:function(){console.log("pusing to SIGNS...");var e=this.SIGNS.length;this.SIGNS.push(this.loadedArr[e]),this.SIGNS.length===this.loading.filesInServer?(this.loadedArr=[],this.offsetLoadFaker()):setTimeout(this.pushToSIGNS,this.loadSpeed)},offsetLoadFaker:function(){console.log("offset load faker..."),this.loading.fakeOffset<this.loading.faker?(this.loading.fakeOffset+=1,setTimeout(this.offsetLoadFaker,this.loadSpeed)):(this.loading.processing=2,this.modal=1)}},watch:{loadedArr:function(e,t){e?(console.log("-- loading start --"),this.pushToSIGNS()):console.log("-- loading done: ",t,"files")}},created:function(){},mounted:function(){},beforeUpdate:function(){},beforeCreate:function(){}},E=O,y=(n("0fe7"),Object(d["a"])(E,b,_,!1,null,"ac6bb762",null)),I=y.exports,x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"title-sign"}})},R=[],P={name:"TitleSign",components:{},props:[],data:function(){return{}},computed:{},methods:{},created:function(){},mounted:function(){},beforeUpdate:function(){},beforeCreate:function(){}},T=P,M=Object(d["a"])(T,x,R,!1,null,"117b3526",null),k=M.exports,A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"pathmaker"}},[n("canvas",{staticClass:"maker",class:e.byType,style:e.canvasLocation,attrs:{id:"maker"}}),n("div",{attrs:{id:"testModal"}},[n("button",{on:{click:function(t){return e.render()}}},[e._v("render")]),e._v(" "),n("br"),n("button",[e._v("test01")]),e._v(" "),n("br"),n("button",[e._v("test02")]),e._v(" "),n("br"),n("button",[e._v("test03")]),e._v(" "),n("br"),n("button",{on:{click:function(t){return e.SEND()}}},[e._v("SEND")])])])},D=[],z=n("2222"),N={name:"Pathmaker",components:{},props:[],data:function(){return{scope:null,okToWrite:!1,simplifyVal:1.2,relocationInfo:{small:{x:.1,y:.5,w:.8,h:.2},narrow:{x:.1,y:.5,w:.8,h:.2},tablet:{x:.1,y:.5,w:.8,h:.2},wide:{x:.1,y:.5,w:.8,h:.2}},visiblePath:[],canvasLocation:{},scopeSize:{width:0,height:0},relocation:{x:0,y:0},PATHS:[],renderProgress:{path:0,seg:0},renderSpeed:18,RENDERED:[],renPath:[]}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(a["e"])(["winSize","writer"])),Object(a["c"])(["byType","VIEWTYPE"])),{},{X:function(){return this.relocation.x},Y:function(){return this.relocation.y},W:function(){return this.scopeSize.width},H:function(){return this.scopeSize.height}}),methods:Object(r["a"])(Object(r["a"])({},Object(a["d"])(["SEND_PATHS"])),{},{RELOCATE:function(){this.writer.scale=this.getSize("x","vw"),this.relocation.x=this.getSize("x","vw"),this.relocation.y=this.getSize("y","vh"),this.scopeSize.width=this.getSize("w","vw"),this.scopeSize.height=this.getSize("h","vh"),this.canvasLocation={left:this._px(this.X),top:this._px(this.Y),width:this._px(this.W),height:this._px(this.H)},this.scope.view&&(this.scope.view.viewSize.width=this.W,this.scope.view.viewSize.height=this.H)},getSize:function(e,t){return this["relocationInfo"][this.VIEWTYPE][e]*this["winSize"][t]},_px:function(e){return e+"px"},SEND:function(){this.SEND_PATHS();for(var e=0;e<this.visiblePath.length;e++)this.visiblePath[e].remove();this.writer.paths=[]},render:function(){if(this.RENDERED.length)for(var e=0;e<this.RENDERED.length;e++)this.RENDERED[e].remove();this.PATHS=this.writer.paths,this.stroke({pathIndex:this.renderProgress.path,segIndex:this.renderProgress.seg})},stroke:function(e){var t=e.pathIndex,n=e.segIndex,i=new this.scope.Point(this.PATHS[t][n].x,this.PATHS[t][n].y);0===n?(this.renPath=new this.scope.Path({segments:[i],strokeColor:"red",strokeWidth:7,strokeCap:"round"}),this.renderProgress.seg+=1,setTimeout(this.stroke,this.renderSpeed,{pathIndex:this.renderProgress.path,segIndex:this.renderProgress.seg})):n===this.PATHS[t].length-1?(this.renPath.add(i),this.renPath.simplify(this.simplifyVal),this.RENDERED.push(this.renPath),t===this.PATHS.length-1?(console.log("-- RENDER DONE --"),this.renderProgress.path=0,this.renderProgress.seg=0):(this.renderProgress.path+=1,this.renderProgress.seg=0,setTimeout(this.stroke,20*this.renderSpeed,{pathIndex:this.renderProgress.path,segIndex:this.renderProgress.seg}))):(this.renPath.add(i),this.renPath.smooth("continuous"),this.renderProgress.seg+=1,setTimeout(this.stroke,this.renderSpeed,{pathIndex:this.renderProgress.path,segIndex:this.renderProgress.seg}))}}),created:function(){this.scope=new z.PaperScope,this.RELOCATE()},mounted:function(){var e,t=this;this.$nextTick((function(){window.addEventListener("resize",t.RELOCATE)})),this.scope.setup(document.getElementById("maker")),this.scope.view._pixelRatio=1,this.RELOCATE(),console.log(this.scope.view),console.log(document.getElementById("maker").style);var n=[];this.scope.view.onMouseEnter=function(){t.okToWrite=!0},this.scope.view.onMouseLeave=function(){t.okToWrite=!1},this.scope.view.onMouseDown=function(i){t.okToWrite=!0,n=[];var o=new t.scope.Point(i.point.x+t.X,i.point.y+t.Y);e=new t.scope.Path({segments:[o],strokeColor:"white",strokeWidth:5,strokeCap:"round"});var s={x:i.point.x,y:i.point.y};n.push(s)},this.scope.view.onMouseDrag=function(i){if(t.okToWrite){var o=new t.scope.Point(i.point.x+t.X,i.point.y+t.Y);e.add(o),e.smooth("continuous");var s={x:i.point.x,y:i.point.y};n.push(s)}},this.scope.view.onMouseUp=function(){e.simplify(t.simplifyVal),t.visiblePath.push(e),e=[],t.writer.paths.push(n),n=[]}},beforeUpdate:function(){},beforeCreate:function(){}},j=N,G=(n("a997"),Object(d["a"])(j,A,D,!1,null,"c1efa81a",null)),Z=G.exports,B={name:"App",components:{test:p,Background:C,Loader:I,TitleSign:k,Pathmaker:Z},computed:Object(r["a"])(Object(r["a"])({},Object(a["e"])(["test","winSize","loading","loadedArr"])),Object(a["c"])(["byType","FILES_IN_SERVER","LOADING_PROGRESS"])),methods:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(a["d"])(["setBBC","pushToSIGNS","UPDATE_SIGNS"])),Object(a["b"])(["INITIATE","startSignLoad"])),{},{onResize:function(){this.winSize.vw=window.innerWidth,this.winSize.vh=window.innerHeight}}),watch:{LOADING_PROGRESS:function(e,t){this.loading.justLoaded=e-t,e>=1&&(document.querySelector("body").style.overflow="auto")},FILES_IN_SERVER:function(e,t){0===this.loading.processing?(console.log("--- start loading signs ---"),console.log("filesInServer:",e),this.loading.processing=1,this.startSignLoad()):1===this.loading.processing?console.log("loading is already processsing"):(console.log("file index update"),console.log("from:",t," / to:",e))}},created:function(){this.onResize(),this.setBBC({comp:-1,hue:-1}),this.INITIATE()},mounted:function(){var e=this;this.onResize(),this.$nextTick((function(){window.addEventListener("resize",e.onResize)})),this.LOADING_PROGRESS>=1&&(document.querySelector("body").style.overflow="auto")},beforeDestroy:function(){window.removeEventListener("resize",this.onResize)}},W=B,$=(n("5c0b"),Object(d["a"])(W,o,s,!1,null,null,null)),H=$.exports,V=n("8c4f");i["a"].use(V["a"]);var Y=new V["a"]({mode:"history",base:"/",routes:[]}),U=(n("96cf"),n("1da1")),F=n("bc3a"),X=n.n(F),q=n("4487"),J=n.n(q),K=[[-30,30,-40,40,0],[-35,35,-45,45,0],[-30,30,-40,40,180],[0,0,180,180,180],[-20,20,180,180,0]];function Q(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}var ee=J.a.generate({length:12,charset:"alphanumeric"}),te={client:{modal:0},foo:"bar",modal:!0};i["a"].use(a["a"]);var ne=new a["a"].Store({state:{test:te,winSize:{vw:null,vh:null},viewtype:null,modal:0,loadedArr:[],loading:{processing:0,fakeOffset:0,faker:400,filesInServer:0},colorScheme:[],writer:{scale:0,paths:[],info:{userId:ee,name:ee,ip:null,uag:null,inTime:null,writeTime:null,outTime:null}},SIGNS:[]},getters:{MODAL:function(e){return e.test.client.MODAL?e.test.client.modal:e.modal},FILES_IN_SERVER:function(e){return e.loading.filesInServer},FILES_LOADED:function(e){return e.SIGNS.length},LOADING_PROGRESS:function(e){var t;return e.loading.processing<2?(t=(e.SIGNS.length+e.loading.fakeOffset)/(e.loading.filesInServer+e.loading.faker),e.test.client.loading&&(t=1)):t=1,t},BBC:function(e){return e.colorScheme},VIEWTYPE:function(e){return e.winSize.vw<550?e.winSize.vw/e.winSize.vh>.58?(e.viewtype="small","small"):(e.viewtype="narrow","narrow"):e.winSize.vw/e.winSize.vh>1?(e.viewtype="wide","wide"):(e.viewtype="tablet","tablet")},byType:function(e){return{_small:"small"===e.viewtype,_narrow:"narrow"===e.viewtype,_tablet:"tablet"===e.viewtype,_wide:"wide"===e.viewtype}}},mutations:{PUT_INITDATA:function(e,t){return Object(U["a"])(regeneratorRuntime.mark((function n(){var i,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log("$$$ request ...$m/PUT_INITDATA"),e.loading.fakeOffset+=30,e.writer.info.ip=t.ip,e.writer.info.uag=t.uag,console.log(e.writer.info),n.next=7,X.a.get("/load/file-count");case 7:i=n.sent,o=i.data,e.loading.filesInServer=o.jsonCount;case 10:case"end":return n.stop()}}),n)})))()},UPDATE_SIGNS:function(e,t){var n=this;return Object(U["a"])(regeneratorRuntime.mark((function i(){var o,s;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,X.a.post("/load/update",{amount:t});case 2:o=i.sent,s=o.data,e.loadedArr=s,n.pushToSIGNS();case 6:case"end":return i.stop()}}),i)})))()},SEND_PATHS:function(e){return Object(U["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.writer.paths.length){t.next=9;break}return e.writer.info.writeTime=Date.now(),t.next=4,X.a.post("/push/paths",{writer:e.writer});case 4:n=t.sent,i=n.data,200===i.status&&(e.modal=2),t.next=10;break;case 9:console.log("draw signs first!");case 10:case"end":return t.stop()}}),t)})))()},setBBC:function(e,t){var n,i,o=t.comp,s=t.hue;n=o<0?K[Q(0,K.length)]:K[o],i=s<0?Q(0,361):s,e.colorScheme=[i,i+n[0],i+n[1],i+n[2],i+n[3],i+n[4]]},CHECK_FILES:function(){},LOAD_FILES:function(){},SEND_PATH:function(){}},actions:{INITIATE:function(e){return Object(U["a"])(regeneratorRuntime.mark((function t(){var n,i,o,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,i=e.state,console.log("==== INITIATING REQUEST ===="),t.next=4,X.a.post("/init/enter",{userId:ee});case 4:o=t.sent,s=o.data,i.writer.info.inTime=Date.now(),n("PUT_INITDATA",{ip:s.ip,uag:s.uag});case 8:case"end":return t.stop()}}),t)})))()},startSignLoad:function(e){return Object(U["a"])(regeneratorRuntime.mark((function t(){var n,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.state,console.log("initiating_SIGNLOAD ...$a/startSingLoad"),n.loading.fakeOffset+=40,t.next=5,X.a.get("/load/initial");case 5:i=t.sent,o=i.data,console.log(o),n.loadedArr=o.arg;case 9:case"end":return t.stop()}}),t)})))()}}});i["a"].config.productionTip=!1,new i["a"]({router:Y,store:ne,render:function(e){return e(H)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var i=n("9c0c"),o=n.n(i);o.a},6:function(e,t){},7:function(e,t){},7506:function(e,t,n){"use strict";var i=n("e1a4"),o=n.n(i);o.a},8:function(e,t){},9:function(e,t){},"9c0c":function(e,t,n){},"9dab":function(e,t,n){"use strict";var i=n("fcb3"),o=n.n(i);o.a},a997:function(e,t,n){"use strict";var i=n("53d8"),o=n.n(i);o.a},e1a4:function(e,t,n){},fcb3:function(e,t,n){}});
//# sourceMappingURL=app.b51a1686.js.map