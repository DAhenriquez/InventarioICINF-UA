import { Stack, Image, Text, NavLink, Badge, Button, Table, Loader, Center } from "@mantine/core";
import logo from "/images/Barra-superior.png"
import './Home.css'
import { Link, useNavigate } from "react-router-dom"; 
import './Componentes.css'
import userIcon from '/images/Componentes/masculino.png'

// 1. IMPORTAMOS CONTEXTO Y HOOKS
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from "react";

function Componentes_eliminados(){

    // 2. ESTADOS
    const [componentes, setComponentes] = useState([]);
    const [loading, setLoading] = useState(true);

    // 3. CONTEXTO
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    // 4. FETCH DE BAJAS
    useEffect(() => {
        const fetchBajas = async () => {
            try {
                // Usamos el endpoint que creamos previamente
                const response = await fetch('https://better-missy-universidad-autonoma-de-chile-3f410c93.koyeb.app/api/bajas', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setComponentes(data);
                }
            } catch (error) {
                console.error("Error al cargar bajas:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchBajas();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 5. MAPEO DE FILAS
    const rows = componentes.map((componente) => (
        <Table.Tr key={componente.id}>
            <Table.Td>{componente.id}</Table.Td>
            <Table.Td>{componente.nombre}</Table.Td>
            <Table.Td>
                <Image 
                    src={componente.imagen.startsWith('http') ? componente.imagen : `/images/Componentes/${componente.imagen}`}
                    w={80} 
                    h={80} 
                    fit="contain"
                    fallbackSrc="https://placehold.co/100?text=Sin+Imagen"
                />
            </Table.Td>
            <Table.Td>{componente.descripcion || componente.descripción}</Table.Td>
            <Table.Td>{componente.cantidad}</Table.Td>
            <Table.Td>{componente.inventario}</Table.Td>
            <Table.Td>
                <Badge color="red" variant="outline">{componente.motivo}</Badge>
            </Table.Td>
        </Table.Tr>
    ));

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
                    <Image src={userIcon} alt="User Icon" h={80} w={"auto"} radius="md"></Image>
                    
                    <Text c="#602f09" size="lg" weight={500} mt="sm">
                        {user ? `${user.nombre} ${user.apellido}` : 'Cargando...'}
                    </Text>
                    <Badge color="brown" variant="light" mt="xs">
                        {user?.is_admin ? 'Admin' : 'Usuario'}
                    </Badge>
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
                    <Button onClick={handleLogout} color="#a67753" variant="filled" fullWidth>Logout</Button>
                </div>

            </aside>
            <section className="main-contentComponentes">
                    
                    {loading ? (
                        <Center h={300}><Loader color="brown" /></Center>
                    ) : (
                        <Table className="tableofcontent" highlightOnHover highlightOnHoverColor="#dec4b1ff" borderColor="#602f09" horizontalSpacing={"xl"} verticalSpacing={"lg"} withTableBorder withColumnBorders>
                            <Table.Thead >
                                <Table.Tr>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>ID</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Nombre</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Imagen</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Descripción</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Cantidad</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Inventario</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Motivo</Text></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {componentes.length > 0 ? rows : (
                                    <Table.Tr>
                                        <Table.Td colSpan={7} align="center">No hay componentes dados de baja</Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    )}
                
            </section>
        </main>
        </>
    )
};

export default Componentes_eliminados;