import { BaseEntity, Column, Index, Entity, ManyToOne } from 'typeorm';
import { User } from './user';
import { Task } from './task';

@Index(['worker', 'task'], { unique: true })
abstract class Plan extends BaseEntity {
  @ManyToOne(type => Task)
  public task!: Task;

  @ManyToOne(type => User)
  public worker!: User;

  @Column()
  public period!: number;
}

@Entity()
@Index(['year'])
@Index(['year', 'month'])
@Index(['year', 'month', 'week'])
export class WeeklyPlan extends Plan {
  @Column()
  public year!: number;

  @Column()
  public month!: number;

  @Column()
  public week!: number;
}
