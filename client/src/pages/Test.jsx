import React from "react";

const Tabla = () => {
  return (
    <div className="tabla-container">
      <p className="tabla-periodo">PERIODO: 2023-2024</p>
      <table className="tabla">
        <thead>
          <tr>
            <th>N°</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cecilia Alejandra De Jesús Martínez</td>
            <td>27</td>
          </tr>
          <tr>
            <td>2</td>
            <td>María del Mar Estrada Rebull</td>
            <td>38</td>
          </tr>
          <tr className="no-border">
            <td>3</td>
            <td>Estefanny Delgado Rivera</td>
            <td>32</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
