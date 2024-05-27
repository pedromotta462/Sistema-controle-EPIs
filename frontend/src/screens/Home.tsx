import { FlashOn, AccessTimeFilled  } from "@mui/icons-material";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";

const Home = () => {
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
        backgroundColor: "#202020",
        maxHeight: "calc(100vh - 32px)", // Ajusta a altura máxima
        overflowY: "auto", // Permite rolagem vertical
      }}
      padding={4}
    >
      <Typography className="text-white">Hoje</Typography>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: blue[500]}} className="mr-4">
            <FlashOn />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: red[500]}} className="mr-4">
            <AccessTimeFilled />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: blue[500]}} className="mr-4">
            <FlashOn />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: blue[500]}} className="mr-4">
            <FlashOn />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: blue[500]}} className="mr-4">
            <FlashOn />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: blue[500]}} className="mr-4">
            <FlashOn />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <Typography className="text-white">Ontem</Typography>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: blue[500]}} className="mr-4">
            <FlashOn />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: red[500]}} className="mr-4">
            <AccessTimeFilled />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>

      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: red[500]}} className="mr-4">
            <AccessTimeFilled />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
      <div className="flex items-center justify-between w-full h-[10%]">
        <div className="flex items-center justify-center">
          <p className="text-[#717579] text-sm mr-2">2 minutos</p>
          <Avatar sx={{bgcolor: red[500]}} className="mr-4">
            <AccessTimeFilled />
          </Avatar>
          <div className="flex flex-col items-start justify-between">
            <p className="text-white">Lorem ipsum dolor sit amet.</p>
            <p className="text-[#717579] text-xs">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <Button variant="outlined" size="large">Abrir</Button>
      </div>
    </Stack>
  );
};

export default Home;
