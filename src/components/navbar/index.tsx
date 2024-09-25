"use client";
import { useContext, useState } from "react";
import styles from "./navbar.module.css";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";

import { Modal } from "@/components/Modal";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

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
                    <Link href={"/categories/new"} className={styles.buttonAdd}>
                        <IoAddCircle size={28} color="#FFB700"/>
                    </Link>
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
                        <h2>EXCLUIR</h2>
                        <p>Tem certeza que deseja excluir a categoria?</p>
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
