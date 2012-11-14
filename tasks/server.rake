require 'colorize'
task :server do
  puts "Visit http://localhost:8000/index.html".green
  `bundle exec rackup config.ru -p8000`
end