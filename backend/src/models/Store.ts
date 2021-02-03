import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Store_Images from './Store_Images';

@Entity('stores')
export default class Store {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    name: string;
    @Column()
    cnpj: string;
    @Column()
    inscricaoestadual: string;
    @Column()
    razaosocial: string;
    @Column()
    rua: string;
    @Column()
    numero: string;
    @Column()
    cidade: string;
    @Column()
    estado: string;
    @Column()
    complemento: string;
    @Column()
    email: string;
    @Column()
    telefone: string;
    @Column()
    website: string;
    @Column()
    latitude: number;
    @Column()
    longitude: number;
    @Column()
    user_id: number;
    @Column()
    cep: string;

    @Column()
    domingoAbre: string;
    @Column()
    domingoFecha: string;
    @Column()
    segundaAbre: string;
    @Column()
    segundaFecha: string;
    @Column()
    tercaAbre: string;
    @Column()
    tercaFecha: string;
    @Column()
    quartaFecha: string;
    @Column()
    quartaAbre: string;
    @Column()
    quintaAbre: string;
    @Column()
    quintaFecha: string;
    @Column()
    sextaAbre: string;
    @Column()
    sextaFecha: string;
    @Column()
    sabadoAbre: string;
    @Column()
    sabadoFecha: string;

    @OneToMany(() => Store_Images, image => image.store_id,
        { cascade: ['insert', 'update'] }
    )
    @JoinColumn({
        name: 'store_id'
    })
    images: Store_Images[];
}