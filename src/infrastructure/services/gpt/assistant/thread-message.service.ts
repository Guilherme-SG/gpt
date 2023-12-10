import { Injectable } from "@nestjs/common";
import { BaseGPTService } from "../base/base-gpt.service";
import { MessageListParams } from "openai/resources/beta/threads/messages/messages";

@Injectable()
export class ThreadMessageService extends BaseGPTService {

    create(threadId: string, content: string, fileIds: string[] = []) {      
        return this.openai.beta.threads.messages.create(
            threadId,
            {
                content,
                role: "user",
                file_ids: fileIds
            }
        )
    }

    list(threadId: string, query?: MessageListParams) {
        return this.openai.beta.threads.messages.list(
            threadId,
            query
        );
    }

    update(threadId: string, messageId: string) {
        return this.openai.beta.threads.messages.update(
            threadId,
            messageId,
            {

            }
        )
    }

    retrieve(threadId: string, messageId: string) {
        return this.openai.beta.threads.messages.retrieve(
            threadId,
            messageId
        );
    }
}