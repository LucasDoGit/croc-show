"use client";
import styles from "./navbar.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import { bebasNeue, robotoSlab } from '@/app/fonts'
import { IoAddCircle } from "react-icons/io5";

interface Category {
    id: string;
    name: string;
}

const categorias: Category[] = [
    {
        id: "1",
        name: "Pasteis",
    },
    {
        id: "2",
        name: "Drinks",
    },
];

export function Navbar() {
    const { signed } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    
    function handleEdit() {
        toast.success("Categoria editada!");
    }

    function handleAdd() {
        toast.success("Categoria cadastrada!");
    }
    
    function handleDelete() {
        toast.success("Categoria apagada!");
    }

    return (
        <>
            <nav className={styles.navbar}>
                {categorias.map((item) => (
                    <li key={item.id}>
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (signed) {
                                    setShowModal(true);
                                } else {
                                    window.location.hash = item.id;
                                }
                            }}
                        >
                            {item.name}
                        </button>
                    </li>
                ))}
                {signed && (
                    <button className={styles.buttonAdd} onClick={handleAdd}>
                        <IoAddCircle size={28} color="#FFB700"/>
                    </button>
                )}
            </nav>
            <Modal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
            >
                <div 
                    className={styles.containerModal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.textModal}>
                        <h2 className={`${bebasNeue.className}`}>EXCLUIR</h2>
                        <p className={`${robotoSlab.className}`}>Tem certeza que deseja excluir a categoria?</p>
                    </div>
                    <div className={styles.containerButtons}>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                        <button onClick={handleDelete}>Excluir</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
