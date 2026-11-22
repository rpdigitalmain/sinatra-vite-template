# frozen_string_literal: true

require 'json'
require_relative '../support/rack_requests'

RSpec.describe 'GET /health' do
  include_context 'Rack requests'

  it 'returns a JSON health status' do
    response = request.get('/health')

    expect(response.status).to eq(200)
    expect(response['content-type']).to start_with('application/json')
    expect(JSON.parse(response.body)).to eq('status' => 'ok')
  end
end
