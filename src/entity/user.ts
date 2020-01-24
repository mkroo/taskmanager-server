import {
  BaseEntity, Entity,
  PrimaryColumn, Column,
  ManyToOne,
} from 'typeorm';
import { Team } from './team';

import { compareSync, hashSync, genSaltSync } from 'bcryptjs';
import { RefreshToken } from './auth';
import { AuthenticationError } from 'apollo-server-lambda';
import { generateAccessToken, Payload } from '../util/jwt';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  public id!: string;

  @Column({ name: 'password' })
  private encryptPassword!: string;
  set password(rawPassword: string) {
    this.encryptPassword = hashSync(rawPassword);
  }
  public comparePassword(rawPassword: string) {
    return compareSync(rawPassword, this.password);
  }

  @Column()
  public name!: string;

  @Column()
  public email!: string;

  @ManyToOne(type => Team)
  public team!: Team;

  @Column()
  public isLeader: boolean = false;

  public async createAccessToken() {
    const payload: Payload = {
      id: this.id,
      name: this.name,
      isLeader: this.isLeader,
    };
    const token = generateAccessToken(payload);
    return token;
  }

  public async createRefreshToken() {
    const tokenStorage = new RefreshToken();
    tokenStorage.user = this;
    tokenStorage.token = genSaltSync();
    await tokenStorage.save();
    return tokenStorage.token;
  }

  public async verifyRefreshToken(token: string) {
    const tokenStorage = await RefreshToken.findOne({
      where: { token, user: this },
    });
    if (!tokenStorage) {
      throw new AuthenticationError('TOKEN_NOT_FOUND');
    }
    if (tokenStorage.expiredAt < new Date()) {
      throw new AuthenticationError('TOKEN_EXPIRED');
    }
  }
}
