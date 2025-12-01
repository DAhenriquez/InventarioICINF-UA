import { Stack, Image, Text, NavLink, Badge, Button, Grid, Group, NumberInput, TextInput, Textarea, Notification, Card, Loader, Center } from "@mantine/core";
import logo from "/images/Barra-superior.png"
import './Home.css'
import { Link, useNavigate } from "react-router-dom"; 
import { useState } from 'react';
import './Componentes.css'
import './Prestar.css'
import userIcon from '/images/Componentes/masculino.png'

// 1. IMPORTAMOS EL CONTEXTO
import { useAuth } from '../context/AuthContext';

function Prestar(){
    const navigate = useNavigate();
    
    // Estados del formulario
    const [id, setId] = useState('');
    const [rut, setRut] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [comentario, setComentario] = useState('');
    
    // Estados de feedback
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Contexto de Auth
    const { token, user, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validaciones básicas de frontend
        if (!id) return setError('Introduce el ID del componente');
        if (!rut) return setError('Introduce el RUT del usuario');
        if (!cantidad || cantidad <= 0) return setError('Introduce una cantidad válida');

        setLoading(true);

        try {
            // 2. ENVIAMOS LOS DATOS A LARAVEL
            const response = await fetch('https://better-missy-universidad-autonoma-de-chile-3f410c93.koyeb.app/api/prestamos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rut: rut,
                    component_id: id, 
                    cantidad: cantidad,
                    comentario: comentario
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(`Préstamo registrado correctamente.`);
                
                // Limpiamos campos
                setId(''); setRut(''); setCantidad(1); setComentario('');

                setTimeout(() => {
                    navigate('/home/componentes');
                }, 1500);

            } else {
                setError(data.error || 'Error al procesar el préstamo. Verifica el ID o el Stock.');
            }

        } catch (err) {
            setError('Error de conexión con el servidor.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        navigate('/home');
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
                    <NavLink component={Link} to={'/home/prestar'} label="Prestar componentes "classNames={{label: 'navlink-label'}} />
                    <NavLink component={Link} to={'/home/devolver'} label="Ver préstamos" classNames={{label: 'navlink-label'}} />
                    <NavLink component={Link} to={'/home/anadir'} label="Añadir componentes" classNames={{label: 'navlink-label'}} />
                </Stack>
                </div>
                <div className="Logout">
                    <Button onClick={handleLogout} color="#a67753" variant="filled" fullWidth>Logout</Button>
                </div>

            </aside>
            <section className="prestar-form">
                <div style={{ maxWidth: 720, margin: '0 auto', padding: 12 }}>
                    
                    {error && <Notification color="red" mb="sm" onClose={() => setError('')}>{error}</Notification>}
                    {success && <Notification color="teal" mb="sm" onClose={() => setSuccess('')}>{success}</Notification>}

                    <form onSubmit={handleSubmit}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                            <Text size="xl" weight={700} c="#602f09" mb="md">Prestar componente</Text>
                            
                            <Grid>
                                <Grid.Col span={4}>
                                    <NumberInput 
                                        label={<span className="labels">ID del componente</span>} 
                                        value={id} 
                                        onChange={(val) => setId(val)} 
                                        min={1} 
                                        placeholder="ID"
                                        required
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput 
                                        label={<span className="labels">RUT (sin dígito verificador)</span>} 
                                        value={rut} 
                                        onChange={(e) => setRut(e.currentTarget.value)} 
                                        placeholder="11111111" 
                                        required
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <NumberInput 
                                        label={<span className="labels">Cantidad</span>} 
                                        value={cantidad} 
                                        onChange={(val) => setCantidad(val)} 
                                        min={1} 
                                        placeholder="1" 
                                        required
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Textarea 
                                        label={<span className="labels">Comentario</span>} 
                                        value={comentario} 
                                        onChange={(e) => setComentario(e.currentTarget.value)} 
                                        placeholder="Opcional (Ej: Para taller de robótica)" 
                                        minRows={3} 
                                    />
                                </Grid.Col>
                            </Grid>

                            <Grid>
                                <Grid.Col span={12}>
                                    <Group position="center" justify="center" className="buttons">
                                        <Button variant="default" onClick={handleCancel} disabled={loading}>
                                            Cancelar
                                        </Button>
                                        <Button color="#a67753" type="submit" loading={loading}>
                                            Prestar
                                        </Button>
                                    </Group>
                                </Grid.Col>
                            </Grid>
                        </Card>
                    </form>
                </div>
            </section>
        </main>
        </>
    )
};

export default Prestar;