// src/tasks/task.entity.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  
  @Entity()
  export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    description: string;
  
    @Column({ default: false })
    isCompleted: boolean;
  
    @ManyToOne(() => User, (user) => user.tasks, {
      nullable: false,
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'userId' })
    user: User;

    @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  }
  