import React, { useState } from 'react';
import { Container, Stack, Fieldset, Image, TextInput, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router';
import './Login.css'

import credenciales from './json_files/credenciales.jsx'; 

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = () => {

    if (!email || !password) {
      setError('Por favor, ingresa tu email y contraseña. email: admin@admin password: admin');
      return; 
    }
    

    const user = credenciales.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setError('');
      
      navigate('/home'); 
      
    } else {
      setError('Credenciales incorrectas. Verifica tu email y contraseña. email: admin@admin password: admin');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="Login">
      <Container w={450} h={420}>
        <Stack>
          <Fieldset style={{ borderColor: "#71675e", borderWidth: "2px", borderRadius: "5px" }}>
            <Image src="/src/images/logo_login.png" alt="Inventario ICINF UA" h={"auto"} w={380}></Image>

            <form onSubmit={handleSubmit}>
              <TextInput
                className="textinput"
                placeholder="Email"
                mt="md"
                radius={"lg"}
                variant="filled"
                size="lg"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />

              <TextInput
                className="textinput"
                placeholder="Contraseña"
                mt="md"
                radius={"lg"}
                variant="filled"
                size="lg"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />

              {error && (
                <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
              )}

              <Button
                mt="md"
                c={"white"}
                color="#71675e"
                variant="filled"
                type="submit"
              >
                Iniciar sesión
              </Button>
            </form>

          </Fieldset>
        </Stack>
      </Container>
    </div>
  );
}

export default Login;