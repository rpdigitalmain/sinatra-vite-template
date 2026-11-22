# frozen_string_literal: true

require_relative 'config/boot'
require 'sinatra/base'

module SinatraVite
  # Serves the built frontend and the application routes.
  class App < Sinatra::Base
    set :public_folder, File.expand_path('dist', __dir__)
    set :environment, ENV.fetch('APP_ENV') { ENV.fetch('RACK_ENV', 'development') }.to_sym
  end
end

require_relative 'config/routes'

SinatraVite::App.register SinatraVite::Routes
