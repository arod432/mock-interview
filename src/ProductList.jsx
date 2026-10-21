const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ProductList({ products }) {
  return (
    <ul className="products" aria-label="Products">
      {products.map((product) => (
        <li className="product" key={product.id}>
          <span className="category">{product.category}</span>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <strong>{priceFormatter.format(product.price)}</strong>
        </li>
      ))}
    </ul>
  );
}
