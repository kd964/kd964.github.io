$(function(){
	//监听游戏规则
	$(".rules").on("click",function(){
		$(".rule").stop().fadeIn(100);
	});
	//监听游戏规则的关闭按钮
	$(".close").on("click",function(){
		$(".rule").stop().fadeOut(100);
	});
	//监听开始按钮，按开始按钮之后 按钮消失 游戏开始
	$(".start").on("click",function(){
		$(this).stop().fadeOut(100);
		//进度条开始动
		progressHandler();
		//调用灰太狼动画的方法
		startGreyWolfanimation();
	});
	//监听重新开始游戏按钮
	$(".restart").on("click",function(){
		$(".mask").stop().fadeOut(100);
		//分数变为0 
		$(".score").text("0");
		//调用进度条的方法
		progressHandler();
		startGreyWolfanimation();
	});
	
	//定义一个专门处理进度条的方法
	function progressHandler(){
		$(".progress").css({
			width:180
		});
		var $timee=setInterval(function(){
			var $jindutiao=$(".progress").width();
			$jindutiao-=3;
			$(".progress").css("width",$jindutiao);
			if($jindutiao<=0){
				//关闭定时器
				clearInterval($timee);
				//重新开始界面加载入
				$(".mask").stop().fadeIn(100);
				stopGreyWolfanimation();
			}
		},1000)
	}
	var wolftime;//定义全局变量   定时器
	//专门定义一个灰太狼动画的方法
	function startGreyWolfanimation(){
		//定义灰太狼和小灰灰的动画图片
		var wolf1=['https://s3.ax1x.com/2020/12/25/rfAuh8.png','https://s3.ax1x.com/2020/12/25/rfAntf.png','https://s3.ax1x.com/2020/12/25/rfA1Xj.png',
		'https://s3.ax1x.com/2020/12/25/rfA8ns.png','https://s3.ax1x.com/2020/12/25/rfAQ1g.png',
		'https://s3.ax1x.com/2020/12/25/rfAM9S.png','https://s3.ax1x.com/2020/12/25/rfAlcQ.png',
		'https://s3.ax1x.com/2020/12/25/rfAtA0.png','https://s3.ax1x.com/2020/12/25/rfAJ7q.png',
		'https://s3.ax1x.com/2020/12/25/rfEpbn.png'];
		var wolf2=['https://s3.ax1x.com/2020/12/24/r2qwrj.png','https://s3.ax1x.com/2020/12/24/r2qHJK.png',
		'tp/x2.pnghttps://s3.ax1x.com/2020/12/24/r2qbRO.png','https://s3.ax1x.com/2020/12/24/r2qOQe.png','https://s3.ax1x.com/2020/12/24/r2q6iV.png',
		'https://s3.ax1x.com/2020/12/24/r2qWM4.png','https://s3.ax1x.com/2020/12/24/r2q2zF.png',
		'https://s3.ax1x.com/2020/12/24/r2qgRU.png','https://s3.ax1x.com/2020/12/24/r2qcGT.png','https://s3.ax1x.com/2020/12/24/r2qfsJ.png'];
		//定义灰太狼和小灰灰可能出现的位置
		var place=[
			{left:"100px",top:"115px"},
			{left:"20px",top:"160px"},
			{left:"190px",top:"142px"},
			{left:"105px",top:"193px"},
			{left:"19px",top:"221px"},
			{left:"202px",top:"212px"},
			{left:"120px",top:"275px"},
			{left:"30px",top:"295px"},
			{left:"209px",top:"297px"},
		];
		//创建一个图片
		var $wolfImage=$("<img src='' class='wolfimage'>");
		//获取随机位置
		var posindex=Math.round(Math.random()*8);//round是四舍五入  随机数random是0-1之间
		//设置图片出现的位置
		$wolfImage.css({
			position:"absolute",
			top:place[posindex].top,
			left:place[posindex].left
		});
		//获取图片是灰太狼还是小灰灰
		var ifhui=Math.round(Math.random())==0?wolf1:wolf2;
		//设置图片的内容
		window.wolfindex=0;//全局变量
		window.wolfindexend=5;
		wolftime=setInterval(function(){
			$wolfImage.attr("src",ifhui[wolfindex]);
			wolfindex++;
			if(wolfindex>wolfindexend){
				$wolfImage.remove();
				clearInterval(wolftime);
				startGreyWolfanimation();
			}
		},140)
		$(".container").append($wolfImage);
		gamerules($wolfImage);
	}
	function stopGreyWolfanimation(){
		$(".wolfimage").remove();
		clearInterval(wolftime);
	}
	function gamerules($wolfImage){
		$wolfImage.one("click",function(){
			window.wolfindex=5;
			window.wolfindexend=9;
			var $textimg=$(this).attr("src");
			var flag=$textimg.indexOf("25")>0;
			if(flag){
				$(".score").text(Number($(".score").text())+10);
			}else{
				$(".score").text(Number($(".score").text())-10);
			}
		})
	}
});