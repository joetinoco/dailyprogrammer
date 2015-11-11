(function () {
	var BASE_PATH = 'submissions/';
	var MANIFEST = '_manifest.json'; // List of the uploaded submissions
	var HEADER_COMMENT_REGEX = new RegExp(/\/\*[^]+\*\//gm);
	var subRequest = decodeURIComponent(document.location.search.substr(1));

	// ==================================================================
	// Functions
	// ==================================================================

	// Helpers
	// ========

	// Replace template content
	function replaceTemplate(component, from, to){
		component.html(component.html().replace('{' + from + '}', to));
	}

	// Parse the header comment for metadata
	function parseHeaderMetadata(source){
		var metadata = {}, m, item;
		source.match(HEADER_COMMENT_REGEX)[0]
		.split('\n')
		.forEach(function(line){
			
			m = /^\s*(.+?):\s*(.+)/g.exec(line);
			if (m) {
				metadata[m[1]] = m[2];
			}
			
		});

		return metadata;

	}

	// Result page renderers
	// ======================

	// Card for a submissions
	function displayCard(subPath, source){

		var card = $('#cardTemplate').clone(), metadata, mKeys;
		card.attr('id','card_' + subPath);

		// Parse the header comment for metadata and apply it to the card
		metadata = parseHeaderMetadata(source);
		Object.keys(metadata).forEach(function(k){
			replaceTemplate(card, k, metadata[k]);
			if (k === 'Demo link') card.find('.demolink').toggleClass('hide');
		});

		replaceTemplate(card, 'Solution link', '?' + subPath);
		card.toggleClass('hide').appendTo('.container');

	}

	// Submission page, with challenge description and source code
	function displaySolution(source){

		// Read challenge description (from Reddit)
		$.getJSON(parseHeaderMetadata(source)['Reddit thread'] + '.json', function(reddit) {
			console.log(reddit[0].data.children[0].data.selftext_html);
			$('#redditDescription').html(_.unescape(reddit[0].data.children[0].data.selftext_html));
		});

		// Source code
		source = source.replace(HEADER_COMMENT_REGEX, '');
		var sourceLines = source.split('\n');
		while (sourceLines[0].charCodeAt(0) === 13) sourceLines.splice(0, 1); // Trim first blank lines
		source = sourceLines.join('');
		replaceTemplate($('#solutionCode'), 'Solution code', source);

		// Turn on code highlighter
		$('pre code').each(function(i, block) {
	    hljs.highlightBlock(block);
	  });

	  $('.solution').toggleClass('hide')

	}

	// ==================================================================
	// 'Main' code: read manifest and decide what to show
	// ==================================================================

	$.getJSON(BASE_PATH + MANIFEST, function(submissions) {

		var subPathList = Object.keys(submissions);

		if (subPathList.indexOf(subRequest) === -1){

			// Display 'home page': a list of all submissions
			subPathList.forEach(function(subPath, subIndex){

				$.get(BASE_PATH + subPath + '/' + submissions[subPath], function(source){

					displayCard(subPath, source);

				},'text');
				
			});

		} else {

			// Display an individual submission
			$.get(BASE_PATH + subRequest + '/' + submissions[subRequest], function(source){

				displaySolution(source);

			},'text');

		}
	
	});
})(jQuery);