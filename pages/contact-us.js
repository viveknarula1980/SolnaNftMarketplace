import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";
import { Preloader, Mouse, Footer, Header } from "../Components/Home/index";

import { FaExternalLinkAlt } from "../Components/Home/SVG/index";

const FORMSPREE_API = process.env.NEXT_PUBLIC_FORMSPREE_API;

const contactUs = () => {
  const [state, handleSubmit] = useForm(FORMSPREE_API);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  if (state.succeeded) {
    notifySuccess("Thanks for sending your message!");
  }
  return (
    <>
      <Preloader />
      <div id="wrapper">
        <div id="page" className="pt-40">
          <Header />
          {/* //TITLE */}
          <div className="flat-title-page">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading text-center">Contact Us </h1>
                </div>
              </div>
            </div>
          </div>
          {/* //BODY */}
          <div className="tf-section-2 contact-us">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <div className="widget-gg-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d97101.88872869895!2d-74.22688511715344!3d40.487336736141906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1689125037376!5m2!1svi!2s"
                      width="100%"
                      height={460}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tf-section-2 widget-box-icon">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading-section-1">
                    <h2 className="tf-title pb-20" style={{ perspective: 400 }}>
                      <div
                        style={{
                          display: "block",
                          textAlign: "center",
                          position: "relative",
                          transformOrigin: "555px 27.5px",
                          transform: "translate3d(0px, 0px, 0px)",
                          opacity: 1,
                        }}
                      >
                        Information
                      </div>
                    </h2>
                    <p className="pb-40">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                </div>
                <div
                  data-wow-delay="0s"
                  className="wow fadeInUp col-md-4 animated"
                  style={{
                    visibility: "visible",
                    animationDelay: "0s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="box-icon-item">
                    <img src="assets/images/box-icon/address.png" alt="" />
                    <div className="title">
                      <a href="#">Office address</a>
                    </div>
                    <p>1901 Thornridge Cir. Shiloh, Hawaii 81063</p>
                  </div>
                </div>
                <div
                  data-wow-delay="0.1s"
                  className="wow fadeInUp col-md-4 animated"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.1s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="box-icon-item">
                    <img src="assets/images/box-icon/email.png" alt="" />
                    <div className="title">
                      <a href="#">Email</a>
                    </div>
                    <p>open9@support.com open9vietnam@support.com</p>
                  </div>
                </div>
                <div
                  data-wow-delay="0.2s"
                  className="wow fadeInUp col-md-4 animated"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="box-icon-item">
                    <img src="assets/images/box-icon/phone.png" alt="" />
                    <div className="title">
                      <a href="#">Phone number</a>
                    </div>
                    <p>
                      (316) 555-0116 <br />
                      (219) 555-0114
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tf-section-2 widget-box-icon">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading-section-1">
                    <h2 className="tf-title pb-20" style={{ perspective: 400 }}>
                      <div
                        style={{
                          display: "block",
                          textAlign: "center",
                          position: "relative",
                          transformOrigin: "555px 27.5px",
                          transform: "translate3d(0px, 0px, 0px)",
                          opacity: 1,
                        }}
                      >
                        Contact us
                      </div>
                    </h2>
                    <p className="pb-40">
                      Have A Question? Need Help? Don't Hesitate, Drop Us A Line
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <form
                    id="commentform"
                    className="comment-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex gap30">
                      <fieldset className="name">
                        <input
                          className="style-1"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your name*"
                        />
                      </fieldset>
                      <fieldset className="email">
                        <input
                          className="style-1"
                          type="email"
                          id="email"
                          placeholder="Email address*"
                          name="email"
                        />
                      </fieldset>
                      <fieldset className="subject">
                        <input
                          className="style-1"
                          type="text"
                          id="subject"
                          placeholder="Subject"
                          name="subject"
                        />
                      </fieldset>
                    </div>
                    <fieldset className="message">
                      <textarea
                        className="style-1"
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Your message*"
                      />
                    </fieldset>
                    <div className="btn-submit">
                      <button
                        className="tf-button style-1"
                        type="submit"
                        disabled={state.submitting}
                      >
                        Send message <FaExternalLinkAlt />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Mouse />
    </>
  );
};

export default contactUs;
