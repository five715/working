var _game = null;
$(function(){
	$(window).bind("resize load", function(){
		w = $(".box").width();
		if(w < 1000){			
			size = w / 75;
			$("html").css("font-size",size+"px");
		}
	})
//	fakeLoading($(".loading .plan"),100,100,complete)
/**--------------------------------------------------------**/
	$(".index .btn").on("click",function(){
		onShowHide($(".answer"),$(".index"))
		fakeLoading($(".answer .plan"),100,5000)
		nextIusse();
	})
/**---------------------答题------------------------**/
	$(".choices .choice").on('click',function(){
		var tick = '<img src="images/ioc_tick.png" class="tick"/>'
		$(this).append(tick)
		$(this).siblings().find('.tick').remove()
	})

	Poster.Preload.load(progress,complete)
})
function nextIusse() {
	var n = $(this).attr("data-n")
	if(n){
		var tick = '<img src="images/ioc_tick.png" class="tick"/>'
		$(this).append(tick)
		$(this).siblings().find('.tick').remove()
		_selected.push(n)
//		setTimeout(nextIusse,1000)
//		return false;
	}
	var answer = _issues[_now]
	if(!answer){
		onShowHide($(".result"),$(".answer"))
		console.log("没题了")
		return false;
	}
	console.log(answer,_now)
	$(".ans").attr("class", "ans")
	$(".answer .issue p").text(answer.issue)
	if(answer.pos == "one") {
		for(var choices = [], i = 1; i <= answer.choice[1]; i++) choices.push('<div class="choice choice_' + i + '" data-n="' + i + '"><img src="images/' + answer.choice[0] + i + answer.choice[2] + '" alt="" /></div>')
	} else {
		var now = _now + 1
		$(".ans .gif_bg img").attr("src", "images/iusse_gif_bg_" + now + ".png")
		$(".ans").addClass("gif_" + now)
		for(var choices = [], i = 1; i <= answer.choice.length; i++) choices.push('<div class="choice choice_' + i + '" data-n="' + i + '"><img src="images/choice_select_box.png" alt="" /><p>' + answer.choice[i - 1] + '</p></div>')
	}
	$(".ans .choices").html(choices.join(''));
	$(".ans").addClass("answer_" + answer.pos)
	$(".ans .choice").on("click",nextIusse)
	_now++
}
/*
 * 进度条
 */
function fakeLoading(obj,reso,speed,callback){
	obj.find(".hidden").width(obj.find(".plan_box").eq(0).width())
	var per = 0
	_timer = setInterval(function(){
		per+= (100 / reso);
		obj.find(".overflow").width(per+"%")
		if(per >= 100){	
			clearTimeout(_timer);
			obj.find(".overflow").width("100%")
			if(callback) callback();
		}
	},speed/reso);
}
/**
 * 加载中
 */
function progress(e){
	var per = Math.floor(e.loaded*100);
	$(".loading .overflow").width(per+"%");
	$(".loading .per").text(per+"%");
}
/**
 * 加载完成
 */
function complete(e){
	$(".loading .overflow").width("100%");
	$(".loading .per").text("100%");
	console.log("加载完成")
	onGameStart()
}
/**
 * 游戏开始
 */
function onGameStart(){
//	onShowHide($(".index"),$(".loading"))
	onShowHide($(".result"),$(".loading"))
	_game = new Poster.main($("#poster")[0])
}
/**
 * 游戏结束
 */
function onGameOver(){
	
}
/**
 * 切换页面
 * @param {Object} show
 * @param {Object} hide
 */
function onShowHide(show,hide){
	show.show()
	hide.hide()
}

/**
 * 弹窗
 * @param {Number} n
 * 1 : 图
 */
function popup(n){
	$(".popup,.pop").hide();
	switch(n){
		case 1:
			$(".popup,.popup_testDrive").show();
			break;
	}
}

/**
 * 替换系统弹窗
 * @param {Object} text
 */
function alert(text){
	Vogsojs.alert(text);
	setTimeout(function(){
		$(window).one("click",function(){$(".maskAlert .alertSure").click()})
	},100)
}