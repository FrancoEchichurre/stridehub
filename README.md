# StrideHub
**Plataforma de E-commerce moderna y de alto rendimiento para ropa deportiva.**
Diseñada para ofrecer una experiencia de compra fluida, rápida y atractiva.

[![React](https://img.shields.io/badge/React-19.0.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Generic badge](https://img.shields.io/badge/Status-En_Desarrollo-orange?style=for-the-badge)](https://shields.io/)

[Ver Demo en Vivo](#) · [Reportar Bug](#) · [Solicitar Feature](#)

## 🎯 ¿Para qué es este proyecto?

**StrideHub** es una tienda en línea moderna diseñada para la venta de indumentaria deportiva de alta calidad.

El **propósito principal** de este proyecto es:
    1.  **Experiencia de Usuario Premium**: Ofrecer una navegación intuitiva y visualmente impactante para los clientes.
    2.  **Filtrado Inteligente**: Facilitar la búsqueda de productos mediante filtros dinámicos por marca, género y búsqueda textual.
    3.  **Gestión de Carrito**: Implementar un flujo de compra sin fricciones con un carrito de compras persistente e interactivo.

No es solo una tienda virtual; es una demostración de capacidades técnicas modernas utilizando las últimas tecnologías web.

## 📖 ¿De qué se habla en la página?

El sitio está estructurado para maximizar la conversión y la facilidad de uso. El contenido se divide en:

*   **1. Hero Section**: Carrusel interactivo y visualmente atractivo que destaca las últimas colecciones y ofertas.
*   **2. Catálogo de Productos**: Grid responsive de productos que se adapta a cualquier dispositivo.
*   **3. Funcionalidad de Filtros**:
    *   *Marcas*: Filtrado rápido por marcas líderes (Nike, Adidas, Puma, etc.).
    *   *Género*: Segmentación por Hombre, Mujer, Niños y Accesorios.
    *   *Búsqueda*: Buscador en tiempo real para encontrar productos específicos.
*   **4. Sistema de Carrito**: Gestión de estado global para agregar, eliminar y visualizar productos seleccionados.
*   **5. Navegación Moderna**: Dos variantes de cabecera (Header) adaptables, incluyendo versiones simplificadas y completas con efectos de desenfoque (backdrop-blur).

## 🛠 Tecnologías Utilizadas

Este proyecto fue construido seleccionando cuidadosamente un stack moderno para garantizar rendimiento, SEO y escalabilidad.

| Tecnología | ¿Por qué se usó? |
|:--- |:--- |
| **[Next.js 15](https://nextjs.org/)** | Utilizamos la última versión del framework de React para producción. Aprovechamos el *App Router* para una navegación optimizada y Server Components para mejor rendimiento inicial. |
| **[React 19](https://react.dev/)** | Base de la interfaz de usuario, permitiendo una arquitectura de componentes robusta y manejo de estado eficiente con Context API para filtros y carrito. |
| **[Tailwind CSS 4](https://tailwindcss.com/)** | Framework de estilos *utility-first* en su versión más reciente. Permite un diseño totalmente responsive, soporte para gradientes complejos y animaciones fluidas sin salir del HTML. |
| **[Radix UI](https://www.radix-ui.com/)** | Primitivas de UI accesibles y sin estilos (Headless UI) utilizadas para componentes complejos como menús desplegables, acordeones y diálogos, asegurando accesibilidad total. |
| **[Lucide React](https://lucide.dev/)** | Librería de iconos vectoriales moderna, ligera y consistente para toda la interfaz gráfica. |

## 📸 Galería del Proyecto

*(Espacio reservado para capturas de pantalla reales)*

| Vista Desktop | Vista Mobile |
|:---:|:---:|
| ![Desktop](https://via.placeholder.com/500x300?text=Desktop+Preview) | ![Mobile](https://via.placeholder.com/200x400?text=Mobile+Preview) |

## 📂 Estructura del Código

```
src/
├── app/          # App Router (Páginas y Layouts)
├── components/   # Piezas reusables (Header, Hero, ProductCard...)
│   ├── ui/       # Componentes base (Botones, Inputs - Shadcn/Radix)
├── contexts/     # Estado global (CartContext, FilterContext)
├── lib/          # Utilidades y datos (products.ts)
└── styles/       # Estilos globales
```

---

**Desarrollado con 💪 para StrideHub**
