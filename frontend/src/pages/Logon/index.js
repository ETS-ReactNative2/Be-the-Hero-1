import React, {useState} from 'react';

import './styles.css';
import '../../global.css'
import {FiLogIn} from 'react-icons/fi';
import herosImg  from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon(){
    const [id,setID] = useState();
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            console.log(response.data.name);
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua ID"
                    value={id}
                    onChange={e => setID(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link to="/register" className="back_link">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={herosImg} alt="Heroes"/>
        </div>

    );
}