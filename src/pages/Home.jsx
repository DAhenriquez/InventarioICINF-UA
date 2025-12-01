import { Stack, Image, Text, NavLink, Badge, Button, Card, Grid } from "@mantine/core";
import logo from "/images/Barra-superior.png";
import './Home.css';
import { Link, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import userIcon from '/images/Componentes/masculino.png';

// 1. IMPORTAMOS EL CONTEXTO
import { useAuth } from '../context/AuthContext'; 

function Home() {

    const [userCount, setUserCount] = useState(0);
    const [eliminadosCount, setEliminadosCount] = useState(0);
    
    // 2. OBTENEMOS DATOS DEL CONTEXTO (Token y Usuario Logueado)
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    // 3. EFECTO PARA CARGAR DATOS REALES DE LARAVEL
    useEffect(() => {
        const fetchDatosDashboard = async () => {
            try {
                // Petición 1: Usuarios
                const resUsers = await fetch('http://127.0.0.1:8000/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                // Petición 2: Bajas
                const resBajas = await fetch('http://127.0.0.1:8000/api/bajas', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (resUsers.ok && resBajas.ok) {
                    const dataUsers = await resUsers.json();
                    const dataBajas = await resBajas.json();

                    setUserCount(dataUsers.length);
                    setEliminadosCount(dataBajas.length);
                }
            } catch (error) {
                console.error("Error cargando dashboard:", error);
            }
        };

        if (token) {
            fetchDatosDashboard();
        }
    }, [token]);


    // 4. FUNCIÓN PARA CERRAR SESIÓN CORRECTAMENTE
    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <>
            <header>
                <div className="barra-superior">
                    <Image className="logo" src={logo} alt="Logo" radius="md" h={100} w={"auto"} />
                </div>
            </header>
            <main>
                <aside className="menu-lateral">
                    <div className="user-info">
                        <Image src={userIcon} alt="User Icon" h={80} w={"auto"} radius="md" />
                        
                        <Text c="#602f09" size="lg" weight={500} mt="sm">
                            {user ? `${user.nombre} ${user.apellido}` : 'Cargando...'}
                        </Text>
                        
                        <Badge color="brown" variant="light" mt="xs">
                            {user?.is_admin ? 'Admin' : 'Estudiante'}
                        </Badge>
                    </div>

                    <div className="options">
                        <Stack className="menu-items">
                            <NavLink component={Link} to={'/home'} label="Página de inicio" classNames={{ label: 'navlink-label' }} />
                            <NavLink component={Link} to={'/home/componentes'} label="Componentes disponibles" classNames={{ label: 'navlink-label' }} />
                            <NavLink component={Link} to={'/home/prestar'} label="Prestar componentes" classNames={{ label: 'navlink-label' }} />
                            <NavLink component={Link} to={'/home/devolver'} label="Ver préstamos" classNames={{ label: 'navlink-label' }} />
                            <NavLink component={Link} to={'/home/anadir'} label="Añadir componentes" classNames={{ label: 'navlink-label' }} />
                        </Stack>
                    </div>

                    <div className="Logout">
                        <Button onClick={handleLogout} color="#a67753" variant="filled" fullWidth>
                            Logout
                        </Button>
                    </div>

                </aside>

                <section className="main-content">
                    <Grid className="cards-grid" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 200 }} >
                        <Grid.Col span={6}>
                            <Card className="card-action" shadow="sm" padding="lg" radius="md" withBorder mt="md">
                                <Text c="#602f09" size="xl" weight={700} mb="md">Usuarios registrados</Text>
                                <Text c="#602f09" size="lg" weight={500} mb="md">{userCount}</Text>
                                <Button component={Link} to={'/home/usuarios'} color="#a67753">Ver usuarios</Button>
                            </Card>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Card className="card-action" shadow="sm" padding="lg" radius="md" withBorder mt="md">
                                <Text c="#602f09" size="xl" weight={700} mb="md">Componentes dados de baja</Text>
                                <Text c="#602f09" size="lg" weight={500} mb="md">{eliminadosCount}</Text>
                                <Button component={Link} to={'/home/eliminados'} color="#a67753">Ver componentes dados de baja</Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </section>
            </main>
        </>
    )
};

export default Home;