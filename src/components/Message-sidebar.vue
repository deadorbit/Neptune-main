<template>
    <div class="sidebar">
      <h5>Direct Messages</h5>
      <hr>
      <a class="active">Dillon Jacques</a>
      <a>Joshua Hammond</a>
      <a>Tre Cobb</a>
      <a>Kalup Cook</a>
    </div>
    <!-- <div class="content">
      <h2>Responsive Sidebar Example</h2>
      <p>This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
      <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
      <h3>Resize the browser window to see the effect.</h3>
    </div> -->
</template>

<style>
  .sidebar {
  margin: 0;
  padding: 0;
  width: 15%;
  background-color: #5673a9;
  position: fixed;
  float: left;
  height: 100%;
  overflow: auto;
}

.sidebar h5 {
  margin: 10%;
  font-weight: bold;
  color: white;
}

.sidebar a {
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;
}
 
.sidebar a.active {
  background-color: #9ca956;
  color: white;
}

.sidebar a:hover:not(.active) {
  background-color: #a9569c;
  color: white;
}
/* div.content {
  margin-left: 200px;
  padding: 1px 16px;
  height: 1000px;
} */

@media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  /* div.content {margin-left: 0;} */
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
}
</style>