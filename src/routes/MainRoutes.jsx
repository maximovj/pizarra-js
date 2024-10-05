import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

const MainRoutes = () => {
    return (
        <BrowserRouter basename={routes.BaseName}>
            <Routes>
                <Route path={routes.Root} element={<h1>Página de Home</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes