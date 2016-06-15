 <?php require_once("header.php")?>
  <div>

	<!-- header end -->
	<main role="main">
	<!-- contexttab start -->
    <div id="contexttab" class="post" >
	<nav class="menu" id="menu">
		<ul class="menu-list">
			<li class="menu-item"><a href="eventtab.php" class="menu-link eventtab active-menu">Filter Events</a></li>
			<li class="menu-item"><a href="actortab.php" class="menu-link actortab">Social Network</a></li>
			<li class="menu-item"><a href="contexttab.php" class="menu-link contexttab">Tag Cloud</a></li>
		</ul>
	</nav>
		 <div id="wordcloud" class="wordcloud"></div>
			  
			<div id="artifactsTagCloud">
				<table id="TagsTagCloudTable">
					<thead>
						<tr>
							<th id="TagCloudNrOfTagDocuments">Click on a tag to see the events related</th>
						</tr>
					</thead>
					<tbody id="TagsTagCloudContent"></tbody>
				</table>
			</div>
			<br><br>
			  
			<div id="eventsTagCloud">
				<table id="eventsTagCloud">
					<thead>
						<tr>
							<th id="TagCloudNrOfEventDocuments">Click on a tag to see the events related</th>
						</tr>
					</thead>
					<tbody id="EventsTagCloudContent"></tbody>
				</table>
			</div>
			  
		 

    </div>
	<!-- contexttab end -->
    </div>
</main>
</body>

<?php require_once("footer.php")?>