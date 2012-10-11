var Contentviewer = new Class(
		{
			initialize : function() {
				this.dataItemLoader = new DataItemLoader(
						"src/resources/content/article/home/");
				this.id;
				this.container;
				this.category;
				this.index;
				this.language = "en";
				this.labels = new Hash();
				this.article_labels = new Hash();
			},
			
			addLabel : function (index) {
				//alert(this.allDocs[index]);
				var htmltext = this.article_labels.get(this.allDocs[index]);
				scope = this;
				var labelborder = new Element('div', {
					id : "ContentViewerLabel",
					html: 'Labels: '
				});
				
				if(htmltext != null) {
					for(var i = 0; i < htmltext.length; i++) {
						
							var specific_label = new Element('a', {
										html:  htmltext[i] + ' ',
							});
							specific_label.addEvent('click', function() {
								scope.performLabelAction(this.text.substring(0, this.text.length-1));
							});
							labelborder.adopt(specific_label);
					}
				}
				
				
				
				return labelborder;
				
			},

			addDoc : function(index) {

				// Loading list of articles but not the articles themselves
				
				var doc1 = this.dataItemLoader.getDataItem(this.allDocs[index]);
				console.log('Was called to add another article.');
				/* Building article here, define style tag, id tags, the divs etc...
				 * This is the title, getting the content from the title tag of the 
				 * json document
				  */
				var title = new Element('div', {
					id : "ContentViewerHeadline",
					html : doc1.en.title,
				});
				title.setStyle("margin", "5px");
				title.setStyle("font-size", "xx-large");

				// The infoboarder contains information about the author, date etc..
				var infoborder = new Element('div', {
					id : "ContentViewerHeadline",
				});
				// setting some css here
				infoborder.setStyle("background-image",
						"-moz-linear-gradient(top, #09C 25%, #06C 75%)");
				infoborder.setStyle("color", "white");
				infoborder.setStyle("height", "35px");
				infoborder.setStyle("margin", "5px");
				infoborder.setStyle("border-radius", "8px");
				infoborder.setStyle("vertical-align", "bottom");

				var date = new Element('span', {
					id : "ContentViewerInfoborderDate",
					html : doc1.date,
					style : 'display:block;'
				});
				date.setStyle('margin-left', '5px');

				var author = new Element('span', {
					id : "ContentViewerInfoborderAuthor",
					html : 'by ' + doc1.author,
					style : 'display:block;'
				});
				author.setStyle("font-size", "small");
				author.setStyle('margin-left', '5px');

				// adopt the span-elements to the infoborder-div
				infoborder.adopt(date);
				infoborder.adopt(author);

				// textground defines the area of the actual article content
				// The actual article is displayed here.
				var textground = new Element("div", {
					id : "ContentViewerTextGround",
					html : doc1.en.text,
				});
				textground.setStyle("margin", "5px");
				textground.setStyle("height", "400px");

				// In the end the text-div is built here and all the given
				// elements
				// are united in this div.
				var text = new Element("div", {
					id : "ContentViewerText",
				});
				console.log('Building the article...');
				text.adopt(title);
				text.adopt(infoborder);
				text.adopt(textground);
				text.adopt(this.addLabel(index));

				console.log('Returning the article-element.');
				return text;

			},

			build : function(myID, myContainer) {
				this.id = myID;
				this.container = myContainer;
				this.index = 0;
				document.removeEvent('scroll', this.scroller);
				console.log('Removing scrolling event');
				if(this.allDocs == null) {
					this.allDocs = this.dataItemLoader.getAllDataItems();
				}
				var scope = this;
				/* Get the index.json. From this file the labels are read and
				 * added to the according article. 
				 */ 
				
				for(var i = 0; i < this.allDocs.length; i++) {
					if(this.allDocs[i] == 'index.json') {
						var temp_labels = this.dataItemLoader.getDataItem(this.allDocs[i]);
						this.allDocs.splice(i,1);
					}
				}
				
				Object.each(temp_labels.label, function (value, key) {
					scope.labels.set(key,value);
				});
				Object.each(temp_labels.article, function (value, key) {
					scope.article_labels.set(key,value);
				});

				// Lookup addDoc to get more information. First article to be
				// created here.
				var ground = new Element("div", {
					id : "ContentViewer",
					style : "background-color: white; margin-top : 20px;",

				});
				

				// Variable declares how many articles are shown, besides the
				// first article.
				// so that there are shownArticles+1 articles shown
				var shownArticles = 2;

				// Variable declares how many Articles are reloaded when half of
				// the
				// last article is overscrolled
				var reloadArticles = 2;
				var allLoaded = false;
				// Loop to display #shownArticle-1 articles.
				for ( var i = this.index; i < shownArticles - 1; i++) {
					if (this.index < this.allDocs.length - 1) {
						ground.adopt(this.addDoc(i));
						this.index = i;

					} else {
						if (this.index == this.allDocs.length - 1) {
							console
									.warn('There are not enough articles (less then defined to load on startup) trying to adopt last article.');
							this.index--;
						} else {
							allLoaded = true;
							console
									.warn('There are less articles available than defined to load on startup.');
						}
					}
				}

				// After the loop we need to add the last article with the
				// this.scroller event
				// It triggers always if the user scrolls over the half of the
				// last
				// article
				// Adopting the last article for the 1st time.
				if (!allLoaded) {
					this.index++;
					var lastArt = this.addDoc(this.index);
					console.log('Last article is adopted');

				}

				// This trigger makes sure, that the scroll event proceeds its
				// actions
				// only one time simultaneously
				var trigger = false;

				// The this.scroller event consists of the algorithm the detect the
				// scrolling
				// over the first half of the last article. If it isn't already
				// active
				// it will perform the reload action and will add
				// #reloadArticles articles
				// to the content
				this.scroller = function() {
					if (((document.getScroll().y + lastArt.getHeight() / 2) / lastArt
							.getPosition().y) >= 0.75
							&& trigger == false) {
						trigger = true;
						console.log('Reloading articles...');
						for ( var i = 1; i < reloadArticles; i++) {
							if (scope.index <= scope.allDocs.length - 1) {
								scope.index++;
								lastArt = scope.addDoc(scope.index);
								ground.adopt(lastArt);
							} else {
								console
										.warn('No more articles to load. Breaking and removing reload. - 1');
								document.removeEvent('scroll', scope.scroller);
							}
						}
						scope.index++;
						if (scope.index <= scope.allDocs.length - 1) {
							lastArt = scope.addDoc(scope.index);
							ground.adopt(lastArt);
						} else {
							console
									.warn('No more articles to load. Breaking and removing reload. - 2 ');
							document.removeEvent('scroll', scope.scroller);
						}

						// If all articles are loaded, the event will be
						// removed.
						if (scope.allDocs.length - 1 == scope.index) {
							document.removeEvent('scroll', scope.scroller);
							console
									.log('All available articles loaded. Removed reloadEvent.');
							trigger = true;

						} else {
							// When the action is performed the trigger is
							// resetted.
							trigger = false;
						}
					}
				};

				// Just appending the event to the document. This is only
				// necessary if
				// there are some articles left to load.
				if (this.index < this.allDocs.length - 1) {
					console.log('Appending scrolling event.')
					document.addEvent('scroll', this.scroller);
				}

				// Appending the lastArt from before the loop to the ground.
				ground.adopt(lastArt);

				// Adding the while content to the container within the HTML.
				$(myContainer).adopt(ground);

			},
			/*Necessary function. It handles requests to change the content of the  
			 * contentviewer-component. Needs to be adapted if some new content
			 * isn't an article anymore.
			 */ 
			
			performLabelAction : function(linklabel) {
				if($('ContentViewer') != null) {
				$('ContentViewer').destroy();
				}
				
				this.allDocs = this.labels.get(linklabel);
				this.allDocs.push('index.json');
				this.build(this.id, this.container);
			},
			
			performAction : function(myEventInformation) {
				//Deleting the existing contentviewer element in the HTML

				$('ContentViewer').destroy();
				//Retrieving the desired content by the link.
				this.dataItemLoader = new DataItemLoader(
						"src/resources/content/article/"
								+ myEventInformation.actionName + "/");
				//Building the new contentviewer element.
				this.build(this.id, this.container);
				

		}
			});

Com = new Class({
	initialize : function() {
	},
	createInstance : function() {
		return new Contentviewer();
	},
});