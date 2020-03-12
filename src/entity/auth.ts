import {
  BaseEntity, Entity,
  PrimaryGeneratedColumn, JoinColumn, Column,
  BeforeInsert, BeforeUpdate,
  OneToOne,
} from 'typeorm'
import { User } from '.'

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string

  @OneToOne(type => User)
  @JoinColumn()
  public user!: User

  @Column()
  public token!: string

  @Column()
  public expiredAt!: Date

  @BeforeInsert()
  @BeforeUpdate()
  public setExpiry() {
    const now = new Date().getTime()
    this.expiredAt = new Date(now + 1000 * 60 * 60 * 24 * 14)
  }
}
