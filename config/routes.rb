# frozen_string_literal: true

require 'json'

module SinatraVite
  # Registers the page and the health endpoint.
  module Routes
    def self.registered(app)
      app.get '/' do
        index = File.join(settings.public_folder, 'index.html')
        halt 503, { 'content-type' => 'text/plain' }, 'Run npm run build first.' unless File.file?(index)

        send_file index
      end

      app.get '/health' do
        content_type :json
        JSON.generate(status: 'ok')
      end
    end
  end
end
