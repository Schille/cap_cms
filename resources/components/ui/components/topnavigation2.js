var Topnavigation = new Class({
    initialize: function(){
    	this.dataItemLoader;
    	this.id;
    	this.container;
    	
		this.docs = new Array();
		var scope = this;
    },
    build : function(myID, myContainer){
		this.id = myID;
		this.container = myContainer;
		
		if(EnvironmentalPaths.get(myID)){
			this.dataItemLoader = new DataItemLoader(EnvironmentalPaths.get(this.id));
			
		}else{
			this.dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
		}
		
		var scope = this;
		this.dataItemLoader.getAllDataItems().forEach(function(dataItem){
			scope.docs.push(scope.dataItemLoader.getDataItem(dataItem));
		});
		
		
		var ground = new Element('div',{
			id : "ground-topnavigation",
		})
		
		var inner  =new Element('div',{
			id : "ground-topnavigation-inner",
		});
		
		var css = new Object();
		css.height = "100px";

		//inner.setStyle("background-image" , "-moz-linear-gradient(top, #09C 25%, #06C 75%)");
		inner.setStyle('background-color','#E2E2E2');
		ground.setStyle("overflow" ,"hidden");
		
		inner.setStyles(css);

		
		var version  = new Element('div',{
			id : "ground-topnavigation-section-version",
			style : "float : right"
		});
		var engineVersion  = new Element('span',{
			html : "Engine Version: " + getEngineVersion() + "</br>",
		});
		var uiVersion  = new Element('span',{
			html : "UIManager Version: " + getUIVersion()
		});
		
		version.adopt(engineVersion);
		version.adopt(uiVersion);
		
		//inner.adopt(version);

		var section  = new Element('div',{
			id : "ground-topnavigation-section",
		});
		section.setStyle("margin-left", "auto");
		section.setStyle("margin-right", "auto");
		section.setStyle("width", "750px");
		
		
		
		var logocontainer  = new Element('div',{
		});
		
		logocontainer.setStyle("height", "100px");
		//logocontainer.setStyle("background-image", "-moz-linear-gradient(top, #09C 30%, rgb(0,51,204) 70%)");
		logocontainer.setStyle("width", "200px");
		logocontainer.setStyle("margin-left", "auto");
		logocontainer.setStyle("margin-right", "80px");
		logocontainer.setStyle("float", "left");
		
		var logo  = new Element('img',{
			src : "src/resources/content/images/logo_small.png",
		});
		logo.setStyle("margin-top", "10px");
		//logo.setStyle("padding-right", "50px");
		logo.setStyle("width", "200px");

		
		logocontainer.adopt(logo);
		section.adopt(logocontainer);
		
		var sectionmenu  = new Element('nobr',{
			id : "ground-topnavigation-section-menu",

		});
				
		//for ( var i = 0; i <= this.docs.length - 1; i++) {
			
			this.docs.each(function(item, ind) {
			
//			var navBarItemBullet = new Element ("li", {
//				id: this.docs[i].name + "_li",
//				style : "display : inline;"
//			});
			
			
			var navBarItemLink = new Element ("a", {
				href: "#",
				id: item.name,
				html: item.label,
				environment : item.environment,
				style: 'text-decoration: none; font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;',
				
			});
			
			var morph = new Fx.Morph(navBarItemLink, {
				'duration' : '300',
				link : 'cancel'
			});
			
			navBarItemLink.addEvents({
				'mouseenter' : function() {
					morph.start({
						'color' : '#ff8c00',
						
					});
				},
				'mouseleave' : function() {
					morph.start({
						'color' : '#204224',
						
					});
				},
			});
			
			var style = new Object();
		    style.color = "#202442";
			style.display = "inline-block";
			style.padding =  "0 12px";
			
			navBarItemLink.setStyles(style);
			
			
			
			
			navBarItemLink.setStyle('margin-top','60px');
			
			//navBarItemLink.setStyle("margin-bottom", "40px");
			navBarItemLink.setStyle("line-height", "25px");
			
			if(ind != scope.docs.length - 1){
				navBarItemLink.setStyle("border-right", "1px solid rgb(99,99,99)");
			}
			
			
			navBarItemLink.addEvent("click",function(){
				UIManager.triggerAffiliatedComponents(new EventInformation(scope.id, $(this).getAttribute('environment'), $(this).id, "changePage"));
			});


		//	navBarItemBullet.adopt(navBarItemLink);
			
			sectionmenu.adopt(navBarItemLink);
			
		});
			
		section.adopt(sectionmenu);
		inner.adopt(section);
		
		
		ground.adopt(inner);
		
		
		var border  = new Element('div',{
			id : "ground-topnavigation-border",
		});
		
		//border.setStyle("background-color", "rgb(0,51,204)");
		border.setStyles({
			'background': 'rgb(255,255,255)', /* Old browsers */
			'background': '-moz-linear-gradient(top, rgba(226,226,226,1) 0%, rgba(211,211,211,1) 100%)', /* FF3.6+ */
		//	'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(211,211,211,1)))', /* Chrome,Safari4+ */
		//	'background': '-webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* Chrome10+,Safari5.1+ */
		//	'background': '-o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* Opera 11.10+ */
		//	'background': '-ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* IE10+ */
		//	'background': 'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* W3C */
			'filter': "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d3d3d3',GradientType=0 )", /* IE6-9 */
		});
		border.setStyle('border-bottom', '1px solid #8C8C8C');
		
		border.setStyle("height", "20px");
		
		ground.adopt(border);
		
		$(myContainer).adopt(ground);
    },

	
	performAction : function(){
		alert("Successful Loaded: " + this.id);
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Topnavigation();
	},
});