const logo = "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/free-logo-space-template-design-39cac50098804820776e4efc76d5eb85_screen.jpg?ts=1586864091";

export const registerEmployeeTemplate = (newPassword) => { return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            width: 150px;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #333;
        }
        .content {
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin: 20px 0;
        }
        .content a.button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .content a.button:hover {
            background-color: #0056b3;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #999;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src=${logo} alt="Logo">
            <h1>Registro de Usuário</h1>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para registrar você no nosso sistema associada ao seu endereço de e-mail.</p>
            <p>Seu Login para entrar no sistema é este email.</p>
            <p>Sua senha para entrar no sistema é: <strong>${newPassword}</strong></p>
            <p>Para redefinir sua senha, logue no app com essa nova senha e redefina sua senha na aba de perfil</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Croco Academy. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
}

export const recoveryEmailTemplate = (newPassword) => { return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            width: 150px;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #333;
        }
        .content {
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin: 20px 0;
        }
        .content a.button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .content a.button:hover {
            background-color: #0056b3;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #999;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src=${logo} alt="Logo">
            <h1>Recuperação de Senha</h1>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir a senha associada ao seu endereço de e-mail.</p>
            <p>Redefinimos sua senha para: <strong>${newPassword}</strong></p>
            <p>Para redefinir sua senha, logue no app com essa nova senha e redefina sua senha na aba de perfil</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Croco Academy. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
}

export const supportEmailTemplate = (message) => { return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header img {
            width: 150px;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #333;
        }
        .content {
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
            margin: 20px 0;
        }
        .content a.button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .content a.button:hover {
            background-color: #0056b3;
        }
        .content p strong {
            color: #333;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #999;
        }
        .footer p {
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src=${logo} alt="Logo">
            <h1>Contato de Suporte</h1>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação de suporte associada ao seu endereço de e-mail.</p>
            <p>Gostariamos de informar que nossa equipe está trabalhando no seu pedido!</p>
            <p>Esta foi a mensagem que você enviou:</p>
            <p><strong>${message}</strong></p>
            <p>Em breve entraremos em contato com você.</p>
            <p>Fique atento ao seu e-mail. Olhe sempre a aba de spam!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Croco Academy. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
}