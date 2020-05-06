import {
  BaseEntity, Entity,
  ManyToOne,
  PrimaryGeneratedColumn, Column, CreateDateColumn,
} from 'typeorm'

import { User } from './user'
import { Ticket } from './ticket'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @Column()
  public content!: string

  @CreateDateColumn()
  public createdAt!: Date

  @Column({ type: 'datetime' })
  public openedAt?: Date

  @Column({ type: 'datetime' })
  public closedAt?: Date

  @Column()
  public workingTime!: number

  @ManyToOne(type => Ticket)
  public ticket!: Ticket

  @ManyToOne(type => User)
  public user!: User
}
