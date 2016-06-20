<?php require_once("header.php")?>

	<main role="main">
	<!-- eventtab start -->
    
		<nav class="menu" id="menu">
			<ul class="menu-list">
				<li class="menu-item"><a href="<?=$basepath?>eventtab" class="menu-link eventtab active-menu">Filter Events</a></li>
				<li class="menu-item"><a href="<?=$basepath?>actortab" class="menu-link actortab">Social Network</a></li>
				<li class="menu-item"><a href="<?=$basepath?>contexttab" class="menu-link contexttab">Tag Cloud</a></li>
			</ul>
		</nav>
	<div id="eventtab" class="posti" >
			<div style="color:#000000">
				<form method="get" id="eventFiltering">
					<select id="actorFilter" name="actor">
						<option value="">Choose an actor to filter events</option>
					</select>
					<br><br>
					<select id="actionFilter" name="action">
						<option value="">Choose an action to filter events</option>
					</select>
					<br><br>
					<label for="tagFilter">Choose a tag to filter events:</label><br>
					<input id="tagFilterv" name="tag"><br><br>
					<label for="artifactFilter">Choose an artifact to filter events:</label><br>
					<input type="text" id="artifactFilter" name="artifact"><br><br>
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