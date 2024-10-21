export interface Main {
    data: Data;
  }
  
  export interface Data {
    MediaListCollection: MediaListCollection;
  }
  
  export interface MediaListCollection {
    lists: List[];
  }
  
  export interface List {
    entries: Entry[];
  }
  
  export interface Entry {
    updatedAt: number;
    id: number;
    progress: number;
    media: Media;
  }
  
  export interface Media {
    coverImage: CoverImage;
    title: Title;
    siteUrl: string;
  }
  export interface siteUrl{
    siteUrl: string;
  }
  
  export interface CoverImage {
    extraLarge: string;
  }
  
  export interface Title {
    userPreferred: string;
  }