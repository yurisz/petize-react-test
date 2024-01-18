import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../../App';
import { CircularProgress, Link, Typography } from '@mui/material';
import { GRAY_COLOR } from '../../defaults';
import { GoStar } from 'react-icons/go';


const DEFAULT_SPACING = 24;
const SMALL_SPACING = (DEFAULT_SPACING / 2);
const LARGE_SPACING = (DEFAULT_SPACING * 2);
const SMALL_FONT_SIZE = '.875rem';


const Repositories = () => {

    const { loading, repositories } = useContext(GlobalContext);
    const ordenedRepositories = useMemo(() => {
        const newRepositories = [...repositories];
        return newRepositories.sort((a, b) => (b?.stargazers_count - a?.stargazers_count));
    }, [repositories]);


    return <div style={{ padding: DEFAULT_SPACING, gap: DEFAULT_SPACING }} className='repositories'>
        {(loading.repositories) ? <RepositoriesLoading /> : (
            (ordenedRepositories.map((repository) => (
                <Repository key={repository.id} id={`repository-${repository.id}`} {...{ repository }} />
            )))
        )}
    </div>;
};


export default Repositories;


const RepositoriesLoading = () => <div className='repositories-loading'>
    <CircularProgress color='primary' size={LARGE_SPACING} />
</div>


const Repository = ({ id, repository }) => {

    const getUpdatedAt = (date) => {
        if (!date) return '';
        const now = new Date();
        const past = new Date(date);

        const differenceInTime = (now.getTime() - past.getTime());
        const differenceInSeconds = Math.round(differenceInTime / 1000);
        const differenceInMinutes = Math.round(differenceInSeconds / 60);
        const differenceInHours = Math.round(differenceInMinutes / 60);
        const differenceInDays = Math.round(differenceInHours / 24);
        const differenceInMonths = Math.round(differenceInDays / 31);
        const differenceInYears = Math.round(differenceInDays / 365);

        if (differenceInYears >= 1) return `${differenceInYears} ano${(differenceInYears >= 2) ? 's' : ''}`;
        else if (differenceInMonths >= 1) return `${differenceInMonths} ${(differenceInMonths >= 2) ? 'meses' : 'mês'}`;
        else if (differenceInDays >= 1) return `${differenceInDays} dia${(differenceInDays >= 2) ? 's' : ''}`;
        else if (differenceInHours >= 1) return `${differenceInHours} hora${(differenceInHours >= 2) ? 's' : ''}`;
        else if (differenceInMinutes >= 1) return `${differenceInMinutes} minuto${(differenceInMinutes >= 2) ? 's' : ''}`;
        else if (differenceInSeconds >= 1) return `${differenceInSeconds} segundo${(differenceInSeconds >= 2) ? 's' : ''}`;
        return '';
    }

    const { name, html_url, description, stargazers_count } = repository;
    const updated_at = getUpdatedAt(repository?.updated_at);

    const goToRepository = event => (html_url) && window.open(html_url, '_blank').focus();


    return <div {...{ id }} style={{ gap: DEFAULT_SPACING }} className='repository'>
        <div>
            <Link underline='hover' color='inherit' fontSize={20} fontWeight={700} onClick={goToRepository}>
                {name}
            </Link>
        </div>
        <div style={{ color: GRAY_COLOR }}>
            <Typography>{description}</Typography>
        </div>
        <div style={{ color: GRAY_COLOR, fontSize: SMALL_FONT_SIZE, gap: SMALL_SPACING, marginBottom: DEFAULT_SPACING }} className='repository-footer'>
            <span>
                <GoStar size={20} />
            </span>
            <span>{stargazers_count}</span>
            <span>&#8226;</span>
            <span>Atualizado há {updated_at}</span>
        </div>
    </div>
}