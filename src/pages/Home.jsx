import { Stack, Image, Text, NavLink, Badge, Button, Card, Grid, GridCol } from "@mantine/core";
import logo from "../images/Barra-superior.png"
import './Home.css'
import { Link } from "react-router";
import list_users from "./json_files/list_users";
import { useEffect, useState } from "react";
import list_componentes_eliminados from "./json_files/list_componentes_eliminados";
import user from '../images/Componentes/masculino.png'

function Home(){

    const [userCount, setUserCount] = useState(0);
    const [eliminadosCount, setEliminadosCount] = useState(0);

    useEffect(() => {
        const total = list_users.length;
        
        setUserCount(total);
        
    }, []); 


    useEffect(()=>{
        const cantidad_eliminados =list_componentes_eliminados.length;
        setEliminadosCount(cantidad_eliminados)
    }
    )

    return (
        <>
        <header>
            <div className="barra-superior">
                    <Image className="logo" src={logo} alt="Logo" radius="md" h={100} w={"auto"}></Image>
            </div>
        </header>
        <main>
            <aside className="menu-lateral">
                <div className="user-info">
                    <Image src={user} alt="User Icon" h={80} w={"auto"} radius="md"></Image>
                    <Text c="#602f09" size="lg" weight={500} mt="sm">Usuario</Text>
                    <Badge color="brown" variant="light" mt="xs">Rol</Badge>
                </div>
                <div className="options">
                <Stack className="menu-items">
                    <NavLink component={Link} to={'/home'} label="Página de inicio" classNames={{label: 'navlink-label'}} />
                    <NavLink component={Link} to={'/home/componentes'} label="Componentes disponibles" classNames={{label: 'navlink-label'}} />
                    <NavLink component={Link} to={'/home/prestar'} label="Prestar componentes "classNames={{label: 'navlink-label'}}/>
                    <NavLink component={Link} to={'/home/devolver'} label="Ver préstamos" classNames={{label: 'navlink-label'}}/>  
                    <NavLink component={Link} to={'/home/anadir'} label="Añadir componentes" classNames={{label: 'navlink-label'}}/> 
                </Stack>
                </div>
                <div className="Logout">
                    <Button component={Link} to="/login" color="#a67753" variant="filled" fullWidth>Logout</Button>
                </div>

            </aside>
            <section className="main-content">

                <Grid className="cards-grid" gutter={{base:5, xs:'md', md:'xl', xl:200}} >
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