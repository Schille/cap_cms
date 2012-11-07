/**
 * Returns the version of this CaP Engine.
 */
function getEngineVersion(){
	return "v0.1";
}
/**
 * Stores all loaded components, they are may not built.
 */
LoadedComponents = new Hash();
/**
 * The UIManager for the current environment
 */
UIManager = null;
/**
 * EnvironmentConfig stores the environment name and the related configuration
 */
EnvironmentConfig = new Hash();
/**
 * EnvironmentConfig stores the environment name and the related configuration
 */
GlobalPaths = new Hash();
/**
 * Security stores the the SecurityManager
 */
Security = null;


var CapEngine = new Class({
	initialize : function(){
		this.initializeConfig();
		
		
		var sec  = new SecurityManager();
		
		if(GlobalPaths.get("components")){
			this.componentManager = new ComponentManager(GlobalPaths.get("components"));
		}
		else{
			this.componentManager = new ComponentManager("src/resources/ui/components/");
		}
		UIManager = new CaPUI(this.componentManager,EnvironmentConfig.get("home"), "home" , this);
		UIManager.buildInitialLayout();
		
		
		
		
	},
	
	initializeConfig : function(){
		var config = this.getConfigFile();
		Object.each(config,function(config,item){
			if(item  == "paths"){
				Object.each(config,function(value,item){
					GlobalPaths.set(item,value);
					console.log("[CaP] Global path: " + item + " to " + value);
				});
			}
			else{
				console.log("[CaP] Added environment: " + item);
				EnvironmentConfig.set(item, config);
			}
			
		});
	},
	
	changeEnvironment : function(myEnvironment){
		if(EnvironmentConfig.get(myEnvironment) != undefined){
		$('ground').destroy();
		document.removeEvents();
		var ground = new Element('div',{ id:'ground'});
		$('CaP').adopt(ground);
		UIManager = new CaPUI(this.componentManager, EnvironmentConfig.get(myEnvironment),myEnvironment, this);
		UIManager.buildInitialLayout();
		}
		else{
			console.error("[CaP] No configuration for environment '" + myEnvironment + "' found!");
		}
	},
	
	getConfigFile : function(){
		var request = new Request.JSON({
		      method: 'get',
		      url: 'config.json',
		      noCache : true,
		      async : false,
		      onFailure : function(){
		    	  console.error("[CaP] Could not load the configuration file!");
		    	  alert("Could not load the configuration file! Perhaps it is not deployed or named correctly.");
		      },
		      onSuccess: function(responseJSON, responseText){  
		      },
		    }).send();
		
		return JSON.decode(request.response.text);
	}
});

var SecurityManager = new Class({
	initialize : function(){
		this.isAuthorized
		this.checkAuthorized();
	},
	checkAuthorized : function(){
		this.isAuthorized = false;
		
		var myObject = new Object();
		myObject.username = "Peter Klaus";
		myObject.password = "test123";
		myObject.isAuthorized = "true";
		
		var request = new Request({
			url : GlobalPaths.get("private") + 'login.json',
			method : 'post',
			data : JSON.encode(myObject),
			async : 'true',
			onSuccess : function(){
				Security.isAuthorized = true;
			},
		}).send();
	}
});


/**
 * Loader to fetch components from the server
 */
var ComponentLoader = new Class({
    initialize: function(myScriptRoot){
        this.scriptRoot = myScriptRoot;
    },
    /**
     * Fetch and inject the given script.
     */
    loadScript : function(myScriptName){
    	var request = new Request({ 
    		  method: 'get', 
    	      noCache : true,
    		  url: this.scriptRoot + myScriptName, 
    		  async : false,
    		  onFailure: function(xhr){
    			success = false;  
    		  },
    		  onRequest: function(){ 
    		  }, 
    		  onSuccess: function(thisscript){ 
    			  script = thisscript;
    		  }
    	  }).send();
		var script = new Element('script',{
			html : request.response.text,
		});
		
		return request.response.text;
    	
    },
    /**
     * Returns an array of all documents in the given directory.
     */
    getAllAvailableComponents : function(){
    	var documents = new Array();
    	new Request.JSON({
    	      method: 'get',
    	      noCache : true,
    	      url: this.scriptRoot,
    	      async : false,
    	      onSuccess: function(responseText) {
                  feed = responseText;
    	      } 
    	    }).send();

    	var json =  JSON.decode(request.response.text);
		
		json.each(function(component){
			documents.push(component);
		});
    	return documents;
    },
    /**
     * Load all available component scripts into the page's environment.
     */
    loadAllAvailableComponents : function(){
    	var scope = this;
    	this.getAllAvailableComponents().forEach(function(script){
    		scope.loadScript(script);
    	});
    }
});

var DataItemUploader = new Class({
	initialize: function(){
		if(GlobalPaths.get("private")){
			this.rootPath = GlobalPaths.get("private");
			//handle 
		}
		
	},
	uploadDocument : function(myFilename, myJson){
		var request = new Request({
			url : GlobalPaths.get("public") + myFilename +'.json',
			method : 'post',
			data : myJson,
			async : 'true',
			onSuccess : function(){
			},
		}).send();
	},
	createDirectory : function(myDirectory){
		var dirs = new Array();
		var current = "";
		if(myDirectory.contains('/')){
			dirs = myDirectory.split('/');
		}
		else{
			dirs.push(myDirectory);
		}
		scope = this;
		dirs.each(function(dir){
			if(dir != ""){
			
			var request = new Request({
				url : scope.rootPath + current + dir,
				method : 'post',
				async : 'true',
				onSuccess : function(){
				},
			});
			request.setHeader("X-Upload-DirCtrl", "mkdir");
			request.send();
			current = current + dir + "/";
				}
			});
	},
	removeDirectory : function(myDirectory){
			var request = new Request({
				url : scope.rootPath + myDirectory,
				method : 'post',
				async : 'true',
				onSuccess : function(){
				},
			});
			request.setHeader("X-Upload-DirCtrl", "rmdir");
			request.send();
	}
	
});

/**
 * A DataItemLoader enables several components to load the items
 * from the sever.
 */
var DataItemLoader = new Class({
    initialize: function(myDataItemRoot){
        this.dataItemRoot = myDataItemRoot;
    },
    /**
     * Returns an array of all documents in the given directory.
     */
    getAllDataItems : function(myDir, folder){
    	if(myDir == undefined)
    		myDir = "";
    	var documents = new Array(); 
    	var request = new Request({
    		header: {"X-JsonIndex": true},
    	      noCache : false,
    	      url: this.dataItemRoot + myDir,
    	      async : false,
    	      onFailure: function() {
    	          var error = "Error " + this.status;
    	          switch (this.status) {
    	              case 404:
    	                  success = false;
    	              break;
    	              case 301:
    	            	  success = false;
    	              break;
    	              case 302:
    	                  error = "Object moved temporarliy (302 redirect)";
    	              break;
    	          }
    	      },
    	    });
    	request.setHeader("X-JsonIndex", true);
    	request.get('json=true');
    	
    	if(request.status != 200){
    		console.warn("[CaP] Directory not available!");
    		return false;
    	}
		var json =  JSON.decode(request.response.text).files;
		
		if(folder == undefined){
			json.each(function(component){
				if(!component.dir){
					documents.push(component.name);
				}
			});
		}
		else{
			var i = 0;
			json.each(function(component){
				if(component.dir){
					if(i != 0)
						documents.push(component.name);
					i++;
				}
			});
		}
		documents.sort(arraySort);
		return documents;
    },
    /**
     * Fetches a DataItem(JSON) document.
     */
    getDataItem : function(myDoc){
    	var request = new Request.JSON({
  	      method: 'get',
  	      url: this.dataItemRoot + myDoc,
	      noCache : true,
  	      async : false,
  	      onSuccess: function(responseText) {
              feed = responseText;
  	      } 
  	    }).send();

  	return JSON.decode(request.response.text);
    },
    
});

var ComponentManager = new Class({
    Extends : ComponentLoader,
	initialize: function(myComponentRoot){
		this.parent(myComponentRoot)
    },
    
    fetchComponent : function(myComponentName){
    	var script = this.loadScript(myComponentName);
    	var loader = new ComponentLoader(myComponentName, script, new Com());
    	LoadedComponents.set(myComponentName,loader);
    	return loader;
    },
    
    initializeComponent : function(myComponentName, myContainer){
    	if(LoadedComponents.has(myComponentName)){
    		return LoadedComponents.get(myComponentName).createInstance(myContainer);
    	}
    	else{
    		return this.fetchComponent(myComponentName).createInstance(myContainer);
    	}
    }
    
});

var ComponentLoader = new Class({
	initialize : function(myScriptName, myScrip, myClassloader){
        this.scriptName = myScriptName;
        this.script = myScrip;
        this.instance = myClassloader;
	},
	createInstance : function(myContainer){
		return new Component(this.scriptName,this.script, this.instance.createInstance(), myContainer) ;
	}
});

var Component = new Class({
    initialize: function(myScriptName, myScrip, myInstance, myContainer){
        this.scriptName = myScriptName;
        this.script = myScrip;
        this.instance = myInstance;
        this.assigendContainer = myContainer;
    },
    build : function(myID){
    	this.instance.build(myID, this.assigendContainer);
    },
    getInstance : function(){
    	return this.instance;
    }
});

 arraySort = function (a,b) {
	return a.toInt() - b.toInt();
 };