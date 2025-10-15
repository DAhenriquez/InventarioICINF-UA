import { Stack, Image, Text, NavLink, Badge, Button, Grid, Group, NumberInput, TextInput, Textarea, Notification, Card } from "@mantine/core";
import logo from "../images/Barra-superior.png"
import './Home.css'
import { Link, useNavigate } from "react-router";
import { useState } from 'react';
import list_componentes from './json_files/list_componentes';
import prestamos from './json_files/list_prestamos';
import list_users from './json_files/list_users';
import './Componentes.css'
import './Prestar.css'

function Prestar(){
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [rut, setRut] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [comentario, setComentario] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!id) return setError('Introduce el ID del componente');
    if (!rut) return setError('Introduce el RUT del usuario');

    const user = list_users.find(u => u.rut === String(rut));
    if (!user) return setError('RUT no registrado en el sistema');
        if (!cantidad || cantidad <= 0) return setError('Introduce una cantidad válida');

        // Buscar componente y verificar disponibilidad
        const compIndex = list_componentes.findIndex(c => c.id === Number(id));
        if (compIndex === -1) return setError('Componente no encontrado');
        const componente = list_componentes[compIndex];
        if (Number(cantidad) > componente.cantidad) return setError('No hay suficiente stock disponible');

        // Reducir stock en lista de componentes (mutación en memoria)
        list_componentes[compIndex].cantidad = componente.cantidad - Number(cantidad);

        // Añadir préstamo a la lista de préstamos (en memoria)
        const nuevoPrestamo = { rut: rut, id: Number(id), cantidad: Number(cantidad), comentario: comentario };
        prestamos.push(nuevoPrestamo);

        setSuccess(`Préstamo registrado: id ${id}, rut ${rut}, cantidad ${cantidad}`);
        // reset campos
        setId(''); setRut(''); setCantidad(1); setComentario('');

    // navega a la lista de componentes para que se vea el stock actualizado
    navigate('/home/componentes');
    }

    const handleCancel = () => {
        navigate('/home');
    }

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
                    <Image src="/src/images/masculino.png" alt="User Icon" h={80} w={"auto"} radius="md"></Image>
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
            <section className="prestar-form">
                <div style={{ maxWidth: 720, margin: '0 auto', padding: 12 }}>
                    

                    {error && <Notification color="red" mb="sm">{error}</Notification>}
                    {success && <Notification color="teal" mb="sm">{success}</Notification>}

                    <form onSubmit={handleSubmit}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                            <Text size="xl" weight={700} c="#602f09" mb="md">Prestar componente</Text>
                            <Grid>
                                <Grid.Col span={4}>
                                    <NumberInput label={<span className="labels">ID del componente</span>} value={id} onChange={(val) => setId(val)} min={1} placeholder="ID"/>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput label={<span className="labels">RUT (sin dígito verificador)</span>} value={rut} onChange={(e) => setRut(e.currentTarget.value)} placeholder="11111111" />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <NumberInput label={<span className="labels">Cantidad</span>} value={cantidad} onChange={(val) => setCantidad(val)} min={1} placeholder="1" />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Textarea label={<span className="labels">Comentario</span>}value={comentario} onChange={(e) => setComentario(e.currentTarget.value)} placeholder="Opcional" minRows={3} />
                                </Grid.Col>
                            </Grid>
                                <Grid>
                                <Grid.Col span={12}>
                                    <Group position="center" justify="center" className="buttons">
                                        <Button variant="default" onClick={handleCancel}>Cancelar</Button>
                                        <Button color="#a67753" type="submit">Prestar</Button>
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