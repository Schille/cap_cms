var Navigation = new Class({
    initialize: function(name){
        this.name = name;
        this.dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
        this.container;
    },
 	getCSSStyle: function () {
		 cssStyle =	"ul\n" +
			"{\n" +
			"list-style-type:none;\n" +
			"margin:0;padding:0;\n" +
			"overflow:hidden;\n" +
			"}\n" +
			"li\n" +
			"{\n" +
			"list-style-type:none;\n" +
			"}\n" +
			"a.navi_item:link,a.navi_item:visited\n" +
			"{\n" +
			"display:block;\n" +
			"width:120px;\n" +
			//"max-width:" + 400/docs.length +";\n"+
			"font-weight:bold;\n" +
			"color:#FFFFFF;\n" +
			"background-color:#98bf21;\n" +
			"text-align:center;\n" +
			"padding:4px;\n" +
			"text-decoration:none;\n" +
			"text-transform:uppercase;\n" +
			"}\n" +
			"a.navi_item:hover,a.navi_item:active\n" +
			"{\n" +
			"background-color:#7A991A;\n" +
			"border-top-left-radius: 0px\n" +
			"}";
		 	return cssStyle;
		 
		},

		adaptNavibar: function () {
			var naviBarCSS = new Element ("style", {
				type: "text/css",
				html: this.getCSSStyle(),
			});
			$(document.head).adopt(naviBarCSS);
		},
	
	start: function(myID, myContainer) {
		this.id = myID;
		this.container = myContainer;
		var config = {
			"navigation" : {
				"customcss" : "no",
				"alignment" : "horizontal",
				"valign" : "top",
				"halign" : "left",
				"style" : "somepathtoCSS",
				"width" : "400px"
			},
		};
		
		//var module = new Array(home, topic1, about);
		
		
		
		var module = docs;
		
		// Now we need to display the cool shit :)
		// Put some cool content into da navigation bar

		// Set the alignment of the whole navigation bar, got properties from
		// config
		//$("navigation").innerHTML = "<ul>";
		var float = "";
		if (config.navigation.alignment == "horizontal") {
			if (config.navigation.halign == "right")
				float = "right";
			if (config.navigation.halign == "left")
				float = "left";
		}

		var navBarItemList = new Element ("ul",{
		});


		
		
		// Add all elements from the array to the navigation
		//Decide whether its left- or right-aligned and print each other way around
		
		if (float == "left") {
			for ( var i = 0; i <= module.length - 1; i++) {
				var navBarItemBullet = new Element ("li", {
					id: module[i].name,
					
				});
				navBarItemList.adopt(navBarItemBullet);
				
				var navBarItemLink = new Element ("a", {
					href: module[i].link,
					name: module[i].name,
					class: "navi_item",
					html: module[i].label,
					styles: {
						float: float,
					},
				});
				navBarItemLink.addEvent("click",function(){
					alert($(this).name);
				});
				navBarItemBullet.adopt(navBarItemLink);

				
			}
			
		} else {
			for ( var i = module.length - 1; i >= 0; i--) {
				var navBarItemBullet = new Element ("li", {
					id: module[i].name,
					
				});
				navBarItemList.adopt(navBarItemBullet);
				
				var navBarItemLink = new Element ("a", {
					href: module[i].link,
					name: module[i].name,
					class: "navi_item",
					html: module[i].label,
					styles: {
						float: float,
					},
				});
				navBarItemLink.addEvent("click",function(){
					alert($(this).name);
				});
				navBarItemBullet.adopt(navBarItemLink);
				
			}
			
			
			
		}
		$(this.container).adopt(navBarItemList);

		myContainer.adopt(navBarItemList);

		this.adaptNavibar();
	},
	build : function(myID ,myContainer){
		var documents = this.dataItemLoader.getAllDataItems();
		var scope = this.dataItemLoader;
		docs = new Array();
		documents.forEach(function(dataItem){
			docs = docs.append([scope.getDataItem(dataItem)]);
		});
		this.start(myID,myContainer);
	},
	
	performAction : function(){
		alert("Successful Loaded " + this.id);
	}
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Navigation();
	},
});