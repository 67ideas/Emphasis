/*
  Emphasis
  by Michael Donohoe (@donohoe)
  https://github.com/NYTimes/Emphasis
  http://open.blogs.nytimes.com/2011/01/10/emphasis-update-and-source/
  Requires PrototypeJS library (http://prototypejs.org/download)
*/
(function(){
var _1={
  lev:function(a,b){var m=a.length;var n=b.length;var r=[];r[0]=[];if(m<n){var c=a;a=b;b=c;var o=m;m=n;n=o;}for(var c=0;c<n+1;c++){r[0][c]=c;}for(var i=1;i<m+1;i++){r[i]=[];r[i][0]=i;for(var j=1;j<n+1;j++){r[i][j]=this.smallest(r[i-1][j]+1,r[i][j-1]+1,r[i-1][j-1]+((a.charAt(i-1)==b.charAt(j-1))?0:1));}}return r[m][n];},
  init:function(){this.config();this.pl=false;this.p=false;this.h=false;this.s=false;this.vu=false;this.kh="|";this.addCSS();this.readHash();Event.observe(window,"keydown",this.keydown);},
  config:function(){
    this.paraSelctors=$$(".entry p:not(p[class]):not(:empty)", ".post p:not(p[class]):not(:empty)", "article p:not(p[class]):not(:empty)");
    this.classReady="emReady";this.classActive="emActive";this.classHighlight="emHighlight";this.classInfo="emInfo";this.classAnchor="emAnchor";this.classActiveAnchor="emActiveAnchor";},
  addCSS:function(){var st=document.createElement("style");st.innerHTML="p."+this.classActive+" span { background-color:#f2f4f5; } p span."+this.classHighlight+" { background-color:#fff0b3; } span."+this.classInfo+" { position:absolute; margin:-1px 0px 0px -8px; padding:0; font-size:10px; background-color: transparent !important} span."+this.classInfo+" a { text-decoration: none; } a."+this.classActiveAnchor+" { color: #000; font-size: 11px; }";document.getElementsByTagName("head")[0].appendChild(st);},
  ordinal:function(n){var sfx=["th","st","nd","rd"],val=n%100;return n+(sfx[(val-20)%10]||sfx[val]||sfx[0]);},
  findKey:function(key){var pl=this.paragraphList();var ln=pl.keys.length;var ix=false;var el=false;for(var i=0;i<ln;i++){if(key==pl.keys[i]){return{index:i,elm:pl.list[i]};}else{if(!ix){var ls=this.lev(key.slice(0,3),pl.keys[i].slice(0,3));var le=this.lev(key.slice(-3),pl.keys[i].slice(-3));if((ls+le)<3){ix=i;el=pl.list[i];}}}}return{index:ix,elm:el};},
  keydown:function(e){var _15=_1;var kc=e.keyCode;_15.kh=_15.kh+kc+"|";if(_15.kh.indexOf("|16|16|")>-1){_15.vu=(_15.vu)?false:true;_15.paragraphInfo(_15.vu);}setTimeout(function(){_15.kh="|";},500);},
  smallest:function(x,y,z){if(x<y&&x<z){return x;}if(y<x&&y<z){return y;}return z;},rtrim:function(txt){return txt.replace(/\s+$/,"");},
  readHash:function(){var lh=location.hash;var p=false,h=[],s={};if(lh.indexOf("[")<0&&lh.indexOf("]")<0){var a,re=/[ph][0-9]+|s[0-9,]+|[0-9]/g;if(lh){while((a=re.exec(lh))!==null){var f=a[0].substring(0,1);var r=a[0].substring(1);if(f=="p"){p=parseInt(r);}else{if(f=="h"){h.push(parseInt(r));}else{a=r.split(",");for(var i=0;i<a.length;i++){a[i]=parseInt(a[i]);}s[h[h.length-1]]=a;}}}}}else{var _c=lh.match(/p\[([^[\]]*)\]/);var _d=lh.match(/h\[([^[\]]*)\]/);var _e,hi;p=(_c&&_c.length>0)?_c[1]:false;hi=(_d&&_d.length>0)?_d[1]:false;if(hi){hi=hi.match(/[a-zA-Z]+(,[0-9]+)*/g);for(var i=0;i<hi.length;i++){var a=hi[i].split(",");var key=a[0];var pos=this.findKey(key)["index"];if(pos!=_e){h.push(parseInt(pos)+1);var b=a;b.shift();if(b.length>0){for(var j=1;j<b.length;j++){b[j]=parseInt(b[j]);}}s[h[h.length-1]]=b;}}}}this.p=p;this.h=h;this.s=s;this.goAnchor(p);this.goHighlight(h,s);},
  goAnchor:function(p){if(!p){return;}var pg=(isNaN(p))?this.findKey(p)["elm"]:(this.paragraphList().list[p-1]||false);var _53=this;if(pg){setTimeout(function(){pg.scrollTo();},500);}},
  createKey:function(p){var key="";var len=6;var txt=(p.innerText||p.textContent||"").replace(/[^a-z\. ]+/gi,"");if(txt&&txt.length>1){var _43=this.getSentences(txt);var _44=this.cleanArray(_43[0].replace(/[\s\s]+/gi," ").split(" ")).slice(0,(len/2));var _45=this.cleanArray(_43[_43.length-1].replace(/[\s\s]+/gi," ").split(" ")).slice(0,(len/2));var k=_44.concat(_45);var max=(k.length>len)?len:k.length;for(var i=0;i<max;i++){key+=k[i].substring(0,1);}}return key;},
  cleanArray:function(a){var n=[];for(var i=0;i<a.length;i++){if(a[i]&&a[i].replace(/ /g,"").length>0){n.push(a[i]);}}return n;},
  goHighlight:function(h,s){if(!h){return;}var _56=h.length;for(var i=0;i<_56;i++){var _58=this.paragraphList().list[h[i]-1]||false;if(_58){var _59=s[h[i].toString()]||false;var _5a=!_59||_59.length==0;var _5b=this.getSentences(_58);var _5c=_5b.length;for(var j=0;j<_5c;j++){var k=(_5a)?j:_59[j]-1;_5b[j]="<span data-num='"+(j+1)+"'>"+_5b[j]+"</span>";}for(var j=0;j<_5c;j++){var k=(_5a)?j:_59[j]-1;var _5f=_5b[k]||false;if(_5f){_5b[k]=_5b[k].replace("<span","<span class='"+this.classHighlight+"'");}}_58.setAttribute("data-sentences",_5c);_58.innerHTML=_5b.join(". ").replace(/__DOT__/g,".").replace(/<\/span>\./g,".</span>");_58.addClassName("emReady");}}},
  updateAnchor:function(an){this.p=an.getAttribute("data-key");this.removeAllClasses("a",this.classActiveAnchor);an.addClassName(this.classActiveAnchor);},
  getSentences:function(el){var _61=(typeof el=="string")?el:el.innerHTML;var _62="Mr,Ms,Mrs,Miss,Msr,Dr,Gov,Pres,Sen,Prof,Gen,Rep,St,Messrs,Col,Sr,Jf,Ph,Sgt,Mgr,Fr,Rev,No,Jr,Snr";var _63="A,B,C,D,E,F,G,H,I,J,K,L,M,m,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,etc,oz,cf,viz,sc,ca,Ave,St";var _64="Calif,Mass,Penn,AK,AL,AR,AS,AZ,CA,CO,CT,DC,DE,FL,FM,GA,GU,HI,IA,ID,IL,IN,KS,KY,LA,MA,MD,ME,MH,MI,MN,MO,MP,MS,MT,NC,ND,NE,NH,NJ,NM,NV,NY,OH,OK,OR,PA,PR,PW,RI,SC,SD,TN,TX,UT,VA,VI,VT,WA,WI,WV,WY,AE,AA,AP,NYC,GB,IRL,IE,UK,GB,FR";var _65="0,1,2,3,4,5,6,7,8,9";var _66="aero,asia,biz,cat,com,coop,edu,gov,info,int,jobs,mil,mobi,museum,name,net,org,pro,tel,travel,xxx";var _67="www";var d="__DOT__";var _69=(_63+","+_64+","+_65+","+_67).split(",");var len=_69.length;for(var i=0;i<len;i++){_61=_61.replace(new RegExp((" "+_69[i]+"\\."),"g"),(" "+_69[i]+d));}_69=(_62+","+_65).split(",");len=_69.length;for(var i=0;i<len;i++){_61=_61.replace(new RegExp((_69[i]+"\\."),"g"),(_69[i]+d));}_69=(_66).split(",");len=_69.length;for(var i=0;i<len;i++){_61=_61.replace(new RegExp(("\\."+_69[i]),"g"),(d+_69[i]));}var _6c=this.cleanArray(_61.split(". "));return _6c;},
  paragraphInfo:function(_2a){if(_2a){var _2b=(document.body.select("span."+this.classInfo)[0])?true:false;if(!_2b){var pl=this.paragraphList();var len=pl.list.length;for(var i=0;i<len;i++){var _2f=pl.list[i]||false;if(_2f){var key=pl.keys[i];var _31=(key==this.p)?(" "+this.classActiveAnchor):"";_2f.innerHTML="<span class='"+this.classInfo+"'><a class='"+this.classAnchor+_31+"' href='#p["+key+"]' data-key='"+key+"' title='Link to "+this.ordinal(i+1)+" paragraph'>&para;</a></span>"+_2f.innerHTML;}}}}else{var _32=document.body.select("span.paragraphInfo");var len=_32.length;for(var i=0;i<len;i++){_32[i].remove();}this.removeAllClasses(this.classActive);}},
  paragraphList:function(){if(this.pl){return this.pl;}var _17=this;var _18=[];var _19=[];var c=0;var len=this.paraSelctors.length;for(var p=0;p<len;p++){var pr=this.paraSelctors[p];if((pr.innerText||pr.textContent||"").length>0){var k=_17.createKey(pr);_18.push(pr);_19.push(k);pr.setAttribute("data-key",k);pr.setAttribute("data-num",c);Event.observe(pr,"click",function(e){_17.paragraphClick(e);});c++;}}this.pl={list:_18,keys:_19};return this.pl;},
  updateURLHash:function(){var h="h[";var _35=$$("p.emReady");var _36=_35.length;for(var p=0;p<_36;p++){var key=_35[p].getAttribute("data-key");if(_35[p].hasClassName(this.classHighlight)){h+=","+key;}else{var _39=_35[p].select("span."+this.classHighlight);var _3a=_39.length;var _3b=_35[p].getAttribute("data-sentences");if(_3a>0){h+=","+key;}if(_3b!=_3a){for(var s=0;s<_3a;s++){h+=","+_39[s].getAttribute("data-num");}}}}var _3d=((this.p)?"p["+this.p+"],":"");var _3e=(_3d+(h.replace("h[,","h[")+"]")).replace(",h[]","");location.hash=_3e;},
  paragraphClick:function(e){if(!this.vu){return;}var _21=false;var pr=(e.currentTarget.nodeName=="P")?e.currentTarget:false;var sp=(e.target.nodeName=="SPAN")?e.target:false;var an=(e.target.nodeName=="A")?e.target:false;if(an){if(!an.hasClassName(this.classActiveAnchor)){this.updateAnchor(an);_21=true;e.preventDefault();}}if(!pr&&!sp){this.removeAllClasses("p",this.classActive);return;}if(pr.hasClassName(this.classReady)){if(!pr.hasClassName(this.classActive)&&(sp&&!sp.hasClassName(this.classHighlight))){this.removeAllClasses("p",this.classActive);pr.addClassName(this.classActive);}else{if(!pr.hasClassName(this.classActive)){this.removeAllClasses("p",this.classActive);pr.addClassName(this.classActive);}if(sp){sp.toggleClassName(this.classHighlight);_21=true;}}}else{var _25=this.getSentences(pr);var _26=_25.length;for(var j=0;j<_26;j++){_25[j]="<span data-num='"+(j+1)+"'>"+this.rtrim(_25[j])+"</span>";}var txt=_25.join(". ").replace(/__DOT__/g,".").replace(/<\/span>\./g,".</span>");var chr=txt.substring(txt.length-8).charCodeAt(0);if("|8221|63|46|41|39|37|34|33|".indexOf(chr)==-1){txt+=".";}pr.innerHTML=txt;pr.setAttribute("data-sentences",_26);this.removeAllClasses("p",this.classActive);pr.addClassName(this.classActive);pr.addClassName(this.classReady);_21=true;}if(_21){this.updateURLHash();}},
  removeAllClasses:function(tag,_81){if(!_81||!tag){return;}var els=$$((tag+"."+_81));for(var i=0;i<els.length;i++){els[i].removeClassName(_81);}}};
Event.observe(window, 'load', function(){ Emphasis.init(); });
})();
