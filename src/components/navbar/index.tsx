"use client";
import { useContext, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import styles from "./navbar.module.css";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";

import { Modal } from "@/components/Modal";
import { AuthContext } from "@/context/AuthContext";
import { CategoriesProps } from "@/utils/types/Product";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

interface NavbarProps {
    data: CategoriesProps[];
}

export function Navbar({ data }: NavbarProps) {
    const { signed } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [idDelete, setIdDelete] = useState("");
    const router = useRouter();

    async function handleDelete(id: string) {
        try {
            const docRef = doc(db, "categories", id);

            await deleteDoc(docRef)
                .then(() => {
                    toast.success("Categoria excluída");
                    setShowModal(false)
                })
                .catch((err) => toast.error("Erro ao excluir categoria", err));
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao excluir categoria");
        }
    }

    return (
        <>
            <nav className={styles.navbar}>
                <Swiper
                    className={styles.swiper}
                    modules={[FreeMode]}
                    slidesPerView={2}
                    spaceBetween={10}
                    grabCursor={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {data &&
                        data.map((category) => (
                            <SwiperSlide
                                key={category.id}
                                className={styles.swiper_slide}
                            >
                                <button
                                    className={styles.swiper_link}
                                    onClick={() => {
                                        if (signed) {
                                            router.push(`/categories/${category.id}`);
                                        } else {
                                            window.location.hash = category.name;
                                        }
                                    }}
                                >
                                    {category.name}
                                </button>
                                {signed && (
                                    <button
                                        className={styles.buttonDelete}
                                        onClick={() => {
                                            setShowModal(true);
                                            setIdDelete(category.id);
                                        }}
                                    >
                                        <MdDelete size={20} color="#20170E" />
                                    </button>
                                )}
                            </SwiperSlide>
                        ))}
                    {signed && (
                        <SwiperSlide
                            className={styles.swiper_add}
                            onClick={() => router.push("/categories/new")}
                        >
                            <IoAddCircle size={28} color="#FFB700" />
                        </SwiperSlide>
                    )}
                </Swiper>
            </nav>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
