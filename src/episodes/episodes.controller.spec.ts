import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn()

  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findFeaturedEpisodes: async () => [{ id: 'id' }],
    findOne: mockFindOne,
    create: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
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
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'my episode' };

    beforeEach(() => {
      mockFindOne.mockResolvedValue(mockResult);
    });

    it('should call the service with correct params', async () => {
      await controller.findOne(episodeId);
      expect(mockFindOne).toHaveBeenCalledWith(episodeId);
    });

    it('should return correct response', async () => {
      const result = await controller.findOne(episodeId);
      console.log("result findOne", result);
      expect(result).toEqual(mockResult);
    });
  });
});
