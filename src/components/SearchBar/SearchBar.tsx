import { localStorageKey } from '../../utils/constants';
import './SearchBar.css';
import { ChangeEvent, Component, ReactNode } from 'react';

type SearchBarProps = { onSearchSubmit: (value: string) => void };
type SearchBarState = { searchValue: string };

export default class SearchBar extends Component<
  SearchBarProps,
  SearchBarState
> {
  constructor(props: SearchBarProps) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    const searchValue = localStorage.getItem(localStorageKey) || '';
    this.setState({ searchValue }, this.handleSubmit);
  }

  handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ searchValue: e.target.value });
  }

  handleSubmit(): void {
    this.props.onSearchSubmit(this.state.searchValue);
    localStorage.setItem(localStorageKey, this.state.searchValue || '');
  }

  render(): ReactNode {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="ditto"
          className="search-bar__input"
          value={this.state?.searchValue ?? ''}
          onChange={this.handleSearchChange}
        />
        <input type="button" value="Search" onClick={this.handleSubmit} />
      </div>
    );
  }
}
