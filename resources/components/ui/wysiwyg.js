

var area = new Element('textarea', {
	cols: '10',
	rows : '5',
	id: 'textfield',
});

var bold = new Element('a', {
	html : 'setBold',
});

var italic = new Element('a', {
	html: 'setItalic',
});

var para = new Element('p', {
	html: 'testest',
});

italic.addEvent('click', function() {
	area.setStyle('font-style','italic');
});

bold.addEvent('click', function () {
	area.setStyle('font-weight','bold');

});

$(ground).adopt(area);
$(ground).adopt(para);
$(ground).adopt(italic);
$(ground).adopt(bold);