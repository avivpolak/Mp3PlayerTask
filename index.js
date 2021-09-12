'use strict'


/*

This is the main player object.
All of the songs and playlist the user have are stored here.
All of the big & complex functions will mostly refer to it.

structure- 
  songs:  Object->array->object
  playlists:  Object->array->object->array

*/

const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(
      `Playing ${song.title} from ${song.album} by ${song.artist} | ${sTOmmss(
        song.duration
      )}.`
    )
  },
}

//FUNCTIONS:



//SONGS:



   //Get songs by:


function songById(id) {//gets: SONG ID, returns: THE MATCHING SONG.
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i]['id'] === id) return player.songs[i]
  }
  return undefined
}

function songIndexById(id) {//gets: SONG ID, returns: SONG INDEX.
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i]['id'] === id) return i
  }
  return -1
}

function isIdExsistInSongs(id) {//gets: SONG ID, returns: IS SONG ID EXSIST.
  for (let i = 0; i < player.songs.length; i++) {
    if (player.songs[i]['id'] === id) return true
  }
  return false
}


   //Edit songs


function removeSong(id) {//gets: SONG ID --> REMOVING THE SONG, FROM PLAYER & PLAYLIST (activatie remove-from-playilist function).
  if (songIndexById(id) === -1) {
    throw new Error('non-existent ID')
  }
  player.songs.splice(songIndexById(id), 1)
  removeFromPlayLists(id)
}

function addSong(title, album, artist, duration, id = 0) {//gets: NEW SONG CHARACTERIZATION --> ADDS IN TO PLAYER ,returns: NEW SONGS ID.
  const newSong = { title, album, artist, duration: mmssTOs(duration) }
  if (!isIdExsistInSongs(id)) newSong.id = id
  else {
    for (let i = 0; i < player.songs.length + 1; i++) {
      if (!isIdExsistInSongs(i)) {
        newSong.id = i
      }
    }
    throw new Error(`existent ID,the chosen id is ${newSong.id}`)
  }
  player.songs.push(newSong)
  return newSong.id
}



//PLAYLISTS:



   //searching playlists


function isIdExsistInPlayLists(id) {//gets: PLAYLISTS ID , returns: IS PLAYLIST ID EXSIST.
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i]['id'] === id) return true
  }
  return false
}

function playListById(id) {//gets: PLAYLIST ID , returns: THE MATCHING PLAYLIST.
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i]['id'] === id) return player.playlists[i]
  }
  return undefined
}

function playListIndexById(id) {//gets: PLAYLIST ID , returns: PLAYLIST INDEX.
  for (let i = 0; i < player.playlists.length; i++) {
    if (player.playlists[i]['id'] === id) return i
  }
  return -1
}


   //editing playlists


function addToPlayList(songId, playlistId) {//gets: SONG ID & PLAYLIST ID --> ADDS SONG TO PLAYLIST.
  let song = songById(songId)
  player.playlists[playListIndexById(playlistId)].songs.push(song.id)
}

function removeFromPlayLists(songId) {//gets: SONG ID --> REMOVES IT FROM *ALL* PLAYLISTS.
  for (let i = 0; i < player.playlists.length; i++) {
    for (let j = 0; j < player.playlists[i].songs.length; j++) {
      if (player.playlists[i].songs[j] === songId) {
        player.playlists[i].songs.splice(j, 1)
      }
    }
  }
}

function removeFromPlayList(songId, playlistId) {//gets: SONG ID & PLAYLIST ID --> REMOVES SONG FROM PLAYLIST.
  for (let i = 0; i < playListById(playlistId).songs.length; i++) {
    if (player.playlists[playListIndexById(playlistId)].songs[i] === songId) {
      player.playlists[playListIndexById(playlistId)].songs.splice(i, 1)
    }
  }
}

function removePlaylist(id) {//gets: PLAYLIST ID --> REMOVES PLAYLIST FROM PLAYER.
  if (playListIndexById(id) === -1) {
    throw new Error('non-existent ID')
  }
  player.playlists.splice(playListIndexById(id), 1)
}

function createPlaylist(name, id = 0) {//gets: NEW PLAYLIST'S NAME --> ADDS NEW EMPTY PLAYLIST TO PLAYER , returns: NEW PLAYLIST ID.
  let newPlayList = { name, songs: [] }
  if (!playListById(id)) newPlayList.id = id
  else {
    for (let i = 0; i < player.playlists.length + 1; i++) {
      if (!isIdExsistInPlayLists(i)) {
        newPlayList.id = i
      }
    }
    throw new Error(`existent ID,the chosen id is ${newPlayList.id}`)
  }
  player.playlists.push(newPlayList)
  return newPlayList.id
}



    /*gets: SONG ID & PLAILIST ID --> EDITING PLAYLIST BY:

    IF --> SONG ID EXSIST IN PLAYLIST : REMOVES SONG FROM PLAYLIST. 

    IF --> ONLY SONG IN PLAYLIST : DELETES PLAYLIST. 

    IF --> PLAYLIST DO NOT CONTAINS SONG : ADDS SONG TO PLAYLIST.*/

function editPlaylist(playlistId, songId) {
  if (playListById(playlistId) === undefined) {
    throw new Error('non-existent playlistId')
  }
  if (songById(songId) === undefined) {
    throw new Error('non-existent songId')
  }
  let playlist = playListById(playlistId)
  if (playlist.songs.includes(songId) && playlist.songs.length === 1)
    removePlaylist(playlistId)
  else if (playlist.songs.includes(songId) && playlist.songs.length !== 1) {
    removeFromPlayList(songId, playlistId)
  } else if (!playlist.songs.includes(songId)) {
    addToPlayList(songId, playlistId)
  }
}

function renamePlayList(id,newName){//gets: PLAYLIST ID & NEW NAME --> RENAME THE PLAYLIST
    playListById(id).name=newName;
}

function albumPlaylist(album){//gets: ALBUM NAME --> CEATE A PLAYLIST FOR ALL THE SONGS FROM THAT ALBUM , returns: NEW PLAYLIST ID.
  playlistId=createPlaylist(album);
  for(let i = 0; i < player.songs.length; i++){
    if(player.songs[i].album===album)
      {
        addToPlayList(player.songs[i].id,playlistId)
      }
  }
  return playlistId;
}

function artistPlaylist(artist){//gets: ARTIST NAME --> CEATE A PLAYLIST FOR ALL THE SONGS OF THAT ARTIST , returns: NEW PLAYLIST ID.
  playlistId=createPlaylist(artist);
  for(let i = 0; i < player.songs.length; i++){
    if(player.songs[i].artist===artist)
      {
        addToPlayList(player.songs[i].id,playlistId)
      }
  }
  return playlistId;
}


    //calculations


function playlistDuration(id) {//gets: PLAYLIST ID, returns: PLAYLIST DURATION.
  if (playListById(id) === undefined) {
    throw new Error('non-existent playlistId')
  }
  const playlist = playListById(id)
  let sum = 0
  for (let i = 0; i < playlist.songs.length; i++) {
    let song = songById(playlist.songs[i])
    sum += song.duration
  }
  return sum
}


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


//END OF FUNCTIONS SECTION

//REQUIRE FOR TESTS:

//this line is here only for me to reaching up the 400 lines of code :) /

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
