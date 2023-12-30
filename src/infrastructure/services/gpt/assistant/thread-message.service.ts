import { Injectable } from "@nestjs/common";
import { MessageListParams } from "openai/resources/beta/threads/messages/messages";
import OpenAI from "openai";

@Injectable()
export class ThreadMessageService {    
    protected readonly openai: OpenAI = new OpenAI();

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