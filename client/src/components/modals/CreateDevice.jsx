import React, {useContext, useEffect, useState} from 'react';
import { Modal, Button, Form, Dropdown, Row, Col} from "react-bootstrap";
import {Context} from '../../index';
import {fetchTypes, fetchBrands, createDevice} from '../../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addDevice = () => {
        const formData  = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data => onHide());
    }

     useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, []);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                   <Dropdown className="mt-3">
                       <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                       <Dropdown.Menu>
                           {device.types.map(type => 
                                <Dropdown.Item 
                                    onClick={() => device.setSelectedType(type)} 
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                       </Dropdown.Menu>
                   </Dropdown>
                   <Dropdown className="mt-3">
                       <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                       <Dropdown.Menu>
                           {device.brands.map(brand => 
                                <Dropdown.Item 
                                    onClick={() => device.setSelectedBrand(brand)} 
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                       </Dropdown.Menu>
                   </Dropdown>
                   <Form.Control
                    className="mt-3"
                    placeholder="Название устройства"
                    value={name}
                    onChange={e => setName(e.target.value)}
                   />
                   <Form.Control
                    className="mt-3"
                    placeholder="Стоимость устройства"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    type="number"
                   />
                   <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                   />
                   <hr/>
                   <Button
                    variant={"outline-dark"}
                    onClick={addInfo}
                   >
                       Добавить новое свойство
                    </Button>
                    {info.map(item =>
                        <Row key={item.number}>
                            <Col md={4} className="mt-3">
                                <Form.Control
                                    value={item.title}
                                    onChange={(e) => changeInfo('title', e.target.value, item.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4} className="mt-3">
                                <Form.Control
                                    value={item.description}
                                    onChange={(e) => changeInfo('description', e.target.value, item.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col className="mt-3">
                                <Button 
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(item.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;