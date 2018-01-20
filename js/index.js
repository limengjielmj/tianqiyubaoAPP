/*
* @Author: LMJ
* @Date:   2018-01-19 11:18:32
* @Last Modified by:   LMJ
* @Last Modified time: 2018-01-20 15:35:25
*/
var weather;
var city;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
	}
})
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city=obj.data;
		console.log(obj);
	}
})
//渲染数据//
function updata(){
	//获取当前城市//
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
	// 获取当前温度//
	var temperature=document.getElementsByClassName("wendu")[0];
	temperature.innerHTML=weather.current_temperature+"°";
	// 获取当前天气状况//
	var condition=document.getElementsByClassName("tianqi")[0];
	condition.innerHTML=weather.current_condition;
	// 最高温//
	var dat_high_temperature=document.getElementById("dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;
	//最低温//
	var dat_low_temperature=document.getElementById("dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature;
	//今日天气状况//
	var day_condition=document.getElementById("day_condition");
	day_condition.innerHTML=weather.day_condition;
	//今天icon//
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`
	//明天icon//
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`
	//明天最高温度//
	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
	//明天最低温//
	var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
	//今日天气状况//
	var tomorrow_condition=document.getElementById("tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;
for(var i in weather.hourly_forecast){
	var now=document.createElement("div");
	now.className="now";
	var nowp=document.getElementById("now");
	nowp.appendChild(now);
// 时间轴//
	var now_time=document.createElement("h2");
	now_time.className="now_time";
	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
	now.appendChild(now_time);
// 天气照片//
	var now_icon=document.createElement("div");
	now_icon.className="now_icon";
	now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
	now.appendChild(now_icon);
//温度//
	var now_temperature=document.createElement("h3");
	now_temperature.className="now_temperature";
	now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
	now.appendChild(now_temperature);

    }
for(var i in weather.forecast_list){
    	// 创建父元素div
    	var recent=document.createElement("div");
    	// 给父元素div加样式
    	recent.className="recent";
    	// 获取now的父元素
    	var recentp=document.getElementById("recent");
    	// 把now插入到父元素中
    	recentp.appendChild(recent);


    	// 日期//
    	var recent_date=document.createElement("div");
    	recent_date.className="recent_time";
    	// console.log(weather.forecast_list);
    	recent_date.innerHTML=weather.forecast_list[i].date.substring(5,7)+"/"+(weather.forecast_list[i].date.substring(8));
    	recent.appendChild(recent_date);
    	// console.log(weather)
    	// for(var j in weather.forecast_list){
    	// 	console.log(weather.forecast_list[i].date.substring(5,7));
    	// 	console.log(weather.forecast_list[i].date.substring(8));
    	// }


    	var recent_wea=document.createElement("h2");
    	recent_wea.className="tianqi";
    	recent_wea.innerHTML=weather.forecast_list[i].condition;
    	recent.appendChild(recent_wea);

    	var recent_pic=document.createElement("div");
    	recent_pic.className="recent_pic";
    	recent_pic.style=`background-image:url(img/${weather.forecast_list[i].weather_icon_id}.png);`
    	recent.appendChild(recent_pic);

    	var recent_high=document.createElement("h3");
    	recent_high.className="gaowen";
    	recent_high.innerHTML=weather.forecast_list[i].high_temperature;
    	recent.appendChild(recent_high);

    	var recent_low=document.createElement("h4");
    	recent_low.className="diwen";
    	recent_low.innerHTML=weather.forecast_list[i].low_temperature;
    	recent.appendChild(recent_low);

    	var recent_wind=document.createElement("h5");
    	recent_wind.className="fengli";
    	recent_wind.innerHTML=weather.forecast_list[i].wind_direction;
    	recent.appendChild(recent_wind);

    	var recent_level=document.createElement("h6");
    	recent_level.className="fengji";
    	recent_level.innerHTML=weather.forecast_list[i].wind_level;
    	recent.appendChild(recent_level);
    }

        var header=document.getElementsByClassName("header")[0];
        var city_box=document.getElementsByClassName("city-box")[0];
        // console.log(headar,city_box)
        header.onclick=function(){
        	$(".text").val("");
        	$(".button").html("取消");
	        city_box.style="display:block";
       }
    for(var k in city){
    	console.log(k);

    	var cityp=document.getElementById("city");

    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
    	cityp.appendChild(title);

    	var con=document.createElement("div");
    	con.className="con";
    	for(var y in city[k]){
    		// console.log(y);
    		var erji=document.createElement("div");
    		erji.className="son";
    		erji.innerHTML=y;
    		con.appendChild(erji);
    	}
    	cityp.appendChild(con);
    }
}



function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		weather=obj.data.weather;
		updata();
		$(".city-box").css({"display":"none"});
		// console.log(weather);
	    }
    })
}
//当页面加载完成执行的代码//
window.onload=function(){
	updata();


	$(".son").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);
	})


	$(".text").on("focus",function(){
		$(".button").html("确认");
	})

	var button=document.getElementsByClassName("button")[0];
	console.log(button);

	button.onclick=function(){
		// console.log(1);
		var btn=this.innerHTML;
		if(btn=="取消"){
			// console.log(1);
			var city_box1=document.getElementsByClassName("city-box")[0];
			city_box1.style="display:none";
		}
		else{
			var str=document.getElementsByClassName("text")[0].value;
			console.log(str);
			for(var i in city){
				if(i==str){
					AJAX(str);
					return;
				}
				else{
					for(var j in city[i]){
						if(str==j){
							AJAX(str);
							return;
						}
					}
				}
				
			}
			alert("没有该城市气象信息");
		}
	}
}