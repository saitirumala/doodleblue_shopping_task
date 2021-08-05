import React, { Component } from "react";
import { FaCartPlus } from "react-icons/fa";
import {
  searchstr,
  itemSort
} from "./actions/cartActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Nav, Form, FormControl, Navbar } from "react-bootstrap";

class NavBar extends Component {
  handleSearch = (e) => {
    this.props.searchstr(e.target.value);
    // console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',this.props.searchQuery);
  };

  render() {
    return (
      <Navbar bg="info" 
      fixed="top" expand="lg">
        <div className="container">
          <Navbar.Brand href="/" style={{color:'white'}}>Shopping</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
            <Form inline className="mr-auto">
             <FormControl
                type="text"
                placeholder="Search Products"
                className=""
                onChange={(id) => {
                  this.handleSearch(id);
                }}
              />
            </Form>
            <Nav>
              <Nav.Link as={Link} to="/Cart">
                Cart
                <div>
                  <div className="shoppingCart-logo">
                    <FaCartPlus className="cart-logo" />
                  </div>
                  <div className="quantityCount">
                    <span
                      className={
                        this.props.quantity <= 0
                          ? "hide-quantity"
                          : "show-quantity"
                      }
                    >
                      {this.props.quantity}
                    </span>
                  </div>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quantity: state.quantity,
    items: state.items,
    filterItems: state.filterItems,
    searchQuery: state.searchQuery,
    filterBtn: state.filterBtn,
    sortItems: state.sortItems
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchstr: (value) => {
      dispatch(searchstr(value));
    },
    itemSort: (id) => {
      dispatch(itemSort(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
