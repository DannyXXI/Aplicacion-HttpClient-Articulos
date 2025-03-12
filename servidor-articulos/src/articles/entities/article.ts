import { v4 as uuid } from 'uuid';

export class Article  {
  id: string;
  title: string;
  description: string;
  body: string;
  createdAt: Date;
  author: string;

  constructor(title: string,
    description: string,
    body: string,
    createdAt: Date,
    author: string) {

    this.id = uuid();
    this.title = title;
    this.description = description;
    this.body = body;
    this.createdAt = createdAt;
    this.author = author;

  }
}
