import { Close, Search } from "@mui/icons-material";
import { Box, Button, Grid, Stack } from "@mui/material";
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
      ))}
    </div>
    </Stack>
  );
};

export default Storage;
