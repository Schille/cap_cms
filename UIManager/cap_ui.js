/**
 * Returns the version of this UIManager.
 */
function getUIVersion(){
	return "v0.1";
}

function buildInitialLayout(){
	var config = getInitialConfigFile();
	buildContainer(config,$("ground"));
	alert(LoadedComponents.length);
	LoadedComponents.forEach(function(component){
		component.build();
	});
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
		componentManager.initializeComponent(myPlacement.header, div);
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
		componentManager.initializeComponent(myPlacement.footer, div);
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
		componentManager.initializeComponent(myPlacement.left, div);
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
		componentManager.initializeComponent(myPlacement.right, div);
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
		componentManager.initializeComponent(myPlacement.center, div);
		$(myContainer).adopt(div);
		}
	}
}