import { Table, Text, Image, Button, Badge, Stack, NavLink, Notification, Loader, Center } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from "/images/Barra-superior.png"
import './Home.css'
import './Componentes.css'
import userIcon from '/images/Componentes/masculino.png'
import { useAuth } from '../context/AuthContext';

function Prestamos(){
    const navigate = useNavigate();
    
    // Estados para datos y feedback
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    
    // Auth Context
    const { token, user, logout } = useAuth();

    // 2. CARGAR PRÉSTAMOS DE LA API
    const fetchPrestamos = async () => {
        try {
            const response = await fetch('https://better-missy-universidad-autonoma-de-chile-3f410c93.koyeb.app/api/prestamos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPrestamos(data);
            }
        } catch (error) {
            console.error("Error al cargar préstamos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchPrestamos();
    }, [token]);


    // 3. MANEJAR DEVOLUCIÓN (CONECTADO A LA API)
    const handleReturn = async (p) => {
        setErr(''); setMsg('');

        const ok = window.confirm(`¿Confirmar devolución de ${p.component?.nombre || 'componente'} prestado a ${p.user_rut}?`);
        if (!ok) return;

        try {
            // Llamada al endpoint en Laravel: PUT /api/prestamos/{id}/devolver
            const response = await fetch(`https://better-missy-universidad-autonoma-de-chile-3f410c93.koyeb.app/api/prestamos/${p.id}/devolver`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMsg('Devolución procesada correctamente. Stock actualizado.');
                fetchPrestamos(); 
            } else {
                setErr(data.error || 'Ocurrió un error al devolver');
            }

        } catch (error) {
            setErr('Error de conexión con el servidor');
        }
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 4. MAPEO DE FILAS
    const rows = prestamos.map((p) => (
        <Table.Tr key={p.id}>
            <Table.Td>{p.user_rut}</Table.Td>
            <Table.Td>{p.component_id}</Table.Td>
            <Table.Td>{p.component ? p.component.nombre : 'Componente eliminado'}</Table.Td> 
            <Table.Td>{p.cantidad}</Table.Td>
            <Table.Td>{p.comentario || '-'}</Table.Td>
            <Table.Td>
                <Button onClick={() => handleReturn(p)} className="actions" variant="filled" color="#a67753" size="xs">
                    Devolver
                </Button>
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
            <section className="main-content">
                    
                    {msg && <Notification color="teal" onClose={() => setMsg('')} mb="md">{msg}</Notification>}
                    {err && <Notification color="red" onClose={() => setErr('')} mb="md">{err}</Notification>}

                    {loading ? (
                        <Center h={300}><Loader color="brown" /></Center>
                    ) : (
                        <Table className="tableofcontent" highlightOnHover highlightOnHoverColor="#dec4b1ff" borderColor="#602f09" horizontalSpacing={"xl"} verticalSpacing={"lg"} withTableBorder withColumnBorders>
                            <Table.Thead >
                                <Table.Tr>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>RUT Alumno</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>ID Comp.</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Nombre</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Cantidad</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Comentario</Text></Table.Th>
                                <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Acciones</Text></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {prestamos.length > 0 ? rows : (
                                    <Table.Tr>
                                        <Table.Td colSpan={6} align="center">No hay préstamos activos</Table.Td>
                                    </Table.Tr>
                                )}
                            </Table.Tbody>
                        </Table>
                    )}
                
            </section>
        </main>
        </>
    )
}

export default Prestamos;