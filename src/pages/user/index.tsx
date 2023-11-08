import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useUser } from "../../hooks"
import { IUser } from "../../types";

const UserHome = () => {
    const { data, isLoading, deleteUser } = useUser()

    const confirmDeleteUser = (user: IUser) => {
        confirmDialog({
            message: 'Estas seguro de eliminar?',
            header: 'Confirmar',
            acceptClassName: 'p-button-danger',
            acceptLabel: "Si",
            icon: 'pi pi-exclamation-triangle',
            accept: () => deleteUser(user),
            reject: () => alert("CANCELADO")
        });
    };

    const actionsTemplate = (user: IUser) => {
        return (
            <>
                <Link to={`/form/${user.id}`}>
                    <Button label="Editar" rounded outlined className="mr-2" />
                </Link>
                <Button label="Eliminar" rounded outlined severity="danger" onClick={() => confirmDeleteUser(user)} />
            </>
        );
    }
    return (
        <div>
            <ConfirmDialog />
            <div className="card">
                <DataTable
                    value={data}
                    paginator
                    loading={isLoading}
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Nombre" style={{ width: '25%' }}></Column>
                    <Column field="lastName" header="Apellido" style={{ width: '25%' }}></Column>
                    <Column field="age" header="Edad" style={{ width: '25%' }}></Column>
                    <Column field="email" header="Email" style={{ width: '25%' }}></Column>
                    <Column body={actionsTemplate}></Column>
                </DataTable>
            </div>
        </div>
    )
}

export default UserHome