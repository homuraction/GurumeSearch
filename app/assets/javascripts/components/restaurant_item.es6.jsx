class RestaurantItem extends React.Component {
  constructor (props) {
    super(props);

    // 詳細表示のON/OFFを示す
    this.state = { open: false };

    console.log(props);
  }

  handleClick (e) {
    this.setState({ open: !(this.state.open) });
  }

  createAccess () {
    let access = '';
    if (this.props.access.line.length !== 0)
      access = access + this.props.access.line;
    if (this.props.access.station.length !== 0)
      access = access + ' ' + this.props.access.station;
    if (this.props.access.station_exit.length !== 0)
      access = access + ' ' + this.props.access.station_exit;
    if (this.props.access.walk.length !== 0)
      access = access + 'から' + this.props.access.walk + '分';

    if (access.length !== 0) {
      return (
        <p className="note">{access}</p>
      );
    }

    return '';
  }

  createAddress () {
    if (this.props.address.length !== 0) {
      return (
        <address>
          <label>住所</label>
          <p>{this.props.address}</p>
        </address>
      );
    }

    return '';
  }

  createBudget () {
    if (this.props.budget.length !== 0) {
      return (
        <p className="note">平均予算: {this.props.budget}円</p>
      );
    }

    return '';
  }

  createCategory () {
    if (this.props.category.length !== 0) {
      return (
        <p className="note">{this.props.category}</p>
      );
    }

    return '';
  }

  createCoupon () {
    let pcCoupon     = '';
    let mobileCoupon = '';

    if (this.props.coupon.pc.length !== 0) {
      pcCoupon = (
        <p>
          <a href={this.props.coupon.pc} target="_blank">
            クーポン情報はこちら
          </a>
        </p>
      );
    }

    if (this.props.coupon.mobile.length !== 0) {
      mobileCoupon = (
        <p>
          <a href={this.props.coupon.mobile} target="_blank">
            携帯の方のクーポン情報はこちら
          </a>
        </p>
      );
    }
  }

  createImage (url, key) {
    if (url === '')
      return '';

    return (
      <a href={url} key={key} target="_blank">
        <img src={url} alt={this.props.name} className="img-responsive" />
      </a>
    );
  }

  createImages () {
    let images = this.props.imgUrls.map(function (url, index) {
      return this.createImage(url, index);
    }, this);

    return images.map(function (img) {
      return (
        <div className="col-xs-6">
          {img}
        </div>
      );
    });
  }

  createName () {
    if (this.props.name.length !== 0) {
      return (
        <div>
          <p><b>{this.props.name}</b></p>
          <p className="note">{this.props.name_kana}</p>
        </div>
      );
    }

    return '';
  }

  createOpentime () {
    if (this.props.opentime.length !== 0) {
      return (
        <div className="opentime">
          <label>営業時間</label>
          <p>{this.props.opentime}</p>
        </div>
      );
    }

    return '';
  }

  createTel () {
    if (this.props.tel.length !== 0) {
      return (
        <div className="tel">
          <label>電話番号</label>
          <p>{this.props.tel}</p>
        </div>
      );
    }

    return '';
  }

  createThumbnail () {
    if (Object.keys(this.props.imgUrls[0]).length !== 0) {
      return this.createImage(this.props.imgUrls[0],0);
    }
    else
      return '';
  }

  createDescription () {
    let images;
    if (this.props.imgUrls.length !== 0) {
      images = (
        <div className="row">
          {this.createImages()}
        </div>
      );
    }

    return (
      <div
        className="restaurant-item"
        key={this.props.id}
        onClick={this.handleClick.bind(this)}
      >
        {this.createCategory()}
        {this.createName()}
        <hr />
        <div className="row">
          <div className="col-xs-9">
            {this.createBudget()}
            {this.createAccess()}
          </div>
          <div className="col-xs-3">
            {this.createThumbnail()}
          </div>
        </div>
        <hr />
        {this.createAddress()}
        {this.createTel()}
        {this.createCoupon()}
        <div className="row">
          {this.createImages()}
        </div>
      </div>
    );
  }

  createItem () {
    return (
      <div
        className="restaurant-item"
        key={this.props.id}
        onClick={this.handleClick.bind(this)}
      >
        {this.createCategory()}
        {this.createName()}
        <hr />
        <div className="row">
          <div className="col-xs-9">
            {this.createBudget()}
            {this.createAccess()}
          </div>
          <div className="col-xs-3">
            {this.createThumbnail()}
          </div>
        </div>
      </div>
    );
  }

  render () {
    if (this.state.open)
      return this.createDescription();
    else
      return this.createItem();
  }
}

RestaurantItem.propTypes = {
  access:    React.PropTypes.object,
  address:   React.PropTypes.string,
  budget:    React.PropTypes.string,
  category:  React.PropTypes.string,
  coupon:    React.PropTypes.object,
  imgUrls:   React.PropTypes.arrayOf(React.PropTypes.string),
  id:        React.PropTypes.string,
  latitude:  React.PropTypes.string,
  longitude: React.PropTypes.string,
  name:      React.PropTypes.string,
  name_kana: React.PropTypes.string,
  opentime:  React.PropTypes.string,
  tel:       React.PropTypes.string,
};
