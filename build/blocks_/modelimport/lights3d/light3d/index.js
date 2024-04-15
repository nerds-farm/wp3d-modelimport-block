(()=>{"use strict";var e,t={574:()=>{const e=window.wp.blocks,t=window.wp.element,l=window.wp.i18n,a=window.wp.components,o=window.wp.blockEditor,n=window.wp.data,r=function(e){const[n,r]=(0,t.useState)(0),[i,m]=(0,t.useState)(""),[c,s]=(0,t.useState)({id:0,url:"",alt:"",title:""});(0,t.useEffect)((()=>{}),[]);const d=t=>{e.onAdd(t),s({id:t.id,url:t.url,alt:t.alt,title:t.title})};return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"choose-wp3d"},(0,t.createElement)("h3",null,(0,t.createElement)(a.Icon,{icon:"format-image"})," ",e.label?(0,l.__)(e.label,"wp3d-modelimport"):(0,l.__)("Image","wp3d-modelimport")),(0,t.createElement)(o.MediaUploadCheck,null,(0,t.createElement)(o.MediaUpload,{onSelect:d,value:e.value.id,allowedTypes:["image"],multiple:!1,render:o=>{let{open:n}=o;return(0,t.createElement)(a.Button,{className:0==e.value.id?"editor-post-featured-image__toggle":"editor-post-featured-image__preview",onClick:n},e.value.id?(0,t.createElement)("img",{src:e.value.url}):(0,t.createElement)("div",null,e.chooselabel?(0,l.__)(e.chooselabel+" "+e.mimetype,"wp3d-modelimport"):(0,l.__)("Choose an image","wp3d-modelimport")))}})),0!=e.value.id&&(0,t.createElement)(a.PanelRow,null,(0,t.createElement)(o.MediaUploadCheck,null,(0,t.createElement)(o.MediaUpload,{title:(0,l.__)("Replace","wp3d-modelimport"),value:e.value.id,onSelect:d,allowedTypes:["image"],render:e=>{let{open:o}=e;return(0,t.createElement)(a.Button,{variant:"secondary",onClick:o},(0,l.__)("Replace","wp3d-modelimport"))}})),(0,t.createElement)(o.MediaUploadCheck,null,(0,t.createElement)(a.Button,{isDestructive:!0,onClick:()=>{e.onRemove(),s({id:0,url:"",alt:"",title:""})}},(0,l.__)("Remove","wp3d-modelimport"))))))},i=window.wp.compose;function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a])}return e},m.apply(this,arguments)}const c=JSON.parse('{"u2":"wp3d/model-light3d"}');(0,e.registerBlockType)(c.u2,{example:{attributes:{message:"SVG Extrusion"}},edit:function e(m){let{attributes:c,setAttributes:s,clientId:d}=m;const g=(0,o.useBlockProps)(),p=(0,t.useRef)(),[_,h]=((0,i.useInstanceId)(e),(0,t.useState)(null)),[u,w]=(0,t.useState)(-1),{ide:y,light_type:b,light_color:v,light_intensity:E,light_decay:k,light_penumbra:C,light_angle:f,light_distance:x,lightpoint_fly:S,geometry_light_posx:L,geometry_light_posy:R,geometry_light_posz:F,geometry_light_targetx:O,geometry_light_targety:P,geometry_light_targetz:B,light_map:M,geometry_shadow_focus:N,enable_shadows:V,geometry_shadow_radius:j,geometry_shadow_blurSamples:I}=c;function z(e,t){let l=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];s(t),c[e]=t[e],l&&jQuery(p.current).data("light").repeaterChange(y,e,c)}(0,t.useEffect)((()=>{s({ide:`wp3d-light3d-${d}`})}),[]),(0,t.useEffect)((()=>{h(jQuery(p.current).data("light"))}),[y]);const{getSelectedBlock:T,getBlockHierarchyRootClientId:Q,getSelectedBlockClientId:A,getBlockAttributes:D,getBlockIndex:U}=(0,n.useSelect)((e=>e("core/block-editor"))),H=(T(),A()),J=Q(d),G=(D(A()),U(H)),X=(0,n.useSelect)((e=>e("core/block-editor").getSelectedBlock()));return(0,t.useEffect)((()=>{H==J&&console.log("+++ LIGHTS root +++"),d==H?(G!=u&&console.log("LightS active",G,H),w(G),console.log("MMMMMMM",jQuery(p.current).data("light")),jQuery(p.current).data("light")&&(jQuery(p.current).data("light").updateHelperMesh(y),jQuery(p.current).data("light").on("transformcontrolchange",(e=>{const t={posx:e[0],posy:e[1],posz:e[2]};console.log("obpos",t),function(){let e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1?arguments[1]:void 0;t&&(z("geometry_light_posx",{geometry_light_posx:t.posx},e),z("geometry_light_posy",{geometry_light_posy:t.posy},e),z("geometry_light_posz",{geometry_light_posz:t.posz},e))}(!1,t)})))):(w(-1),jQuery(p.current).data("light")&&(jQuery(p.current).data("light").updateHelperMesh(),jQuery(p.current).data("light").off("transformcontrolchange")))}),[X]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",g,(0,t.createElement)("div",{ref:p,id:y,className:"wp3d-light3d-itemlight","data-settings":JSON.stringify(c)},(0,t.createElement)("span",{className:"wp3d-trace"},(0,t.createElement)("span",{className:"wp3d-trace-name"},(0,t.createElement)("span",{className:"dashicon dashicons dashicons-light-wp3d"})," ",(0,l.__)("Light","wp3d-block")," "),(0,t.createElement)("span",{className:"wp3d-trace-type"},(e=>{let t=null;switch(e){case"pointLight":t=(0,l.__)("Point Light","wp3d-block");break;case"directionalLight":t=(0,l.__)("Directional Light","wp3d-block");break;case"spotLight":t=(0,l.__)("Spot Light","wp3d-block")}return t})(b)),(0,t.createElement)("span",{className:"wp3d-trace-color"},(0,t.createElement)("div",{className:"wp3d-colorpicker",style:{backgroundColor:`${v}`}}))))),(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Light","wp3d-modelimport"),initialOpen:!0},(0,t.createElement)(a.SelectControl,{label:(0,l.__)("Light Type","wp3d-modelimport"),value:b,options:[{label:(0,l.__)("Point","wp3d-block"),value:"pointLight"},{label:(0,l.__)("Directional","wp3d-block"),value:"directionalLight"},{label:(0,l.__)("Spot","wp3d-block"),value:"spotLight"}],onChange:e=>{z("light_type",{light_type:e})}}),(0,t.createElement)(a.ColorPicker,{label:(0,l.__)("Light Color","wp3d-modelimport"),color:v,onChange:e=>z("light_color",{light_color:e}),defaultValue:"#FFF"}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Intensity","wp3d-modelimport"),value:E,onChange:e=>z("light_intensity",{light_intensity:e}),min:0,max:20,step:.01,resetFallbackValue:1}),(0,t.createElement)("h3",{className:"panelbody-heading"},(0,t.createElement)(a.Icon,{icon:"admin-settings"})," ",(0,l.__)("Options","wp3d-modelimport")),("pointLight"==b||"spotLight"==b)&&(0,t.createElement)("div",null,(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Decay","wp3d-modelimport"),value:k,onChange:e=>z("light_decay",{light_decay:e}),min:1,max:2,step:.001,resetFallbackValue:1}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Distance","wp3d-modelimport"),value:x,onChange:e=>z("light_distance",{light_distance:e}),min:0,max:100,step:1,resetFallbackValue:3})),"spotLight"==b&&(0,t.createElement)("div",null,(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Penumbra","wp3d-modelimport"),value:C,onChange:e=>z("light_penumbra",{light_penumbra:e}),min:0,max:1,step:.001,resetFallbackValue:.5}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Angle","wp3d-modelimport"),value:f,onChange:e=>z("light_angle",{light_angle:e}),min:1,max:36,step:.01,resetFallbackValue:3})),"pointLight"==b&&(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Flying Point","wp3d-modelimport"),checked:S,onChange:e=>z("lightpoint_fly",{lightpoint_fly:e})}),(0,t.createElement)("h3",{className:"panelbody-heading"},(0,t.createElement)(a.Icon,{icon:"move"})," ",(0,l.__)("Position","wp3d-modelimport")),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Pos-X","wp3d-modelimport"),value:L,onChange:e=>z("geometry_light_posx",{geometry_light_posx:e}),min:-10,max:10,step:.001,resetFallbackValue:-2}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Pos-Y","wp3d-modelimport"),value:R,onChange:e=>z("geometry_light_posy",{geometry_light_posy:e}),min:-10,max:10,step:.001,resetFallbackValue:0}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Pos-Z","wp3d-modelimport"),value:F,onChange:e=>z("geometry_light_posz",{geometry_light_posz:e}),min:-10,max:10,step:.001,resetFallbackValue:0}),("directionalLight"==b||"spotLight"==b)&&(0,t.createElement)("div",null,(0,t.createElement)("h3",{className:"panelbody-heading"},(0,t.createElement)(a.Icon,{icon:"insert"})," ",(0,l.__)("Target","wp3d-modelimport")),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("X","wp3d-modelimport"),value:O,onChange:e=>z("geometry_light_targetx",{geometry_light_targetx:e}),min:-10,max:10,step:.001,resetFallbackValue:0}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Y","wp3d-modelimport"),value:P,onChange:e=>z("geometry_light_targety",{geometry_light_targety:e}),min:-10,max:10,step:.001,resetFallbackValue:0}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Z","wp3d-modelimport"),value:B,onChange:e=>z("geometry_light_targetz",{geometry_light_targetz:e}),min:-10,max:10,step:.001,resetFallbackValue:0}))),(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Shadows","wp3d-modelimport"),initialOpen:!0},(0,t.createElement)(a.ToggleControl,{label:(0,l.__)("Enable Shadows","wp3d-modelimport"),checked:V,onChange:e=>z("enable_shadows",{enable_shadows:e})}),V&&(0,t.createElement)("div",null,(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Radius","wp3d-modelimport"),value:j,onChange:e=>z("geometry_shadow_radius",{geometry_shadow_radius:e}),min:0,max:100,step:.001,resetFallbackValue:0}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Blur Samples","wp3d-modelimport"),value:I,onChange:e=>z("geometry_shadow_blurSamples",{geometry_shadow_blurSamples:e}),min:0,max:50,step:1,resetFallbackValue:0}))),"spotLight"==b&&(0,t.createElement)(a.PanelBody,{title:(0,l.__)("Light Map","wp3d-modelimport"),initialOpen:!0},(0,t.createElement)(r,{label:(0,l.__)("Map Image","wp3d-modelimport"),chooselabel:"Choose an image",value:M,onAdd:e=>{z("light_map",{light_map:{id:e.id,url:e.url,alt:e.alt,title:e.title}})},onRemove:()=>{z("light_map",{light_map:{id:0,url:"",alt:"",title:""}})}}),(0,t.createElement)(a.RangeControl,{label:(0,l.__)("Focus","wp3d-modelimport"),value:N,onChange:e=>z("geometry_shadow_focus",{geometry_shadow_focus:e}),min:0,max:1,step:.001,resetFallbackValue:1}))))},save:function(e){let{attributes:l}=e;const a=o.useBlockProps.save();return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",m({id:l.ide},a,{className:"wp3d-light3d-itemlight","data-settings":JSON.stringify(l)})))}})}},l={};function a(e){var o=l[e];if(void 0!==o)return o.exports;var n=l[e]={exports:{}};return t[e](n,n.exports,a),n.exports}a.m=t,e=[],a.O=(t,l,o,n)=>{if(!l){var r=1/0;for(s=0;s<e.length;s++){for(var[l,o,n]=e[s],i=!0,m=0;m<l.length;m++)(!1&n||r>=n)&&Object.keys(a.O).every((e=>a.O[e](l[m])))?l.splice(m--,1):(i=!1,n<r&&(r=n));if(i){e.splice(s--,1);var c=o();void 0!==c&&(t=c)}}return t}n=n||0;for(var s=e.length;s>0&&e[s-1][2]>n;s--)e[s]=e[s-1];e[s]=[l,o,n]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={339:0,44:0};a.O.j=t=>0===e[t];var t=(t,l)=>{var o,n,[r,i,m]=l,c=0;if(r.some((t=>0!==e[t]))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(m)var s=m(a)}for(t&&t(l);c<r.length;c++)n=r[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(s)},l=globalThis.webpackChunkwp3d_modelimport=globalThis.webpackChunkwp3d_modelimport||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var o=a.O(void 0,[44],(()=>a(574)));o=a.O(o)})();