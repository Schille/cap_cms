/**
 * Returns the version of this UIManager.
 */
function getUIVersion() {
	return "v0.1";
}

ComponentIDs = new Hash();
ComponentAffiliation = new Hash();
ComponentResolver = new Hash();
CSSResolver = new Hash();
ComponentPlacement = new Hash();
ToBeRunFuctions = new Array();


var UIManager = new Class({

	buildInitialLayout : function() {
		//fetch the initial config file from the server
		var config = getInitialConfigFile();
		
		//Register the components - config.json/register
		this.registerComponentIDs(config.register);
		
		//Affiliate the components - config.json/affiliation
		this.affiliateComponents(config.affiliation);
		
		//Build the initial layout container
		$("ground").adopt(this.buildContainer(config.layout, "ground"));
		
		//Set the look - config.json/look
		this.createLook(config.look, "ground");
		
		//invoke the build method of the configured components 
		ComponentResolver.forEach(function(comp, name) {
			comp.build(name);
		});

		ToBeRunFuctions.forEach(function(func){
			func();
		});

	},
	
	registerComponentIDs : function(config) {
		for ( var key in config) {
			if (config[key] instanceof Array) {
				config[key].each(function(name) {
					ComponentIDs.set(name, key);
				});
			} else {
				ComponentIDs.set(config[key], key);
			}
		}
	},
	triggerAffiliatedComponents : function(sender) {
		if (sender instanceof EventInformation) {
			if (sender.actionType == "sizeChanged") {
				this.sizeChanged(sender.sender);
				return;
			}

			slave = ComponentAffiliation.get(sender.sender);
			if (slave != undefined) {
				if (slave instanceof Array) {
					slave.each(function(comp) {
						ComponentResolver.get(comp).getInstance()
								.performAction(sender);
					});
				} else {
					ComponentResolver.get(slave).getInstance().performAction(
							sender);
				}
			}
		}
	},
	
	affiliateComponents : function(config) {
		for ( var key in config) {
			ComponentAffiliation.set(key, config[key]);
		}
	},
	
	createLook : function(myConfig, myContainer){
		if(myConfig.background){
			$(myContainer).setStyle("background-color", myConfig.background);
		}
		
		//Add more config attributes here!
	},
	
	buildContainer : function(myPlacement, myContainerID) {
		//Check whether myPlacement is undefinded
		//so no layout can be generated
		if(!myPlacement){
			alert("Malformed Layout Configuration");
		}
		//
		var groundPanel = new Element("div", {
			id : myContainerID + "-groundPanel",
			style : "height: inherit;"
		});
		if(myPlacement.footer){
			var wrapper = new Element("div", {
				id : myContainerID + "-wrapper",
			});
			var notInWrapper = groundPanel;
			groundPanel = wrapper;
		}
		
		//HEADER ----- Header Layout
		if(myPlacement.header){
			var containerCSS = this.getContainerCSS(myPlacement.header, "header");
			//Create new div container 
			var header = new Element("div", {
				id : groundPanel.id + "-header",
			});
			header.setStyles(containerCSS);
			//Check whether this is a complex layout definition
			if(myPlacement.header.header || myPlacement.header.footer || myPlacement.header.center ||
					myPlacement.header.left || myPlacement.header.right){
				header.adopt(this.buildContainer(myPlacement.header, header.id));
			}
			//Check whether a component has been configured
			if(myPlacement.header.component){
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.header.component), header);
				ComponentResolver.set(myPlacement.header.component, comp);
				ComponentPlacement.set(myPlacement.header.component, header);
				header.adopt(comp);
			}
			groundPanel.adopt(header);
		}
		//HEADER END -----
		
		//LEFT ----- Left Layout
		if(myPlacement.left){
			var containerCSS = this.getContainerCSS(myPlacement.left, "left");
			//Create new div container 
			var left = new Element("div", {
				id : groundPanel.id + "-left",
			});
			left.setStyles(containerCSS);
			//Check whether this is a complex layout definition
			if(myPlacement.left.header || myPlacement.left.footer || myPlacement.left.center ||
					myPlacement.left.left || myPlacement.left.right){
				left.adopt(this.buildContainer(myPlacement.left, left.id));
			}
			//Check whether a component has been configured
			if(myPlacement.left.component){
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.left.component), left);
				ComponentResolver.set(myPlacement.left.component, comp);
				ComponentPlacement.set(myPlacement.left.component, left);
				left.adopt(comp);
			}
			groundPanel.adopt(left);
		}
		//LEFT END -----
		
		//RIGHT ----- Right Layout
		if(myPlacement.right){
			var containerCSS = this.getContainerCSS(myPlacement.right, "right");
			//Create new div container 
			var right = new Element("div", {
				id : groundPanel.id + "-right",
			});
			right.setStyles(containerCSS);
			//Check whether this is a complex layout definition
			if(myPlacement.right.header || myPlacement.right.footer || myPlacement.right.center ||
					myPlacement.right.left || myPlacement.right.right){
				right.adopt(this.buildContainer(myPlacement.right, right.id));
			}
			//Check whether a component has been configured
			if(myPlacement.right.component){
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.right.component), right);
				ComponentResolver.set(myPlacement.right.component, comp);
				ComponentPlacement.set(myPlacement.right.component, right);
				right.adopt(comp);
			}
			groundPanel.adopt(right);
		}
		//RIGHT END -----
		
		//CENTER ----- Center Layout
		if(myPlacement.center){
			var containerCSS = this.getContainerCSS(myPlacement.center, "center");
			//Create new div container 
			var center = new Element("div", {
				id : groundPanel.id + "-center",
			});
			center.setStyles(containerCSS);
			//Check whether this is a complex layout definition
			if(myPlacement.center.header || myPlacement.center.footer || myPlacement.center.center ||
					myPlacement.center.left || myPlacement.center.right){
				center.adopt(this.buildContainer(myPlacement.center, center.id));
			}
			//Check whether a component has been configured
			if(myPlacement.center.component){
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.center.component), center);
				ComponentResolver.set(myPlacement.center.component, comp);
				ComponentPlacement.set(myPlacement.center.component, center);
				center.adopt(comp);
			}
			groundPanel.adopt(center);
		}
		//CENTER END ----
		
		//Add float cleaner
		groundPanel.adopt(new Element("div", {
			style : "clear: both;",
		}));
		
		//FOOTER ----- Center Layout
		if(myPlacement.footer){
			notInWrapper.adopt(groundPanel); // appand all other container 
			//Create new div container 
			var footer = new Element("div", {
				id : notInWrapper.id + "-footer",
			});
			//Check whether this is a complex layout definition
			if(myPlacement.footer.header || myPlacement.footer.footer || myPlacement.footer.center ||
					myPlacement.footer.left || myPlacement.footer.right){
				footer.adopt(this.buildContainer(myPlacement.footer, footer.id));
			}
			//Check whether a component has been configured
			if(myPlacement.footer.component){
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.footer.component), footer);
				ComponentResolver.set(myPlacement.footer.component, comp);
				ComponentPlacement.set(myPlacement.footer.component, footer);
				footer.adopt(comp);
			}
			var containerCSS = this.getContainerCSS(myPlacement.footer, "footer", groundPanel, footer.id, center.id);
			notInWrapper.adopt(footer);
			footer.setStyles(containerCSS);
			return notInWrapper; //If a footer has been configured - return the wrapper
		}
		//FOOTER END ----
		return groundPanel;
	},
	
	//Function to get CSS String for the given container !Add style attributes of config file here! 
	getContainerCSS : function(myConfig, myContainerType, myWrapper, myfooterID, mycenterID){
		var resultingCSS = new Object();
		if(myConfig.width){ //Check _width_ has been set
			resultingCSS.width = myConfig.width;
		}
		if(myConfig.position){ //Check _position_ has been set
			if(myConfig.position instanceof Array){
				toBeTested = myConfig.position;
			}
			else{
				toBeTested = [myConfig.position];
			}	
			
			toBeTested.forEach(function(value){
				switch (value) {
				case "centered":
					resultingCSS.margin = "0px auto";
					break;
				case "left": 
					resultingCSS.margin = "auto 0px";
					break;
				case "right":
					resultingCSS.margin = "auto 0px auto auto";
					break;
				case "sticky":
					if(myContainerType == "footer"){
						ToBeRunFuctions.push(function(){ 
							var negMar = $(myfooterID).getHeight();	
							$(myWrapper).setStyles({
							height : 'auto !important',
							"min-height" : '100%',
							}); 
							
							$(mycenterID).setStyles({
								"padding-bottom": negMar +'px',
							});
							
							$(myfooterID).setStyles({
							position : "relativ",
							"margin-top": '-' + negMar +'px',
							"hight" : negMar + 'px'
							}); 
						});
						
					}
					break;
				default:
					break;
				}
			});
			
			
		}
		if(myConfig.overflow){
			resultingCSS.overflow = myConfig.overflow;
		}
		else{
			resultingCSS.overflow = "auto";
		}
		//Add more config attributes here!
		
		switch (myContainerType) {
		case "left":
			resultingCSS.float = "left";
			break;
		case "right":
			resultingCSS.float = "right";
			break;
		default:
			break;
		}
		return resultingCSS;
	},
	
	buildCSSProperty : function(myPropertyName, myValue){
		return myPropertyName + ": " + myValue + "; ";
	},

	createCSSLayout : function(myAlign, myHTMLContainer) {
		var containerCSS = new Element('style', {
			type : "text/css",
			html : this.cssStyleFormat(myAlign, myHTMLContainer),
		});
		$(document.head).adopt(containerCSS);
	},

	setLeftHeight : function(container) {
		var height = 0;
		var brosis = $(container).getParent().getChildren();

		brosis.each(function(value) {
			if (height <= value.getHeight()) {
				height = value.getHeight();
			}
		});
		// height + ComponentPlacement.get().getHeight();

		return height;

	},

	cssStyleFormat : function(myAlign, myContainer) {

		if (myAlign == "header") {
			/*
			 * Header
			 * -----------------------------------------------------------------------------
			 */
			return "div#" + myContainer + "{" + "width:100%;"
					+ "overflow:auto;" + "display:block;"
					+ "position : relative;" + "background-color:#D9B6B6;"
					+ "}";
		}

		if (myAlign == "center") {
			/*
			 * Center
			 * -----------------------------------------------------------------------------
			 */
			return "div#" + myContainer + "{" + //	"float: left;" +
			"overflow : auto;" +
			// " display: block;"+
			//"z-index: -1;" +
			// " width: 200px;" + "" +
			"position: relative;" + "background: #7FE940;" + "}";
		}

		if (myAlign == "left") {
			/*
			 * Sidebar Left
			 * -----------------------------------------------------------------------------
			 */
			return "div#" + myContainer + "{" + "float: left;" +
			 "width: inherint;"+
			"position: relative;" + "background: #B5E3FF;" +
			// " left: -250px;"+
			"height: inherit;" +

			"}";
		}

		if (myAlign == "right") {
			/*
			 * Sidebar Right
			 * -----------------------------------------------------------------------------
			 */
			return "div#" + myContainer + "{" + "float: right;" +
			// " margin-right: -250px;"+
			// " width: 250px;"+
			// " position: relative;"
			+"	background: #FFACAA;" +
			// " left: -250px;"+
			"height: inherit;" +
			"}";
		}

		if (myAlign == "footer") {
			/*
			 * Footer
			 * -----------------------------------------------------------------------------
			 */
			return "div#" + myContainer + "{" + "height: 200%;" +
			// " margin: -200px auto 0;";+
			"background: #BFF08E;" + "position: relative;" + "}";
		}
		return "";
	},

	getFooterCSS : function(myContainer, mySubMargin) {
		var containerCSS = new Element('style', {
			type : "text/css",
			html : "div#" + myContainer + "{" +
			// " height: 200px;"+
			"margin: -" + mySubMargin + "px auto 0;" + "background: #BFF08E;"
					+ "position: relative;" + "}",
		});
		$(document.head).adopt(containerCSS);
	}
});

var EventInformation = new Class({
	initialize : function(mySender, myActionName, myActionType) {
		this.sender = mySender;
		this.actionName = myActionName;
		this.actionType = myActionType;
	},
});