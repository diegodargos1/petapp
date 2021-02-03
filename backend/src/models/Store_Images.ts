import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Store from './Store';

@Entity('store_images')
export default class Store_Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Store, store => store.images)
    @JoinColumn({ name: 'store_id' })
    store_id: Store;
}