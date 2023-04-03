type LastFMRecentTrackResponse = {
  artist: { mbid: string; "#text": string };
  streamable: string;
  image: { "#text": string; size: string }[];
  mbid: string;
  album: { mbid: string; "#text": string };
  url: string;
  name: string;
} & (
  | { date: { uts: string; "#text": string } }
  | { "@attr": { nowplaying: string } }
);

interface PageInfo {
  total: string;
  page: string;
  perPage: string;
  totalPages: string;
}

interface LastFMRecentTracksResponse {
  recenttracks: {
    track: LastFMRecentTrackResponse[];
    "@attr": PageInfo;
  };
}

export type LastFMRecentTracks = {
  tracks: LastFMTrack[];
} & PageInfo;

export type LastFMTrack = {
  artist: LastFMArtist;
  streamable: string;
  image: LastFMImage[];
  mbid: string;
  album: LastFMAlbum;
  url: string;
  name: string;
} & ({ date: Date } | { currentlyPlaying: boolean });

export interface LastFMAlbum {
  mbid: string;
  name: string;
}

export interface LastFMArtist {
  name: string;
  mbid: string;
}

export interface LastFMImage {
  uri: string;
  size: string;
}

export class LastFMClient {
  constructor(private readonly apiKey: string, private readonly user: string) {}

  public async getRecentTracks(limit?: number): Promise<LastFMRecentTracks> {
    const { recenttracks } = (await this.fetch(
      "user.getrecenttracks",
      limit
    )) as LastFMRecentTracksResponse;

    return {
      tracks: recenttracks.track.map((track) => this.parseTrack(track)),
      total: recenttracks["@attr"].total,
      page: recenttracks["@attr"].page,
      perPage: recenttracks["@attr"].perPage,
      totalPages: recenttracks["@attr"].totalPages,
    };
  }

  private parseTrack(track: LastFMRecentTrackResponse): LastFMTrack {
    return {
      artist: this.parseArtist(track.artist),
      streamable: track.streamable,
      image: track.image.map((image) => this.parseImage(image)),
      mbid: track.mbid,
      album: this.parseAlbum(track.album),
      url: track.url,
      name: track.name,
      date: "date" in track ? this.parseDate(track.date) : undefined,
      currentlyPlaying: "@attr" in track && "nowplaying" in track["@attr"],
    };
  }

  private parseArtist(artist: { mbid: string; "#text": string }): LastFMArtist {
    return {
      mbid: artist.mbid,
      name: artist["#text"],
    };
  }

  private parseImage(image: { "#text": string; size: string }): LastFMImage {
    return {
      uri: image["#text"],
      size: image.size,
    };
  }

  private parseAlbum(album: { mbid: string; "#text": string }): LastFMAlbum {
    return {
      mbid: album.mbid,
      name: album["#text"],
    };
  }

  private parseDate(date: { uts: string; "#text": string }): Date {
    return new Date(parseInt(date.uts, 10) * 1000);
  }

  private async fetch<T>(method: string, limit: number = 10): Promise<T> {
    const url = `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${this.user}&api_key=${this.apiKey}&format=json&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(await response.json());
      throw new Error(
        `Request with method ${method} failed with status ${response.status}`
      );
    }

    return await response.json();
  }
}
