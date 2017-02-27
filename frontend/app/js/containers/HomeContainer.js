import React, {Component} from 'react';

const styles = {
    h1: {
        textAlign: "center"
    }
};

export default class HomeContainer extends Component{
    render(){
        return(
            <div>
                <h1 style={styles.h1}>HOME</h1>
                {this.props.children}
            </div>
        )
    }
}