# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.

Rails.application.config.assets.precompile += %w[kit_theme_bootstrap_dummy_application.js kit_theme_bootstrap_dummy_application.css]
Rails.application.config.assets.precompile += %w[kit_theme_bootstrap_dummy_vendor.js      kit_theme_bootstrap_dummy_vendor.css]

# Handle the double manifest issue with dummy container. Adding the absolute path of the manifest doesn't work.
Rails.application.config.assets.paths << File.expand_path('../../app/assets/config', __dir__)
Rails.application.config.assets.precompile += %w[kit_theme_bootstrap_dummy_manifest.js]

# Add dummy app public folder
if Rails.application.config&.public_file_server&.enabled == true
  Rails.application.middleware.insert_before(::ActionDispatch::Static, ::ActionDispatch::Static, File.expand_path('../../public', __dir__))
end
