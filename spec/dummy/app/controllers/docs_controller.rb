class DocsController < ApplicationController #rubocop:disable Style/Documentation

  layout 'layouts/docs'

  def index
    path = params[:path] || 'index'
    render "docs/#{ path }"
  end

end
