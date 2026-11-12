# Certum360 Landing

[Español](#español) · [English](#english)

## Español

Página de presentación de Certum360, una plataforma de gestión de riesgos y cumplimiento. El visitante puede conocer cómo se organizan las evaluaciones y el seguimiento de riesgos, comparar los planes Essential, Professional y Enterprise, y contactar al equipo de ventas por correo electrónico.

### Interfaz y contenido

La página está construida con Angular 21, TypeScript y Tailwind CSS 4. Incluye navegación por secciones, menú móvil y temas claro y oscuro.

El [componente de la landing](src/app/pages/landing/) reúne los textos, los planes, la plantilla HTML y los estilos de la página. El repositorio incluye [capturas de la plataforma](public/images/landing/) en ambos temas. La galería está desactivada en la configuración actual del componente.

### Desarrollo local

Con Node.js 22.12 o una versión posterior de la serie 22 y npm instalados, ejecuta desde la raíz del repositorio:

```sh
npm ci
npm start
```

Abre [localhost:4201](http://localhost:4201/). Para generar la compilación de producción, ejecuta `npm run build`.

El proyecto parte de la [plantilla Angular de TailAdmin](https://github.com/TailAdmin/free-angular-tailwind-dashboard).

## English

This landing page introduces Certum360, a risk and compliance management platform. Visitors can explore how the platform organizes assessments and tracks risks, compare the Essential, Professional, and Enterprise plans, and contact the sales team by email.

### Interface and content

The page is built with Angular 21, TypeScript, and Tailwind CSS 4. It includes section navigation, a mobile menu, and light and dark themes.

The [landing page component](src/app/pages/landing/) contains the copy, plan details, HTML template, and page styles. The repository includes [platform screenshots](public/images/landing/) in both themes. The gallery is disabled in the current component configuration.

### Local development

Install Node.js 22.12 or a later 22.x release and npm, then run these commands from the repository root:

```sh
npm ci
npm start
```

Open [localhost:4201](http://localhost:4201/). To create a production build, run `npm run build`.

The project is based on the [TailAdmin Angular template](https://github.com/TailAdmin/free-angular-tailwind-dashboard).
