import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ThreadMessageService } from '@services/gpt/assistant/thread-message.service';
import { ThreadRunStepsService } from '@services/gpt/assistant/thread-run-steps.service';
import { ThreadRunService } from '@services/gpt/assistant/thread-run.service';
import { ThreadService } from '@services/gpt/assistant/thread.service';

@Controller("thread")
export class ThreadController {
  constructor(
    private readonly threadService: ThreadService,
    private readonly threadMessageService: ThreadMessageService,
    private readonly threadRunService: ThreadRunService,
    private readonly threadRunStepsService: ThreadRunStepsService,
  ) {}
  
  @Post()
  crreate() {
    return this.threadService.create();
  }

  @Get("/:threadId")
  getThread(
    @Param("threadId") threadId: string,
  ) {
    return this.threadService.retrieve(threadId);
  }


  @Post("/:threadId/message")
  createMessage(
    @Param("threadId") threadId: string,
    @Body() body: { 
      content: string, 
      fileIds?: string[] 
    }
  ) {
    return this.threadMessageService.create(threadId, body.content, body.fileIds);
  }

  @Get("/:threadId/message")
  listMessange(
    @Param("threadId") threadId: string,
  ) {
    return this.threadMessageService.list(threadId);
  }

  @Get("/:threadId/message/:messageId")
  getMessange(
    @Param("threadId") threadId: string,
    @Param("messageId") messageId: string,
  ) {
    return this.threadMessageService.retrieve(threadId, messageId);
  }

  @Post("/:threadId/run")
  run(
    @Param("threadId") threadId: string,
    @Body() body: { assistantId: string } 
  ) {
    return this.threadRunService.run(threadId, body.assistantId);
  }

  @Get("/:threadId/run/:threadRunId")
  retrieveThread(
    @Param("threadId") threadId: string,
    @Param("threadRunId") threadRunId: string,
  ) {
    return this.threadRunService.retrieve(threadId, threadRunId);
  }

  @Delete("/:threadId/run/:threadRunId")
  cancelThreadRun(
    @Param("threadId") threadId: string,
    @Param("threadRunId") threadRunId: string,
  ) {
    return this.threadRunService.cancel(threadId, threadRunId);
  }

  @Get("/:threadId/run/:threadRunId/steps/")
  listRunSteps(
    @Param("threadId") threadId: string,
    @Param("threadRunId") runId: string,
  ) {
    return this.threadRunStepsService.list(threadId, runId);
  }

  @Get("/:threadId/run/:runId/steps/:stepId")
  retrieveRunStep(
    @Param("threadId") threadId: string,
    @Param("runId") runId: string,
    @Param("stepId") stepId: string,
  ) {
    return this.threadRunStepsService.retrieve(threadId, runId, stepId);
  }
}
