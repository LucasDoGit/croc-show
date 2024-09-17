import styles from './item.module.css'
import { MdAddBox } from "react-icons/md";
import { TbSquareMinusFilled } from "react-icons/tb";

export function CartItem(){
    return(
        <div className={styles.item}>
            <div className={styles.itemInfo}>
                <p className={styles.itemName}>Pastel de carne</p>
                <p>Qtd: 1</p>
                <p className={styles.itemValue}>R$ 18,90</p>
            </div>
            <div className={styles.buttonContainer}>
                <button>
                    <MdAddBox size={34} color="#54CC0A" />
                </button>
                <button>
                    <TbSquareMinusFilled size={34} color="#f34e26" />
                </button>
            </div>
        </div>
    )
}