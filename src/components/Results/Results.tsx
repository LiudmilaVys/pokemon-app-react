import { Component } from 'react';
import Loader from '../../utils/Loader/Loader';
import PokemonList from '../PokemonList/PokemonList';
import { Pokemon } from '../../utils/types';
import * as pokemonService from '../../services/pokemonService';
import { parsePokemonsResponse } from '../../utils/utils';

type ResultsProps = { search: string | undefined; generateAnError: boolean };
type ResultsState = {
  pokemons: Pokemon[];
  isLoading: boolean;
};

export default class Results extends Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps) {
    super(props);

    this.state = {
      pokemons: [],
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps: ResultsProps): void {
    if (this.props.generateAnError) {
      throw new Error('Enabe ErrorBoundary fallback');
    }

    if (prevProps.search !== this.props.search) {
      this.loadPokemons();
    }
  }

  private loadPokemons(isFirstLoad?: boolean) {
    this.setState({ isLoading: true }, async () => {
      if (this.props.search) {
        pokemonService
          .searchBy(this.props.search)
          .then((pokemonResp) => {
            this.setState({
              pokemons: [
                {
                  id: pokemonResp.id,
                  name: pokemonResp.name,
                  height: pokemonResp.height,
                  weight: pokemonResp.weight,
                },
              ],
              isLoading: false,
            });
          })
          .catch(() => {
            this.setState({ pokemons: [], isLoading: false });
          });
      } else {
        const promises = [pokemonService.getAll()];

        if (isFirstLoad) {
          // time to let you see loading message
          promises.push(new Promise((resolve) => setTimeout(resolve, 1000)));
        }

        Promise.all(promises).then((values) => {
          const pokemons = parsePokemonsResponse(values[0]);

          this.setState({ pokemons, isLoading: false });
        });
      }
    });
  }

  render() {
    return (
      <main>
        {this.state.isLoading ? <Loader></Loader> : this.renderPokemons()}
      </main>
    );
  }

  renderPokemons() {
    return this.state.pokemons.length ? (
      <PokemonList pokemons={this.state?.pokemons}></PokemonList>
    ) : (
      <p>Not found</p>
    );
  }
}
