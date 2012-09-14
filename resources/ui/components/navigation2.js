Com = new Class({
    initialize: function(){
    	this.dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
    },

    build : function(){
		var documents = this.dataItemLoader.getAllDataItems();
		var scope = this.dataItemLoader;
		docs = new Array();
		documents.forEach(function(dataItem){
			docs = docs.append([scope.getDataItem(dataItem)]);
		});
		navBarItemList = new Element ("ul",{id : "navList"});

		
		
		for ( var i = 0; i <= docs.length - 1; i++) {
			var navBarItemBullet = new Element ("li", {
				id: docs[i].name,
				html : docs[i].label,
			});
			navBarItemBullet.addEvent("click",function(){
				alert($(this).id);
			});
			navBarItemList.adopt(navBarItemBullet);
		}
		
		$("navigation").adopt(navBarItemList);
		this.setListProperties(navBarItemList);
		this.adaptNavibar();
    },
    
    setListProperties : function(){
    	  // First list, using CSS styles in the JavaScript
    	  var list = $$('#navList li');

    	  list.set('morph', {
    	    duration: 200
    	  });

    	  list.addEvents({

    	    mouseenter: function(){
    	      // this refers to the element in an event
    	      this.morph({
    	        'background-color': '#666',
    	        'color': '#FF8',
    	        'margin-left': 5
    	      });
    	    },

    	    mouseleave: function(){
    	      // this refers to the element in an event
    	      this.morph({
    	        'background-color': '#333',
    	        'color': '#888',
    	        'margin-left': 0
    	      });
    	    }

    	  });

    	  // Morphing the list with CSS selectors
    	  $$('#idList2 LI').each(function(el){
    	    el.set('morph', {
    	      duration: 200
    	    }).addEvents({
    	      // Using Function:pass, which is a shorter alternative for
    	      //     function(){
    	      //         el.morph('.hover');
    	      //     }
    	      mouseenter: el.morph.pass('.hover', el),
    	      mouseleave: el.morph.pass('.default', el)
    	    });
    	  });

    },
	getCSSStyle: function () {
		 cssStyle =	"#navList\n" + 
		 				"{\n"+
		 				"margin: 0 50px 0 0;\n"+
		 				"width: 130px;\n"+
		 				"padding: 0;\n"+
		 				"float: left;\n"+	
		 				"}"+
	
			 		"#navList li {\n" +
			 			"display: block;\n" +
			 			"margin: 0;\n"+
			 			"padding: 4px;\n"+
			 			"width: 120px;\n"+
			 			"background-color: #333;\n"+
			 			"color: #888;\n"+
			 			"}\n"+
    				
			 		".hover {\n"+
			 			"background-color: #666;\n"+
			 			"color: #FF8;\n"+
			 			"margin-left: 5px\n"+
			 			"}\n"+
			 			
    				".default {\n"+
    					"background-color: #333;\n"+
    					"color: #888;\n"+
    					"margin-left: 0;\n"+
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
    
});