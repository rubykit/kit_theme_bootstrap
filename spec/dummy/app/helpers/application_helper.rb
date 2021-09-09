module ApplicationHelper

  # Element ID helper - creates ids for html elements
  def element_id(obj, prefix = nil, suffix = nil)
    obj = [obj] if !obj.is_a?(::Array)

    name = obj
      .map { |el| el.to_s.downcase.gsub(/[^0-9a-z ]/i, '').gsub(' ', '-').strip }
      .compact
      .join('-')

    [prefix, name, suffix].compact.join('-')
  end

  # Convert class tag to the css notation.
  # Ex: to_css("a b") == ".a .b"
  def to_css(str)
    str.split(' ').map { |t| ".#{ t }" }.join(' ')
  end

  def join(el)
    if el.is_a?(Array)
      el.map { |sub_el| join(sub_el) }.join("\n")
    else
      el
    end
  end

  include BootstrapHelper
  include BrandsHelper
  include CountriesHelper
  include ImagesHelper
  include PaymentsHelper

end
