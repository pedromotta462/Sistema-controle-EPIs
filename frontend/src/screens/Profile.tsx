import { forwardRef, useRef, useState } from "react";
import useStore from "../hooks/useStore";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useChangeProfilePicture } from "../hooks/useChangeProfilePicture";
import toast from "react-hot-toast";
import { useResetPassword } from "../hooks/useAuth";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile() {
  const user = useStore((state: any) => state.user);

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [profileImage, setProfileImage] = useState(
    user.profilePicture ||
      "https://i.postimg.cc/Qd0LJMrD/Download-Avatar-Icon-Placeholder-Royalty-Free-Vector-Graphic.jpg"
  );

  const updateUser = useStore((state: any) => state.updateUserData);

  const { mutate: changePicture, isLoading: isChangingPicture } =
    useChangeProfilePicture({
      onSuccess: async (data: { url: string; fileName: string }) => {
        toast.success("Foto de perfil atualizada com sucesso!");
        const newProfilePictureUrl = data.url;
        await updateUser({ profilePicture: newProfilePictureUrl });
        setProfileImage(data.url);
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "";
        toast.error("Erro ao alterar a foto.\n" + errorMessage);
        console.log(error);
      },
    });

  const { mutate: resetPassword, isLoading: isResetingPassword } =
    useResetPassword({
      onSuccess: () => {
        toast.success("Senha redefinida com sucesso!");
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || "";
        toast.error("Erro ao redefinir a senha.\n" + errorMessage);
        console.log(error);
      },
    });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleResetPassword = () => {
    resetPassword({
      id: user.id,
      data: { senha: newPassword },
    });
    setNewPassword("");
    setShowPassword(false);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    changePicture(file);
  };

  return (
    <div className="w-[50%] bg-blue-950 py-5 px-4 sm:px-6 lg:px-8 rounded-xl">
      <div className="max-w-5xl mx-auto bg-gray-200 flex justify-center items-center rounded-lg shadow-md overflow-hidden">
        <div className="md:flex flex-col">
          {/* Avatar */}
          <div className="md:flex-shrink-0 py-4">
            <div
              className="relative w-52 h-52 cursor-pointer m-auto"
              onClick={handleImageClick}
            >
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm">Alterar foto</span>
              </div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
              {isChangingPicture && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-full">
                  <span className="text-white text-sm">Atualizando...</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Dados do usuário */}
          <div className="p-8 w-full flex flex-col justify-center items-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Perfil do Usuário
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900">
              {user.nome}
            </h1>
            <p className="mt-2 text-gray-600">{user.email}</p>
            <p className="mt-2 text-gray-600">
              {user.cargo ? user.cargo : "Administrador"}
            </p>

            {user.cargo && (
              <div className="mt-6">
                <button
                  disabled={isResetingPassword}
                  onClick={handleOpen}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isResetingPassword ? "Salvando..." : "Alterar senha"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialog alterar senha */}
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleResetPassword();
            handleClose();
          },
        }}
      >
        <DialogTitle>Alterar senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite a nova senha desejada abaixo.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Nova senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="standard"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="mostrar ou ocultar senha"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
