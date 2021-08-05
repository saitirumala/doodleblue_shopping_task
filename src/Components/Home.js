import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, itemDetail } from "./actions/cartActions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      direction: false,
      sortBtn: false,
      btnClick: false
    };
  }

  handleClick = (id) => {
    // console.log('id',id);
    this.props.addToCart(id);
    this.setState({
      itemAdded: this.props.itemAdded
    });
  };

  handleSort = () => {
    const direction = !this.state.direction;

    let items = this.state.items.sort((a, b) =>
      this.state.direction ? b.price - a.price : a.price - b.price
    );

    this.setState({
      direction,
      items,
      sortBtn: !this.state.sortBtn,
      btnClick: !this.state.btnClick
    });
  };

  handleShowItem = (id) => {
    this.props.itemDetail(id);
  };

  render() {
    let itemList = this.props.items.map((item) => {
      return (
        <div className="col-md-3" key={item.id}>
          <div className="card">
            <div className="card-img">
              <Link
                to="/ProductDetails"
                onClick={() => {
                  this.handleShowItem(item);
                }}
              >
                <img src={item.img} alt={item.title} />
              </Link>
            </div>
            <div className="card-body">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">
                <b>Price: ₹ {item.price} </b>
              </p>
            </div>
            <div className="card-footer">
              <button
                className={item.inCart ? "btn btn-danger" : "btn btn-info"}
                disabled={item.inCart}
                onClick={() => {
                  this.handleClick(item.id);
                }}
              >
                {item.inCart ? "Item in Cart" : "Add To Cart"}
              </button>
              <Link
                to="/Cart"
                className="btn btn-warning"
                onClick={() => {
                  this.handleClick(item.id);
                }}
              >
                Buy
              </Link>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="container-fluid">
            <h3 className="product-head">Our Products</h3>
            <button
              className="btn btn-primary priceFilter"
              onClick={this.handleSort}
            >
              {this.state.btnClick ? "Low To High" : "High To Low"}
            </button>
            <div className="box">
              <div className="row">{itemList}</div>
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    filterItems: state.filterItems,
    itemAdded: state.itemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);

  return {
    addToCart: (id) => {
      dispatch(addToCart(id));
    },
    itemDetail: (id) => {
      dispatch(itemDetail(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
