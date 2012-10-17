var Articleviewer = new Class(
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
				var origincolor = '#2F3666';
				var labelborder = new Element('div', {
					id : "ContentViewerLabel",
					
				});
				var innerlabel = new Element('span', {
					id : 'ContentViewerInnerLabel',
					html : 'Labels:'
				});
				
				var innercomment = new Element('span', {
					id : 'ContentViewerInnerComment',
					
				});
				
				innercomment.setStyle('border','2px solid #2F3666');
				
				var specific_comment = new Element('a', {
					html: 'Kommentare v',
				});
				
				var bottomline = new Element('hr');
				bottomline.setStyles({
					'color' : origincolor,
					'background' : origincolor,
					'height' : '3px',
					
				});
				bottomline.setStyle('margin','-1px');
				
				labelborder.adopt(bottomline);
				
				if(htmltext != null) {					
					htmltext.each(function(item, ind) {
						
						var specific_label = new Element('a', {
							html:  item,
						});
						
						
						
						var original_color = specific_label.getStyle('color');
						
						
						
						
						specific_label.setStyle('margin','7px');
						specific_label.setStyle('cursor','pointer');
						var morph = new Fx.Morph(specific_label,{ 'duration':'300', link:'cancel' });
						specific_label.addEvents({
						'click' : function() { 
							scope.performLabelAction(this.text);
							},
						'mouseenter' : function() { morph.start({ 'color':'#ff8c00', 'text-decoration' : 'underline' });},
					    'mouseleave' : function() { morph.start({ 'color': original_color, 'text-decoration' : 'none' }); }
						
					});
						
						
						
						innerlabel.adopt(specific_label);
						labelborder.adopt(innerlabel);
						
				});
				}
				
				innercomment.adopt(specific_comment);
				labelborder.adopt(innercomment);
				
				var original_color2 = specific_comment.getStyle('color');
				
				innercomment.setStyle('float','left');
				
				var state = false;
				specific_comment.setStyle('cursor','pointer');
				var morph = new Fx.Morph(specific_comment,{ 'duration':'300', link:'cancel' });
				
				var anydiv = new Element ('div', {
					html : 'moin',
					id : 'Comments',
					style: 'opacity : 0;'
				
				});
				
				specific_comment.addEvents({
				'click' : function() { 
					
					if(state) {state = false;
					anydiv.morph({
						opacity : 0,
						height: 0,
						
						});
					}
					
					
					else {state = true;
					if(!this.getParent().getParent().contains(anydiv)) {
				
					this.getParent().getParent().adopt(anydiv);
					anydiv.morph({
						 opacity : 1,
						height: 100,});
					}
					else {anydiv.morph({opacity : 1, height: 100,
						});}
					
					}
					},
				'mouseenter' : function() { morph.start({ 'color':'#ff8c00', 'text-decoration' : 'underline' });},
			    'mouseleave' : function() { morph.start({ 'color': original_color2, 'text-decoration' : 'none' }); }
				
			});
				
				
				labelborder.setStyle('margin-bottom', '30px');
				labelborder.setStyles({
					'-webkit-border-top-right-radius': '8px',
					'-webkit-border-top-left-radius': '8px',
					'-moz-border-radius-topright': '8px',
					'-moz-border-radius-topleft': '8px',
					'border-top-right-radius': '8px',
					'border-top-left-radius': '8px',});
				//labelborder.setStyle('height','25px');
				//labelborder.setStyle('background','-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(0,153,204,0.3) 38%, rgba(0,116,204,0.65) 83%, rgba(0,102,204,0.65) 100%)');
				//innerlabel.setStyle('padding-top', '10px');
				innerlabel.setStyle('padding','3px 5px');
				innerlabel.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				//innerlabel.setStyle('font-style','italic');
				innerlabel.setStyle('font-size','12px');
				innerlabel.setStyles({
				'-webkit-border-top-right-radius': '4px',
				'-webkit-border-top-left-radius': '4px',
				'-moz-border-radius-topright': '4px',
				'-moz-border-radius-topmleft': '4px',
				'border-top-right-radius': '4px',
				'border-top-left-radius': '4px',
				'border':'2px solid #2F3666',
				'float':'left',});
				innerlabel.setStyle('background-color','#FFFFFF');
				innerlabel.setStyle('margin-top', '-26px');
				
				//innercomment.setStyle('padding','10px 10px 0');
				innercomment.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				innercomment.setStyle('font-size','12px');
				innercomment.setStyles({
				'-webkit-border-top-right-radius': '4px',
				'-webkit-border-top-left-radius': '4px',
				'-moz-border-radius-topright': '4px',
				'-moz-border-radius-topleft': '4px',
				'border-top-right-radius': '4px',
				'border-top-left-radius': '4px',});
				innercomment.setStyle('padding','3px 5px');
				innercomment.setStyle('background-color','#FFFFFF');
				innercomment.setStyle('margin-left', '20px');
				innercomment.setStyle('margin-top', '-26px');
				
				
				
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
				
				var origincolor = '#2F3666';
				
				var hrline = new Element('hr', {
				});
				title.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				title.setStyle('font-weight','bold');
				title.setStyle('color',origincolor);
				hrline.setStyles({
					'color' : origincolor,
					'background' : origincolor,
					'height' : '3px',
					
				});
				
				title.adopt(hrline);
				
				title.setStyle("margin", "5px");
				title.setStyle("font-size", "xx-large");
				

				// The infoboarder contains information about the author, date etc..
				var infoborder = new Element('div', {
					id : "ContentViewerHeadline",
				});
				
				var innerinfo = new Element ('span', {
					id: "ContentViewerInner",
				});
				
				innerinfo.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				innerinfo.setStyle('font-size','12px');
				innerinfo.setStyles({
				'-webkit-border-bottom-right-radius': '4px',
				'-webkit-border-bottom-left-radius': '4px',
				'-moz-border-radius-bottomright': '4px',
				'-moz-border-radius-bottomleft': '4px',
				'border-bottom-right-radius': '4px',
				'border-bottom-left-radius': '4px',
				'margin-top':'-35px',});
				innerinfo.setStyle('background-color','#FFFFFF');
				//innerinfo.setStyle('margin-left', '20px');
				//innerinfo.setStyle('border','2px solid '+origincolor);
				// setting some css here
				infoborder.setStyle("height", "10px");
				infoborder.setStyle("margin", "5px");
				infoborder.setStyle('position','relative');
				//innerinfo.setStyle('position','absolute');
				innerinfo.setStyle('padding','8px 10px 0');
				innerinfo.setStyle('float','right');
			
				infoborder.setStyles({
					'-webkit-border-top-right-radius': '8px',
					'-webkit-border-top-left-radius': '8px',
					'-moz-border-radius-topright': '8px',
					'-moz-border-radius-topleft': '8px',
					'border-top-right-radius': '8px',
					'border-top-left-radius': '8px',});
				infoborder.setStyle("vertical-align", "bottom");
				
				var date = new Element('a', {
					id : "ContentViewerInfoborderDate",
					html : ', '+ doc1.date,
					
				});
				date.setStyle('margin-left', '5px');

				var author = new Element('a', {
					id : "ContentViewerInfoborderAuthor",
					html : 'by ' + doc1.author,
				
				});
				author.setStyle("font-size", "small");
				
				author.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
			
				date.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				
				// adopt the span-elements to the infoborder-div
				
				innerinfo.adopt(author);
				innerinfo.adopt(date);
				infoborder.adopt(innerinfo);

				// textground defines the area of the actual article content
				// The actual article is displayed here.
				var textground = new Element("div", {
					id : "ContentViewerTextGround",
					html : doc1.en.text,
				});
				textground.setStyle('font-family', 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
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
					if  (((document.getScroll().y + window.getHeight()) >= lastArt.getPosition().y)
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
				if($('ContentViewer') != null) {
				$('ContentViewer').destroy();
				}
				//Retrieving the desired content by the link.
				this.dataItemLoader = new DataItemLoader(
						"src/resources/content/article/"
								+ myEventInformation.actionName + "/");
				this.allDocs = this.dataItemLoader.getAllDataItems();
				//Building the new contentviewer element.
				this.build(this.id, this.container);
				

		}
			});

Com = new Class({
	initialize : function() {
	},
	createInstance : function() {
		return new Articleviewer();
	},
});