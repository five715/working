var Poster = {};
Poster.VER = "1.0.0";
Poster.Event = {
	CREATE:"create"

}
/**
 *	预先加载
 */
Poster.Preload = {
	_queue : null,	//loder
	_images : [
		{id:"bg",src:"poster_bg.jpg"},
		{id:"qrCode",src:"qrCode.png"},
		{id:"emoji_1",src:"emoji_1.jpg"},
		{id:"emoji_2",src:"emoji_2.jpg"},
		{id:"emoji_3",src:"emoji_3.jpg"},
		{id:"emoji_4",src:"emoji_4.jpg"},
		{id:"emoji_5",src:"emoji_5.jpg"},
		{id:"emoji_6",src:"emoji_6.jpg"},
		{id:"emoji_7",src:"emoji_7.jpg"},
		{id:"emoji_8",src:"emoji_8.jpg"},
		{id:"emoji_9",src:"emoji_9.jpg"},
		{id:"emoji_10",src:"emoji_10.jpg"}
	],
	_sounds : [
	
	],
	/**
	 *	初始化
	 */
	init : function(number){
		this._queue = new createjs.LoadQueue(false);
		this._queue.loadManifest(this._images, false, "res/");
//		this._queue.loadManifest(this._sounds, false, "sounds/");
//		createjs.Sound.registerSounds(this._sounds);
	},
	/**
	 *	加载
	 */
	load : function(progress, complete,number){
		if(!this._queue) this.init(number);
		if(progress)this._queue.on("progress", progress, this);//资源载入中
		if(complete)this._queue.on("complete", complete, this);//资源载入完毕
		this._queue.load();
	},
	/**
	 *	获取loader
	 */
	getQueue : function(){
		return this._queue;
	},
	/**
	 *	获取文件实体
	 */
	getResult : function(id){
		return this._queue.getResult(id);
	}
};

/**
 * 主函数
 */
Poster.main = function(canvas){
	var _this = this;
	var FPS = 60;
	var WIDTH = 579,
		HEIGHT = 882;
	var __game = null;
	var __pic = null,	//头像
		__name = null,	//姓名
		__title = null,	//标题
		__emoji = null,	//表情
		__seal = null,	//印章
		__boxes = null,	//表情框,
		__qrCode = null,	//二维码
		__codeText = null,	//二维码文字
		__logo	= null;	//logo
	var _bg = {id:"bg"}
	_this.init = function(canvas){
		_this.Stage_constructor(canvas);//继承stage
		createjs.Ticker.setFPS = FPS;	//帧频
		createjs.Ticker.addEventListener('tick', _this);	//按照帧频更新舞台
		createjs.Touch.enable(_this);	//启用tauch
		__game = new createjs.Container();
		_this.addChild(__game)
		
		var bg = Poster.common.addBitmap(_bg)
		__game.addChild(bg)
	}
	/*
	 * 获得图片base64编码
	 */
	_this.getImageData = function(){
		__game.cache(0,0,WIDTH,HEIGHT);
		var data = __game.getCacheDataURL();
		var img = new Image();
		img.src = data;
		img.onload = function(e){
			compress(img,WIDTH,HEIGHT)
		}
		__game.uncache();			
		return data;
	}
	function compress (source, width, height){
//		var img = new Image();
//		img.src = source;
//		console.log(img)
		var mime_type = "image/jpeg";
		var quality = 0.8;
		var cvs = document.createElement('canvas');
		//naturalWidth真实图片的宽度
		cvs.width = width;
		cvs.height = height;
		var ctx = cvs.getContext("2d").drawImage(source, 0,0, width, height);
		var data = cvs.toDataURL(mime_type, quality);
		isCreate(data);
//		return data;
	}
	/**
	 * 可以生成
	 */
	function isCreate(data){
		var evt = new createjs.Event(Poster.Event.CREATE);
		evt.data = data;
		_this.dispatchEvent(evt);
	}
	_this.getToDataURL = function(){
		var data = $("#Poster")[0].toDataURL("image/jpeg");
		return data;
	}
	_this.init(canvas);
}
Poster.main.prototype = createjs.extend(Poster.main, createjs.Stage);
Poster.main = createjs.promote(Poster.main, "Stage");

/**
 * 声音
 */
Poster.Sound = function(id,loo) {
	var _this = this;
	var __sound = null,
		_loop = loo;
	_this.init = function(id) {
		_this.Container_constructor(); //构造
		__sound = new createjs.Sound.play(id,{loop:_loop});
		_this.on("tick", onTick)
	}
	_this.play = function(){
		__sound.play()
	}
	_this.stop = function(){
		_loop = false;
		__sound.stop();
	}
	function onTick(){
		_this.removeEventListener("tick", onTick)
		if(_loop) __sound.play();
	}
	_this.init(id)
}
Poster.Sound.prototype = createjs.extend(Poster.Sound, createjs.Container);
Poster.Sound = createjs.promote(Poster.Sound, "Container");


/**
 * 公用
 */
Poster.common = {
	SCALE : 1,
	FEAMERATE : 8,
	INTERVAL : 1000,
	_sound : null,
	/**
	 * 雪碧图控制 
	 */
	startSpritSheet : function(obj){
		obj.play();
		obj.visible = true;
	},
	endSpritSheet : function(obj,boolean){
		obj.stop();
		if(!boolean) obj.visible = false;
	},
	/**
	 * 动画帧
	 */
	objTween : function(obj,objTo,func,boolean){
		Cartoon.common.startSpritSheet(obj);
		createjs.Tween.get(obj)
			.to({x : objTo.x, y : objTo.y},objTo.i ? Cartoon.common.INTERVAL * objTo.i : Cartoon.common.INTERVAL)
			.call(function(){
				func();
				Cartoon.common.endSpritSheet(obj,boolean);
			})
	},
	/**
	 * 添加雪碧图
	 */
	addSprite : function(id, obj){
		if(!obj.s) obj.s = Cartoon.common.SCALE;
		if(!obj.f) obj.f = Cartoon.common.FEAMERATE;
		var data = {
			images : [Cartoon.Preload.getResult(id)],
			frames : { width : obj.w, height : obj.h},
			framerate : obj.f
		};
		var spriteSheet = new createjs.SpriteSheet(data);
		var sheet = new createjs.Sprite(spriteSheet);
		sheet.scaleX = sheet.scaleY = obj.s;
		sheet.visible = false;
		if(obj.p){
			sheet.visible = true;
			sheet.play();
		}
		sheet.x = obj.x;
		sheet.y = obj.y;
		return sheet;
	},
	/**
	 * 添加图片
	 */
	addBitmap : function(obj){
		if(!obj.x) obj.x = 0;
		if(!obj.y) obj.y = 0;
		var bit = new createjs.Bitmap(Poster.Preload.getResult(obj.id));
		bit.x = obj.x;
		bit.y = obj.y;
		return bit;
	},
	/**
	 * 添加热区
	 */
	addShape : function(obj){
		var shape = new createjs.Shape();
		shape.graphics.f( "rgba(0,0,0,1)" )
    			.dr( obj.x, obj.y, obj.w, obj.h )
  		return shape;
	},
	weixinSound: function(){
		var browser = {
		    versions: function () {
		        var u = navigator.userAgent, app = navigator.appVersion;
		        return {
		            webKit: u.indexOf('AppleWebKit') > -1,
		            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
		            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
		            weixin: u.indexOf('MicroMessenger') > -1,
		            txnews: u.indexOf('qqnews') > -1,
		            sinawb: u.indexOf('weibo') > -1,
		            mqq: u.indexOf('QQ') > -1
		        };
		    }(),
		    language: (navigator.browserLanguage || navigator.language).toLowerCase()
		};
		
		// ios下的微信和qq自动播放视频
		if (browser.versions.ios && (browser.versions.weixin || browser.versions.mqq)) {
		    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
		        //已经错过事件不能再自动播放
		    } else {
		        if (document.addEventListener) {
		            document.addEventListener("WeixinJSBridgeReady", loadVideo, false);
		        } else if (document.attachEvent) {
		            document.attachEvent("WeixinJSBridgeReady", loadVideo);
		            document.attachEvent("onWeixinJSBridgeReady", loadVideo);
		        }
		    };
		}
		//加载视频
		function loadVideo() {
			Poster.common._sound = document.getElementById("bell");
			if(!Poster.common._sound) loadVideo();
		    Poster.common._sound.play();
//		    alert(Poster.common._sound)
		    Poster.common._sound.pause();
			Poster.common._sound.currentTime = 0
		}
	}
}
