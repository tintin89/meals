import {useEffect} from 'react'
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

const mapState = ({authR}) =>({
    user:authR.userA
});

const VerifyAuth = props =>{
    const {user} = useSelector(mapState);
    const history=useHistory();

    useEffect(()=>{
        if(user===null){
            history.push('/login')
        }
    },[user,history])

    return props.children;
}

export default VerifyAuth;