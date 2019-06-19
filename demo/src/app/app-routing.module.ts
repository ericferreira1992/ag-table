import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ApiComponent } from './components/pages/api/api.component';
import { DemoComponent } from './components/pages/demo/demo.component';
import { ClientSideComponent } from './components/pages/demo/client-side/client-side.component';
import { ServerSideComponent } from './components/pages/demo/server-side/server-side.component';
import { ServerSideInfinityComponent } from './components/pages/demo/server-side-infinity/server-side-infinity.component';
import { StructureAgTableComponent } from './components/pages/api/structure/structure-ag-table/structure-ag-table.component';
import { StructureAgTableBodyComponent } from './components/pages/api/structure/structure-ag-table-body/structure-ag-table-body.component';
import { StructureAgTableHeaderComponent } from './components/pages/api/structure/structure-ag-table-header/structure-ag-table-header.component';
import { StructureAgTableColComponent } from './components/pages/api/structure/structure-ag-table-col/structure-ag-table-col.component';
import { StructureAgTableRowComponent } from './components/pages/api/structure/structure-ag-table-row/structure-ag-table-row.component';
import { StructureAgTableCellComponent } from './components/pages/api/structure/structure-ag-table-cell/structure-ag-table-cell.component';
import { EventAgTableComponent } from './components/pages/api/events/event-ag-table/event-ag-table.component';
import { EventAgTableDataRenderComponent } from './components/pages/api/events/event-ag-table-data-render/event-ag-table-data-render.component';
import { EnumAgTableFilterModeComponent } from './components/pages/api/enums/enum-ag-table-filter-mode/enum-ag-table-filter-mode.component';
import { EnumAgTableFilterTypeComponent } from './components/pages/api/enums/enum-ag-table-filter-type/enum-ag-table-filter-type.component';
import { OthersCustomFilterComponent } from './components/pages/demo/others/others-custom-filter/others-custom-filter.component';
import { OthersDataRenderEventComponent } from './components/pages/demo/others/others-data-render-event/others-data-render-event.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'demo', component: DemoComponent,
        children: [
            { path: '', redirectTo: 'client-side', pathMatch: 'prefix'},
            { path: 'client-side', component: ClientSideComponent },
            { path: 'server-side', component: ServerSideComponent },
            { path: 'server-side-infinity', component: ServerSideInfinityComponent },
            { path: 'others',
                children: [
                    { path: 'custom-filter', component: OthersCustomFilterComponent },
                    { path: 'using-data-render-event', component: OthersDataRenderEventComponent },
                ]
            },
        ]
    },
    { path: 'api', component: ApiComponent,
        children: [
            { path: '', redirectTo: 'structure/ag-table', pathMatch: 'prefix'},
            { path: 'structure',
                children: [
                    { path: '', redirectTo: 'ag-table', pathMatch: 'prefix'},
                    { path: 'ag-table', component: StructureAgTableComponent },
                    { path: 'ag-table-header', component: StructureAgTableHeaderComponent },
                    { path: 'ag-table-col', component: StructureAgTableColComponent },
                    { path: 'ag-table-body', component: StructureAgTableBodyComponent },
                    { path: 'ag-table-row', component: StructureAgTableRowComponent },
                    { path: 'ag-table-cell', component: StructureAgTableCellComponent }
                ]
            },
            { path: 'events',
                children: [
                    { path: '', redirectTo: 'ag-table', pathMatch: 'prefix'},
                    { path: 'ag-table', component: EventAgTableComponent },
                    { path: 'ag-table-data-render', component: EventAgTableDataRenderComponent }
                ]
            },
            { path: 'enums',
                children: [
                    { path: '', redirectTo: 'ag-table-filter-mode', pathMatch: 'prefix'},
                    { path: 'ag-table-filter-mode', component: EnumAgTableFilterModeComponent },
                    { path: 'ag-table-filter-type', component: EnumAgTableFilterTypeComponent }
                ]
            },
        ]
    },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
