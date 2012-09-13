/**
 * Returns the version of this CaP Engine.
 */
function getEngineVersion(){
	return "v0.1";
}

LoadedComponents = new Array();


var ComponentLoader = new Class({
    initialize: function(myScriptRoot, myDataItemRoot){
        this.scriptRoot = myScriptRoot;
    },
    /**
     * Fetch and inject the given script.
     */
    loadScript : function(myScriptName){
    	success = false;
    	new Request({ 
    		  method: 'get', 
    		  url: this.scriptRoot + myScriptName, 
    		  async : false,
    		  onFailure: function(xhr){
    			success = false;  
    		  },
    		  onRequest: function(){ 
    		  }, 
    		  onSuccess: function(script){ 
    			  new Element("script", {type : "text/javascript", html : script});
    			  success = true;
    			  LoadedComponents = LoadedComponents.append([myScriptName]);
    		  }
    	  }).send();
    	return success;
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

    	new Element("div", { html: feed }).getElements("td a").forEach(function(img, index){
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

    	new Element("div", { html: feed }).getElements("td a").forEach(function(img, index){
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