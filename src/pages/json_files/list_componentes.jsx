import ledAmarrillo from '../../images/Componentes/ledamarillo.png';
import ledRojo from '../../images/Componentes/ledrojo.png';
import ledAzul from '../../images/Componentes/ledazul.png';
import ledNegro from '../../images/Componentes/lednegro.png';
import keypad4x4 from '../../images/Componentes/keypadmodule.png';
import lectorSD from '../../images/Componentes/lectorsd.png';
import botonVerde from '../../images/Componentes/botonverde.png';
import botonBlanco from '../../images/Componentes/botonblanco.png';
import sensorNivelAgua from '../../images/Componentes/sensornivelagua.png';
import pantalla16x2 from '../../images/Componentes/pantalla16x2.png';
import passivebuffer from '../../images/Componentes/passivebuffer.png';
import microscopioDigital from '../../images/Componentes/microscopiodigital.png';
import raspberry5 from '../../images/Componentes/raspberry5.png';




    const list_componentes= [
        {   
            id:1,
            nombre: "Led Amarillo",
            imagen: ledAmarrillo,
            descripción:"Diodo emisor de luz de color amarillo. Usado como indicador visual de estados",
            cantidad:75,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:2,
            nombre: "Led Rojo",
            imagen: ledRojo,
            descripción:"Diodo emisor de luz de color rojo. Usado como indicador visual de estados",
            cantidad:50,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:3,
            nombre: "Led Azul",
            imagen: ledAzul,
            descripción:"Diodo emisor de luz de color azul. Usado como indicador visual de estados",
            cantidad:52,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:4,
            nombre: "Led Negro",
            imagen:ledNegro,
            descripción:"Diodo emisor de luz de color negro. Usado como indicador visual de estados",
            cantidad:10,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:5,
            nombre: "Keypad module 4x4",
            imagen: keypad4x4,
            descripción:"DMódulo de entrada con 16 botones en una matriz de 4x4. Permite la entrada de datos.",
            cantidad:4,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:6,
            nombre: "Lector tarjeta SD",
            imagen: lectorSD,
            descripción:"Módulo que permite a un microcontrolador leer y escribir datos en una tarjeta SD.",
            cantidad:10,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:7,
            nombre: "Botón verde",
            imagen: botonVerde,
            descripción:"Interruptor pulsador momentáneo de color verde, utilizado para funciones de entrada generales.",
            cantidad:4,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:8,
            nombre: "Botón blanco",
            imagen: botonBlanco,
            descripción:"Interruptor pulsador momentáneo de color neutro, utilizado para funciones de entrada generales.",
            cantidad:2,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:9,
            nombre: "Sensor de nivel de agua",
            imagen: sensorNivelAgua,
            descripción:"Dispositivo que detecta la presencia y el nivel de agua.",
            cantidad:7,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:10,
            nombre: "Pantalla LCD 16x2",
            imagen: pantalla16x2,
            descripción:"Pantalla de cristal líquido que puede mostrar 16 caracteres por 2 líneas. Usada para mostrar información.",
            cantidad:3,
            inventario:"Oficina secretario de estudios"           
        },
        {
            id:11,
            nombre: "Pasive buffer",
            imagen: passivebuffer,
            descripción:"Componente que produce sonido cuando recibe una señal de onda cuadrada de un microcontrolador.",
            cantidad:12,
            inventario:"Oficina secretario de estudios"
        },
        {
            id:12,
            nombre: "Microscopio digital",
            imagen: microscopioDigital,
            descripción:"Crea imágenes amplificadas de objetos muy pequeños",
            cantidad:1,
            inventario:"Oficina director de carrera"
        },
        {
            id:13,
            nombre: "Raspberry Pi 5",
            imagen: raspberry5,
            descripción:"Microcontrolador que permite la instalación de un sistema operativo",
            cantidad:1,
            inventario:"Oficina director de carrera"
        }
    ]

export default list_componentes;