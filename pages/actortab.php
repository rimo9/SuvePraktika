<?php require_once ("header.php")?>

	<main role="main">
<!-- actortab start -->
    
	<nav class="menu" id="menu">
		<ul class="menu-list">
			<li class="menu-item"><a href="<?=$basepath?>eventtab" class="menu-link eventtab active-menu">Filter Events</a></li>
			<li class="menu-item"><a href="<?=$basepath?>actortab" class="menu-link actortab">Social Network</a></li>
			<li class="menu-item"><a href="<?=$basepath?>contexttab" class="menu-link contexttab">Tag Cloud</a></li>
		</ul>
	</nav>
	<div id="actortab" class="posti">
	 <div id="viz">
            <svg>
            </svg>
          </div>
	
        <form id="snSelectionForm">
            <select width="220"  style="width: 320px;" id="selectEventType">
              <option value="">Represent all types of uptake events</option>
            </select>
            <br><br>
			<label for="selectEventAmount">Number of uptakes events needed to represent a link:</label><br>
			<input id="selectEventAmount" value="1">
            <br><br>
			<button type="button" name="Submit" value="Filter" onclick="createNetwork()" id="SNbutton">Represent new network</button>
      </form>
		<br>
         

		<div class="ui-widget">
				<div id="tagsSN">
				  <table id="tagsSNTable">
					<thead class="fixedHeader">
					  <tr>
						<th>Click on an element to see the tags related</th>
					  </tr>
					</thead>
					<tbody class="scrollContent">
					</tbody>
				  </table>
				</div>
				<br>

				<div id="filesSN">
				  <table id="filesSNTable">
					<thead class="fixedHeader">
					  <tr>
						<th>Click on an element to see the files related</th>
					  </tr>
					</thead>
					<tbody class="scrollContent">
					</tbody>
				  </table>
				</div>
		</div>
		
	</div>
	<!-- actortab end -->

  	</main>
<?php require_once ("footer.php")?>