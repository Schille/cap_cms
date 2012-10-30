var SocialBar = new Class({
    initialize: function(){
    	//this.dataItemLoader = new DataItemLoader(
		//"src/resources/content/about/");
    	this.id;
    	this.container;
    	
		this.docs = new Array();
		var scope = this;
    },
    build : function(myID, myContainer){
		this.id = myID;
		scope = this;
		this.container = myContainer;
		
	
		
		var ground = new Element ('div', {
			id: 'ground_sd',
			
			
			});
		
		var social_div = new Element( 'div', {
			style : 'position: absolute; height: 400px; width : 0px;  background-color: grey; z-index: 999;',
		});
		
		var aher = new Element ('a', {
			//html : 'new',
			id: 'aher',
		});
	
		
		ground.adopt(social_div);
		$(myContainer).adopt(aher);
		$(myContainer).adopt(ground);
		
			
		social_div.morph({
			width: 100,
			'margin-right': '1000px',
			});
		
		
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
		return new SocialBar();
	},
});