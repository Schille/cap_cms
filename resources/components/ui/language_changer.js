var Languagechanger = new Class(
		{
			initialize : function() {
				this.dataItemLoader = new DataItemLoader(
						"src/resources/content/article/home/");
				this.id;
				this.container;
				this.category;
				this.index;
				this.language = "en";
			},

// Refresh the change the language. Actually just resetting some
			// innerHTML
			refresh : function() {
				var allDocs = this.dataItemLoader.getAllDataItems();

				var doc = this.dataItemLoader.getDataItem(allDocs[0]);
				switch (this.language) {
				case "en":
					$('ContentViewerInfoborderDate').innerHTML = doc.date;
					$('ContentViewerInfoborderAuthor').innerHTML = 'by '
							+ doc.author;
					$('ContentViewerHeadline').innerHTML = doc.en.title;
					$('ContentViewerTextGround').innerHTML = doc.en.text;
					break;
				case "de":
					$('ContentViewerInfoborderDate').innerHTML = doc.date;
					$('ContentViewerInfoborderAuthor').innerHTML = 'by '
							+ doc.author;
					$('ContentViewerHeadline').innerHTML = doc.de.title;
					$('ContentViewerTextGround').innerHTML = doc.de.text;
				default:
					break;
				}
				this.index = 0;
			},

			changeLanguage : function() {
				if (this.language == "en")
					this.language = "de";
				else
					this.language = "en";
				this.refresh();
			},
		});
			
			Com = new Class({
				initialize : function() {
				},
				createInstance : function() {
					return new Contentviewer();
				},
			});