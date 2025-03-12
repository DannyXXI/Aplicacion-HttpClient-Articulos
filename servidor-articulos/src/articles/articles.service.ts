import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { Article } from './entities/article';
import { Observable, of } from 'rxjs';

@Injectable()
export class ArticlesService {
  constructor() {}

  private articles: Article[] = [];

  public create(createArticleDto: CreateArticleDto): Observable<Article> {
    try {
      const createdArticle = new Article(
        createArticleDto.title,
        createArticleDto.description,
        createArticleDto.body,
        new Date(),
        createArticleDto.author,
      );
      this.articles.push(createdArticle);
      return of(createdArticle);
    } catch (error) {
      throw new HttpException('Error creating article', HttpStatus.BAD_REQUEST);
    }
  }

  public update(updateArticleDto: UpdateArticleDto, id: string): Observable<Article> {
    try {
      const article: Article = this.findArticle(id);
      article.title = updateArticleDto.title;
      article.body = updateArticleDto.body;
      article.description = updateArticleDto.description;
      return of(article);
    } catch (error) {
      throw new HttpException('Error updating article', HttpStatus.BAD_REQUEST);
    }
  }

  delete(id: string): Observable<string> {
    try {
      const index: number = this.articles.findIndex(
        (article: Article) => article.id === id,
      );
      if (index > -1) {
        this.articles.splice(index, 1);
      }
      return of(index.toString())
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }

  findArticle(id: string): Article {
    let article: Article;
    try {
      article = this.articles.find(article => id === article.id);
      return article || null;
    } catch (error) {
      return null;
    }
  }

  getArticle(articleId: string) {
    const article = this.findArticle(articleId);
    if (!article) {
      throw new NotFoundException('Could not find article.');
    }
    return article;
  }

  findAll(): Article[] {
    return this.articles;
  }
}
