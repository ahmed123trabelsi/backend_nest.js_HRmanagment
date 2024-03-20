
import { Controller, Post, Body, HttpException, Get, Delete, Param, Put, NotFoundException } from '@nestjs/common';
import { MissionService } from './mission.service';
import { Mission } from './Shemas/Mission.Shema';
import { CreateMissionDto } from './Dto/CreateMission.Dto';
import { UpdateMissionDto } from './Dto/UpdateMission.Dto';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Post('assign-user')
  async assignUserToMission(
    @Body() data: { missionId: string, userId: string }
  ): Promise<Mission> {
    try {
      const { missionId, userId } = data;
      const mission = await this.missionService.assignUserToMission(missionId, userId);
      return mission;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  @Post()
  async createMission(@Body() createMissionDto: CreateMissionDto): Promise<Mission> {
    try {
      return await this.missionService.createMission(createMissionDto);
    } catch (error) {
      throw error;
    }
  }
  @Get()
  async getAll(): Promise<Array<Mission>>{
    return await this.missionService.findAll();

  }
  @Delete(':missionId')
  async deleteMission(@Param('missionId') missionId: string): Promise<void> {
    const existingMission = await this.missionService.findById(missionId);
    if (existingMission) {
      await this.missionService.deleteMission(missionId);
    } else {
      throw new HttpException('Mission non trouvée', 404);
    }
  }
  @Put(':missionId')
  async updateMission(
    @Param('missionId') missionId: string,
    @Body() updateMissionDto: UpdateMissionDto
  ): Promise<Mission> {
    const existingMission = await this.missionService.findById(missionId);

    if (!existingMission) {
      throw new NotFoundException('Mission not found');
    }

    if (updateMissionDto.title) {
      existingMission.title = updateMissionDto.title;
    }
    if (updateMissionDto.description) {
      existingMission.description = updateMissionDto.description;
    }
    if (updateMissionDto.startDate) {
      existingMission.startDate = updateMissionDto.startDate;
    }
    if (updateMissionDto.endDate) {
      existingMission.endDate = updateMissionDto.endDate;
    }

    return existingMission.save();
  }
  @Delete('delete-multiple')
  async deleteMultipleMissions(@Param('missionIds') missionIds: string[]): Promise<void> {
    try {
      await this.missionService.deleteMultipleMissions(missionIds);
    } catch (error) {
      throw new HttpException('error',500);
    }
  }
}
