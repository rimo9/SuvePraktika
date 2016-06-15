//Here I define some data structures

function Tag (text,size,colour){

	this.text = text;
	this.size = size;
	this.colour = colour;

}

function Event (user,action,document,tag,time,uptake){

	this.user = user;
	this.action = action;
	this.document = document;
	this.tag = tag;
	this.time = time;
	this.uptake = uptake;


}

function Edger (source, target, action, artifact, context, weight){

	this.source = source;
	this.target = target;
	this.weight = weight;
	this.action = action;
	this.artifacts = [artifact];
	this.contexts = [context];

}




//This function takes the tag (displayed in the tag cloud)
//and prints its related artifacts in the corresponding box

function printArtifactsFromTag(tag) {

	var j = 0;





	for (i = 0; i < events.length; i++){


		//I check wether the tag selected corresponds to the tag of the event
		if (events[i].tag == tag && events[i].document.length>2){

			if(j==0){

				var row=document.getElementById('artifactsTagCloudTable').getElementsByTagName('tbody')[0].insertRow(-1);
				var cell1=row.insertCell(0);
				var cell2=row.insertCell(1);

				cell1.setAttribute('class',"ui-widget-header ui-corner-all");
				cell1.innerHTML=j+1;
				cell1.style.width = '20px';

				cell2.setAttribute('class',"ui-widget-header ui-corner-all");
				//I include here the value of the owner, so it will be very easy to paint it in red when clicking on a user
				cell2.setAttribute('data-owner',document2owner[events[i].document]);

				if(events[i].document.length>50){

					cell2.innerHTML= events[i].document.substring(0,48)+"...";

				}
				else{
					cell2.innerHTML=events[i].document;
				}

				cell2.onclick = function(i){
					return function(){
						documentOwnerMatch2(document2owner[events[i].document],events[i].document.substring(0,48));
					}
				}(i);


				j++;
			}

			//If it is not the first element I check if there is another one with the same label

			else{

				var exists = 0;

				for (var l=0;l<i;l++) {
					if(endsWith(events[i].document,events[l].document)&&endsWith(events[i].tag,events[l].tag)){
						exists = 1;
					}
				}


				//If it does not exist, then I include it

				if(exists > 0){
				}


				else{

					var row=document.getElementById('artifactsTagCloudTable').getElementsByTagName('tbody')[0].insertRow(-1);
					var cell1=row.insertCell(0);
					var cell2=row.insertCell(1);

					cell1.setAttribute('class',"ui-widget-header ui-corner-all");
					cell1.innerHTML=j+1;
					cell1.style.width = '20px';

					cell2.setAttribute('class',"ui-widget-header ui-corner-all");

					//I include here the value of the owner, so it will be very easy to paint it in red when clicking on a user
					cell2.setAttribute('data-owner',document2owner[events[i].document]);
					if(events[i].document.length>50){

						cell2.innerHTML=events[i].document.substring(0,48)+"...";


					}
					else{
						cell2.innerHTML= events[i].document;

					}

					cell2.onclick = function(i){
						return function(){
							documentOwnerMatch2(document2owner[events[i].document],events[i].document.substring(0,48));
						}
					}(i);


					j++;
				}




			}


		}
	}


	// Now I give a format to the header of the table




	if (j == 0) {
		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="There are no documents related to the tag <i>" + tag + "</i>";

	}
	else if (j == 1){
		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="There is 1 document related to the tag <i>" + tag + "</i>";

	}
	else{
		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="There are " + j + " documents related to the tag <i>" + tag + "</i>";
	}



}






function printUsersFromTag(tag) {

	var j = 0;


	var table = document.getElementById('eventsTagCloudTable');

	//I remove previous results

	var nr = table.rows.length;

	for (var t=1;t<nr;t++){

		table.deleteRow(1);

	}



	for (i = 0; i < events.length; i++){


		//I check wether the tag selected corresponds to the tag of the event
		if (events[i].tag == tag && events[i].user.length>1){



			if(j==0){

				var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
				var cell1=row.insertCell(0);
				var cell2=row.insertCell(1);

				cell1.setAttribute('class',"ui-widget-header ui-corner-all");
				cell1.innerHTML=j+1;
				cell1.style.width = '20px';

				cell2.setAttribute('class',"ui-widget-header ui-corner-all");
				//Here I define the width of the cell
				cell2.style.width = '370px';

				if(events[i].user.length>50){

					cell2.innerHTML=events[i].tag.substring(0,48)+"...";

				}
				else{
					cell2.innerHTML=events[i].user;
				}

				cell2.onclick = function(i){
					return function(){
						documentOwnerMatch(events[i].user);
					}
				}(i);

				j++;
			}

			//If it is not the first element I check if there is another one with the same label

			else{

				var exists = 0;
				var preUser = "";


				for (var l=1;l<j+1;l++) {

					//I get the user presented in the previous cells
					preUser = table.rows[l].cells[1].innerHTML;

					if(endsWith(events[i].user,preUser)&&endsWith(preUser,events[i].user)){
						exists = 1;
					}
				}


				//If it does not exist, then I include it

				if(exists > 0){
				}


				else{

					var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
					var cell1=row.insertCell(0);
					var cell2=row.insertCell(1);

					cell1.setAttribute('class',"ui-widget-header ui-corner-all");
					cell1.innerHTML=j+1;
					cell1.style.width = '20px';

					cell2.setAttribute('class',"ui-widget-header ui-corner-all");
					if(events[i].user.length>40){

						cell2.innerHTML=events[i].user.substring(0,38)+"...";

					}
					else{
						cell2.innerHTML=events[i].user;
					}

					cell2.onclick = function(i){
						return function(){
							documentOwnerMatch(events[i].user);
						}
					}(i);

					j++;
				}




			}


		}
	}







	// Now I give a format to the header of the table




	if (j == 0) {
		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="None used the tag <i>" + tag + "</i>";

	}
	else if (j == 1){
		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="1 user employed the tag <i>" + tag + "</i>";

	}
	else{
		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML=j + " users employed the tag <i>" + tag + "</i>";
	}



}



function documentOwnerMatch(user){

//This function gets a username and paints it in red in the "eventsTagCloudTable" table. It also paints in red all the documents that belong to this user in the "artifactsTagCloudTable" table.


var preUser = "";
var tableUser = document.getElementById('eventsTagCloudTable');
var tableArtifact = document.getElementById('artifactsTagCloudTable');
var j = tableUser.rows.length;
var k = tableArtifact.rows.length;

//I paint in red the name of the user and in white the rest ones

for (var l=1;l<j;l++) {

	//I get the user presented in the previous cells
	preUser = tableUser.rows[l].cells[1].innerHTML;

	if(endsWith(user,preUser)&&endsWith(preUser,user)){
			tableUser.rows[l].cells[0].style.color = "red";
			tableUser.rows[l].cells[1].style.color = "red";

	}

	else{
		tableUser.rows[l].cells[0].style.color = "white";
		tableUser.rows[l].cells[1].style.color = "white";
	}

}

//Now I paint in red the artifacts owned by the user and in white the rest ones

for (var l=1;l<k;l++) {

	//I get the user of the cell
	preUser = tableArtifact.rows[l].cells[1].getAttribute('data-owner');


	if(endsWith(user,preUser)&&endsWith(preUser,user)){
			tableArtifact.rows[l].cells[0].style.color = "red";
			tableArtifact.rows[l].cells[1].style.color = "red";

	}

	else{
		tableArtifact.rows[l].cells[0].style.color = "white";
		tableArtifact.rows[l].cells[1].style.color = "white";
	}





}



}



function documentOwnerMatch2(user,artifact){

//This function gets a username and paints it in red in the "eventsTagCloudTable" table. It also paints in red all the documents that belong to this user in the "artifactsTagCloudTable" table.


var preUser = "";
var preArtifact = "";
var tableUser = document.getElementById('eventsTagCloudTable');
var tableArtifact = document.getElementById('artifactsTagCloudTable');
var j = tableUser.rows.length;
var k = tableArtifact.rows.length;

//I paint in red the name of the user and in white the rest ones

for (var l=1;l<j;l++) {

	//I get the user presented in the previous cells
	preUser = tableUser.rows[l].cells[1].innerHTML;

	if(endsWith(user,preUser)&&endsWith(preUser,user)){
			tableUser.rows[l].cells[0].style.color = "red";
			tableUser.rows[l].cells[1].style.color = "red";

	}

	else{
		tableUser.rows[l].cells[0].style.color = "white";
		tableUser.rows[l].cells[1].style.color = "white";
	}

}

//Now I paint in red the artifact clicked

for (var l=1;l<k;l++) {

	//I get the user of the cell
	preArtifact = tableArtifact.rows[l].cells[1].innerHTML;


	if(startsWith(preArtifact,artifact)){
			tableArtifact.rows[l].cells[0].style.color = "red";
			tableArtifact.rows[l].cells[1].style.color = "red";

	}

	else{
		tableArtifact.rows[l].cells[0].style.color = "white";
		tableArtifact.rows[l].cells[1].style.color = "white";
	}





}



}



//Creates event descriptions







//Just for comparisons

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, prefix) {
	return str.indexOf(prefix) === 0;
}

//This function populates the Events table



//This is a function to display nice pop up windows
function displayMessage(message) {
	var $dialog= $('<div></div>')
	.html(message)
	.dialog({
		autoOpen: false,
		title: 'Uptake information',
		show: 'blind',
		hide: 'blind',
		draggable: false,
		resizable: false,
		minHeight: 60
	});
	$dialog.dialog('open');

}


//This function provides the text that is displayed in a pop-up window when clicking on the U of the event list

function CreateEventUptakeDescription (event){

	var docReused = false;
	var tagReused = false;
	var text ="";


	if(event.document != null && event.document.length > 1 && document2owner[event.document] != event.user){

		text += "The document " + event.document + " was introduced by " + capitalizeFirstLetter(document2owner[event.document]) + ".<br>";
	}

	if(event.tag != null && event.tag.length > 1 && document2owner[event.tag] != event.user){

		text += "The tag " + event.tag + " was introduced by " + capitalizeFirstLetter(tag2owner[event.tag]) + ".<br>";
	}

	return text;
}

//This is for the action filter

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}








//Here it goes the social network. The code is mainly taken and adapted from: http://bl.ocks.org/emeeks/df6ea0128724289337ef#firm.csv
function createNetwork() {


	var nodeHash = {};
	var nodes = [];
	var edges = [];
	var nweight;
	var edgesTmp = [];

	var action = $("#selectEventType").val();
	var minWeight = 0;

	if(isNaN($("#selectEventAmount").val())==false){
		minWeight=parseInt($("#selectEventAmount").val());
	}

	//I create a node for each of the users

	for(var i=0; i < users.length; i++){

		//If the source node is not registered yet, I add it
		if (!nodeHash[users[i]]) {
			nodeHash[users[i]] = {id: users[i], label: users[i], size: 5};
			nodes.push(nodeHash[users[i]]);
		}



	}


	edgelist.forEach(function (edge) {


		//Here I filter the edges depending on the action selected by the user

		if (edge.action == action || action == "") {

			//If the source node is not registered yet, I add it
			if (!nodeHash[edge.source]) {
				nodeHash[edge.source] = {id: edge.source, label: edge.source, size: 5};
				nodes.push(nodeHash[edge.source]);
			}
			//If the tarjet node is not registered yet, I add it

			if (!nodeHash[edge.target]) {
				nodeHash[edge.target] = {id: edge.target, label: edge.target, size: 5};
				nodes.push(nodeHash[edge.target]);
			}
			//Now I increase the size of the node

			//The weight is simply calculated as the amount of documents and tags reused
			nweight = edge.artifacts.length + edge.contexts.length;


			for(var i = 0; i < nodes.length; i++) {
				if (nodes[i].id == edge.source) {
					//This is the source node, so I only increase its size a little bit
					nodes[i].size = nodes[i].size+nweight;
				}

				if (nodes[i].id == edge.target) {
					//This is the edge node, so I have to increase its size more
					nodes[i].size = nodes[i].size+3*nweight;
				}

			}

			//In order to avoid innecesary loops in the "updateNetwork" function I give the node size as a parameter of the target edge
			//I also include the edge weight, which defines the number of interactions between the two guys

//My initial idea was to consider the source of the node as the user that has influence on the target.
//However, it seems that it is better to consider that the source of the node is the one that gets the influence.
//This difference only has an impact on the direction of the arrows.
//I simply change source and target here...

			edges.push({source: nodeHash[edge.target], target: nodeHash[edge.source], targetSize: 5, weight: edge.weight});

		}
	});


	//Let's include in the edges the size of the target edge
	for(var j = 0; j < edges.length; j++) {


		for(var i = 0; i < nodes.length; i++) {

			//	alert(nodes[i].id + "  " + edges[j].target);

			if (nodes[i].id == edges[j].target.id) {
				//This is the source node, so I only increase its size a little bit
				edges[j].targetSize = nodes[i].size;
			}

		}

	}
	//Now lets filter the relationships depending on the amount of interactions. The vector edgesTMP is the one that collect the edges that are finally represented
	var weightAcm;

	for(var j = 0; j < edges.length; j++) {


		weightAcm=0;

		for(var i = 0; i < edges.length; i++){

			if((edges[i].source==edges[j].source && edges[i].target==edges[j].target)||(edges[i].source==edges[j].target && edges[i].target==edges[j].source)){

				weightAcm = weightAcm + edges[i].weight;



			}

		}


		if(minWeight > weightAcm){}
		else{
			edgesTmp.push(edges[j]);
		}



	}


	createForceNetwork(nodes, edgesTmp);
}



function createForceNetwork(nodes, edges) {


	//FIrst, I delete the existing network

d3.select("svg").selectAll("line").remove();
d3.select("svg").selectAll("g.node").remove();



					 var drag = d3.behavior.drag()
					     .origin(function(d) { return d; })
					     .on("dragstart", dragstarted)
					     .on("drag", dragged)
					     .on("dragend", dragended);
	//create a network from an edgelist

	var force = d3.layout.force().nodes(nodes).links(edges)
	.size([500,500])
	.charge(function (d) {return Math.min(-4000, d.weight * -2000)})
	.on("tick", updateNetwork);


	var svg = d3.select("svg");

	//this extra append should be include for stability reasons
	var child = svg.append ("g");

	svg.call(d3.behavior.zoom()
	.translate ([0, 0])
	.scale(0.5)
						 .scaleExtent([0.1, 10])
						 .on("zoom", function(){
							 child.attr("transform","translate(" + d3.event.translate[0] + "," +  d3.event.translate[1] + ") scale(" +  d3.event.scale + ")");
						 })
					 );

//	.attr("transform", "translate(-5,-5)")
//            .call(zoom);

child.selectAll("line")
	.data(edges)
	.enter()
	.append("line")
	.on("click", edgeClick)
	.on("dblclick", edgeDoubleClick)
	.on("mouseover", edgeOver)
	.on("mouseout", edgeOut)
	.style("stroke-width", "2px")
	.style("stroke", "#996666")
	.attr("marker-end", "url(#Triangle)");

	var nodeEnter = child.selectAll("g.node")
	.data(nodes)
	.enter()
	.append("g")
	.attr("class", "node")
	.on("click", nodeClick)
	.on("dblclick", nodeDoubleClick)
	.on("mouseover", nodeOver)
	.on("mouseout", nodeOut)
	.call(drag);

	nodeEnter.append("circle")
	.attr("r", function (d) {return d.size})
	.style("fill", "#CC9999")
	.style("stroke", "black")
	.style("stroke-width", "1px")

	nodeEnter.append("text")
	.style("text-anchor", "middle")
	.attr("y", 2)
	.style("stroke-width", "1px")
	.style("stroke-opacity", 0.75)
	.style("stroke", "white")
	.style("font-size", "15px")
	.text(function (d) {return d.id})
	.style("pointer-events", "none")

	nodeEnter.append("text")
	.style("text-anchor", "middle")
	.attr("y", 2)
	.style("font-size", "15px")
	.text(function (d) {return d.id})
	.style("pointer-events", "none")

	force.start();

	function nodeClick(d) {
		d.fixed = true;
		representFilesFromNode(d);
		representTagsFromNode(d);
	}

	function nodeDoubleClick(d) {
		d.fixed = false;
		deleteFilesSN();
		deleteTagsSN();
	}

	function edgeClick(d) {
		representFilesFromEdge(d);
		representTagsFromEdge(d);
	}

	function edgeDoubleClick(d) {
		d.fixed = false;
		deleteFilesSN();
		deleteTagsSN();
	}

	function nodeOver(d) {
		force.stop();
		highlightEgoNetwork(d);
	}

	function nodeOut() {
		force.start();
		d3.selectAll("g.node > circle")
		.style("fill", "#CC9999");

		d3.selectAll("line")
		.style("stroke", "#996666")
		.style("stroke-width", "1px");
	}

	function edgeOver(d) {
		force.stop();
		highlightEdgeNetwork(d);
	}

	function edgeOut() {
		force.start();
		d3.selectAll("g.node > circle")
		.style("fill", "#CC9999");

		d3.selectAll("line")
		.style("stroke", "#996666")
		.style("stroke-width", "1px");
	}

	function highlightEgoNetwork(d) {
		var egoIDs = [];
		var filteredEdges = edges.filter(function (p) {return p.source == d || p.target == d});

		filteredEdges
		.forEach(function (p) {
			if (p.source == d) {
				egoIDs.push(p.target.id)
			}
			else {
				egoIDs.push(p.source.id)
			}
		});

		d3.selectAll("line").filter(function (p) {return filteredEdges.indexOf(p) > -1})
		.style("stroke", "black")
		.style("stroke-width", "2px");

		d3.selectAll("circle").filter(function (p) {return egoIDs.indexOf(p.id) > -1})
		.style("fill", "#66CCCC");

		//I add this line in order to give some color to the node where the mouse is over
		d3.selectAll("circle").filter(function (p) {return p.id == d.id})
		.style("fill", "#FF4500");
	}

	//I add this function to visualize the "ego network" of the edges

	function highlightEdgeNetwork(d) {
		var egoIDs = [];
		var filteredEdges = edges.filter(function (p) {return (p.source == d.source && p.target == d.target) || (p.source == d.target && p.target == d.source)});

		filteredEdges
		.forEach(function (p) {

			egoIDs.push(p.target.id)
			egoIDs.push(p.source.id)

		});

		d3.selectAll("line").filter(function (p) {return filteredEdges.indexOf(p) > -1})
		.style("stroke", "black")
		.style("stroke-width", "2px");

		d3.selectAll("circle").filter(function (p) {return egoIDs.indexOf(p.id) > -1})
		.style("fill", "#66CCCC");
	}

	//This functions are needed for the drag

	function dragstarted(d) {
	  d3.event.sourceEvent.stopPropagation();
	  d3.select(this).classed("dragging", true);
	}

	function dragged(d) {
	  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
	}

	function dragended(d) {
	  d3.select(this).classed("dragging", false);
	}


	//This code is mainly taken and adapted from: http://bl.ocks.org/emeeks/57646d7afaf9c4fe9264

	function updateNetwork() {
		d3.select("svg").selectAll("line").each(function (d) {

			deltaX = d.target.x - d.source.x;
			deltaY = d.target.y - d.source.y;

			pythag = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

			//Note that the adjusted edges depend on the target edge size
			adjustedX =  d.target.x - d.targetSize*((deltaX) / pythag);
			adjustedY = d.target.y - d.targetSize*((deltaY) / pythag);

			d3.select(this)
			.attr("x1", d.source.x)
			.attr("y1", d.source.y)
			.attr("x2", adjustedX)
			.attr("y2", adjustedY);
		})

		d3.select("svg").selectAll("g.node")
		.attr("transform", function (d) {return "translate(" + d.x + "," + d.y + ")"});

		//			d3.select("svg").selectAll("g.node > circle")
		//			.attr("r", function (d) {return 5 * d.weight});





	}

	//This function represents the artifacts related to a node when the node is clicked
	function representFilesFromNode(d) {


		var j = 0;




		var table = document.getElementById('filesSNTable');

		//I remove previous results

		var nr = table.rows.length;

		for (var t=1;t<nr;t++){

			table.deleteRow(1);

		}



		for (i = 0; i < events.length; i++){


			//I check wether the tag selected corresponds to the tag of the event
			if (events[i].user == d.id && events[i].document.length>2){



				if(j==0){

					var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
					var cell1=row.insertCell(0);
					var cell2=row.insertCell(1);

					cell1.setAttribute('class',"ui-widget-header ui-corner-all");
					cell1.innerHTML=j+1;
					cell1.style.width = '20px';

					cell2.setAttribute('class',"ui-widget-header ui-corner-all");

					if(events[i].document.length>50){

						cell2.innerHTML=events[i].document.substring(0,48)+"...";

					}
					else{
						cell2.innerHTML=events[i].document;
					}


					j++;
				}

				//If it is not the first element I check if there is another one with the same label

				else{

					var exists = 0;
					var preDocument = "";


					for (var l=1;l<table.rows.length;l++) {
						preDocument = table.rows[l].cells[1].innerHTML;

						if(endsWith(preDocument,"...")){
							if(startsWith(events[i].document,preDocument.substring(0,48))){
								exists = 1;

							}
						}
						else{
							if(endsWith(events[i].document,preDocument)&&endsWith(preDocument,events[i].document)){
								exists = 1;

							}
						}
					}


					//If it does not exist, then I include it

					if(exists > 0){
					}


					else{

						var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
						var cell1=row.insertCell(0);
						var cell2=row.insertCell(1);

						cell1.setAttribute('class',"ui-widget-header ui-corner-all");
						cell1.innerHTML=j+1;
						cell1.style.width = '20px';

						cell2.setAttribute('class',"ui-widget-header ui-corner-all");
						if(events[i].document.length>40){

							cell2.innerHTML=events[i].document.substring(0,38)+"...";

						}
						else{
							cell2.innerHTML=events[i].document;
						}


						j++;
					}




				}


			}
		}

		// Now I give a format to the header of the table




		if (j == 0) {
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The user <i>" + d.id + "</i> did not managed any artifact";

		}
		else if (j == 1){
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The user <i>" + d.id + "</i> managed 1 artifact";

		}
		else{
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The user <i>" + d.id + "</i> managed " + j + " artifacts";
		}


	}

	//This function represents the tags related to a node when the node is clicked
	function representTagsFromNode(d) {



		var j = 0;




		var table = document.getElementById('tagsSNTable');

		//I remove previous results

		var nr = table.rows.length;

		for (var t=1;t<nr;t++){

			table.deleteRow(1);

		}



		for (i = 0; i < events.length; i++){


			//I check wether the tag selected corresponds to the tag of the event
			if (events[i].user == d.id && events[i].tag.length>1){



				if(j==0){

					var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
					var cell1=row.insertCell(0);
					var cell2=row.insertCell(1);

					cell1.setAttribute('class',"ui-widget-header ui-corner-all");
					cell1.innerHTML=j+1;
					cell1.style.width = '20px';

					cell2.setAttribute('class',"ui-widget-header ui-corner-all");
					//Here I define the width of the cell
					cell2.style.width = '270px';

					if(events[i].tag.length>40){

						cell2.innerHTML=events[i].tag.substring(0,38)+"...";

					}
					else{
						cell2.innerHTML=events[i].tag;
					}


					j++;
				}

				//If it is not the first element I check if there is another one with the same label

				else{

					var exists = 0;

					for (var l=1;l<table.rows.length;l++) {
						preDocument = table.rows[l].cells[1].innerHTML;

						if(endsWith(preDocument,"...")){
							if(startsWith(events[i].tag,preDocument.substring(0,48))){
								exists = 1;

							}
						}
						else{
							if(endsWith(events[i].tag,preDocument)&&endsWith(preDocument,events[i].tag)){
								exists = 1;

							}
						}
					}



					//If it does not exist, then I include it

					if(exists > 0){
					}


					else{

						var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
						var cell1=row.insertCell(0);
						var cell2=row.insertCell(1);

						cell1.setAttribute('class',"ui-widget-header ui-corner-all");
						cell1.innerHTML=j+1;
						cell1.style.width = '20px';

						cell2.setAttribute('class',"ui-widget-header ui-corner-all");
						if(events[i].tag.length>40){

							cell2.innerHTML=events[i].tag.substring(0,38)+"...";

						}
						else{
							cell2.innerHTML=events[i].tag;
						}


						j++;
					}

				}


			}
		}

		//Now I write the header

		if (j == 0) {
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The user <i>" + d.id + "</i> did not managed any tag";

		}
		else if (j == 1){
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The user <i>" + d.id + "</i> managed 1 tag";

		}
		else{
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The user <i>" + d.id + "</i> managed " + j + " tags";
		}


	}



	function representFilesFromEdge(d) {
		var table = document.getElementById('filesSNTable');

		//I remove previous results

		var nr = table.rows.length;

		for (var t=1;t<nr;t++){

			table.deleteRow(1);

		}

		//First I get all the files employed by the users

		var userSource = d.source.id;
		var userTarget = d.target.id;

		var sourceUserFiles = [];
		var targetUserFiles = [];
		var sharedFiles = [];

		for (i = 0; i < events.length; i++){

			if (events[i].user == userSource && events[i].document.length>1 && sourceUserFiles.indexOf(events[i].document) == -1){
				//If the event has he user source and a tag that is not included in the array, I include the tag in the array
				sourceUserFiles.push(events[i].document);

			}

			if (events[i].user == userTarget && events[i].document.length>1 && targetUserFiles.indexOf(events[i].document) == -1){
				//If the event has he user source and a tag that is not included in the array, I include the tag in the array
				targetUserFiles.push(events[i].document);
			}
		}

		//Now I check which tags are shared

		for(i = 0; i<sourceUserFiles.length; i++){
			if(targetUserFiles.indexOf(sourceUserFiles[i]) > -1){

				sharedFiles.push(sourceUserFiles[i]);
			}

		}

		//And now I represent the shared tags

		var j = 0;

		for (i = 0; i < sharedFiles.length; i++){


			if(j==0){

				var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
				var cell1=row.insertCell(0);
				var cell2=row.insertCell(1);

				cell1.setAttribute('class',"ui-widget-header ui-corner-all");
				cell1.innerHTML=j+1;
				cell1.style.width = '20px';

				cell2.setAttribute('class',"ui-widget-header ui-corner-all");
				//Here I define the width of the cell
				cell2.style.width = '270px';

				if(sharedFiles[i].length>40){

					cell2.innerHTML=sharedFiles[i].substring(0,38)+"...";

				}
				else{
					cell2.innerHTML=sharedFiles[i];
				}


				j++;
			}

			//If it is not the first element I check if there is another one with the same label

			else{



				var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
				var cell1=row.insertCell(0);
				var cell2=row.insertCell(1);

				cell1.setAttribute('class',"ui-widget-header ui-corner-all");
				cell1.innerHTML=j+1;
				cell1.style.width = '20px';

				cell2.setAttribute('class',"ui-widget-header ui-corner-all");
				if(sharedFiles[i].length>40){

					cell2.innerHTML=sharedFiles[i].substring(0,38)+"...";

				}
				else{
					cell2.innerHTML=sharedFiles[i];
				}


				j++;


			}



		}

		//Now I write the header



		if (j == 0) {
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The users <i>" + userSource + "</i> and <i>" + userTarget + " did not shared any file";

		}
		else if (j == 1){
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The users <i>" + userSource + "</i> and <i>" + userTarget + " shared 1 file";

		}
		else{
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The users <i>" + userSource + "</i> and <i>" + userTarget + " shared " + j + " files";
		}

	}



	function representTagsFromEdge(d) {

		var table = document.getElementById('tagsSNTable');

		//I remove previous results

		var nr = table.rows.length;

		for (var t=1;t<nr;t++){

			table.deleteRow(1);

		}

		//First I get all the tags employed by the users

		var userSource = d.source.id;
		var userTarget = d.target.id;

		var sourceUserTags = [];
		var targetUserTags = [];
		var sharedTags = [];

		for (i = 0; i < events.length; i++){

			if (events[i].user == userSource && events[i].tag.length>1 && sourceUserTags.indexOf(events[i].tag) == -1){
				//If the event has he user source and a tag that is not included in the array, I include the tag in the array
				sourceUserTags.push(events[i].tag);

			}

			if (events[i].user == userTarget && events[i].tag.length>1 && targetUserTags.indexOf(events[i].tag) == -1){
				//If the event has he user source and a tag that is not included in the array, I include the tag in the array
				targetUserTags.push(events[i].tag);
			}
		}

		//Now I check which tags are shared

		for(i = 0; i<sourceUserTags.length; i++){
			if(targetUserTags.indexOf(sourceUserTags[i]) > -1){

				sharedTags.push(sourceUserTags[i]);
			}

		}

		//And now I represent the shared tags

		var j = 0;

		for (i = 0; i < sharedTags.length; i++){


			if(j==0){

				var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
				var cell1=row.insertCell(0);
				var cell2=row.insertCell(1);

				cell1.setAttribute('class',"ui-widget-header ui-corner-all");
				cell1.innerHTML=j+1;
				cell1.style.width = '20px';

				cell2.setAttribute('class',"ui-widget-header ui-corner-all");
				//Here I define the width of the cell
				cell2.style.width = '270px';

				if(sharedTags[i].length>40){

					cell2.innerHTML=sharedTags[i].substring(0,38)+"...";

				}
				else{
					cell2.innerHTML=sharedTags[i];
				}


				j++;
			}

			//If it is not the first element I check if there is another one with the same label

			else{



				var row=table.getElementsByTagName('tbody')[0].insertRow(-1);
				var cell1=row.insertCell(0);
				var cell2=row.insertCell(1);

				cell1.setAttribute('class',"ui-widget-header ui-corner-all");
				cell1.innerHTML=j+1;
				cell1.style.width = '20px';

				cell2.setAttribute('class',"ui-widget-header ui-corner-all");
				if(sharedTags[i].length>40){

					cell2.innerHTML=sharedTags[i].substring(0,38)+"...";

				}
				else{
					cell2.innerHTML=sharedTags[i];
				}


				j++;


			}



		}

		//Now I write the header



		if (j == 0) {
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The users <i>" + userSource + "</i> and <i>" + userTarget + " did not shared any tag";

		}
		else if (j == 1){
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The users <i>" + userSource + "</i> and <i>" + userTarget + " shared 1 tag";

		}
		else{
			table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="The users <i>" + userSource + "</i> and <i>" + userTarget + " shared " + j + " tags";
		}

	}

	function deleteFilesSN() {
		//To be done

		var table = document.getElementById('tagsSNTable');

		//I remove previous results

		var nr = table.rows.length;

		for (var t=1;t<nr;t++){

			table.deleteRow(1);

		}

		//and now the header

		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="Click on an element to see the files related";
	}

	function deleteTagsSN() {
		//To be done

		var table = document.getElementById('filesSNTable');

		//I remove previous results

		var nr = table.rows.length;

		for (var t=1;t<nr;t++){

			table.deleteRow(1);

		}

		//and now the header

		table.getElementsByTagName('thead')[0].rows[0].cells[0].innerHTML="Click on an element to see the tags related";
	}



	//It defines the markers for the social network. The code is taken from: http://bl.ocks.org/emeeks/57646d7afaf9c4fe9264

	var marker = d3.select("svg").append('defs')
	.append('marker')
	.attr("id", "Triangle")
	.attr("refX", 6)
	.attr("refY", 3)
	.attr("markerUnits", 'userSpaceOnUse')
	.attr("markerWidth", 60)
	.attr("markerHeight", 90)
	.attr("markerUnits","strokeWidth")
	.attr("orient", 'auto')
	.append('path')
	.style("fill", "black")
	.attr("d", 'M 0 0 6 3 0 6 1.5 3');

}
