import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import {Button} from "react-bootstrap";
import {observer} from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: "#fff"}} to={SHOP_ROUTE}>Название магазина</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "#fff"}}>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Административная панель
                        </Button>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => history.push(LOGIN_ROUTE)} 
                            style={{marginLeft: '5px'}}
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                     <Nav className="ml-auto" style={{color: "#fff"}}>
                        <Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
});

export default NavBar;
