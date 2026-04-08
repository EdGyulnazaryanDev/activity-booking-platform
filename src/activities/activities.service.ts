// Activity model was removed in schema v2.
// Activities are now represented by Resources (ROOM, EQUIPMENT, COURT).
// This service delegates to the resources service for backwards compatibility.
import { Injectable } from '@nestjs/common';
import { ResourcesService } from '../resources/resources.service';

@Injectable()
export class ActivitiesService {
  constructor(private resources: ResourcesService) {}

  findAll() {
    return this.resources.findAll();
  }

  findOne(id: string) {
    return this.resources.findOne(id);
  }
}
