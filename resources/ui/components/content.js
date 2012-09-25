/**
 * This is the fancy content panel.
 */
//Just a little workaround to count the number of signs (first 400) and cut the string at the next
//empty space. Should be refactored.  <--------
function firstWords(words) {
	if (words.length > 400) {
		for ( var i = 400; i <= 420; i++) {
			if (words.charAt(i) == ' ') {
				return words.substring(0, i) + "...";
			}
		}
	}
	return words;
}
//Article class to create different Article-Objects
Article = new Class(
		{
			//Constructor needs to be given the headline and the text
			initialize : function(headline, text) {
				this.headline = headline;
				this.text = text;
			},

			
			//This function creates the <div> and includes the given content.
			//It is actually necessary the save the text and the headline in local
			//variables, to make sure that every extension is able to show the 
			//short and the long version of the given article. 
			//Return the article-object.
			createArticle : function() {
				
				var k = (this.text);
				var readMore = new Element("a", {
					html : " Read More",
					id : "more"

				});

				var readLess = new Element("a", {
					html : "Close Article",
					id : "less"

				});
				var article = new Element(
						"div",
						{
							style : "position:relative;  height:200px; background-color:#C2E94a; overflow:auto; ",
							html : firstWords(k),
							id : "article_num"

						});

				//Collapse Event
				
				readLess.addEvent('click', function() {
					
					(article).morph({

						height : 200
					});
					
					(article).set('html', firstWords(k) + '<br>');
					(article).adopt(readMore);
					//UIManager.sizeChanged(this.getParent());
					
					
				});
				
				//Expansion Event
				readMore.addEvent('click', function() {
					(article).morph({

						height : 400
					});
					
					//UIManager.sizeChanged(this.getParent());
					(article).set('html', k + '<br>');
					(article).adopt(readLess);
					
					});
				//Expansion Object Event needs to be attached to the actual article.
				//<------------- Maybe include some condition is article is long enough to
				// be expanded or maybe some calculation according the number of signs and size
				//of the field. ------------------------------------------------------>
				article.adopt(readMore);

				return article;

			},
		});

ContentViewer = new Class(
		{
			//Class constructor ... add more description here
			initialize : function(name) {
				this.name = name;
				this.dataItemLoader = new DataItemLoader(
						"src/resources/content/article/");

			},
			
			//returns CSS which fits to the content
			getCSSStyle : function() {
				var Style = "";
				return Style;
			},

			//load decides which articles are shown, appends the css in the html header
			load : function(myContainer) {

				var css = this.getCSSStyle();

				var cssStyle = new Element("style", {
					type : "text/css",
					html : css

				});

				(document.head).adopt(cssStyle);
				var x1 = new Article(docs[0].headline, docs[0].text)
						.createArticle();
				var x2 = new Article(docs[1].headline, docs[1].text)
						.createArticle();
				var x3 = new Article(docs[2].headline, docs[2].text)
				.createArticle();
				var x4 = new Article(docs[3].headline, docs[3].text)
				.createArticle();
				myContainer.adopt(x1);
				myContainer.adopt(x2);


			},

			
			//to change for sure....
//			changeContent : function(myContainer) {
//				for ( var i = docs.length - 1; i >= 0; i--) {
//					var article = new Element(
//							"div",
//							{
//								style : "position:relative;  width:475px; height:200px; top:5px; left: 7px;  background-color:#C2E94a; overflow:auto; ",
//								html : firstWords(docs[0].text),
//								id : "article" + i
//							});
//
//			  }give it a go...
//			},
			
			//makes it possible to build the component. 
			build : function(myID, myContainer) {
				this.id = myID;
				var documents = this.dataItemLoader.getAllDataItems();
				var scope = this.dataItemLoader;
				docs = new Array();
				documents.forEach(function(dataItem) {
					docs = docs.append([ scope.getDataItem(dataItem) ]);

				});

				this.load(myContainer);
			},
			performAction : function(myEventInformation) {
				alert("Received: " + myEventInformation.actionType + " from: " + myEventInformation.sender);
			}

		});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new ContentViewer();
	},
});