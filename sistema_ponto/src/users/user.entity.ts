import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 160, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  set password(plain: string) {
    this.passwordHash = bcrypt.hashSync(plain, 10);
  }
}
