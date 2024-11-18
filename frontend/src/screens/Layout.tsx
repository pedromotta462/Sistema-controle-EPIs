import {
    Avatar,
    Badge,
    Button,
    IconButton,
    List,
    ListItemButton,
    ListSubheader,
    Menu,
    MenuItem,
    Stack,
    Typography,
  } from "@mui/material";
  import { blueGrey } from "@mui/material/colors";
  import React from "react";
  import avatar from "../assets/placeholder.svg";
  import Logo from "../assets/Logo.png";
  import {
    Settings,
    Notifications,
    Mail,
    CalendarToday,
    Menu as MenuIcon,
    FlashOn,
    People,
    BarChart,
    ArrowRight,
  } from "@mui/icons-material";
  import HomeIcon from "@mui/icons-material/Home";
  import Cookies from "js-cookie";
  import toast from "react-hot-toast";
  
  import { useNavigate, Outlet } from "react-router-dom";
import useStore from "../hooks/useStore";
  
  const Layout = () => {  
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const clearUser = useStore((state: any) => state.clearUser);

    const user = useStore((state: any) => state.user);

    const navigate = useNavigate();
  
    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number
    ) => {
      setSelectedIndex(index);
      console.log(event)
    };
  
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const logOut = () => {
      Cookies.remove("access_token");
      
      clearUser();
      
      navigate("/");
      toast.success("Até mais! 👋🏾👋🏾");
    }
  
    return (
      <div className="flex items-start justify-start h-[100dvh] w-full bg-[#161717]">
        <div className="flex flex-col items-center justify-start h-full w-[15%] bg-[#161717] border-r-2 border-[#2B2B2B]">
          <img className="m-5 justify-self-start" src={Logo} alt="user icon" />
          <div className="w-full mt-10">
            <List
              component="nav"
              subheader={
                <ListSubheader
                  component="div"
                  sx={{ backgroundColor: "transparent" }}
                >
                  <p className="text-[#D7D7D7]">Menu Principal</p>
                </ListSubheader>
              }
            >
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => {
                  handleListItemClick(event, 1);
                  navigate("/app/home");
                }}
              >
                <Stack flexDirection={"row"} gap={2}>
                  <HomeIcon color="primary" />
                  <p className="text-white">Home</p>
                </Stack>
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => {
                  handleListItemClick(event, 2)
                  navigate("/app/estoque");
                }}
              >
                <Stack flexDirection={"row"} gap={2}>
                  <FlashOn color="primary" />
                  <p className="text-white">Estoque</p>
                </Stack>
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => {
                  handleListItemClick(event, 3);
                  navigate("/app/funcionarios");
                }}
              >
                <Stack flexDirection={"row"} gap={2}>
                  <People color="primary" />
                  <p className="text-white">Funcionários</p>
                </Stack>
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <Stack flexDirection={"row"} gap={2}>
                  <BarChart color="primary" />
                  <p className="text-white">a definir</p>
                </Stack>
              </ListItemButton>
            </List>
          </div>
          <div className="flex flex-col items-center justify-center h-[20%] w-[80%] rounded-xl bg-[#2B2B2B] mt-10">
            <p className="w-[80%] text-white mb-2">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            <Button variant="contained">
              <p className="text-white">Lembretes</p>
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start h-full w-[85%]">
          <div className="flex items-center justify-between h-[12%] w-[100%] px-10">
            <Stack alignItems={"center"} direction={"row"} gap={2}>
              <IconButton color="primary">
                <MenuIcon />
              </IconButton>
              <Typography fontSize={"24px"} className="text-white">
                Home
              </Typography>
            </Stack>
            <Stack
              className="flex items-center justify-center"
              direction={"row"}
              gap={2}
            >
              <IconButton color="primary">
                <Badge badgeContent={4} color="secondary">
                  <Mail />
                </Badge>
              </IconButton>
              <IconButton color="primary">
                <Badge badgeContent={2} color="secondary">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton color="primary">
                <Badge badgeContent={3} color="secondary">
                  <CalendarToday />
                </Badge>
              </IconButton>
              <IconButton color="primary">
                <Settings />
              </IconButton>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar sx={{ bgcolor: blueGrey[500] }}>
                  <img src={avatar} alt="user icon" />
                </Avatar>
              </IconButton>
              <Stack gap={0.5}>
                <p className="text-white text-base">{user.nome}</p>
                <p className="text-white text-xs">{user.email}</p>
              </Stack>
            </Stack>
          </div>
          <div className="flex flex-col items-center justify-center h-[90%] w-full bg-[#161717]">
            <Outlet />
          </div>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => {
            handleClose;
            navigate("/app/profile")
          }}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose;
              logOut();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  };
  
  export default Layout;
  
