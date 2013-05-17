enyo.kind({
	name: "App.Seat",
	kind: "App.Base",
	components:[
		{kind: "Panels", name: "mainPanel",narrowFit: false,  fit:true,  classes: "", arrangerKind: "CarouselArranger", draggable: false, wrap: true, components: [
			{name: "mainContent", kind: "FittableRows", style:"width:100%",components: [
				{kind: "onyx.Toolbar",style: "overflow: hidden;", components: [
					{kind: "onyx.Button", content:"返回", style:"float:left",classes: "onyx-blue icon-home",ontap:"toManage"},
					//{kind: "onyx.Button", name: "menuIcon",  content: "菜单",style:"float: right;", classes: "icon-reorder onyx-dark", ontap: "showMenu"},
					{kind: "onyx.Button",  content: "确定",style:"float: right;", classes: "icon-circle-blank icon- onyx-dark", ontap: "submitSeat"},
				]},
				{name:"wrapper", kind:"FittableRows", fit:true,  style:"padding: 0  5px 5px 5px;background-color: rgb(245, 245, 245);",components: [
					App.noticeComponents,
					{kind:"Scroller",name:"seatScroller",  fit:true,strategyKind: "TouchScrollStrategy", components:[
						{name:"seatRepeater", kind:"Repeater", fit:true, style:"width:100%",fixedHeight:true,noSelect:true,onSetupItem:"setupSeatItem",classes:"enyo-unselectable",components:[
							{name:"seatItem", classes:"seat-item",style:"clear: both;margin-top: 5px;overflow:hidden",components: [
								{tag:"span",style:"width: 32%",components:[
									{tag:"span",name:"seat1", ontap:"changeSeatStatus"}
								]},
								{tag:"span",style:"width:1%"},
								{tag:"span",style:"width: 34%",components:[
									{tag:"span",name:"seat2",ontap:"changeSeatStatus"}
								]},
								{tag:"span",style:"width:1%"},
								{tag:"span",style:"width: 32%",components:[
									{tag:"span",name:"seat3",ontap:"changeSeatStatus"}
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
	carriageinfo: AppData["seat_status"],
	seats:AppData["seat_status"] && AppData["seat_status"]["seat_status"],
	seatCapacity: parseInt(AppData["seat_status"] && AppData["seat_status"]["seat_capacity"]),
	create:function(){
		this.inherited(arguments);
		this.$.seatRepeater.setCount( parseInt(this.seatCapacity / 3 + 1) );
	},
	rendered: function() {
		this.inherited(arguments);

		//var h = this.$.mainContent.getBounds().height - this.$.seatScroller.getBounds().top - 5;
		//this.$.seatScroller.applyStyle("height", h + "px");
	},

	setupSeatItem: function(inSender, inEvent) {
		var index = inEvent.index;
		var baseSeat = index  * 3
		var item = inEvent.item;
		var lineSeats = [baseSeat+1, baseSeat + 2, baseSeat + 3];
		var s;
		var c = 0;
		for (i = 0; i < 3 && c < this.seatCapacity; i++, c++) {
			s = item.$["seat" + (i+1)];
			s.setContent(lineSeats[i]);
			if (this.seats["occupied"].indexOf(lineSeats[i]) != -1) {
				s.applyStyle("background-color", "red");
				s.setProperty("status", "occupied");
			} else if (this.seats["changing"].indexOf(lineSeats[i]) != -1) {
				s.applyStyle("background-color", "yellow");
				s.setProperty("status", "changing");
			} else {
				s.applyStyle("background-color", "white");
				s.setProperty("status", "idle");
			}
		}
	},
	changeSeatStatus: function(inSender, inEvent) {
		var index = inEvent.index;
		var num = parseInt(inSender.getContent());
		//console.log(num);
		//console.log(inSender.getProperty("status"));
		//console.log(this.seats.occupied);
		//console.log(this.seats.changing);
		switch (inSender.getProperty("status")) {
		case "occupied":
			inSender.applyStyle("background-color", "white");
			this.seats["occupied"].splice(this.seats.occupied.indexOf(num), 1);
			inSender.setProperty("status", "idle");
			break;
		case "changing":
			inSender.applyStyle("background-color", "red");
			this.seats["changing"].splice(this.seats.changing.indexOf(num), 1);
			inSender.setProperty("status", "occupied");
			this.seats.occupied.push(num);
			break;
		case "idle":
			inSender.applyStyle("background-color", "yellow");
			this.seats["changing"].push(num);
			inSender.setProperty("status", "changing");
			break;
		}
		//console.log(this.seats.occupied);
		//console.log(this.seats.changing);
		return true;
	},
	submitSeat: function(inSender, inEvent){
		inSender.disabled = true;
		var postData = {
				carriage_info: JSON.stringify({
					carriage_id: parseInt(this.carriageinfo["carriage_id"]),
					seat_status: JSON.stringify(this.seats)
				})
		};
		postData[AppData["csrf_token_name"]] = AppData["csrf_hash"]
		var ajax = new enyo.Ajax({
			url: "/webapp/submit_seat",
			postBody: postData,
			sync: true,
			method: "POST"
		});
		ajax.response(this, "processSubmit");
		ajax.error(this, "errorSubmit");
		ajax.go();
	},
	processSubmit: function(inSender, inResponse) {
		if (inResponse.code == 0) {
			location.reload();
			console.log("submit seat status succed!");
		}
	},
	errorSubmit: function(inSender, inResponse) {

	}
});
