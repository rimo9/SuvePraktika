<?php require_once("header.php")?>

	<main role="main">
	<!-- eventtab start -->
    <div id="eventtab" class="posti" >
		<nav class="menu" id="menu">
			<ul class="menu-list">
				<li class="menu-item"><a href="eventtab.php" class="menu-link eventtab active-menu">Filter Events</a></li>
				<li class="menu-item"><a href="actortab.php" class="menu-link actortab">Social Network</a></li>
				<li class="menu-item"><a href="contexttab.php" class="menu-link contexttab">Tag Cloud</a></li>
			</ul>
		</nav>
			<div style="color:#000000">
				<form id="eventFiltering" >
					<select id="actorFilter">
						<option value="">Choose an actor to filter events</option>
					</select>
					<br><br>
					<select id="actionFilter">
						<option value="">Choose an action to filter events</option>
					</select>
					<br><br>
					<label for="tagFilter">Choose a tag to filter events:</label><br>
					<input id="tagFilterv"><br><br>
					<label for="artifactFilter">Choose an artifact to filter events:</label><br>
					<input type="text" id="artifactFilter"><br>
					<button type="button" id="FilterSubmit">Filter events</button>
				</form>
			</div>
		<center>
		<div id="DataTable">
		<p id="EventCount" align="center"></p>
		<table id="EventTable" style="width:100% height:100%"></table>
		</div></center>
	  
		
		
    </div>
	  </main>
<?php require_once("footer.php")?>