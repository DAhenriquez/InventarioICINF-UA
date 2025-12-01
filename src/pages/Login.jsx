import React, { useState } from 'react';
import { Container, Stack, Fieldset, Image, TextInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router';
import './Login.css'
import logo_login from '/images/logo_login.png'
import { useAuth } from '../context/AuthContext'; 

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async () => {

    if (!email || !password) {
      setError('Por favor, ingresa tu email y contraseña.');
      return; 
    }
    
    // 4. LLAMAMOS AL BACKEND
    // La función login del context devuelve true si funcionó, o false si falló
    const exito = await login(email, password);

    if (exito) {
      setError('');
      navigate('/home'); 
    } else {
      // Si entra aquí es porque Laravel devolvió error (401 o 403)
      setError('Credenciales incorrectas o no tienes permisos. Intenta: admin@admin / admin');
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
            <Image src={logo_login} alt="Inventario ICINF UA" h={"auto"} w={380}></Image>

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
                <p style={{ color: 'red', marginTop: '10px', fontSize: '14px', textAlign: 'center' }}>{error}</p>
              )}

              <Button
                mt="md"
                c={"white"}
                color="#71675e"
                variant="filled"
                type="submit"
                loading={false} 
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