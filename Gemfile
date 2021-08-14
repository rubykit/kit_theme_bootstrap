source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{ repo }.git" }

gemspec

# Note: somehow having it in the gemspec is not enough?
gem 'bootstrap', '~> 5.1'
gem 'jquery-rails'

gem 'puma', '~> 5.0'
gem 'bootsnap', '>= 1.4.4', require: false

gem 'kit_rubocop_style',       path: '../kit_rubocop_style'

gem 'kit-dummy-app-container', path: '../kit/libraries/kit-dummy-app-container' # DEV MODE
gem 'kit-app-container',       path: '../kit/libraries/kit-app-container' # DEV MODE

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

  gem 'spring'
end
