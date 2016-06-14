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
	
	this.words =  [];

    //Start
    this.init();
  };
  
  window.App = App;

  //All pages
  App.routes = {
    "eventtab" : {
		render: function(){
			console.log('Under eventtab');
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
	  this.createTable();
	  this.createCloud();
	  this.bindEvents();
    },
	bindEvents: function(){
		document.querySelector('#tagFilter').addEventListener('keyup', this.tagFilterAutoComplete.bind(this));
		document.querySelector('#artifactFilter').addEventListener('keyup', this.artifactFilterAutoComplete.bind(this));
		document.querySelector('#FilterSubmit').addEventListener('click', this.FilterEvents.bind(this));
		document.querySelector('#EventTable').addEventListener('click', this.ShowDialog.bind(this));
		document.querySelector('#TagsTagCloudContent').addEventListener('click', this.tagCloudContentListener.bind(this));
		document.querySelector('#EventsTagCloudContent').addEventListener('click', this.eventsCloudContentListener.bind(this));
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
				App.instance.data = JSON.parse(xhttp.responseText);
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
					col.innerHTML = data[i].time.substring(0, 10);
					
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
							col.style.cursor= "pointer";
							col.appendChild(div);
						} else if(data[i].document !== "" && data[i].context === "" && data[j].document === data[i].document && data[j].user !== data[i].user){
							col.innerHTML = 'U';
							col.id = ('dialog'+i);
							var div = document.createElement("div");
							div.title = "Uptake information";
							div.id = "dialogBox"+i;
							div.innerHTML = "The document "+data[i].document+" was introduced by "+data[j].user;
							div.style.display = "none";
							col.style.cursor= "pointer";
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
				if(select.options.length === 1){
					for(var i=0; i<actors.length; i++){
						var option = document.createElement('option');
						option.value = actors[i];
						option.text = actors[i];
						select.add(option, 1);
					}
				}
				var select = document.getElementById('actionFilter');
				if(select.options.length === 1){
					for(var i=0; i<actions.length; i++){
						var option = document.createElement('option');
						option.value = actions[i];
						option.text = actions[i];
						select.add(option, 1);
					}
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
			//console.log(table.rows[0]);
			//console.log(table.rows[0].cells[1]);
			//console.log(table.rows[0].cells[1].innerHTML);
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
			//console.log(event.target.id);
			//console.log(parseInt(event.target.id.substring(6)));
			$( "#dialogBox"+(parseInt(event.target.id.substring(6))) ).dialog();
		}
	},
	//eventtab functions end
	//actortab functions start
	
	//actortab functions end
	//contexttab functions start
	createCloud: function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			var words = [];
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var data = JSON.parse(xhttp.responseText);
				for(var i=0; i<data.length; i++){
					if(data[i].context !== ''){
						
						var new_word = new Word(data[i].context);
						
						var exist = false;
						
						//console.log(App.instance.words.length);
						
						exist = checkIfExists(new_word);
						
						if(!exist){
							App.instance.words.push(new_word);
						}
						
					}
				}
				var div = document.getElementById('wordcloud');
				//console.log(App.instance.words[10].word);
				for(var i=0; i<App.instance.words.length; i++){
					var span = document.createElement('span');
					span.id = App.instance.words[i].word;
					span.setAttribute('data-weight', App.instance.words[i].weight);
					var a = document.createElement('a');
					a.setAttribute("data-word", App.instance.words[i].word);
					a.innerHTML = App.instance.words[i].word;
					span.appendChild(a);
					div.appendChild(span);
					
				}
				
				$("#wordcloud").awesomeCloud({
					"size" : {
						"grid" : 9,
						"factor" : 1
					},
					"options" : {
						"color" : "random-dark",
						"rotationRatio" : 0.35
					},
					"font" : "'Times New Roman', Times, serif",
					"shape" : "circle"
				});
			}
		};
		  xhttp.open("GET", "php/GetInfo.php?table", true);
		  xhttp.send();
	},
	tagCloudListener: function(word){
		var weight = 0;
		for(var i=0; i<this.words.length; i++){
			if(word === this.words[i].word){
				weight = this.words[i].weight;
			}
		}
		var NrOfTagDocuments = document.getElementById('TagCloudNrOfTagDocuments');
		var list = document.getElementById('TagsTagCloudContent');
		list.innerHTML = '';
		//console.log(list);
		var count = 1;
		for(var i=0; i<this.data.length; i++){
			if(this.data[i].context === word && this.data[i].document !== ''){
				var tr = document.createElement('tr');
				tr.id = i;
				var th = document.createElement('th');
				th.innerHTML = count;
				tr.appendChild(th);
				var th = document.createElement('th');
				th.innerHTML = this.data[i].document;
				th.id = this.data[i].user;
				tr.appendChild(th);
				list.appendChild(tr);
				count++;
			}
		}
		NrOfTagDocuments.innerHTML="There are "+(count-1)+" documents related to the tag "+word;
		
		var NrOfEventDocuments = document.getElementById('TagCloudNrOfEventDocuments');
		var list = document.getElementById('EventsTagCloudContent');
		list.innerHTML = '';
		var liOfUsers = [];
		var abi = [];
		for(var i=0; i<this.data.length; i++){
			if(this.data[i].context === word){
				liOfUsers.push(this.data[i].user);
			}
		}
		var isPresent = false;
		for(var i=0; i<liOfUsers.length; i++){
			for(var j=0; j<liOfUsers.length; j++){
				if(liOfUsers[i] === abi[j]){isPresent = true;}
			}
			if(!isPresent){
				abi.push(liOfUsers[i]);
			}
			isPresent = false;
		}
		NrOfEventDocuments.innerHTML=abi.length+" users employed the tag "+word;
		for(var i=0; i<abi.length; i++){
			var tr = document.createElement('tr');
			tr.id = i;
			var th = document.createElement('th');
			th.innerHTML = i+1;
			tr.appendChild(th);
			var th = document.createElement('th');
			th.innerHTML = abi[i];
			th.id = i;
			tr.appendChild(th);
			list.appendChild(tr);
		}
	},
	eventsCloudContentListener: function(event){
		for(var i=0; i<event.target.parentNode.parentNode.rows.length; i++){
			if(event.target.id !== "" && event.target.parentNode.parentNode.rows[i].id === event.target.id){
				event.target.parentNode.parentNode.rows[i].cells[1].style.color = "red" ;
			}else{
				event.target.parentNode.parentNode.rows[i].cells[1].style.color = "white" ;
			}
		}
		var tags = document.getElementById('TagsTagCloudContent');
		for(var i=0; i<tags.rows.length; i++){
			if(tags.rows[i].cells[1].id === event.target.innerHTML){
				tags.rows[i].cells[1].style.color = "red";
			}else{
				tags.rows[i].cells[1].style.color = "white";
			}
		}
	},
	tagCloudContentListener: function(event){
		for(var i=0; i<event.target.parentNode.parentNode.rows.length; i++){
			if(event.target.id !== "" && event.target.parentNode.parentNode.rows[i].cells[1].innerHTML === event.target.innerHTML){
				event.target.parentNode.parentNode.rows[i].cells[1].style.color = "red" ;
			}else{
				event.target.parentNode.parentNode.rows[i].cells[1].style.color = "white" ;
			}
		}
		var events = document.getElementById('EventsTagCloudContent');
		for(var i=0; i<events.rows.length; i++){
			if(events.rows[i].cells[1].innerHTML === event.target.id){
				events.rows[i].cells[1].style.color = "red";
			}else{
				events.rows[i].cells[1].style.color = "white";
			}
		}
	}
	//contexttab functions end
	
  };
  
  var Word = function(word){
	  this.word = word;
	  this.weight = 10;
  };
  
  
 function checkIfExists(new_word){
		  for (var i = 0; i < App.instance.words.length; i++) {
			if (App.instance.words[i].word == new_word.word) {
				
				App.instance.words[i].weight+=10;

				return true;
			}
		}

		return false;
}

  window.onload = function(){
    var app = new App();
  };

})();
