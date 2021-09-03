KIT_APP_PATHS ||= {}

KIT_APP_PATHS['GEM_RAILTIE']     = 'kit_theme_bootstrap'

KIT_APP_PATHS['GEM_ROOT']        = File.expand_path('..', __dir__)
KIT_APP_PATHS['GEM_APP']         = File.expand_path('../app', __dir__)
KIT_APP_PATHS['GEM_LIB']         = File.expand_path('../lib', __dir__)
KIT_APP_PATHS['GEMFILE']         = File.expand_path('../Gemfile', __dir__)
KIT_APP_PATHS['GEM_ASSETS']      = [
  #File.expand_path('../app/assets', __dir__),
  File.expand_path('../spec/dummy/app/assets/stylesheets', __dir__),
  File.expand_path('../spec/dummy/app/assets/javascripts', __dir__),
  File.expand_path('../spec/dummy/app/assets/images', __dir__),
  File.expand_path('../spec/dummy/app/assets/vendor', __dir__),
]

KIT_APP_PATHS['GEM_SPEC_ROOT']   = File.expand_path('../spec/dummy', __dir__)
KIT_APP_PATHS['GEM_SPEC_APP']    = File.expand_path('../spec/dummy/app', __dir__)
KIT_APP_PATHS['GEM_SPEC_LIB']    = File.expand_path('../spec/dummy/lib', __dir__)
KIT_APP_PATHS['GEM_SPEC_ROUTES'] = File.expand_path('../spec/dummy/config/routes.rb', __dir__)
KIT_APP_PATHS['GEM_SPEC_VIEWS']  = File.expand_path('../spec/dummy/app/views', __dir__)

KIT_APP_PATHS['RAILS_DEPENDENCIES'] = %w[
  action_controller/railtie
  action_view/railtie
  active_job/railtie
  rails/test_unit/railtie
  sprockets/railtie
]
