import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Book extends BaseEntity {
    @PrimaryColumn()
    isbn: number

    @Column()
    title: string

    @Column()
    author: string

    @Column()
    publisher: string

    @Column()
    language: string

    @Column()
    department: string

    @Column()
    dateReleased: Date

    @Column()
    edition: number

    @CreateDateColumn()
    dateAdded: Date

    @UpdateDateColumn()
    dateUpdated: Date
}