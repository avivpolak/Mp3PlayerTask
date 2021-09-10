'use strict'

//OTHER FUNCTIONS: PLAY , TIME , SORTING  & SEARCHING FUNCTIONS


//PLAY FUNCTIONS:


function playSong(id) {//gets: SONG ID --> PLAYS SONG.
    if (songById(id) === undefined) {
      throw new Error('non-existent ID')
    }
    player.playSong(songById(id))
  }
  
  function playPlaylist(id) {//gets: PLAYLIST ID --> PLAYS ALL SONGS IN PLAYLIST.
    if (playListIndexById(id) === -1) {
      throw new Error('non-existent ID')
    }
    let playlist = playListById(id)
    for (let i = 0; i < playlist.songs.length; i++) {
      playSong(playlist.songs[i])
    }
  }
  
  
  
  //TIME
  
  
  
    //translatin of time units(mmss="mm:ss",s= seconds) 
  
  
  function sTOmmss(s) {//gets: SECONDS , returns: "MINUTES:SECONDS".
    const mm = Math.floor(s / 60)
    const ss = s % 60
    let mmss = ''
    if (mm > 9 && ss > 9) mmss = `${mm}:${ss}`
    if (mm > 9 && ss <= 9) mmss = `${mm}:0${ss}`
    if (mm <= 9 && ss > 9) mmss = `0${mm}:${ss}`
    if (mm <= 9 && ss <= 9) mmss = `0${mm}:0${ss}`
    return mmss
  }
  
  function mmssTOs(mmss) {//gets: "MINUTES:SECONDS" , returns: SECONDS.
    return parseInt(mmss.slice(0, 2)) * 60 + parseInt(mmss.slice(3, 5))
  }
  
  
  
  //SORTING:
  
  
  
  function comparepl(a, b) {//defining how .SORT function works- for alpha-betic sorting.-->FOR PLAYLIST
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase()
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  }
  
  function compares(a, b) {//defining how .SORT function works- for alpha-betic sorting.-->FOR SONGS
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase()
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  }
  
  
  
  //SEARCHING
  
  
      /*
      //gets: QUERY STRING ,
  
      returns: OBJECT THAT HAVE:
  
      ALPHA-BETIC SORTED ARRAYS OF MATCHING:
  
      SONGS (titles,albums,artists) &  PLAYLIST (names).
      */ 
  function searchByQuery(query) {
    let lowerCasedQuery = query.toLowerCase()
    let found = {}
    let playlists = []
    let songs = []
    for (let i = 0; i < player.playlists.length; i++) {//searching for matching playlists.
      if (player.playlists[i].name.toLowerCase().includes(lowerCasedQuery)) {
        playlists.push(player.playlists[i])
      }
    }
    for (let i = 0; i < player.songs.length; i++) {//searching for matching songs.
      const song = player.songs[i]
      if (
        song.title.toLowerCase().includes(lowerCasedQuery) ||
        song.album.toLowerCase().includes(lowerCasedQuery) ||
        song.artist.toLowerCase().includes(lowerCasedQuery)
      ) {
        songs.push(song)
      }
    }
    found.playlists = playlists.sort(comparepl)//adds sorted playlist array to returned object
    found.songs = songs.sort(compares)//adds sorted songs array to returned object
    return found
  }
  
  
  function searchByDuration(duration) {//gets: DURATION ("mm:ss"). returns: CLOSEST PLAYLIST/SONG TO IT.
    duration = mmssTOs(duration)
    let closestPlayList = player.playlists[0]
    let closestsong = player.songs[0]
    for (let i = 0; i < player.playlists.length; i++) {//searching for closest playlists.
      let a = playlistDuration(player.playlists[i].id)
      let b = playlistDuration(closestPlayList.id)
      if ((a - duration) ** 2 < (b - duration) ** 2) {//a and b named sorting clearing the equation- gettin the absulute destace.
        closestPlayList = player.playlists[i]
      }
    }
    for (let i = 0; i < player.songs.length; i++) {//searching for closest song.
      let a = player.songs[i].duration
      let b = closestsong.duration
      if ((a - duration) ** 2 < (b - duration) ** 2) {//the same for a and b here
        closestsong = player.songs[i]
      }
    }
    let a = closestsong.duration 
    let b = playlistDuration(closestPlayList.id)
    if ((a - duration) ** 2 < (b - duration) ** 2) return closestsong//the same for a and b here
    return closestPlayList
  }
  
  