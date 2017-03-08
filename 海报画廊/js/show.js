



//控制翻转
function turn(elem){
	var cls = elem.className;
	var n = elem.id.split("_")[1];
	
	if(!/photo_center/.test(cls)){
		return rsort(n);
	}
	
	if(/photo_front/.test(cls)){
		cls=cls.replace(/photo_front/,'photo_back');
		g("#nav_" + n).className += " i_back ";
	}else{
		cls=cls.replace(/photo_back/,'photo_front');
		g("#nav_" + n).className = g("#nav_" + n).className.replace(/\s*i_back\s*/," ")
	}
	return elem.className = cls;
}

//通用函数

function g(selector){
	
//	substr(0,1)返回字符串从第0个位置的长度为1的字符串 第二个参数可以不写代表从第0个位置往后的所有为一个字符串

	var method = selector.substr(0,1) == "." ? "getElementsByClassName":"getElementById";
	return document[method](selector.substr(1));
}

//输出所有海报
var data =data;
function addPhotos(){
	var template = g("#wrap").innerHTML;
	var html = [];
	var nav = [];
	var i = 1;
	for(s in data){
	var	_html = template.replace("{{index}}",s)
		.replace("{{img}}",data[s].img)
		.replace("{{caption}}",data[s].caption)
		.replace("{{desc}}",data[s].desc);
		
		html.push(_html);
		nav.push('<span id = "nav_' + s +'" onclick ="turn(g(\'#photo_'+ s +'\'))" class = "i">'+ i++ +'</span>');
	}
	html.push('<div class = "nav">'+ nav.join('') +'</div>');
	
	g("#wrap").innerHTML = html.join("");
	rsort(random([0,data.length]));
}
addPhotos();

//排序海报
function rsort(n){
	var _photo = g(".photo");
	var photos = [];
	
	for(s = 0;s < _photo.length ; s++){
		_photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/," ");
		_photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/," ");
		_photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/," ");
		
		
		_photo[s].className += " photo_front";
		_photo[s].style.left = "";
		_photo[s].style.top = "";
		_photo[s].style["transform"] = "rotate(0deg) scale(1.3)";
		
		photos.push(_photo[s]);
	}
	
	
	var photo_center = g("#photo_" + n);
	photo_center.className += " photo_center";
	var photo_center = photos.splice(n,1)[0];
	
//	把海报分为左右两个区域
	var photo_left = photos.splice(0,Math.ceil(photos.length/2));
	var photo_right = photos;
	
	var ranges = range();
	for(s in photo_left){
		var photo = photo_left[s];
		
		photo.style.left = random(ranges.left.x) + "px";
		photo.style.top = random(ranges.left.y) + "px";
		photo.style["transform"] = "rotate(" + random([-180,180]) +"deg) scale(1)";
	}
	for(s in photo_right){
		var photo = photo_right[s];
		
		photo.style.left = random(ranges.right.x) + "px";
		photo.style.top = random(ranges.right.y) + "px";
		photo.style["transform"] = "rotate(" + random([-180,180]) +"deg) scale(1)";
	}
	
//	控制按钮处理

	var navs = g(".i");
	for(var s = 0;s<navs.length;s++){
		navs[s].className = navs[s].className.replace(/\s*i_current\s*/,' ');
		navs[s].className = navs[s].className.replace(/\s*i_back\s*/,' ')
	}

	g("#nav_" + n).className += " i_current ";
}

//计算左右分区范围

function range(){
	var range = { left:{x:[] ,y:[]} ,right:{ x:[] ,y:[] } };
	
	var wrap = {
		w:g("#wrap").clientWidth,
		h:g("#wrap").clientHeight
	}
	var photo = {
		w:g(".photo")[0].clientWidth,
		h:g(".photo")[0].clientHeight
	}
	range.left.x = [0 - 100, wrap.w /3 - photo.w / 3];
	range.left.y = [0 - photo.h/3, wrap.h];
	range.right.x = [wrap.w / 2 + photo.w /2, wrap.w - 100];
	range.right.y = range.left.y; 

	return range;
}

//生成随机数
function random(range){
	var max = Math.max(range[0],range[1]);
	var min = Math.min(range[0],range[1]);
	var diff = max - min;
	
	return Math.floor(Math.random() * diff + min);
}

































