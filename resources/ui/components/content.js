/**
 * This is the fancy content panel.
 */ 
			function firstWords (words) {
				if (words.length > 400) {
					for(var i = 400; i <= 420; i++) {
						if (words.charAt(i) == ' '){
							return words.substring(0, i);
						}
							
					}
					
				}
				
			}

var Content = new Class({
    initialize: function(name){
        this.name = name;
        this.dataItemLoader = new DataItemLoader("src/resources/content/article/");
       
    },
    
	build : function(){
		var documents = this.dataItemLoader.getAllDataItems();
		var scope = this.dataItemLoader;
		docs = new Array();
		documents.forEach(function(dataItem){
			docs = docs.append([scope.getDataItem(dataItem)]);
	
		});

		
	},
	
	
	
	getCSSStyle : function() {
		var Style = 			"div \n " +
		"{\n" +
	
		"border-top-right-radius: 16px;\n" +
		"border-bottom-right-radius: 16px;\n" +
		"background-color:#98bf21;\n" +
		"}\n" +
		"div.content\n" +
		"{\n" +
		"overflow: auto;\n" +
		"}\n";
		return Style;
	},


	load : function() {
		
		
		var css = this.getCSSStyle();
		
		var cssStyle = new Element("style", {
			type: "text/css",
			html : css

		});
		
		var readMore = new Element("a", {
			html: " Read More",
			onmousedown: " $('divcont').morph({ width:475, height: 400}); " +
					"$('anchor').removeEvent('onmousedown');" +
					"$('anchor').addEvent('click', function() {" +
					"$('divcont').morph({ width:475, height: 200});" +
					"$('divcont').html = " + docs[0].text +
					"}); ",
			//onmouseout: "$('divcont').morph({ width: 475, height: 200});"	
			id: "anchor"
			
		});
		
		var divHead = new Element("div", {
			style: "position:relative; width:475px; height:30px; top:0px; left: 0px;  background-color:#D2F95a",
			html : "na moin",

		});
		
		
		
		var divContent = new Element("div", {
			

			
			style: "position:absolute;  width:475px; height:200px; top:5px; left: 7px;  background-color:#C2E94a; overflow:auto; ",
			html : firstWords(docs[0].text),
				id: "divcont"

		});
		divContent.adopt(divHead);		
		
		divContent.adopt(readMore);
		
		
		

		

		
		(document.head).adopt(cssStyle);
		
		var headline = new Element("h1",{
			id: "anyid",
			html: "",
		} );
		var content = new Element("p", {
			html: ""
		});		
		
		divHead.adopt(headline);
		$("content_panel").adopt(content);
		content.adopt(divContent);
		
		
		
	}
	
});