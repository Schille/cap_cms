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


var CapEngine = new Class({
	initialize : function(){
		this.initializeConfig();
		new SecurityManager();
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
				});
			}
			else{;
				EnvironmentConfig.set(item, config);
			}
			
		});
	},
	
	changeEnvironment : function(myEnvironment){
		if(EnvironmentConfig.get(myEnvironment) != undefined){
		$('ground').destroy();
		var ground = new Element('div',{ id:'ground'});
		$('CaP').adopt(ground);
		UIManager = new CaPUI(this.componentManager, EnvironmentConfig.get(myEnvironment),myEnvironment, this);
		UIManager.buildInitialLayout();
		}
		else{
			console.error("No configuration for environment '" + myEnvironment + "' found!");
		}
	},
	
	getConfigFile : function(){
		var request = new Request.JSON({
		      method: 'get',
		      url: 'config.json',
		      noCache : true,
		      async : false,
		      onFailure : function(){
		    	  console.error("Could not load the configuration file!");
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
		var req = new Request({
				url : 'archive/2.json',
	        	method: 'post',
	        	data      : '{test: "123"}',
		    });
		req.setHeader("Content-Type", "text/plain");
		req.send();
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
    getAllDataItems : function(){
    	var documents = new Array(); 
    	var request = new Request({
    		header: {"X-JsonIndex": true},
    	      noCache : false,
    	      url: this.dataItemRoot,
    	      async : false, 
    	    });
    	request.setHeader("X-JsonIndex", true);
    	request.get('json=true');
    	
		var json =  JSON.decode(request.response.text).files;
		
		json.each(function(component){
			if(!component.dir){
				documents.push(component.name);
			}
		});
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
    }
    
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