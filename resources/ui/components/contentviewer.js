var Contentviewer = new Class({
    initialize: function(){
    	this.dataItemLoader = new DataItemLoader("src/resources/content/article/home/");
    	this.id;
    	this.container;
    	this.category;
    	this.index;
    	this.language = "en";
    },
    
    
    addDoc : function (index) {

    	//Loading list of articles but not the articles themselves
		var allDocs = this.dataItemLoader.getAllDataItems();
		var doc1 = this.dataItemLoader.getDataItem(allDocs[index]);
		
		//Building article here, define style tag, id tags, the divs etc...
		//This is the title, getting the content from the title tag of the json
		//document
		var title = new Element('div',{
    		id : "ContentViewerHeadline",
    		html : doc1.en.title,
    	});
    	title.setStyle("margin" , "5px");
    	title.setStyle("font-size" , "xx-large");
    	
    	
    	//The infoboarder contains information about the author, date etc..
    	var infoborder = new Element('div',{
    		id : "ContentViewerHeadline",
    	});
    	//setting some css here
    	infoborder.setStyle("background-image" , "-moz-linear-gradient(top, #09C 25%, #06C 75%)");
    	infoborder.setStyle("color" , "white");
    	infoborder.setStyle("height" , "35px");
    	infoborder.setStyle("margin" , "5px");
    	infoborder.setStyle("border-radius" , "8px");
    	infoborder.setStyle("vertical-align" , "bottom");
    	
    	var date = new Element('span',{
    		id : "ContentViewerInfoborderDate",
    		html : doc1.date,
    		style : 'display:block;'
    	});
    	date.setStyle('margin-left', '5px');
    	
    	var author = new Element('span',{
    		id : "ContentViewerInfoborderAuthor",
    		html : 'by ' + doc1.author,
    		style : 'display:block;'
    	});
    	author.setStyle("font-size" , "small");
    	author.setStyle('margin-left', '5px');
    	
    	//adopt the span-elements to the infoborder-div
    	infoborder.adopt(date);
    	infoborder.adopt(author);
    	
    	
    	//textground defines the area of the actual article content
    	//The actual article is displayed here.
    	var textground = new Element("div", {
    		id : "ContentViewerTextGround",
    		html : doc1.en.text,
		});
    	textground.setStyle("margin" , "5px");
    	textground.setStyle("height" , "400px");
    	
    	//In the end the text-div is built here and all the given elements
    	//are united in this div.
    	var text = new Element("div", {
    		id : "ContentViewerText",
		});
    	text.adopt(title);
    	text.adopt(infoborder);
    	text.adopt(textground);
    	
    	return text;
		
		
	},
    
    
    
    build : function(myID, myContainer){
		this.id = myID;
		this.container = myContainer;

		this.index = 0;
		
		var allDocs = this.dataItemLoader.getAllDataItems();
		var doc1 = this.dataItemLoader.getDataItem(allDocs[this.index]);

    	//Lookup addDoc to get more information. First article to be created here.
    	
    	var ground = new Element("div", {
			id : "ContentViewer",
			style : "background-color: white; margin-top : 20px;",

		});
    	
    	var title = new Element('div',{
    		id : "ContentViewerHeadline",
    		html : doc1.en.title,
    	});
    	title.setStyle("margin" , "5px");
    	title.setStyle("font-size" , "xx-large");
    	
    	var infoborder = new Element('div',{
    		id : "ContentViewerHeadline",
    	});
    	infoborder.setStyle("background-image" , "-moz-linear-gradient(top, #09C 25%, #06C 75%)");
    	infoborder.setStyle("color" , "white");
    	infoborder.setStyle("height" , "35px");
    	infoborder.setStyle("margin" , "5px");
    	infoborder.setStyle("border-radius" , "8px");
    	infoborder.setStyle("vertical-align" , "bottom");
    	
    	var date = new Element('span',{
    		id : "ContentViewerInfoborderDate",
    		html : doc1.date,
    		style : 'display:block;'
    	});
    	date.setStyle('margin-left', '5px');
    	
    	var author = new Element('span',{
    		id : "ContentViewerInfoborderAuthor",
    		html : 'by ' + doc1.author,
    		style : 'display:block;'
    	});
    	author.setStyle("font-size" , "small");
    	author.setStyle('margin-left', '5px');
    	
    	infoborder.adopt(date);
    	infoborder.adopt(author);
    	
    	var textground = new Element("div", {
    		id : "ContentViewerTextGround",
    		html : doc1.en.text,
		});
    	textground.setStyle("margin" , "5px");
    	
    	var text = new Element("div", {
    		id : "ContentViewerText",
		});
    	
    	text.adopt(title);
    	text.adopt(infoborder);
    	text.adopt(textground);
    	
    	var next = new Element("a", {
			id : "ContentViewerNavigation_next",
			href : '#',
			html : 'Next',
			style : "float : right;"
		});
    	
    	var scope = this;
    	next.addEvent('click', function() {
    		scope.nextDoc();
		});
    	
    	var prev = new Element("a", {
			id : "ContentViewerNavigation_previous",
			href : '#',
			html : "Previous",
			style : "float : left;"
		});
    	
    	prev.addEvent('click', function() {
    		scope.prevDoc();
		});
    	
    	var changeLanguage = new Element("a", {
			id : "ContentViewerNavigation_language",
			href : '#',
			html : "Language",
			style : "margin-left:20%; margin-right: auto"
		});
    	
    	changeLanguage.addEvent('click', function() {
    		scope.changeLanguage();
		});
    	
    	
    	var nav = new Element("div", {
			id : "ContentViewerNavigation",
			style : "border-color: grey;border-top: 5px;border-style: solid; ",
		});
    	
    	
    	var clr = new Element("div", {
			style : "clear : both",

		});
    	
    	this.index++;
    	
    	
    	nav.adopt(prev);
    	nav.adopt(changeLanguage);
    	nav.adopt(next);
    	nav.adopt(clr);
    	
    	
    	ground.adopt(text);
    	ground.adopt(nav);
    	
    	
    	//Variable declares how many articles are shown, besides the first article.
    	//so that there are shownArticles+1 articles shown
    	var shownArticles = 2;
    	
    	
    	//Varibale declares how many Articles are reloaded when half of the
    	//last aricle is overscrolled
    	var reloadArticles = 2;
    	
    	
    	//Loop to display #shownArticle-1 articles.
    	for(var i = this.index; i < shownArticles; i++) {
    		ground.adopt(this.addDoc(i));
    		this.index = i;
    	}
  
    	
    	//After the loop we need to add the last article with the scroller event
    	//It triggers always if the user scrolls over the half of the last 
    	//article
    	
    	//Adopting the last article for the 1st time.
    	this.index++;
    	var lastArt = this.addDoc(this.index);

    	//This trigger makes sure, that the scroll event proceeds its actions
    	//only one time simultaneously
    	var trigger = false;
    	
    	
    	//The scroller event consists of the algorithm the detect the scrolling 
    	//over the first half of the last article. If it isn't already active
    	//it will perform the reload action and will add #reloadArticles articles
    	//to the content
    	var scroller = function(){
    		if(((document.getScroll().y+lastArt.getHeight()/2)/lastArt.getPosition().y) >= 0.75 && 
    				trigger == false) {
    			trigger = true;	
    			
    			for(var i = 1; i < reloadArticles; i++) {
    				scope.index++;
    				lastArt = scope.addDoc(scope.index);
        			ground.adopt(lastArt);
        			
    			}
    			scope.index++;
    			lastArt = scope.addDoc(scope.index);
    			ground.adopt(lastArt);
    			
    			//If all articles are loaded, the event will be removed.
    			if(allDocs.length-1 == scope.index) {
    				document.removeEvent('scroll', scope.scroller);
        			trigger = true;	

    			}
    			else {
    				//When the action is performed the trigger is resetted.
    				trigger = false;
    			}
    		}
    	};
    	
    	//Just appending the event to the document.
      	document.addEvent('scroll', scroller);
    	
      	//Appending the lastArt from before the loop to the ground.
    	ground.adopt(lastArt);

    	//Adding the while content to the container within the HTML.
		$(myContainer).adopt(ground);
		
 
		
    },
    
    /*
     * Only some function from the previous version of the content viewer.
     * Actually could be deleted.
     */
    
	nextDoc: function () {
		var allDocs = this.dataItemLoader.getAllDataItems();
		if((allDocs.length - 1) > this.index){
			this.index = this.index + 1;
			var doc = this.dataItemLoader.getDataItem(allDocs[this.index]);
			switch (this.language){
			case "en":
				$('ContentViewerInfoborderDate').innerHTML = doc.date;
				$('ContentViewerInfoborderAuthor').innerHTML = 'by ' + doc.author;
				$('ContentViewerHeadline').innerHTML = doc.en.title;
				$('ContentViewerTextGround').innerHTML = doc.en.text;
				break;
			case "de":
				$('ContentViewerInfoborderDate').innerHTML = doc.date;
				$('ContentViewerInfoborderAuthor').innerHTML = 'by ' + doc.author;
				$('ContentViewerHeadline').innerHTML = doc.de.title;
				$('ContentViewerTextGround').innerHTML = doc.de.text;
			default:
				break;
			}
			
		}
		else{
			alert("No more documents available!");
		}
		
		
		 
	},
	
	prevDoc : function(){
		var allDocs = this.dataItemLoader.getAllDataItems();
		if(0 < this.index){
			this.index = this.index - 1;
			var doc = this.dataItemLoader.getDataItem(allDocs[this.index]);
			switch (this.language){
			case "en":
				$('ContentViewerInfoborderDate').innerHTML = doc.date;
				$('ContentViewerInfoborderAuthor').innerHTML = 'by ' + doc.author;
				$('ContentViewerHeadline').innerHTML = doc.en.title;
				$('ContentViewerTextGround').innerHTML = doc.en.text;
				break;
			case "de":
				$('ContentViewerInfoborderDate').innerHTML = doc.date;
				$('ContentViewerInfoborderAuthor').innerHTML = 'by ' + doc.author;
				$('ContentViewerHeadline').innerHTML = doc.de.title;
				$('ContentViewerTextGround').innerHTML = doc.de.text;
			default:
				break;
			}
		}
		else{
			alert("No more documents available!");
		}
	},
	
	
	//Refresh the change the language. Actually just resetting some innerHTML
	refresh: function () {
		var allDocs = this.dataItemLoader.getAllDataItems();
		var doc = this.dataItemLoader.getDataItem(allDocs[0]);
		switch (this.language){
		case "en":
			$('ContentViewerInfoborderDate').innerHTML = doc.date;
			$('ContentViewerInfoborderAuthor').innerHTML = 'by ' + doc.author;
			$('ContentViewerHeadline').innerHTML = doc.en.title;
			$('ContentViewerTextGround').innerHTML = doc.en.text;
			break;
		case "de":
			$('ContentViewerInfoborderDate').innerHTML = doc.date;
			$('ContentViewerInfoborderAuthor').innerHTML = 'by ' + doc.author;
			$('ContentViewerHeadline').innerHTML = doc.de.title;
			$('ContentViewerTextGround').innerHTML = doc.de.text;
		default:
			break;
		}
		this.index = 0;
	},
	
	
	
	
	
	changeLanguage : function(){
		if(this.language == "en")
			this.language = "de";
		else
			this.language = "en";
		this.refresh();
	},
	
	
	//Needs to be implemented when any component talks to me.
	
	performAction : function(myEventInformation){
		this.dataItemLoader = new DataItemLoader("src/resources/content/article/" + myEventInformation.actionName + "/");
		this.refresh();
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new Contentviewer();
	},
});