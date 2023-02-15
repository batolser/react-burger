import React from 'react';

import modalOverlayStyles from'./modal.module.css';


// export default class ModalOverlay extends React.Component {
  
//     componentWillMount() {
//         const root = document.createElement('div');
    
//         root.id = 'react-modals';
//         this.root = root;
//         document.body.appendChild(this.root);
//     }
//     componentWillUnmount() {
//         document.body.removeChild(this.root);
//     }
//     render() {
//          const { children, onClose } = this.props;



//         return ReactDOM.createPortal(
//             <div className="modal__overlay">
//                 <button className={modalOverlayStyles.modal} onClick={onClose}>Закрыть</button>
//                 {children}
//             </div>,
//             this.root
//         );
//     }
// }


export const ModalOverlay = ({onClose}) => {
  
    return (
        
        <div className={modalOverlayStyles.modal__overlay} onClose={onClose}></div>
    );
  
}