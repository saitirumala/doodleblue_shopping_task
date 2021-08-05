import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, itemDetail } from "./actions/cartActions";
import { Link } from "react-router-dom";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.data
    };
    // console.log(this.props.items);
    // console.log(this.props.data);
  }

  handleClick = (id) => {
    this.props.addToCart(id);
    this.setState({
      itemAdded: this.props.itemAdded
    });
  };

  render() {
    let data = this.props.data;
    return (
      <div className="container">
        <div className="productDetail-box">
          <div className="row">
            <div className="col-md-12">
              <h3>{data.title}</h3>
            </div>
            <div className="col-md-6">
              <div className="product-img">
                <img src={data.img} alt={data.title} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-info">
                <div className="product-details">
                  <div className="title">
                    <b>Title: {data.title}</b>
                  </div>
                  <div className="title">
                    <b>Price: ₹ {data.price}</b>
                  </div>
                </div>
                <div className="proudct-footer">  
                  <button
                    className={data.inCart ? "btn btn-danger" : "btn btn-info"}
                    disabled={data.inCart}
                    onClick={() => {
                      this.handleClick(data.id);
                    }}
                  >
                    {data.inCart ? "Item in Cart" : "Add To Cart"}
                  </button>
                  <Link
                    to="/Cart"
                    className="btn btn-warning"
                    onClick={() => {
                      this.handleClick(data.id);
                    }}
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    data: state.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    itemDetail: (id) => {
      dispatch(itemDetail(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
