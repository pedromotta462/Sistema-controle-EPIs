import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Unstable_Grid2 as Grid,
    Typography,
    Button,
    Stack,
  } from "@mui/material";
import { blue } from "@mui/material/colors";
  
  import { styled } from "@mui/material/styles";
  
  const ModalStyled = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
  const Modal = ({
    title,
    open,
    onClose,
    children,
    maxWidth = "md",
    titleConfirm = "Salvar",
    titleCancel = "Cancelar",
    onConfirm,
    disabledConfirm = false,
    height = "auto",
    subtitle,
    showSaveButton = true,
    showCancelButton = true,
  }: any) => (
    <ModalStyled onClose={onClose} open={open} fullWidth maxWidth={maxWidth}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Grid container alignItems={"center"} gap={2}>
          <Grid>
            <Typography variant="h5" fontWeight={700} color="primary">
              {title}
            </Typography>
            <Typography variant="body1">{subtitle}</Typography>
          </Grid>
          <Grid
            xs={true}
            bgcolor={blue[500]}
            sx={{
              height: "8px",
              borderRadius: "93px",
            }}
          />
        </Grid>
      </DialogTitle>
      <DialogContent dividers sx={{ height }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Stack flexDirection={"row"} sx={{ paddingTop: "8px" }} gap={1}>
        {showSaveButton && (
            <Button
              autoFocus
              variant="contained"
              onClick={onConfirm}
              disabled={disabledConfirm}
            >
            {titleConfirm}
          </Button>
          )}
          { showCancelButton &&
          <Button autoFocus onClick={onClose}>
            {titleCancel}
          </Button>
          }
        </Stack>
      </DialogActions>
    </ModalStyled>
  );
  
  export default Modal;
  