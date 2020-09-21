import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Contacts from "../mock/contacts";

export default class Home extends React.Component {
  state = {
		selectedContact: null,
		contacts: null
  };

  componentDidMount() {
		axios.get("http://localhost:3001/api/data").then((resp) => {
			console.log(resp.data.data);
			this.setState({contacts: resp.data})
		});
  }

  showContactLists = () => {
    return this.state.contacts && this.state.contacts.map((item, index) => {
      return (
        <a
          className="contact"
          onClick={() => {
            this.setState({ selectedContact: item });
          }}
          key={index}
        >
          <div style={{ width: "25%" }}>
            <img
              className="circular--square"
              src={`http://localhost:3001/${item.pic}`}
            />
          </div>
          <div>
            <div>
              <p style={{ marginTop: 0 }}>{item.name}</p>
            </div>
            <div>
              <p style={{ fontSize: 12 }}>{item.phone}</p>
            </div>
          </div>
        </a>
      );
    });
  };

  render() {
    const { selectedContact } = this.state;
    return (
      <div className="full-height">
        <div className="sidenav">
          <div className="title">
            <h1 style={{ color: "white" }}>Phone Book App</h1>
          </div>

          {this.showContactLists()}
        </div>

        <div className="main">
          {(selectedContact && (
            <div className="main-div">
              <div className="contact-title">
                <h1 className="name">Contact details</h1>
              </div>

              <div className="info-container">
                <div className="info-box">
                  <div className="upper-box">
                    <div className="picture-box">
                      <img
                        className="image-rectangle"
												src={`http://localhost:3001/${selectedContact.pic}`}
                      />
                    </div>
                    <div className="form-box">
                      <div>
                        <h6 className="name">{selectedContact.name}</h6>
                      </div>
                      <div className="feild-box">{selectedContact.phone}</div>
                      <div className="feild-box">{selectedContact.address}</div>
                    </div>
                  </div>

                  <div className="bio">{selectedContact.bio}</div>
                </div>
              </div>

              <div className="button-div">
                <Link to="/CreateContact">
                  <button className="button">Add New Contact</button>
                </Link>
              </div>
            </div>
          )) || (
            <div className="no-contact-div">
              <div>
                <h1>PLease Select Contact to View Details</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
