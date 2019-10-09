// https://metmuseum.github.io/#object
export interface IArtwork {
  objectID: number;
  isHighlight: boolean;
  primaryImage: string;
  objectName: string;
  objectDate: string;
  medium: string;

  title: string;
  culture: string;
  period: string;
  tags: string[];

  artistDisplayName: string;
  artistDisplayBio: string;

  linkResource: string;
}
