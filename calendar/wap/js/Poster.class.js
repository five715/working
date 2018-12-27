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
		{id:"emoji_10",src:"emoji_10.jpg"},
		{id:"title",src:"title.png"},
		{id:"line",src:"line.png"},
		{id:"logo",src:"logo.png"},
		{id:"seal",src:"seal.png"},
	],
	_src:[
		{id:"iusse_gif_3",src:"iusse_gif_3.png"},
		{id:"iusse_gif_4",src:"iusse_gif_4.png"},
		{id:"iusse_gif_5",src:"iusse_gif_5.png"},
		{id:"iusse_gif_7",src:"iusse_gif_7.png"},
		{id:"iusse_gif_bg_3",src:"iusse_gif_bg_3.png"},
		{id:"iusse_gif_bg_4",src:"iusse_gif_bg_4.png"},
		{id:"iusse_gif_bg_5",src:"iusse_gif_bg_5.png"},
		{id:"iusse_gif_bg_6",src:"iusse_gif_bg_6.png"},
		{id:"iusse_gif_bg_7",src:"iusse_gif_bg_7.png"}
	],
	_a:[
		{id:"emoji_11",src:"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL3xC3su7xUBRaoUK80Vz60mVPG24Jd6Qa4X6Hlyd4gcBNJxgQBBib02VWThRN2BfTibQwXgzxrCicwg/132"}
	],
	/**
	 *	初始化
	 */
	init : function(number){
		this._queue = new createjs.LoadQueue(false);
		this._queue.loadManifest(this._images, false, "res/");
		this._queue.loadManifest(this._src, false, "images/");
		this._queue.loadManifest(this._a, false, "");
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
		__emoji = null,	//表情
		__seal = null,	//印章
		__qrCode = null;	//二维码
	var _bg = {id:"bg"},
		_pic = {id:'emoji_1',x:64,y:54},
		_title = {id:'title',x:159,y:68},
		_boxes = {id:'title',x:159,y:68},
		_line = [
			{id:'line',x:33,y:67},
			{id:'line',x:33,y:67+520-3},
			{id:'line',x:30+520,y:67+520-3}
		],
		_emoji = {id:'emoji_10',x:33,y:3},
		_code = {id:'qrCode',x:1,y:1},
		_logo = {id:'logo',x:431,y:821},
		_seal = {id:'seal',x:306,y:153}
	var TEXT = {
		font : "16px Arial",
		color: "#191919"
	}
	_this.init = function(canvas){
		_this.Stage_constructor(canvas);//继承stage
		createjs.Ticker.setFPS = FPS;	//帧频
		createjs.Ticker.addEventListener('tick', _this);	//按照帧频更新舞台
		createjs.Touch.enable(_this);	//启用tauch
		__game = new createjs.Container();
		_this.addChild(__game)
		
		var bg = Poster.common.addBitmap(_bg)
		var logo = Poster.common.addBitmap(_logo)
		__game.addChild(bg,logo)
		_this.addTitle()
		_this.addBoxes()
		_this.addQRCode();
		__seal = Poster.common.addBitmap(_seal)
		__game.addChild(__seal)
	}
	_this.setData = function(emoji,pic,name){
		if(pic) {
			if(!isNaN(pic)){
				__pic.image = Poster.Preload.getResult("emoji_"+pic)
			}else {
				var img = new Image()
//				img.crossOrigin = "Anonymous";
				img.onload = function(e){
					var path = e.path?e.path[0] :img;
					console.log(e,path)
					__pic.image = path
					_this.setScale(__pic,74)
				}
				img.src = pic
			}
		}
		if(name) __name.text = name
		if(emoji) __emoji.image = Poster.Preload.getResult("emoji_"+emoji)
		_this.setScale(__pic,74)
	}
	_this.addTitle = function(){
		__pic = Poster.common.addBitmap(_pic)
		_this.setScale(__pic,74)
		var mask = new createjs.Shape()
		mask.graphics.f('#bfbfbf').drawCircle(101,91,74/2)
		__pic.mask = mask
		
		__name = new createjs.Text("大企鹅",TEXT.font,TEXT.color)
		__name.textAlign = "center"
		__name.x = 79+25;
		__name.y = 140;
		var title = Poster.common.addBitmap(_title)
		__game.addChild(__pic,__name,title)
	}
	_this.addBoxes = function(){
		__boxes = new createjs.Container()
		__boxes.y = 190
		__game.addChild(__boxes)
		for(var i = 0;i<_line.length;i++){
			var line = Poster.common.addBitmap(_line[i])
			line.regX = line.regY = 67
			__boxes.addChild(line)
		}
		var boxes = new createjs.Shape()
		boxes.graphics.f('#2d2727').dr(30,0,525,520)
		__emoji = Poster.common.addBitmap(_emoji)
		_this.setMask(3,"#2d2727",30,0,525,520,__boxes,__emoji)
	}
	_this.addQRCode = function(){
		__qrCode = new createjs.Container();
		__qrCode.x = 20;
		__qrCode.y = 756;
		__game.addChild(__qrCode)
		
		var code = Poster.common.addBitmap(_code) 
		_this.setMask(1,"#2d2727",0,0,99,99,__qrCode,code)
		
		var text = ['扫描二维码','破解你的年度freestyle表情']
		
		for(var i = 0; i < text.length; i ++){
			var codeText = new createjs.Text(text[i],"16px Arial","#343434")
			codeText.y = 45+i*25
			codeText.x = 114
			__qrCode.addChild(codeText)
		}
	}
	_this.setScale = function(o,width){
		var obj = o.getBounds()
		var scale = obj.width < obj.height ? width/obj.width : width/obj.height
		o.scaleX = o.scaleY = scale
	}
	_this.setMask = function(ss,s,sx,sy,ex,ex,obj,o){
		var box = new createjs.Shape();
		box.graphics.f(s).dr(sx,sy,ex,ex)
		var mask = new createjs.Shape();
		mask.graphics.dr(sx+ss,sy+ss,ex-ss*2,ex-ss*2)
		o.mask = mask 
		_this.setScale(o,ex-ss*2)
		obj.addChild(box,o)
		return mask
	}
	/*
	 * 获得图片base64编码
	 */
	_this.getImageData = function(){
		__game.cache(0,0,WIDTH,HEIGHT);
		var data = __game.getCacheDataURL();
//		var img = new Image();
//		img.src = data;
//		img.onload = function(e){
//			compress(img,WIDTH,HEIGHT)
//		}
		__game.uncache();			
		isCreate(data);
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
	_sound : null,
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
			Poster.common._sound = document.getElementById("bgm");
			if(!Poster.common._sound) loadVideo();
		    Poster.common._sound.play();
//		    alert(Poster.common._sound)
		    Poster.common._sound.pause();
			Poster.common._sound.currentTime = 0
		}
	}
}
