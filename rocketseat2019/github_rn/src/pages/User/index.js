import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator} from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingIndicator,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    login: '',
    stars: [],
    page: 1,
    isLoading: false,
    refreshing: false,
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const {login} = navigation.getParam('user');
    await this.setState({login});
    this.loadStarreds();
  }

  refreshData = async () => {
    await this.setState({refreshing: true, page: 1});
    await this.loadStarreds();
    this.setState({refreshing: false});
  };

  loadMore = async () => {
    const {page} = this.state;
    await this.setState({page: page + 1});
    await this.loadStarreds();
  };

  loadStarreds = async () => {
    const {stars, login, page, refreshing} = this.state;
    this.setState({isLoading: !refreshing && true});

    try {
      const {data} = await api.get(`/users/${login}/starred`, {
        params: {
          page,
        },
      });

      if (page === 1) {
        this.setState({stars: data});
      } else {
        this.setState({stars: [...stars, ...data]});
      }
    } catch (error) {
      console.tron.warn(error);
    } finally {
      this.setState({isLoading: false});
    }
  };

  handleNavigation = repository => {
    const {navigation} = this.props;
    navigation.navigate('Repository', {repository});
  };

  render() {
    const {navigation} = this.props;
    const {stars, isLoading, refreshing} = this.state;

    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        <>
          <Stars
            data={stars}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshData}
            refreshing={refreshing}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <Starred onPress={() => this.handleNavigation(item)}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
          {isLoading && (
            <LoadingIndicator>
              <ActivityIndicator color="#7159c1" size="large" />
            </LoadingIndicator>
          )}
        </>
      </Container>
    );
  }
}
