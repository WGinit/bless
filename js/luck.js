
// 设置canvas字数过多后自动换行
function getTrueLength(str){//获取字符串的真实长度（字节长度）
            var len = str.length, truelen = 0;
            for(var x = 0; x < len; x++){
                if(str.charCodeAt(x) > 128){
                    truelen += 2;
                }else{
                    truelen += 1;
                }
            }
         return truelen;
 }
function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
    var len = str.length, tlen = len, nlen = 0;
    for(var x = 0; x < len; x++){
        if(str.charCodeAt(x) > 128){
            if(nlen + 2 < leng){
                nlen += 2;
            }else{
                tlen = x;
                break;
            }
        }else{
            if(nlen + 1 < leng){
                nlen += 1;
            }else{
                tlen = x;
                break;
            }
        }
    }
    return tlen;
}

var dy_txt = document.getElementById('bless_txt');
touch.on(dy_txt, 'touchstart', function (ev) {
	if(ev.target.className != "pointtxt" && ev.target.className != "luck" && ev.target.className != "author"){
		ev.preventDefault();
	}	
});

var imgbox = document.getElementById("bless_bg");
var _width = window.screen.width;
var _height = document.body.clientHeight;

imgbox.height = _height;

// 头像位置
$('.avatar').css('top',_height/3.6);
 // 图像圆形裁剪
function circleImg(ctx, img, r) {
    ctx.save();
    x = (_width-100)/2;
    y = _height/3.6;
    var d =2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
}

$('body').css('height',_height);
// 祝福语位置定义
$('.point').css({
    'padding-top':  _height/2,
    'padding-left':  _width/14.5
});

$('.bless_msg').css({
    'padding-top': _height/1.8
})

$('.form-author').css({
    'padding-top': _height/2.3,
    'padding-left': _width/2.75
})

$(".save").click(function(){
	var pointMsg = $(".pointtxt").val(),
    luck = $('#luck').val(),
    author = $('#author').val();

    var  canvas = document.getElementById("myCanvas");
    var  ctx = canvas.getContext("2d");
    canvas.width = _width;
    canvas.height = _height;       
    var imgUrl = new Image,
        qrCodeUrl = new Image,
        point = new Image,
        avatar = new Image;
    imgUrl.src = imgbox.src;
    avatar.src = 'images/avatar.jpg';
    qrCodeUrl.src = "images/qrcode.png";
    point.src = "images/point.png";
    var bless_text = "白山羊送福接力";                       
    imgUrl.onload = function () {
        this.height = _height;
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, _width, _height);
        var erWeiMaY = this.height - qrCodeUrl.height - 90;
        var wyDyY = this.height - 80;
        if (ctx.drawImage(imgUrl, 0, 0, _width, this.height), ctx.beginPath(), ctx.beginPath(), ctx.font = "normal 18px sans-serif", ctx.textAlign = "start", ctx.textBaseline = "hanging", "" != pointMsg &&"" != luck && "" != author &&  void 0 != pointMsg && null != pointMsg && null != luck && null != author) {
            var pTxt = "我在：" + pointMsg;
            var fromTxt = '我是:' + author;
            ctx.fillText(pTxt, _width/8, _height/2);
            ctx.fillText(fromTxt, _width/2.75, _height/2.3);
            ctx.drawImage(point, 0, 0, 42, 55, _width/14.5,  _height/2, 42, 55);
            ctx.drawImage(qrCodeUrl, 0, 0, 100, 100, (_width-100)/2, erWeiMaY, 100, 100);
             circleImg(ctx,avatar, 50);
        }else if(luck.length > 150){
            alert('祝福语字数超过限制');
            return false; 
        }
        else{
            alert('请先输入祝福语吧');
            return false;
        }

        if (ctx.beginPath(), ctx.font = "normal  12px PingFangSC-Medium") {
            ctx.fillText(bless_text, (_width-100)/1.9, wyDyY);
        }

        if (ctx.beginPath(), ctx.font = "normal 20px PingFangSC-Medium") {
            for(var i = 1; getTrueLength(luck) > 0 ; i+=0.1){
                var tl = cutString(luck, _width/13);
                ctx.fillText(luck.substr(0, tl).replace(/^\s+|\s+$/, ""), (_width-(0.8*_width))/2, i *_height/1.8);
                luck = luck.substr(tl);
            }

        }

        document.getElementById("bless_bg1").src = canvas.toDataURL('image/jpeg');

        $(".page2").hide().siblings(".page3").show();

        var tipTop = this.height / 4 - 47;
        $(".save_tip").show().css("top", tipTop);
        setTimeout(function () {
            $(".save_tip").hide();
        }, 3000);               
    };
});