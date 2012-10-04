var Contentviewer = new Class({
    initialize: function(){
    	this.dataItemLoader = new DataItemLoader("src/resources/content/article/home/");
    	this.id;
    	this.container;
    	this.category;
    	this.index;
    },
    build : function(myID, myContainer){
		this.id = myID;
		this.container = myContainer;

		this.index = 0;
		
		var allDocs = this.dataItemLoader.getAllDataItems();
		var doc1 = this.dataItemLoader.getDataItem(allDocs[this.index]);

    	
    	
    	var ground = new Element("div", {
			id : "ContentViewer",
			style : "border-color: green;border-width: 1px;border-style: solid; ",

		});
    	
    	var text = new Element("div", {
    		id : "ContentViewerText",
    		html : doc1.text,
		});
    	
    	
    	var next = new Element("a", {
			id : "ContentViewerNavigation_next",
			href : '#',
			html : 'Next',
			style : "float : right;"
		});
    	
    	var scope = this;
    	next.addEvent('click', function() {
    		scope.nextDoc();
		});
    	
    	var prev = new Element("a", {
			id : "ContentViewerNavigation_previous",
			href : '#',
			html : "Previous",
			style : "float : left;"
		});
    	
    	prev.addEvent('click', function() {
    		scope.prevDoc();
		});
    	
    	
    	var nav = new Element("div", {
			id : "ContentViewerNavigation",
			style : "border-color: grey;border-top: 5px;border-style: solid; ",
		});
    	
    	
    	var clr = new Element("div", {
			style : "clear : both",

		});
    	
    	nav.adopt(prev);
    	nav.adopt(next);
    	nav.adopt(clr);
    	
    	
    	ground.adopt(text);
    	ground.adopt(nav);
   	
		
		$(myContainer).adopt(ground);
    },
    
	nextDoc: function () {
		var allDocs = this.dataItemLoader.getAllDataItems();
		if((allDocs.length - 1) > this.index){
			this.index = this.index + 1;
			var doc = this.dataItemLoader.getDataItem(allDocs[this.index]);
			$('ContentViewerText').innerHTML = doc.text;
		}
		else{
			alert("No more documents available!");
		}
		
		
		 
	},
	
	prevDoc : function(){
		var allDocs = this.dataItemLoader.getAllDataItems();
		if(0 < this.index){
			this.index = this.index - 1;
			var doc = this.dataItemLoader.getDataItem(allDocs[this.index]);
			$('ContentViewerText').innerHTML = doc.text;
		}
		else{
			alert("No more documents available!");
		}
	},
	
	refresh: function () {
		var allDocs = this.dataItemLoader.getAllDataItems();
		var doc = this.dataItemLoader.getDataItem(allDocs[0]);
		$('ContentViewerText').innerHTML = doc.text;
		this.index = 0;
	},
	
	
	performAction : function(myEventInformation){
		this.dataItemLoader = new DataItemLoader("src/resources/content/article/" + myEventInformation.actionName + "/");
		this.refresh();
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Contentviewer();
	},
});