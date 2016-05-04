class RestaurantSearch extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      hasNextPage: false,
      offset_page: 1,
      range:       1,
      restaurants: []
    };

    this.getPosition = this.getPosition.bind(this);
    this.emptyObj2EmptyStr = this.emptyObj2EmptyStr.bind(this);
  }

  emptyObj2EmptyStr (obj) {
    for (let key of Object.keys(obj)) {
      if (typeof obj[key] === 'object') {
        if (Object.keys(obj[key]).length === 0)
          obj[key] = '';
        else
          this.emptyObj2EmptyStr(obj[key]);
      }
    }

    return obj;
  }

  getPosition () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getPositionSuccess.bind(this), this.getPositionFailure.bind(this)
      );
    }
    else {
      return {};
    }
  }

  getPositionFailure (error) {
    let msg;

    switch(error.code) {
      case 1:
        msg = "位置情報の利用が許可されませんでした";
        break;

      case 2:
        msg = "端末の位置が取得できませんでした";
        break;

      case 3:
        msg = "タイムアウトしました";
        break;
    }

    this.onSubmitFailure(msg);
  }

  getPositionSuccess (position) {
    this.setState({
      latitude:    position.coords.latitude,
      longitude:   position.coords.longitude,
    });

    $.ajax({
      url: this.props.url,
      type: 'GET',
      dataType: 'json',
      data: {
        latitude:    this.state.latitude,
        longitude:   this.state.longitude,
        range:       this.state.range,
        offset_page: this.state.offset_page
      },
      success: data => {
        this.onSubmitSuccess(data);
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  onSelect (range) {
    this.setState({ range: range });
  }

  onSubmit () {
    this.getPosition();
  }

  onSubmitFailure (msg) {
    console.error(msg);
  }

  onSubmitSuccess (data) {
    this.updatePager(data.hit_per_page, data.page_offset, data.total_hit_count);

    let restaurants = data.rest.map(function(rest) {
      return this.emptyObj2EmptyStr(rest);
    }, this);

    this.setState({
      restaurants: restaurants
    });
  }

  readNextPage () {
    $.ajax({
      url:      this.props.url,
      type:     'GET',
      dataType: 'json',
      data: {
        latitude:    this.state.latitude,
        longitude:   this.state.longitude,
        range:       this.state.range,
        offset_page: this.state.offset_page
      },
      success: data => {
        this.readNextPageSuccess(data);
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  readNextPageSuccess (data) {
    this.updatePager(data.hit_per_page, data.page_offset, data.total_hit_count);

    let restaurants = data.rest.map(function(rest) {
      return this.emptyObj2EmptyStr(rest);
    }, this);

    this.setState({
      restaurants: this.state.restaurants.concat(restaurants)
    });
  }

  updatePager (hit_per_page, page_offset, total_hit_count) {
    let hasNextPage = (hit_per_page * page_offset <= total_hit_count);
    let offset_page = parseInt(page_offset);

    if (hasNextPage)
      offset_page = offset_page + 1;

    this.setState({
      hasNextPage: hasNextPage,
      offset_page: offset_page
    });
  }

  render () {
    let items = this.state.restaurants.map(function(item) {
      let imgUrls = [];
      for (let key of Object.keys(item.image_url))
        imgUrls.push(item.image_url[key]);

      return (
        <RestaurantItem
          access={item.access}
          address={item.address}
          budget={item.budget}
          category={item.category}
          coupon={item.coupon_url}
          imgUrls={imgUrls}
          id={item.id}
          latitude={item.latitude}
          longitude={item.longitude}
          name={item.name}
          name_kana={item.name_kana}
          opentime={item.opentime}
          tel={item.tel}
        />
      );
    }, this);

    return (
      <div class="restaurants-search">
        {items}
        <Pager
          hasNextPage={this.state.hasNextPage}
          onSubmit={this.readNextPage.bind(this)}
        />
        <SearchBox
          radiuses={[
            { value: '1', text: '半径300m以内の' },
            { value: '2', text: '半径500m以内の' },
            { value: '3', text: '半径1000m以内の' },
            { value: '4', text: '半径2000m以内の' },
            { value: '5', text: '半径3000m以内の' },
          ]}
          searchText="レストランを探す"
          selectLabel="検索半径"
          onSelect={this.onSelect.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

RestaurantSearch.propTypes = {
  url: React.PropTypes.string
};
