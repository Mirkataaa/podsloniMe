import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('agencies')
export class Agency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  logo?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 15 })
  commissionCut: number;

  @OneToMany(() => User, (user) => user.agency)
  members: User[];

  @ManyToOne(() => User, (user) => user.ownedAgencies, { nullable: true })
  owner?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
