

import { ListItem, Checkbox, Typography, Box, styled } from "@mui/material";
import { StarBorder, Star } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from "../services/api.urls";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const Wrapper = styled(Box)({
    padding: '0 0 0 10px',
    background: '#f2f6fc',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& > div' : {
        display: 'flex',
        width: '100%',
        '& > p':{
            fontSize: 14
        }
    }
})

const Indicator = styled(Typography)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-right: 6px;
    padding: 0 4px;
`;

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
})

const Email = ({email, selectedEmails, setRefreshScreen, setSelectedEmails}) => {

    const toggleStarredEmailService = useApi(API_URLS.toggleStarredEmail);

    const navigate = useNavigate()

    const toggleStarredMails = () => {
        toggleStarredEmailService.call({ id: email._id, value: !email.starred });
        setRefreshScreen(prevState => !prevState)
    }

    const onValuechange = ()=>{
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
        } else {
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }

    return (
        <Wrapper>
            <Checkbox 
                size="small"
                checked={selectedEmails.includes(email._id)}
                onChange={() => onValuechange()} 
                
             />
             { 
                email.starred ? 
                    <Star fontSize="small" style={{ marginRight: 10, color: 'yellow' }} onClick={() => toggleStarredMails()} />
                : 
                    <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredMails()} /> 
            }
            
            <Box onClick={() => navigate(routes.view.path, { state: { email: email }})}>
                <Typography style={{ width: 200, overflow: 'hidden' }}>{email.name}</Typography>
                <Indicator>Inbox</Indicator>
                <Typography>{email.subject} {email.body && '-' } {email.body}</Typography>
                <Date>
                    {(new window.Date(email.date)).getDate()}&nbsp;
                    {(new window.Date(email.date)).toLocaleString('default', { month: 'long' })}
                </Date>
            </Box>
        </Wrapper>
    )
}

export default Email;