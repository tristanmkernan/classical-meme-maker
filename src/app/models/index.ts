// https://metmuseum.github.io/#object
export interface IArtwork {
  objectID: number;
  isHighlight: boolean;
  primaryImage: string;
  objectName: string;
  objectDate: string;
  medium: string;

  title: string;
  creditLine: string;
  period: string;
  tags: string[];

  artistDisplayName: string;
  artistDisplayBio: string;

  objectURL: string;
}
