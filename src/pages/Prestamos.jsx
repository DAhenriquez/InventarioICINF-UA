import { Table, Text, Image, Button, Badge, Stack, NavLink } from '@mantine/core';
import prestamos from './json_files/list_prestamos';
import list_componentes from './json_files/list_componentes';
import list_users from './json_files/list_users';
import { Notification } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from "../images/Barra-superior.png"
import './Home.css'
import './Componentes.css'


function Prestamos(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [version, setVersion] = useState(0);

    const handleReturn = (p) => {
        setErr(''); setMsg('');

        const ok = window.confirm(`Confirmar devolución de ${p.cantidad} unidad(es) del componente ID ${p.id} para RUT ${p.rut}?`);
        if (!ok) return;


        const loanIndex = prestamos.findIndex(x => String(x.rut) === String(p.rut) && Number(x.id) === Number(p.id));
        if (loanIndex === -1) {
            setErr('Préstamo no encontrado');
            return;
        }
        const loan = prestamos[loanIndex];


        const compIndex = list_componentes.findIndex(c => c.id === Number(p.id));
        if (compIndex !== -1) {
            list_componentes[compIndex].cantidad = (list_componentes[compIndex].cantidad || 0) + Number(p.cantidad);
        }

        prestamos.splice(loanIndex, 1);

        const userIndex = list_users.findIndex(u => String(u.rut) === String(p.rut));
        if (userIndex !== -1) {
            const userLoans = list_users[userIndex].prestamos_activos || [];
            const uLoanIndex = userLoans.findIndex(l => Number(l.id) === Number(p.id));
            if (uLoanIndex !== -1) {
                userLoans.splice(uLoanIndex, 1);
                list_users[userIndex].prestamos_activos = userLoans;
            }
        }

        setMsg('Devolución procesada correctamente');
        setVersion(v => v + 1);
    }



    const rows = prestamos.map((p, idx) => {
        const comp = list_componentes.find(c => c.id === Number(p.id));
        return (
            <Table.Tr key={idx}>
                <Table.Td>{p.rut}</Table.Td>
                <Table.Td>{p.id}</Table.Td>
                <Table.Td>{comp ? comp.nombre : 'Desconocido'}</Table.Td>
                <Table.Td>{p.cantidad}</Table.Td>
                <Table.Td>{p.comentario}</Table.Td>
                <Table.Td>
                    <Button onClick={() => handleReturn(p)} className="actions" variant="filled" color="#a67753">Devolver</Button>
                </Table.Td>
            </Table.Tr>
        )
    });

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
                    <section className="main-content">
        
                            <Table  className="tableofcontent" highlightOnHover highlightOnHoverColor="#dec4b1ff" borderColor="#602f09" horizontalSpacing={"xl"} verticalSpacing={"lg"} withTableBorder withColumnBorders>
                                <Table.Thead >
                                    <Table.Tr>
                                    <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>RUT</Text></Table.Th>
                                    <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>ID</Text></Table.Th>
                                    <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Nombre</Text></Table.Th>
                                    <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Cantidad</Text></Table.Th>
                                    <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Comentario</Text></Table.Th>
                                    <Table.Th><Text className="indexes" c={'#602f09'} fw={'bold'}>Acciones</Text></Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{rows}</Table.Tbody>
                            </Table>
                            {msg && <Notification color="teal" mt="md">{msg}</Notification>}
                            {err && <Notification color="red" mt="md">{err}</Notification>}
                        
                    </section>
        
                    
                </main>
                </>
    )
}

export default Prestamos;
