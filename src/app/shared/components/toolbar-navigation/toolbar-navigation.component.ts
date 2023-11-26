import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: []
})
export class ToolbarNavigationComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/home'],
      },
      {
        label: 'Cadastro',
        icon: 'pi pi-fw pi-file-edit',
        items: [
          {
            label: 'Usuário',
            routerLink: ['/registration-user'],
          },
          {
            label: 'Integrante',
            routerLink: ['/registration-member'],
          },
          {
            label: 'Produto',
            routerLink: ['/registration/product'],
          },
          {
            label: 'Unidade de Medida',
            routerLink: ['/registration/unitMeasure'],
          },
          {
            label: 'Grupo',
            items: [
              {
                label: 'Intgrante',
                routerLink: ['/registration/group/member'],
              },
              {
                label: 'Produto',
                routerLink: ['/registration/group/product'],
              },
              {
                label: 'Usuário',
                routerLink: ['/registration/group/user'],
              },
            ],
          },
        ],
      },
      {
        label: 'Faturamento',
        icon: 'pi pi-fw pi-money-bill',
        items: [
          {
            label: 'Pedido de Compra',
            icon: 'pi pi-fw pi-cart-plus',
            routerLink: ['/billing/purchaseOrder'],
          },
          {
            label: 'Pedido de Venda',
            icon: 'pi pi-fw pi-cart-plus',
            routerLink: ['/billing/salesOrder'],
          },
          {
            label: 'Nota Fiscal',
            icon: 'pi pi-fw pi-calculator',
            items: [
              {
                label: 'Entrada',
                icon: 'pi pi-fw pi-calculator',
                routerLink: ['/billing/entry'],
              },
              {
                label: 'Saída',
                icon: 'pi pi-fw pi-calculator',
                routerLink: ['/billing/exit'],
              },
            ],
          },
        ],
      },
      {
        label: 'Financeiro',
        icon: 'pi pi-fw pi-calculator',
        items: [
          {
            label: 'Titulo',
            items: [
              {
                label: 'Receber',
                routerLink: ['/financial/account/receive'],
              },
              {
                label: 'Pagar',
                routerLink: ['/financial/account/pay'],
              },
            ],
          },
          {
            label: 'Movimentação',
            items: [
              {
                label: 'Entrada',
                routerLink: ['/financial/movement/entry'],
              },
              {
                label: 'Saída',
                routerLink: ['/financial/movement/exit'],
              },
            ],
          }
        ],
      },
      {
        label: 'Configuração',
        icon: 'pi pi-fw pi-database',
        routerLink: ['/settings']
      }
    ];
  }

}
