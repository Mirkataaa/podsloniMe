import { Property } from 'src/properties/property.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropertyImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string; // secure_url

  @Column()
  publicId: string;

  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: 'CASCADE',
  })
  property: Property;
}
