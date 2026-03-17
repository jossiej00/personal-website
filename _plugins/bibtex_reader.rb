require 'bibtex'

module Jekyll
  class BibtexReader < Generator
    safe false
    priority :low

    def format_authors(authors_str)
      authors_str.split(' and ').map do |a|
        parts = a.strip.split(', ')
        parts.length == 2 ? "#{parts[1].strip} #{parts[0].strip}" : a.strip
      end.join(', ')
    end

    EXCLUDE_FIELDS = %i[status slides pdf code featured].freeze

    def build_bibtex(entry)
      fields = entry.fields.reject { |field, _| EXCLUDE_FIELDS.include?(field) }.to_a
      lines = ["@#{entry.type}{#{entry.key},"]
      fields.each_with_index do |(field, value), i|
        comma = i < fields.length - 1 ? ',' : ''
        lines << "  #{field.to_s.ljust(12)} = {#{value}}#{comma}"
      end
      lines << "}"
      lines.join("\n")
    end

    def generate(site)
      bib_file = File.join(site.source, '_bibliography', 'publications.bib')
      return unless File.exist?(bib_file)

      bib = BibTeX.open(bib_file, filter: :latex)
      papers = []

      bib.each do |entry|
        next unless entry.respond_to?(:key)

        venue = if entry[:booktitle]
                  entry[:booktitle].to_s
                elsif entry[:journal]
                  entry[:journal].to_s
                else
                  entry.type.to_s
                end

        doi_raw   = entry[:doi]   ? entry[:doi].to_s.strip   : nil
        arxiv_raw = entry[:arxiv] ? entry[:arxiv].to_s.strip : nil

        papers << {
          'id'       => entry.key.to_s,
          'title'    => entry[:title]    ? entry[:title].to_s    : '',
          'authors'  => entry[:author]   ? format_authors(entry[:author].to_s) : '',
          'year'     => entry[:year]     ? entry[:year].to_s     : '',
          'venue'    => venue,
          'abstract' => entry[:abstract] ? entry[:abstract].to_s : '',
          'tags'     => entry[:keywords] ? entry[:keywords].to_s.split(',').map(&:strip) : [],
          'doi'      => doi_raw   ? "https://doi.org/#{doi_raw}"         : nil,
          'arxiv'    => arxiv_raw ? "https://arxiv.org/abs/#{arxiv_raw}" : nil,
          'pdf_url'  => entry[:pdf]      ? entry[:pdf].to_s      : nil,
          'code'      => entry[:code]      ? entry[:code].to_s      : nil,
          'slides_url'=> entry[:slides]   ? entry[:slides].to_s   : nil,
          'status'   => entry[:status]   ? entry[:status].to_s   : 'published',
          'bibtex'   => build_bibtex(entry),
          'featured' => entry[:featured] ? entry[:featured].to_s == 'true' : false,
        }
      end

      site.data['research'] = papers
    end
  end
end
