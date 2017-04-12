$(function() {
	//鼠标经过li切换效果
	(function() {
		var aLi = $('#uL li');
		var index = 0;
		aLi.eq(index).addClass('active');
		aLi.mouseover(function() {
			aLi.removeClass('active').eq($(this).index()).addClass('active');
		});
	})();

	//tab1切换效果实现
	(function() {
		var $tab = $('#ul_tab');
		var aLi = $('#tab1 li');
		var $wraps = $('.wrap1');
		var index = 0;
		$wraps.eq(0).show();
		aLi.each(function() {
			$(this).click(function() {
				index = $(this).index();
				aLi.removeClass('active').eq(index).addClass('active');
				$wraps.hide().eq(index).show();

			})
		});
	})();

})