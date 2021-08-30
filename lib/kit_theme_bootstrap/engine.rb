require_relative 'dependencies'

module KitThemeBootstrap
  class Engine < ::Rails::Engine

    isolate_namespace KitThemeBootstrap

    initializer 'static assets' do |app|
      if app.config&.public_file_server&.enabled == true
        app.middleware.insert_before(::ActionDispatch::Static, ::ActionDispatch::Static, "#{ root }/public")
      end
    end

  end
end
