/**
 * Returns the version of this UIManager.
 */
function getUIVersion(){
	return "v0.1";
}

ComponentIDs = new Hash();
ComponentAffiliation = new Hash();
ComponentResolver = new Hash();


function buildInitialLayout(){
	var config = getInitialConfigFile();
	registerComponentIDs(config.register);
	
	affiliateComponents(config.affiliation);
	
	buildContainer(config.layout,$("ground"));
	
	
	var nav1 = ComponentResolver.get("nav1");
	nav1.getInstance().test();
	
	var nav2 = ComponentResolver.get("nav2");
	nav2.getInstance().test();
	
};



function registerComponentIDs(config){
	for(var key in config){
		if(config[key] instanceof Array){
			config[key].each(function(name){
				ComponentIDs.set(name,key);
			});
		}
		else{
			ComponentIDs.set(config[key],key);
		}
	}
};

function affiliateComponents(config){
	for(var key in config){
		ComponentAffiliation.set(key, config[key]);
	}
};

function buildContainer(myPlacement, myContainer){
	if(myPlacement.header != undefined){
		if(myPlacement.header == "[object Object]"){
			var div = new Element("div",{
				id : myContainer.id + ".header",
			});
			$(myContainer).adopt(div);
			buildContainer(myPlacement.header, div);
		} else{
		
		var div = new Element("div", {
			id : myContainer.id + ".header",
		});
		var comp = componentManager.initializeComponent(ComponentIDs.get(myPlacement.header), div);
		ComponentResolver.set(myPlacement.header, comp);
		comp.build();
		$(myContainer).adopt(div);
		}
	}
	if(myPlacement.footer != undefined){
		if(myPlacement.footer == "[object Object]"){
			var div = new Element("div",{
				id : myContainer.id + ".footer",
			});
			$(myContainer).adopt(div);
			buildContainer(myPlacement.footer, div);
		} else{
		var div = new Element("div",{
			id : myContainer.id + ".footer",
		});
		var comp = componentManager.initializeComponent(ComponentIDs.get(myPlacement.footer), div);
		ComponentResolver.set(myPlacement.footer, comp);
		comp.build();
		$(myContainer).adopt(div);
		}
	}
	if(myPlacement.left != undefined){
		if(myPlacement.left == "[object Object]"){
			var div = new Element("div",{
				id : myContainer.id + ".left",
			});
			$(myContainer).adopt(div);
			buildContainer(myPlacement.left, div);
		} else{
		var div = new Element("div",{
			id : myContainer.id + ".left",
		});
		var comp = componentManager.initializeComponent(ComponentIDs.get(myPlacement.left), div);
		ComponentResolver.set(myPlacement.left, comp);
		comp.build();
		$(myContainer).adopt(div);
		}
	}
	if(myPlacement.right != undefined){
		if(myPlacement.right == "[object Object]"){
			var div = new Element("div",{
				id : myContainer.id + ".right",
			});
			$(myContainer).adopt(div);
			buildContainer(myPlacement.right, div);
		} else{
		var div = new Element("div",{
			id : myContainer.id + ".right",
		});
		var comp = componentManager.initializeComponent(ComponentIDs.get(myPlacement.right), div);
		ComponentResolver.set(myPlacement.right, comp);
		comp.build();
		$(myContainer).adopt(div);
		}
	}
	if(myPlacement.center != undefined){
		if(myPlacement.left == "[object Object]"){
			var div = new Element("div",{
				id : myContainer.id + ".center",
			});
			$(myContainer).adopt(div);
			buildContainer(myPlacement.center, div);
		} else{
		var div = new Element("div",{
			id : myContainer.id + ".center ",
		});
		var comp = componentManager.initializeComponent(ComponentIDs.get(myPlacement.center), div);
		ComponentResolver.set(myPlacement.center, comp);
		comp.build();
		$(myContainer).adopt(div);
		}
	}
};

var EventInformation = new Class({
    initialize: function(myActionName, myActionType){
        this.actionName = myActionName;
        this.actionType = myActionType;
    },
});