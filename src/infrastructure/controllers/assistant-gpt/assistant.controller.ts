import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssistantBaseService } from '@services/gpt/assistant/assistant-base.service';
import { AssistantInvestorUseCase } from '../../use-cases/assistant-investor.use-case';

@Controller("assistant")
export class AssistantController {
  constructor(
    private readonly assistantBaseService: AssistantBaseService,
    private readonly assistantInvestorUseCase: AssistantInvestorUseCase,
  ) {}
  
  @Get(":id")
  getById(@Param("id") id: string ) {
    return this.assistantBaseService.getById(id);
  }

  @Get()
  list() {
    return this.assistantBaseService.list();
  }

  @Post("investor")
  investor(@Body () body: InvestorDto) {
    return this.assistantInvestorUseCase.execute(body);
  }

  @Get("investor/:threadId")
  listInvestorResponse(@Param ("threadId") threadId: string) {
    return this.assistantInvestorUseCase.response(threadId);
  }
}