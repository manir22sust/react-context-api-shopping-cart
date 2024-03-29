import { useState, useEffect } from "react";

import {
  Button,
  Col,
  FormControl,
  ListGroup,
  ListGroupItem,
  Row,
  Image,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

import { Rating } from "../components/Rating";
import { useCart } from "../hooks/useCart";

export const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useCart();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroupItem key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Image />
                <Col md={2}>
                  <span>{prod.name} </span>
                </Col>
                <Col md={2}>
                  <span>€{prod.price} </span>
                </Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <FormControl
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1} </option>
                    ))}
                  </FormControl>
                </Col>

                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: € {total} </span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};
