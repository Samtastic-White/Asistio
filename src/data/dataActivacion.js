import IlustracionPrincipal1 from "../../assets/imagenes/2.1_pantalla_activacion_cuenta/Pagina 1/ilustracion_principal";
import IlustracionPrincipal2 from "../../assets/imagenes/2.1_pantalla_activacion_cuenta/Pagina 2/ilustracion_principal";
import IlustracionPrincipal3 from "../../assets/imagenes/2.1_pantalla_activacion_cuenta/Pagina 3/ilustracion_principal";

export default [
  {
    id: '1',
    titulo: 'Gestiona tus clases',
    descripcion: 'Con Asistio puedes organizar, crear y editar tus clases, agregar eventos y mantener el control de tu institucion por completo',
    gradientColors: ['#FFF1D0', '#FFD470'], 
    gradientStart: { x: 0.5, y: 0 },
    gradientEnd: { x: 0.5, y: 1 },
    textColor: '#000000',
    Imagen: IlustracionPrincipal1,
  },
  {
    id: '2',
    titulo: 'Registra a tus Usuarios',
    descripcion: 'Con Asistio puedes registrar como usuarios a tus estudiantes  y docentes para mantener una lista ajustable, solo necesitas sus correos',
    gradientColors: ['#E4B7E5', '#CD78CE'],
    gradientStart: { x: 1, y: 0 },
    gradientEnd: { x: 0, y: 1 },
    textColor: '#ffffff',
    Imagen: IlustracionPrincipal2,
  },
  {
    id: '3',
    titulo: 'Registra la asistencia',
    descripcion: 'Con Asistio puedes tomar, editar y ver a detalle tus asistencias, ademas de exportar una lista con todos los asistentes de tu clase',
    gradientColors: ['#53BAC3', '#2563EB'],
    gradientStart: { x: 1, y: 0 },
    gradientEnd: { x: 0, y: 1 },
    textColor: '#ffffff',
    Imagen: IlustracionPrincipal3,
  },
];
