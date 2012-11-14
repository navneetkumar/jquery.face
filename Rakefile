#require 'bundler/setup'

PROJECT_ROOT = File.expand_path(File.dirname(__FILE__))
Dir[File.join(PROJECT_ROOT, 'tasks', '**', '*.rake')].each do |f|
    load f
end

task :default => ['server']
