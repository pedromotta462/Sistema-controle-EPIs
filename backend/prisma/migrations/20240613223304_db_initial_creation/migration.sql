-- CreateTable
CREATE TABLE "Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "dataContratacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EPI" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "quantidadeDisponivel" INTEGER NOT NULL,
    "dataValidade" TIMESTAMP(3),

    CONSTRAINT "EPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retirada" (
    "id" TEXT NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL,
    "dataPrevistaDevolucao" TIMESTAMP(3),
    "funcionarioId" TEXT NOT NULL,
    "epiId" TEXT NOT NULL,
    "adminAprovacaoId" TEXT NOT NULL,

    CONSTRAINT "Retirada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Devolucao" (
    "id" TEXT NOT NULL,
    "dataDevolucao" TIMESTAMP(3) NOT NULL,
    "retiradaId" TEXT NOT NULL,
    "adminAprovacaoId" TEXT NOT NULL,

    CONSTRAINT "Devolucao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL,
    "funcionarioId" TEXT NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Devolucao_retiradaId_key" ON "Devolucao"("retiradaId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Retirada" ADD CONSTRAINT "Retirada_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retirada" ADD CONSTRAINT "Retirada_epiId_fkey" FOREIGN KEY ("epiId") REFERENCES "EPI"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retirada" ADD CONSTRAINT "Retirada_adminAprovacaoId_fkey" FOREIGN KEY ("adminAprovacaoId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolucao" ADD CONSTRAINT "Devolucao_retiradaId_fkey" FOREIGN KEY ("retiradaId") REFERENCES "Retirada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Devolucao" ADD CONSTRAINT "Devolucao_adminAprovacaoId_fkey" FOREIGN KEY ("adminAprovacaoId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
