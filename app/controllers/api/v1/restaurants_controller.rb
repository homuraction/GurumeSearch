module Api
  module V1
    class RestaurantsController < ApplicationController
      API_URL = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/'

      def index
        # TODO 不正なパラメータが入力された場合のエラーハンドリング

        data = {
          keyid:       ENV['GURUNAVI_API_KEY'],
          format:      'json',
          latitude:    params['latitude'],
          longitude:   params['longitude'],
          range:       params['range'],
          offset_page: params['offset_page']
        }

        uri       = URI.parse(API_URL)
        uri.query = URI.encode_www_form(data)
        req       = Net::HTTP::Get.new(uri)
        res       =
          Net::HTTP.start(uri.host, uri.port) { |http| http.request(req) }
        json      = JSON.parse(res.body)

        render json: json
      end
    end
  end
end
