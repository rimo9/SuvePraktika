 <?php require_once("header.php")?>
  <div>

	<!-- header end -->
	<main role="main">
	<!-- contexttab start -->
    
	<nav class="menu" id="menu">
		<ul class="menu-list">
			<li class="menu-item"><a href="<?=$basepath?>eventtab" class="menu-link eventtab active-menu">Filter Events</a></li>
			<li class="menu-item"><a href="<?=$basepath?>actortab" class="menu-link actortab">Social Network</a></li>
			<li class="menu-item"><a href="<?=$basepath?>contexttab" class="menu-link contexttab">Tag Cloud</a></li>
		</ul>
	</nav>
	<div id="contexttab" class="post" >
		 <div id="wordcloud" class="wordcloud"></div>
			  
			<div id="artifactsTagCloud">
				<table id="TagsTagCloudTable">
					<thead class="tableHeader">
						<tr>
							<th id="TagCloudNrOfTagDocuments">Click on a tag to see the events related</th>
						</tr>
					</thead>
					<tbody id="TagsTagCloudContent" class="tablecontent"></tbody>
				</table>
			</div>
			<br><br>
			  
			<div id="eventsTagCloud" >
				<table id="eventsTagCloud">
					<thead class="tableHeader">
						<tr>
							<th id="TagCloudNrOfEventDocuments">Click on a tag to see the events related</th>
						</tr>
					</thead>
					<tbody id="EventsTagCloudContent" class="tablecontent"></tbody>
				</table>
			</div>
			  
		 

    </div>
	<!-- contexttab end -->
    </div>
</main>
</body>

<?php require_once("footer.php")?>