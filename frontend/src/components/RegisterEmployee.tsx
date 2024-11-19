import { Button, TextField } from '@mui/material';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useSignUpEmployee } from '../hooks/useRegisterEmployee';

const RegisterEmployee = () => {
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [email, setEmail] = useState('');
    const [dataContratacao, setDataContratacao] = useState('');

    const CleanFields = () => {
        setNome('');
        setCargo('');
        setEmail('');
        setDataContratacao('');
    }

    const {mutate: signUpEmployee, isPending: isSendingSignUpEmployee} = useSignUpEmployee({
        onSuccess: () => {
            console.log('Email enviado com sucesso!');
            toast.success('Email enviado com sucesso!');
            CleanFields();
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || "";
            toast.error("Erro ao enviar email:\n" + errorMessage);
            console.log(error);
        },
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let data: { nome: string; cargo: string; email: string; dataContratacao?: string } = {
            nome,
            cargo,
            email,
        };

        if(dataContratacao) {
            data = {...data, dataContratacao: new Date(dataContratacao).toISOString()};
        }

        signUpEmployee(data);
    };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          type='email'
          required
          onChange={(event) => setEmail(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Nome"
          variant="outlined"
          type='text'
          value={nome}
          required
          onChange={(event) => setNome(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Cargo"
          variant="outlined"
          type='text'
          value={cargo}
          required
          onChange={(event) => setCargo(event.target.value)}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <TextField
          label="Data de Contratação"
          variant="outlined"
          type="date"
          value={dataContratacao}
          onChange={(event) => setDataContratacao(event.target.value)}
          className="w-full"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Button disabled={isSendingSignUpEmployee} type="submit" variant="contained" color='success' className="text-white font-bold py-2 px-4 rounded">
        {isSendingSignUpEmployee ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  )
}

export default RegisterEmployee