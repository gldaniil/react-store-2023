import styles from './Card.module.scss';
import { IoMdClose } from 'react-icons/io';

const Card = ({ removeCard, item }) => {
  return (
    <div className={styles.item}>
      <img
        src={item.image}
        alt={`Артикул ${item.id}`}
        className={styles.image}
      />
      <div className={styles.itemInfo}>
        <p className={styles.text}>{item.title}</p>
        <p className={styles.price}>
          <span>Цена:</span> {item.price}$
        </p>
      </div>
      <IoMdClose className={styles.close} onClick={() => removeCard(item.id)} />
    </div>
  );
};

export default Card;
