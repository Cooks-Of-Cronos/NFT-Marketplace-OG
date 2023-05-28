import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'; // We'll use react-bootstrap for the Modal component, make sure to install it

const NFTModal = ({ isOpen, handleClose, nft }) => {
    return (
        <Modal show={isOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{nft.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={nft.image} alt={nft.name} />
                <p>{nft.description}</p>
                {/* You can add more metadata here */}
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
