# todd.mn

[![Build Status](https://travis-ci.com/toddhgardner/toddhgardner.github.io.svg?branch=sources)](https://travis-ci.com/toddhgardner/toddhgardner.github.io)

Home Website for Todd Gardner

## Dependencies

1. Install [Ruby](http://rubyinstaller.org/). Include on `path`.
2. Install [Ruby Dev Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)
3. `gem install jekyll`
4. `gem install bundle`.
5. `bundle install`

## To Release

- `bundle`
- `export JEKYLL_ENV=production && jekyll clean && jekyll build`
- `scp -r _site/* <user>@<ip_address>:/var/www/todd.mn/html`
