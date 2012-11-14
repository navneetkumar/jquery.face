require 'rake/minify'
require 'yaml'

Rake::Minify.new(:minify_and_combine) do
  yml = File.open(File.join(PROJECT_ROOT, 'tasks', 'assets.yml'))
  YAML::load_documents(yml) do |files|
    group("build/jquery.face.min.js") do
      files['src_files'].each do |js|
        add js
      end
    end
  end
end