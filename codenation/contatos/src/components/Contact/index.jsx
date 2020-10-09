import React from "react";

import "./styles.scss";

class Contact extends React.Component {
  render() {
    const {
      avatar,
      name,
      phone,
      country,
      admissionDate,
      company,
      department,
    } = this.props.data;

    const formatDate = (date) =>
      date ? new Intl.DateTimeFormat("default").format(new Date(date)) : "";

    return (
      <article className="contact" data-testid="contact">
        <span className="contact__avatar" data-testid="contact-avatar">
          {avatar && <img src={avatar} alt={name} />}
        </span>
        <span className="contact__data" data-testid="contact-name">
          {name}
        </span>
        <span className="contact__data" data-testid="contact-phone">
          {phone}
        </span>
        <span className="contact__data" data-testid="contact-country">
          {country}
        </span>
        <span className="contact__data" data-testid="contact-date">
          {formatDate(admissionDate)}
        </span>
        <span className="contact__data" data-testid="contact-company">
          {company}
        </span>
        <span className="contact__data" data-testid="contact-department">
          {department}
        </span>
      </article>
    );
  }
}

export default Contact;
