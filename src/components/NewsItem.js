import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span className="position-absolute badge bg-danger" style={{ 'borderRadius':'unset','padding': '7px 10px', 'fontSize': '13'}}>
            {source}
          </span>
          <img
            src={
              !imageUrl
                ? "https://www.hindustantimes.com/ht-img/img/2023/12/18/1600x900/salaar_1702895194894_1702895195069.png"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By author <b>{!author ? "Unkmown" : author}</b> on{" "}
                <b>{new Date(date).toDateString()}</b>
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="blank"
              className="btn btn-sm btn-primary"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
