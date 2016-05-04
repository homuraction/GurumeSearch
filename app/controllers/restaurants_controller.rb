class RestaurantsController < ApplicationController
  def index
    @url = "http://#{request.host}:#{request.port.to_s}/api/v1/restaurants"
  end
end
