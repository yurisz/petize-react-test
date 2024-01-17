import { Avatar, Button, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalContext } from '../../App';


const User = () => {

    const { search } = useContext(GlobalContext);
    const { avatar_url, bio, blog, company, email, followers, following, location, login, name, twitter_username } = search.option;


    return <div className='user'>
        <div>
            <div>
                <div>
                    <Avatar alt='User avatar' src={avatar_url || ''} />
                </div>
                <div>
                    <Typography variant='h6'>{name}</Typography>
                    <Typography>@{login}</Typography>
                </div>
            </div>
            <div>
                <Typography>{bio}</Typography>
            </div>
            <div>
                <div>{followers} seguidor{(followers > 1) && 'es'}</div>
                <div>{following} seguindo</div>
            </div>
            <div>
                <div>
                    <Typography>{company}</Typography>
                </div>
                <div>
                    <Typography>{location}</Typography>
                </div>
                <div>
                    <Typography>{email}</Typography>
                </div>
                <div>
                    <Typography>{blog}</Typography>
                </div>
                <div>
                    <Typography>@{twitter_username}</Typography>
                </div>
            </div>
        </div>
        <div>
            <Button fullWidth color='primary' variant='contained'>
                Contato
            </Button>
        </div>
    </div>;
};


export default User;