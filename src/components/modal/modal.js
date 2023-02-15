import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from'./modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalOverlay } from "../modal-overlay/modal-overlay"


export default class Modal extends React.Component {
  


    componentWillMount() {
        const root = document.createElement('div');
    
        root.id = 'react-modals';
        this.root = root;
        document.body.appendChild(this.root);
      
    }
    componentWillUnmount() {
        document.body.removeChild(this.root);
    }
    render() {
         const { title, children, onClose } = this.props;

         const esc = (e) => {
            if (e.key === "Escape") {
            onClose()
          }
        }
        
        document.addEventListener('keydown', esc)

        return ReactDOM.createPortal(
            <>
            <ModalOverlay onClick={onClose}/>
            <div className={`${modalStyles.modal} pr-10 pl-10 pt-10 pb-15`}>
                <h2 className={`${modalStyles.title} text text_type_main-large`}>{title}</h2>
              <div className={modalStyles.modal__btn} >
              <CloseIcon onClick={onClose} type="primary" />
              </div>
                    
        
                {children}
            </div>
            </>
            ,
            this.root
        );
    }
}