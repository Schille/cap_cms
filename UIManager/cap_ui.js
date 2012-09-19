/**
 * Returns the version of this UIManager.
 */
function getUIVersion() {
	return "v0.1";
}

ComponentIDs = new Hash();
ComponentAffiliation = new Hash();
ComponentResolver = new Hash();

var UIManager = new Class({

	buildInitialLayout : function() {
		var config = getInitialConfigFile();
		this.registerComponentIDs(config.register);

		this.affiliateComponents(config.affiliation);

		this.buildContainer(config.layout, $("ground"));

		ComponentResolver.forEach(function(comp, name) {
			comp.build(name);
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
			var slave = ComponentAffiliation.get(sender.sender);
			if (slave != undefined) {
				if (slave instanceof Array) {
					slave.each(function(comp) {
						ComponentResolver.get(comp).getInstance().performAction();
					});
				} else {
					ComponentResolver.get(slave).getInstance().performAction();
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
		if (myPlacement.header != undefined) {
			if (myPlacement.header == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + ".header",
				});
				$(myContainer).adopt(div);
				this.buildContainer(myPlacement.header, div);
			} else {

				var div = new Element("div", {
					id : myContainer.id + ".header",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.header), div);
				ComponentResolver.set(myPlacement.header, comp);
				$(myContainer).adopt(div);
			}
		}
		if (myPlacement.footer != undefined) {
			if (myPlacement.footer == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + ".footer",
				});
				$(myContainer).adopt(div);
				this.buildContainer(myPlacement.footer, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + ".footer",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.footer), div);
				ComponentResolver.set(myPlacement.footer, comp);
				$(myContainer).adopt(div);
			}
		}
		if (myPlacement.left != undefined) {
			if (myPlacement.left == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + ".left",
				});
				$(myContainer).adopt(div);
				this.buildContainer(myPlacement.left, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + ".left",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.left), div);
				ComponentResolver.set(myPlacement.left, comp);
				$(myContainer).adopt(div);
			}
		}
		if (myPlacement.right != undefined) {
			if (myPlacement.right == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + ".right",
				});
				$(myContainer).adopt(div);
				this.buildContainer(myPlacement.right, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + ".right",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.right), div);
				ComponentResolver.set(myPlacement.right, comp);
				$(myContainer).adopt(div);
			}
		}
		if (myPlacement.center != undefined) {
			if (myPlacement.left == "[object Object]") {
				var div = new Element("div", {
					id : myContainer.id + ".center",
				});
				$(myContainer).adopt(div);
				this.buildContainer(myPlacement.center, div);
			} else {
				var div = new Element("div", {
					id : myContainer.id + ".center ",
				});
				var comp = componentManager.initializeComponent(ComponentIDs
						.get(myPlacement.center), div);
				ComponentResolver.set(myPlacement.center, comp);
				$(myContainer).adopt(div);
			}
		}

	}
});

var EventInformation = new Class({
	initialize : function(mySender, myActionName, myActionType) {
		this.sender = mySender;
		this.actionName = myActionName;
		this.actionType = myActionType;
	},
});