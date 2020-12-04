import React , {Component} from 'react';
import {graphql} from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { useHistory} from 'react-router-dom';

export default (WrapppedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(){
            if(!nextProps.data.loading && !this.props.data.user) {
                useHistory().push('/login');
            }
        }
    
        render() {
            return <WrapppedComponent {...this.props} />;
        }
    
    }
    
    return graphql(currentUserQuery)(RequireAuth);
};

