var WYSIWYG = new Class({
    initialize: function(){
    	this.dataItemLoader = new DataItemLoader();
    	this.id;
    	this.container;
    	
		this.docs = new Array();
		var scope = this;
    },
    
    
    build : function(myID, myContainer){
		this.id = myID;
		scope = this;
		this.container = myContainer;
		
		if(EnvironmentalPaths.get(myID)){
			this.dataItemLoader = new DataItemLoader(EnvironmentalPaths.get(this.id));
			
		}else{
			this.dataItemLoader = new DataItemLoader("src/resources/");
		}
		
		var ground = new Element ('div', {
			id: 'ground_wysiwyg',
			
			});
		
	
		var input_style = "border: 1px solid #CCCCCC;border-radius: 3px 3px 3px 3px;color: " +
		"#000000;font-family: Arial,sans-serif;font-size: 1em;margin-top: 5px;padding: 0.2em;font-size:13px;";
		
		
		var editor = new Element('textarea', {
			cols : '80',
			rows : '20',
			id: 'editor',
		});
		
		var title = new Element('input',{
			style: input_style,
			id : 'article_title',
			size : 40,
		});
		
		var title_label = new Element('label', {
			'for' : 'article_title',
			html : 'Title: ',
			style: 'font-size: 16px;'+"font-family : Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; color:#202442;",
		});
		
		var form = new Element('form');
		var para = new Element('p', {
			html: '<br>',
		});
		
		var submit = new Element('input', {
			type: 'button',
			value: 'save',
		});
		
		var test = new Element('input', {
			type : 'button',
			value : 'test',
		});
		
		test.addEvent('click', function (){
			scope.performAction(null, null, '/content/article/home/2.json', null);
		});
		
		submit.addEvent('click', function() {
			//Later get author from login data
			var author = "Robert Stein";
			var date = new Date().format();
			
			
			
			var article = new Object();
			var text = tinyMCE.get('editor').getContent();
			
			article.date = date;
			article.author = author;
			article.en = new Object();
			article.de = new Object();
			article.en.title = title.getProperty('value');
			article.de.title = '';
			article.en.text = text;
			article.de.text = '';
			
			
		
		
			var articleloader = new DataItemLoader('src/resources/content/article/home/');
			var allArticles = articleloader.getAllDataItems();
			alert(allArticles.length);
			var uploader = new DataItemUploader();
			
		
			if(allArticles.length != null) {
				uploader.uploadDocument('src/resources/article/home/'+
						allArticles.length
			   , JSON.encode(article));
				}
			else {
					uploader.uploadDocument('components/articleviewer/comments/0'
				   , JSON.encode(article));
			}
			
			
			
		});
		

		para.adopt(editor);
		para.adopt(submit);
		para.adopt(test);
		form.adopt(title_label);
		form.adopt(title);
		form.adopt(para);

		tinyMCE.init({
			 theme : "advanced",
			 mode:'textareas',
			 plugins: 'media',
			 theme_advanced_buttons1_add : "media"

			});
		
		ground.setStyle('margin-top','30px');
		ground.setStyle('padding: auto');
		
		ground.adopt(form);
		
		$(myContainer).adopt(ground);
		
	
		
		

		
		
    },

	
	performAction : function(mySender, myEnvironment,myActionName, myActionType){
		
		var edit = this.dataItemLoader.getDataItem(myActionName);
		
		$('article_title').setProperty('value',edit.en.title);
		tinyMCE.get("editor").setContent(edit.en.text);
		
		
	}
    
});

Com = new Class({
	initialize : function(){
		
	},
	createInstance : function(){
		return new WYSIWYG();
	},
});