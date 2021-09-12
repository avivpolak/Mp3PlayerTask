'use strict'
import { playSong, playPlaylist,sTOmmss,mmssTOs,comparepl,compares,searchByQuery,searchByDuration } from './functions/otherFunctions';
import { isIdExsistInPlayLists,playListById,playListIndexById,addToPlayList,removeFromPlayLists,removeFromPlayList,removePlaylist,createPlaylist,editPlaylist,playlistDuration,renamePlayList,artistPlaylist,albumPlaylist} from './functions/playlistsFunctions';


//SONGS FUNCTIONS: GETING & EDITING SONGS.


   //Get songs by:


   export function songById(id) {
     //Parameters: SONG ID
     //Returns: THE MATCHING SONG.

    for (let i = 0; i < player.songs.length; i++) {
      if (player.songs[i]['id'] === id) return player.songs[i]
    }
    return undefined
  }
  
  export function songIndexById(id) {
    //Parameters: SONG ID
    //Returns: SONG INDEX.

    for (let i = 0; i < player.songs.length; i++) {
      if (player.songs[i]['id'] === id) return i
    }
    return -1
  }
  
  export function isIdExsistInSongs(id) {
    //Parameters: SONG ID
    //Returns: IS SONG ID EXSIST.

    for (let i = 0; i < player.songs.length; i++) {
      if (player.songs[i]['id'] === id) return true
    }
    return false
  }
  
  
     //Edit songs
  
  
  export function removeSong(id) {
    //Parameters: SONG ID 
    //--> REMOVING THE SONG, FROM PLAYER & PLAYLIST (activatie remove-from-playilist function).

    if (songIndexById(id) === -1) {
      throw new Error('non-existent ID')
    }
    player.songs.splice(songIndexById(id), 1)
    removeFromPlayLists(id)
  }
  
  export function addSong(title, album, artist, duration, id = 0) {
    //Parameters: NEW SONG CHARACTERIZATION 
    //--> ADDS IN TO PLAYER 
    //Returns: NEW SONGS ID.

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
  
  