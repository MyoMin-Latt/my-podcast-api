import { BadRequestException, Body, Controller, DefaultValuePipe, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { IsPositivePipe } from 'src/pipes/is-positive/is-positive.pipe';


@Controller('episodes')
export class EpisodesController {
    constructor(private episodesService: EpisodesService,
    ) { }

    @Get()
    findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: Number) {
        console.log(sort);
        return this.episodesService.findAll();
    }

    @Get('featured')
    findFeatured() {
        return this.episodesService.findFeatured();
    }

    // @Get(':id')
    // findOne(@Param() id: string) {
    //     console.log(id);
    //     return this.episodesService.findOne(id);
    // }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        console.log(id);
        const episode = await this.episodesService.findOne(id);
        if (!episode) {
            // throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            // throw new NotFoundException('User not found'); // 404
            throw new BadRequestException('Invalid input'); // 400

            // throw new Error('Episode not found');
        }
        return episode;
    }

    @Post()
    create(@Body(ValidationPipe) input: CreateEpisodeDto) {
        console.log(input);
        return this.episodesService.create(input);
    }
}