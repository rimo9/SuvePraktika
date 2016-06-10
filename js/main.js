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
	this.availableTags = [];
	this.availableArtifacts = [];
	this.data = null;

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
	  this.bindEvents();
    },
	bindEvents: function(){
		document.querySelector('#tagFilter').addEventListener('keyup', this.tagFilterAutoComplete.bind(this));
		document.querySelector('#artifactFilter').addEventListener('keyup', this.artifactFilterAutoComplete.bind(this));
		document.querySelector('#FilterSubmit').addEventListener('click', this.FilterEvents.bind(this));
		document.querySelector('#EventTable').addEventListener('click', this.ShowDialog.bind(this));
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
		//console.log("creating table");
		//AJAX
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			//console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				//console.log(JSON.parse(xhttp.responseText));
				var data = JSON.parse(xhttp.responseText);				
				var table = document.getElementById('EventTable');
				table.innerHTML = '';
				var actors = [];
				var actions = [];
				var add = true;
				for(var i=0; i<data.length; i++){
					//console.log(data[i]);
					var row = table.insertRow(i);
					var col = row.insertCell(0);
					col.innerHTML = data[i].time;
					
					col = row.insertCell(1);
					for(var j=0; j<i; j++){
						if(data[i].context !== "" && data[j].context === data[i].context && data[j].user !== data[i].user){
							col.innerHTML = 'U';
							col.id = ('dialog'+i);
							var div = document.createElement("div");
							div.title = "Uptake information";
							div.id = "dialogBox"+i;
							div.innerHTML = "The tag "+data[i].context+" was introduced by "+data[j].user;
							div.style.display = "none";
							col.appendChild(div);
						} else if(data[i].document !== "" && data[i].context === "" && data[j].document === data[i].document && data[j].user !== data[i].user){
							col.innerHTML = 'U';
							col.id = ('dialog'+i);
							var div = document.createElement("div");
							div.title = "Uptake information";
							div.id = "dialogBox"+i;
							div.innerHTML = "The document "+data[i].document+" was introduced by "+data[j].user;
							div.style.display = "none";
							col.appendChild(div);
						}
					}
					col = row.insertCell(2);
					col.innerHTML = data[i].user;
					col = row.insertCell(3);
					col.innerHTML = data[i].action;
					col = row.insertCell(4);
					col.innerHTML = data[i].document;
					col = row.insertCell(5);
					col.innerHTML = data[i].context;
					table.appendChild(row);
					for(var j=0; j<actors.length+1; j++){
						if(actors[j] === data[i].user){add = false;}
					}
					if(add !== false){
						actors.push(data[i].user);
					}
					add = true;
					for(var j=0; j<actions.length+1; j++){
						if(actions[j] === data[i].action){add = false;}
					}
					if(add !== false){
						actions.push(data[i].action);
					}
					add = true;
					for(var j=0; j<App.instance.availableTags.length+1; j++){
						if(App.instance.availableTags[j] === data[i].context){add = false;}
					}
					if(add !== false && data[i].context !== ""){
						App.instance.availableTags.push(data[i].context);
					}
					add = true;
					for(var j=0; j<App.instance.availableArtifacts.length+1; j++){
						if(App.instance.availableArtifacts[j] === data[i].document){add = false;}
					}
					if(add !== false && data[i].document !== ""){
						App.instance.availableArtifacts.push(data[i].document);
					}
					add = true;
				}
				//console.log(App.instance.availableTags);
				//console.log(App.instance.availableArtifacts);
				var p = document.getElementById('EventCount');
				p.innerHTML = (table.rows.length+' events are shown');
				actors.sort();
				actors.reverse();
				actions.sort();
				actions.reverse();
				var select = document.getElementById('actorFilter');
				for(var i=0; i<actors.length; i++){
					var option = document.createElement('option');
					option.value = actors[i];
					option.text = actors[i];
					select.add(option, 1);
				}
				var select = document.getElementById('actionFilter');
				for(var i=0; i<actions.length; i++){
					var option = document.createElement('option');
					option.value = actions[i];
					option.text = actions[i];
					select.add(option, 1);
				}
			}
		};
		xhttp.open("GET", "php/GetInfo.php?table", true);
		xhttp.send();
	},
	FilterEvents: function(event){
		var actor = document.getElementById('actorFilter');
		var action = document.getElementById('actionFilter');
		var tag = document.getElementById('tagFilter');
		var artifact = document.getElementById('artifactFilter');
		var table = document.getElementById('EventTable');
		var rowCount = table.rows.length;
		var p = document.getElementById('EventCount');
		if(actor.value === "" && action.value === "" && tag.value === "" && artifact.value === ""){
			for(var i=0; i<table.rows.length; i++){
				table.rows[i].style.display = '';
				p.innerHTML = (table.rows.length+' events are shown');
			}
		}else{
			console.log(table.rows[0]);
			console.log(table.rows[0].cells[1]);
			console.log(table.rows[0].cells[1].innerHTML);
			for(var i=0; i<table.rows.length; i++){
				if((actor.value !== "" && actor.value === table.rows[i].cells[2].innerHTML) || (action.value !== "" && action.value === table.rows[i].cells[3].innerHTML) || (tag.value !== "" && tag.value === table.rows[i].cells[5].innerHTML) || (artifact.value !== "" && artifact.value === table.rows[i].cells[4].innerHTML)){
					table.rows[i].style.display = '';
				}else{
					table.rows[i].style.display = 'none';
					rowCount--;
				}
			}
			p.innerHTML = (rowCount+' events are shown');
		}
	},
	tagFilterAutoComplete: function(event){
		$("#tagFilter").autocomplete({
			source: this.availableTags
		});
	},
	artifactFilterAutoComplete: function(event){
		$("#artifactFilter").autocomplete({
			source: this.availableArtifacts
		});
	},
	ShowDialog: function(event){
		if(event.target.id.startsWith("dialog")){
			console.log(event.target.id);
			console.log(parseInt(event.target.id.substring(6)));
			$( "#dialogBox"+(parseInt(event.target.id.substring(6))) ).dialog();
		}
	},
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
