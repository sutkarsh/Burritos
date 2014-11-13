//credit goes to Steven Frank of Cloud to Butt (https://github.com/panicsteve/cloud-to-butt/)

walk(document.body);

function walk(node)  
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1: 
		case 9:  
		case 11: 
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling; 
				walk(child);
				child = next;
			}
			break;

		case 3: 
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var search_query = /\$\d*\.?\d*( [a-z]?[A-Z]?illion)?/g;
	
	function replacer(match, p1, offset, string){
  		var numerals = parseFloat(match.substring(1));
  		if (match.indexOf("illion") > -1){ //if it contains 'illion'
  			numerals = parseFloat(match.substring(1, (match.length - 8))); //Only take the numbers
  		}
  		if (isNaN(numerals)) {
  			return match;
  		}
  		var rounded_numerals = Math.round((numerals / 6.25)*100)/100; // divide by 6.25 and round to 2 decimal places
  		var amount_str = rounded_numerals.toString();
  		if (match.indexOf("Million") > -1){amount_str = amount_str + " Million";}
  		if (match.indexOf("million") > -1){amount_str = amount_str + " Million";}
  		if (match.indexOf("Billion") > -1){amount_str = amount_str + " Billion";}
  		if (match.indexOf("billion") > -1){amount_str = amount_str + " Billion";}
  		return amount_str + " Burritos";
	}
	textNode.nodeValue = textNode.nodeValue.replace(search_query, replacer);
}