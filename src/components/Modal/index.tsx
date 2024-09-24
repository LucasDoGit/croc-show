import styles from './modal.module.css'


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({children, isOpen, onClose}: ModalProps){
    if(!isOpen) return null;

    return(
        <div className={styles.overlay} onClick={onClose}>
                <div 
                    className={styles.container} 
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
        </div>
    )
}