import { Button, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRegisterEPI } from "../hooks/useRegisterEPI";

const RegisterEPI = ({refetch}: any) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(0);
  const [dataValidade, setDataValidade] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");

  const CleanFields = () => {
    setNome("");
    setDescricao("");
    setCategoria("");
    setQuantidadeDisponivel(0);
    setDataValidade("");
    setFotoUrl("");
  };

  const { mutate: createEPI, isPending: isCreatingEPI } = useRegisterEPI({
    onSuccess: () => {
      toast.success("EPI criado com sucesso!");
      CleanFields();
      refetch();
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "";
      toast.error("Erro ao criar epi:\n" + errorMessage);
      console.log(error);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createEPI({
      nome,
      descricao,
      categoria,
      fotoUrl,
      quantidadeDisponivel,
      dataValidade: new Date(dataValidade).toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
    >
      <div className="mb-4">
        <TextField
          label="Nome"
          variant="outlined"
          type="text"
          value={nome}
          required
          onChange={(event) => setNome(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Descrição"
          variant="outlined"
          type="text"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Categoria"
          variant="outlined"
          type="text"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="URL Foto"
          variant="outlined"
          type="text"
          value={fotoUrl}
          onChange={(event) => setFotoUrl(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Quantidade Disponível"
          variant="outlined"
          type="text"
          required
          value={quantidadeDisponivel}
          onChange={(event) =>
            setQuantidadeDisponivel(Number(event.target.value))
          }
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Data de Validade"
          variant="outlined"
          type="date"
          value={dataValidade}
          onChange={(event) =>
            setDataValidade(event.target.value)
          }
          className="w-full"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Button
        disabled={isCreatingEPI}
        type="submit"
        variant="contained"
        color="success"
        className="text-white font-bold py-2 px-4 rounded"
      >
        {isCreatingEPI ? "Criando..." : "Criar"}
      </Button>
    </form>
  );
};

export default RegisterEPI;
