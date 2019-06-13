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

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'demo', component: DemoComponent,
        children: [
            { path: '', redirectTo: 'client-side', pathMatch: 'prefix'},
            { path: 'client-side', component: ClientSideComponent },
            { path: 'server-side', component: ServerSideComponent },
            { path: 'server-side-infinity', component: ServerSideInfinityComponent }
        ]
    },
    { path: 'api', component: ApiComponent,
        children: [
            { path: 'structure',
                children: [
                    { path: 'ag-table', component: StructureAgTableComponent },
                    { path: 'ag-table-body', component: StructureAgTableBodyComponent },
                    { path: 'ag-table-header', component: StructureAgTableHeaderComponent },
                ]
            },
            /* { path: 'teste',
                children: [
                ]
            }, */
        ]
    },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
