!function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p="/assets/",e(0)}([function(t,e,i){i(11),t.exports=i(32)},,,,,,,,,,,function(t,e,i){i(12),i(15),i(16),i(28),i(29),i(30),sap.ui.define("mb/app/ApplicationController",["sap/a/app/ApplicationController","gd/service/ServiceClient","mb/app/Application","mb/map/MapViewController","mb/model/Model","mb/view/ODSearchViewController"],function(t,e,i,n,r,a){"use strict";return t.extend("mb.app.ApplicationController",{init:function(){t.prototype.init.apply(this,[])},createView:function(t){return new i(t)},initView:function(){t.prototype.initView.apply(this,[])},afterInit:function(){t.prototype.afterInit.apply(this,[]),this._initControllers(),this._initModel()},run:function(){console.log("ApplicationController is running."),e.getInstance().attachReady(function(){console.log("init gaode service ready")})},_initControllers:function(){this._initMapViewController(),this._initODSearchViewController()},_initMapViewController:function(){this.mapViewController=new n("map-view"),this.addChildViewController(this.mapViewController)},_initODSearchViewController:function(){this.odSearchViewController=new a("od-search-view"),this.addChildViewController(this.odSearchViewController),this.odSearchViewController.view.attachSearch(this._odSearchView_search.bind(this)),this.odSearchViewController.view.attachClearRoute(this._odSearchView_clearRoute.bind(this))},_initModel:function(){var t=new r;sap.ui.getCore().setModel(t),this.setModel(t)},_odSearchView_search:function(t){var e=this.getModel(),i=e.getProperty("/originPoi").location,n=e.getProperty("/destPoi").location;this.mapViewController.searchRoute([i.lat,i.lng],[n.lat,n.lng])},_odSearchView_clearRoute:function(t){this.mapViewController.view.clearRoute()}})})},function(t,e,i){i(13),sap.ui.define("sap/a/app/ApplicationController",["sap/a/view/ViewController"],function(t){"use strict";return t.extend("sap.a.app.ApplicationController",{getApplication:function(){return this.getView()},run:function(){}})})},function(t,e,i){i(14),sap.ui.define("sap/a/view/ViewController",["sap/ui/base/ManagedObject","sap/a/view/View"],function(t,e){"use strict";return t.extend("sap.a.view.ViewController",{metadata:{aggregations:{childViewControllers:{type:"sap.a.view.ViewController"}},properties:{viewOptions:{type:"object"}}},constructor:function(){t.apply(this,[].concat(Array.prototype.slice.call(arguments))),this.afterInit()},init:function(){},afterInit:function(){if(this.view=this.createView(this.getViewOptions()),!(this.view instanceof e))throw new Error("createView(options) must return an instance of sap.a.view.View.");this.initView()},getView:function(){return this.view},createView:function(t){throw new Error("createView(options) must be override in the derived class.")},initView:function(){},addChildViewController:function(t,e){return this.addAggregation("childViewControllers",t),this.view.addSubview(t.view,e),this},removeChildViewController:function(t,e){var i=this.removeAggregation("childViewControllers",t);return i&&this.view.removeSubview(t.view,e),i},removeAllChildViewController:function(t){for(;this.getChildViewControllers().length>0;)this.removeChildViewController(this.getChildViewControllers()[0],t)},removeFromParent:function(){this.getParent()&&this.getParent().removeChildViewController(this)},setModel:function(e,i){t.prototype.setModel.apply(this,[e]),this.view&&this.view.setModel(e)}})})},function(t,e){sap.ui.define("sap/a/view/View",["sap/ui/base/ManagedObject"],function(t){"use strict";return t.extend("sap.a.view.View",{metadata:{aggregations:{subviews:{type:"sap.a.view.View"}},events:{addedToParent:{}}},constructor:function(){t.apply(this,[].concat(Array.prototype.slice.call(arguments))),this.afterInit()},afterInit:function(){},init:function(){this.$element=$("<"+this.getElementTag()+"/>"),null!==this.id&&this.$element.attr("id",this.getId()),this.$container=this.$element},getElementTag:function(){return"div"},addStyleClass:function(){var t;(t=this.$element).addClass.apply(t,arguments)},removeStyleClass:function(){var t;(t=this.$element).removeClass.apply(t,arguments)},toggleStyleClass:function(){var t;(t=this.$element).toggleClass.apply(t,arguments)},show:function(){var t;(t=this.$element).show.apply(t,arguments)},hide:function(){var t;(t=this.$element).hide.apply(t,arguments)},toggle:function(){var t;(t=this.$element).toggle.apply(t,arguments)},placeAt:function(t){var e=t instanceof jQuery?t:$(t);e.append(this.$element)},$:function(){var t;return(t=this.$element).find.apply(t,arguments)},addSubview:function(t){var e=arguments.length<=1||void 0===arguments[1]?this.$container:arguments[1];return t.getParent()&&t.removeFromParent(),this.addAggregation("subviews",t),t.placeAt(e),t.fireAddedToParent(),this},removeSubview:function(t){var e=!(arguments.length<=1||void 0===arguments[1])&&arguments[1],i=this.removeAggregation("subviews",t);return i&&(e?t.$element.remove():t.$element.detach()),i},removeAllSubviews:function(){for(var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this.getSubviews().length>0;)this.removeSubview(this.getSubviews()[0],t)},removeFromParent:function(){this.getParent()&&this.getParent().removeSubview(this)},toString:function(){return this.getMetadata().getName()+"["+this.getId()+"]"}})})},function(t,e){var i=3.141592653589793,n=6378245,r=.006693421622965943;sap.ui.define("gd/service/ServiceClient",["sap/ui/base/ManagedObject"],function(t){"use strict";return t.extend("gd.service.ServiceClient",{metadata:{events:{ready:{}}},init:function(){var t=this;AMap.service(["AMap.Driving","AMap.Autocomplete","AMap.Geocoder"],function(){var e={city:"南京市"};t.driving=new AMap.Driving(e),t.autocomplete=new AMap.Autocomplete(Object.assign({},e)),t.geocoder=new AMap.Geocoder(e),setTimeout(function(){t.fireReady()})})},afterInit:function(){t.prototype.afterInit.apply(this,[])},searchPoiAutocomplete:function(t){var e=this;return new Promise(function(i,n){e.autocomplete.search(t,function(t,r){if("complete"===t&&"OK"===r.info){var a=r.tips,o=a.map(function(t){return t.location=e.convertToWgs84(t.location),t});i(o)}else n({status:t,info:r.info})})})},searchDrivingRoute:function(t){var e=this;return new Promise(function(i,n){var r=t.map(function(t){return new AMap.LngLat(t[1],t[0])});AMap.convertFrom(r,"gps",function(t,r){if("complete"===t&&"ok"===r.info){var a=[r.locations[0].lng,r.locations[0].lat],o=[r.locations[1].lng,r.locations[1].lat];e.driving.search(a,o,function(t,r){"complete"===t&&"OK"===r.info?(r.routes[0].steps.map(function(t){return t.path=t.path.map(function(t){return e._gcj02towgs84(t.lng,t.lat)}),t}),i(r.routes[0])):n({status:t,result:r.info})})}else n({status:t,result:r.info})})})},searchAddress:function(t){var e=this,i=this._wgs84togcj02(t.lng,t.lat),n=new AMap.LngLat(i[1],i[0]);return new Promise(function(t,i){e.geocoder.getAddress(n,function(e,n){"complete"===e&&"OK"===n.info?t(n.regeocode):i({status:e,result:n.info})})})},convertToWgs84:function(t){var e=this._gcj02towgs84(t.lng,t.lat);return e},_wgs84togcj02:function(t,e){if(this._out_of_china(t,e))return[t,e];var a=this._transformlat(t-105,e-35),o=this._transformlng(t-105,e-35),s=e/180*i,c=Math.sin(s);c=1-r*c*c;var l=Math.sqrt(c);a=180*a/(n*(1-r)/(c*l)*i),o=180*o/(n/l*Math.cos(s)*i);var u=e+a,h=t+o;return[u,h]},_gcj02towgs84:function(t,e){if(this._out_of_china(t,e))return[t,e];var a=this._transformlat(t-105,e-35),o=this._transformlng(t-105,e-35),s=e/180*i,c=Math.sin(s);c=1-r*c*c;var l=Math.sqrt(c);a=180*a/(n*(1-r)/(c*l)*i),o=180*o/(n/l*Math.cos(s)*i);var u=e+a,h=t+o;return{lat:2*e-u,lng:2*t-h}},_transformlat:function(t,e){var n=-100+2*t+3*e+.2*e*e+.1*t*e+.2*Math.sqrt(Math.abs(t));return n+=2*(20*Math.sin(6*t*i)+20*Math.sin(2*t*i))/3,n+=2*(20*Math.sin(e*i)+40*Math.sin(e/3*i))/3,n+=2*(160*Math.sin(e/12*i)+320*Math.sin(e*i/30))/3},_transformlng:function(t,e){var n=300+t+2*e+.1*t*t+.1*t*e+.1*Math.sqrt(Math.abs(t));return n+=2*(20*Math.sin(6*t*i)+20*Math.sin(2*t*i))/3,n+=2*(20*Math.sin(t*i)+40*Math.sin(t/3*i))/3,n+=2*(150*Math.sin(t/12*i)+300*Math.sin(t/30*i))/3},_out_of_china:function(t,e){return t<72.004||t>137.8347||e<.8293||e>55.8271||!1}})}),gd.service.ServiceClient.getInstance=function(){"use strict";return null===gd.service.ServiceClient._instance&&(gd.service.ServiceClient._instance=new gd.service.ServiceClient),gd.service.ServiceClient._instance},gd.service.ServiceClient._instance=null},function(t,e,i){i(17),i(18),i(24),sap.ui.define("mb/app/Application",["sap/a/app/Application","mb/map/MapView","mb/view/PoiSearchViewController"],function(t,e,i){"use strict";return t.extend("mb.app.Application",{afterInit:function(){t.prototype.afterInit.apply(this,[]),this.addStyleClass("mb-app")}})})},function(t,e,i){i(14),sap.ui.define("sap/a/app/Application",["sap/a/view/View"],function(t){"use strict";return t.extend("sap.a.app.Application",{afterInit:function(){t.prototype.afterInit.apply(this,[]),this.addStyleClass("sap-a-app")}})})},function(t,e,i){i(19),i(21),i(15),i(22),i(23),sap.ui.define("mb/map/MapView",["sap/a/map/MapView","sap/a/map/layer/TileLayer","gd/service/ServiceClient","mb/map/layer/NaviLayer","mb/map/layer/SelectedPoiLayer"],function(t,e,i,n,r){"use strict";return t.extend("mb.map.MapView",{metadata:{properties:{selectedPoi:{type:"object",bindable:!0},originPoi:{type:"object",bindable:!0},destPoi:{type:"object",bindable:!0}},events:{mapClick:{parameters:{location:"object"}}}},afterInit:function(){t.prototype.afterInit.apply(this,[]),this.addStyleClass("mb-map-view"),this.map.on("click",this._map_click.bind(this))},initLayers:function(){this.tileLayer=new e({url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png"}),this.addLayer(this.tileLayer),this.naviLayer=new n({}),this.addLayer(this.naviLayer),this.selectedPoiLayer=new r,this.addLayer(this.selectedPoiLayer)},setOriginPoi:function(t){this.setProperty("originPoi",t),t&&(this.naviLayer.setStartLocation(t.location),this.setCenterLocation(t.location))},setDestPoi:function(t){this.setProperty("destPoi",t),t&&(this.naviLayer.setEndLocation(t.location),this.setCenterLocation(t.location))},drawNaviRoute:function(t){this.naviLayer.drawRoute(t),this.naviLayer.fitBounds()},clearRoute:function(){this.naviLayer.clearRoute()},_map_click:function(t){this.fireMapClick({location:t.latlng})}})})},function(t,e,i){i(20),i(14),sap.ui.define("sap/a/map/MapView",["sap/a/map/layer/Layer","sap/a/view/View"],function(t,e){"use strict";return e.extend("sap.a.map.MapView",{metadata:{properties:{defaultCenterLocation:{type:"object",defaultValue:[32.04389,118.77881]},defaultZoom:{type:"int",defaultValue:15},minZoom:{type:"int",defaultValue:11},maxZoom:{type:"int",defaultValue:17},allowZoom:{type:"boolean",defaultValue:!0},allowDrag:{type:"boolean",defaultValue:!0}},aggregations:{layers:{type:"sap.a.map.layer.Layer"}}},init:function(){var t=this;e.prototype.init.apply(this,[]),this.addStyleClass("sap-a-map-view"),this.attachAddedToParent(function(){setTimeout(function(){t.invalidateSize()})})},afterInit:function(){e.prototype.afterInit.apply(this,[]),this._initMap(),this.initLayers()},_initMap:function(){var t={zoomControl:!0,attributionControl:!1,center:this.getDefaultCenterLocation(),zoom:this.getDefaultZoom(),minZoom:this.getMinZoom(),maxZoom:this.getMaxZoom(),dragging:this.getAllowDrag(),scrollWheelZoom:this.getAllowZoom(),doubleClickZoom:this.getAllowZoom()};this.map=L.map(this.$element[0],t)},getCenterLocation:function(){return this.map.getCenter()},setCenterLocation:function(t,e,i){this.map.setView(t,e,i)},getBounds:function(){return this.map.getBounds()},setBounds:function(t){this.map.fitBounds(t)},getZoom:function(){return this.map.getZoom()},setZoom:function(t){this.map.setZoom(t)},addLayer:function(t){return this.addAggregation("layers",t),this.map.addLayer(t.container),this},removeLayer:function(t){var e=this.removeAggregation("layers",t);return e&&this.map.removeLayer(t.container),e},removeAllLayers:function(){for(;this.getLayers().length>0;)this.getLayers()[0].removeFromParent()},showLayer:function(e){!e instanceof t||e.getParent()!==this||e.isVisible()||this.map.addLayer(e)},hideLayer:function(e){!e instanceof t||e.getParent()!==this||e.isVisible()&&this.map.removeLayer(e)},invalidateSize:function(){var t;(t=this.map).invalidateSize.apply(t,arguments)}})})},function(t,e){sap.ui.define("sap/a/map/layer/Layer",["sap/ui/base/ManagedObject"],function(t){"use strict";return t.extend("sap.a.map.layer.Layer",{constructor:function(){t.apply(this,[].concat(Array.prototype.slice.call(arguments))),this.afterInit()},init:function(){this.container=L.featureGroup()},afterInit:function(){},getBounds:function(){return this.container.getBounds()},fitBounds:function(){this.getParent()&&this.getParent().setBounds(this.getBounds())},isVisible:function(){return null!==this.getParent()&&this.getParent().map.hasLayer(this.container)},removeFromParent:function(){var t=this.getParent();t&&t.removeLayer(this)}})})},function(t,e,i){i(20),sap.ui.define("sap/a/map/layer/TileLayer",["sap/a/map/layer/Layer"],function(t){"use strict";return t.extend("sap.a.map.layer.TileLayer",{metadata:{properties:{url:{type:"string"},opacity:{type:"float"}}},init:function(){this.container=L.tileLayer()},setUrl:function(t){this.setProperty("url",t),t&&this.container.setUrl(t)},setOpacity:function(t){this.setProperty("opacity",t),this.container.setOpacity(t)}})})},function(t,e,i){i(20),sap.ui.define("mb/map/layer/NaviLayer",["sap/a/map/layer/Layer"],function(t){"use strict";return t.extend("mb.map.layer.NaviLayer",{metadata:{properties:{startLocation:{type:"any"},endLocation:{type:"any"}}},init:function(){t.prototype.init.apply(this,[]),this.markerGroup=L.featureGroup(),this.container.addLayer(this.markerGroup),this.routeGroup=L.featureGroup(),this.container.addLayer(this.routeGroup)},afterInit:function(){t.prototype.afterInit.apply(this,[])},setStartLocation:function(t){this.setProperty("startLocation",L.latLng(t)),this._updateStartMarker()},setEndLocation:function(t){this.setProperty("endLocation",L.latLng(t)),this._updateEndMarker()},drawRoute:function(t){this.clearRoute();var e=t.map(function(t){return t.path}),i=L.multiPolyline(e);this.routeGroup.addLayer(i)},clearRoute:function(){this.routeGroup.clearLayers()},_updateStartMarker:function(){this.startMarker?this.startMarker.setLatLng(this.getStartLocation()):(this.startMarker=L.circleMarker(this.getStartLocation()),this.startMarker.setRadius(10),this.startMarker.setStyle({color:"green",opacity:.8,fillColor:"green",fillOpacity:.8}),this.markerGroup.addLayer(this.startMarker))},_updateEndMarker:function(){this.endMarker?this.endMarker.setLatLng(this.getEndLocation()):(this.endMarker=L.circleMarker(this.getEndLocation()),this.endMarker.setRadius(10),this.endMarker.setStyle({color:"red",opacity:.8,fillColor:"red",fillOpacity:.8}),this.markerGroup.addLayer(this.endMarker))}})})},function(t,e,i){i(20),sap.ui.define("mb/map/layer/SelectedPoiLayer",["sap/a/map/layer/Layer"],function(t){"use strict";return t.extend("mb.map.layer.SelectedLayer",{init:function(){t.prototype.init.apply(this,[]),this.markerGroup=L.featureGroup(),this.container.addLayer(this.markerGroup)},afterInit:function(){t.prototype.afterInit.apply(this,[])},updateSelectedMaker:function(t){var e=L.latLng(t.location.lat,t.location.lng);this.selectedMarker?this.selectedMarker.setLatLng(e):(this.selectedMarker=L.circleMarker(e),this.selectedMarker.setRadius(8),this.selectedMarker.setStyle({color:"blue",opacity:.8,fillColor:"blue",fillOpacity:.8}),this.markerGroup.addLayer(this.selectedMarker))}})})},function(t,e,i){i(13),i(15),i(25),sap.ui.define("mb/view/PoiSearchViewController",["sap/a/view/ViewController","gd/service/ServiceClient","mb/view/PoiSearchView"],function(t,e,i){"use strict";return t.extend("mb.view.PoiSearchViewController",{metadata:{events:{select:{parameters:{selectedPoi:"object"}}}},afterInit:function(){t.prototype.afterInit.apply(this,[])},createView:function(t){var e=$.extend({},t);return new i(e)},initView:function(){t.prototype.initView.apply(this,[]),this.view.attachInput(this._oninput.bind(this)),this.view.attachSearch(this._onSearch.bind(this)),this.view.attachFocus(this._onfocus.bind(this)),this.view.attachBlur(this._onblur.bind(this)),this.view.suggestionListView.attachSelectedPoiChanged(this._suggestionListView_click.bind(this))},_oninput:function(t){var i=this;e.getInstance().searchPoiAutocomplete(t.getParameters().keyword).then(function(t){i.view.suggestionListView.setItems(t),i.view.suggestionListView.toggleSuggestion(t&&t.length>0)},function(t){console.error(t)})},_onSearch:function(t){var i=this;e.getInstance().searchPoiAutocomplete(t.getParameters().keyword).then(function(t){if(t.length>0){var e=t[0];i.getModel().setProperty("/selectedPoi",e)}},function(t){console.error(t)})},_onfocus:function(t){this.view.suggestionListView.toggleSuggestion(this.view.suggestionListView.getItems()&&this.view.suggestionListView.getItems().length>0)},_onblur:function(t){this.view.suggestionListView.hideSuggestion()},_suggestionListView_click:function(t){var e=t.getParameters().selectedPoi;this.getModel().forceSetProperty("/selectedPoi",e),this.fireSelect({selectedPoi:e})}})})},function(t,e,i){i(14),i(26),sap.ui.define("mb/view/PoiSearchView",["sap/a/view/View","mb/view/SuggestionListView"],function(t,e){"use strict";return t.extend("mb.view.PoiSearchView",{metadata:{properties:{poi:{type:"object",bindable:!0},placeholder:{type:"string",defaultValue:"搜索"}},events:{input:{parameters:{keyword:{type:"string"}}},search:{parameters:{keyword:{type:"string"}}},focus:{},blur:{}}},afterInit:function(){var e=this;t.prototype.afterInit.apply(this,[]),this.addStyleClass("mb-search-view"),this.$input=$("<input type=search placeholder="+this.getPlaceholder()+">"),this.$element.append(this.$input),this.$element.append('<span class="icon iconfont icon-search"/>'),this.inputDelay=null,this.$input.on("input",this._oninput.bind(this)),this.$element.on("keydown",this._keydown.bind(this)),this._initSuggestionListView(),this.$input.on("focus",function(){e.fireFocus()}),this.$input.on("blur",function(){e.fireBlur()})},_initSuggestionListView:function(){this.suggestionListView=new e,this.addSubview(this.suggestionListView),this.suggestionListView.hideSuggestion()},setPoi:function(t){this.setProperty("poi",t),this._updatePoi()},setKeyword:function(t){this.$input.val(t)},_updatePoi:function(){var t=this.getPoi();t&&t.name?this.$input.val(t.name):this.$input.val("")},_oninput:function(t){var e=this;this.inputDelay&&(window.clearTimeout(this.inputDelay),this.inputDelay=null),this.inputDelay=window.setTimeout(function(){e.fireInput({keyword:e.$input.val()})},500)},_keydown:function(t){if(13===t.keyCode){var e=this.$input.val();e&&this.fireSearch({keyword:e})}}})})},function(t,e,i){i(27),sap.ui.define("mb/view/SuggestionListView",["sap/a/view/BaseListView"],function(t){"use strict";return t.extend("mb.view.SuggestionListView",{metadata:{events:{selectedPoiChanged:{parameters:{selectedPoi:"object"}}}},afterInit:function(){t.prototype.afterInit.apply(this,[]),this.addStyleClass("mb-suggestion-list-view"),this.attachItemClick(this._on_suggestion_click.bind(this))},showSuggestion:function(){this.$element.show()},hideSuggestion:function(){this.$element.hide()},toggleSuggestion:function(t){t?this.showSuggestion():this.hideSuggestion()},_on_suggestion_click:function(t){var e=t.getParameters().item,i={name:e.name,location:e.location};this.fireSelectedPoiChanged({selectedPoi:i})}})})},function(t,e,i){i(14),sap.ui.define("sap/a/view/BaseListView",["sap/a/view/View"],function(t){"use strict";return t.extend("sap.a.view.BaseListView",{metadata:{properties:{items:{type:"object",bindable:!0,defaultValue:[]}},events:{itemClick:{parameters:{item:"object"}}}},afterInit:function(){t.prototype.afterInit.apply(this,[]),this._$itemTemplates=[],this.addStyleClass("sap-a-list-view"),this.$container.on("mousedown",this.getItemElementTag(),this._onclick.bind(this))},getElementTag:function(){return"ul"},getItemElementTag:function(){return"li"},setItems:function(){var t=this,e=arguments.length<=0||void 0===arguments[0]?null:arguments[0];null===e&&(e=[]),this.setProperty("items",e),this.$deleteAllItems(),e.forEach(function(e){t.$appendItem(e)})},getTypeOfItem:function(t){return 0},getIdOfItem:function(t){return t?t.id:null},getTextOfItem:function(t){return t?t.name:null},removeAllItems:function(){var t=this.getItems();t.splice(0),this.setItems(t)},$deleteAllItems:function(){this.$container.children(this.getItemElementTag()).remove()},addItems:function(t){var e=this;t&&t.length&&t.forEach(function(t){e.addItem(t)})},addItem:function(t){this.getItems().push(t),this.$appendItem(t)},$appendItem:function(t){var e=this.getTypeOfItem(t),i=this.$createItem(e);this.renderItem(t,i),this.$container.append(i)},renderItem:function(t,e){e.data("item",t),e.attr("id","i-"+this.getIdOfItem(t)),e.children(".text").text(this.getTextOfItem(t))},$createItem:function(){var t=arguments.length<=0||void 0===arguments[0]?0:arguments[0];return this._$itemTemplates[t]||(this._$itemTemplates[t]=this.$createNewItem(t)),this._$itemTemplates[t].clone()},$createNewItem:function(){var t=(arguments.length<=0||void 0===arguments[0]?0:arguments[0],$("<"+this.getItemElementTag()+'><span class="text"/></'+this.getItemElementTag()+">"));return t},$getItem:function(t){var e=this.getIdOfItem(t);return this.$container.children("#i-"+e)},_onclick:function(t){var e=$(t.currentTarget),i=e.data("item");this.fireItemClick({item:i})}})})},function(t,e,i){i(13),i(15),i(18),sap.ui.define("mb/map/MapViewController",["sap/a/view/ViewController","gd/service/ServiceClient","mb/map/MapView"],function(t,e,i){"use strict";return t.extend("mb.map.MapViewController",{afterInit:function(){t.prototype.afterInit.apply(this,[])},createView:function(t){var e=$.extend({selectedPoi:"{/selectedPoi}",originPoi:"{/originPoi}",destPoi:"{/destPoi}"},t);return new i(e)},initView:function(){t.prototype.initView.apply(this,[]),this.view.attachMapClick(this._map_click.bind(this))},searchRoute:function(t,i){var n=this;e.getInstance().searchDrivingRoute([t,i]).then(function(t){n.view.drawNaviRoute(t.steps)},function(t){console.error(t)})},_map_click:function(t){var i=this;e.getInstance().searchAddress(t.getParameters().location).then(function(t){i.getModel().setProperty("/queryPoi",t)})}})})},function(t,e){sap.ui.define("mb/model/Model",["sap/ui/model/json/JSONModel"],function(t){"use strict";return t.extend("mb.model.Model",{constructor:function(){t.apply(this,[{selectedPoi:null,originPoi:null,destPoi:null}]),this.init()},init:function(){},forceSetProperty:function(t,e,i,n){var r=this.setProperty(t,e,i,n);return this.checkUpdate(!0,!1),r}})})},function(t,e,i){i(13),i(15),i(31),i(24),sap.ui.define("mb/view/ODSearchViewController",["sap/a/view/ViewController","gd/service/ServiceClient","mb/view/ODSearchView","mb/view/PoiSearchViewController"],function(t,e,i,n){"use strict";return t.extend("mb.view.ODSearchViewController",{afterInit:function(){t.prototype.afterInit.apply(this,[]),this._initControllers()},createView:function(t){return new i(t)},initView:function(){t.prototype.initView.apply(this,[]),this.view.attachSwitch(this._poi_swtich.bind(this))},_initControllers:function(){this._initOriginSearchViewController(),this._initDestSearchViewController()},_initOriginSearchViewController:function(){this.originSearchViewController=new n({viewOptions:{id:"origin-search-view",placeholder:"起点",poi:"{/originPoi}"}}),this.addChildViewController(this.originSearchViewController,this.view.$container),this.originSearchViewController.attachSelect(this._originSearchView_selected.bind(this))},_initDestSearchViewController:function(){this.destSearchViewController=new n({viewOptions:{id:"dest-search-view",placeholder:"终点",poi:"{/destPoi}"}}),this.addChildViewController(this.destSearchViewController,this.view.$container),this.destSearchViewController.attachSelect(this._destSearchView_selected.bind(this))},_originSearchView_selected:function(t){this.view.setIsDrawRoute(!1);var e=t.getParameters().selectedPoi;this.getModel().forceSetProperty("/originPoi",e)},_destSearchView_selected:function(t){this.view.setIsDrawRoute(!1);var e=t.getParameters().selectedPoi;this.getModel().forceSetProperty("/destPoi",e)},_poi_swtich:function(t){var e=this.getModel(),i=e.getProperty("/originPoi"),n=e.getProperty("/destPoi");e.setProperty("/originPoi",n),e.setProperty("/destPoi",i),this.view.getIsDrawRoute()&&this.view.fireSearch()}})})},function(t,e,i){i(14),sap.ui.define("mb/view/ODSearchView",["sap/a/view/View"],function(t){"use strict";return t.extend("mb.view.ODSearchView",{metadata:{properties:{isDrawRoute:{type:"boolean",defaultValue:!1}},events:{search:{},"switch":{},clearRoute:{}}},afterInit:function(){t.prototype.afterInit.apply(this,[]),this.addStyleClass("mb-od-search-view"),this._initLayout()},_initLayout:function(){var t=this,e=$('\n            <div class="search-section">\n                <div class="icon-wrapper">\n                    <span class="icon iconfont icon-switch"></span>\n                </div>\n            </div>\n        ');e.on("click","span",function(){t.fireSwitch()});var i=$('\n            <div class="search-views">\n            </div>\n        ');this.$container=i;var n=$('\n            <div class="query-section">\n                <span class="search-button">查询线路</span>\n            </div>\n        ');n.on("click","span",function(){t.fireSearch(),t.setIsDrawRoute(!0)}),e.append(i),this.$element.append(e),this.$element.append(n)},setIsDrawRoute:function(t){this.setProperty("isDrawRoute",t),t||this.fireClearRoute()}})})},function(t,e){}]);