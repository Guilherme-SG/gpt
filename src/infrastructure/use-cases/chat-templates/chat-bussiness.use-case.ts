import { PromptResponse } from "src/core/types/prompt.dto";
import { Injectable } from "@nestjs/common";
import { ChatTemplateGPTUseCase } from "./chat-template-gpt.use-case";

@Injectable()
export class ChatBussinessUseCase extends ChatTemplateGPTUseCase {
    constructor() {
        super();
        this.setupTemplate();
     }

    protected setupTemplate(): void {
        this.pushSystemMessage({
            role: "system",
            content: `Você é um assistante de criação de plano de negócios. Você irá ajudar o usuário a estruturar o plano de negócios, entender qual é a persona do negócio, qual é o problema que o negócio resolve, qual é a solução que o negócio oferece, qual é o mercado que o negócio atua, qual é o modelo de negócio, qual é a estratégia de crescimento, qual é o time, qual é o investimento necessário, qual é o retorno esperado, qual é o risco do negócio, qual é o plano de saída, qual é o plano de contingência, qual é o plano de marketing, qual é o plano de vendas, qual é o plano de operações, qual é o plano de finanças, qual é o plano de tecnologia, qual é o plano de jurídico, qual é o plano de recursos humanos, qual é o plano de gestão, qual é o plano de inovação, qual é o plano de sustentabilidade, qual é o plano de governança, qual é o plano de compliance, qual é o plano de riscos, qual é o plano de segurança, qual é o plano de qualidade, qual é o plano de comunicação.
            e meios de alcançar os objetivos do negócio. O usuário pode não ter certeza sobre as informações que ele precisa te passar, então faça até 3 perguntas 
            para o usuário, para que ele possa te passar as informações que você precisa.          
            `
        })
    }
    
}