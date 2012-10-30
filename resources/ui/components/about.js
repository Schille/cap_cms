var About = new Class({
    initialize: function(){
    	this.dataItemLoader = new DataItemLoader(
		"src/resources/content/about/");
    	this.id;
    	this.container;
    	
		this.docs = new Array();
		var scope = this;
    },
    build : function(myID, myContainer){
		this.id = myID;
		scope = this;
		this.container = myContainer;
		
		this.allDocs = this.dataItemLoader.getAllDataItems();
		
		var ground = new Element ('div', {
			id: 'ground_about',
			});
		
		this.allDocs.each(function(doc, ind) {
			
			console.log('[About] Creating teammember div.')
			
			var item = scope.dataItemLoader.getDataItem(doc);
			
			var member = new Element('div', {
			
			});
			
			var image = new Element('img', {
				
				
			});
		
			if(item.image == undefined || item.image == '') {
				console.log('[About] There is no profile image defined for index' + ind);
				item.image = 'src/resources/content/images/no_profile_image.gif';
				if (ind % 2 == 0) {
					image.setStyles({
						'-moz-transform': 'scaleX(-1)',
						'-o-transform': 'scaleX(-1)',
			        	'-webkit-transform': 'scaleX(-1)',
			        	'transform': 'scaleX(-1)',
			        	'filter': 'FlipH',
			        	'-ms-filter': "FlipH",
					});
				}
				
			}
			
			image.setProperty('src', item.image);
			
			image.setStyles({
				'padding' : '3px',
				'border' : '1px solid #202442',
			});
			
		
			var name = new Element('h3', {
				html:  item.surname + ' ' + item.name,
				style : 'font-family : Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; color: #202442;',
				
			});
			
			var place = new Element('p', {
				 html : item.city+', '+item.country,
				 style : 'font-family : Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; color: #202442;',
				 
			})
			
			var role = new Element('p', {
				html : item.role,
				style : 'font-family : Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; font-style: italic; font-size: 12px;',
			});
			
			var text = new Element('p', {
				html : item.description,
				style : 'font-family : Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif; font-size: 12px',
			});
			
			member.setStyles({
				'width' : '500px',
				'padding' : '20px',
			});
			image.setStyles({
				'float':'left',
				'margin' : '7px',
			
			});
			
			if (ind % 2 == 1) {
				image.setStyle('float','right');
				member.setStyle('float','right');
			}
			else {
				image.setStyle('float','left');
				member.setStyle('float','left');
			}
			
			member.adopt(image);
			member.adopt(name);
			member.adopt(place);
			member.adopt(role);
			member.adopt(text);
			
			
			ground.adopt(member);
		
			
		
		});
		
		$(myContainer).adopt(ground);
		
		
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
		return new About();
	},
});