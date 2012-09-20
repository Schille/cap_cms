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

var UIManager = new Class({

	buildInitialLayout : function() {
		var config = getInitialConfigFile();
		this.registerComponentIDs(config.register);

		this.affiliateComponents(config.affiliation);

		this.buildContainer(config.layout, $("ground"));

		ComponentResolver.forEach(function(comp, name) {
			comp.build(name);
		});
		var scope = this;
		CSSResolver.forEach(function(div, container){
			if(container == "footer"){
				var value =  $(div).offsetHeight;
				alert(value);
				scope.getFooterCSS(div, value);
			}
			else{
			scope.createCSSLayout(container, div);
			}
		});
		
		window.addEvent("domready", function(){
			CSSResolver.forEach(function(div, container){

			});	
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
			 slave = ComponentAffiliation.get(sender.sender);
			 if (slave != undefined) {
				if (slave instanceof Array) {
					slave.each(function(comp) {
						ComponentResolver.get(comp).getInstance().performAction(sender);
					});
				} else {
					ComponentResolver.get(slave).getInstance().performAction(sender);
				}
			}
		}
	},
	affiliateComponents : function(config) {
		for ( var key in config) {
			ComponentAffiliation.set(key, config[key]);
		}
	},
	buildContainer : function(myPlacement, myContainer) {
		var wrapper = new Element("div", {
			id : "wrapper",
		});
		
		if (myPlacement.header != undefined) {
			if (myPlacement.header == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + "-header",
				});
				wrapper.adopt(div);
				CSSResolver.set("header", div.id);
				this.buildContainer(myPlacement.header, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + "-header",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.header), div);
				ComponentResolver.set(myPlacement.header, comp);
				CSSResolver.set("header", div.id);
				wrapper.adopt(div);
			}
		}
		if (myPlacement.left != undefined) {
			if (myPlacement.left == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + "-left",
				});
				wrapper.adopt(div);
				CSSResolver.set("left", div.id);
				this.buildContainer(myPlacement.left, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + "-left",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.left), div);
				ComponentResolver.set(myPlacement.left, comp);
				CSSResolver.set("left", div.id);
				wrapper.adopt(div);
			}
		}
		if (myPlacement.right != undefined) {
			if (myPlacement.right == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + "-right",
				});
				wrapper.adopt(div);
				CSSResolver.set("right", div.id);
				this.buildContainer(myPlacement.right, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + "-right",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.right), div);
				ComponentResolver.set(myPlacement.right, comp);
				CSSResolver.set("right", div.id);
				wrapper.adopt(div);
			}
		}
		if (myPlacement.center != undefined) {
			var container = new Element("div", {
				id : "container",
			});
			wrapper.adopt(container);
			if (myPlacement.center == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + "-center",
				});
				container.adopt(div);
				CSSResolver.set("center", div.id);
				this.buildContainer(myPlacement.center, div)
			} else {
				var div = new Element("div", {
					id : myContainer.id + "-center",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.center), div);
				ComponentResolver.set(myPlacement.center, comp);
				CSSResolver.set("center", div.id);
				container.adopt(div);
			}
		}
		else{
			var placehoder = new Element("div", {
				id : "placeholder",
			});
			wrapper.adopt(placehoder);
		}
		$(myContainer).adopt(wrapper);
		if (myPlacement.footer != undefined) {
			if (myPlacement.footer == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + "-footer",
				});
				$(myContainer).adopt(div);
				CSSResolver.set("footer", div.id);
				this.buildContainer(myPlacement.footer, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + "-footer",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.footer), div);
				CSSResolver.set("footer", div.id);
				ComponentResolver.set(myPlacement.footer, comp);
				$(myContainer).adopt(div);
			}
		}

	},
	
	createCSSLayout : function(myAlign, myHTMLContainer){
		var containerCSS = new Element ('style', {
			type: "text/css",
			html: this.cssStyleFormat(myAlign, myHTMLContainer),
		});
		$(document.head).adopt(containerCSS);
	},
	
	cssStyleFormat : function(myAlign, myContainer){
		
		if(myAlign == "header"){
		/* Header
		-----------------------------------------------------------------------------*/
		return "div#"+ myContainer +"{"+
		//"	height: 150px;"+
		"	background: #FFE680;"+
		"}";
		}

		if(myAlign == "center"){
		/* Center
		-----------------------------------------------------------------------------*/
		return "div#"+ myContainer +"{"+
		"	padding: 0 0 100px;"+
		//"	display: block;"+
		"	width: 100%;"+
		"	height: 1%;"+
		"	position: relative;"+
		"	background: #FFE720;"+
		"}";
		}
		
		if(myAlign == "left"){
		/* Sidebar Left
		-----------------------------------------------------------------------------*/
		return "div#"+ myContainer +"{"+
		"	float: left;"+
		//"	width: 250px;"+
		"	position: relative;"+
		"	background: #B5E3FF;"+
		//"	left: -250px;"+
		//"	height: 100%;"+
		"}";
		}

		if(myAlign == "right"){
		/* Sidebar Right
		-----------------------------------------------------------------------------*/
		return "div#"+ myContainer +"{"+
		"	float: right;"+
		//"	margin-right: -250px;"+
		//"	width: 250px;"+
		"	position: relative;"+
		"	background: #FFACAA;"+
		//"	height: 100%;"+
		"}";
		}

		if(myAlign == "footer"){
		/* Footer
		-----------------------------------------------------------------------------*/
		return "div#"+ myContainer +"{"+
//		"	height: 200px;"+
//		"   margin: -200px auto 0;";+
		"	background: #BFF08E;"+
		"	position: relative;"+
		"}";
		}
		return "";
	},
	
	getFooterCSS : function(myContainer, mySubMargin){
		var containerCSS = new Element ('style', {
			type: "text/css",
			html: "div#"+ myContainer +"{"+
//			"	height: 200px;"+
			"   margin: -"+ mySubMargin + "px auto 0;"+
			"	background: #BFF08E;"+
			"	position: relative;"+
			"}",
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