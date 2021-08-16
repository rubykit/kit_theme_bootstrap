# rubocop:disable Gemspec/RequiredRubyVersion
# rubocop:enable Gemspec/RequiredRubyVersion

require_relative 'lib/kit_theme_bootstrap/version'

version = KitThemeBootstrap::VERSION

Gem::Specification.new do |s|
  s.name        = 'kit_theme_bootstrap'
  s.version     = version
  s.summary     = 'Kit default bootstrap theme'
  s.description = ''
  s.license     = 'MIT'
  s.author      = 'Nathan Appere'
  s.email       = 'nathan@rubykit.org'
  s.homepage    = 'https://github.com/rubykit/kit_theme_bootstrap'

  s.metadata = {
    'documentation_uri' => s.homepage,
    'source_code_uri'   => s.homepage,
  }

  s.files = Dir['{app,config,db,lib,public}/**/*', 'MIT-LICENSE.md', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '~> 6.1.4'

  s.add_dependency 'sass-rails', '>= 6'
  s.add_dependency 'slim-rails'
  s.add_dependency 'bootstrap', '~> 5.1'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'view_component'
  s.add_dependency 'active_link_to'

end
