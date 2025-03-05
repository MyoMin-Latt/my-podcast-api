import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findFeaturedEpisodes: async () => [{ id: 'id' }],
    findOne: async () => ({ id: 'id' }),
    create: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService}]
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return correct response', async () => {
      const episodeId = 'id';
      const result = await controller.findOne(episodeId);
      expect(result).toEqual({id: "id"})
    });
  });
});
