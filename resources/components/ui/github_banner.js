var Banner = new Class({
    initialize: function(){
    	this.dataItemLoader;
    	this.id;
    	this.container;
    	
		this.docs = new Array();
    },
    build : function(myID, myContainer){
		this.id = myID;
		this.container = myContainer;
		
	var link = new Element('a',{
		href: 'https://github.com/Schille/cap_cms',
		
	});
	
	var image = new Element ('img', {
		style: 'position: absolute; top: 0; right: 0; border: 0;',
		src: 'https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png',
		alt: 'Fork us on GitHub',
	}) ;
		link.adopt(image);
		

		$(myContainer).adopt(link);
    },

	
	performAction : function(){
		this.build();
		alert("Successful Loaded: " + this.id);
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Banner();
	},
});