module ImagesHelper

  # Some example avatars assets
  def image_people
    @image_people ||= %w[
      1-pexels-brett-sayles-3118694.jpg
      2-pexels-vazhnik-7562076.jpg
      3-pexels-yuri-manei-2690323.jpg
      4-pexels-hudson-marques-3328072.jpg
      5-pexels-rodrigo-souza-2658834.jpg
      6-pexels-aidil-bahaman-2748242.jpg
      7-pexels-moises-patricio-9159678.jpg
      8-pexels-mwabonje-1812634.jpg
    ].map do |filename|
      "img/people/#{ filename }"
    end
  end

end
