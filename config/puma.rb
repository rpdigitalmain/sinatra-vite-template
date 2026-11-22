# frozen_string_literal: true

require_relative 'boot'

host = ENV.fetch('PUMA_HOST', '127.0.0.1')
port = ENV.fetch('PORT', '4567')
bind "tcp://#{host}:#{port}"
