import { Avatar, Button, Link, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { GlobalContext } from '../../App';
import { DIM_GRAY_COLOR, GRAY_COLOR, TWITTER_URL } from '../../defaults';
import { GrGroup, GrLocation } from 'react-icons/gr';
import { FaRegHeart } from 'react-icons/fa';
import { BiBuilding } from 'react-icons/bi';
import { GoLink } from 'react-icons/go';
import { FiTwitter, FiMail } from 'react-icons/fi';


const MEDIUM_SPACING = 24;
const DEFAULT_SPACING = 16;
const SMALL_SPACING = (DEFAULT_SPACING / 2);
const SMALL_FONT_SIZE = '.875rem';


const User = () => {

    const { search } = useContext(GlobalContext);
    const { avatar_url, bio, blog, company, email, followers, following, location, login, name, twitter_username } = search.option;

    const goToUrl = (event, url = '') => {
        if (!url) {
            if (blog) {
                url = blog;
            } else if (twitter_username) {
                url = `${TWITTER_URL}${twitter_username}`;
            }
        }
        (url) && window.open(url, '_blank').focus();
    }

    const handleBlogLinkOnClick = event => goToUrl(event, blog);
    const handleTwitterLinkOnClick = event => goToUrl(event, `${TWITTER_URL}${twitter_username}`);


    return <div style={{ gap: 40 }} className='user'>
        <div style={{ padding: `${MEDIUM_SPACING}px ${DEFAULT_SPACING}px`, gap: DEFAULT_SPACING }} className='user-div'>
            <div style={{ gap: DEFAULT_SPACING }} className='user-header'>
                <div>
                    <Avatar alt='User avatar' src={avatar_url || ''} className='user-avatar' />
                </div>
                <div style={{ gap: SMALL_SPACING }} className='user-names-div'>
                    <Typography variant='h6' fontWeight={700} lineHeight={1}>{name}</Typography>
                    <Typography fontSize={SMALL_FONT_SIZE} color={DIM_GRAY_COLOR} lineHeight={1}>@{login}</Typography>
                </div>
            </div>
            <div style={{ color: GRAY_COLOR }}>
                <Typography>{bio}</Typography>
            </div>
            <div style={{ gap: SMALL_SPACING, color: GRAY_COLOR }} className='user-information-container'>
                <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                    <GrGroup />
                    <Typography fontSize={SMALL_FONT_SIZE}>
                        {followers} seguidor{(followers > 1) && 'es'}
                    </Typography>
                </div>
                <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                    <FaRegHeart />
                    <Typography fontSize={SMALL_FONT_SIZE}>
                        {following} seguindo
                    </Typography>
                </div>
            </div>
            <div style={{ gap: SMALL_SPACING, color: GRAY_COLOR }} className='user-information-container'>
                {(company) && (
                    <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                        <BiBuilding />
                        <Typography fontSize={SMALL_FONT_SIZE}>{company}</Typography>
                    </div>
                )}
                {(location) && (
                    <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                        <GrLocation />
                        <Typography fontSize={SMALL_FONT_SIZE}>{location}</Typography>
                    </div>
                )}
                {(email) && (
                    <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                        <FiMail />
                        <Typography fontSize={SMALL_FONT_SIZE}>{email}</Typography>
                    </div>
                )}
                {(blog) && (
                    <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                        <GoLink />
                        <Link underline='hover' fontSize={SMALL_FONT_SIZE} color='inherit' onClick={handleBlogLinkOnClick}>
                            {blog}
                        </Link>
                    </div>
                )}
                {(twitter_username) && (
                    <div style={{ gap: SMALL_SPACING }} className='user-information-div'>
                        <FiTwitter />
                        <Link underline='hover' fontSize={SMALL_FONT_SIZE} color='inherit' onClick={handleTwitterLinkOnClick}>
                            {(twitter_username) ? `@${twitter_username}` : ''}
                        </Link>
                    </div>
                )}
            </div>
        </div>
        <div>
            <Button fullWidth color='primary' variant='contained' onClick={goToUrl} className='user-contact-button'>
                Contato
            </Button>
        </div>
    </div>;
};


export default User;