var Component2 = new Class({
    initialize: function(name){
        this.name = name;
        dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
    },
    
	build : function(){
		var documents = dataItemLoader.getAllDataItems();
		var scope = dataItemLoader;
		docs = new Array();
		documents.forEach(function(dataItem){
			docs = docs.append([scope.getDataItem(dataItem)]);
		});

		
		
	},
	
	build2 : function(){


			var config = {
				"navigation" : {
					"customcss" : "no",
					"alignment" : "horizontal",
					"valign" : "top",
					"halign" : "left",
					"style" : "somepathtoCSS"

				},
			};

			var home = {
				"name" : "home",
				"label" : "Home",
				"link" : "index.html",
				"style" : "placeholder"
			};

			var about = {
				"name" : "about",
				"label" : "About Us",
				"link" : "about.html",
				"style" : "placeholder"
			};
			
			var topic1 = {
					"name" : "topic1",
					"label" : "Topic1",
					"link" : "topic1.hmtl",
					"style" : "placeholder"
			};
			
			function getCSSStyle () {
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
			 
			}
			
			function adaptNavibar() {
				
				/*$$("#navigation a").setStyle("text-align", "center");
				$$("#navigation a").setStyle("display", "block");
				$$("#navigation a").setStyle("width", "120px");
				$$("#navigation a").setStyle("font-weight", "bold");
				$$("#navigation a").setStyle("color", "#FFFFFF");
				$$("#navigation a").setStyle("padding", "4px");
				$$("#navigation a").setStyle("text-decoration", "none");
				$$("#navigation a").setStyle("text-transform", "uppercase"); */
				
				
				// ----------- Working code here, setting CSS for NaviAnchors ---------
				/*var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = "ul{list-style-type:none;margin:0;padding:0;overflow:hidden;}li{list-style-type:none;}a:link,a:visited{display:block;width:120px;font-weight:bold;color:#FFFFFF;background-color:#98bf21;text-align:center;padding:4px;text-decoration:none;text-transform:uppercase;}a:hover,a:active{background-color:#7A991A;}";

				
				document.getElementsByTagName('head')[0].appendChild(style); */
				
				var naviBarCSS = new Element ('style', {
					type: "text/css",
					html: getCSSStyle(),
					
				});
				
				$(document.head).adopt(naviBarCSS);

			}
			
				
				
				
			

			//var module = new Array(home, topic1, about);

			var module = docs;

			// We load all modules now.
			$("comment").innerHTML = "<br>Loading modules...<br>";

			// Tell how many objects found
			$("comment").innerHTML = $("comment").innerHTML + "Found "
					+ module.length + "...<br>";
			

			// Now we need to display the cool shit :)
			// Put some cool content into da navigation bar

			// Set the alignment of the whole navigation bar, got properties from
			// config
			$("navigation").innerHTML = "<ul>";
			var float = "";
			if (config.navigation.alignment == "horizontal") {
				if (config.navigation.halign == "right")
					float = "right";
				if (config.navigation.halign == "left")
					float = "left";
			}

			// Add all elements from the array to the navigation
			//Decide whether its left- or right-aligned and print each other way around
			if (float == "left") {
				for ( var i = 0; i <= module.length - 1; i++) {
					$("navigation").innerHTML = $("navigation").innerHTML
							+ "<li id=\"" + module[i].name + "\">" + "<a href=\""
							+ module[i].link + "\" class=\"navi_item\">" + module[i].label + "</a>"
							+ "</li>";
					$(module[i].name).style.cssFloat = float;
					
				}
				$("navigation").innerHTML = $("navigation").innerHTML + "</ul>";
			} else {
				for ( var i = module.length - 1; i >= 0; i--) {
					$("navigation").innerHTML = $("navigation").innerHTML
							+ "<li id=\"" + module[i].name + "\">" + "<a href=\""
							+ module[i].link + "\" class=\"navi_item\">"  + module[i].label + "</a>"
							+ "</li>";
					$(module[i].name).style.cssFloat = float;
					
				}
				$("navigation").innerHTML = $("navigation").innerHTML + "</ul>";
				
				
			}
			
			adaptNavibar();
			
			



	}
});