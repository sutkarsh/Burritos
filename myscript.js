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
	var v = textNode.nodeValue;
	var search_query = /\$\d*\.?\d*/g
	function replacer(match, p1, offset, string){
  		numerals = parseFloat(match.substring(1));
  		rounded_numerals = Math.round(numerals / .0625)/100;
  		return rounded_numerals.toString() + " Burritos";
	}
	
	v = v.replace(search_query, replacer);
	
	textNode.nodeValue = v;
}