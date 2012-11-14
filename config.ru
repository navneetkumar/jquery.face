require 'sprockets'

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'lib/'
  environment.append_path 'samples/'
  run environment
end

map '/release' do
  environment = Sprockets::Environment.new
  environment.append_path 'build/'
  run environment
end

map '/' do
  run Rack::File.new("samples/index.html")
end