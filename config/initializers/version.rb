module OnceMinji
  # Priority: ENV > fallback default
  #
  # Set via environment:
  #   APP_VERSION=2.1.0 APP_BUILD=26052201 rails s
  #
  # Docker / docker-compose:
  #   environment:
  #     APP_VERSION: "2.1.0"
  #     APP_BUILD:   "26052201"
  #
  # Kamal (deploy.yml env):
  #   env:
  #     clear:
  #       APP_VERSION: "2.1.0"
  #       APP_BUILD:   "26052201"
  #
  VERSION = ENV.fetch("APP_VERSION", "1.0.0")
  BUILD   = ENV.fetch("APP_BUILD",   "26052201")
end
