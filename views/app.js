var main = function () {
    'use strict';



	var socket= io.connect();
	
	var $messageForm=$("#messForm");
	var $message=$("#message");
	var $chat=$("#chat");
	var $messFormArea=$("#messageArea")
	var $userFormArea=$("#userFormArea")
	var $userForm=$("#userForm");
	var $users=$('#users');
	var $username=$('#username');

	$messageForm.submit(function(e){
      e.preventDefault();
      socket.emit('send message', $message.val());
      $message.val('');

	});

	socket.on('new message',function(data){
		$chat.append('<div class="well"><strong>'+data.user+':</strong>'+ data.msg+'</div>');

	});
	socket.on('get users', function(data){
		var html='';
		for (var i = 0; i < data.length; i++) {
		html+='<li class="list-group-item">'+ data[i] +'</li>'

	}
	$users.html(html);
	});	

	$userForm.submit(function(e){
      e.preventDefault();
      socket.emit('new user', $username.val(),function(data){
      	if(data){
      		$userFormArea.hide();
      		$messFormArea.show();

      	}
      });
      $username.val('');

	});
	
};


$(document).ready(main);