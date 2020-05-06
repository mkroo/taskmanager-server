import { BaseEntity, PrimaryColumn, Column, CreateDateColumn, Entity } from 'typeorm'

@Entity()
export class Project extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  @Column()
  public name!: string

  @Column({ type: 'varchar', length: 1024, nullable: true })
  public description!: string

  @CreateDateColumn()
  readonly createdAt!: Date
}
