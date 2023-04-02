import React, { FC } from 'react';
import modalOverlayStyles from './modal.module.css';
import { IModalOverlayProps } from '../../services/types/types'

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {

    return (

        <div className={modalOverlayStyles.modal__overlay} onClick={onClick}></div>
    )

}

