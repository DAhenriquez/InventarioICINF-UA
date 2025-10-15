import { Stack, Image, Text, NavLink, Badge, Button, Table } from "@mantine/core";
import logo from "../images/Barra-superior.png"
import './Home.css'
import { Link } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import './Componentes.css'
import componentes_eliminados from "./json_files/list_componentes_eliminados";

function Componentes_eliminados(){


    const componentes=componentes_eliminados;
    const [opened, { open, close }] = useDisclosure(false);

    const rows = componentes.map((componente) => (
    <Table.Tr key={componente.id}>
        <Table.Td>{componente.id}</Table.Td>
        <Table.Td>{componente.nombre}</Table.Td>
        <Table.Td>
            <Image src={componente.imagen} w={100} h={100}></Image>
        </Table.Td>
        <Table.Td>{componente.descripción}</Table.Td>
        <Table.Td>{componente.cantidad}</Table.Td>
        <Table.Td>{componente.inventario}</Table.Td>
        <Table.Td>{componente.motivo}</Table.Td>
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
            <section className="main-contentComponentes">

                    <Table className="tableofcontent" highlightOnHover highlightOnHoverColor="#dec4b1ff" borderColor="#602f09" horizontalSpacing={"xl"} verticalSpacing={"lg"} withTableBorder withColumnBorders>
                        <Table.Thead >
                            <Table.Tr>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>ID</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Nombre</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Imagen</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Descripción</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Cantidad</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Inventario</Text></Table.Th>
                            <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Motivo/s</Text></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                
            </section>

            
        </main>
        
        </>
    )
};

export default Componentes_eliminados;