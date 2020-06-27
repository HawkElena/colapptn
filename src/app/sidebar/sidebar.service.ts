import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Menu General',
      type: 'header'
    },

    // Gestion de matriculas
    {
      title: 'Gestión de matrículas',
      icon: 'fa fa-briefcase',
      active: false,
      type: 'dropdown',
      // badge: {
      //   text: 'New ',
      //   class: 'badge-warning'
      // },
      submenus: [
        {
          title: 'Alumno',
          pathsubmenu: '/perfilAlumno',
          icon: 'fa fa-user-graduate',
          // badge: {
          //   text: 'Pro ',
          //   class: 'badge-success'
          // }
        },
        {
          title: 'Encargado',
          pathsubmenu: '/encargado',
          icon: 'fa fa-user-tie'
        },
        {
          title: 'Inscripcion',
          pathsubmenu: '/inscripcion',
          icon: 'fa fa-id-card'
        },
      ]
    },
    // Gestion Academica
    {
      title: 'Gestión académica',
      icon: 'fa fa-briefcase',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Horarios',
          pathsubmenu: '/perfilEmpleado',
          icon: 'fa fa-user-graduate',
        },
        {
          title: 'Consulta',
          pathsubmenu: '/encargado',
          icon: 'fa fa-user-tie'
        },

      ]
    },
    // Gestion laboral
    {
      title: 'Gestión laboral',
      icon: 'fa fa-briefcase',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Empleado',
          pathsubmenu: '/perfilEmpleado',
          icon: 'fa fa-user-tie'
        },
        {
          title: 'Planillas',
          pathsubmenu: '/encargado',
          icon: 'fa fa-file-invoice'
        },
      ]
    },
    //Gestion de pagos
    {
      title: 'Gestión de Pagos',
      icon: 'fa fa-coins',
      active: false,
      type: 'dropdown',

      submenus: [
        {
          title: 'Pago de alumnos',
          pathsubmenu: '/pago',
          icon:'fa fa-cash-register'
        },
        {
          title: 'Pago a colaboradores',
          pathsubmenu: '/home',
          icon:'fa fa-money-bill-alt'
        }

      ]
    },
    // Configuracion
    {
      title: 'Configuración',
      icon: 'fa fa-cog',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Parámetros generales',
          pathsubmenu: '/configuracion',
          icon:'fa fa-cogs'
        }

      ]
    },
    // Reporteria
    {
      title: 'Reportes',
      icon: 'fa fa-chart-line',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Reportes',
          pathsubmenu: '/reporte',
          icon:'fa fa-chart-bar'
        }
      ]
    },
    // Seguridad
    {
      title: 'Seguridad',
      icon: 'fa fa-users-cog',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'roles',
          pathsubmenu: '/home',
          icon:'fa fa-user-tag'
        },
        {
          title: 'Usuarios',
          pathsubmenu: '/login',
          icon:'fa fa-users'
        }
      ]
    },
    // login
    {
      title: 'Login',
      icon: 'fa fa-sign-in-alt',
      active: false,
      type: 'dropdown',
      badge: {
        text: '3',
        class: 'badge-danger'
      },
      submenus: [
        {
          title: 'Login-user',
          pathsubmenu: '/login',
          icon: 'fa fa-user',
          badge: {
            text: 'Pro ',
            class: 'badge-success'
          }
        }]
    },

    // {
    //   title: 'Components',
    //   icon: 'far fa-gem',
    //   active: false,
    //   type: 'dropdown'
    // },
    // {
    //   title: 'Charts',
    //   icon: 'fa fa-chart-line',
    //   active: false,
    //   type: 'dropdown'
    // },
    // {
    //   title: 'Maps',
    //   icon: 'fa fa-globe',
    //   active: false,
    //   type: 'dropdown'
    // },
    // {
    //   title: 'Extra',
    //   type: 'header'
    // },
    // {
    //   title: 'Documentation',
    //   icon: 'fa fa-book',
    //   active: false,
    //   type: 'simple',
    //   badge: {
    //     text: 'Beta',
    //     class: 'badge-primary'
    //   },
    // },
    // {
    //   title: 'Calendar',
    //   icon: 'fa fa-calendar',
    //   active: false,
    //   type: 'simple'
    // },
    // {
    //   title: 'Examples',
    //   icon: 'fa fa-folder',
    //   active: false,
    //   type: 'simple'
    // }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
