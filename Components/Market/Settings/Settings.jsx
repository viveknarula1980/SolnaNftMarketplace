import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Banner, BodySideBar, Title } from "../../index";
import { Loader } from "../../Home/index";
import { MdKeyboardArrowDown } from "../../SVG";
import Input from "../Create/Input";
import Textarea from "../Create/Textarea";

import { UPLOAD_IPFS_IMAGE, Notify } from "../../../Context/constants";

const Settings = ({ setReCall, reCall }) => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState();
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    biography: "",
    address: "",
    image: "",
  });

  const handleImageChange = async (event) => {
    try {
      setLoader(true);
      const file = event.target.files[0];
      if (file) {
        const imgUrl = await UPLOAD_IPFS_IMAGE(file);
        console.log(imgUrl);
        setProfile({ ...profile, image: imgUrl });
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const saveProfile = () => {
    localStorage.setItem("USER_PROFILE", JSON.stringify(profile));
    notifySuccess("Profile saved successfully");
    setReCall(reCall + 1);
  };

  useEffect(() => {
    const user = localStorage.getItem("USER_PROFILE");

    if (user) {
      const parsedProfile = JSON.parse(user);
      setUser(parsedProfile);
    }
  }, [reCall]);

  const DELETE_PROFILE = () => {
    localStorage.removeItem("USER_PROFILE");
    notifySuccess("Profile Deteled successfully");
    setReCall(reCall + 1);
  };
  return (
    <>
      <div id="settings" className="tabcontent">
        <div className="wrapper-content">
          <div className="inner-content">
            <Banner />

            <Title title={"Setting"} />
            <div className="widget-edit mb-30 avatar">
              <div className="title">
                <h4>Edit your avatar</h4>
                <i className="">
                  <MdKeyboardArrowDown />
                </i>
              </div>
              <div>
                <div className="uploadfile flex">
                  <img
                    src={user?.image || "assets/images/avatar/avatar-07.png"}
                    alt={user?.name || "name"}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <div>
                    <h6>Upload a new avatar”</h6>
                    <label>
                      <input
                        type="file"
                        className=""
                        name="file"
                        onChange={handleImageChange}
                      />
                      <span className="text filename">No files selected</span>
                    </label>
                    <p className="text">JPEG 100x100</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget-edit mb-30 profile">
              <div className="title">
                <h4>Edit your profile</h4>
                <i className="">
                  <MdKeyboardArrowDown />
                </i>
              </div>
              <div className="comment-form" noValidate="novalidate">
                <div className="flex gap30">
                  <Input
                    title={"Your name"}
                    placeholder={user?.name || "Your name"}
                    name={"name"}
                    handleChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                  <Input
                    title={"Email address"}
                    placeholder={user?.email || "email address"}
                    name={"name"}
                    handleChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                  <Input
                    title={"Phone number"}
                    placeholder={user?.phone || "phone number"}
                    name={"name"}
                    handleChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>

                <Textarea
                  title={"Your Bio"}
                  placeholder={user?.biography || "your Bio"}
                  name={"message"}
                  handleChange={(e) =>
                    setProfile({ ...profile, biography: e.target.value })
                  }
                />
                <Input
                  title={"Address"}
                  placeholder={user?.address || "address"}
                  name={"address"}
                  handleChange={(e) =>
                    setProfile({ ...profile, address: e.target.value })
                  }
                />

                <div className="btn-submit">
                  <button
                    className="w242 active mr-30"
                    onClick={() => DELETE_PROFILE()}
                  >
                    Delete Profile
                  </button>
                  {!user && (
                    <button className="w242" onClick={() => saveProfile()}>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <BodySideBar />
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Settings;
