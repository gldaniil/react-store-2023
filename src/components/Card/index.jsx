import styles from './Card.module.scss';

const Card = ({ item, clickItem }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={item.image}
        alt={`Артикул ${item.id}`}
      />
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.category}>{item.category}</p>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.cardBottom}>
          <p className={styles.price}>{item.price}$</p>
          <button
            className={`${styles.button}  ${
              !item.status ? styles.buttonAdd : styles.buttonRemove
            }`}
            onClick={() => clickItem(item, !item.status)}
          >
            {!item.status ? 'Добавить' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
