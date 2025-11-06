import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsEmail} from "class-validator";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: "varchar", unique: true, nullable: false })
    @IsEmail()
    email: string;
    @Column({type: "varchar"})
    password: string;
    @Column({type: "integer"})
    age: number;
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt?: Date;
}
