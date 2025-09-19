import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { AuthModule } from './auth/auth.module';
import { AuditService } from './audit/audit.service';
import { UserEntity } from './users/user.entity';
import { TaskEntity } from './tasks/task.entity';
import { OrgEntity } from './orgs/org.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DATABASE_TYPE as any) || 'sqlite',
      database: process.env.DATABASE_PATH || './data/dev.db',
      entities: [UserEntity, TaskEntity, OrgEntity],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([UserEntity, TaskEntity, OrgEntity]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [UsersService, TasksService, AuditService],
})
export class AppModule {}
