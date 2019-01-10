function doSearch(){
	var value = document.getElementById('search').value;
	if(document.getElementById('search').value.replace(/\s+/,"").length!=0){
		$.ajax({
			url:'/search',
			type:'POST',
			data:{search:value},
			success: function(result){
	           //console.log("likes updated!");
			}
		});
	}
}