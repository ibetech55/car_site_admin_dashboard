import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';

interface IMenuItems {
  label: string;
  id: string;
  children: { label: string; route: string }[];
  icon: string;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    private _renderer: Renderer2,
    private _element: ElementRef<HTMLDivElement>
  ) {}
  sideBarWidth: string = '19%';
  menuItems: IMenuItems[] = [
    {
      label: 'Admin',
      id: 'admin',
      children: [
        {
          label: 'View Admins',
          route: '/admin',
        },
        {
          label: 'Create Admin',
          route: '/create_admin',
        },
      ],
      icon: 'bx bx-shield-quarter',
    },
    {
      label: 'Users',
      id: 'users',
      children: [
        {
          label: 'View Users',
          route: '/view_users',
        },
        {
          label: 'Create Users',
          route: '/create_users',
        },
      ],
      icon: 'bx bx-user',
    },
    {
      label: 'Brands',
      id: 'brands',
      children: [
        {
          label: 'View Makes',
          route: '/brands/view_makes',
        },
        {
          label: 'View Models',
          route: '/models',
        },
        {
          label: 'Create Make',
          route: '/brands/create_make',
        },
        {
          label: 'Create Model',
          route: '/create_model',
        },
      ],
      icon: 'bx bx-purchase-tag',
    },
    {
      label: 'Cars',
      id: 'cars',
      children: [
        {
          label: 'View Cars',
          route: '/cars',
        },
      ],
      icon: 'bx bx-car',
    },
    {
      label: 'Notifications',
      id: 'notifications',
      children: [
        {
          label: 'View Notifications',
          route: '/view_notifications',
        },
        {
          label: 'Create Notification',
          route: '/view_notification',
        },
      ],
      icon: 'bx bx-bell',
    },
    {
      label: 'Auth',
      id: 'auth',
      children: [
        {
          label: 'View Auth',
          route: '/view_auth',
        },
      ],
      icon: 'bx bx-shield-plus',
    },
  ];
  handleLayout() {
    const sidebarElement = this._element.nativeElement.querySelector(
      '.layout__sidebar'
    ) as HTMLDivElement;

    if (sidebarElement.classList.contains('open')) {
      const menuOuterWrapper =
        this._element.nativeElement.querySelectorAll('.menuOuterWrapper');
      menuOuterWrapper.forEach((item) => {
        this._renderer.setStyle(item, 'height', '0px');
      });
      this._renderer.removeClass(sidebarElement, 'open');
      this._renderer.addClass(sidebarElement, 'closed');
    } else {
      this._renderer.addClass(sidebarElement, 'open');
      this._renderer.removeClass(sidebarElement, 'closed');
    }
  }
  clickMenu(idOuter: string, idInner: string) {
    const sidebarElement = this._element.nativeElement.querySelector(
      '.layout__sidebar'
    ) as HTMLDivElement;

    if (sidebarElement.classList.contains('open')) {
      const outerElement = this._element.nativeElement.querySelector(
        idOuter
      ) as HTMLDivElement;
      if (outerElement.clientHeight) {
        this._renderer.setStyle(outerElement, 'height', '0px');
      } else {
        const innerElement = this._element.nativeElement.querySelector(
          idInner
        ) as HTMLDivElement;
        this._renderer.setStyle(
          outerElement,
          'height',
          `${innerElement.clientHeight}px`
        );
      }
    }
  }
}
