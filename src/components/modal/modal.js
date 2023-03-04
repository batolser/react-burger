import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from "../modal-overlay/modal-overlay"
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modals');
export const Modal = ({ title, children, onClose }) => {

    React.useEffect(() => {
        const esc = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener('keydown', esc);
        return () => {
            document.removeEventListener('keydown', esc);
        }

    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={`${modalStyles.modal} pr-10 pl-10 pt-10 pb-15`}>
                <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>
                <div className={modalStyles.modal__btn} >
                    <CloseIcon onClick={onClose} type="primary" />
                </div>
                {children}
            </div>
        </>
        ,
        modalRoot
    );

}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
  };