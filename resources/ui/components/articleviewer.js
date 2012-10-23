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
			
			buildCommentObject : function (name, content) {
				var comment = new Object();
				comment.name = name.getProperty('value');
				comment.date = '11.11.2012';
				comment.content = content.getProperty('value');
				
				return  comment;
			},

			twitterfun : function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (!d.getElementById(id)) {
					js = d.createElement(s);
					js.id = id;
					js.src = '//platform.twitter.com/widgets.js';
					fjs.parentNode.insertBefore(js, fjs);
				}
				$(id).destroy();
			},

			addComments : function(index) {
				scope = this;
				var doc1 = this.dataItemLoader.getDataItem(this.allDocs[index]);
				var comment_container = new Element('div', {
					html : 'Kommentare:<br><br>'

				});
				
				var authorEle = function (dataItem) {
					var comment_author = new Element('div', {
						html : 'by ' + dataItem.name + ', ' + dataItem.date,
					});
					return comment_author;
				};
				
				var contentEle = function(dataItem) {
					var comment_box = new Element(
							'div',
							{
								html : dataItem.content,
							});
					return comment_box;
				};
				
				comment_container.setStyle('font-size', '20px');
				comment_container
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				var commentloader = new DataItemLoader("private/components/articleviewer/comments/"+this.allDocs[index].substring(0,this.allDocs[index].indexOf('.'))+'/');
				
				var allComments = commentloader.getAllDataItems();
				
				
				
				for ( var i = 0; i < allComments.length; i++) {
					var com1 = commentloader.getDataItem(allComments[i]);
					var comment_box = contentEle(com1);

					var comment_author = authorEle(com1);
					
					var comment_triangle = new Element('div');
					comment_triangle.setStyles({
						'width' : '0',
						'height' : '0',
						'border-left' : '2px solid transparent',
						'border-right' : '13px solid transparent',
						'border-bottom' : '15px solid #DFE1F0',
						'margin-left' : '30px',
					});

					comment_author
							.setStyle('font-family',
									'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
					comment_author.setStyle('font-size', '12px');

					comment_box
							.setStyle('font-family',
									'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
					comment_box.setStyle('font-size', '12px');
					comment_box.setStyle('margin', '0px 20px 20px');
					comment_box.setStyle('padding', '10px');
					comment_box.setStyle('background', '#DFE1F0');
					comment_box.setStyles({
						'-webkit-radius' : '3px',

						'-moz-radius' : '3px',

						'border-radius' : '3px',
					});

					if (i % 2 == 1) {

						comment_author.setStyle('text-align', 'right');
						comment_triangle.setStyles({
							'border-left' : '13px solid transparent',
							'border-right' : '2px solid transparent',
							'border-bottom' : '15px solid #EFF1F9',
						});
						comment_box.setStyle('background', '#EFF1F9');
						comment_triangle.setStyle('margin-left', '690px');
					}

					comment_container.setStyle('padding', '15px');
					comment_container.adopt(comment_author);
					comment_container.adopt(comment_triangle);
					comment_container.adopt(comment_box);

				}
				
				var comment_form = new Element('div', {
					action: '',
					style:'margin-left:35px;'
				});
				var comment_name = new Element('p', {
					style: 'font-size: 13px;',
					html: 'Autor:'
				});
				
				
				
				
				var uploader = new DataItemUploader();
				
				
				
				var comment_input_name = new Element('p', {
					style: 'font-size: 13px;',
					html: 'Kommentar:'
				});
				var comment_name_field = new Element('input', {
					name:'Autor:',
					type:'text',
					size: '30',
					maxlength:'30',
					style:'margin-top:4px;margin-bottom: 5px;margin-left: 5px;',
					
				});
				
				var comment_input = new Element('textarea', {
					cols:'60',
					rows: '10',
					style: 'resize: none; margin-top:5px; margin-left: 5px;',
				});
				
				var comment_line = new Element('hr', {
					size: '0px',
					style : 'border-top:1px dotted #2F3666;margin:10px;',
				});
				
				var comment_tip = new Element('p', {
					style: 'font-size: 15px;margin-left:20px;margin-bottom:15px;',
					html: 'Hinterlasse doch noch einen Kommentar...'
				});
				
				var comment_submit = new Element('input',{
					type: 'button',
					value: 'Senden',
				
				});
				
				
				
				comment_form.adopt(comment_name);
				comment_form.adopt(comment_name_field);
				comment_form.adopt(comment_input_name);
				comment_form.adopt(comment_input);
				comment_form.adopt(comment_submit);
				
				comment_container.adopt(comment_line);
				comment_container.adopt(comment_tip);
				comment_container.adopt(comment_form);
				
				comment_submit.addEvent('click', function() {
					
					var comment_object = scope.buildCommentObject(comment_name_field, comment_input);
					uploader.uploadDocument('components/articleviewer/comments/'+
							scope.allDocs[index].substring(0,scope.allDocs[index].indexOf('.'))+ '/' +
					allComments.length
				   , JSON.encode(comment_object));
					
					
					var comment_container_height = comment_container.getHeight();
					var comment_form_height = comment_form.getHeight();
					comment_container.morph({
										height: comment_container_height-comment_form_height,
										});
					comment_tip.morph({opacity: 0,});
					comment_line.morph({opacity: 0,});
					
					comment_tip.destroy();
					comment_line.destroy();
					
					var comment_box = contentEle(comment_object);

					var comment_author = authorEle(comment_object);
					
					var comment_triangle = new Element('div');
					comment_triangle.setStyles({
						'width' : '0',
						'height' : '0',
						'border-left' : '2px solid transparent',
						'border-right' : '13px solid transparent',
						'border-bottom' : '15px solid #DFE1F0',
						'margin-left' : '30px',
						'opacity' : '0',
					});

					comment_author
							.setStyle('font-family',
									'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
					comment_author.setStyle('font-size', '12px');
					comment_author.setStyle('opacity', '0');

					comment_box
							.setStyle('font-family',
									'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
					comment_box.setStyle('font-size', '12px');
					comment_box.setStyle('margin', '0px 20px 20px');
					comment_box.setStyle('padding', '10px');
					comment_box.setStyle('background', '#DFE1F0');
					comment_box.setStyles({
						'-webkit-radius' : '3px',

						'-moz-radius' : '3px',

						'border-radius' : '3px',
						
						'opacity' : '0',
					});

					if (i % 2 == 1) {

						comment_author.setStyle('text-align', 'right');
						comment_triangle.setStyles({
							'border-left' : '13px solid transparent',
							'border-right' : '2px solid transparent',
							'border-bottom' : '15px solid #EFF1F9',
						});
						comment_box.setStyle('background', '#EFF1F9');
						comment_triangle.setStyle('margin-left', '690px');
					}

					comment_container.setStyle('padding', '15px');
					comment_container.adopt(comment_author);
					comment_container.adopt(comment_triangle);
					comment_container.adopt(comment_box);
					comment_author.morph({opacity : 1,});
					comment_triangle.morph({opacity : 1,});
					comment_box.morph({opacity : 1,});
					
					comment_form.destroy();
					
				});
				
				return comment_container;

			},

			addLabel : function(index) {
				// alert(this.allDocs[index]);
				var htmltext = this.article_labels.get(this.allDocs[index]);
				scope = this;
				var origincolor = '#2F3666';
				var labelborder = new Element('div', {
					id : "ContentViewerLabel",

				});

				var label_in = new Element('span', {
					id : 'ContentViewerInnerLabel',
					html : 'Labels v'
				});

				var innerlabel = new Element('span', {
					id : 'ContentViewerInnerLabel',
					html : ''
				});
				innerlabel.setStyle('opacity', '0');

				var innercomment = new Element('span', {
					id : 'ContentViewerInnerComment',

				});

				innercomment.setStyle('border', '2px solid #2F3666');

				var specific_comment = new Element('a', {
					html : 'Kommentare v',
				});

				var social_media = new Element(
						'div',
						{
							html : "<iframe src='//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fcapcms.org&amp;send=false&amp;layout=button_count&amp;width=450&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=lucida+grande&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:110px; height:21px;' allowTransparency='true'></iframe>",
						});

				var twitter = new Element(
						'div',
						{
							html : "<a href='https://twitter.com/share' class='twitter-share-button' data-text='Look at this article' data-via='CaPCMS' data-lang='de' data-hashtags='CaPCMS'>Twittern</a>",
						});

				social_media.setStyles({
					'-webkit-border-top-right-radius' : '4px',
					'-webkit-border-top-left-radius' : '4px',
					'-moz-border-radius-topright' : '4px',
					'-moz-border-radius-topmleft' : '4px',
					'border-top-right-radius' : '4px',
					'border-top-left-radius' : '4px',
					'float' : 'right',
				});

				twitter.setStyle('padding', '1px');
				twitter.setStyle('margin-top', '-33px');
				twitter.setStyle('float', 'right');
				twitter.setStyle('margin-right', '75px');
				social_media.setStyle('padding', '1px');
				social_media.setStyle('margin-top', '-33px');

				var bottomline = new Element('hr');
				bottomline.setStyles({
					'color' : origincolor,
					'background' : origincolor,
					'height' : '3px',

				});
				// bottomline.setStyle('margin','-1px');

				labelborder.adopt(bottomline);

				if (htmltext != null) {
					htmltext.each(function(item, ind) {

						var specific_label = new Element('a', {
							html : item,
						});
						var original_color = specific_label.getStyle('color');
						specific_label.setStyle('margin-left', '7px');
						specific_label.setStyle('cursor', 'pointer');
						specific_label.setStyle('padding', '3px');

						specific_label.setStyle('border', '1px solid #2F3666');

						var morph = new Fx.Morph(specific_label, {
							'duration' : '300',
							link : 'cancel'
						});
						specific_label.addEvents({
							'click' : function() {
								scope.performLabelAction(this.text);
							},
							'mouseenter' : function() {
								morph.start({
									'color' : '#ff8c00',
									'text-decoration' : 'underline'
								});
							},
							'mouseleave' : function() {
								morph.start({
									'color' : original_color,
									'text-decoration' : 'none'
								});
							}

						});

						innerlabel.adopt(specific_label);
						labelborder.adopt(label_in);

						labelborder.adopt(innerlabel);

						labelborder.adopt(social_media);
						labelborder.adopt(twitter);

					});
				}

				innercomment.adopt(specific_comment);
				labelborder.adopt(innercomment);

				var original_color2 = specific_comment.getStyle('color');

				innercomment.setStyle('float', 'left');

				var state_com = false;
				specific_comment.setStyle('cursor', 'pointer');
				var morph = new Fx.Morph(specific_comment, {
					'duration' : '300',
					link : 'cancel'
				});

				var anydiv = new Element('div', {
					id : 'Comments',

				});
				// anydiv.setStyle('padding-bottom','0px');

				this.expand_comments = function() {

					if (state_com) {
						state_com = false;
						anydiv.morph({
							opacity : 0,
							height : 0,

						});

						anydiv.dispose();
					}

					else {
						state_com = true;
						if (!this.getParent().getParent().contains(anydiv)) {

							anydiv = scope.addComments(index);
							$('ContentViewerText').adopt(anydiv);
							var original_height = anydiv.getStyle('height');

							console.log(original_height);
							anydiv.dispose();
							anydiv.setStyle('height', '0px');
							anydiv.setStyle('opacity', '0');

							this.getParent().getParent().adopt(anydiv);
							anydiv.morph({
								opacity : 1,
								height : original_height,
							});

						} else {
							anydiv.morph({
								opacity : 1,
								height : original_height,

							});
						}

					}
				};

				specific_comment.addEvents({
					'click' : this.expand_comments,
					'mouseenter' : function() {
						this.morph({
							'color' : '#ff8c00',
							'text-decoration' : 'underline'
						});
					},
					'mouseleave' : function() {
						this.morph({
							'color' : original_color2,
							'text-decoration' : 'none'
						});
					},

				});

				var showLabels = function() {

					if (!state_lab) {
						state_lab = true;
						innerlabel.morph({
							opacity : 1,
						});
					} else {
						state_lab = false;
						innerlabel.morph({
							opacity : 0,
						});
					}

				};
				state_lab = false;

				label_in.addEvents({
					'mouseover' : showLabels,
					'click' : showLabels,
					'mouseenter' : function() {
						this.morph({
							'color' : '#ff8c00',
							'text-decoration' : 'underline'
						});
					},
					'mouseleave' : function() {
						this.morph({
							'color' : original_color2,
							'text-decoration' : 'none'
						});
					},

				});

				label_in.setStyle('cursor', 'pointer');

				innerlabel
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				innerlabel.setStyle('font-size', '12px');
				labelborder.setStyle('margin-bottom', '30px');
				labelborder.setStyles({
					'-webkit-border-top-right-radius' : '8px',
					'-webkit-border-top-left-radius' : '8px',
					'-moz-border-radius-topright' : '8px',
					'-moz-border-radius-topleft' : '8px',
					'border-top-right-radius' : '8px',
					'border-top-left-radius' : '8px',
				});
				// labelborder.setStyle('height','25px');
				// labelborder.setStyle('background','-moz-linear-gradient(top,
				// rgba(255,255,255,0) 0%, rgba(0,153,204,0.3) 38%,
				// rgba(0,116,204,0.65) 83%, rgba(0,102,204,0.65) 100%)');
				// innerlabel.setStyle('padding-top', '10px');
				label_in.setStyle('padding', '3px 5px');
				label_in
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				// innerlabel.setStyle('font-style','italic');
				label_in.setStyle('font-size', '12px');
				label_in.setStyles({
					'-webkit-border-top-right-radius' : '4px',
					'-webkit-border-top-left-radius' : '4px',
					'-moz-border-radius-topright' : '4px',
					'-moz-border-radius-topmleft' : '4px',
					'border-top-right-radius' : '4px',
					'border-top-left-radius' : '4px',
					'border' : '2px solid #2F3666',
					'float' : 'left',
				});
				label_in.setStyle('background-color', '#FFFFFF');
				label_in.setStyle('margin-top', '-27px');

				// innercomment.setStyle('padding','10px 10px 0');
				innercomment
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				innercomment.setStyle('font-size', '12px');
				innercomment.setStyles({
					'-webkit-border-top-right-radius' : '4px',
					'-webkit-border-top-left-radius' : '4px',
					'-moz-border-radius-topright' : '4px',
					'-moz-border-radius-topleft' : '4px',
					'border-top-right-radius' : '4px',
					'border-top-left-radius' : '4px',
				});
				innercomment.setStyle('padding', '3px 5px');
				innercomment.setStyle('background-color', '#FFFFFF');
				innercomment.setStyle('margin-left', '70px');
				innercomment.setStyle('margin-top', '-27px');

				return labelborder;

			},

			addDoc : function(index) {

				// Loading list of articles but not the articles themselves

				var doc1 = this.dataItemLoader.getDataItem(this.allDocs[index]);
				console.log('Was called to add another article.');
				/*
				 * Building article here, define style tag, id tags, the divs
				 * etc... This is the title, getting the content from the title
				 * tag of the json document
				 */

				var title = new Element('div', {
					id : "ContentViewerHeadline",
					html : doc1.en.title,
				});

				var origincolor = '#2F3666';

				var hrline = new Element('hr', {});
				title
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				title.setStyle('font-weight', 'bold');
				title.setStyle('color', origincolor);
				hrline.setStyles({
					'color' : origincolor,
					'background' : origincolor,
					'height' : '3px',

				});

				title.adopt(hrline);

				title.setStyle("margin", "5px");
				title.setStyle("font-size", "xx-large");

				// The infoboarder contains information about the author, date
				// etc..
				var infoborder = new Element('div', {
					id : "ContentViewerHeadline",
				});

				var innerinfo = new Element('span', {
					id : "ContentViewerInner",
				});

				innerinfo
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
				innerinfo.setStyle('font-size', '12px');
				innerinfo.setStyles({
					'-webkit-border-bottom-right-radius' : '4px',
					'-webkit-border-bottom-left-radius' : '4px',
					'-moz-border-radius-bottomright' : '4px',
					'-moz-border-radius-bottomleft' : '4px',
					'border-bottom-right-radius' : '4px',
					'border-bottom-left-radius' : '4px',
					'margin-top' : '-35px',
				});
				innerinfo.setStyle('background-color', '#FFFFFF');
				// innerinfo.setStyle('margin-left', '20px');
				// innerinfo.setStyle('border','2px solid '+origincolor);
				// setting some css here
				infoborder.setStyle("height", "10px");
				infoborder.setStyle("margin", "5px");
				infoborder.setStyle('position', 'relative');
				// innerinfo.setStyle('position','absolute');
				innerinfo.setStyle('padding', '8px 10px 0');
				innerinfo.setStyle('float', 'right');

				infoborder.setStyles({
					'-webkit-border-top-right-radius' : '8px',
					'-webkit-border-top-left-radius' : '8px',
					'-moz-border-radius-topright' : '8px',
					'-moz-border-radius-topleft' : '8px',
					'border-top-right-radius' : '8px',
					'border-top-left-radius' : '8px',
				});
				infoborder.setStyle("vertical-align", "bottom");

				var date = new Element('a', {
					id : "ContentViewerInfoborderDate",
					html : ', ' + doc1.date,

				});
				date.setStyle('margin-left', '5px');

				var author = new Element('a', {
					id : "ContentViewerInfoborderAuthor",
					html : 'by ' + doc1.author,

				});
				author.setStyle("font-size", "small");

				author
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');

				date
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');

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
				textground
						.setStyle('font-family',
								'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif');
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
				if (this.allDocs == null) {

					this.allDocs = this.dataItemLoader.getAllDataItems();
				}
				var scope = this;
				/*
				 * Get the index.json. From this file the labels are read and
				 * added to the according article.
				 */

				for ( var i = 0; i < this.allDocs.length; i++) {
					if (this.allDocs[i] == 'index.json') {
						var temp_labels = this.dataItemLoader
								.getDataItem(this.allDocs[i]);
						this.allDocs.splice(i, 1);
					}
				}

				Object.each(temp_labels.label, function(value, key) {
					scope.labels.set(key, value);
				});
				Object.each(temp_labels.article, function(value, key) {
					scope.article_labels.set(key, value);
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
						this.twitterfun(document, 'script', 'twitter-wjs');

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

				// The this.scroller event consists of the algorithm the detect
				// the
				// scrolling
				// over the first half of the last article. If it isn't already
				// active
				// it will perform the reload action and will add
				// #reloadArticles articles
				// to the content
				this.scroller = function() {
					if (((document.getScroll().y + window.getHeight()) >= lastArt
							.getPosition().y)
							&& trigger == false) {
						trigger = true;
						console.log('Reloading articles...');
						for ( var i = 1; i < reloadArticles; i++) {
							if (scope.index <= scope.allDocs.length - 1) {
								scope.index++;
								lastArt = scope.addDoc(scope.index);
								ground.adopt(lastArt);
								scope.twitterfun(document, 'script',
										'twitter-wjs');
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
			/*
			 * Necessary function. It handles requests to change the content of
			 * the contentviewer-component. Needs to be adapted if some new
			 * content isn't an article anymore.
			 */

			performLabelAction : function(linklabel) {
				if ($('ContentViewer') != null) {
					$('ContentViewer').destroy();
				}

				this.allDocs = this.labels.get(linklabel);
				this.allDocs.push('index.json');
				this.build(this.id, this.container);
			},

			performAction : function(myEventInformation) {
				// Deleting the existing contentviewer element in the HTML
				if ($('ContentViewer') != null) {
					$('ContentViewer').destroy();
				}
				// Retrieving the desired content by the link.
				this.dataItemLoader = new DataItemLoader(
						"src/resources/content/article/"
								+ myEventInformation.actionName + "/");
				this.allDocs = this.dataItemLoader.getAllDataItems();
				// Building the new contentviewer element.
				this.build(this.id, this.container);

			},
		
			
		});

Com = new Class({
	initialize : function() {
	},
	createInstance : function() {
		return new Articleviewer();
	},
});