import { Injectable } from "@nestjs/common";
import { BasePromptWithToolGPTService } from "../../services/gpt/base/base-prompt-with-tool-gpt.service";
import { ChatCompletionTool } from "openai/resources";

@Injectable()
export class ChatFunctionGPTBaseService extends BasePromptWithToolGPTService {
    constructor() {
        super();
        this.setupTemplate();
    }

    protected setTools(): void {
        
    }

    protected pushTool(tool: ChatCompletionTool, functionReference: Function) {
        this.tools.push(tool);
        this.toolFunctions[tool.function.name] = functionReference
    }

    protected setupTemplate(): void {
        this.pushSystemMessage({
            content: "Você é um assistente prestativo.",
            role: "system"
        })
    }

    protected getContent(dto: any): string | any[] {
        return dto.prompt;
    }
}