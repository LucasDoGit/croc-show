"use client";
import { useContext, useState } from "react";
import styles from "./navbar.module.css";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";

import { Modal } from "@/components/Modal";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { CategoriesProps } from "@/utils/types/Product";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface NavbarProps {
   data: CategoriesProps[]
}

export function Navbar({ data }: NavbarProps) {
    const { signed } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [idDelete, setIdDelete] = useState("")
    const router = useRouter()
    
    async function handleDelete(id: string) {
        try {
            const docRef = doc(db, "categories", id);
            
            await deleteDoc(docRef).then(() => {
                toast.success("Categoria excluída")
            }).catch((err) => toast.error("Erro ao excluir categoria", err))

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao atualizar a categoria")
        }
    }

    return (
        <>
            <nav className={styles.navbar}>
                {data.map((item) => (
                    <li className={styles.categorieItem} key={item.id}>
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (signed) {
                                    router.push(`/categories/${item.id}`);
                                } else {
                                    window.location.hash = item.name;
                                }
                            }}
                        >
                            {item.name}
                        </button>
                        {signed && (
                            <button className={styles.buttonDelete} onClick={() => {
                                setShowModal(true)
                                setIdDelete(item.id)
                            }}>
                                <MdDelete size={24} color='#20170E' />
                            </button>
                        )}
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
                        <button onClick={() => handleDelete(idDelete)}>Excluir</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
