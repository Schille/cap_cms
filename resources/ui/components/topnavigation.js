var Topnavigation = new Class({
    initialize: function(){
    	this.dataItemLoader;
    	this.id;
    	this.container;
    	
		this.docs = new Array();
		var scope = this;
    },
    build : function(myID, myContainer){
		this.id = myID;
		this.container = myContainer;
		
		if(EnvironmentalPaths.get(myID)){
			this.dataItemLoader = new DataItemLoader(EnvironmentalPaths.get(this.id));
			
		}else{
			this.dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
		}
		
		var scope = this;
		this.dataItemLoader.getAllDataItems().forEach(function(dataItem){
			scope.docs.push(scope.dataItemLoader.getDataItem(dataItem));
		});
		
		
		var ground = new Element('div',{
			id : "ground-topnavigation",
		})
		
		var inner  =new Element('div',{
			id : "ground-topnavigation-inner",
		});
		
		var css = new Object();
		css.height = "100px";

		inner.setStyle("background-image" , "-moz-linear-gradient(top, #09C 25%, #06C 75%)");
		ground.setStyle("overflow" ,"hidden");
		
		inner.setStyles(css);

		
		var version  = new Element('div',{
			id : "ground-topnavigation-section-version",
			style : "float : right"
		});
		var engineVersion  = new Element('span',{
			html : "Engine Version: " + getEngineVersion() + "</br>",
		});
		var uiVersion  = new Element('span',{
			html : "UIManager Version: " + getUIVersion()
		});
		
		version.adopt(engineVersion);
		version.adopt(uiVersion);
		
//		inner.adopt(version);

		var section  = new Element('div',{
			id : "ground-topnavigation-section",
		});
		section.setStyle("margin-left", "auto");
		section.setStyle("margin-right", "auto");
		section.setStyle("width", "700px");
		
		
		
		var logocontainer  = new Element('div',{
		});
		
		logocontainer.setStyle("height", "100px");
		logocontainer.setStyle("background-image", "-moz-linear-gradient(top, #09C 30%, rgb(0,51,204) 70%)");
		logocontainer.setStyle("width", "205px");
		logocontainer.setStyle("margin-left", "auto");
		logocontainer.setStyle("margin-right", "auto");
		logocontainer.setStyle("float", "left");
		
		var logo  = new Element('img',{
			src : "src/resources/content/images/cap.png",
		});
		logo.setStyle("margin-top", "50px");
		logo.setStyle("padding-right", "50px");
		logo.setStyle("width", "200px");

		
		logocontainer.adopt(logo);
		section.adopt(logocontainer);
		
		var sectionmenu  = new Element('ul',{
			id : "ground-topnavigation-section-menu",

		});
		
		
		for ( var i = 0; i <= this.docs.length - 1; i++) {
			var navBarItemBullet = new Element ("li", {
				id: this.docs[i].name + "_li",
				style : "display : inline;"
			});
			
			
			var navBarItemLink = new Element ("a", {
				href: "#",
				id: this.docs[i].name,
				html: this.docs[i].label,
				environment : this.docs[i].environment
				
			});
			
			var style = new Object();
		    style.color = "white";
			style.display = "inline-block";
			style.padding =  "0 12px";
			navBarItemLink.setStyles(style);
			
			navBarItemLink.setStyle("margin-top", "60px");
			navBarItemLink.setStyle("line-height", "25px");
			if(i != this.docs.length - 1){
				navBarItemLink.setStyle("border-right", "1px solid rgb(0,51,204)");
			}
			
			navBarItemLink.addEvent("click",function(){
				UIManager.triggerAffiliatedComponents(new EventInformation(scope.id, $(this).getAttribute('environment'), $(this).id, "changePage"));
			});


			navBarItemBullet.adopt(navBarItemLink);
			sectionmenu.adopt(navBarItemBullet);
			
		}
		
		section.adopt(sectionmenu);
		inner.adopt(section);
		
		
		ground.adopt(inner);
		
		
		var border  = new Element('div',{
			id : "ground-topnavigation-border",
		});
		
		border.setStyle("background-color", "rgb(0,51,204)");
		border.setStyle("height", "5px");
		
		ground.adopt(border);
		
		$(myContainer).adopt(ground);
    },

	
	performAction : function(){
		alert("Successful Loaded: " + this.id);
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Topnavigation();
	},
});