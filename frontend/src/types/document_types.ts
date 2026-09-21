export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  documentId: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  filePath: string;
  mimeType: string;
  createdAt: string;
  comments?: Comment[];
}