import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
export default class DishDetail extends Component {
    renderDish(dish) {
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

    renderComments(comment) {
        
        if(comment != null) {
            const commentItem = comment.map(item => (
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
                </div>  
            );
        }
        else 
            return(
                <div></div>
            );
    }

    render() {
        if(this.props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div  className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                        </div>
                    </div>
                </div>
            )
        else
            return(
                <div></div>
            );
        
    }
}
