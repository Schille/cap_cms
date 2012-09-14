/**
 * Returns the version of this CaP Engine.
 */
function getEngineVersion(){
	return "v0.1";
}
/**
 * Stores all loaded components, they are may not built.
 */
LoadedComponents = new Array();


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
    initializeComponent : function(myComponentName, myContainer){
    	var script = this.loadScript(myComponentName);
    	var component = new Component(myComponentName, script, new Com(), myContainer);
    	LoadedComponents = LoadedComponents.append([component]);
    	return component;
    	
    }
});

var Component = new Class({
    initialize: function(myScriptName, myScrip, myInstance, myContainer){
        this.ScriptName = myScriptName;
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