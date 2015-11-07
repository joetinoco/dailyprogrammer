(function () {
	var BASE_PATH = 'submissions/';
	
	// The manifest file contains a list of the uploaded submissions
	$.getJSON(BASE_PATH + '_manifest.json', function(subs) {
		
		Object.keys(subs)
		.forEach(function(subPath, subIndex){
			
			// Creates a card for each submission
			$.get(BASE_PATH + subPath + '/' + subs[subPath], function(source){
				
				var card = $('#cardTemplate').clone();
				card.attr('id','card_' + subPath);

				// Parse the header comment for metadata and use it in the card
				source.match(/\/\*[^]+\*\//gm)[0]
				.split('\n')
				.forEach(function(line){
					
					var metadata = /^\s*(.+?):\s*(.+)/g.exec(line);
					
					if (metadata){
						
						card.html(card.html().replace('{' + metadata[1] + '}', metadata[2]));
						if (metadata[1] === 'Demo link') card.find('.demolink').toggleClass('hide');
					
					}

				});

				card.toggleClass('hide').appendTo('.container');
				
			},'text');

		});
	
	});
})(jQuery);