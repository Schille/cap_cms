var Contact = new Class({
    initialize: function(){
    	this.dataItemLoader = new DataItemLoader(
		"src/resources/content/about/");
    	this.id;
    	this.container;
    	
		this.docs = new Array();
		var scope = this;
    },
    build : function(myID, myContainer){
		this.id = myID;
		scope = this;
		this.container = myContainer;
		
		

		
		var ground = new Element ('div', {
			id: 'ground_about',
			style : 'text-align:center',
			});
		
	
		var center = new Element('center');
		var contact_formu = new Element('form', {
			style: 'margin-top : 30px; margin-bottom: 50px;',
		});
		
		var contact_form = new Element ('fieldset', {
			style : 'width:300px',
		});
		
		var contact_label = new Element('legend', {
			html: 'Contact us',
			style: 'font-size: 18px;'+"font-family : Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; color:#202442; ",
		});
		
		var para_name = new Element('p', {
			style: 'font-size: 13px;'+"font-family : Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; color:#202442;",
			html: 'Your name (required)'
		});
		
		var para_mail = new Element('p', {
			style: 'font-size: 13px;'+"font-family : Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; color:#202442;",
			html: '<br>Your Email (required)'
		});
		
		var para_sub = new Element('p', {
			style: 'font-size: 13px;'+"font-family : Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; color:#202442;",
			html: '<br>Subject'
		});
		
		var para_mess = new Element('p', {
			style: 'font-size: 13px;'+"font-family : Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif; color:#202442;",
			html: '<br>Your Message'
		});
		
		var input_style = "border: 1px solid #CCCCCC;border-radius: 3px 3px 3px 3px;color: " +
				"#555555;font-family: Arial,sans-serif;font-size: 1em;margin-top: 5px;padding: 0.5em;font-size:13px;";
		
		var input_name = new Element ('input', {
			style: input_style,
		});
		
		var input_mail = new Element ('input', {
			style: input_style,
		});
		
		var input_subject = new Element ('input', {
			style: input_style,
		});
		
		var input_field = new Element ('textarea', {
			style: input_style+'resize:none',
			cols: '50',
			rows: '10',
		});
		
		var send = new Element('input', {
			type: 'button',
			value: 'Send',
		});
		
		var clear = new Element('input', {
			type: 'button',
			value: 'Clear',
		});
		
		clear.addEvent('click', function() {
			input_mail.setProperty('value','');
			input_name.setProperty('value','');
			input_subject.setProperty('value','');
			input_field.setProperty('value','');
		});
		
		send.addEvent('click', function() {
			if(input_name.getProperty('value')=='') {
				input_name.setStyle('background-color', '#dcdcdc');
				para_name.setStyle('color','red');
			}
			else {
				input_name.setStyle('background-color', '#FFFFFF');
				para_name.setStyle('color','#202442');
			}
			if(input_mail.getProperty('value')=='' || input_mail.getProperty('value').indexOf('@')== -1) {
				input_mail.setStyle('background-color', '#dcdcdc');
				para_mail.setStyle('color','red');
			}
			else {
				input_mail.setStyle('background-color', '#FFFFFF');
				para_mail.setStyle('color','#202442');
			}
			if(input_field.getProperty('value')=='') {
				input_field.setStyle('background-color', '#dcdcdc');
				para_mess.setStyle('color','red');
			}
			else {
				input_field.setStyle('background-color', '#FFFFFF');
				para_mess.setStyle('color','#202442');
			}
			
		});
		
		input_name.addEvent('change', function() {
			if(this.getProperty('value') != '') {
				this.setStyle('background-color', '#FFFFFF');
				para_name.setStyle('color','#202442');
			}
		});
		input_mail.addEvent('change', function() {
			if(this.getProperty('value') != '') {
				this.setStyle('background-color', '#FFFFFF');
				para_mail.setStyle('color','#202442');
			}
		});
		input_field.addEvent('change', function() {
			if(this.getProperty('value') != '') {
				this.setStyle('background-color', '#FFFFFF');
				para_mess.setStyle('color','#202442');
			}
		});
		
		
		contact_form.setStyle('padding','20px');

		center.adopt(contact_form);
		contact_formu.adopt(center);
		contact_form.adopt(contact_label);
		contact_form.adopt(para_name);
		contact_form.adopt(input_name);
		contact_form.adopt(para_mail);
		contact_form.adopt(input_mail);
		contact_form.adopt(para_sub);
		contact_form.adopt(input_subject);
		contact_form.adopt(para_mess);
		contact_form.adopt(input_field);
		contact_form.adopt(send);
		contact_form.adopt(clear);
		
		ground.adopt(contact_formu);
		
		
		
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
		return new Contact();
	},
});