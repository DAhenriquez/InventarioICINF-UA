import { Stack, Image, Text, NavLink, Badge, Button, Table, Modal, Grid, Group, Loader, Center } from "@mantine/core";
import logo from "/images/Barra-superior.png"
import './Home.css'
import { Link, useNavigate } from "react-router"; 
import { useDisclosure } from "@mantine/hooks";
import './Componentes.css'
import userIcon from '/images/Componentes/masculino.png'

// 1. IMPORTAMOS EL CONTEXTO Y HOOKS
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from "react";

function Componentes(){
    // Estado para controlar el modal (si lo usas a futuro)
    const [prestar_opened, { close, open }] = useDisclosure(false);
    
    // 2. ESTADOS PARA LOS DATOS Y CARGA
    const [componentes, setComponentes] = useState([]);
    const [loading, setLoading] = useState(true);

    // 3. CONTEXTO DE AUTENTICACIÓN
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    // 4. EFECTO: PEDIR DATOS AL BACKEND
    useEffect(() => {
        const fetchComponentes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/componentes', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setComponentes(data);
                } else {
                    console.error("Error al cargar componentes");
                }
            } catch (error) {
                console.error("Error de conexión:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchComponentes();
    }, [token]);

    // 5. FUNCIÓN LOGOUT
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 6. MAPEO DE LA TABLA 
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
            
            {/* Stock con color si es crítico */}
            <Table.Td>
                <Badge color={componente.cantidad > 0 ? "brown" : "red"} variant="light">
                    {componente.cantidad}
                </Badge>
            </Table.Td>
            
            <Table.Td>{componente.inventario}</Table.Td>
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
                    <Center h={400}><Loader color="brown" /></Center>
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
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                )}
                
            </section>
        </main>
        </>
    )
};

export default Componentes;