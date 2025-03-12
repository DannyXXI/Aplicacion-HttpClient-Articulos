import { Body, Controller, Delete, Get, Param, Patch, Post, Headers, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { JWT_HEADER_PARAM } from '../shared/utils';
import { firstValueFrom } from 'rxjs';
import { Article } from './entities/article';

@Controller('articles')
export class ArticlesController {

  constructor(@Inject(forwardRef(() => ArticlesService)) private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return firstValueFrom(
      this.articlesService.create(createArticleDto),
    ).then((res) => {
      return res;
    });
  }

  @Get()
  findAll(): Article[] {
    return this.articlesService.findAll();
  }

  @Patch('/:id')
  update(@Body() updateArticleDto: UpdateArticleDto,
               @Param('id') id,
               @Headers(JWT_HEADER_PARAM) token) {

    return firstValueFrom(
      this.articlesService.update(updateArticleDto, id),
    ).then((res) => {
      return res;
    });
  }

  @Delete('/:id')
  delete(@Param('id') id) {
    return firstValueFrom(this.articlesService.delete(id)).then(
      (res) => {
        return res;
      },
    );
  }

}
