'use strict'
import { playSong, playPlaylist,sTOmmss,mmssTOs,comparepl,compares,searchByQuery,searchByDuration } from './functions/otherFunctions';
import { songById,songIndexById,isIdExsistInSongs,removeSong,addSong} from './functions/songsFunctions';


//PLAYLISTS FUNCTIONS: GETING , EDITING & CALCULATIONS FOR PLAYLISTS.


   //get playlists


   export function isIdExsistInPlayLists(id) {
     //Parameters: PLAYLISTS ID
     //Returns: IS PLAYLIST ID EXSIST.

    for (let i = 0; i < player.playlists.length; i++) {
      if (player.playlists[i]['id'] === id) return true
    }
    return false
  }
  
  export function playListById(id) {
    //Parameters: PLAYLIST ID 
    //Returns: THE MATCHING PLAYLIST.

    for (let i = 0; i < player.playlists.length; i++) {
      if (player.playlists[i]['id'] === id) return player.playlists[i]
    }
    return undefined
  }
  
  export function playListIndexById(id) {
    //Parameters: PLAYLIST ID 
    //Returns: PLAYLIST INDEX.

    for (let i = 0; i < player.playlists.length; i++) {
      if (player.playlists[i]['id'] === id) return i
    }
    return -1
  }
  
  
     //editing playlists
  
  
  export function addToPlayList(songId, playlistId) {
    //Parameters: SONG ID & PLAYLIST ID 
    //--> ADDS SONG TO PLAYLIST.

    let song = songById(songId)
    player.playlists[playListIndexById(playlistId)].songs.push(song.id)
  }
  
  export function removeFromPlayLists(songId) {
    //Parameters: SONG ID 
    //--> REMOVES IT FROM *ALL* PLAYLISTS.

    for (let i = 0; i < player.playlists.length; i++) {
      for (let j = 0; j < player.playlists[i].songs.length; j++) {
        if (player.playlists[i].songs[j] === songId) {
          player.playlists[i].songs.splice(j, 1)
        }
      }
    }
  }
  
  export function removeFromPlayList(songId, playlistId) {
    //Parameters: SONG ID & PLAYLIST ID 
    //--> REMOVES SONG FROM PLAYLIST.

    for (let i = 0; i < playListById(playlistId).songs.length; i++) {
      if (player.playlists[playListIndexById(playlistId)].songs[i] === songId) {
        player.playlists[playListIndexById(playlistId)].songs.splice(i, 1)
      }
    }
  }
  
  export function removePlaylist(id) {
    //Parameters: PLAYLIST ID 
    //--> REMOVES PLAYLIST FROM PLAYER.

    if (playListIndexById(id) === -1) {
      throw new Error('non-existent ID')
    }
    player.playlists.splice(playListIndexById(id), 1)
  }
  
  export function createPlaylist(name, id = 0) {
    //Parameters: NEW PLAYLIST'S NAME 
    //--> ADDS NEW EMPTY PLAYLIST TO PLAYER 
    //Returns: NEW PLAYLIST ID.

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
  
  
  
      /*
      
      Parameters: SONG ID & PLAILIST ID --> EDITING PLAYLIST BY:
  
      IF --> SONG ID EXSIST IN PLAYLIST : REMOVES SONG FROM PLAYLIST. 
  
      IF --> ONLY SONG IN PLAYLIST : DELETES PLAYLIST. 
  
      IF --> PLAYLIST DO NOT CONTAINS SONG : ADDS SONG TO PLAYLIST.
      
      */
  
  export function editPlaylist(playlistId, songId) {
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


export function renamePlayList(id,newName){
  //gets: PLAYLIST ID & NEW NAME
  //--> RENAME THE PLAYLIST

    playListById(id).name=newName;
}

export function albumPlaylist(album){
  //gets: ALBUM NAME 
  //--> CEATE A PLAYLIST FOR ALL THE SONGS FROM THAT ALBUM
  //returns: NEW PLAYLIST ID.

  playlistId=createPlaylist(album);
  for(let i = 0; i < player.songs.length; i++){
    if(player.songs[i].album===album)
      {
        addToPlayList(player.songs[i].id,playlistId)
      }
  }
  return playlistId;
}

export function artistPlaylist(artist){
  //gets: ARTIST NAME 
  //--> CEATE A PLAYLIST FOR ALL THE SONGS OF THAT ARTIST.
  //returns: NEW PLAYLIST ID.
  
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
  
  
  export function playlistDuration(id) {
    //Parameters: PLAYLIST ID
    //Returns: PLAYLIST DURATION.

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
  