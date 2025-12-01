import { Stack, Image, Text, NavLink, Badge, Button, Grid, Group, NumberInput, TextInput, Textarea, Notification, Card, NativeSelect, Loader, Center } from "@mantine/core";
import logo from "/images/Barra-superior.png"
import './Home.css'
import { Link, useNavigate } from "react-router-dom"; 
import { useState } from 'react';
import './Componentes.css'
import './Prestar.css'
import userIcon from '/images/Componentes/masculino.png' 

// 1. IMPORTAR CONTEXTO
import { useAuth } from '../context/AuthContext';

function Agregar(){
    const navigate = useNavigate();
    
    // Estados del formulario
    const [id, setId] = useState(''); 
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [inventario, setInventario] = useState("");
    const [descripcion, setDescripcion] = useState('');
    
    // Estado para la imagen (URL)
    const [imagenUrl, setImagenUrl] = useState('');
    
    // Feedback
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Contexto Auth
    const { token, user, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validaciones
        if (!nombre) return setError('Introduce el nombre del componente');
        if (!cantidad || cantidad <= 0) return setError('Introduce una cantidad válida');
        if (!inventario) return setError('Selecciona un inventario');
        if (!imagenUrl) return setError('Ingresa una URL de imagen');

        setLoading(true);

        try {
            const payload = {
                nombre: nombre,
                imagen: imagenUrl, 
                descripcion: descripcion,
                cantidad: Number(cantidad),
                inventario: inventario
            };
            
            if (id) payload.id = Number(id);

            const response = await fetch('https://better-missy-universidad-autonoma-de-chile-3f410c93.koyeb.app/api/componentes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(`Componente creado con éxito.`);
                
                // --- LIMPIEZA CORRECTA ---
                setId(''); 
                setNombre(''); 
                setDescripcion(""); 
                setCantidad(1); 
                setInventario(''); 
                setImagenUrl(''); 

                
                // Redirigir
                setTimeout(() => {
                    navigate('/home/componentes');
                }, 1500);
            } else {
                setError('Error al crear componente. Verifica que el ID no esté duplicado.');
                console.error(data);
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
                    <NavLink component={Link} to={'/home/prestar'} label="Prestar componentes "classNames={{label: 'navlink-label'}}/>
                    <NavLink component={Link} to={'/home/devolver'} label="Ver préstamos" classNames={{label: 'navlink-label'}}/>
                    <NavLink component={Link} to={'/home/anadir'} label="Añadir componentes" classNames={{label: 'navlink-label'}}/>
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
                            <Text size="xl" weight={700} c="#602f09" mb="md">Añadir Componente</Text>
                            <Grid>
                                <Grid.Col span={4}>
                                    <NumberInput 
                                        label={<span className="labels">ID (Opcional)</span>} 
                                        value={id} 
                                        onChange={(val) => setId(val)} 
                                        min={1} 
                                        placeholder="Auto"
                                        description="Déjalo vacío para autogenerar"
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput 
                                        label={<span className="labels">Nombre</span>} 
                                        value={nombre} 
                                        onChange={(e) => setNombre(e.currentTarget.value)} 
                                        placeholder="Ej: Arduino Uno" 
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
                                    <TextInput 
                                        label={<span className="labels">URL de la Imagen</span>} 
                                        placeholder="https://ejemplo.com/foto.png" 
                                        value={imagenUrl} 
                                        onChange={(e) => setImagenUrl(e.currentTarget.value)}
                                        withAsterisk
                                    />
                                    
                                    {imagenUrl && (
                                        <Center mt="sm">
                                            <Image 
                                                src={imagenUrl} 
                                                alt="Vista previa" 
                                                w={120} 
                                                h={120} 
                                                fit="contain" 
                                                radius="md"
                                                withPlaceholder
                                            />
                                        </Center>
                                    )}
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <NativeSelect 
                                        label={<span className="labels">Inventario</span>} 
                                        value={inventario} 
                                        onChange={(event) => setInventario(event.currentTarget.value)} 
                                        data={['', 'Oficina secretario de estudios', 'Oficina director de carrera' ]}
                                        required
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Textarea 
                                        label={<span className="labels">Descripción</span>}
                                        value={descripcion} 
                                        onChange={(e) => setDescripcion(e.currentTarget.value)} 
                                        placeholder="Descripción breve del componente..." 
                                        minRows={3} 
                                    />
                                </Grid.Col>
                                
                            </Grid>
                                <Grid>
                                <Grid.Col span={12}>
                                    <Group position="center" justify="center" className="buttons">
                                        <Button variant="default" onClick={handleCancel} disabled={loading}>Cancelar</Button>
                                        <Button color="#a67753" type="submit" loading={loading}>Agregar</Button>
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

export default Agregar;