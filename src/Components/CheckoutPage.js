import React, { Component } from "react";
import { connect } from "react-redux";

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 100000000,
      max: 1000000000
      //   number: 1
    };
  }

  componentDidMount() {
    this.setState({
      number: this.generateNumber(this.state.min, this.state.max)
    });
  }

  generateNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  render() {
    return (
      <div id="generator">
        <div className="check-msg">
          You Ordered {this.props.quantity} items Successfully
        </div>
        <div className="rNum">Your Order Id is: {this.state.number} </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemsInCart: state.itemsInCart,
    total: state.total,
    quantity: state.quantity
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //     addShipping: () => {dispatch({type: ADD_SHIPPING})},
    //     subShipping: () => {dispatch({type: SUB_SHIPPING})}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
