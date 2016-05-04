class SearchBox extends React.Component {
  constructor (props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelect (e) {
    this.props.onSelect(e.target.value);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render () {
    let selectOptions = this.props.radiuses.map(function(radius) {
      return (
        <option key={radius.value} value={radius.value}>{radius.text}</option>
      );
    });

    return (
      <div className="search-box">
        <form className="form-inline">
          <nav className="navbar navbar-default navbar-fixed-top row">
            <div className="col-xs-6">
              <select
                className="selectpicker"
                onChange={this.handleSelect.bind(this)}
              >
                {selectOptions}
              </select>
            </div>
            <div className="col-xs-6">
              <button
                type="submit"
                className="btn btn-default btn-lg navbar-btn"
                onClick={this.handleSubmit.bind(this)}
              >
                <span className="glyphicon glyphicon-search" aria-hidden="true">
                </span>
                {this.props.searchText}
              </button>
            </div>
          </nav>
        </form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  radiuses:    React.PropTypes.arrayOf(React.PropTypes.object),
  searchText:  React.PropTypes.string,
  selectLabel: React.PropTypes.string,
  onSelect:    React.PropTypes.func,
  onSubmit:    React.PropTypes.func
};
