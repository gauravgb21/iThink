function addComment(id){
	var commentid = "textarea"+id;
	var value = document.getElementById(commentid).value;
	if(document.getElementById(commentid).value.replace(/\s+/,"").length!=0){
		$.ajax({
			url:'/addcomment',
			type:'POST',
			data:{postid:id,text: value},
			success: function(result){
	           //console.log("likes updated!");
			}
		});
	}
}