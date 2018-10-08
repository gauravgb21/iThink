function sendRequest(id){
	var reqid = "frnd"+id;

    if(document.getElementById(reqid).className == 'fa fa-user-plus'){
		$.ajax({
			url:'/addfriend',
			type:'POST',
			data:{userid:id},
			success:function(result){
				console.log("Request sent successfully!");
			}
		});
        document.getElementById(reqid).className = "fa fa-check";
        document.getElementById(reqid).style.fontSize = "18px";
        document.getElementById(reqid).style.color = "blue";
    }
    else{
    	$.ajax({
			url:'/removefriend',
			type:'POST',
			data:{userid:id},
			success:function(result){
				console.log("Request cancelled successfully!");
			}
		});
        document.getElementById(reqid).style.color = "black";    
        document.getElementById(reqid).className = "fa fa-user-plus";
    }
}