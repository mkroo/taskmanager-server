import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Plan extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @ManyToOne(type => User)
  public user!: User

  @CreateDateColumn()
  public createdAt!: Date

  @Column()
  public content!: string

  @Column({ type: 'date', nullable: true })
  public deadline: string | null = null

  @Column({ type: 'datetime', nullable: true })
  public closedAt: Date | null = null
}
