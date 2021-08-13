Rails.application.routes.draw do
  mount KitThemeBootstrap::Engine => "/kit_theme_bootstrap"

  get '/docs(/*path)', to: 'docs#index'
  get '/snippets(/*path)', to: 'snippets#index'

  root to: redirect('/docs')
end
