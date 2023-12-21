import styles from './Cart.module.scss';
import Card from './Card';
import { IoMdClose } from 'react-icons/io';
import { useCart } from '../../hooks/useCart';
import AppContext from '../../context';
import { useContext, useState } from 'react';

const Cart = ({ cartHandler }) => {
  const { items, setItems, cartOpened, setCartOpened } = useContext(AppContext);
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);

  const onRemoveCard = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item,
      ),
    );
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  console.log(items);
  const onClickOrder = () => {
    setItems((prev) =>
      prev.map((item) => (item?.status ? { ...item, status: false } : item)),
    );
    setCartItems([]);
    setOrderComplete(!orderComplete);
  };

  const onClickMessage = () => {
    setOrderComplete(!orderComplete);
    setCartOpened(!cartOpened);
  };

  return (
    <div className={styles.cart}>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <div className={styles.cartTop}>
            <p className={styles.title}>Корзина</p>
            <IoMdClose className={styles.close} onClick={cartHandler} />
          </div>
          {cartItems.length > 0 ? (
            <>
              <div className={styles.list}>
                {cartItems.length ? (
                  cartItems.map((item) => (
                    <Card key={item.id} removeCard={onRemoveCard} item={item} />
                  ))
                ) : (
                  <h2>null</h2>
                )}
              </div>
              <div className={styles.cartBottom}>
                <div className={styles.total}>
                  <p>Итого: </p>
                  <p>{totalPrice}$</p>
                </div>
                <div className={styles.confirm}>
                  <button
                    className={styles.confirmButton}
                    onClick={onClickOrder}
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyCart}>
              <p className={styles.emptyCartText}>
                Корзина товаров пуста &#128521;
              </p>
            </div>
          )}
        </div>
      </div>
      {orderComplete && (
        <div className={styles.order}>
          <div className={styles.orderWindow}>
            <div className={styles.orderContainer}>
              <p className={styles.orderText}>Заказ успешно сформирован!</p>
              <div className={styles.orderAction}>
                <button className={styles.orderButton} onClick={onClickMessage}>
                  Отлично
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
