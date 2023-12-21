import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './App.module.scss';
import Cart from './components/Cart';
import Card from './components/Card';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const itemsResponse = await Promise.resolve(
        axios.get('https://fakestoreapi.com/products', {
          params: { limit: 9 },
        }),
      );
      setItems(itemsResponse.data);
      setIsLoading(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    cartOpened
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = '');
  }, [cartOpened]);

  const onClickItem = (addedItem, status) => {
    addedItem.count = 1;
    setItems((prev) =>
      prev.map((item) =>
        item.id === addedItem.id ? { ...item, status } : item,
      ),
    );
    status
      ? setCartItems((prev) => [...prev, addedItem])
      : setCartItems((prev) => prev.filter((item) => item.id !== addedItem.id));
  };

  const cartHandler = () => {
    setCartOpened(!cartOpened);
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return isLoading ? (
      filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <Card key={item.id} item={item} clickItem={onClickItem} />
        ))
      ) : (
        <p className={styles.searchFalse}>
          Товары по запросу <span>{searchValue}</span> не найдены!
        </p>
      )
    ) : null;
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        cartOpened,
        setItems,
        setCartItems,
        setCartOpened,
      }}
    >
      <div className={styles.store}>
        {cartOpened && <Cart cartItems={cartItems} cartHandler={cartHandler} />}
        <div className={styles.wrap}>
          <nav className={`${styles.navigation} ${styles.container}`}>
            <a className={styles.logo} href="/">
              <span>React</span> Store
            </a>
            <div className={styles.menu}>
              <input
                className={styles.search}
                type="text"
                placeholder="Введите запрос"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className={styles.cart}
                onClick={() => setCartOpened(!cartOpened)}
              >
                Корзина
              </button>
            </div>
          </nav>
          <main className={styles.content}>
            <div className={styles.container}>
              <h1 className={styles.titleH1}>Наши товары</h1>
              <div className={styles.cards}>{renderItems()}</div>
            </div>
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
