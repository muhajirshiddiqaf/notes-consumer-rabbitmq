const { Pool } = require('pg');
 
class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }
 
  async getPlaylists(userId,playlistId) {
    console.log(userId);
    console.log(playlistId);
    const query = {
      text: `SELECT a.id,a.name,c.username 
      FROM playlists a JOIN playlist_colaborations b on a.id = b.playlist_id
      JOIN users c on a.owner = c.id
      WHERE b.user_id = $1 and a.id = $2
      `,
      values: [userId,playlistId],
    };



    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: 'select a.id,a.title,a.performer from songs a join playlist_songs b on a.id = b.song_id where b.playlist_id =  $1',
      values: [playlistId],
    };
  
    const result = await this._pool.query(query);
    return result.rows;  
  }


}
 
module.exports = PlaylistsService;
