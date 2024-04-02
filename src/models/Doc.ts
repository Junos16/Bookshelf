import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity()
export class Doc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    department: string

    @Column()
    language: string

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date
}