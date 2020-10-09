import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  FilterButton,
  Pagination,
  PaginationButton,
} from './styles';
import Container from '../../components/container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repoName: '',
    repository: {},
    issues: [],
    loading: true,
    issuesFilters: [
      { index: 0, value: 'all', label: 'Todos' },
      { index: 1, value: 'open', label: 'Abertos' },
      { index: 2, value: 'closed', label: 'Fechadas' },
    ],
    filterIndex: 1,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    await this.setState({ repoName });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.getIssuesAsync(),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  getIssuesAsync = () => {
    const { issuesFilters, filterIndex, repoName, page } = this.state;

    const { value: state } = issuesFilters[filterIndex];

    return api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        page,
        per_page: 5,
      },
    });
  };

  handleFilterSelected = async value => {
    const { issuesFilters } = this.state;
    const filterIndex = issuesFilters.findIndex(f => f.value === value);

    await this.setState({ loading: true, page: 1, filterIndex });
    const { data } = await this.getIssuesAsync();
    this.setState({
      issues: [...data],
    });
    this.setState({ loading: false });
  };

  handlePagination = async direction => {
    const { page } = this.state;
    await this.setState({ page: page + direction, loading: true });

    const { data } = await this.getIssuesAsync();
    this.setState({
      issues: [...data],
    });
    this.setState({ loading: false });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      issuesFilters,
      page,
      filterIndex,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueFilter>
            <h2>Issues</h2>
            {issuesFilters.map(filter => (
              <li key={filter.value}>
                <FilterButton
                  active={filter.index === filterIndex}
                  onClick={() => this.handleFilterSelected(filter.value)}
                >
                  {filter.label}
                </FilterButton>
              </li>
            ))}
          </IssueFilter>{' '}
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Pagination>
          <PaginationButton
            disabled={page === 1}
            loading={loading}
            onClick={() => this.handlePagination(-1)}
          >
            Anterior
          </PaginationButton>
          <PaginationButton
            loading={loading}
            onClick={() => this.handlePagination(1)}
          >
            Próxima
          </PaginationButton>
        </Pagination>
      </Container>
    );
  }
}
