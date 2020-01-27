import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import { Project } from '.';

export enum TicketType {
  DEV = 'development',
  ISSUE = 'issue',
  BUG = 'bug',
}

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryColumn('varchar')
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public description: string = '';

  @Column({ type: 'enum', enum: TicketType })
  public type!: TicketType;

  @Column({ type: 'int' })
  public priority: number = 5;

  @Column({ type: 'datetime' })
  public openedAt!: Date;

  @Column({ type: 'datetime', nullable: true })
  public closedAt?: Date;

  @ManyToOne(type => Project)
  public project!: Project;
}
