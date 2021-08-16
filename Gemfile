source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{ repo }.git" }

if (version_ruby = (File.readlines(File.expand_path('.tool-versions', __dir__)).select { |el| el.start_with?('ruby') }[0] || '')&.split('ruby')[1]&.strip)
  ruby version_ruby
end

gemspec

# Note: somehow having it in the gemspec is not enough?
gem 'bootstrap', '~> 5.1'
gem 'jquery-rails'

gem 'puma', '~> 5.0'
gem 'bootsnap', '>= 1.4.4', require: false

gem 'kit_rubocop_style',       git: 'https://github.com/rubykit/kit_rubocop_style', branch: 'main'

gem 'kit-dotenv',              git: 'https://github.com/rubykit/kit', glob: 'libraries/kit-dotenv/*.gemspec'
gem 'kit-dotenv-rails',        git: 'https://github.com/rubykit/kit', glob: 'libraries/kit-dotenv/*.gemspec', require: 'kit/dotenv/rails-now'

gem 'kit-active-admin',        git: 'https://github.com/rubykit/kit', glob: 'libraries/kit-active-admin/*.gemspec', require: 'kit/active_admin' # DEV MODE
gem 'kit-app-container',       git: 'https://github.com/rubykit/kit', glob: 'libraries/kit-app-container/*.gemspec'
gem 'kit-dummy-app-container', git: 'https://github.com/rubykit/kit', glob: 'libraries/kit-dummy-app-container/*.gemspec'

group :development, :test do
  gem 'awesome_print', github: 'rubykit/awesome_print', branch: 'feature/custom-nesting'

  gem 'byebug', platforms: %i[mri mingw x64_mingw]

  gem 'pry'

  gem 'better_errors'
  gem 'binding_of_caller'

  gem 'active_link_to'
end

group :development do
  gem 'listen', '~> 3.3'

  gem 'rack-mini-profiler', '~> 2.0'
end
