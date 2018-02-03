require 'commonmarker'

markdown = IO.read(ARGV[0])
puts CommonMarker.render_html(markdown, :DEFAULT)