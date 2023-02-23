import React from 'react';

import modalOverlayStyles from './modal.module.css';

export const ModalOverlay = ({ onClick }) => {

    return (

        <div className={modalOverlayStyles.modal__overlay} onClick={onClick}></div>
    );

}