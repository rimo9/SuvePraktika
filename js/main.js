(function(){
  "use strict";

  var App = function(){
    // SINGLETON PATTERN
    if(App.instance){
      return App.instance;
    }
    App.instance = this;


    //All modifiers
    this.currentRoute = null;
	this.availableTags = [];
	this.availableArtifacts = [];
	this.TagCloudWords = null;
    this.address = '';
    this.pageCount = 0;
	this.clicked = true;

    //Start
    this.init();
  };

  window.App = App;



  //All functions come here
  App.prototype = {
    init: function(){
      console.log('Successfully started');
      //vaatan mis lehel olen

	  //this.createTable();
      //console.log(location.pathname.split('/')[3]);
      //console.log(location.pathname.split('/').length);
	this.address = '';
    for(var i=0; i<location.pathname.split('/').length-4; i++){
      this.address+='../';
    }
	//console.log(location.pathname.substring(location.pathname.lastIndexOf("/")+1));
	//console.log(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
	  if(location.pathname.split('/')[3] === 'eventtab'){
		  this.ActorFilters();
		  this.ActionFilters();
		  this.TagFilters();
		  this.ArtifactFilters();
	  }
	  if(location.pathname.split('/')[3] === 'contexttab'){
		this.createCloud();
	  }
	  if(location.pathname.split('/').length === 8){
		  setTimeout( function(){
			  App.instance.clicked = false;
			  App.instance.createTable()
		  } , 50);
	  }
	  if(location.pathname.split('/').length === 5){
		  this.tagCloudListener(location.pathname.split('/')[4]);
	  }
	  this.bindEvents();
    },
	bindEvents: function(){
		if(location.pathname.split('/')[3] === 'eventtab'){
			document.querySelector('#tagFilterv').addEventListener('keyup', this.tagFilterAutoComplete.bind(this));
			document.querySelector('#artifactFilter').addEventListener('keyup', this.artifactFilterAutoComplete.bind(this));
			document.querySelector('#FilterSubmit').addEventListener('click', function(){App.instance.clicked = true;});
			document.querySelector('#FilterSubmit').addEventListener('click', this.createTable.bind(this));
			document.querySelector('#EventTable').addEventListener('click', this.ShowDialog.bind(this));
		}
		if(location.pathname.split('/')[3] === 'contexttab'){
			document.querySelector('#TagsTagCloudContent').addEventListener('click', this.tagCloudContentListener.bind(this));
			document.querySelector('#EventsTagCloudContent').addEventListener('click', this.eventsCloudContentListener.bind(this));
		}
	},
	//eventtab functions start
	createTable: function(event){
    //console.log("making table");
		//console.log(document.getElementById('actorFilter').value !== location.pathname.split('/')[4] );
		var actor = '';
		var action = '';
		var tag = '';
		var artifact = '';
		if(this.clicked){
			actor = document.getElementById('actorFilter').value;
			action = document.getElementById('actionFilter').value;
			tag = document.getElementById('tagFilterv').value;
			artifact = document.getElementById('artifactFilter').value;
		}else{
			actor = location.pathname.split('/')[4];
			action = location.pathname.split('/')[5];
			tag = location.pathname.split('/')[6];
			if(location.pathname.split('/')[7] === 'any'){
				artifact = location.pathname.split('/')[7];
				artifact_push = 'any';
			}else{
				var num = location.pathname.split('/')[7];
				artifact = this.availableArtifacts[num];
			}
		}
		if(actor === ''){actor = 'any';}
		if(action === ''){action = 'any';}
		if(tag === ''){tag = 'any';}
		if(artifact === ''){artifact = 'any'; var artifact_push = 'any';}else{
			for(var i=0; i<this.availableArtifacts.length ;i++){
				if(this.availableArtifacts[i] === artifact){
					var artifact_push = i;
				}
			}
		}
		history.pushState('', "New Title", '/'+location.pathname.split('/')[1]+'/'+location.pathname.split('/')[2]+'/'+location.pathname.split('/')[3]+'/'+actor+'/'+action+'/'+tag+'/'+artifact_push);

		//AJAX
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			//console.log(xhttp.readyState);
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				//console.log(xhttp.responseText);
				var data = JSON.parse(xhttp.responseText);
				var table = document.getElementById('EventTable');
				table.innerHTML = '';
				var add = true;
				for(var i=0; i<data.length; i++){
					var row = table.insertRow(i);
					row.style.height = '25px';
					var col = row.insertCell(0);
					col.innerHTML = data[i].time.substring(0, 10);
					col = row.insertCell(1);
					col.style.width = '20px';
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
					col.style.width = '100px';
					col = row.insertCell(3);
					col.innerHTML = data[i].action;
					col.style.width = '50px';
					col = row.insertCell(4);
					col.innerHTML = data[i].document;
					col.style.width = '700px';
					col = row.insertCell(5);
					col.innerHTML = data[i].context;
					col.style.width = '250px';
					table.appendChild(row);
				}
				var p = document.getElementById('EventCount');
				p.innerHTML = (table.rows.length+' events are shown');
			}
		};
		//console.log(actor);
		//console.log(action);
		//console.log(tag);
		//console.log(artifact);
		xhttp.open("GET", "../../../../php/GetInfo.php?actor="+actor+"&action="+action+"&tag="+tag+"&artifact="+artifact, true);
		xhttp.send();
	},
	ActorFilters: function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var actors = JSON.parse(xhttp.responseText);
				actors.sort();
				actors.reverse();
				var select = document.getElementById('actorFilter');
				if(select.options.length === 1){
					for(var i=0; i<actors.length; i++){
						var option = document.createElement('option');
						option.value = actors[i];
						option.text = actors[i];
						select.add(option, 1);
					}
				}
			}
		};
		xhttp.open("GET", this.address+"php/GetInfo.php?ActorFilter", true);
		xhttp.send();
	},
	ActionFilters: function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var actions = JSON.parse(xhttp.responseText);
				actions.sort();
				actions.reverse();
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
		xhttp.open("GET", this.address+"php/GetInfo.php?ActionFilter", true);
		xhttp.send();
	},
	TagFilters: function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				App.instance.availableTags = JSON.parse(xhttp.responseText);
			}
		};
		xhttp.open("GET", this.address+"php/GetInfo.php?TagFilter", true);
		xhttp.send();
	},
	ArtifactFilters: function(){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
        //console.log(xhttp.responseText);
				App.instance.availableArtifacts = JSON.parse(xhttp.responseText);
			}
		};
		xhttp.open("GET", this.address+"php/GetInfo.php?ArtifactFilter", true);
		xhttp.send();
	},
	tagFilterAutoComplete: function(event){
		$("#tagFilterv").autocomplete({
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
		var aadress = '';
		if(location.pathname.split('/')[4] != null){aadress = '../'}
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				App.instance.TagCloudWords = JSON.parse(xhttp.responseText);
				var div = document.getElementById('wordcloud');
				for(var i=0; i<App.instance.TagCloudWords.length; i++){
					if(App.instance.TagCloudWords[i].context !== ''){
						var span = document.createElement('span');
						span.id = App.instance.TagCloudWords[i].context;
						span.setAttribute('data-weight', (App.instance.TagCloudWords[i].count*8));
						var a = document.createElement('a');
						a.setAttribute("data-word", App.instance.TagCloudWords[i].context);
						a.innerHTML = App.instance.TagCloudWords[i].context;
						span.appendChild(a);
						div.appendChild(span);
					}
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
		  xhttp.open("GET", aadress+"php/GetInfo.php?TagCloud", true);
		  xhttp.send();
	},
	tagCloudListener: function(word){
		//console.log(word);
		//console.log(location.pathname.split('/')[4]);
		history.pushState('', "New Title", '/'+location.pathname.split('/')[1]+'/'+location.pathname.split('/')[2]+'/'+location.pathname.split('/')[3]+'/'+word);
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				var wordInfo = JSON.parse(xhttp.responseText);

				var TagCloudContent = document.getElementById('TagsTagCloudContent');
				var NrOfTagDocuments = document.getElementById('TagCloudNrOfTagDocuments');
				TagCloudContent.innerHTML = '';
				var DocCount = 1;
				for(var i=0; i<wordInfo.length; i++){
					if(wordInfo[i].artifact !== ''){
						var tr = document.createElement('tr');
					tr.id = i;
					var th = document.createElement('th');
					th.style.width = "20px";
					th.innerHTML = DocCount;
					tr.appendChild(th);
					var th = document.createElement('th');
					th.style.width = "500px";
					th.innerHTML = wordInfo[i].artifact;
					th.id = wordInfo[i].actor;
					tr.appendChild(th);
					TagCloudContent.appendChild(tr);
					DocCount++;
					}
				}
				NrOfTagDocuments.innerHTML="There are "+(DocCount-1)+" documents related to the tag "+word;
				NrOfTagDocuments.style.width = "520px";
				var list = document.getElementById('EventsTagCloudContent');
				var NrOfEventDocuments = document.getElementById('TagCloudNrOfEventDocuments');
				list.innerHTML = '';
				var liOfUsers = [];
				var exists = false;
				for(var i=0; i<wordInfo.length; i++){
					//console.log(wordInfo[i].actor);
					for(var j=0; j<liOfUsers.length ; j++){
						if(wordInfo[i].actor === liOfUsers[j]){
							exists = true;
						}
					}
					if(!exists){liOfUsers.push(wordInfo[i].actor);}
					exists = false;
				}
				NrOfEventDocuments.innerHTML=liOfUsers.length+" users employed the tag "+word;
				NrOfEventDocuments.style.width = "220px";
				for(var i=0; i<liOfUsers.length; i++){
					var tr = document.createElement('tr');
					tr.id = i;
					var th = document.createElement('th');
					th.style.width = "20px";
					th.innerHTML = i+1;
					tr.appendChild(th);
					var th = document.createElement('th');
					th.style.width = "200px";
					th.innerHTML = liOfUsers[i];
					th.id = i;
					tr.appendChild(th);
					list.appendChild(tr);
				}
			}
		};
		xhttp.open("GET", "../php/GetInfo.php?TagCloudWord="+word, true);
		xhttp.send();
	},
	eventsCloudContentListener: function(event){
		if(event.target.id !== 'EventsTagCloudContentTagCloudContent' && event.target.id !== 'EventsTagCloudContent'){
			for(var i=0; i<event.target.parentNode.parentNode.rows.length; i++){
				if(event.target.id !== "" && event.target.parentNode.parentNode.rows[i].id === event.target.id){
					event.target.parentNode.parentNode.rows[i].cells[1].style.color = "red" ;
				}else{
					event.target.parentNode.parentNode.rows[i].cells[1].style.color = "black" ;
				}
			}
			var tags = document.getElementById('TagsTagCloudContent');
			for(var i=0; i<tags.rows.length; i++){
				if(tags.rows[i].cells[1].id === event.target.innerHTML){
					tags.rows[i].cells[1].style.color = "red";
				}else{
					tags.rows[i].cells[1].style.color = "black";
				}
			}
		}
	},
	tagCloudContentListener: function(event){
		if(event.target.id !== 'TagsTagCloudContent' && event.target.id !== 'TagsTagCloudContent'){
			for(var i=0; i<event.target.parentNode.parentNode.rows.length; i++){
				if(event.target.id !== "" && event.target.parentNode.parentNode.rows[i].cells[1].innerHTML === event.target.innerHTML){
					event.target.parentNode.parentNode.rows[i].cells[1].style.color = "red" ;
				}else{
					event.target.parentNode.parentNode.rows[i].cells[1].style.color = "black" ;
				}
			}
			var events = document.getElementById('EventsTagCloudContent');
			for(var i=0; i<events.rows.length; i++){
				if(events.rows[i].cells[1].innerHTML === event.target.id){
					events.rows[i].cells[1].style.color = "red";
				}else{
					events.rows[i].cells[1].style.color = "black";
				}
			}
		}
	}
	//contexttab functions end

  };

  window.onload = function(){
    var app = new App();
  };

})();
