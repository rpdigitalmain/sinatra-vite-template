# frozen_string_literal: true

require 'bundler/setup'
require 'dotenv'

# Resolve the same optional file for Puma and Rack regardless of the working directory.
Dotenv.load(File.expand_path('../.env', __dir__))
