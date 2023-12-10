import { Injectable } from "@nestjs/common";
import { ThreadMessageService } from "@services/gpt/assistant/thread-message.service";
import { ThreadRunStepsService } from "@services/gpt/assistant/thread-run-steps.service";
import { ThreadRunService } from "@services/gpt/assistant/thread-run.service";
import { ThreadService } from "@services/gpt/assistant/thread.service";

@Injectable()
export class AssistantInvestorUseCase {
    private readonly assistantId = process.env.ASSISTANT_INVESTOR_ID;
    constructor(
        private readonly threadService: ThreadService,
        private readonly threadMessageService: ThreadMessageService,
        private readonly threadRunService: ThreadRunService,
        private readonly threadRunStepsService: ThreadRunStepsService,
    ) {}
    
    async execute(
       options: {
        content: string,
        threadId?: string,
        fileIds?: string[]
       }
    ) {
        let { content, threadId, fileIds } = options;

        if(!threadId) {
            const thread = await this.threadService.create();
            threadId = thread.id;
        }

        await this.threadMessageService.create(threadId, content, fileIds);
        const threadRun = await this.threadRunService.run(threadId, this.assistantId);
        const threadRunSteps = await this.threadRunStepsService.list(threadId, threadRun.id);
        return {
            threadRun,
            stepsData: threadRunSteps.data
        };
    }

    private tools() {
        const tool = {
            type: "function",
            function: {
                name: "convertPdfToBase64",
                description: "A function to convert PDFs pages in array of base64 images",
                parameters: {
                    type: "object",
                    
                }
            }
        }
    }

    response(threadId: string) {
        return this.threadMessageService.list(threadId);
    }
}