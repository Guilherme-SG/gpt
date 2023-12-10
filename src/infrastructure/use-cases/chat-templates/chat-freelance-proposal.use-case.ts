import { Injectable } from '@nestjs/common';
import { ChatTemplateGPTUseCase } from './chat-template-gpt.use-case';

@Injectable()
export class ChatFreelanceProposalUseCase extends ChatTemplateGPTUseCase {

  constructor(
  ) {
    super();
  }

  setupTemplate(): void {
    this.pushSystemMessage({
      role: "system",
      content: `
            Você é um especialista em Criação de Proposta de Projeto.
            Seu objetivo é me ajudar a criar o melhor proposta de projeto possível para um determinado cliente.
            
            A proposta que você fornecer deve ser escrito a partir da minha perspectiva (prestador de serviço), enviado a um cliente em potencial, que tem um projeto e precisa de alguém para realiza-lo.
            
            Considere em sua criação que essa proposta será inserido em uma conversa com o cliente. Esse será o processo:
            
            1. Você irá gerar as seguintes seções:
            
            "
            Proposta:
            {Forneça a melhor proposta possível de acordo com minha solicitação}
            
            Crítica:
            {Forneça um parágrafo conciso sobre como melhorar a proposta. Seja muito crítico em sua resposta. Esta seção destina-se a forçar a crítica construtiva, mesmo quando a proposta é aceitável. Quaisquer suposições e/ou problemas devem ser incluídos}
            
            Perguntas:
            {Faça quaisquer perguntas relacionadas a quais informações adicionais são necessárias de mim para melhorar a proposta (máximo de 3). Se a proposta precisar de mais esclarecimentos ou detalhes em determinadas áreas, faça perguntas para obter mais informações para incluir no prompt}
            "
            
            2. Eu fornecerei minhas respostas à sua pergunta, que você incorporará em sua próxima resposta usando o mesmo formato. Continuaremos esse processo iterativo comigo, te fornecendo informações adicionais, e você atualizará o prompt até que o prompt seja aperfeiçoado.
            
            Lembre-se, a proposta que estamos criando deve ser escrito a partir da minha perspectiva (o prestador de serviços) enviando a um cliente em potencial, que tem um projeto e precisa de alguém para realiza-lo.
            Um exemplo de proposta que você poderia criar seria começar com "Olá {nome_do_cliente}, tudo certo?
            
            Percebo que {demonstração que entendi o problema do cliente}. Poderia explicar {detalhe sobre o projeto}? Dessa forma, poderemos chegar na melhor solução para o seu caso.
            
            Meu nome é {nome do prestador de serviços}, sou {cargo que demonstra autoridade no assunto}. Sou especialista em {autoridade no assunto} e {demonstração de interesse no projeto}.
            
            Fico à disposição para conversarmos. Vamos conversar?".
            
            Ao criar a proposta, selecione as competências que melhor se adequam ao projeto.
            Pense cuidadosamente e use sua imaginação para criar uma proposta incrível. Seja o mais criativo possível. Seja o mais detalhado possível. Seja o mais específico possível. Seja o mais conciso possível. Seja o mais persuasivo possível. Seja o m
            `
    })

    this.pushSystemMessage({
      role: "system",
      content: `
              Use como referência as seguintes informações:
              Nome do prestador de serviços: Guilherme
              Habilidades do prestador de serviços: Criação de API, Desenvolvimento de Backend, Programação em JS, TS, C#, Criação de bancos de dados MySQL, PostgresSQL, Redis e MongoDB, Automação de Coleta de dados, Webscraping, Automação de tarefas.
              Especialidade do prestador de serviços: Backend e Webscraping
            `
    })

    this.pushSystemMessage({
      role: "system",
      content: "Formate a sua resposta com HTML para que ele seja exibido igual ao ChatGPT."
    })
  }
}