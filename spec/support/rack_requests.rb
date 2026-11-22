# frozen_string_literal: true

require 'rack'

RSpec.shared_context 'Rack requests' do
  let(:app) { Rack::Builder.parse_file(File.expand_path('../../config.ru', __dir__)) }
  let(:request) { Rack::MockRequest.new(app) }
end
