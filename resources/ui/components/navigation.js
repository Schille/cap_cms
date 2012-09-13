var Navigation = new Class({
    initialize: function(name){
        this.name = name;
        this.dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
       
    },
    
	build : function(){
		var documents = this.dataItemLoader.getAllDataItems();
		var scope = this.dataItemLoader;
		docs = new Array();
		documents.forEach(function(dataItem){
			docs = docs.append([scope.getDataItem(dataItem)]);
		});

		
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
			"a:link,a:visited\n" +
			"{\n" +
			"display:block;\n" +
			"width:120px;\n" +
			"font-weight:bold;\n" +
			"color:#FFFFFF;\n" +
			"background-color:#98bf21;\n" +
			"text-align:center;\n" +
			"padding:4px;\n" +
			"text-decoration:none;\n" +
			"text-transform:uppercase;\n" +
			"}\n" +
			"a:hover,a:active\n" +
			"{\n" +
			"background-color:#7A991A;\n" +
			"}";
		 	return cssStyle;
		 
		},

		adaptNavibar: function () {
			var naviBarCSS = new Element ('style', {
				type: "text/css",
				html: this.getCSSStyle(),
			});
			$(document.head).adopt(naviBarCSS);
		},
	
	start: function() {

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
		$("navigation").adopt(navBarItemList);
		this.adaptNavibar();
		
		
	

	}
});