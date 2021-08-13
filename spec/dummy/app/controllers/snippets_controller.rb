class SnippetsController < ApplicationController #rubocop:disable Style/Documentation

  layout 'layouts/snippets'

  def index
    path = params[:path] || 'index'
    render "snippets/#{ path }"
  end

end
