import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap'

const Book = ({ book }) => { //중괄호 book 작성해서 정보받기
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                보기
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{book.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card>
                        <Card.Body className='book'>
                            <img src={book.thumbnail} />
                            <div>가격 : {book.price}</div>
                            <div>저자 : {book.authors}</div>
                            <hr />
                            <div>{book.contents}</div>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Book