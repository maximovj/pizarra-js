import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import LayoutApp from "../components/LayoutApp";

const MainRoutes = () => {
    return (
        <BrowserRouter basename={routes.BaseName}>
            <Routes>
                <Route path={routes.Root} element={<LayoutApp />}>
                    <Route path={routes.Root} element={<h1>Página de Home</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes