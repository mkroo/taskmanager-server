import { BaseEntity, PrimaryColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Task } from './task';

export class Project extends BaseEntity {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public name!: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  public description: string = '';

  @CreateDateColumn()
  public createdAt!: Date;
}
