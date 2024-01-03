import { Inject, Injectable } from "@nestjs/common";
import { UseCase } from "@interfaces/use-case.interface";
import { BasePromptWithToolGPTService } from "@interfaces/base-prompt-gpt.service.interface";
import { PromptDto } from "@core-types/prompt.dto";
import { CHAT_PROMPT_WITH_TOOL_SERVICE } from "@constants/gpt-service.constants";

@Injectable()
export class ChatFunctionGPTUseCase implements UseCase {
    constructor(@Inject(CHAT_PROMPT_WITH_TOOL_SERVICE) private readonly promptWithToolGPTService: BasePromptWithToolGPTService) {
        this.setupTemplate();
    }

    private setupTemplate(): void {
        this.promptWithToolGPTService.pushSystemMessage({
            content: "Você é um assistente prestativo.",
            role: "system"
        })

        this.promptWithToolGPTService.addTool(
            {
                type: "function",
                function: {
                    name: "getUsername",
                    description: "Retrive the username of the user",
                    parameters: {
                        type: "object",
                        properties: {}
                    }
                }
            },
            () => "Gabriel Montresor"
        )
    }

    execute(prompt: PromptDto): Promise<any> {
        return this.promptWithToolGPTService.prompt(prompt);
    }
}