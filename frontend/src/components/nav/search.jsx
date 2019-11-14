import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchResults from './search_results';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: '' };
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { setSearching } = this.props;
    if (prevProps.location.pathname !== this.props.location.pathname) {
      setSearching(false);
    }
  }

  setFilter(value) {
    this.setState({ filter: value })
  }

  render() {
    const { setSearching } = this.props;

    return (
      <div className="nav nav-search">
        <input 
          type="text" 
          placeholder="Search for projects and categories"
          value={this.state.filter} 
          onChange={e => this.setFilter(e.target.value)} />
        {
          this.state.filter.length > 0 &&
          <SearchResults setSearching={setSearching} filter={this.state.filter} />
        }
        <button onClick={() => setSearching(false)}>
          <i className="fas fa-times" />
        </button>
      </div>
    )
  }
};

export default withRouter(Search);