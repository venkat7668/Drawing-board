$(function() {
	var size = 3;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.lineWidth = size;
	ctx.strokeStyle = "#000";
	var flag = 0;
	var pos = $("#canvas").position();
	var left = pos.left;
	var right = pos.top;

	//painting start
	$("#canvas").mousedown(function(e) {
		if (e.button == 0) {
			console.log("left button clicked");
			flag = 1;
			ctx.beginPath();
			ctx.moveTo(e.pageX - left, e.pageY - right);
			//console.log(pos.top);
		}
		else {
			flag = 0;
		}

	}).mousemove(function(e) {
		if (flag) {
			ctx.lineTo(e.pageX - left, e.pageY - right);
			ctx.stroke();
		}
	}).mouseover(function() {
		flag = 0;
	}).mouseup(function(e) {
		flag = 0;
	});

	//color change
	$(".colors div").each(function(index) {
		$(this).click(function() {
			var bgc = $(this).css('backgroundColor');
			$(".current").css('backgroundColor', bgc);
			ctx.strokeStyle = bgc;

			$(".tools div").css('backgroundPosition', 'right center');
			$(".tools div:first").css('backgroundPosition', 'left center');
		});
	});
	//tools
	$(".tools div").each(function(index) {
		$(this).click(function() {
			switch (index) {
				//pen
			case 0:
				$(".tools div").css('backgroundPosition', 'right center');
				$(this).css('backgroundPosition', 'left center');
				ctx.strokeStyle = $(".current").css('backgroundColor');
				break;
				//erase
			case 1:
				$(".tools div").css('backgroundPosition', 'right center');
				$(this).css('backgroundPosition', 'left center');
				ctx.strokeStyle = "#fff"
				break;
				//clear
			case 2:
				ctx.clearRect(0, 0, 450, 450);
				$(".tools div").css('backgroundPosition', 'right center');
				$(".tools div:first").css('backgroundPosition', 'left center')
				ctx.strokeStyle = $(".current").css('backgroundColor');
				break;
			default:
				$(".tools div:first").css('backgroundPosition', 'left center');
				break;

			}
		});
	});
	//size of brush
	$(".inc").click(function() {
		if (size < 10) {
			size += 1;
			ctx.lineWidth = size;
			$("#brushSize").text(size);
		}
	})
	$(".dic").click(function() {
		if (size > 1) {
			size -= 1;
			ctx.lineWidth = size;
			$("#brushSize").text(size);

		}
	})
	$("#brushSize").text(size);
});