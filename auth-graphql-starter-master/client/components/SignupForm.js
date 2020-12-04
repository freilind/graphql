import React, {Component} from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql } from 'graphql';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
    }

    onSubmit({email, password}){
        this.props.muatate({
            variables: {email, password},
            refetchQueries: [{query}]
        }).catch(resp => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        })
    }

    render() {
        return(
            <div>
                <h3>Sign Up</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(mutation)(SignupForm);