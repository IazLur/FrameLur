/*
	FRAMELUR-JS

	FrameLur est un framework développé par Dragon Edouard alias IazLur et Aze Off.
	Copyright (c) 2017, tous droits réservés.
*/
version = 0.3;
function testRes(res)
{
	return window.matchMedia("(max-width:" + (res + "px") + ")").matches;
}
function doClass(type, elem)
{
	while(type)
	{
		if($(elem).attr(type))
		{
			var liste = $(elem).attr(type).split(" ");
			var auto = ($(elem).attr("auto") || "").split(" ");
			$(elem).removeAttr("class");
			for(var i in auto)
			{
				$(elem).addClass(auto[i].replace(".", ""));
			}
			for(var i in liste)
			{
				$(elem).addClass(liste[i].replace(".", ""));
			}
			type = false;
			break;
		}
		else
		{
			switch(type)
			{
				case"lg":
					type = "md";
				break;
				case"md":
					type = "sm";
				break;
				case"sm":
					type = "xs";
				break;
				case"xs":
					type = false;
				break;
			}
			if(!type)
			{
				var auto = ($(elem).attr("auto") || "").split(" ");
				$(elem).removeAttr("class");
				for(var i in auto)
				{
					$(elem).addClass(auto[i].replace(".", ""));
				}
			}
		}
	}
}

var configs = $("meta[title='framelur']");
var theme = configs.attr("theme") + ".fl";
$("head").append("<title>" + configs.attr("page") + "</title><meta charset='" + configs.attr("charset") + "' />"
	+'<link rel="stylesheet" type="text/css" href="framelur.'+ version +'.css" />');
if(configs.attr("bootstrap"))
{
	$("head").append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/' + configs.attr("bootstrap") + '/css/bootstrap.min.css" />');
}

$(document).ready(function(){
	$.ajax({url:theme}).done(function(data){
		var nombre = nombre2 = nombre3 = 0;
		var doElements = "[doframelur]";
		var tab = RegExp("\\t", "g");
		var texte = data;
		texte = texte.replace(tab, "")
			.replace(/\n/ig, "")
			.replace(/\/\*.*?\*\//g, "")
			.replace(/\ \ +/g, "")
			.replace(/\ \./g, ".");
		var liste = texte.split(";");
		nombre2 += liste.length;
		nombre3++;
		console.log(texte);
		for(var i in liste)
		{
			var cmd = liste[i].split(".");
			$(cmd[0]).each(function(){
				cmd.splice(0, 1);
				for(var i2 in cmd)
				{
					var attr = cmd[i2].split(":")[0];
					var values = cmd[i2].split(":")[1].replace(/"/g, "").split(" ");
					for(var i3 in values)
					{
						$(this).attr(attr, ($(this).attr(attr) || "") + " " + values[i3]);
					}
				}
			});
			$("[next='" + cmd[0] + "']").each(function(){
				cmd.splice(0, 1);
				for(var i2 in cmd)
				{
					var attr = cmd[i2].split(":")[0];
					var values = cmd[i2].split(":")[1].replace(/"/g, "").split(" ");
					for(var i3 in values)
					{
						$(this).children().each(function(){
							if($(this).attr("isnot") == undefined)
							{
								$(this).attr(attr, ($(this).attr(attr) || "") + " " + values[i3]);
							}
						});
					}
				}
			});
		}
		console.log("[FRAMELUR] : " + nombre3 + " espace(s) trouvé(s)");
		console.log("[FRAMELUR] : " + nombre2 + " sous-espace(s) trouvé(s)");

		$("[lg], [md], [sm], [xs], [auto]").each(function(){
			$(this).attr("doframelur", "true");
			nombre++;
		});
		console.log("[FRAMELUR] : " + nombre + " objet(s) trouvé(s)");

		$(window).resize(function(){
			if(testRes(575))
			{
				$(doElements).each(function(){
					doClass("xs", this);
				});
			}
			else if(testRes(767))
			{
				$(doElements).each(function(){
					doClass("sm", this);
				});
			}
			else if(testRes(991))
			{
				$(doElements).each(function(){
					doClass("md", this);
				});
			}
			else
			{
				$(doElements).each(function(){
					doClass("lg", this);
				});
			}
		}).resize();

		$("[anim]").each(function(){
			$(this).mouseenter(function(){
				$(this).addClass($(this).attr("anim").replace(/\ /g, ""));
			}).mouseleave(function(){
				$(this).removeClass($(this).attr("anim").replace(/\ /g, ""));
			});
		});
		$("html").css("visibility", "visible");
	});
});
