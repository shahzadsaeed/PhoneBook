import Axios from "axios";
import React from "react";

import Uploader from "../assets/uploadImage.png";

export default class CreateContact extends React.Component {
  state = {
    picture: Uploader,
    name: "",
    phone: "",
    genderMale: null,
    bio: "",
    address: "",
    picturesError: null,
    nameError: null,
    phoneError: null,
    genderMaleError: null,
    bioError: null,
    addressError: null,
  };

  onDrop = (picture) => {
    this.setState({
      picture: this.state.picture.concat(picture),
    });
  };

  onSubmit = () => {
    const { picture, name, phone, genderMale, bio, address } = this.state;

    const nameRegex = /^[a-zA-Z]{3}(([a-zA-Z ])?[a-zA-Z]*)*$/g;

    const phoneRegex = /[(][0-9]{3}[)] [0-9]{3} ([0-9]{3})+$/g;

    let navigate = true;

    if (picture === Uploader) {
      this.setState({ picturesError: "Please Add Picture" });
      navigate = false;
    } else {
      this.setState({ picturesError: null });
    }

    if (!nameRegex.test(name)) {
      this.setState({ nameError: "Invalid Name" });
      navigate = false;
    } else {
      this.setState({ nameError: null });
    }

    if (!phoneRegex.test(phone)) {
      this.setState({ phoneError: "Invalid Phone Number" });
      navigate = false;
    } else {
      this.setState({ phoneError: null });
    }

    if (genderMale === null) {
      this.setState({ genderMaleError: "Please Select Your Gender" });
      navigate = false;
    } else {
      this.setState({ genderMaleError: null });
    }

    if (address.length < 3 || address.length > 200) {
      this.setState({ addressError: "Invalid Address" });
      navigate = false;
    } else {
      this.setState({ addressError: null });
    }

    if (bio.length < 10 || bio.length > 1000) {
      this.setState({ bioError: "Invalid Bio" });
      navigate = false;
    } else {
      this.setState({ bioError: null });
    }

    if (navigate === true) {
      console.log("dasdasd");
      this.from.submit();
    }
  };

  // console.log("asdadas");
  // let data = {
  //   picture: picture,
  //   name: name,
  //   phone: phone,
  //   genderMale: genderMale,
  //   bio: bio,
  //   address: address,
  // };
  // Axios.post("http://localhost:3001/api/add", data).then(function (
  //   response
  // ) {
  //   console.log(response.data);
  // });

  handleChange = (event) => {
    this.setState({
      picture: event.target.files[0]
        ? URL.createObjectURL(event.target.files[0])
        : Uploader,
    });
  };

  render() {
    return (
      <div>
        <h2 className="contact-title">Add New Contact</h2>

        <div className="container">
          <div className="form">
            <form
              ref={(ref) => {
                this.from = ref;
              }}
              action="http://localhost:3001/api/add"
              method="post"
              enctype="multipart/form-data"
            >
              <div className="row">
                <div className="col-25">
                  <label htmlFor="fname">Name</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="Your name.."
                    required
                    style={{
                      borderColor: this.state.nameError ? "red" : "grey",
                    }}
                    value={this.state.name}
                    onChange={(evt) =>
                      this.setState({ name: evt.target.value })
                    }
                  />
                </div>
                <div>
                  <p style={{ color: "red" }}>{this.state.nameError}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="Phone">Phone Number</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="Phone"
                    name="Phone"
                    placeholder="Your Phone Number.."
                    style={{
                      borderColor: this.state.phoneError ? "red" : "grey",
                    }}
                    required
                    value={this.state.phone}
                    onChange={(evt) =>
                      this.setState({ phone: evt.target.value })
                    }
                  />
                </div>
                <div>
                  <p style={{ color: "red" }}>{this.state.phoneError}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="Adress">Address</label>
                </div>
                <div className="col-75">
                  <input
                    type="text"
                    id="Adress"
                    name="Adrees"
                    placeholder="Your Address.."
                    style={{
                      borderColor: this.state.addressError ? "red" : "grey",
                    }}
                    required
                    value={this.state.address}
                    onChange={(evt) =>
                      this.setState({ address: evt.target.value })
                    }
                  />
                </div>
                <div>
                  <p style={{ color: "red" }}>{this.state.addressError}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="vehicle1">Gender</label>
                </div>
                <div className="col-75">
                  <input
                    type="radio"
                    id="male"
                    style={{
                      borderColor: this.state.genderMaleError ? "red" : "grey",
                    }}
                    name="gender"
                    value="male"
                    onChange={(evt) => this.setState({ genderMale: true })}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    style={{
                      borderColor: this.state.genderMaleError ? "red" : "grey",
                    }}
                    name="gender"
                    value="female"
                    onChange={(evt) => this.setState({ genderMale: false })}
                  />
                  <label htmlFor="female">Female</label>
                  <div>
                    <p style={{ color: "red" }}>{this.state.genderMaleError}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="subject">Short Bio</label>
                </div>
                <div className="col-75">
                  <textarea
                    id="subject"
                    name="subject"
                    className={this.state.bioError && "textarea"}
                    required
                    placeholder="Write something.."
                    style={{ height: 200 }}
                    value={this.state.bio}
                    onChange={(evt) => this.setState({ bio: evt.target.value })}
                  ></textarea>
                  <div>
                    <p style={{ color: "red" }}>{this.state.bioError}</p>
                  </div>
                </div>
                <div className="image-div">
                  <img src={Uploader} className="image-upload" />

                  <div>
                    <p>Please chose Image to upload</p>
                    <input
                      type="file"
                      name="picture"
                      onChange={this.handleChange}
                    />
										<p style={{ color: "red" }}>{this.state.picturesError}</p>
                  </div>
                </div>
                {/* <input type="submit" value="Add" /> */}
              </div>
            </form>
          </div>

          <div className="form"></div>


        </div>
				<div className="button-div">
            <button className="button" onClick={this.onSubmit}>
              Add
            </button>
          </div>
      </div>
    );
  }
}
