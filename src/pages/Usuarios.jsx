import { Stack, Image, Text, NavLink, Badge, Button, Table, Loader, Center } from "@mantine/core";
import logo from "/images/Barra-superior.png"
import './Home.css'
import './Componentes.css'
import { Link, useNavigate } from "react-router-dom"; 
import userIcon from "/images/Componentes/masculino.png"

// 1. IMPORTAR CONTEXTO Y HOOKS
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from "react";

function Usuarios(){

    // 2. ESTADOS
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // 3. CONTEXTO
    const { token, user, logout } = useAuth();
    const navigate = useNavigate();

    // 4. FETCH DE USUARIOS
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarios(data);
                }
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchUsuarios();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 5. MAPEO DE FILAS REALES
    const rows = usuarios.map((u) => (
        <Table.Tr key={u.id || u.rut}>
            <Table.Td>{u.rut}</Table.Td>
            <Table.Td>{u.nombre}</Table.Td>
            <Table.Td>{u.apellido}</Table.Td>
            <Table.Td>
                <Badge color={u.is_admin ? "blue" : "gray"} variant="light">
                    {u.is_admin ? "Admin" : "Estudiante"}
                </Badge>
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
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>RUT</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Nombre</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Apellido</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Rol</Text></Table.Th>
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

export default Usuarios;