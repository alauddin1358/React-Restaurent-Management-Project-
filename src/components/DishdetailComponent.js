import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label,
    Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        
       this.toggleModal = this.toggleModal.bind(this);
       this.handleComment = this.handleComment.bind(this);
    };
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
     }
     
    handleComment(values) {
        //console.log("Calling HandleComment");
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        //console.log("Calling CommentForm");
        return(
            <div className="container">
                <Button outline onClick={this.toggleModal}>    
                    <span className="fa fa-pencil fa-lg mr-1"></span> 
                        Submit Comment
                </Button>
                 <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleComment(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={6}>Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control mx-2">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={6}>Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control mx-2"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger mx-2"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />  
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={6}>Your Feedback</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control mx-2" />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary" className="mr-2">
                                        Submit
                                    </Button>
                               </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                 </div>
               
                        
                        
                            
            </div>    
        );
    }
}
    function RenderDish({dish}) {
        return( 
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({comments, addComment, dishId}) {
        
        if(comments != null) {
            //console.log("Calling RenderComments");
            const commentItem = comments.map(item => (
                <li key={item.id}>
                    <p>{item.comment}</p>
                    <p>-- {item.author}, 
                     {new Intl.DateTimeFormat('en-US', 
                     { year: 'numeric', month: 'short', day: '2-digit'}).format(
                         new Date(Date.parse(item.date)))}</p>
                </li>
            ));
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">{commentItem}</ul>
                    <div>
                        <CommentForm dishId={dishId} addComment={addComment} />
                        
                    </div>
                </div>  
            );
        }
        else 
            return(
                <div></div>
            );
    }

    const DishDetail = (props) => {
        //console.log(props.comments);
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                                        addComment={props.addComment}
                                        dishId={props.dish.id}
                                    />
                        </div>
                    </div>
                </div>
            );
        }
        else
            return(
                <div></div>
            );
        
    }
export default DishDetail;
