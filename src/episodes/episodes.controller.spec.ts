import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockFindAll = jest.fn();
  const mockFindFeatured = jest.fn();
  const mockCreate = jest.fn();

  const mockEpisodesService = {
    findAll: mockFindAll,
    findFeatured: mockFindFeatured,
    findOne: mockFindOne,
    create: mockCreate,
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

  describe('findAll', () => {
    const mockResult = [{ id: '1', name: 'Episode 1' }];

    beforeEach(() => {
      mockFindAll.mockResolvedValue(mockResult);
    });

    it('should call the service with default parameters when no query is provided', async () => {
      await controller.findAll('desc', 100);
      expect(mockFindAll).toHaveBeenCalled();
    });

    it('should call the service with provided parameters', async () => {
      await controller.findAll('asc', 50);
      expect(mockFindAll).toHaveBeenCalled();
    });

    it('should return a list of episodes', async () => {
      const result = await controller.findAll('desc', 100);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findFeaturedEpisodes', () => {
    const mockResult = [{ id: '1', name: 'Featured Episode', featured: true }];

    beforeEach(() => {
      mockFindFeatured.mockResolvedValue(mockResult);
    });

    it('should return a list of featured episodes', async () => {
      const result = await controller.findFeatured();
      expect(result).toEqual(mockResult);
      expect(mockFindFeatured).toHaveBeenCalled();
    });
  });


  describe('findOne', () => {
    describe('when episode is found', () => {
      const episodeId = '101';
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
        expect(result).toEqual(mockResult);
      });
    });

    

    describe('when episode is not found', () => {
      const episodeId = 'id2';

      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });

      it('should throw an error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow('Episode not found');
      });
    });
  });
});
