enyo.kind({
	name: "App.Timetable",
	kind: "App.Base",
	components:[
		{kind: "Panels", name: "mainPanel",narrowFit: false,  fit:true, arrangerKind: "CarouselArranger", draggable: false, wrap: true, components: [
			{name: "mainContent", kind: "FittableRows", style:"width:100%",components: [
				{kind: "onyx.Toolbar",name:"mainToolbar", style: "overflow: hidden;", components: [
					{kind: "onyx.Button", content:"首页", style:"float:left",classes: "onyx-blue icon-home"},
					{kind: "onyx.Button", name: "menu_icon",  content: "菜单",style:"float: right;", classes: "icon-reorder onyx-dark", ontap: "showMenu"},
				]},
				{name:"wrapper", kind: "FittableRows", fit: true, style:"position: relative", components: [
					App.noticeComponents,
					{tag: "div", name:"welcomeDiv",classes:"welcome-div",style:"font-size: 12px;",content: "欢迎来到K878列车,我们竭诚为您服务:)"},
					{name: "mainScroll", kind: "FittableRows", fit: true, classes: "nice-padding", components: [
						{kind:"Scroller", name:"timeScroller", strategyKind: "TouchScrollStrategy", fit:true ,components: [
							{kind:"onyx.Groupbox", style:"margin: 5px;", components: [
								{kind: "onyx.GroupboxHeader", content: "列车时刻表"},
								{kind:"Repeater",name:"repeater",onSetupItem: "setupItem", components:[
									{name:"item", classes:"time-table-row", components: [
										{tag:"span", style:"",components:[
											{tag:"span", name:"cityName",allowHtml: true,classes:"time-table-item toy-orange"}
										]},
										{tag:"span",  allowHtml: true,components:[
											{tag:"span", name:"arriveTime",allowHtml: true,classes:"time-table-item"}
										]},
										{tag:"span", allowHtml: true,components:[
											{tag:"span", name:"leaveTime",allowHtml: true,classes:"time-table-item"}
										]}
									]}
								]}
							]}
						]}
					]}
				]}
				//{tag: "div", content: "@copyright dinsy&powerm", style:"font-size: 10px; color: lightgrey; text-align: center"}
			]},
			App.menuComponents
		]}
	],
	timeTable: AppData['time_table'],
	/*
	timeTable: [
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"},
		{name:"西安", arrive_time:"12:12",leave_time:"12:25"},
		{name:"华山", arrive_time:"13:12",leave_time:"13:25"}
	],
	*/
	create:function(){
		this.inherited(arguments);
		this.$.repeater.setCount(this.timeTable.length);
	},
	rendered: function() {
		this.inherited(arguments);

		//var wb = this.$.welcomeDiv.getBounds();
		//var h = this.$.mainContent.getBounds().height - wb.top - wb.height - 10;
		//this.$.timeScroller.applyStyle("height", h + "px");

	},
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var item = inEvent.item;
		var city = this.timeTable[index];
		if (index == 4) {
			item.$.item.applyStyle("background-color", "rgb(228, 242, 243)");
		}
		if (index == 0) {
			item.$.cityName.setContent(city["city_name"] + "(始发)");
		} else if (index == this.timeTable.length - 1) {
			item.$.cityName.setContent(city["city_name"] + "(终点站)");
		} else {
			item.$.cityName.setContent(city["city_name"]);
		}
		
		item.$.arriveTime.setContent(city["arrive_time"] + '&nbsp;<small class="arrive">到</small>');
		item.$.leaveTime.setContent(city["leave_time"] + '&nbsp;<small class="leave">开</small>');
	}
});
