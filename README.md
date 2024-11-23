## Projeto PI

[Slide Presentation](https://www.canva.com/design/DAGIC_-R_X0/9Y1IY3wnL_3RCfglyLM-8Q/edit?utm_content=DAGIC_-R_X0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## UML Diagram

```mermaid
erDiagram
    FUNCIONARIO {
        String id PK
        String nome
        String email
        String senha
        String cargo
        String profilePicture
        DateTime dataContratacao
    }

    EPI {
        String id PK
        String nome
        String descricao
        String categoria
        String fotoUrl
        Int quantidadeDisponivel
        DateTime dataValidade
    }

    RETIRADA {
        String id PK
        DateTime dataRetirada
        DateTime dataPrevistaDevolucao
        String funcionarioId FK
        String epiId FK
        String adminAprovacaoId FK
    }

    DEVOLUCAO {
        String id PK
        DateTime dataDevolucao
        String retiradaId FK
        String adminAprovacaoId FK
    }

    NOTIFICACAO {
        String id PK
        String tipo
        String mensagem
        DateTime dataEnvio
        String funcionarioId FK
    }

    ADMIN {
        String id PK
        String nome
        String email
        String senha
        String profilePicture
        DateTime createdAt
        DateTime updatedAt
    }

    FUNCIONARIO ||--o{ RETIRADA : retiradas
    EPI ||--o{ RETIRADA : retiradas
    RETIRADA ||--o| DEVOLUCAO : devolucao
    FUNCIONARIO ||--o{ NOTIFICACAO : notificacoes
    ADMIN ||--o{ RETIRADA : aprovacoesRetirada
    ADMIN ||--o{ DEVOLUCAO : aprovacoesDevolucao

```

