/**
 * This is the fancy content panel.
 */ 
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
		"}\n";
		return Style;
	},


	load : function() {
		
		
		var css = this.getCSSStyle();
		
		var cssStyle = new Element("style", {
			type: "text/css",
			html : css

		});
		
		(document.head).adopt(cssStyle);
		
		var headline = new Element("h1",{
			id: ""
		} );
		var content = new Element("p", {
			html: "content"
		});
		var container = new Element("div", {
			class : "roundcorner",
				html: ""
		});
		$("content").adopt(container);
		
	}
	
});