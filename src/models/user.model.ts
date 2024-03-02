import { IUser } from 'src/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', nullable: false })
  fistName: string;

  @Column({ name: 'last_name', nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column({ name: 'created_at', nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: false, default: new Date() })
  updatedAt: Date;
}
