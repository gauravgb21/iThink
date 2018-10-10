function addComment(id){
	var commentid = "textarea"+id;
	var value = document.getElementById(commentid).value;
	if(value.length!=0){
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