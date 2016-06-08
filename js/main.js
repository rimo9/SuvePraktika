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
      //add active-menu
      document.querySelector('.'+this.currentRoute).className+=' active-menu';
    },
	createTable: function(){
		console.log("creating table");
		
	}
	
  };

  window.onload = function(){
    var app = new App();
  };

})();
