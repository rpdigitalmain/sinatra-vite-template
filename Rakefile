# frozen_string_literal: true

require 'rspec/core/rake_task'

desc 'Lint Ruby source and entry points'
task :lint do
  sh 'rubocop', '--cache', 'false', '--force-exclusion', '**/*.rb', 'config.ru', 'Gemfile', 'Rakefile'
end

RSpec::Core::RakeTask.new(:spec)

desc 'Run the RSpec suite'
task test: :spec

task default: :test
