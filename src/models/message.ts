import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    message!: string;

    @Column()
    createdOn!: string;
}