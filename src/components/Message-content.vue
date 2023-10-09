<template>
  <div class="name">
    <h5>Dillon Jacques</h5>
    <hr>
    <div class="content">
      <div class="container">
        <img src="../assets/ProfilePic1.jpg" alt="Avatar">
        <p>Hello. How are you today?</p>
        <span class="time-right">11:00</span>
      </div>

      <div class="container darker">
        <img src="../assets/ProfilePic2.jpg" alt="Avatar" class="right">
        <p>Hey! I'm fine. Thanks for asking!</p>
        <span class="time-left">11:01</span>
      </div>

      <div class="container">
        <img src="../assets/ProfilePic1.jpg" alt="Avatar">
        <p>Sweet! So, what do you wanna do today?</p>
        <span class="time-right">11:02</span>
      </div>

      <div class="container darker">
        <img src="../assets/ProfilePic2.jpg" alt="Avatar" class="right">
        <p>Nah, I dunno. Play soccer.. or learn more coding perhaps?</p>
        <span class="time-left">11:05</span>
      </div>
    </div>
    <div class="createMessage">
        <input type="text" placeholder="Jot something down!">
    </div>
  </div>
  
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  div.name {
    margin: 0;
    padding: 0;
    width: 75%;
    height: 78%;
    position: absolute;
    right: 7%;
  }
  .name h5 {
    margin: 2%;
    text-align: left;
    font-weight: bold;
  }
  .name hr { 
    margin-left: 2%;
    
  }
  div.content {
    margin-left: 0%;
    padding: 1px 16px;
    height: 100%;
  }
  /* Chat containers */
  .container {
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
    text-align: left;
  }

  /* Darker chat container */
  .darker {
    border-color: #ccc;
    background-color: #ddd;
    text-align: right;
  }

  /* Clear floats */
  .container::after {
    content: "";
    clear: both;
    display: table;
  }

  /* Style images */
  .container img {
    float: left;
    max-width: 60px;
    width: 100%;
    margin-right: 20px;
    border-radius: 50%;
  }

  /* Style the right image */
  .container img.right {
    float: right;
    margin-left: 20px;
    margin-right:0;
  }

  /* Style time text */
  .time-right {
    float: right;
    color: #aaa;
  }

  /* Style time text */
  .time-left {
    float: left;
    color: #999;
  }
  .createMessage {
    margin-left: 1%;
    padding: 1px 16px;
    border: 2px solid #dedede;
    background-color: white;
    border-radius: 5px;
  }
</style>
