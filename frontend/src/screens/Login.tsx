import {useState} from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {

  const history = useNavigate();

  const [showLogin, setShowLogin] = useState(true);

  const toggleRegisterForm = () => {
    setShowLogin(!showLogin);
  };
  
  return (
    <div className="flex items-center justify-center h-[100dvh] bg-[#1E1F1F]">
      <div className="flex items-center justify-center w-[90%] h-[80vh] bg-[#f1f1f1] rounded shadow-xl p-0">
        <div
          className={`${
            showLogin ? "" : "transform translate-x-full"
          } bg-[#2B6FF4] w-[50%] h-full transition-all ease-in-out duration-500 z-10`}
        >
          <img
            src="../assets/react.svg"
            alt="Imagem da logo do sistema"
            className={"rounded object-fill"}
          ></img>
        </div>
        <form
          className={`${
            showLogin ? "" : "transform -translate-x-full"
          } flex flex-col items-center justify-center w-[50%] h-full transition-all ease-in-out duration-500`}
        >
          <h1 className="text-black font-inter font-normal text-3xl leading-16">
            Bem vindo ao <br />{" "}
            <span className="text-yellow-500">Sistema de controle de EPIs</span>
          </h1>
          <h3 className="text-[#000000] text-opacity-50 mb-[5%] font-inter font-normal text-.5xl">
            Por favor, insira seus dados.
          </h3>

          {showLogin ? <>
            <TextField
              required
              type="email"
              className="w-[70%]"
              label="Email here"
              margin="dense"
            />
            <TextField
              required
              type="password"
              className="w-[70%]"
              label="Password here"
              margin="dense"
            />
          </> : <>
            <TextField
              required
              type="text"
              className="w-[70%]"
              label="Name"
              margin="dense"
            />
            <TextField
              required
              type="email"
              className="w-[70%]"
              label="Email"
              margin="dense"
            />
            <TextField
              required
              type="password"
              className="w-[70%]"
              label="Password"
              margin="dense"
            />
            <TextField
              required
              type="password"
              className="w-[70%]"
              label="Confirm password"
              margin="dense"
            />
          </>}
          <Stack spacing={1} className="mt-5">
            { showLogin ?
            <Button
              size="large"
              variant={`${showLogin ? "contained" : "outlined"}`}
              onClick={(e) => {
                e.preventDefault();
                history("/app/home");
              }}
            >
              Entrar
            </Button>
            : <></>
            }
            <Button
              onClick={(e) => {
                e.preventDefault();
                toggleRegisterForm();
              }}
              size={`${showLogin ? "medium" : "large"}`}
              variant={`${showLogin ? "outlined" : "contained"}`}
              className="m-5"
            >
              Register
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default Login;

