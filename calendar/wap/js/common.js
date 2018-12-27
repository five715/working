var _game = null,
	_timer = null;
$(function(){
	$(window).bind("resize load", function(){
		w = $(".box").width();
		if(w < 1000){			
			size = w / 75;
			$("html").css("font-size",size+"px");
		}
		$(".answer").css("height",window.innerHeight)
	})
//	fakeLoading($(".loading .plan"),100,100,complete)
/**-----------------------首页---------------------------------**/
	var date = new Date()
	var year = date.getFullYear(),
		month = date.getMonth()+1,
		day = date.getDate();
//	month = 1
//	day = 3
	if(day>27 || day<4){
		var n = parseInt(Math.random()*6+1)
		console.log(_standOfFall[n-1],year,month,day,_calendar[month][day])
		$(".index .boxes .alter").each(function(){
			var cls = $(this).parent().attr("class")
			if(cls == "yi" || cls == "ji"){
				$(this).attr("src","images/calendar/index_boxes_"+cls+"_"+n+".png")
			}else{
				$(this).attr("src","images/calendar/index_boxes_"+cls+"_"+day+".png")
			}
		})
	}
	
		
	$(".index .btn").on("click",function(){
		$(".video").show()[0].play()
		$(".video").on("ended",function(){
			onShowHide($(".answer"),$(".index"))
			nextIusse();
		})
	})
/**---------------------答题------------------------**/
	$(".choices .choice").on('click',function(){
		var tick = '<img src="images/ioc_tick.png" class="tick"/>'
		$(this).append(tick)
		$(this).siblings().find('.tick').remove()
	})
	$(".answer .play").on("click",function(){
		$(this).hide()
		$(".gif_3 .gif").css("-webkit-animation","demo 1.5s steps(12) infinite")
		$(".sound3")[0].play()
		
	})
/**---------------------结果------------------------**/
	$(".result .btn_not_me").on("click",function(){
		var n = parseInt(Math.random()*10+1)
		$(".result .emoji img").attr("src","images/result_emoji_"+n+".jpg")
		_game.setData(n)
		console.log()
		var t = _resultTexts[n-1]
		if(Array.isArray(t)) t = t[parseInt(Math.random()*t.length)]
		$(".result .text p").text(t)
	})
	$(".result .btn_friend").on("click",function(){
		popup(2)
		_game.getImageData()
	})
/**---------------------弹窗------------------------**/
	
	$(".popup").on("click",popup)
	$(".pop").on("click",function(){
		return false
	})
	$(".loading .plan .hidden").width($(".loading .plan .plan_box").eq(0).width())
	Poster.Preload.load(progress,complete)
})
function nextIusse() {
	var n = $(this).attr("data-n")
	if(n){
		if($(this).parent().find('.tick').length) return false
		if(_timer) clearTimeout(_timer);
		var tick = '<img src="images/ioc_tick.png" class="tick"/>'
		$(this).append(tick)
		$(this).siblings().find('.tick').remove()
		_selected.push(n)
		setTimeout(nextIusse,500)
		return false;
	}
	var answer = _issues[_now]
	if(!answer){
		onShowHide($(".result"),$(".answer"))
		console.log("没题了")
		if(_timer)clearTimeout(_timer);
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
	setTimeout(function(){
		$(".ans .choice").on("click",nextIusse)
	},200)
	fakeLoading($(".answer .plan"),100,10000,function(){
		_selected.push("")
		nextIusse()
	})
	if(_now == 2){
		$(".answer .play").show()
	}else{
		$(".answer .play").hide()
		$(".ans .gif").css("-webkit-animation","")
		$(".sound3")[0].pause()
	}
	_now++
}
/*
 * 进度条
 */
function fakeLoading(obj,reso,speed,callback){
	if(_timer)clearTimeout(_timer);
	obj.find(".hidden").width(obj.find(".plan_box").eq(0).width())
	obj.find(".overflow").width("0%")
	var per = 0
	_timer = setInterval(function(){
		per+= (100 / reso);
		obj.find(".overflow").width(per+"%")
		$(".answer .per").text(10-parseInt(per/10)+"s")
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
	onShowHide($(".index"),$(".loading"))
//	onShowHide($(".result"),$(".loading"))
	_game = new Poster.main($("#poster")[0])
	_game.on(Poster.Event.CREATE,onGameOver)
	setData(headimgurl,nickname)
	$(".result .btn_not_me").click()
}
/**
 * 游戏结束
 */
function onGameOver(e){
	popup(1)
	$(".popup .poster img").attr("src",e.data)
}
/**
 * 设置图片头像昵称
 * pic:头像
 * name:昵称
 */
function setData(pic,name){
	_game.setData(null,pic,name)
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
			$(".popup,.popup_poster").show();
			break;
		case 2:
			$(".popup,.popup_hint").show();
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
