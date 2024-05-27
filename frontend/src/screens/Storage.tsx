import { Close, Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const Storage = () => {
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
        <div>
          <Button variant="contained">+ Novo EPI</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10  self-center">
        {Array.from(Array(6)).map((_, index) => (
          <div className="w-[20rem] h-60 flex flex-col justify-between gap-2 bg-[#2B2B2B] rounded-lg shadow p-2 pt-4">
            <div className="flex gap-2">
              <img
                className="bg-neutral-500 w-40 h-40 shrink-0 rounded-lg"
                src={
                  "https://images.tcdn.com.br/img/img_prod/1223316/luva_ldi_safetytato_ca42405_107_1_8d5670386fc7eb73fe118cc92f5e9071.jpg"
                }
                alt=""
              />
              <div className="flex flex-col" key={index}>
                <span className="font-bold text-white-700 italic text-xl">
                  Lorem, ipsum.
                </span>
                <p className="line-clamp-3 text-[#717579] text-xs m-2">CA03912</p>
                <p className="text-[#3984F3] text-sm m-2">Estoque: 10</p>
              </div>
            </div>
            <Stack
              gap={1}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button variant="outlined" startIcon={<Add />}>
                Solicitar Reposição
              </Button>
            </Stack>
          </div>
        ))}
      </div>
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
