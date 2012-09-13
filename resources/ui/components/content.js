/**
 * This is the fancy content panel.
 */ 
var Content = new Class({
    initialize: function(name){
        this.name = name;
        this.dataItemLoader = new DataItemLoader("src/resources/content/article");
       
    },
    
	build : function(){
		var documents = this.dataItemLoader.getAllDataItems();
		var scope = this.dataItemLoader;
		docs = new Array();
		documents.forEach(function(dataItem){
			docs = docs.append([scope.getDataItem(dataItem)]);
	
		});

		
	},
	

	
	load : function() {
		var headline = new Element("h1",{
			id: ""
		} );
		var content = new Element("p", {
			
		});
		
	}
	
});