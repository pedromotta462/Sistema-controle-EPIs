import { Add, Remove, Search } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import CustomModal from "../components/CustomModal";
import RegisterEPI from "../components/RegisterEPI";
import { useState } from "react";
import { getAllEPIsRequest, useRemoveEPI, useRequestEPI } from "../hooks/useEPIs";
import { useQuery } from "@tanstack/react-query";
import { EPI } from "../helpers/types";
import useStore from "../hooks/useStore";
import toast from "react-hot-toast";

const Storage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const user = useStore((state: any) => state.user);

  const { data: epis, isLoading: isGettingEPIs, refetch } = useQuery({
    queryKey: ["epis"],
    queryFn: () => getAllEPIsRequest(),
  });

  const { mutate: removeEPI, isPending: isRemovingEPI } = useRemoveEPI({
    onSuccess: () => {
      refetch();
      toast.success('EPI removido com sucesso!');
    },
    onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "";
        toast.error("Erro ao remover EPI:\n" + errorMessage);
        console.log(error);
    },
  });

  const { mutate: RequestEPI, isPending: isRequestingEPI } = useRequestEPI({
    onSuccess: () => {
      toast.success('EPI solicitado com sucesso!');
    },
    onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "";
        toast.error("Erro ao solicitar EPI:\n" + errorMessage);
        console.log(error);
    },
  });

  const handleRequestEPI = (id: string) => {
    console.log("EPI ", id, " solicitado");
    RequestEPI({
      id: id,
    });
  }

  const handleRemoveEPI = (id: string) => {
    console.log("EPI ", id, " removido");
    removeEPI({
      id: id,
    });
  }



  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="start"
      alignItems="start"
      borderRadius={5}
      sx={{
        height: "95%",
        width: "95%",
        maxHeight: "calc(100vh - 32px)", // Ajusta a altura máxima
        overflowY: "auto", // Permite rolagem vertical
      }}
      padding={4}
    >
      <div className="flex items-start justify-between w-full">
        <form className="form relative">
          <input
            className="bg-[#2B2B2B] w-[400px] input rounded-full px-4 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
            placeholder="Search..."
            type="text"
            required
          />
          <button className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
            <Search sx={{ color: grey[500] }} />
          </button>
        </form>
        {!user.cargo && (
          <div>
            <Button variant="contained" onClick={handleOpen}>
              + Novo EPI
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-10  self-center">
        {isGettingEPIs ? (
          <p className="text-white">"Carregando epis"</p>
        ) : (
          epis.map((data: EPI, index: any) => (
            <div className="w-[20rem] h-70 flex flex-col justify-between gap-2 bg-[#2B2B2B] rounded-lg shadow p-2 pt-4">
              <div className="flex gap-2">
                <img
                  className="bg-neutral-500 w-40 h-40 shrink-0 rounded-lg"
                  src={data.fotoUrl || "https://via.placeholder.com/150"}
                  alt=""
                />
                <div className="flex flex-col" key={index}>
                  <span className="font-bold text-white italic text-xl">
                    {data.nome}
                  </span>
                  <p className="line-clamp-3 text-[#717579] text-xs m-2">
                    {data.categoria}
                  </p>
                  <p className="line-clamp-3 text-[#717579] text-xs m-2">
                    {data.descricao}
                  </p>
                  <p className="text-[#3984F3] text-sm m-2">
                    Estoque: {data.quantidadeDisponivel}
                  </p>
                  <p className="text-[#3984F3] text-sm m-2">
                    Validade:{" "}
                    {data.dataValidade
                      ? new Date(data.dataValidade).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </p>
                </div>
              </div>
              <Stack
                gap={1}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {user.cargo ? 
                  <Button disabled={isRequestingEPI} variant="outlined" startIcon={<Add />} onClick={() => {handleRequestEPI(data.id)}}>
                    Solicitar EPI
                  </Button>
                  :
                  <Button disabled={isRemovingEPI} variant="outlined" startIcon={<Remove />} onClick={() => {handleRemoveEPI(data.id)}}>
                    Remover EPI
                  </Button>
                }
              </Stack>
            </div>
          ))
        )}
      </div>
      <CustomModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          width: "90%",
          height: "90%",
          margin: "auto",
          overflowY: "fixed",
        }}
        onConfirm={handleClose}
        titleCancel="Fechar"
        showSaveButton={false}
      >
        <>
          <div className="flex w-full flex-col items-center justify-center">
            <h2 className="text-bold text-2xl m-2">Cadastrar Novo EPI</h2>
            <p>Preencha formulário abaixo:</p>
            <div className="w-full m-2">
              <RegisterEPI refetch={refetch} />
            </div>
          </div>
        </>
      </CustomModal>
    </Stack>
  );
};

export default Storage;

/* 
<Stack
        spacing={2}
        direction="column"
        justifyContent="start"
        alignItems="start"
        borderRadius={5}
        sx={{
          height: "230px",
          width: "300px",
          backgroundColor: "#202020",
        }}
        padding={4}
        key={index}
      >
        teste {index}
      </Stack>
*/
