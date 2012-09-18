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
    	script = "";
    	new Request({ 
    		  method: 'get', 
    		  url: this.scriptRoot + myScriptName, 
    		  async : false,
    		  onFailure: function(xhr){
    			success = false;  
    		  },
    		  onRequest: function(){ 
    		  }, 
    		  onSuccess: function(thisscript){ 
    			  //new Element("script", {type : "text/javascript", html : script});
    			  script = thisscript;
    		  }
    	  }).send();
    	return script;
    },
    /**
     * Returns an array of all documents in the given directory.
     */
    getAllAvailableComponents : function(){
    	var documents = new Array();
    	new Request({
    	      method: 'get',
    	      url: this.scriptRoot,
    	      async : false,
    	      onSuccess: function(responseText) {
                  feed = responseText;
    	      } 
    	    }).send();

    	new Element("div", { html: feed }).getElements("li a").forEach(function(img, index){
    	    if(index != 0) {
    	    	var doc = img.get('href');
    	    		if(doc.test('.*.js$')){
    	    			documents = documents.append([doc]);
    	    		}
    	    }
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


var DataItemLoader = new Class({
    initialize: function(myDataItemRoot){
        this.dataItemRoot = myDataItemRoot;
    },
    /**
     * Returns an array of all documents in the given directory.
     */
    getAllDataItems : function(){
    	var documents = new Array(); 
    	new Request({
    	      method: 'get',
    	      url: this.dataItemRoot,
    	      async : false,
    	      onSuccess: function(responseText) {
                  feed = responseText;
    	      } 
    	    }).send();

    	new Element("div", { html: feed }).getElements("li a").forEach(function(img, index){
    	    if(index != 0) {
    	    	var doc = img.get('href');
    	    		if(doc.test('.*.json$')){
    	    			documents = documents.append([doc]);
    	    		}
    	    }
    	});
    	return documents;
    },
    /**
     * Fetches a DataItem(JSON) document.
     */
    getDataItem : function(myDoc){
    	new Request({
  	      method: 'get',
  	      url: this.dataItemRoot + myDoc,
  	      async : false,
  	      onSuccess: function(responseText) {
              feed = responseText;
  	      } 
  	    }).send();

  	return JSON.decode(feed);
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
    		alert("CACHED COMPONENT");
    		return LoadedComponents.get(myComponentName).createInstance(myContainer);
    	}
    	else{
    		alert("LOAD COMPONENT");
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
    build : function(){
    	this.instance.build(this.assigendContainer);
    },
    getInstance : function(){
    	return this.instance;
    }
});

function getInitialConfigFile(){
	new Request({
	      method: 'get',
	      url: "config.json",
	      async : false,
	      onSuccess: function(responseText) {
            feed = responseText;
	      } 
	    }).send();
	return JSON.decode(feed);
}