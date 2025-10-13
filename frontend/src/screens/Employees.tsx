import { CalendarMonth, Mail, Search } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployeesRequest } from "../hooks/useEmployees";
import { Employee } from "../helpers/types";
import CustomModal from "../components/CustomModal";
import { useState } from "react";
import RegisterEmployee from "../components/RegisterEmployee";

const Employees = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: employees, isLoading: isGettingUsers } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getAllEmployeesRequest(),
  });

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
        maxHeight: "calc(100vh - 32px)",
        overflowY: "auto",
      }}
      padding={4}
    >
      {/* Barra de busca + botão novo funcionário */}
      <div className="flex items-start justify-between w-full">
        <form className="form relative">
          <input
            className="bg-[#2B2B2B] w-[400px] input rounded-full px-4 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
            placeholder="Buscar funcionário..."
            type="text"
            required
          />
          <button
            type="submit"
            className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
          >
            <Search sx={{ color: grey[500] }} />
          </button>
        </form>
        <div>
          <Button variant="contained" onClick={handleOpen}>
            + Novo Funcionário
          </Button>
        </div>
      </div>

      {/* Listagem de funcionários */}
      <div className="grid grid-cols-3 gap-10 self-center">
        {isGettingUsers ? (
          <p className="text-white">Carregando funcionários...</p>
        ) : (
          employees?.map((data: Employee, index: number) => (
            <div
              key={index}
              className="profile-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-[#2B2B2B] flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
            >
              <div className="avatar w-full pt-5 flex items-center justify-center flex-col gap-1">
                <div className="img_container w-full flex items-center justify-center relative">
                  <img
                    src={
                      data.profilePicture ||
                      "https://i.postimg.cc/Qd0LJMrD/Download-Avatar-Icon-Placeholder-Royalty-Free-Vector-Graphic.jpg"
                    }
                    alt={`Foto de ${data.nome}`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="headings *:text-center *:leading-4">
                <p className="text-xl font-serif font-semibold text-[#ffff]">
                  {data.nome}
                </p>
                <p className="text-sm font-semibold text-[#f2f2f2]">
                  {data.cargo || "Cargo não informado"}
                </p>
              </div>

              <div className="w-full items-center justify-center flex">
                <ul className="flex flex-col items-start gap-2 has-[:last]:border-b-0 *:inline-flex *:gap-2 *:items-center *:justify-center *:border-b-[1.5px] *:border-b-stone-700 *:border-dotted *:text-xs *:font-semibold *:text-[#ffff] pb-3">
                  <li>
                    <Mail />
                    Email:&nbsp;
                    <p>{data.email || "Não informado"}</p>
                  </li>
                  <li>
                    <CalendarMonth />
                    Contratação:&nbsp;
                    <p>
                      {data.dataContratacao
                        ? new Date(data.dataContratacao).toLocaleDateString(
                            "pt-BR"
                          )
                        : "Data não informada"}
                    </p>
                  </li>
                </ul>
              </div>
              <hr className="w-full group-hover:h-5 h-3 bg-[#3984F3] transition-all duration-300" />
            </div>
          ))
        )}
      </div>

      {/* Modal de cadastro */}
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
            <h2 className="text-bold text-2xl m-2 text-center">
              Cadastrar novo funcionário
            </h2>
            <p className="text-center text-gray-600">
              Preencha o formulário abaixo:
            </p>
            <div className="w-full m-2">
              <RegisterEmployee />
            </div>
          </div>
        </>
      </CustomModal>
    </Stack>
  );
};

export default Employees;
