import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nome: string;

    @Column()
    faceId: string;

    @Column()
    faceToken: string;
}