import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PropertyImage } from 'src/cloudinary/property-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, PropertyImage]), AuthModule],
  providers: [PropertiesService],
  controllers: [PropertiesController],
  exports: [PropertiesService],
})
export class PropertiesModule {}
