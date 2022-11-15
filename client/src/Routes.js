import { Routes as Rutas, Route } from "react-router-dom";
import { Detail, Form, Home, Landing } from "./pages";

const Routes = () => {
  return (
    <Rutas>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/detail/:id" element={<Detail />} />
      <Route exact path="/form" element={<Form />} />
    </Rutas>
  );
};

export default Routes;
