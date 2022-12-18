import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  
  @Entity("users")
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    name: string;
  
    @Column({ unique: true })
    @IsNotEmpty()
    email: string;
  
    @Column()
    @IsNotEmpty()
    password: string;
  
    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;
  
      @Column()
    @UpdateDateColumn()
    updated_at: Date;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }