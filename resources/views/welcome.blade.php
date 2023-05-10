<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music Player | Clab</title>
  <link rel="stylesheet" href="../reproductor_tiendas/style.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css"
    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>

<body>
  <div class="wrapper">
    <div class="top-bar">
      <i class="material-icons">expand_more</i>
      <span>Now Playing</span><br><br><br>
      <div id="div_loadig" style="display:none"class="spinner-border text-primary m-1" role="status">
        <span class="sr-only">Loading...</span>
      </div>

     

      <i class="material-icons">more_horiz</i>
    </div>
    <div class="img-area">
      <img src="" alt="">
    </div>
    <div class="song-details">
      <p class="name"></p>
      <p class="artist"></p>
    </div>
    <div class="progress-area">
      <div class="progress-bar">
        <audio id="main-audio" src=""></audio>
      </div>
      <div class="song-timer">
        <span class="current-time">0:00</span>
        <span class="max-duration">0:00</span>
      </div>
    </div>
    <div class="controls">
      <i id="repeat-plist" class="material-icons" title="Playlist looped">repeat</i>
 
      <div class="play-pause">
        <i class="material-icons play">play_arrow</i>
      </div>
   
      <i id="more-music" class="material-icons">queue_music</i>
    </div>
    <div class="music-list">
      <div class="header">
        <div class="row">
          <i class="list material-icons">queue_music</i>
          <span>Music list</span>
        </div>
        <i id="close" class="material-icons">close</i>
      </div>
      <ul>
        <!-- here li list are coming from js -->

      </ul>
    </div>
  </div>
  <script src="../reproductor_tiendas/js/music-list.js"></script>
  <script src="../reproductor_tiendas/js/script.js"></script>
</body>

</html>  