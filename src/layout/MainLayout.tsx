import { Button } from "primereact/button"
import { Link, Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <div style={{ maxWidth: 1000, width: "95%", marginInline: "auto" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to={"/"}>
                    <Button label="Lista" text raised />
                </Link>

                <Link to={"/form"}>
                    <Button label="Crear" text raised />
                </Link>
            </div>


            <main style={{ margin: "40px 0" }}>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout