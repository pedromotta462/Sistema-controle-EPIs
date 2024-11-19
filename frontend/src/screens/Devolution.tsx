import { CheckCircle, Search } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import {
  getAllDevolutionRequest,
  useApproveDevolutionEPI,
} from "../hooks/useDevolution";
import { useQuery } from "@tanstack/react-query";
import { Devolucao } from "../helpers/types";
//import useStore from "../hooks/useStore";
import toast from "react-hot-toast";

const Devolution = () => {
    const [filteredDevolutions, setFilteredDevolutions] = useState<Devolucao[]>([]);

    const {
      data: devolutions,
      isLoading: isGettingDevolution,
      refetch,
    } = useQuery({
      queryKey: ["devolution"],
      queryFn: () => getAllDevolutionRequest(),
    });
  
    const { mutate: approveDevolutionEPI, isPending: isDevolvingEPI } = useApproveDevolutionEPI({
      onSuccess: () => {
        toast.success("Devolução aprovada com sucesso!");
        refetch();
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "";
        toast.error("Erro ao aprovar devolução EPI:\n" + errorMessage);
        console.log(error);
      },
    });
  
    const handleApproveRequestEPI = (id: string) => {
        approveDevolutionEPI({
            id,
      });
    };
  
    useEffect(() => {
      setFilteredDevolutions(
        devolutions?.filter((devolution: Devolucao) => {
        return !devolution.adminAprovacaoId
        })
      );
    }, [devolutions]);
  
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
        </div>
        <div className="grid grid-cols-3 gap-10  self-center">
          {isGettingDevolution ? (
            <p className="text-white">"Carregando Retiradas"</p>
          ) : (
            filteredDevolutions?.map((data: Devolucao, index: any) => (
              <div className="w-[20rem] h-70 flex flex-col justify-between gap-2 bg-[#2B2B2B] rounded-lg shadow p-2 pt-4">
                <div className="flex gap-2">
                  <img
                    className="bg-neutral-500 w-40 h-40 shrink-0 rounded-lg"
                    src={data.retirada.epi.fotoUrl || "https://via.placeholder.com/150"}
                    alt=""
                  />
                  <div className="flex flex-col" key={index}>
                    <p className="text-white text-xl">EPI:</p>
                    <span className="font-bold text-[#3984F3] italic text-base">
                      {data.retirada.epi.nome}
                    </span>
                    <p className="text-[#3984F3] text-sm m-2">
                      Validade:{" "}
                      {data.retirada.epi.dataValidade
                        ? new Date(data.retirada.epi.dataValidade).toLocaleDateString("pt-BR")
                        : "N/A"}
                    </p>
                    <p className="text-white text-xl">Funcionário:</p>
                    <p className="text-[#3984F3] text-sm m-2">
                      {data.retirada.funcionario.nome}
                    </p>
                    <p className="text-[#3984F3] text-sm m-2">
                      Retirada: {data.retirada.dataRetirada
                        ? new Date(data.retirada.dataRetirada).toLocaleDateString("pt-BR")
                        : "N/A"}
                    </p>
                    <p className="text-[#3984F3] text-sm m-2">
                      Devolução: {data.dataDevolucao
                        ? new Date(data.dataDevolucao).toLocaleDateString("pt-BR")
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
                  <Button
                    disabled={isDevolvingEPI}
                    variant="outlined"
                    startIcon={<CheckCircle />}
                    onClick={() => {
                      handleApproveRequestEPI(data.id);
                    }}
                  >
                    Aprovar Devolução
                  </Button>
                </Stack>
              </div>
            )) 
          )  
        }
        {
          filteredDevolutions?.length === 0 && (
            <p className="text-white text-xl">Nenhuma devolução para aprovar</p>
          )
        }
        </div>
      </Stack>
    );
  };

export default Devolution