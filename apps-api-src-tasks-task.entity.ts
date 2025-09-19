import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  category?: string;

  @Column()
  ownerId: string;

  @Column()
  orgId: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  order?: number;
}
