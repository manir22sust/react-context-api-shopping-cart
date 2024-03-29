import { Button, Card } from "react-bootstrap";
import { Rating } from "../components/Rating";
import { useCart } from "../hooks/useCart";

export const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = useCart();

  return (
    <div className="products">
      {/* <img src={product.image} alt="" style={{ height: "200px" }} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.inStock}</div>
      <div>{product.fastDelivery}</div>
      <div>{product.ratings}</div> */}

      <Card>
        <Card.Img variant="top" src={product.image} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>€ {product.price.split(".")[0]} </span>
            {product.fastDelivery ? (
              <div> Fast Delivery</div>
            ) : (
              <div> 4 days delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === product.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product,
                })
              }
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              disabled={!product.inStock}
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product,
                });
              }}
            >
              {!product.inStock ? "Out of Stock" : "Add to cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
