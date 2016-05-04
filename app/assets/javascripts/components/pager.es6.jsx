class Pager extends React.Component {
  constructor (props) {
    super(props);
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render () {
    if (this.props.hasNextPage) {
      return (
        <form className="pager">
          <button
            type="submit"
            className="btn btn-default btn-lg"
            onClick={this.handleSubmit.bind(this)}
          >
            {'次の10件を探す'}
          </button>
        </form>
      );
    }

    return (
      <div className="pager">
      </div>
    );
  }
}

Pager.propTypes = {
  hasNextPage: React.PropTypes.bool,
  onSubmit:    React.PropTypes.func
};
