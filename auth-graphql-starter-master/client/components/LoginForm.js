import React , {Component} from 'react';
import mutation from '../mutations/Login';
import { graphql } from 'graphql';
import AuthForm from './AuthForm';
import query from '../queries/CurrentUser';
import { useHistory} from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
    }

    componentWillUpdate(nextProps){
        //this.props //the old , current set of props
        //nextProps //the next , current set of props that will be in place rerenders
        if(!this.props.data.user && nextProps.data.user) {
            useHistory().push('/dasboard');
        }
    }

    onSubmit({email, password}){
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{query}]
        })
        //.then(()=> router.push('/dashboard'))
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    render(){
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);
