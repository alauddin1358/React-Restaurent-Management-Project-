import React from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

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

    function RenderComments({comment}) {
        
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

    const DishDetail = (props) => {
        
        if(props.dish != null)
            return (
                <div className="container">
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish = {props.dish} />
                        </div>
                        <div  className="col-12 col-md-5 m-1">
                            <RenderComments comment = {props.dish.comments} />
                        </div>
                    </div>
                </div>
            )
        else
            return(
                <div></div>
            );
        
    }
export default DishDetail;
