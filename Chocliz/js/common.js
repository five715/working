var _position = null;
$(function(){
	$(window).bind("resize load", function(){
		w = $(".box").width();
		if(w < 1000){			
			size = w / 75;
			$("html").css("font-size",size+"px");
		}
	})
	testDriveInit();
/*****--------------弹窗-------------*****/
	//关闭按钮
	$(".popup .close,.popup .btn").on("click", popup);
	//身旁
	$(".popup_select .btn_near").on("click",function(){
		$(".index").hide();
		$(".QRcode").show();
		popup();
		createQRcode();
		var scan = new Scan.main($("#scan")[0]);
	})
	//不在身旁
	$(".popup_select .btn_far").on("click",function(){
		location.href = "select.html#way=one&position="+_position
	})
	//上传并领取
	$(".popup_red .submit").on("click",function(){
		popup(2)
	})
	//填写信息-提交
	$(".popup_info .submit").on("click", verify)
	//填写信息-问号
	$(".popup_info .guide").on("click", function(){
		$(".popup_guide").show();
	})
	//引导
	$(".popup_guide .close_one").on("click", function(){
		$(this).parent().hide();
	})
	//上传身份证
	$(".popup_info .upfiles input").on("change",upFiles)

//	popup(1,99);	
})
/*****----------------弹窗------------------*****/
/*
 * 弹窗
 * n : 关闭弹窗
 * 1 : 红包
 * 	 number : 红包金额
 * 2 : 填写信息
 * 3 : 提交成功
 */
function popup(n,number){
	$(".popup,.popup .pop").hide();
	switch(n){
		case 1:
			popupRed(number);
			break;
		case 2:
			$(".popup,.popup_info").show();
			break;
		case 3:
			$(".popup,.popup_success").show();
			break;
	}
}
/**
 * 红包
 * number : 金额
 * 0.33, 0.52, 1.17, 1.25, 3.33, 99
 * 其他金额没有对应文字
 */
function popupRed(number){
	if(number == 99){
		$(".popup_red .submit").show();
		$(".popup_red .close").hide();
	}else{
		$(".popup_red .submit").hide();
		$(".popup_red .close").show();
	}
	$(".popup_red .money span").html(convert(number));
	$(".popup_red .text img").attr("src","images/popup_red_" + number + ".png");
	$(".popup,.popup_red").show();
}

/*****----------------function------------------*****/
/**
 * 文字转图片
 */
function convert(digit){
	var split = String(digit).split("");
	var img = "";
	for (var i = 0; i < split.length; i++) {
		if(isNaN(split[i])){
			if(split[i] == '.') img += "<img class='dot' src='images/money_dot.png' />"
			continue
		};
		img += "<img src='images/money_" + split[i] + ".png' />"
	}
	return img;
}
/*---------------验证---------------*/
function verify(){
	// 验证姓名
    var name = $(".popup_info .name input").val();
    if (validName(name)){
    	if(name=="请输入姓名"){
            alert("请输入姓名");
            return false
        }
    }else {
        alert("请输入正确的姓名");
        return false
    }
    //验证电话号码是否正确
    var phone = $(".popup_info .phone input").val();
    if (validPhone(phone)){
    }else {
    	if(phone == "请输入电话"){
    		alert("请输入手机号码");
	        return false;
    	}else{	
    	    alert("请输入正确的手机号码");
	        return false;
    	}
    }
    //验证邮箱是否正确
    var email = $(".popup_info .email input").val();
    if (!validEmail(email)){
	    alert("请输入有效的邮箱地址");
        return false;
    }
    //身份证正面
    var front = $(".popup_info .upfiles .front .show img").attr("src");
    if(!front){
	    alert("请上传身份证正面");
        return false;
    }
    //身份证背面
    var rear = $(".popup_info .upfiles .rear .show img").attr("src");
    if(!rear){
	    alert("请上传身份证背面");
        return false;
    }
    
    //数据保存
    var data = {
    	name	: name,
    	phone	: phone,
    	email	: email,
    	front	: front,
    	rear	: rear
    }
    console.log(data)
//  alert("保存成功")
	popup(3)
	testDriveInit();
    
	// 验证姓名的正则表达式
	function validName(name){
	    var pattern=/^([a-zA-Z]{1,20}|[\u4e00-\u9fa5]{1,10}|[\u4e00-\u9fa5a-zA-Z]{1,20})$/;
	    return pattern.test(name)
	}
	//手机号的验证  正则表达式
	function validPhone(phone){
	    var pattern=/^1[34578][0-9]{9}$/;
	    return pattern.test(phone)
	}
	//email的验证
	function validEmail(email){
		var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		return pattern.test(email);
	}
}
/**
 * 信息初始化
 */
function testDriveInit(number){
	if(!number) number = "all";
	if(number == "name" || number == "all" ) $(".popup_info .name input").val("");
	if(number == "phone" || number == "all" ) $(".popup_info .phone input").val("");
	if(number == "email" || number == "all" ) $(".popup_info .email input").val("");
	if(number == "files" || number == "all" ) $(".popup_info .upfiles .show").empty();
}
/**
 * 上传身份证
 */
function upFiles(e){
	var _this = $(this).parent().find(".show");
	    _this.empty();
    var files = e.target.files[0];
    if(!files) return;
    var reader = new FileReader();
    reader.onload = function(e1){
    	var dx =(e1.total/1024)/1024;
	    if(dx>=5){
	      alert("文件大小大于5M");
	      return;
	    }
	    $(".idcard1 img").remove();
        var img =  new Image();
        img.src = e1.target.result;
        img.onload = function(e2){
            var imgs = compress(e2.target);
		    imgs.style.width ="100%";
		    imgs.style.height ="100%";
	    	_this.append(imgs);
        }
        img.src =this.result;
    }
    reader.readAsDataURL(files);
}

function compress(source){
	var _width = 400,
		_height = 400
	var width = source.width;
	var height = source.height;
	
//	if(width <= _width && height <= _height){
		// console.log("宽高都小");
		var xScale = _width / width;
		var yScale = _height / height;
		var scale = xScale<yScale?yScale:xScale;
		width *= scale;
		height *= scale;
		var pattern = /image\/(.*);/i;
		var arr = pattern.exec(source.src);
		window.mime_type = arr[0];
		var cvs = document.createElement('canvas');
		//naturalWidth真实图片的宽度
		cvs.width = width;
		cvs.height = height;
		
		var ctx = cvs.getContext("2d").drawImage(source, 0, 0, source.naturalWidth, source.naturalHeight, 0,0, width, height);
		var data = cvs.toDataURL(mime_type, 1);
		var img = new Image();
		img.src = data;
		img.width = width;
		img.height = height;
		img.scale = scale;
		//_this.getOrientation(source);
		return img;
//	}
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