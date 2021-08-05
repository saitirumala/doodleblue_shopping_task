import React, { Component } from "react";
import { Link } from "react-router-dom";
import { addQuantity, subQuantity, removeItem } from "./actions/cartActions";
import { FaRegCaretSquareDown, FaRegCaretSquareUp } from "react-icons/fa";
import { connect } from "react-redux";
import Recipe from "./Recipe";

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsInCart: this.props.items
    };
    // console.log(this.props.items);
  }

  handleRemove = (id) => {
    this.props.removeItem(id);
  };

  handleAddQuantity = (id) => {
    this.props.addQuantity(id);
  };

  handleSubtractQuantity = (id, index) => {
    this.props.subQuantity(id);
  };

  render() {
    let itemsInCart = this.props.items.length ? (
      this.props.items.map((item) => {
        return (
          <li className="cart-item" key={item.id}>
            <div className="item-img">
              <img src={item.img} alt={item.img} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>

              <p>
                <b>Price: ₹ {item.price}</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link
                  to="/cart"
                  onClick={() => {
                    this.handleAddQuantity(item.id);
                  }}
                >
                  <FaRegCaretSquareUp />
                </Link>
                <Link
                  to="/cart"
                  onClick={() => {
                    this.handleSubtractQuantity(item.id);
                  }}
                >
                  <FaRegCaretSquareDown />
                </Link>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.handleRemove(item.id);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p className="empty-cart">Cart is Empty</p>
    );

    return (
      <div className="container">
        <div className="cart">
          <h3 className="cart-title">Your Cart Item</h3>
          <ul className="collection">{itemsInCart}</ul>
        </div>
        <Recipe />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.itemsInCart,
    quantity: state.quantity
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (id) => {
      dispatch(addQuantity(id));
    },
    removeItem: (id) => {
      dispatch(removeItem(id));
    },
    subQuantity: (id) => {
      dispatch(subQuantity(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
