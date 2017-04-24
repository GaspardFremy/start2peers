$(document).ready(function(){
		$(".dark").click(function(){
			$("#menu").css("background-color", "#3B3B3B");
			$(".dark").css("color", "white");
			$(".light").css("color", "white");
			$("li").css("color", "white");
			$("#room_box").css("background-color", "#3B3B3B");
			$("#chat_box").css("background-color", "rgba(59, 59, 59, 0.79)");
			$("#text_holder").css("border-top", "1px solid white");
			$("#input").css("background-color", "#3B3B3B");
			$("#input_box").css("background-color", "#3B3B3B");
			$("#text_holder").css("background-color", "#3B3B3B");
			$("#theme_box").css("background-color", "#3B3B3B");
			$("h6").css("color", "white");
			$(".dot1").css("fill", "#A6E22E");
			$(".dot2").css("fill", "#F92672");
			$(".message_box").css("background-color", "#3B3B3B");
			$(".message_style").css("color", "white");
			$('body').css("background-image", "url(/static/image/bg-star-dark2-opacity.png)");
		});

        $(".light").click(function(){
            $("#menu").css("background-color", "white");
			$(".dark").css("color", "black");
			$(".light").css("color", "black");
			$("li").css("color", "black");
			$("#room_box").css("background-color", "white");
			$("#chat_box").css("background-color", "rgba(255, 255, 255, 0.79)");
			$("#text_holder").css("border-top", "1px solid black");
			$("#input").css("background-color", "white");
			$("#text_holder").css("background-color", "white");
			$("#input_box").css("background-color", "white");
			$("#theme_box").css("background-color", "white");
			$("h6").css("color", "black");
			$(".dot1").css("fill", "#F92672");
			$(".dot2").css("fill", "#A6E22E");
			$(".message_box").css("background-color", "white");
			$(".message_style").css("color", "black");
			$('body').css("background-image", "url(/static/image/bg-star-obi-opacity.png)");
			$("#input_box").css("color", "black");
        });

		$("#start_chatting").click(function(){
			$(".chat_content").css("display", "block");
			$("#menu ul").css("display", "block");
			$('.login_content').css("display", "none");
        });
});


// something is not working

// $('#theme_box p').click(function(){
//        var previous = $('#chat_box, #room_box, #theme_box, #menu ').attr("class");
//        var color = $(this).attr("class");
//        $('#chat_box, #room_box, #theme_box, #theme_box, #menu, li.message_box').removeClass(previous).addClass(color);
//    });
