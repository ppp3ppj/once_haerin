class HealthController < ApplicationController
  def up
    # Run a simple query to ensure the SQLite connection is alive
    ActiveRecord::Base.connection.execute("SELECT 1")

    render plain: "OK", status: :ok
  rescue => e
    render plain: "Down: #{e.message}", status: :internal_server_error
  end
end
