import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import LayoutApp from "../components/LayoutApp";
import Root from "../pages/Root";

const MainRoutes = () => {
    return (
        <BrowserRouter basename={routes.BaseName}>
            <Routes>
                <Route path={routes.Root} element={<LayoutApp />}>
                    <Route path={routes.Root} element={<Root />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes