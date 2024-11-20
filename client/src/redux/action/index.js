import axios from 'axios'







export const FormRegister = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/register-school', payload);
      const data= response.data

      dispatch({ type: 'SCHOOLS_SUCCESS', payload: data });

    } catch (error) {
      console.error(error);


    }
  };
};
export const ContactUs = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/api/contact-us', payload);
      const data= response.data

      dispatch({ type: 'CONTACTUS_SUCCESS', payload: data });

    } catch (error) {
      console.error(error);


    }
  };
};
export const UpdateSchool = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.put('http://localhost:3001/api/update-school', payload);
      const data = response.data;

      // Despacha la acción con los datos actualizados
      dispatch({ type: 'SCHOOLS_UPDATE_SUCCESS', payload: data });
    } catch (error) {
      // Despacha una acción en caso de error para manejar el estado en Redux
      dispatch({ type: 'SCHOOLS_UPDATE_ERROR', payload: error.message });

      // También puedes hacer un console.error para depuración
      console.error('Error actualizando la escuela:', error);
    }
  };
};


export const DeleteSchool = (schoolId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/delete-school/${schoolId}`);
      const data = response.data;

      // Despacha la acción con los datos actualizados
      dispatch({ type: 'DELETE_SUCCESS', payload: data });
    } catch (error) {
      // Despacha una acción en caso de error para manejar el estado en Redux
      dispatch({ type: 'DELETE_ERROR', payload: error.message });

      // También puedes hacer un console.error para depuración
      console.error('Error eliminando la escuela:', error);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("https://atrading-production.up.railway.app/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            token: response.data.token,
            role: response.data.role,
          },
        });

        return true; // Autenticación exitosa
      } else {
        throw new Error("Error durante el inicio de sesión.");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      return false; // Autenticación fallida
    }
  };
};