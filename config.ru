require 'sprockets'

map '/' do
  environment = Sprockets::Environment.new
  environment.append_path 'lib/'
  environment.append_path 'samples/'
  run environment
end