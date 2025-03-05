import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';


@Controller('episodes')
export class EpisodesController {
    constructor(private episodesService: EpisodesService,
    ) { }

    @Get()
    findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
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
            throw new Error('Episode not found');
        }
        return episode;
    }

    @Post()
    create(@Body() input: CreateEpisodeDto) {
        console.log(input);
        return this.episodesService.create(input);
    }
}