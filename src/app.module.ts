import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatGTPModule } from '@modules/gpt.module';
import { ScraperModule } from '@modules/scraper.module';
import { AgentGTPModule } from '@modules/agent-gpt.module';
import { AssistantGTPModule } from '@modules/assistant-gpt.module';
import { FileGTPModule } from '@modules/file-gpt';
import { FunctionGTPModule } from '@modules/function-gpt.module';
import { VisionGTPModule } from '@modules/vision-gpt.module';

@Module({  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatGTPModule,
    AgentGTPModule,
    AssistantGTPModule,
    FileGTPModule,
    FunctionGTPModule,
    VisionGTPModule,
    ScraperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}