import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('orgs')
export class OrgEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentOrgId?: string;
}
