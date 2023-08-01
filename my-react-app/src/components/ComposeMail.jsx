
import { Dialog, Box, Typography, styled, InputBase, TextField, Button } from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import useApi from "../hooks/useApi";
import  {API_URLS} from "../services/api.urls";

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '90%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
};

const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;
    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;

const RecipientWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: "0 15px",
    '& > div': {
        fontSize: 14,
        borderBottom: "1px solid #F5F5F5",
        marginTop: 10
    }
});

const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;

const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`;

const ComposeMail = ({ openDialog, setOpenDialog }) => {
    const [data, setData] = useState({
        user_name: "",
        from_name: "",
        user_email: "",
        subject: "",
        message: ""
    });
    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);


    const closeComposeMail = (e) => {
        e.preventDefault();
        const payload = {
            to : data.user_email,
            from : "rahulraman541@gmail.com",
            subject : data.subject,
            message : data.message,
            date: new Date(),
            image: '',
            name: "Rahul Raman",
            starred: false,
            type: 'draft'
        }

        saveDraftService.call(payload);

        if (!saveDraftService.error) {
            setOpenDialog(false);
            setData({
                user_name: "",
                from_name: "",
                user_email: "",
                subject: "",
                message: ""
            });
        } else {

        }
        // setOpenDialog(false);
    };

    const sendMail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_yddhwcq', 'template_dhlvzfe', e.target, 'hy7K78Y2T8FXdL8I4')
            .then((result) => {
                alert(result.text);
                setData({
                    user_name: "",
                    from_name: "",
                    user_email: "",
                    subject: "",
                    message: ""
                })
                setOpenDialog(false);
            }, (error) => {
                console.log(error.text);
            });

        const payload = {
            to: data.user_email,
            from: "rahulraman541@gmail.com",
            subject: data.subject,
            body: data.message,
            date: new Date(),
            image: '',
            name: "Rahul Raman",
            starred: false,
            type: 'sent'
        }
        sentEmailService.call(payload);

        if (!sentEmailService.error) {
            setOpenDialog(false);
            setData({
                user_name: "",
                from_name: "",
                user_email: "",
                subject: "",
                message: ""
            });
        } else {

        }
        setOpenDialog(false)
    };

    const onvalueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
            <form onSubmit={sendMail}>
                <Header>
                    <Typography>New Message</Typography>
                    <Close fontSize="small" onClick={closeComposeMail} />
                </Header>
                <RecipientWrapper>
                    <InputBase
                        placeholder="Recipients"
                        name="user_email"
                        value={data.user_email}
                        onChange={onvalueChange}
                    />
                    <InputBase
                        placeholder="Subject"
                        name="subject"
                        value={data.subject}
                        onChange={onvalueChange}
                    />
                </RecipientWrapper>
                <TextField
                    multiline
                    rows={15}
                    sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                    name="message"
                    value={data.message}
                    onChange={onvalueChange}
                />
                <Footer>
                    <SendButton type="submit">Send</SendButton>
                    <DeleteOutline onClick={closeComposeMail} />
                </Footer>
            </form>
        </Dialog>
    );
};

export default ComposeMail;
