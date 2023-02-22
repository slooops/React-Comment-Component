import React from "react";
import "../../App.css";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: {
        "comment-id1": {
          commentName: "John Doe",
          commentBody: "This is a comment.",
        },
        "comment-id2": {
          commentName: "Jane Doe",
          commentBody: "This is another comment.",
        },
      },
    };
    this.addComment = this.addComment.bind(this);
  }

  addComment(commentData) {
    var timeStamp = new Date().getTime();

    this.setState({
      comments: {
        ...this.state.comments,
        ["comment-id" + timeStamp]: commentData,
      },
    });
  }

  renderComments() {
    return Object.keys(this.state.comments).map(
      function (key) {
        return (
          <li key={key} className="">
            <NewComment details={this.state.comments[key]} />
          </li>
        );
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <ol className="comment-list">{this.renderComments()}</ol>
        <AddCommentForm addComment={this.addComment} />
      </div>
    );
  }
}

class NewComment extends React.Component {
  render() {
    var h = new Date(this.props.details.timeStamp);

    return (
      <div>
        <div className="comment-user">
          <div>
            <a href="#0" data-username="cathbailh" className="comment-username">
              <span className="username">{this.props.details.commentName}</span>
            </a>
            {/* <span className="on"> on </span> */}
            {/* <a href="#0">
              <time className="block-comment-time">{h.getTime()}</time>
            </a> */}
          </div>
        </div>

        <div className="comment-text">
          <p>{this.props.details.commentBody}</p>
        </div>
      </div>
    );
  }
}

class AddCommentForm extends React.Component {
  processComment(event) {
    event.preventDefault();
    var commentData = {
      commentName: this.refs.name.value,
      commentBody: this.refs.desc.value,
    };
    this.props.addComment(commentData);
    this.refs.commentForm.reset();
  }

  render() {
    return (
      <div className="comment-list">
        <form ref="commentForm" onSubmit={this.processComment.bind(this)}>
          <div className=" comment-name">
            <label>Comment </label>
          </div>

          <div className="row">
            <div className="comment-form">
              <input
                className="text-area"
                type="text"
                ref="name"
                placeholder="Name"
                required
              />
            </div>
          </div>

          <div>
            <div className="comment-form">
              <textarea
                className="text-area"
                ref="desc"
                placeholder="Your comment"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="comment-submit-button">
              <button type="submit" className="comment-submit-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Comment;
