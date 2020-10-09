import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Header, Issues, RepositoryInfo } from './styles';

interface RepositoryParams {
  name: string;
}

interface RepositoryData {
  full_name: string;
  description: string;
  forks: number;
  open_issues: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface IssueData {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [issues, setIssues] = useState<IssueData[]>([]);
  const [repository, setRepository] = useState<RepositoryData | null>(null);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api
      .get<RepositoryData>(`repos/${params.name}`)
      .then(({ data }) => setRepository(data));

    api
      .get<IssueData[]>(`repos/${params.name}/issues`)
      .then(({ data }) => setIssues(data));
  }, [params.name]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
          />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository?.forks}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        {issues &&
          issues.map((issue) => (
            <a
              key={issue.id}
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>
              <FiChevronRight size={20} />
            </a>
          ))}
      </Issues>
    </>
  );
};

export default Repository;
