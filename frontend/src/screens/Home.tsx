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
    if (notifications) setNotificationsCount(notifications.length);
  }, [notifications, setNotificationsCount]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const hoje = notifications?.filter((n: Notificacao) => {
    const dataEnvio = new Date(n.dataEnvio);
    dataEnvio.setHours(0, 0, 0, 0);
    return dataEnvio.getTime() === today.getTime();
  });

  const outrosDias = notifications?.filter((n: Notificacao) => {
    const dataEnvio = new Date(n.dataEnvio);
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
        maxHeight: "calc(100vh - 32px)",
        overflowY: "auto",
      }}
      padding={4}
    >
      {isGettingNotifications && (
        <p className="text-white">Carregando notificações…</p>
      )}

      <Typography className="text-white">Hoje</Typography>
      {hoje?.length === 0 && (
        <p className="text-blue-500">Nenhuma notificação para hoje.</p>
      )}
      {hoje?.map((n: Notificacao) => (
        <div
          key={n.id}
          className="flex items-center justify-between w-full h-[10%]"
        >
          <div className="flex items-center justify-center">
            <p className="text-[#717579] text-sm mr-2">
              {new Date(n.updatedAt).toLocaleString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <Avatar
              sx={{
                bgcolor: n.tipo === "Solicitação" ? red[500] : blue[500],
              }}
              className="mr-4"
            >
              {n.tipo === "Solicitação" ? <AccessTimeFilled /> : <FlashOn />}
            </Avatar>
            <div className="flex flex-col items-start justify-between">
              <p className="text-white">{n.tipo || "Notificação"}</p>
              <p className="text-[#717579] text-xs">
                {n.mensagem || "Sem detalhes disponíveis."}
              </p>
            </div>
          </div>
        </div>
      ))}

      <Typography className="text-white">Outros dias</Typography>
      {outrosDias?.length === 0 && (
        <p className="text-blue-500">Nenhuma notificação disponível.</p>
      )}
      {outrosDias?.map((n: Notificacao) => (
        <div
          key={n.id}
          className="flex items-center justify-between w-full h-[10%]"
        >
          <div className="flex items-center justify-center">
            <p className="text-[#717579] text-sm mr-2">
              {new Date(n.updatedAt).toLocaleDateString("pt-BR")}
            </p>
            <Avatar
              sx={{
                bgcolor: n.tipo === "Solicitação" ? red[500] : blue[500],
              }}
              className="mr-4"
            >
              {n.tipo === "Solicitação" ? <AccessTimeFilled /> : <FlashOn />}
            </Avatar>
            <div className="flex flex-col items-start justify-between">
              <p className="text-white">{n.tipo || "Notificação"}</p>
              <p className="text-[#717579] text-xs">
                {n.mensagem || "Sem detalhes disponíveis."}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Stack>
  );
};

export default Home;
