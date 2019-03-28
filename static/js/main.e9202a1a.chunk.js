(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,r){e.exports=r(69)},69:function(e,t,r){"use strict";r.r(t);var a=r(1),n=r.n(a),c=r(36),o=r.n(c),s=r(12),u=r(13),i=r(16),l=r(14),h=r(17),f=function(e){return n.a.createElement("button",{onClick:function(){e.onClick()}},e.buttonName)},C=r(11),p={CHARACTERS_FETCH_START:"CHARACTERS_FETCH_START",CHARACTERS_FETCH_SUCCESS:"CHARACTER_FETCH_SUCCESS",CHARACTERS_FETCH_FAILURE:"CHARACTERS_FETCH_FAILURE",FETCH_CHARACTER_START:"FETCH_CHARACTER_START",FETCH_CHARACTER_SUCCESS:"FETCH_CHARACTER_SUCCESS",FETCH_CHARACTER_FAILURE:"FETCH_CHARACTER_FAILURE"},E={BOOKS_FETCH_START:"BOOKS_FETCH_START",BOOKS_FETCH_SUCCESS:"BOOKS_FETCH_SUCCESS",BOOKS_FETCH_FAILURE:"BOOKS_FETCH_FAILURE"},S={HOUSES_FETCH_START:"HOUSES_FETCH_START",HOUSES_FETCH_SUCCESS:"HOUSES_FETCH_SUCCESS",HOUSES_FETCH_FAILURE:"HOUSES_FETCH_FAILURE"},d=r(19);function T(e){return null==e||0===e.length}function g(e){return Object.keys(e).filter(function(e){return"id"!==e}).map(function(t){return t+"="+e[t]}).join("&")}function b(e){return void 0===e||null===e||""===e}function H(e){var t=e.split("/");return+t[t.length-1]}function v(e,t,r){return!!t[r.id]&&t[r.id].toLowerCase().includes(e.value.toLowerCase())}function O(e,t,r){return t=null===t||void 0===t?-1/0:t,"string"===typeof(e=null===e||void 0===e?-1/0:e)&&((e=e.toLowerCase()).startsWith("the ")?e=e.slice(4):e.startsWith("a ")&&(e=e.slice(2))),"string"===typeof t&&((t=t.toLowerCase()).startsWith("the ")?t=t.slice(4):t.startsWith("a ")&&(t=t.slice(2))),e>t?1:e<t?-1:0}var R=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(r=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(n)))).state={pageSize:10,filterUnknownCulture:!1},r.getMoreCharacters=function(){r.props.fetchCharacters({page:+r.props.lastPageRequested+1})},r.characterValidator=function(e){return e.name=b(e.name)?e.aliases[0]+"*":e.name,e},r.updateCultureFilter=function(){r.setState({filterUnknownCulture:!r.state.filterUnknownCulture})},r.changePageSize=function(e){r.setState({pageSize:e})},r.filterCharacterByCulture=function(e){return!r.state.filterUnknownCulture||!b(e.culture)},r.componentDidMount=function(){r.props.lastPageRequested<1&&r.props.fetchCharacters({page:1})},r.componentDidUpdate=function(){},r}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=Object.values(this.props.characters).filter(function(t){return e.filterCharacterByCulture(t)}),r=[{Header:"Name",accessor:"name",id:"characterName",Footer:"*alias",filterable:!0,filterMethod:v},{Header:"Gender",accessor:"gender",filterable:!0,filterMethod:function(e,t){return t.gender.toLowerCase().startsWith(e.value.toLowerCase())}},{Header:"Culture",accessor:"culture",id:"culture",Cell:function(e){return n.a.createElement("span",null,b(e.value)?"unknown":e.value)},filterable:!0,filterMethod:v,Footer:n.a.createElement("span",null,"Filter Unknown: ",n.a.createElement("input",{type:"checkbox",onChange:this.updateCultureFilter,checked:this.state.filterUnknownCulture}))}];return n.a.createElement("div",null,n.a.createElement(d.a,{data:t,columns:r,resolveData:function(t){return t.map(function(t){return e.characterValidator(t)})},pageSize:this.state.pageSize,onPageSizeChange:this.changePageSize,showFilters:!0,loading:this.props.fetchingCharacters}),n.a.createElement(f,{onClick:this.getMoreCharacters,buttonName:"Get More Characters"}))}}]),t}(a.Component),_=Object(C.b)(function(e){return{characters:e.characters.list,lastPageRequested:e.characters.lastPageRequested,fetchingCharacters:e.characters.fetching}},function(e){return{fetchCharacters:function(t){return e({type:p.CHARACTERS_FETCH_START,payload:t})}}})(R),A=(r(30),function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(r=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(n)))).state={bookFilter:"",pageSize:15},r.updateFilter=function(e){r.setState({bookFilter:e.target.value})},r.changePageSize=function(e){r.setState({pageSize:e})},r.reformatBookTitle=function(e){return e.startsWith("The")?e.slice(4).concat(", The"):e.startsWith("A")?e.slice(2).concat(", A"):e},r.convertApiDateToFriendlyDate=function(e){return new Date(e).toLocaleDateString()},r}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=[{Header:"Title",accessor:"name",showFilter:!0,id:"bookTitle",Cell:function(t){return n.a.createElement("span",{className:"book-title"},e.reformatBookTitle(t.value))},filterMethod:v,sorthMethod:O},{Header:"Number of Pages",accessor:"numberOfPages",id:"numberOfPages",filterable:!1},{Header:"Release Date",accessor:"released",Cell:function(t){return n.a.createElement("span",{className:"book release-date"},e.convertApiDateToFriendlyDate(t.value))},filterable:!0}];return n.a.createElement("div",{className:"book-container"},n.a.createElement(d.a,{data:Object.values(this.props.books),columns:t,loading:this.props.fetchingBooks,showFilters:!0,filterable:!0,pageSize:this.state.pageSize,onPageSizeChange:this.changePageSize,pageSizeOptions:[5,10,15]}))}},{key:"componentDidMount",value:function(){this.setState({bookFilter:""})}}]),t}(a.Component)),m=Object(C.b)(function(e){return{books:e.books.list,fetchingBooks:e.books.fetching}},function(e){return{fetchBooks:function(){return e({type:E.BOOKS_FETCH_START})}}})(A),F=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(r=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(n)))).state={houseFilter:"",pageSize:20},r.getMoreHouses=function(){r.props.fetchHouses({page:+r.props.lastPageRequested+1})},r.updateFilter=function(e){r.setState({houseFilter:e.target.value})},r.changePageSize=function(e){r.setState({pageSize:e})},r.reformatHouseTitle=function(e){return e.startsWith("The")?e.slice(4).concat(", The"):e.startsWith("A")?e.slice(2).concat(", A"):e},r.convertApiDateToFriendlyDate=function(e){return new Date(e).toLocaleDateString()},r.resolveHouseData=function(e){var t=H(e.currentLord);return r.props.characters[t]&&(e.lordName=r.props.characters[t].name),e},r.componentDidMount=function(){r.props.lastPageRequested<1&&r.props.fetchHouses({page:1})},r.componentDidUpdate=function(){Object.values(r.props.houses).filter(function(e){return e.currentLord&&!e.lordName}).forEach(function(e){return r.props.fetchCharacter({id:H(e.currentLord)})})},r}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=[{Header:"Name",accessor:"name",filterMethod:v},{Header:"Region",accessor:"region",filterMethod:v,sortMethod:O,Cell:function(e){return n.a.createElement("span",null,e.value?e.value:"region unknown")}},{Header:"Current Lord link",accessor:"currentLord",filterable:!1,show:!1},{Header:"Current Lord",accessor:"lordName",filterable:!0,Cell:function(e){return n.a.createElement("span",null,e.value?e.value:"Name unknown")},filterMethod:v}];return n.a.createElement("div",{className:"house-container"},n.a.createElement(d.a,{data:Object.values(this.props.houses),resolveData:function(t){return t.map(e.resolveHouseData)},columns:t,loading:this.props.fetchingHouses,showFilters:!0,filterable:!0,pageSize:this.state.pageSize,onPageSizeChange:this.changePageSize}),n.a.createElement(f,{onClick:this.getMoreHouses,buttonName:"Get More Houses"}))}}]),t}(a.Component),w=Object(C.b)(function(e){return{houses:e.houses.list,lastPageRequested:e.houses.lastPageRequested,fetchingHouses:e.houses.fetching,characters:e.characters.list}},function(e){return{fetchHouses:function(t){return e({type:S.HOUSES_FETCH_START,payload:t})},fetchCharacter:function(t){return e({type:p.FETCH_CHARACTER_START,payload:t})}}})(F),k=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(r=Object(i.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(n)))).state={viewBooks:!1,viewCharacters:!1,viewHouses:!0},r.changeView=function(e){var t=!1,a=!1,n=!1;switch(e.target.value){case"books":t=!0;break;case"characters":a=!0;break;case"houses":n=!0}r.setState({viewBooks:t,viewCharacters:a,viewHouses:n})},r.componentDidMount=function(){r.props.fetchBooks()},r}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("div",{id:"selector",align:"center"},n.a.createElement("span",null,n.a.createElement("button",{value:"books",onClick:this.changeView,className:"view-selector-button"},"View Books")),n.a.createElement("span",null,n.a.createElement("button",{value:"characters",onClick:this.changeView,className:"view-selector-button"},"View Characters")),n.a.createElement("span",null,n.a.createElement("button",{value:"houses",onClick:this.changeView,className:"view-selector-button"},"View Houses"))),this.state.viewCharacters?n.a.createElement(_,null):"",this.state.viewBooks?n.a.createElement(m,null):"",this.state.viewHouses?n.a.createElement(w,null):"")}}]),t}(a.Component),j=Object(C.b)(null,function(e){return{fetchBooks:function(){return e({type:E.BOOKS_FETCH_START})}}})(k);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var U=r(18),y=r(8),x={fetching:!1,list:{},error:null,lastPageRequested:0};var B=r(38),L={fetching:!1,list:{},error:null,lastPageRequest:0};var P=r(7),z=r.n(P),D=r(21),M=r.n(D),N=function(){var e="https://www.anapioficeandfire.com/api";return{books:{fetchAll:function(){return M()({method:"get",url:"https://www.anapioficeandfire.com/api/books?pageSize=20"})}},characters:{fetch:function(t){var r=T(t)?"":"?"+g(t),a=e+"/characters"+r;return M()({method:"get",url:a})},fetchOne:function(t){var r=e+"/characters/"+t.id;return console.log(r),M()({method:"get",url:r})}},houses:{fetch:function(t){var r=T(t)?"":"?"+g(t),a=e+"/houses"+r;return M()({method:"get",url:a})}}}},q=r(6),I=z.a.mark(V),K=z.a.mark(G),W=z.a.mark(J);function V(e){var t,r;return z.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(q.a)(N().characters.fetch,e.payload);case 3:return t=a.sent,r=e.payload.page,a.next=7,Object(q.b)({type:p.CHARACTERS_FETCH_SUCCESS,data:t,lastPageRequested:r});case 7:a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(0),a.next=13,Object(q.b)({type:p.CHARACTERS_FETCH_FAILURE,error:a.t0});case 13:case"end":return a.stop()}},I,null,[[0,9]])}function G(e){var t;return z.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(q.a)(N().characters.fetchOne,e.payload);case 3:return t=r.sent,r.next=6,Object(q.b)({type:p.FETCH_CHARACTER_SUCCESS,data:t});case 6:r.next=12;break;case 8:return r.prev=8,r.t0=r.catch(0),r.next=12,Object(q.b)({type:p.FETCH_CHARACTER_FAILURE,error:r.t0});case 12:case"end":return r.stop()}},K,null,[[0,8]])}function J(){return z.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.c)(p.CHARACTERS_FETCH_START,V);case 2:return e.next=4,Object(q.c)(p.FETCH_CHARACTER_START,G);case 4:case"end":return e.stop()}},W)}var $=z.a.mark(X),Q=z.a.mark(Y);function X(){var e;return z.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(q.a)(N().books.fetchAll);case 3:return e=t.sent,t.next=6,Object(q.b)({type:E.BOOKS_FETCH_SUCCESS,data:e});case 6:t.next=12;break;case 8:return t.prev=8,t.t0=t.catch(0),t.next=12,Object(q.b)({type:E.BOOKS_FETCH_FAILURE,error:t.t0});case 12:case"end":return t.stop()}},$,null,[[0,8]])}function Y(){return z.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.c)(E.BOOKS_FETCH_START,X);case 2:case"end":return e.stop()}},Q)}var Z={fetching:!1,list:{},error:null,lastPageRequested:0};var ee=z.a.mark(re),te=z.a.mark(ae);function re(e){var t,r;return z.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Object(q.a)(N().houses.fetch,e.payload);case 3:return t=a.sent,r=e.payload.page,a.next=7,Object(q.b)({type:S.HOUSES_FETCH_SUCCESS,data:t,lastPageRequested:r});case 7:a.next=13;break;case 9:return a.prev=9,a.t0=a.catch(0),a.next=13,Object(q.b)({type:S.HOUSES_FETCH_FAILURE,error:a.t0});case 13:case"end":return a.stop()}},ee,null,[[0,9]])}function ae(){return z.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.c)(S.HOUSES_FETCH_START,re);case 2:case"end":return e.stop()}},te)}var ne=Object(U.c)({characters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p.CHARACTERS_FETCH_START:return Object(y.a)({},e,{fetching:!0,error:null});case p.CHARACTERS_FETCH_SUCCESS:var r={};return t.data.data.forEach(function(e){return r[H(e.url)]=e}),Object(y.a)({},e,{fetching:!1,list:Object(y.a)({},e.list,r),lastPageRequested:t.lastPageRequested});case p.CHARACTERS_FETCH_FAILURE:return Object(y.a)({},e,{fetching:!1,error:t.error});case p.FETCH_CHARACTER_START:return Object(y.a)({},e,{error:null});case p.FETCH_CHARACTER_SUCCESS:var a={};return a[H(t.data.data.url)]=t.data.data,Object(y.a)({},e,{list:Object(y.a)({},e.list,a)});default:return e}},books:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E.BOOKS_FETCH_START:return Object(y.a)({},e,{fetching:!0,error:null});case E.BOOKS_FETCH_SUCCESS:return Object(y.a)({},e,{fetching:!1,list:t.data.data});case E.BOOKS_FETCH_FAILURE:return Object(y.a)({},e,{fetching:!1,error:t.error});default:return e}},houses:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Z,t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case S.HOUSES_FETCH_START:return Object(y.a)({},e,{fetching:!0,error:null});case S.HOUSES_FETCH_SUCCESS:var r={};return t.data.data.forEach(function(e){return r[H(e.url)]=e}),Object(y.a)({},e,{fetching:!1,list:Object(y.a)({},e.list,r),lastPageRequested:t.lastPageRequested});case S.HOUSES_FETCH_FAILURE:return Object(y.a)({},e,{fetching:!1,error:t.error});default:return e}}}),ce=Object(B.a)(),oe=Object(U.e)(ne,Object(U.a)(ce));ce.run(Y),ce.run(J),ce.run(ae),o.a.render(n.a.createElement(C.a,{store:oe},n.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[39,1,2]]]);
//# sourceMappingURL=main.e9202a1a.chunk.js.map