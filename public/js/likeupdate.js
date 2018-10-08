function updateLikes(id){
	var iconid = "licon"+id;
    var element = document.getElementById(iconid).style;
    if(element.color == "blue"){
    	$.ajax({
			url: '/updatelikes',
			type: 'POST',
			data: {postid:id,val:-1},
			success: function(result){
	           //console.log("likes updated!");
			}	
		});

        $.ajax({
			url: '/getlikes',
			type: 'POST',
			data: {postid:id},
			success: function(data){
			  var likeid = "likes"+id;
			  var obj    = JSON.parse(data);
        	  document.getElementById(likeid).innerHTML = obj.likedby.length;   
			}	
		});
        
    	element.color = "";
    }
    else{
    	$.ajax({
			url: '/updatelikes',
			type: 'POST',
			data: {postid:id,val:1},
			success: function(result){
	           //console.log("likes updated!");
			}
		});

		$.ajax({
			url: '/getlikes',
			type: 'POST',
			data: {postid:id},
			success: function(data){
			  var likeid = "likes"+id;
			  var obj    = JSON.parse(data);
        	  document.getElementById(likeid).innerHTML = obj.likedby.length;   
			}	
		});
        element.color = "blue";
    }
} 