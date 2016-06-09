(function(){
  "use strict";

  var App = function(){
    // SINGLETON PATTERN
    if(App.instance){
      return App.instance;
    }
    App.instance = this;

    this.routes = App.routes;
    //console.log(this);

    //All modifiers
    this.currentRoute = null;
    this.interval = null;

    //Start
    this.init();
  };

  //All pages
  App.routes = {
    "eventtab" : {
		render: function(){
			console.log('Under eventtab');
			App.instance.createTable();
		}
    },
    "actortab" : {
		render: function(){
			console.log('Under actortab');
		}
    },
    "contexttab" : {
		render: function(){
			console.log('Under contexttab');
		}
    }
  };

  //All functions come here
  App.prototype = {
    init: function(){
      console.log('Successfully started');
	  window.addEventListener('hashchange', this.routeChange.bind(this));
      //vaatan mis lehel olen
      //console.log(window.location.hash);
      if(!window.location.hash){
        window.location.hash = "eventtab";
      }else{
        //hash oli olemas
        this.routeChange();
      }
    },
	routeChange: function(event){
      this.currentRoute = window.location.hash.slice(1);
      if(this.routes[this.currentRoute]){
        this.updateMenu();
        //console.log('>>> '+this.currentRoute);
        this.routes[this.currentRoute].render();
      }else{
        //404 not found
        console.log('404');
        window.location.hash = 'home-view';
      }
    },
	updateMenu: function(){
      //if active-menu then remove
      document.querySelector('.active-menu').className=document.querySelector('.active-menu').className.replace(' active-menu', '');
      //add active-menu to selected
      document.querySelector('.'+this.currentRoute).className+=' active-menu';
    },
	//eventtab functions start
	createTable: function(){
		console.log("creating table");
		//AJAX
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			//console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				//console.log(JSON.parse(xhttp.responseText));
				var data = JSON.parse(xhttp.responseText);
				var table = document.getElementById('EventTable');
				for(var i=0; i<data.length; i++){
					var row = table.insertRow(i);
					var col = row.insertCell(0);
					col.innerHTML = data[i].time;
					col = row.insertCell(1);
					col.innerHTML = data[i].uptake;
					col = row.insertCell(2);
					col.innerHTML = data[i].user;
					col = row.insertCell(3);
					col.innerHTML = data[i].action;
					col = row.insertCell(4);
					col.innerHTML = data[i].document;
					col = row.insertCell(5);
					col.innerHTML = data[i].context;
					table.appendChild(row);
				}
				var p = document.getElementById('EventCount');
				p.innerHTML = (data.length+' events are shown');
			}
		};
		xhttp.open("GET", "php/GetInfo.php?table", true);
		xhttp.send();
		
		
	}
	//eventtab functions end
	//actortab functions start
	
	//actortab functions end
	//contexttab functions start
	
	//contexttab functions end
	
  };

  window.onload = function(){
    var app = new App();
  };

})();
