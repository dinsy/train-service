enyo.kind({
	name: "App.Manage",
	kind: "App.Base",
	components:[
		{kind: "Panels", name: "mainPanel",narrowFit: false,  fit:true,  classes: "", arrangerKind: "CarouselArranger", draggable: false, wrap: true, components: [
			{name: "mainContent", kind: "FittableRows", style:"width:100%",components: [
				{kind: "onyx.Toolbar",name:"mainToolbar",style: "overflow: hidden;", components: [
					{kind: "onyx.Button", content:"首页", style:"float:left",classes: "onyx-blue icon-home", ontap:"toHome"},
					{kind: "onyx.Button", name: "menu_icon",  content: "菜单",style:"float: right;", classes: "icon-reorder onyx-dark", ontap: "showMenu"},
				]},
				{name:"wrapper", kind:"FittableRows", fit: true,  components: [
					App.noticeComponents,
					{kind:"enyo.Scroller", fit:true, strategyKind:"TouchScrollStrategy", fit: true,  components:[
						{kind: "onyx.Groupbox", classes:"manage-groupbox",  components:[
							{tag:"div", classes:"manage-row", components:[
								{tag:"span",content:"列车信息管理", classes:"manage-left"},
								{kind:"onyx.Button", classes:"manage-right manage-button onyx-negative", ontap:"toTraininfo", content:"点击查看"}
							]}
						]},
						{kind: "onyx.Groupbox",  classes:"manage-groupbox",style:"height: 80px;", components:[
						/*
							{tag:"div", classes:"manage-row", components:[
								{tag:"div",content:"当前车厢", classes:"manage-left"},
								{kind: "onyx.InputDecorator",  classes:"manage-right",  alwaysLooksFocused:true,components: [
									{kind: "onyx.Input", style:"width: 100%; text-align: right;",name:"carriageSerial", value:"1" }
								]}
							]},
							{tag:"div", classes:"manage-row manage-row-button", ontap:"toSeat", components:[
								{tag:"div",content:"点击管理当前车厢", classes:"manage-widen-button"}
							]},
							*/
							{tag:"div", classes:"manage-row", components:[
								{tag:"span",content:"车厢管理", classes:"manage-left"},
							]}
							{tag:"div", classes:"manage-row", components:[
								{kind: "onyx.InputDecorator",  classes:"manage-left",  alwaysLooksFocused:true,components: [
									{kind: "onyx.Input", style:"width: 100%; text-align: right;",name:"carriageSerial", placeholder: "车厢号" }
								]}
								{kind:"onyx.Button", classes:"manage-right manage-button onyx-negative", ontap:"toSeat", content:"点击查看"}
							]}
						]},
					]}
				]}
			]},
			App.menuComponents
		]}
	],
	create:function(){
		this.inherited(arguments);
	},
	toSeat: function(inSender, inEvent){
		inSender.disabled = true;
		redirectTo("/mobile/manage/carriage/" + this.$.carriageSerial.getValue());
		return true;
	},
	toTraininfo: function(inSender, inEvent){
		inSender.disabled = true;
		redirectTo("/mobile/manage/traininfo");
		return true;
	},
	rendered: function() {
		this.inherited(arguments);

		this.panelWidth = this.$.mainPanel.getBounds().width;

		//var h = this.$.mainContent.getBounds().height - this.$.mainToolbar.getBounds().height;
		//this.$.wrapper.applyStyle("height", h + "px");
	},
});
