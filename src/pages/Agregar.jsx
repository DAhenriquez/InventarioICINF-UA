import { Stack, Image, Text, NavLink, Badge, Button, Grid, Group, NumberInput, TextInput, Textarea, Notification, Card, NativeSelect, FileInput } from "@mantine/core";
import logo from "../images/Barra-superior.png"
import './Home.css'
import { Link, useNavigate } from "react-router";
import list_componentes from "./json_files/list_componentes";
import { useState } from 'react';
import './Componentes.css'
import './Prestar.css'
import user from '../images/Componentes/masculino.png'

function Agregar(){
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [inventario, setInventario]=useState("");
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        // Validaciones simples
        if (!id) return setError('Introduce el ID del componente');
        if (!nombre) return setError('Introduce el nombre del componente');
        if (!cantidad || cantidad <= 0) return setError('Introduce una cantidad válida');
        if (!inventario) return setError('Selecciona un inventario');
        if (!descripcion) return setError('Ingresa una descripción')

        // crear objeto nuevo
        const newComponent = {
            id: Number(id),
            nombre,
            imagen: preview || '',
            descripción: descripcion,
            cantidad: Number(cantidad),
            inventario
        };

        // añadir al array importado (mutación de referencia)
        try{
            list_componentes.push(newComponent);
        } catch (err) {
            console.error('No se pudo añadir al listado:', err);
        }

        setSuccess(`Componente añadido: id ${id}, nombre ${nombre}` );
        // reset campos
        setId(''); setNombre(''); setDescripcion(""); setCantidad(0); setInventario(''); setFile(null); setPreview(null);
        // navegar a la lista de componentes para ver el nuevo item
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
            <section className="prestar-form">
                <div style={{ maxWidth: 720, margin: '0 auto', padding: 12 }}>
                    

                    {error && <Notification color="red" mb="sm">{error}</Notification>}
                    {success && <Notification color="teal" mb="sm">{success}</Notification>}

                    <form onSubmit={handleSubmit}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                            <Text size="xl" weight={700} c="#602f09" mb="md">Añadir Componente</Text>
                            <Grid>
                                <Grid.Col span={4}>
                                    <NumberInput label={<span className="labels">ID del componente</span>} value={id} onChange={(val) => setId(val)} min={1} placeholder="ID"/>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TextInput label={<span className="labels">Nombre</span>} value={nombre} onChange={(e) => setNombre(e.currentTarget.value)} placeholder="Arduino" />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <NumberInput label={<span className="labels">Cantidad</span>} value={cantidad} onChange={(val) => setCantidad(val)} min={1} placeholder="1" />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                        <FileInput withAsterisk label={<span className="labels">Imagen</span>} placeholder="Pulsa aquí" value={file} onChange={(f) => {
                                            setFile(f);
                                            if (f && f instanceof File) {
                                                const reader = new FileReader();
                                                reader.onload = (ev) => setPreview(ev.target.result);
                                                reader.readAsDataURL(f);
                                            } else {
                                                setPreview(null);
                                            }
                                        }} />
                                        {preview && <Image src={preview} alt="preview" mt="sm" w={120} h={120} />}
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <NativeSelect label={<span className="labels">Inventario</span>} value={inventario} onChange={(event) => setInventario(event.currentTarget.value)} data={['Oficina secretario de estudios', 'Oficina director de carrera' ]}></NativeSelect>
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <Textarea label={<span className="labels">Descripción</span>}value={descripcion} onChange={(e) => setDescripcion(e.currentTarget.value)} placeholder="Opcional" minRows={3} />
                                </Grid.Col>
                                
                            </Grid>
                                <Grid>
                                <Grid.Col span={12}>
                                    <Group position="center" justify="center" className="buttons">
                                        <Button variant="default" onClick={handleCancel}>Cancelar</Button>
                                        <Button color="#a67753" type="submit">Agregar</Button>
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