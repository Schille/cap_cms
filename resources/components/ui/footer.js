var Footer = new Class({
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
		
	
		
//		
//		if(EnvironmentalPaths.get(myID)){
//			this.dataItemLoader = new DataItemLoader(EnvironmentalPaths.get(this.id));
//			
//		}else{
//			this.dataItemLoader = new DataItemLoader("src/resources/ui/navigation/");
//		}
		
		var scope = this;
//		this.dataItemLoader.getAllDataItems().forEach(function(dataItem){
//			scope.docs.push(scope.dataItemLoader.getDataItem(dataItem));
//		});
		
		
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
		section.setStyle('padding-top','10px');
		section.setStyle("width", "750px");
		
		
		
		
		
		var sectionmenu  = new Element('div',{
			id : "ground-topnavigation-section-menu",
			class: 'addthis_toolbox addthis_32x32_style addthis_default_style',
			html: "Follow us on: <br>" +
					"<a class='addthis_button_facebook_follow' addthis:userid='cap_cms'></a>" +
					"<a class='addthis_button_twitter_follow' addthis:userid='cap_cms'></a>"+
					"<a class='addthis_button_google_follow' addthis:userid='cap_cms'></a>"+
					"<a class='addthis_button_youtube_follow' addthis:userid='cap_cms'></a>"+
					"<a class='addthis_button_vimeo_follow' addthis:userid='cap_cms'></a>"+
					"<a class='addthis_button_tumblr_follow' addthis:userid='cap_cms'></a>"+
					"<a class='addthis_button_rss_follow' addthis:url='http://cap_cms'></a>",
			style: 'margin:2px; font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;'
						

		});
		
		
		
		//for ( var i = 0; i <= this.docs.length - 1; i++) {
			
		var social_div = new Element('iframe', {
			allowtransparency : 'true',
			frameborder : '0',
			scrolling : '0',
			width : '170px',
			height : '30px',
			src : 'http://ghbtns.com/github-btn.html?user=Schille&repo=cap_cms&type=watch=true&count=false&size=large',
			style: 'float:left;',
		});


		
		
		
		
	//sectionmenu.adopt(follow);
		sectionmenu.adopt(social_div);
	//	sectionmenu.adopt(twitter);
	//	sectionmenu.adopt(facebook);
		section.adopt(sectionmenu);
		inner.adopt(section);
		
		
		
		
		var border  = new Element('div',{
			id : "ground-topnavigation-border",
		});
		
		//border.setStyle("background-color", "rgb(0,51,204)");
		border.setStyles({
			'background': 'rgb(255,255,255)', /* Old browsers */
			'background': '-moz-linear-gradient(bottom, rgba(226,226,226,1) 0%, rgba(211,211,221,1) 100%)', /* FF3.6+ */
		//	'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(100%,rgba(211,211,211,1)))', /* Chrome,Safari4+ */
		//	'background': '-webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* Chrome10+,Safari5.1+ */
		//	'background': '-o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* Opera 11.10+ */
		//	'background': '-ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* IE10+ */
		//	'background': 'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(211,211,211,1) 100%)', /* W3C */
			'filter': "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d3d3d3',GradientType=0 )", /* IE6-9 */
		});
		border.setStyle('border-top', '1px solid #8C8C8C');
		
		border.setStyle("height", "20px");
		
		ground.adopt(border);

		
		ground.adopt(inner);
		
		$(myContainer).adopt(ground);
    },

	
	performAction : function(){
		this.build();
		alert("Successful Loaded: " + this.id);
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Footer();
	},
});