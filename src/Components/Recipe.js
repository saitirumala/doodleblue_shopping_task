import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ADD_SHIPPING,
  SUB_SHIPPING
} from "./actions/action-types/cart-actions";
import { connect } from "react-redux";

class Recipe extends Component {
  componentDidMount() {
    // console.log(this.props.itemsInCart);
  }

  handleCheck = (e) => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.subShipping();
    }
  };

  handleRemove = (id) => {};

  render() {
    return (
      <div className="container">
        <div className="shipping">
          <div className="collection">
            <li className="collection-item">
              <label>
                <input
                  type="checkbox"
                  ref="shipping"
                  onChange={this.handleCheck}
                />
                <span>Shipping: (+ ₹ 30)</span>
              </label>
            </li>
            <li className="collection-item total">
              <b>Total: ₹ {this.props.total} </b>
            </li>
          </div>
          <Link to="/CheckoutPage" className="checkout">
            <button
              disabled={this.props.itemsInCart.length > 0 ? false : true}
              className="btn btn-success"
              onClick={this.handleRemove}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemsInCart: state.itemsInCart,
    total: state.total
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addShipping: () => {
      dispatch({ type: ADD_SHIPPING });
    },
    subShipping: () => {
      dispatch({ type: SUB_SHIPPING });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
