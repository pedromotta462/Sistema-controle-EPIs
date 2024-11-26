import { FlashOn, AccessTimeFilled } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { Notificacao } from "../helpers/types";
import { getAllNotificationRequest } from "../hooks/useNotifications";
import useStore from "../hooks/useStore";
import { useEffect } from "react";

const Home = () => {
  const { data: notifications, isLoading: isGettingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotificationRequest,
  });

  const setNotificationsCount = useStore((state: any) => state.setNotificationsCount);

  useEffect(() => {
    if (notifications) {
      setNotificationsCount(notifications.length);
    }
  }, [notifications, setNotificationsCount]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const hoje = notifications?.filter((notification: Notificacao) => {
    const dataEnvio = new Date(notification.dataEnvio);
    dataEnvio.setHours(0, 0, 0, 0);
    return dataEnvio.getTime() === today.getTime();
  });

  const outrosDias = notifications?.filter((notification: Notificacao) => {
    const dataEnvio = new Date(notification.dataEnvio);
    dataEnvio.setHours(0, 0, 0, 0);
    return dataEnvio.getTime() !== today.getTime();
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
        backgroundColor: "#202020",
        maxHeight: "calc(100vh - 32px)", // Ajusta a altura máxima
        overflowY: "auto", // Permite rolagem vertical
      }}
      padding={4}
    >
      {isGettingNotifications && <p className="text-white">Carregando...</p>}
      <Typography className="text-white">Hoje</Typography>
      {hoje?.length === 0 && (
        <p className="text-blue-500">Nenhuma notificação para hoje</p>
      )}
      {hoje?.map((notification: Notificacao) => (
        <div
          key={notification.id}
          className="flex items-center justify-between w-full h-[10%]"
        >
          <div className="flex items-center justify-center">
            <p className="text-[#717579] text-sm mr-2">
              {new Date(notification.updatedAt).toLocaleString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <Avatar sx={{ bgcolor: notification.tipo === "Solicitação" ? red[500] : blue[500] }} className="mr-4">
              {notification.tipo === "Solicitação" ? (
                <AccessTimeFilled />
              ) : (
                <FlashOn />
              )}
            </Avatar>
            <div className="flex flex-col items-start justify-between">
              <p className="text-white">{notification.tipo}</p>
              <p className="text-[#717579] text-xs">{notification.mensagem}</p>
            </div>
          </div>
        </div>
      ))}

      <Typography className="text-white">Outro dia</Typography>
      {outrosDias?.length === 0 && (
        <p className="text-blue-500">Nenhuma notificação para mostrar</p>
      )}
      {outrosDias?.map((notification: Notificacao) => (
        <div
          key={notification.id}
          className="flex items-center justify-between w-full h-[10%]"
        >
          <div className="flex items-center justify-center">
            <p className="text-[#717579] text-sm mr-2">
              {new Date(notification.updatedAt).toLocaleDateString("pt-BR")}
            </p>
            <Avatar sx={{ bgcolor: notification.tipo === "Solicitação" ? red[500] : blue[500] }} className="mr-4">
              {notification.tipo === "Solicitação" ? (
                <AccessTimeFilled />
              ) : (
                <FlashOn />
              )}
            </Avatar>
            <div className="flex flex-col items-start justify-between">
              <p className="text-white">{notification.tipo}</p>
              <p className="text-[#717579] text-xs">{notification.mensagem}</p>
            </div>
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default Home;
