webpackJsonp([4],{258:function(e,t,n){"use strict";function i(e){r||n(835)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(455),l=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var d=n(842),s=n.n(d),r=!1,c=n(1),u=i,p=c(l.a,s.a,!1,u,null,null);p.options.__file="src\\views\\tables\\editable-table.vue",t.default=p.exports},455:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(837),l=i(a),o=n(841),d=i(o);t.default={name:"editable-table",components:{canEditTable:l.default},data:function(){return{columnsList:[],tableData:[],editInlineColumns:[],editInlineData:[],editIncellColumns:[],editIncellData:[],editInlineAndCellColumn:[],editInlineAndCellData:[],showCurrentColumns:[],showCurrentTableData:!1}},methods:{getData:function(){this.columnsList=d.default.table1Columns,this.tableData=d.default.table1Data,this.editInlineColumns=d.default.editInlineColumns,this.editInlineData=d.default.editInlineData,this.editIncellColumns=d.default.editIncellColumns,this.editIncellData=d.default.editIncellData,this.editInlineAndCellColumn=d.default.editInlineAndCellColumn,this.editInlineAndCellData=d.default.editInlineAndCellData,this.showCurrentColumns=d.default.showCurrentColumns},handleNetConnect:function(e){this.breakConnect=e},handleLowSpeed:function(e){this.lowNetSpeed=e},getCurrentData:function(){this.showCurrentTableData=!0},handleDel:function(e,t){this.$Message.success("删除了第"+(t+1)+"行数据")},handleCellChange:function(e,t,n){this.$Message.success("修改了第 "+(t+1)+" 行列名为 "+n+" 的数据")},handleChange:function(e,t){this.$Message.success("修改了第"+(t+1)+"行数据")}},created:function(){this.getData()}}},456:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(31),a=function(e){return e&&e.__esModule?e:{default:e}}(i),l=function(e,t,n,i){return t("Button",{props:{type:n.editting?"success":"primary",loading:n.saving},style:{margin:"0 5px"},on:{click:function(){if(n.editting){e.edittingStore[i].saving=!0,e.thisTableData=JSON.parse((0,a.default)(e.edittingStore));var t=e.edittingStore[i];t.editting=!1,t.saving=!1,e.thisTableData=JSON.parse((0,a.default)(e.edittingStore)),e.$emit("input",e.handleBackdata(e.thisTableData)),e.$emit("on-change",e.handleBackdata(e.thisTableData),i)}else{if(n.edittingCell)for(var l in n.edittingCell)n.edittingCell[l]=!1,e.edittingStore[i].edittingCell[l]=!1;e.edittingStore[i].editting=!0,e.thisTableData=JSON.parse((0,a.default)(e.edittingStore))}}}},n.editting?"保存":"编辑")},o=function(e,t,n,i){return t("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗?",transfer:!0},on:{"on-ok":function(){e.thisTableData.splice(i,1),e.$emit("input",e.handleBackdata(e.thisTableData)),e.$emit("on-delete",e.handleBackdata(e.thisTableData),i)}}},[t("Button",{style:{margin:"0 5px"},props:{type:"error",placement:"top"}},"删除")])},d=function(e,t,n){return e.hoverShow?t("div",{class:{"show-edit-btn":e.hoverShow}},[t("Button",{props:{type:"text",icon:"edit"},on:{click:function(t){e.edittingStore[n.index].edittingCell[n.column.key]=!0,e.thisTableData=JSON.parse((0,a.default)(e.edittingStore))}}})]):t("Button",{props:{type:"text",icon:"edit"},on:{click:function(t){e.edittingStore[n.index].edittingCell[n.column.key]=!0,e.thisTableData=JSON.parse((0,a.default)(e.edittingStore))}}})},s=function(e,t,n){return t("Button",{props:{type:"text",icon:"checkmark"},on:{click:function(t){e.edittingStore[n.index].edittingCell[n.column.key]=!1,e.thisTableData=JSON.parse((0,a.default)(e.edittingStore)),e.$emit("input",e.handleBackdata(e.thisTableData)),e.$emit("on-cell-change",e.handleBackdata(e.thisTableData),n.index,n.column.key)}}})},r=function(e,t,n,i){return t("Input",{props:{type:"text",value:e.edittingStore[n.index][i.key]},on:{"on-change":function(t){var a=i.key;e.edittingStore[n.index][a]=t.target.value}}})};t.default={name:"canEditTable",props:{refs:String,columnsList:Array,value:Array,url:String,editIncell:{type:Boolean,default:!1},hoverShow:{type:Boolean,default:!1}},data:function(){return{columns:[],thisTableData:[],edittingStore:[]}},created:function(){this.init()},methods:{init:function(){var e=this,t=this,n=this.columnsList.filter(function(e){if(e.editable&&!0===e.editable)return e}),i=JSON.parse((0,a.default)(this.value)),c=[];c=i.map(function(t,i){var a=!1;if(e.thisTableData[i])if(e.thisTableData[i].editting)a=!0;else for(var l in e.thisTableData[i].edittingCell)!0===e.thisTableData[i].edittingCell[l]&&(a=!0);if(a)return e.thisTableData[i];e.$set(t,"editting",!1);var o={};return n.forEach(function(e){o[e.key]=!1}),e.$set(t,"edittingCell",o),t}),this.thisTableData=c,this.edittingStore=JSON.parse((0,a.default)(this.thisTableData)),this.columnsList.forEach(function(n){n.editable&&(n.render=function(i,a){var l=e.thisTableData[a.index];return l.editting?i("Input",{props:{type:"text",value:l[n.key]},on:{"on-change":function(e){var n=a.column.key;t.edittingStore[a.index][n]=e.target.value}}}):e.editIncell?i("Row",{props:{type:"flex",align:"middle",justify:"center"}},[i("Col",{props:{span:"22"}},[l.edittingCell[a.column.key]?r(e,i,a,n):i("span",l[n.key])]),i("Col",{props:{span:"2"}},[l.edittingCell[a.column.key]?s(e,i,a):d(e,i,a)])]):i("span",l[n.key])}),n.handle&&(n.render=function(t,i){var a=e.thisTableData[i.index],d=[];return n.handle.forEach(function(n){"edit"===n?d.push(l(e,t,a,i.index)):"delete"===n&&d.push(o(e,t,0,i.index))}),t("div",d)})})},handleBackdata:function(e){var t=JSON.parse((0,a.default)(e));return t.forEach(function(e){delete e.editting,delete e.edittingCell,delete e.saving}),t}},watch:{value:function(e){this.init()}}}},835:function(e,t,n){var i=n(836);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(11)("0dfbb4aa",i,!1,{})},836:function(e,t,n){t=e.exports=n(10)(!1),t.push([e.i,"\n.margin-top-8 {\n  margin-top: 8px;\n}\n.margin-top-10 {\n  margin-top: 10px;\n}\n.margin-top-20 {\n  margin-top: 20px;\n}\n.margin-left-10 {\n  margin-left: 10px;\n}\n.margin-bottom-10 {\n  margin-bottom: 10px;\n}\n.margin-bottom-100 {\n  margin-bottom: 100px;\n}\n.margin-right-10 {\n  margin-right: 10px;\n}\n.padding-left-6 {\n  padding-left: 6px;\n}\n.padding-left-8 {\n  padding-left: 5px;\n}\n.padding-left-10 {\n  padding-left: 10px;\n}\n.padding-left-20 {\n  padding-left: 20px;\n}\n.height-100 {\n  height: 100%;\n}\n.height-120px {\n  height: 100px;\n}\n.height-200px {\n  height: 200px;\n}\n.height-492px {\n  height: 492px;\n}\n.height-460px {\n  height: 460px;\n}\n.line-gray {\n  height: 0;\n  border-bottom: 2px solid #dcdcdc;\n}\n.notwrap {\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.padding-left-5 {\n  padding-left: 10px;\n}\n[v-cloak] {\n  display: none;\n}\n.dragging-tip-enter-active {\n  opacity: 1;\n  transition: opacity .3s;\n}\n.dragging-tip-enter,\n.dragging-tip-leave-to {\n  opacity: 0;\n  transition: opacity 0.3s;\n}\n.dragging-tip-con {\n  display: block;\n  text-align: center;\n  width: 100%;\n  height: 50px;\n}\n.dragging-tip-con span {\n  font-size: 18px;\n}\n.record-tip-con {\n  display: block;\n  width: 100%;\n  height: 292px;\n  overflow: auto;\n}\n.record-item {\n  box-sizing: content-box;\n  display: block;\n  overflow: hidden;\n  height: 24px;\n  line-height: 24px;\n  padding: 8px 10px;\n  border-bottom: 1px dashed gainsboro;\n}\n.record-tip-con span {\n  font-size: 14px;\n}\n.edittable-test-con {\n  height: 160px;\n}\n.edittable-table-height-con {\n  height: 190px;\n}\n.edittable-con-1 {\n  box-sizing: content-box;\n  padding: 15px 0 0;\n  height: 196px;\n}\n.edittable-table-get-currentdata-con {\n  height: 190px !important;\n}\n.exportable-table-download-con1 {\n  padding: 16px 0 16px 20px;\n  border-bottom: 1px dashed #c3c3c3;\n  margin-bottom: 16px;\n}\n.exportable-table-download-con2 {\n  padding-left: 20px;\n}\n.show-image {\n  padding: 20px 0px;\n}\n.show-image img {\n  display: block;\n  width: 100%;\n  height: auto;\n}\n.searchable-table-con1 {\n  height: 230px !important;\n}\n",""])},837:function(e,t,n){"use strict";function i(e){r||n(838)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(456),l=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var d=n(840),s=n.n(d),r=!1,c=n(1),u=i,p=c(l.a,s.a,!1,u,null,null);p.options.__file="src\\views\\tables\\components\\canEditTable.vue",t.default=p.exports},838:function(e,t,n){var i=n(839);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(11)("ff9b0f36",i,!1,{})},839:function(e,t,n){t=e.exports=n(10)(!1),t.push([e.i,"\n.show-edit-btn {\n  display: none;\n  margin-left: -10px;\n}\n.ivu-table-cell:hover .show-edit-btn {\n  display: inline-block;\n}\n",""])},840:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Table",{ref:e.refs,attrs:{columns:e.columnsList,data:e.thisTableData,border:"","disabled-hover":""}})],1)},a=[];i._withStripped=!0;var l={render:i,staticRenderFns:a};t.default=l},841:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=t.table1Columns=[{title:"序号",type:"index",width:80,align:"center"},{title:"姓名",align:"center",key:"name",editable:!0},{title:"性别",align:"center",key:"sex"},{title:"岗位",align:"center",key:"work",editable:!0},{title:"操作",align:"center",width:120,key:"handle",handle:["delete"]}],a=t.table1Data=[{name:"Aresn",sex:"男",work:"前端开发"},{name:"Lison",sex:"男",work:"前端开发"},{name:"lisa",sex:"女",work:"程序员鼓励师"}],l=t.editInlineColumns=[{title:"序号",type:"index",width:80,align:"center"},{title:"姓名",align:"center",key:"name",width:90,editable:!0},{title:"性别",align:"center",key:"sex"},{title:"岗位",align:"center",key:"work",width:150,editable:!0},{title:"操作",align:"center",width:190,key:"handle",handle:["edit","delete"]}],o=t.editInlineData=[{name:"Aresn",sex:"男",work:"前端开发"},{name:"Lison",sex:"男",work:"前端开发"},{name:"lisa",sex:"女",work:"程序员鼓励师"}],d=t.editIncellColumns=[{title:"序号",type:"index",width:80,align:"center"},{title:"姓名",align:"center",key:"name",width:120,editable:!0},{title:"性别",align:"center",key:"sex"},{title:"岗位",align:"center",width:160,key:"work",editable:!0},{title:"操作",align:"center",width:120,key:"handle",handle:["delete"]}],s=t.editIncellData=[{name:"Aresn",sex:"男",work:"前端开发"},{name:"Lison",sex:"男",work:"前端开发"},{name:"lisa",sex:"女",work:"程序员鼓励师"}],r=t.editInlineAndCellColumn=[{title:"序号",type:"index",width:80,align:"center"},{title:"姓名",align:"center",key:"name",width:300,editable:!0},{title:"性别",align:"center",key:"sex"},{title:"岗位",align:"center",width:300,key:"work",editable:!0},{title:"操作",align:"center",width:200,key:"handle",handle:["edit","delete"]}],c=t.editInlineAndCellData=[{name:"Aresn",sex:"男",work:"前端开发"},{name:"Lison",sex:"男",work:"前端开发"},{name:"lisa",sex:"女",work:"程序员鼓励师"}],u=t.showCurrentColumns=[{title:"序号",type:"index",width:80,align:"center"},{title:"姓名",align:"center",key:"name",width:300,editable:!0},{title:"性别",align:"center",key:"sex"},{title:"岗位",align:"center",width:300,key:"work",editable:!0}],p={table1Columns:i,table1Data:a,editInlineColumns:l,editInlineData:o,editIncellColumns:d,editIncellData:s,editInlineAndCellColumn:r,editInlineAndCellData:c,showCurrentColumns:u};t.default=p},842:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Row",[n("Col",{attrs:{span:"6"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"load-b"}}),e._v("\n                    简单说明\n                ")],1),e._v(" "),n("div",{staticClass:"edittable-test-con"},[e._v("\n                    可编辑单元格可配置可编辑的列，可设置编辑整行的可编辑单元格，也可配置单个编辑可编辑单元格，也可两种形式同时可用。可配置单元格内编辑的图标显示方式。\n                ")])])],1),e._v(" "),n("Col",{staticClass:"padding-left-10",attrs:{span:"18"}},[n("Card",[n("div",{staticClass:"edittable-con-1"},[n("can-edit-table",{attrs:{refs:"table1","columns-list":e.columnsList},on:{"on-delete":e.handleDel},model:{value:e.tableData,callback:function(t){e.tableData=t},expression:"tableData"}})],1)])],1)],1),e._v(" "),n("Row",{staticClass:"margin-top-10"},[n("Col",{attrs:{span:"12"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"android-remove"}}),e._v("\n                    可编辑单元行\n                ")],1),e._v(" "),n("div",{staticClass:"edittable-table-height-con"},[n("can-edit-table",{attrs:{refs:"table2","columns-list":e.editInlineColumns},model:{value:e.editInlineData,callback:function(t){e.editInlineData=t},expression:"editInlineData"}})],1)])],1),e._v(" "),n("Col",{staticClass:"padding-left-10",attrs:{span:"12"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"android-more-horizontal"}}),e._v("\n                    可编辑单元格(鼠标移入显示编辑单元格按钮)\n                ")],1),e._v(" "),n("div",{staticClass:"edittable-table-height-con"},[n("can-edit-table",{attrs:{refs:"table3","hover-show":!0,"edit-incell":!0,"columns-list":e.editIncellColumns},model:{value:e.editIncellData,callback:function(t){e.editIncellData=t},expression:"editIncellData"}})],1)])],1)],1),e._v(" "),n("Row",{staticClass:"margin-top-10"},[n("Col",{attrs:{span:"24"}},[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"ios-keypad"}}),e._v("\n                     单元行和单元格两种方式编辑(始终显示编辑单元格按钮)\n                ")],1),e._v(" "),n("Row",{attrs:{gutter:10}},[n("Col",{attrs:{span:"2"}},[n("Row",{staticClass:"edittable-table-get-currentdata-con",attrs:{type:"flex",justify:"center",align:"middle"}},[n("Button",{attrs:{type:"primary"},on:{click:e.getCurrentData}},[e._v("当前数据")])],1)],1),e._v(" "),n("Col",{attrs:{span:"22"}},[n("div",{staticClass:"edittable-table-height-con"},[n("can-edit-table",{attrs:{refs:"table4",editIncell:!0,"columns-list":e.editInlineAndCellColumn},on:{"on-cell-change":e.handleCellChange,"on-change":e.handleChange},model:{value:e.editInlineAndCellData,callback:function(t){e.editInlineAndCellData=t},expression:"editInlineAndCellData"}})],1)]),e._v(" "),n("Modal",{attrs:{width:900},model:{value:e.showCurrentTableData,callback:function(t){e.showCurrentTableData=t},expression:"showCurrentTableData"}},[n("can-edit-table",{attrs:{refs:"table5","columns-list":e.showCurrentColumns},model:{value:e.editInlineAndCellData,callback:function(t){e.editInlineAndCellData=t},expression:"editInlineAndCellData"}})],1)],1)],1)],1)],1)],1)},a=[];i._withStripped=!0;var l={render:i,staticRenderFns:a};t.default=l}});