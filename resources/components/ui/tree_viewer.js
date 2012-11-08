var TreeViewer = new Class({
    initialize: function(){
    	this.dataItemLoader;
    	this.id;
    	this.container;
    	this.nodes = new Hash();
    	this.tree;
    },
    
    
    build : function(myID, myContainer){
    	
    	this.id = myID;
		if(EnvironmentalPaths.get(myID)){
			this.dataItemLoader = new DataItemLoader(EnvironmentalPaths.get(this.id));
		}else{
			this.dataItemLoader = new DataItemLoader("../resources/");
		}
    	
		
		var gound = new Element('div',{
			id : 'treeview-ground',
		});
		
    	var coll = new Element('input',{
    		type: 'button',
    		value: ' [ ] '
    	});
    	
    	var scope = this;
    	coll.addEvent('click',function(){
    		scope.performAction(new EventInformation(null,null,null,"collapse"));
    	});
    	
    	
    	
    	var exp = new Element('input',{
    		type: 'button',
    		value: ' [+] '
    	});
    	var scope = this;
    	exp.addEvent('click',function(){
    		scope.performAction(new EventInformation(null,null,null,"expand"));
    	});
    	
    	gound.adopt(coll);
    	gound.adopt(exp);
    	
    	
    	var tree_ground = new Element('div',{
    		id : 'tree_container',
    	});
    	
    	gound.adopt(tree_ground);
    	
    	
    	
    	
    	
    	// --- ordinary MooTreeControl example:

    	this.tree = new MooTreeControl({
    		div: tree_ground,
    		mode: 'files',
    		grid: true,
    		onClick: function(node){
    			var path = scope.nodes.get(node.id);
    			if(path){
    				
    				UIManager.triggerAffiliatedComponents(new EventInformation(scope.id, 'home', EnvironmentalPaths.get(scope.id) + path, null));
    			}
    		},
    	},{
    		text: 'Root',
    		open: false,
    	});
    	
    	this.tree.disable(); // this stops visual updates while we're building the tree...
    	
    	this.buildTree(this.tree);
//    	var node1 = tree.insert({text:'Subnode 1', id:'1'});
//    	var node2 = tree.insert({text:'Subnode 2', id:'2'});
//    	var node3 = tree.insert({text:'Subnode 3', id:'3'});
//    	
//    	var node2_1 = node2.insert({text:'Subnode 2.1', id:'2.1'});
//    	var node2_2 = node2.insert({text:'Subnode 2.2', id:'2.2', color:'#ff0000'});
//    	var node2_3 = node2.insert({text:'Subnode 2.3', id:'2.3'});
//    	
//    	var node2_2_1 = node2_2.insert({text:'Subnode 2.2.1', id:'2.2.1', color:'#00a000'});
//    	var node2_2_1_1 = node2_2_1.insert({text:'Subnode 2.2.1.1', id:'2.2.1.1', color:'#0000ff'});
//    	
//    	var node4 = tree.insert({text:'Subnode 4', id:'4'});
    	
    //this.tree.expand();
    	
    	this.tree.enable(); // this turns visual updates on again.
    	
    	myContainer.adopt(gound);
    },
    buildTree : function (myTree){
    	this.getDir(myTree, "", "1");
    	
    },
    getDir : function(myNode, myDir, myIndex){
    	var index = 1;
    	var folder = this.dataItemLoader.getAllDataItems(myDir, true);
    	if(folder == false)
    		return;
    	var scope = this;
    	folder.each(function(file){
    		var thisnode = myNode.insert({text: file, id: myIndex +'.'+ index});
    		scope.getDir(thisnode, myDir + file,myIndex +'.'+ index);
    		scope.getFiles(thisnode, myDir + file, myIndex);
    		index++;
    	});
    	
    },
    getFiles : function(myNode, myDir,myid){
    	var index = 1;
    	var files = this.dataItemLoader.getAllDataItems(myDir);
    	if(files == false)
    		return;
    	var scope = this;
    	files.each(function(file){
    		var newnode = new Object();
    		newnode.text = file;
    		newnode.id = myid+'.'+index
    		scope.nodes.set(newnode.id, myDir + file);
    		myNode.insert(newnode);
    		index++;
    	});
    },
	
	performAction : function(myEventInformation){
		if(myEventInformation.actionType == 'collapse'){
			this.tree.collapse();
		}
		if(myEventInformation.actionType == 'expand'){
			this.tree.expand();
		}
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new TreeViewer();
	},
});