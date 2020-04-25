import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { LocalForm, Control, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)"
        }}
      >
        <Card key={dish.id}>
          <CardImg src={baseUrl + dish.image} alt={dish.name}></CardImg>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </Card>
      </FadeTransform>
    );
  } else {
    return <div></div>;
  }
}
const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    var commentList = comments.map(comment => {
      return (
        <Fade in>
          <div>
            <li key={comment.id}>
              {comment.comment}
              <br />
              <br />
              -- {comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
              <br />
              <br />
            </li>
          </div>
        </Fade>
      );
    });

    return (
      <div>
        <h4>Comments</h4>

        <ul className='list-unstyled'>
          <Stagger in>{commentList}</Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  handleSubmit = values => {
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    alert(JSON.stringify("author :" + values.author));
  };
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-pencil fa-sm' /> Submit comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Col md={12}>
                  <Label htmlFor='rating'>Rating</Label>
                  <Control.select
                    model='.rating'
                    id='firstname'
                    name='rating'
                    className='form-control'
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={12}>
                  <Label htmlFor='name'>Your Name</Label>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    model='.name'
                    className='text-danger'
                    show='touched'
                    messages={{
                      required: "Required",
                      minLength: "Characters must be greater than 3",
                      maxLength: "Characters must be less than 15"
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={12}>
                  <Label htmlFor='comment'>Comment</Label>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    className='form-control'
                    rows={6}
                  ></Control.textarea>
                </Col>
              </Row>
              <Button color='primary' type='submit'>
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const DishDetail = props => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-md-5 m-1'>
            <RenderDish dish={props.dish} />
          </div>
          <div className='col-12 col-md-5 m-1'>
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default DishDetail;
