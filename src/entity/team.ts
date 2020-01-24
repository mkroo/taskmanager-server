import { BaseEntity, PrimaryColumn, Column } from 'typeorm';

export class Team extends BaseEntity {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public description?: string;
}
