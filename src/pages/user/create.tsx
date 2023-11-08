import { ChangeEvent, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { IUser } from '../../types';
import { useUser } from '../../hooks';
import { genders } from '../../data';
import { useParams } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';

const initialUser: IUser = {
    name: '',
    lastName: '',
    age: 18,
    gender: 'Male',
    email: '',
    password: '',
};

type EventForm = ChangeEvent<HTMLInputElement> | DropdownChangeEvent | InputNumberValueChangeEvent

const CreateUserPage = () => {
    const { id } = useParams<{ id: string | undefined }>()

    const { isLoading, isError, createUser, getUser, updateUser } = useUser()

    const [user, setUser] = useState<IUser>(initialUser);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (id) updateUser(user)
        else createUser(user)

        setUser(initialUser);
    };

    const onChangeForm = (e: EventForm) => {
        const { target: { value, name } } = e
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        (async () => {
            if (id) {
                const user = await getUser(id)
                if (user) setUser(user)
            }
        })()

    }, [id])

    const renderForm = () => {
        if (isLoading) return <ProgressSpinner style={{ width: '50px', height: '50px', marginInline: "auto", display: "block" }} strokeWidth="8" animationDuration=".5s" />
        if (isError) return <p>Hubo un error :(</p>

        return <form onSubmit={handleSubmit} >
            <span className="p-float-label my-5">
                <InputText
                    className="w-full"
                    id="name"
                    type="text"
                    value={user.name}
                    onChange={onChangeForm}
                />
                <label htmlFor="name">Nombre</label>
            </span>

            <span className="p-float-label my-5">
                <InputText
                    className="w-full"
                    id="lastName"
                    type="text"
                    value={user.lastName}
                    onChange={onChangeForm}
                />
                <label htmlFor="lastName">Apellido</label>
            </span>

            <span className="p-float-label my-5">
                <InputNumber max={100} min={5} className='w-full'
                    value={user.age}
                    onValueChange={(e) => setUser({ ...user, age: e.value || 0 })} />
                <label htmlFor="age">Edad</label>
            </span>

            <span className="p-float-label my-5">
                <Dropdown
                    className="w-full"
                    value={user.gender}
                    options={genders}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                    placeholder="Seleccionar género"
                />
                <label htmlFor="age">Genero</label>
            </span>

            <span className="p-float-label my-5">
                <InputText
                    className="w-full"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={onChangeForm}
                />
                <label htmlFor="email">Correo Electrónico</label>
            </span>

            <span className="p-float-label my-5">
                <Password
                    inputClassName='w-full'
                    className="w-full"
                    id="password"
                    toggleMask
                    type="password"
                    value={user.password}
                    onChange={onChangeForm}
                />
                <label htmlFor="password">Contraseña</label>
            </span>

            <Button type="submit" label="Guardar" />
        </form>
    }
    return (
        <div style={{ maxWidth: 500, width: "95%", marginInline: "auto" }}>
            <h2>{id ? "Actualizar Usuario" : "Crear Nuevo Usuario"}</h2>

            {renderForm()}
        </div>
    )
}

export default CreateUserPage