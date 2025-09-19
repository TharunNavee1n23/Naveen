import { Controller, Get, Post, Body, Req, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuditService } from '../audit/audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RbacGuard } from '../rbac/rbac.guard';
import { Roles } from '../rbac/rbac.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RbacGuard)
export class TasksController {
  constructor(private svc: TasksService, private audit: AuditService) {}

  @Post()
  @Roles('ADMIN')
  async create(@Body() body: any, @Req() req: any) {
    const user = req.user;
    const task = await this.svc.create({
      title: body.title,
      description: body.description,
      category: body.category
      ownerId: user.userId,
      orgId: user.orgId,
    });
    this.audit.log(user.userId, 'CREATE_TASK', 'task', task.id);
    return task;
  }

  @Get()
  async list(@Req() req: any) {
    const user = req.user;
    return this.svc.findVisibleTo(user);
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() body: any, @Req() req: any) {
    const user = req.user;
    const task = await this.svc.findById(id);
    if (!task) return { error: 'not found' };
    // allow owner to edit or admins/owners by role
    if (task.ownerId !== user.userId && !(user.role === 'ADMIN' || user.role === 'OWNER')) {
      return { error: 'forbidden' };
    }
  await this.svc.delete(id);
    this.audit.log(user.userId, 'DELETE_TASK', 'task', id);
    return { success: true };
  }
}

