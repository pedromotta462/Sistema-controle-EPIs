import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthLoginAdmin, useAuthLoginEmployee } from "../hooks/useAuth";
import { Admin, Employee } from "../helpers/types";
import useStore from "../hooks/useStore";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [showLoginAdmin, setShowLoginAdmin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useStore((state: any) => state.setUser);

  const { mutate: loginAdmin, isPending: isLoginAdmin } = useAuthLoginAdmin({
    onSuccess: (data: { user: Admin; access_token: string }) => {
      Cookies.set("access_token", data.access_token, { expires: 1 });

      setUser(data.user);

      toast.success("Login efetuado com sucesso!");

      navigate("/app/home");
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Erro desconhecido";
      toast.error("Erro ao efetuar login:\n " + errorMessage);
      console.log(error);
    },
  });

  const { mutate: loginEmployee, isPending: isLoginEmployee } = useAuthLoginEmployee({
      onSuccess: (data: { user: Employee, access_token: string }) => {
        Cookies.set("access_token", data.access_token, { expires: 1 });

        setUser(data.user);

        toast.success("Login efetuado com sucesso!");

        navigate("/app/home");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "Erro desconhecido";
        toast.error("Erro ao efetuar login:\n " + errorMessage);
        console.log(error);
      },
    });

  const onClickLogin = () => {
    if (!showLoginAdmin) {
      loginAdmin({
        email,
        password,
      });
    } else {
      loginEmployee({
        email,
        password,
      });
    }
  };

  const onClickHandler = () => {
    setShowLoginAdmin(!showLoginAdmin);
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-[#1E1F1F]">
      <div className="flex items-center justify-center w-[90%] h-[80vh] bg-[#f1f1f1] rounded shadow-xl p-0">
        <div
          className={`${
            showLoginAdmin ? "" : "transform translate-x-full"
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
            showLoginAdmin ? "" : "transform -translate-x-full"
          } flex flex-col items-center justify-center w-[50%] h-full transition-all ease-in-out duration-500`}
        >
          <h1 className="text-black font-inter font-normal text-3xl leading-16">
            Bem vindo ao <br />{" "}
            <span className="text-yellow-500">Sistema de controle de EPIs</span>
          </h1>
          <h3 className="text-[#000000] text-opacity-50 mb-[5%] font-inter font-normal text-.5xl">
            Por favor, insira seus dados.
          </h3>

            <>
              <TextField
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[70%]"
                label="Email here"
                margin="dense"
              />
              <TextField
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[70%]"
                label="Password here"
                margin="dense"
              />
            </>

          <Stack spacing={1} className="mt-5">
            <Button
              size="large"
              variant={"contained"}
              onClick={(e) => {
                e.preventDefault();
                onClickLogin();
              }}
              disabled={isLoginAdmin || isLoginEmployee}
            >
              Entrar
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                onClickHandler();
              }}
              size={`${showLoginAdmin ? "medium" : "large"}`}
              variant={"outlined"}
              className="m-5"
            >
              {showLoginAdmin ? "Login Admin" : "Login Employee"}
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default Login;
