import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import LayoutApp from "../components/LayoutApp";
import DrawingApp from "../components/DrawingApp";

const MainRoutes = () => {
    return (
        <BrowserRouter basename={routes.BaseName}>
            <Routes>
                <Route path={routes.Root} element={<LayoutApp />}>
                    <Route path={routes.Root} element={<DrawingApp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes