(function( $ ) {
  $(function() {
    //I create the tabs and delete the value of the filters
    $("#graph-tabs").tabs();
    //tagFilterv.value = "";
    selectEventAmount.value = 1;
    var uptake = "";

    //I get the events from the csv, add them into an array of events.
    //I also create an array of actions, of users and of contexts where each element is unique



    d3.json("php/GetInfo.php/?table", function(data) {
      // build the list of events
      data.forEach( function (d) {

        //uptake says whether this is an uptake event or not
        uptake = false;
        //I consider that an event is an uptake event when either the tag or the document related to the event is "owned" by other user
        if (d.context.length > 1 && tag2owner[d.context]!= null && tag2owner[d.context] != d.user){

          uptake = true;

          //If it is an uptake event, I add the relationship to the array for the network

          var found = false;
            for(var i = 0; i < edgelist.length; i++) {
              if (edgelist[i].source == d.user && edgelist[i].target == tag2owner[d.context] && edgelist[i].action == d.action) {
                //There is a previous relationship between these two guys, so I simply add the  corresponding artifact to the relationship if this artifact did not exist
                edgelist[i].weight = edgelist[i].weight++;
                if(edgelist[i].contexts.indexOf(d.context)==-1){
                edgelist[i].contexts.push(d.context);
              }
                found = true;
                break;
              }
            }

            if(found == false){
              edgelist.push(new Edger(d.user,tag2owner[d.context],d.action,"",d.context,"1"));
            }

        }

        if (d.document.length > 1 && document2owner[d.document]!= null && document2owner[d.document] != d.user){

          uptake = true;

          //If it is an uptake event, I add the relationship to the array for the network

          var found = false;
            for(var i = 0; i < edgelist.length; i++) {
              if (edgelist[i].source == d.user && edgelist[i].target == document2owner[d.document]) {
                //There is a previous relationship between these two guys, so I add the corresponding artifact to the relationship if this artifact did not exist
                edgelist[i].weight = edgelist[i].weight++;
                if(edgelist[i].artifacts.indexOf(d.document)==-1){
                edgelist[i].artifacts.push(d.document);
              }
                found = true;
                break;
              }
            }

            if(found == false){
              //There is not a previous reslationship between these two guys, so I simply create it
              edgelist.push(new Edger(d.user,document2owner[d.document],d.action,d.document,"","1"));
            }



        }

        //Here I populate the ownership of tags and documents. Note that the events should be read before the ones that happened before

        if(tag2owner[d.context]== null){
          tag2owner[d.context] = d.user;

        }

        if(document2owner[d.document]== null){
          document2owner[d.document] = d.user;

        }

        events.push(new Event(d.user,d.action,d.document,d.context,d.time,uptake));

        //Here I populate the action, user and tag vectors for the searches
        if (actions.indexOf(d.action) < 0){
          actions.push(d.action);
        }

        if (users.indexOf(d.user) < 0){
          users.push(d.user);
        }

        if (tagsAutocomplete.indexOf(d.context) < 0){

          //this is just for the auto-complete
          tagsAutocomplete.push(d.context);
        }

        if (artifactsAutocomplete.indexOf(d.document) < 0){

          //this is just for the auto-complete
          artifactsAutocomplete.push(d.document);
        }


      });

 


            //Now I populate the filters

            tags.sort();
            users.sort();
            actions.sort();

            $( "#tagFilterv" ).autocomplete({
              source: tagsAutocomplete
            });
            $( "#artifactFilterv" ).autocomplete({
              source: artifactsAutocomplete
            });
		
			  var actionSelect2 = document.getElementById('selectEventType');
		
            for(var i = 0; i < actions.length; i++) {
              if(actions[i].length > 1){
              var act = actions[i];
              var el = document.createElement("option");

              el.textContent = "Users who " + act + " artifacts uptaking the tags or documents";
              el.value = act;
              actionSelect2.appendChild(el);

            }
            }
       

createNetwork();
    });


 



    });
    })(jQuery);
