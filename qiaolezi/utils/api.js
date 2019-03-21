const STORAGE = {
  PARAMATER: "paramater"
}
// const URL = "https://qiaolezi.act.qq.com";
const URL = "https://s1-test.act.qq.com"
const SERVICE = {
  LOGIN: "/default/login", //登录注册
  //GETINFO: "/default/getinfo",  //是否中99红包
  EXCODE: "/default/excode", //棒签兑换
  SAVETEL: "/default/savetel", //提交授权手机号
  GETSTATUS: "/default/getstatus", //拉取用户beats解锁状态
  UNLOCK: "/default/unlock", //解锁beats
  SAVEFILE: "/default/savefile", //提交作品信息
  GETFILE: "/default/getfile", //拉取作品信息
  GETUSERINFO: "/default/getuserinfo", //拉取个人中心数据
  LOTTERY: "/default/lottery", //抽奖
  // SAVEUSER: "/default/saveuser", //完善个人信息
  EXSCORE: "/default/exscore" //积分兑换
}

const isAPi= 1;     //是否使用模拟数据

function getStorage() {
  var paramater = wx.getStorageSync(STORAGE.PARAMATER) || { "loginData": "xxxaaa" };
  return paramater;
}

function request(url, data, success, fail) {
  console.log("请求内容:" ,data)
  var requestTask = wx.request({
    url: url,
    method: "POST",
    data: data,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    dataType:"json",
    success: success,
    fail: fail
  })
}
/**
 * 登录
 */
function login(callback, userInfo) {
  console.log(getStorage());
  wx.login({
    success: (res) => {
      var code = res.code
      console.log(code)
      if (code) {
        if(isAPi){
          var res = {"code": 0, "message": "suc", "data": "xxx"}
          wx.setStorageSync(STORAGE.PARAMATER, { "loginData": res.data });
          callback(res)
          return false;
        }
        request(URL + SERVICE.LOGIN, {
          code: code,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }, function (res) {
          if(res.data.code == 0){
            wx.setStorageSync(STORAGE.PARAMATER, { "loginData": res.data.data });
            callback(res)
          }
        })
      }
    }
  })
}

/**
 * 是否中99红包
 */
function getinfo(callback){
  var paramater = getStorage();

  console.log(paramater)
  if (isAPi) {
    var res = { "code": 0, "message": "suc", "status": "1", "flag": "1", "nick": "1", "head": "xxx", "score": "1" }
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)
    return false;
  }
  request(URL + SERVICE.GETINFO, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })

}


/**
 * 棒签兑换
 */
function excode(callback, excode, type) {
  var paramater = getStorage();
  paramater.excode = excode;
  paramater.type = type;

  console.log(paramater)

  if (isAPi) {
    var res = {
      "code": 0,
      "message": "suc",
      "ret": 0.33,
      "package": "xxx",
      "lid": 123
    }

    // 失败的例子
    // var res = { "code":-1, "message": "\u975e\u6cd5\u8bf7\u6c42"}
    callback(res)
    return false
  }
  request(URL + SERVICE.EXCODE, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })

}

/**
 * 提交手机号
 */
function savetel(callback, encryptedData, iv, lid) {
  var paramater = getStorage();
  paramater.encryptedData = encryptedData;
  paramater.iv = iv;
  paramater.lid = lid;

  console.log(paramater)
  if(isAPi){
    var res = { "code":0, "message":"suc" }
    // 失败的例子
    // { "code":-1, "message": "\u975e\u6cd5\u8bf7\u6c42"
    callback(res)
    return false
  }
  request(URL + SERVICE.SAVETEL, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 获取beats状态
 */
function getStatus(callback){
  var paramater = getStorage();

  console.log(paramater)
  if(isAPi){
    var res = {"code": 0, "message": "suc", "bt1": 0, "bt2": 0}
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }

    callback(res)
    return false
  }
  request(URL + SERVICE.GETSTATUS, paramater, function (res) {
    if (res.data.code == 0) {
      callback(res.data)
    }
  })
}

/**
 * 解锁beats
 */
function unlock(callback,type){
  var paramater = getStorage();
  paramater.type = type
  console.log(paramater)
  if(isAPi){
    var res = { "code":0, "message":"suc" }
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }

    callback(res)
    return false
  }
  request(URL + SERVICE.UNLOCK, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 提交作品信息
 */
function saveFile(callback, content) {
  var paramater = getStorage();
  paramater.content = content

  console.log(paramater)
  if(isAPi){
    var res = { "code": 0, "message": "suc", "fid": 1 }
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)

    return false
  }
  request(URL + SERVICE.SAVEFILE, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 拉取作品信息
 */
function getFile(callback, fid) {
  var paramater = getStorage();
  paramater.fid = fid

  console.log(paramater)
  if(isAPi){
    var res = { "code": 0, "message": "suc", "content":"[{'id':'beats0','t':4519,'s':false},{'id':'beats1','t':8005,'s':false}]"}
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)
    return false
  }
  request(URL + SERVICE.GETFILE, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 拉取个人中心数据
 */
function getUserInfo(callback){
  var paramater = getStorage();
  
  console.log(paramater)
  if(isAPi){
    var res = {
      "code": 0, "message": "suc", "score": 123, "head": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKl06gDibQ7aOxHd47M5C35QS9YK5TDK5L5LdRQZgqACTJIrugp7PcGiazrT0urPkcK80CGJCw1r7SA/132" , "nick": "five",
      "data": [
        { "award_id": "xx", "award_code": "xxxxx111111", "award_name": "爱奇艺VIP", "award_time":"20190223"},
        { "award_id": "xx", "award_code": "", "award_name": "oppo手机一部", "award_time":"20190223"}, 
        { "award_id": "xx", "award_code": "222222xxxxx", "award_name": "爱奇艺VIP", "award_time": "20190223" },
        { "award_id": "xx", "award_code": "333333xxxxx", "award_name": "爱奇艺VIP", "award_time": "20190223" },
        { "award_id": "xx", "award_code": "444444xxxxx", "award_name": "爱奇艺VIP", "award_time": "20190223" }
      ]
    }
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)
    return false
  }
  request(URL + SERVICE.GETUSERINFO, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 启动抽奖
 */
function lottery(callback,score) {
  var paramater = getStorage();
  paramater.score = score

  console.log(paramater)
  if(isAPi){
    var res = { "code":0, "message":"suc","score": 113, "award_code": "xxx","award_name": "xxx", "award_id":1 }
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)
    return false
  }
  request(URL + SERVICE.LOTTERY, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 完善个人信息
 */
function saveUser(callback,award_id,name,tel,addr){
  var paramater = getStorage();
  paramater.award_id = award_id;
  paramater.name = name;
  paramater.tel = tel;
  paramater.addr = addr;

  console.log(paramater)
  if(isAPi){
    var res = { "code":0, "message":"suc"}
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)
    return false
  }
  request(URL + SERVICE.SAVEUSER, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 积分兑换
 */
function exscore(callback,score,type){
  var paramater = getStorage();
  paramater.score = score
  paramater.type = type

  console.log(paramater)
  if(isAPi){
    var res = { "code":0, "message":"suc","score": 123}
    // 失败的例子
    // { "code": -1, "message": "\u975e\u6cd5\u8bf7\u6c42" }
    callback(res)
    return false
  }
  request(URL + SERVICE.EXSCORE, paramater, function (res) {
    if (res.code == 0) {
      callback(res)
    }
  })
}

/**
 * 初始化
 */
function init() {
  console.log("接口文件=>初始化")
}

module.exports = {
  init: init,
  login: login,
  getinfo: getinfo,
  excode: excode,
  savetel: savetel,
  getStatus: getStatus,
  unlock:unlock,
  saveFile:saveFile,
  getFile:getFile,
  getUserInfo: getUserInfo,
  lottery: lottery,
  saveUser:saveUser,
  exscore: exscore
}