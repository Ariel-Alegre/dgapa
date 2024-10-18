import React, {useState, useEffect} from 'react'

import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/action';
import { useNavigate, Link } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

export default function Login() {
const dispatch = useDispatch();
const navigate = useNavigate()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [open, setOpen] = useState("");
const [auth, setAuth] = useState(null);
const [messageApi, contextHolder] = message.useMessage();

const role = useSelector(state => state.role);
const token = useSelector(state => state.token);
const [loading, setLoading] = useState(true);
const [loadingError, setLoadingError] = useState(false);
const error = () => {
  messageApi.open({
    type: "error",
    content: "el correo y/o la contraseña no coinciden",
  });
};
useEffect(() => {
   setTimeout(async () => {
     setLoading(false);
   }, 3000);
 }, []);

 const handleSubmit =  (e) => {
  e.preventDefault();
  setLoadingError(true); // Activa el indicador de carga
  setTimeout(async () => {

  try {
    if (email && password) {
      const authResult = await dispatch(login(email, password));
      setAuth(authResult);

      if (authResult) {
        if (role === 'user') {
          navigate('/');


        } else if (role === 'admin') {
          // Redirección a '/admin'
          navigate('/admin');
        }
      } else {
        error();
      }
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión', error);
  } finally {
    setLoadingError(false); // Desactiva el indicador de carga al finalizar
  }
}, 3000);

};

useEffect(() => {
  if (auth) {
    if (role === 'user') {
      navigate('/');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  }
}, [auth, role]);
  return (
    <>
             {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress color="primary"  />
        </div>
      ) : (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className={`mx-auto ${styles.logo} `}
            src={require("../../assets/img/logo-removebg.png")}
            alt="Atrading"
          />
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
          <p className="mt-10 text-center ">
            ¿Aún no tiene una cuenta?
            <Link to="/auth/register">Regístrese</Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Dirección de correo electrónico
              </label>
              <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
               placeholder="correo electrónico"
               required

               />
           
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
          {/*       <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Has olvidado tu contraseña?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
           
                   <Input.Password
                  required
                  id="password"
                  name="password"
                  type="password"
                   onChange={(e) => setPassword(e.target.value)}
        placeholder="contraseña"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              
              {loadingError ? (
                  <CircularProgress size={25} thickness={5} sx={{ color: '#fff' }} />
                ) : (
                  'Iniciar sesión'
                )}
               
              </button>
            </div>
          {contextHolder}

          </form>

          {/*    <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
      )}

    </>
  );
}
