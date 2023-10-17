import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GTPModule } from '@modules/gpt.module';
import { ScrapperModule } from '@modules/scrapper.module';

@Module({  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GTPModule,
    ScrapperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}