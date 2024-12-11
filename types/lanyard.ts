export type LanyardResponse = {
    discord_user: {
      username: string,
      discriminator: string,
      avatar: string,
      id: string,
      display_name: string,
      avatar_decoration_data:{
        asset: string
      }
    },
    activities: {
      [0]:{
        state: string,
        emoji: {
          name: string
        }
      },
      [1]:{
        name: string,
        created_at: string
      },
      [2]:{
        name: string
      }
    },
    listening_to_spotify: boolean,
    spotify: {
      track_id: string,
      timestamps: {
        start: number,
        end: number
      },
      album: string,
      artist: string,
      song: string,
      album_art_url: string
    }
    discord_status: string
  };