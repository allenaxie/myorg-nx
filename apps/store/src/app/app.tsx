// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { Banner } from '@myorg/common-ui';
import { exampleProducts } from '@myorg/products';

export function App() {
  return (
    <>
      <NxWelcome title="store" />
      <Banner text='welcome to the store!'/>
      <ul>
        {exampleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>Price: {product.price}</span>
          </li>
        ))}
      </ul>
      <div />
    </>
  );
}

export default App;
