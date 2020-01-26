import { BaseEntity, PrimaryColumn, Column, Entity } from 'typeorm';

@Entity()
export class Team extends BaseEntity {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public description?: string;
}
