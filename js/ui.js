var searchBarHook = setInterval(function(){
	var dropdownMenu = document.getElementById("tokensDropdown").getElementsByClassName("dropdown-menu")[0];
	if(dropdownMenu)
	{
		var newItem = document.createElement("li");
		newItem.innerHTML = '<input id="token_search" style="border:none;color:black;text-align:center;" placeholder="Search for tokens..."/>';
		dropdownMenu.insertBefore(newItem, dropdownMenu.childNodes[0]);
		clearInterval(searchBarHook);
		$("#token_search").bind('input', function() { 
		  var input, filter, ul, li, a, i;
		  input = document.getElementById("token_search");
		  filter = input.value.toUpperCase();
		  div = document.getElementById("tokensDropdown").getElementsByClassName("dropdown-menu")[0];
		  a = div.getElementsByTagName("a");
		  for (i = 0; i < a.length; i++) {
			if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
			  a[i].style.display = "";
			} else {
			  a[i].style.display = "none";
			}
		  }
		});
	}
},200);

