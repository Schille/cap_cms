/**
 * Returns the version of this UIManager.
 */
function getUIVersion() {
	return "v0.2";
}

/**
 * CaPUI is an UI Manager in order to visualize the frontend
 */
var CaPUI = new Class(
		{
			initialize : function(myComponentManager, myEnvironmentConfig,
					myEnvironment, myEngine) {

				ComponentIDs = new Hash();
				ComponentAffiliation = new Hash();
				ComponentResolver = new Hash();
				ComponentPlacement = new Hash();
				ToBeRunFuctions = new Array();
				EnvironmentalPaths = new Hash();

				this.componentManager = myComponentManager;
				this.environmentConfig = myEnvironmentConfig;
				this.environment = myEnvironment;
				this.engine = myEngine;
			},

			buildInitialLayout : function() {
				if (this.environmentConfig.paths) {
					console.log("Creating paths for environment: "
							+ this.environment);
					this.getEnvironmentalPaths(this.environmentConfig.paths);
				} else {
					console.warn("No settings for 'paths' in environment: "
							+ this.environment);
				}
				// Set the look - config.json/look
				if (this.environmentConfig.look) {
					console.log("Creating look for environment: "
							+ this.environment);
					this.createLook(this.environmentConfig.look, "ground");
				} else {
					console.warn("No settings for 'look' in environment: "
							+ this.environment);
				}

				// Register the components - config.json/register
				if (this.environmentConfig.register) {
					console.log("Creating component register for environment: "
							+ this.environment);
					this.registerComponentIDs(this.environmentConfig.register);
				} else {
					console.warn("No settings for 'register' in environment: "
							+ this.environment);
				}

				// Affiliate the components - config.json/affiliation
				if (this.environmentConfig.affiliation) {
					console
							.log("Creating component affiliation for environment: "
									+ this.environment);
					this
							.affiliateComponents(this.environmentConfig.affiliation);
				} else {
					console
							.warn("No settings for 'affiliation' in environment: "
									+ this.environment);
				}

				// Build the initial layout container
				if (this.environmentConfig.layout) {
					console.log("Creating layout container for environment: "
							+ this.environment);
					$("ground").adopt(
							this.buildContainer(this.environmentConfig.layout,
									"ground"));
				} else {
					console.error("No settings for 'layout' in environment: "
							+ this.environment);
				}

				// invoke the build method of the configured components
				ComponentResolver.forEach(function(comp, name) {
					console.log("Building component: " + comp.scriptName);
					comp.build(name);
					console.log("Component: " + comp.scriptName
							+ " successful!");
				});

				// invoke all registered functions after components creation
				ToBeRunFuctions.forEach(function(func) {
					func();
				});

			},
			
			getEnvironmentalPaths : function(config){
				Object.each(config,function(value,item){
					EnvironmentalPaths.set(item,value);
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
					if (sender.environment != this.environment) {
						console.log("Changing environment to: "
								+ sender.environment);
						this.changeEnvironment(sender.environment);
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
							ComponentResolver.get(slave).getInstance()
									.performAction(sender);
						}
					}
				}
			},

			affiliateComponents : function(config) {
				for ( var key in config) {
					ComponentAffiliation.set(key, config[key]);
				}
			},

			createLook : function(myConfig, myContainer) {
				if (myConfig.background) {
					$(myContainer).setStyle("background-color",
							myConfig.background);
				}

				if (myConfig.image) {
					var bgimg = new Element(
							'img',
							{
								src : myConfig.image,
								style : "left: 0;position: absolute;top: 0;width: 100%;height : 100%; z-index: -5000;",
							});
					$(myContainer).adopt(bgimg);
				}

				// --------Add more config attributes here!------------
			},

			buildContainer : function(myPlacement, myContainerID) {
				// Check whether myPlacement is undefinded
				// so no layout can be generated
				if (!myPlacement) {
					alert("Malformed Layout Configuration");
				}
				//
				var groundPanel = new Element("div", {
					id : myContainerID + "-groundPanel",
					style : "height: inherit;"
				});
				if (myPlacement.footer) {
					var wrapper = new Element("div", {
						id : myContainerID + "-wrapper",
					});
					var notInWrapper = groundPanel;
					groundPanel = wrapper;
				}

				// HEADER ----- Header Layout
				if (myPlacement.header) {
					var containerCSS = this.getContainerCSS(myPlacement.header,
							"header");
					// Create new div container
					var header = new Element("div", {
						id : groundPanel.id + "-header",
					});
					header.setStyles(containerCSS);
					// Check whether this is a complex layout definition
					if (myPlacement.header.header || myPlacement.header.footer
							|| myPlacement.header.center
							|| myPlacement.header.left
							|| myPlacement.header.right) {
						header.adopt(this.buildContainer(myPlacement.header,
								header.id));
					}
					// Check whether a component has been configured
					if (myPlacement.header.component) {
						var comp = this.componentManager.initializeComponent(
								ComponentIDs.get(myPlacement.header.component),
								header);
						ComponentResolver.set(myPlacement.header.component,
								comp);
						ComponentPlacement.set(myPlacement.header.component,
								header);
						header.adopt(comp);
					}
					groundPanel.adopt(header);
				}
				// HEADER END -----

				// LEFT ----- Left Layout
				if (myPlacement.left) {
					var containerCSS = this.getContainerCSS(myPlacement.left,
							"left");
					// Create new div container
					var left = new Element("div", {
						id : groundPanel.id + "-left",
					});
					left.setStyles(containerCSS);
					// Check whether this is a complex layout definition
					if (myPlacement.left.header || myPlacement.left.footer
							|| myPlacement.left.center || myPlacement.left.left
							|| myPlacement.left.right) {
						left.adopt(this.buildContainer(myPlacement.left,
								left.id));
					}
					// Check whether a component has been configured
					if (myPlacement.left.component) {
						var comp = this.componentManager.initializeComponent(
								ComponentIDs.get(myPlacement.left.component),
								left);
						ComponentResolver.set(myPlacement.left.component, comp);
						ComponentPlacement
								.set(myPlacement.left.component, left);
						left.adopt(comp);
					}
					groundPanel.adopt(left);
				}
				// LEFT END -----

				// RIGHT ----- Right Layout
				if (myPlacement.right) {
					var containerCSS = this.getContainerCSS(myPlacement.right,
							"right");
					// Create new div container
					var right = new Element("div", {
						id : groundPanel.id + "-right",
					});
					right.setStyles(containerCSS);
					// Check whether this is a complex layout definition
					if (myPlacement.right.header || myPlacement.right.footer
							|| myPlacement.right.center
							|| myPlacement.right.left
							|| myPlacement.right.right) {
						right.adopt(this.buildContainer(myPlacement.right,
								right.id));
					}
					// Check whether a component has been configured
					if (myPlacement.right.component) {
						var comp = this.componentManager.initializeComponent(
								ComponentIDs.get(myPlacement.right.component),
								right);
						ComponentResolver
								.set(myPlacement.right.component, comp);
						ComponentPlacement.set(myPlacement.right.component,
								right);
						right.adopt(comp);
					}
					groundPanel.adopt(right);
				}
				// RIGHT END -----

				// CENTER ----- Center Layout
				if (myPlacement.center) {
					var containerCSS = this.getContainerCSS(myPlacement.center,
							"center");
					// Create new div container
					var center = new Element("div", {
						id : groundPanel.id + "-center",
					});
					center.setStyles(containerCSS);
					// Check whether this is a complex layout definition
					if (myPlacement.center.header || myPlacement.center.footer
							|| myPlacement.center.center
							|| myPlacement.center.left
							|| myPlacement.center.right) {
						center.adopt(this.buildContainer(myPlacement.center,
								center.id));
					}
					// Check whether a component has been configured
					if (myPlacement.center.component) {
						var comp = this.componentManager.initializeComponent(
								ComponentIDs.get(myPlacement.center.component),
								center);
						ComponentResolver.set(myPlacement.center.component,
								comp);
						ComponentPlacement.set(myPlacement.center.component,
								center);
						center.adopt(comp);
					}
					groundPanel.adopt(center);
				}
				// CENTER END ----

				// Add float cleaner
				groundPanel.adopt(new Element("div", {
					style : "clear: both;",
				}));

				// FOOTER ----- Center Layout
				if (myPlacement.footer) {
					notInWrapper.adopt(groundPanel); // appand all other container
					// Create new div container
					var footer = new Element("div", {
						id : notInWrapper.id + "-footer",
					});
					// Check whether this is a complex layout definition
					if (myPlacement.footer.header || myPlacement.footer.footer
							|| myPlacement.footer.center
							|| myPlacement.footer.left
							|| myPlacement.footer.right) {
						footer.adopt(this.buildContainer(myPlacement.footer,
								footer.id));
					}
					// Check whether a component has been configured
					if (myPlacement.footer.component) {
						var comp = this.componentManager.initializeComponent(
								ComponentIDs.get(myPlacement.footer.component),
								footer);
						ComponentResolver.set(myPlacement.footer.component,
								comp);
						ComponentPlacement.set(myPlacement.footer.component,
								footer);
						footer.adopt(comp);
					}
					if (center != undefined) {
						var containerCSS = this.getContainerCSS(
								myPlacement.footer, "footer", groundPanel,
								footer.id, center.id);
					} else {
						var containerCSS = this.getContainerCSS(
								myPlacement.footer, "footer", groundPanel,
								footer.id);
					}
					//finally add the footer into the 'notinwrapper'  
					notInWrapper.adopt(footer);
					footer.setStyles(containerCSS);
					return notInWrapper; // If a footer has been configured - return the wrapper including footer
				}
				// FOOTER END ----
				return groundPanel; //return without a footer
			},

			/**
			* Function to get CSS String for the given container !Add style
			* attributes of config file here!
			*/
			getContainerCSS : function(myConfig, myContainerType, myWrapper,
					myfooterID, mycenterID) {
				var resultingCSS = new Object();
				if (myConfig.width) { // Check _width_ has been set
					resultingCSS.width = myConfig.width;
				}
				if (myConfig.position) { // Check _position_ has been set
					if (myConfig.position instanceof Array) {
						toBeTested = myConfig.position; // assign the configuration array
					} else {
						toBeTested = [ myConfig.position ]; // assign a single element as array, too
					}

					toBeTested.forEach(function(value) { //iterate over the entire array to set all values
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
						case "sticky": //complex setting for sticky footer
							if (myContainerType == "footer") {
								ToBeRunFuctions.push(function() { //add this code to the functions, which will be invoked after the components have been build
									var negMar = $(myfooterID).getHeight();
									$(myWrapper).setStyles({
										height : 'auto !important',
										"min-height" : '100%',
									});

									if (mycenterID != undefined) { //in case no 'center' has been set
										$(mycenterID).setStyles({
											"padding-bottom" : negMar + 'px',
										});
									}

									$(myfooterID).setStyles({
										position : "relativ",
										"margin-top" : '-' + negMar + 'px',
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
				if (myConfig.overflow) {
					resultingCSS.overflow = myConfig.overflow;
				} else {
					resultingCSS.overflow = "auto";
				}
				
				// --------------Add more config attributes here!----------------

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

			buildCSSProperty : function(myPropertyName, myValue) {
				return myPropertyName + ": " + myValue + "; ";
			},

			createCSSLayout : function(myAlign, myHTMLContainer) {
				var containerCSS = new Element('style', {
					type : "text/css",
					html : this.cssStyleFormat(myAlign, myHTMLContainer),
				});
				$(document.head).adopt(containerCSS);
			},

			changeEnvironment : function(myEnvironment) {
				this.engine.changeEnvironment(myEnvironment)
			},

		});

var EventInformation = new Class({
	initialize : function(mySender, myEnvironment, myActionName, myActionType) {
		this.sender = mySender;
		this.actionName = myActionName;
		this.actionType = myActionType;
		this.environment = myEnvironment;
	},
});